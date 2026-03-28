<?php

namespace App\Http\Controllers\API\Tenant;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Setting;
use App\Mail\VerifyOtpMail;
use Illuminate\Support\Str;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Mail\PasswordResetOtp;
use App\Helpers\LocationHelper;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Support\MailDebug;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        Log::info("Login credentials:", $credentials);

        if (! Auth::guard('tenant')->attempt([
            'email' => $request->email,
            'password' => $request->password,
        ])) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.',
                'errors' => ['email' => ['The provided credentials are incorrect.']]
            ], 422);
        }

        $user = Auth::guard('tenant')->user();

        $this->createDefaultRoles();
        // If email not verified, generate/send OTP and require verification
        if (! $user->email_verified_at) {
            $otp = (string) random_int(100000, 999999);
            $user->otp = $otp;
            $user->otp_expires_at = Carbon::now()->addMinutes(10);
            $user->save();

            try {
                Mail::to($user->email)->send(new VerifyOtpMail($otp));
            } catch (\Throwable $e) {
                Log::error('Failed sending OTP email: ' . $e->getMessage());
            }

            return response()->json(array_merge([
                'status' => 'verify_required',
                'message' => 'Email verification required. OTP sent to your email.',
            ], MailDebug::otpPayload($otp, $user->email)), 200);
        }

        // Already verified → issue token
        $token = $user->createToken('tenant-token')->plainTextToken;
        return response()->json([
            'token' => $token,
            'user' => $user,
            'tenant' => tenant(),
        ]);
    }



    private function createDefaultRoles()
    {
        // dd('hello');
        $defaultRoles = [
            'restaurant_owner',
            'manager',
            'kitchen',
            'order_taker',
            'delivery_boy',
        ];

        foreach ($defaultRoles as $roleName) {
            \Spatie\Permission\Models\Role::firstOrCreate(['name' => $roleName, 'guard_name' => 'web']);
        }
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string|size:6',
        ]);

        /** @var User|null $user */
        $user = User::where('email', $request->email)->first();
        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found.'
            ], 404);
        }

        if (! $user->otp || ! $user->otp_expires_at || Carbon::parse($user->otp_expires_at)->isPast()) {
            return response()->json([
                'success' => false,
                'message' => 'OTP has expired. Please request a new one.'
            ], 422);
        }

        if (trim((string) $request->otp) !== trim((string) $user->otp)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid OTP. Please check and try again.'
            ], 422);
        }

        // Mark verified and clear otp
        $user->email_verified_at = Carbon::now();
        $user->otp = null;
        $user->otp_expires_at = null;
        $user->save();

        $notification = Notification::create([
            'type' => 'welcome',
            'title' => 'Welcome to Our Platform!',
            'message' => 'We’re excited to have you on board. Start exploring your dashboard and enjoy your experience!',
            'is_read' => false,
            'user_id' => $user->id, // Replace with the correct user variable
        ]);

        $notification->users()->attach($user->id);

        // // Send welcome email
        // try {
        //     Mail::to($user->email)->send(new \App\Mail\WelcomeEmail($user));
        // } catch (\Throwable $e) {
        //     Log::error('Failed sending welcome email: ' . $e->getMessage());
        //     // Don't fail the verification if email sending fails
        // }

        // Issue token after successful verification
        $token = $user->createToken('tenant-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Email verified successfully. Welcome to our restaurant management system!',
            'token' => $token,
            'user' => $user,
        ]);
    }
    public function resendOtp(Request $request)
    {
        $email = $request->input('email');

        if (!$email) {
            return response()->json([
                'success' => false,
                'message' => 'Email is required.'
            ], 400);
        }

        // Find user by email
        $user = \App\Models\User::where('email', $email)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found.'
            ], 404);
        }

        // If email not verified, generate/send OTP and require verification
        if (!$user->email_verified_at) {
            $otp = (string) random_int(100000, 999999);
            $user->otp = $otp;
            $user->otp_expires_at = Carbon::now()->addMinutes(10);
            $user->save();

            try {
                Mail::to($user->email)->send(new VerifyOtpMail($otp));
            } catch (\Throwable $e) {
                Log::error('Failed sending OTP email: ' . $e->getMessage());
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to send OTP email. Please try again.'
                ], 500);
            }

            return response()->json(array_merge([
                'success' => true,
                'message' => 'OTP sent successfully to your email.',
            ], MailDebug::otpPayload($otp, $user->email)), 200);
        }

        return response()->json([
            'success' => true,
            'message' => 'Email already verified.'
        ], 200);
    }

    /**
     * Local only: read pending OTP from tenant users table (for dev / verify-otp page console).
     */
    public function debugPendingOtp(Request $request)
    {
        if (! app()->environment('local')) {
            abort(404);
        }

        $request->validate([
            'email' => 'required|email',
        ]);

        /** @var User|null $user */
        $user = User::where('email', $request->email)->first();

        if (! $user || empty($user->otp)) {
            return response()->json([
                'success' => false,
                'message' => 'No pending OTP for this email.',
            ], 404);
        }

        if ($user->otp_expires_at && Carbon::parse($user->otp_expires_at)->isPast()) {
            return response()->json([
                'success' => false,
                'message' => 'OTP in database has expired.',
            ], 422);
        }

        return response()->json([
            'success' => true,
            'debug_table_otp' => (string) $user->otp,
            'otp_expires_at' => $user->otp_expires_at,
        ]);
    }

    public function sendOtp(Request $request)
    {
        // 1. Basic format validation
        $request->validate([
            'email' => 'required|email',
        ]);


        // 2. Make sure we’re on the tenant DB (important if you switch connections dynamically)
        // Example: tenancy()->initialize($tenant);
        // dd($request->all());
        // 3. Check if email exists in tenant's users table
        $user = User::where('email', $request->email)->first();

        // dd($user);
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Email not found in this tenant database.'
            ], 422);
        }

        // 4. Generate OTP & expiry
        $otp = rand(100000, 999999);
        $otpExpires = Carbon::now()->addMinutes(10);

        $user->update([
            'otp' => $otp,
            'otp_expires_at' => $otpExpires,
        ]);

        // 5. Send OTP via email
        Mail::to($user->email)->send(new PasswordResetOtp($otp));

        return response()->json(array_merge([
            'success' => true,
            'message' => 'OTP sent successfully',
            'email' => $user->email,
        ], MailDebug::otpPayload((string) $otp, $user->email)));
    }

    // Reset Password


