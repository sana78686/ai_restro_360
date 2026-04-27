<?php

namespace App\Http\Controllers\API\Tenant;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    /**
     * Get user profile
     */
    public function show()
    {
        $user = Auth::user();

        $roles = $user->getRoleNames();
        $roleName = $roles->first();
        $roleDisplay = $roleName ? ucwords(str_replace('_', ' ', (string) $roleName)) : 'Member';

        $avatarUrl = null;
        if ($user->profile_photo) {
            $avatarUrl = Str::startsWith($user->profile_photo, ['http://', 'https://'])
                ? $user->profile_photo
                : Storage::disk('public')->url($user->profile_photo);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'address' => $user->address,
                'created_at' => $user->created_at,
                'role_display' => $roleDisplay,
                'avatar_url' => $avatarUrl,
            ],
        ]);
    }

    /**
     * Update user profile
     */
    public function update(Request $request)
    {
        $user = User::find(Auth::id());

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
            'profile_photo' => 'nullable|image|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $data = collect($validator->validated())->except(['profile_photo'])->all();
            $user->fill($data);

            if ($request->hasFile('profile_photo')) {
                if ($user->profile_photo && ! Str::startsWith($user->profile_photo, ['http://', 'https://'])) {
                    Storage::disk('public')->delete($user->profile_photo);
                }
                $path = $request->file('profile_photo')->store('profile-photos', 'public');
                $user->profile_photo = $path;
            }

            $user->save();

            $avatarUrl = null;
            if ($user->profile_photo) {
                $avatarUrl = Str::startsWith($user->profile_photo, ['http://', 'https://'])
                    ? $user->profile_photo
                    : Storage::disk('public')->url($user->profile_photo);
            }

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => array_merge($data, [
                    'avatar_url' => $avatarUrl,
                    'created_at' => $user->created_at,
                ]),
            ]);
        } catch (\Exception $e) {
            Log::error('Profile update error: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to update profile. '.$e->getMessage(),
            ], 500);
        }
    }
}