public function resetPassword(Request $request)
{
    $request->validate([
        'otp' => 'required|digits:6',
        'password' => 'required|min:8|confirmed',
        'password_confirmation' => 'required'
    ]);

    $user = User::where('otp', $request->otp)
        ->where('otp_expires_at', '>', Carbon::now())
        ->first();

    if (!$user) {
        return response()->json([
            'message' => 'Invalid or expired OTP'
        ], 422);
    }

    // Update password and clear OTP
    $user->update([
        'password' => Hash::make($request->password),
        'otp' => null,
        'otp_expires_at' => null
    ]);

    // Login the user and generate token
    Auth::login($user); // Optional if you want to set session (for web guards)

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Password reset and login successful',
        'token' => $token,
        'user' => $user
    ]);
}




    // check location if it is in range

    public function checkLoaction(Request $request)
    {
        // dd('hello');
        // 1. Get tenant base location
        $setting = Setting::first(); // already in tenant DB



        // 3. Get all users
        $users = User::all()->map(function ($user) use ($setting) {
            $user->is_in_range = false;

            if ($user->latitude && $user->longitude && $setting) {
                $user->is_in_range = $this->isWithinRange(
                    $setting->latitude,
                    $setting->longitude,
                    $user->latitude,
                    $user->longitude,
                    1 // 1 km
                );
                $user->save();
            }

            return $user;
        });

        return response()->json($users);
    }

    // public function checkLoaction(Request $request)
    // {
    //     $setting = Setting::first(); // tenant base location

    //     $users = User::all()->map(function ($user) use ($setting) {
    //         $user->is_in_range = ($user->latitude && $user->longitude && $setting)
    //             ? $this->isWithinRange(
    //                 $setting->latitude,
    //                 $setting->longitude,
    //                 $user->latitude,
    //                 $user->longitude,
    //                 1 // 1 km
    //             )
    //             : false;

    //         $user->save();

    //         return $user;
    //     });

    //     return response()->json($users);
    // }

    public  function isWithinRange($lat1, $lon1, $lat2, $lon2, $km = 1)
    {
        // dd('hello');

        if ($lat2 === null || $lon2 === null) return false;

        $earthRadius = 6371;
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);
        $a = sin($dLat / 2) * sin($dLat / 2) +
            cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
            sin($dLon / 2) * sin($dLon / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        $distance = $earthRadius * $c;

        // dd($distance);
        // tolerance: 0.0001 km (~10 cm)
        return $distance <= ($km + 0.0001);
    }

    public function updateLocation(Request $request)
    {
        $request->validate([
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $user = $request->user(); // logged-in user

        $user->latitude = $request->latitude;
        $user->longitude = $request->longitude;
        $user->last_seen_at = now();
        $user->save();

        // dd($user);
        return response()->json(['message' => 'Location updated']);
    }
}
