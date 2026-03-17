<?php

namespace App\Http\Controllers\API\Tenant;

use App\Models\User;
use App\Models\Tenant;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\MailLog;
use App\Models\Setting;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use App\Mail\NewTenantNotification;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Validator;
use Stancl\Tenancy\Database\Models\Domain;
use Stripe\Stripe;
use Stripe\Customer;
use Stripe\Subscription as StripeSubscription;

class TenantController extends Controller
{
    public function register(Request $request)
    {
        // dd($request->all());

        try {
            Log::info('Tenant registration started');

            // Validate subdomain format
            $subdomain = strtolower($request->subdomain);
            if (!preg_match('/^[a-z0-9][a-z0-9-]*[a-z0-9]$/', $subdomain)) {
                return response()->json([
                    'message' => 'Invalid subdomain format.',
                    'errors' => ['subdomain' => ['Invalid format']]
                ], 422);
            }

            // Validate request data
            $validator = Validator::make($request->all(), [
                'business_name' => 'required|string|max:255',
                'subdomain' => 'required|string|max:255',
                'owner_name' => 'required|string|max:255',
                'owner_email' => 'required|email',
                'password' => 'required|string|min:8|confirmed',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Check if domain exists
            $domainName = $subdomain . '.' . config('app.domain');
            if (Domain::where('domain', $domainName)->exists()) {
                return response()->json([
                    'message' => 'Subdomain already taken.',
                    'errors' => ['subdomain' => ['This subdomain is already in use.']]
                ], 422);
            }

            $tenantId = Str::random(8);
            $tenantDatabase = 'airestro360_tenant_' . $tenantId;

            // Create tenant
            $tenant = Tenant::create([
                'id' => $tenantId,
                'name' => $request->business_name,
                'business_name' => $request->business_name,
                'subdomain' => $subdomain,
                'owner_name' => $request->owner_name,
                'owner_email' => $request->owner_email,
                'owner_phone' => $request->owner_phone ?? null,
                'address' => $request->location['address'] ?? null,
                'postal_code' => $request->location['postal_code'] ?? null,
                'country' => $request->location['country'] ?? null,
                'state' => $request->location['state'] ?? null,
                'city' => $request->location['city'] ?? null,
                'place_id' => $request->location['place_id'] ?? null,
                'latitude' => $request->location['latitude'] ?? null,
                'longitude' => $request->location['longitude'] ?? null,
                'trial_started_at' => now(),
                'trial_ends_at' => now()->addDays(14),
                'database_name' => $tenantDatabase,
                'status' => 'trial',
                'data' => ['business_name' => $request->business_name],
            ]);

            Log::info('Tenant record created: ' . $tenant->id);

            // Send notification to super admin
            try {
                $superAdmin = User::role('super_user')->first();
                if ($superAdmin) {
                    Mail::to($superAdmin)->send(new NewTenantNotification($tenant));
                }
            } catch (\Throwable $mailEx) {
                Log::warning('Failed sending notification: ' . $mailEx->getMessage());
            }

            // Create domain
            $domain = $tenant->domains()->create(['domain' => $domainName]);
            Log::info('Domain created: ' . $domain->domain);

            // Initialize tenant
            tenancy()->initialize($tenant);

            // Setup tenant database
            $tenant->run(function () use ($request, $tenant) {
                // Create admin user
                $tenantUser = User::create([
                    'name' => $request->owner_name,
                    'email' => $request->owner_email,
                    'password' => Hash::make($request->password),
                ]);

                // Setup roles and permissions
                app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

                $permissions = [
                    'manage_restaurant', 'manage_categories', 'manage_products',
                    'manage_orders', 'manage_staff', 'view_reports', 'manage_settings'
                ];

                foreach ($permissions as $permission) {
                    Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
                }

                $restaurantOwnerRole = Role::firstOrCreate(
                    ['name' => 'restaurant_owner'],
                    ['guard_name' => 'web']
                );
                $restaurantOwnerRole->syncPermissions(Permission::all());
                $tenantUser->assignRole('restaurant_owner');

                // Send welcome email
                try {
                    Mail::to($tenantUser->email)->send(new \App\Mail\WelcomeEmail($tenantUser, $tenant));
                } catch (\Throwable $mailEx) {
                    Log::warning('Failed sending welcome email: ' . $mailEx->getMessage());
                }

                // Create settings
                Setting::create([
                    'business_name' => $request->business_name,
                    'address' => $request->location['address'] ?? null,
                    'postal_code' => $request->location['postal_code'] ?? null,
                    'country' => $request->location['country'] ?? null,
                    'state' => $request->location['state'] ?? null,
                    'city' => $request->location['city'] ?? null,
                    'public_phone' => $request->owner_phone ?? null,
                    'public_email' => $request->owner_email,
                    'place_id' => $request->location['place_id'] ?? null,
                    'latitude' => $request->location['latitude'] ?? null,
                    'longitude' => $request->location['longitude'] ?? null,
                ]);
            });

            // End tenancy
            tenancy()->end();

            // ✅ Create Stripe Customer and Subscription
            try {
                $customer = null;
                $stripeSubscription = null;

                // ✅ Assign Plan (Free by default)
                $plan = $request->filled('plan_id')
                    ? Plan::find($request->plan_id)
                    : Plan::where('price', 0)->first(); // default free plan

                // Create Stripe customer if plan has stripe_price_id
                if ($plan && $plan->stripe_price_id && config('services.stripe.secret')) {
                    Stripe::setApiKey(config('services.stripe.secret'));

                    $customer = Customer::create([
                        'email' => $tenant->owner_email,
                        'name' => $tenant->owner_name ?? ('Tenant ' . $tenant->id),
                    ]);

                    $tenant->update(['stripe_customer_id' => $customer->id]);
                }

                // Create Stripe subscription if plan has stripe_price_id
                if ($plan && $plan->stripe_price_id && $customer) {
                    $stripeSubscription = StripeSubscription::create([
                        'customer' => $customer->id,
                        'items' => [['price' => $plan->stripe_price_id]],
                    ]);
                }

                // Create database subscription
                if ($plan) {
                    if ($plan->price == 0) {
                        // Free plan — no payment required
                        Subscription::create([
                            'tenant_id' => $tenant->id,
                            'plan_id' => $plan->id,
                            'stripe_subscription_id' => $stripeSubscription ? $stripeSubscription->id : null,
                            'status' => 'active',
                            'starts_at' => now(),
                            'ends_at' => $plan->interval === 'year' ? now()->addYear() : now()->addMonth(),
                        ]);

                        $tenant->update([
                            'subscription_status' => 'active',
                            'status' => 'active',
                        ]);
                    } else {
                        // Paid plan
                        Subscription::create([
                            'tenant_id' => $tenant->id,
                            'plan_id' => $plan->id,
                            'stripe_subscription_id' => $stripeSubscription ? $stripeSubscription->id : null,
                            'status' => 'pending_payment',
                            'starts_at' => now(),
                        ]);

                        $tenant->update([
                            'subscription_status' => 'pending_payment',
                            'status' => 'inactive',
                        ]);
                    }
                }
            } catch (\Exception $subscriptionEx) {
                Log::error('Failed to create subscription for tenant: ' . $tenant->id, [
                    'error' => $subscriptionEx->getMessage(),
                    'trace' => $subscriptionEx->getTraceAsString(),
                ]);
                // Don't fail registration if subscription creation fails
            }

            // Log mail in central database
            try {
                $content = view('emails.welcome', [
                    'user' => (object)['name' => $request->owner_name, 'email' => $request->owner_email],
                    'tenant' => $tenant,
                    'loginUrl' => 'https://' . $tenant->subdomain . '.' . config('app.domain') . '/login',
                ])->render();

                MailLog::logMail(
                    sendBy: 'system',
                    sentTo: $request->owner_email,
                    content: $content,
                    mailType: 'welcome'
                );
            } catch (\Throwable $logEx) {
                Log::warning('Failed to create mail log: ' . $logEx->getMessage());
            }

            Log::info('Tenant registration completed successfully');

            return response()->json([
                'success' => true,
                'message' => 'Restaurant registered successfully',
                'tenant' => $tenant,
                'domain' => $domainName
            ], 201);


        } catch (\Exception $e) {
            // End tenancy if it was initialized
            try {
                tenancy()->end();
            } catch (\Exception $endEx) {
                // Ignore if tenancy wasn't initialized
            }

            Log::error('Tenant registration failed: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());

            return response()->json([
                'success' => false,
                'message' => 'Registration failed: ' . $e->getMessage(),
            ], 500);
        }
    }
//     DB::beginTransaction();
//     try {
//         Log::info('Tenant registration started');

//         // Validate subdomain format
//         $subdomain = strtolower($request->subdomain);
//         if (!preg_match('/^[a-z0-9][a-z0-9-]*[a-z0-9]$/', $subdomain)) {
//             return response()->json([
//                 'message' => 'Invalid subdomain format. Use only lowercase letters, numbers, and hyphens. Must start and end with letter or number.',
//                 'errors' => ['subdomain' => ['Invalid subdomain format']]
//             ], 422);
//         }

//         // Validate request data
//         $validator = Validator::make($request->all(), [
//             'business_name' => 'required|string|max:255',
//             'subdomain' => 'required|string|max:255|unique:domains,domain',
//             'owner_name' => 'required|string|max:255',
//             'owner_email' => 'required|email|unique:tenants,owner_email',
//             'password' => 'required|string|min:8|confirmed',
//             'owner_phone' => 'nullable|string|max:20',
//         ]);

//         if ($validator->fails()) {
//             return response()->json([
//                 'message' => 'Validation failed',
//                 'errors' => $validator->errors()
//             ], 422);
//         }

//         // Check if domain exists
//         $domainName = $subdomain . '.' . config('app.domain');
//         if (Domain::where('domain', $domainName)->exists()) {
//             return response()->json([
//                 'message' => 'Subdomain already taken.',
//                 'errors' => ['subdomain' => ['This subdomain is already in use. Please choose a different one.']]
//             ], 422);
//         }

//         // Check if owner email already exists in tenants
//         if (Tenant::where('owner_email', $request->owner_email)->exists()) {
//             return response()->json([
//                 'message' => 'Email already registered.',
//                 'errors' => ['owner_email' => ['This email is already associated with another restaurant.']]
//             ], 422);
//         }

//         $tenantId = Str::random(8);
//         $tenantDatabase = 'tenant_' . $tenantId;

//         // Create tenant
//         $tenant = Tenant::create([
//             'id' => $tenantId,
//             'name' => $request->business_name,
//             'business_name' => $request->business_name,
//             'subdomain' => $subdomain,
//             'owner_name' => $request->owner_name,
//             'owner_email' => $request->owner_email,
//             'owner_phone' => $request->owner_phone ?? null,
//             'address' => $request->location['address'] ?? null,
//             'postal_code' => $request->location['postal_code'] ?? null,
//             'country' => $request->location['country'] ?? null,
//             'state' => $request->location['state'] ?? null,
//             'city' => $request->location['city'] ?? null,
//             'place_id' => $request->location['place_id'] ?? null,
//             'latitude' => $request->location['latitude'] ?? null,
//             'longitude' => $request->location['longitude'] ?? null,
//             'trial_started_at' => now(),
//             'trial_ends_at' => now()->addDays(14),
//             'database_name' => $tenantDatabase,
//             'status' => 'trial',
//             'data' => ['business_name' => $request->business_name],
//         ]);

//         Log::info('Tenant record created: ' . $tenant->id);

//         // Create domain
//         $domain = $tenant->domains()->create(['domain' => $domainName]);
//         Log::info('Domain created: ' . $domain->domain);

//         // Initialize tenant
//         tenancy()->initialize($tenant);

//         try {
//             // Setup tenant database
//             $tenant->run(function () use ($request, $tenant) {
//                 // Create admin user
//                 $tenantUser = User::create([
//                     'name' => $request->owner_name,
//                     'email' => $request->owner_email,
//                     'password' => Hash::make($request->password),
//                 ]);

//                 // Setup roles and permissions
//                 app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

//                 $permissions = [
//                     'manage_restaurant', 'manage_categories', 'manage_products',
//                     'manage_orders', 'manage_staff', 'view_reports', 'manage_settings'
//                 ];

//                 foreach ($permissions as $permission) {
//                     Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
//                 }

//                 $restaurantOwnerRole = Role::firstOrCreate(
//                     ['name' => 'restaurant_owner'],
//                     ['guard_name' => 'web']
//                 );
//                 $restaurantOwnerRole->syncPermissions(Permission::all());
//                 $tenantUser->assignRole('restaurant_owner');

//                 // Create settings
//                 Setting::create([
//                     'business_name' => $request->business_name,
//                     'address' => $request->location['address'] ?? null,
//                     'postal_code' => $request->location['postal_code'] ?? null,
//                     'country' => $request->location['country'] ?? null,
//                     'state' => $request->location['state'] ?? null,
//                     'city' => $request->location['city'] ?? null,
//                     'phone' => $request->owner_phone ?? null,
//                     'email' => $request->owner_email,
//                     'place_id' => $request->location['place_id'] ?? null,
//                     'latitude' => $request->location['latitude'] ?? null,
//                     'longitude' => $request->location['longitude'] ?? null,
//                 ]);

//                 Log::info('Tenant database setup completed for: ' . $tenant->id);
//             });

//         } catch (\Exception $tenantDbException) {
//             // End tenancy before rolling back
//             tenancy()->end();

//             Log::error('Tenant database setup failed: ' . $tenantDbException->getMessage());
//             throw new \Exception('Failed to setup tenant database: ' . $tenantDbException->getMessage());
//         }

//         // End tenancy
//         tenancy()->end();

//         // Send notifications (outside transaction)
//         try {
//             // Send welcome email to tenant
//             $content = view('emails.welcome', [
//                 'user' => (object)['name' => $request->owner_name, 'email' => $request->owner_email],
//                 'tenant' => $tenant,
//                 'loginUrl' => 'https://' . $tenant->subdomain . '.' . config('app.domain') . '/login',
//             ])->render();

//             MailLog::logMail(
//                 sendBy: 'system',
//                 sentTo: $request->owner_email,
//                 content: $content,
//                 mailType: 'welcome'
//             );

//             // Send notification to super admin
//             $superAdmin = User::role('super_user')->first();
//             if ($superAdmin) {
//                 Mail::to($superAdmin)->send(new NewTenantNotification($tenant));
//             }

//             Log::info('Emails sent successfully');

//         } catch (\Throwable $mailEx) {
//             Log::warning('Failed sending emails: ' . $mailEx->getMessage());
//             // Don't throw exception for email failures, just log
//         }

//         // Commit transaction only if everything succeeded
//         DB::commit();

//         Log::info('Tenant registration completed successfully for: ' . $tenant->id);

//         return response()->json([
//             'success' => true,
//             'message' => 'Restaurant registered successfully! You can now login to your dashboard.',
//             'tenant' => [
//                 'id' => $tenant->id,
//                 'business_name' => $tenant->business_name,
//                 'subdomain' => $tenant->subdomain
//             ],
//             'domain' => $domainName,
//             'login_url' => 'https://' . $domainName . '/login'
//         ], 201);

//     } catch (\Exception $e) {
//         // Rollback transaction in case of any error
//         DB::rollBack();

//         // End tenancy if it was initialized
//         try {
//             tenancy()->end();
//         } catch (\Exception $endEx) {
//             Log::warning('Failed to end tenancy during rollback: ' . $endEx->getMessage());
//         }

//         Log::error('Tenant registration failed: ' . $e->getMessage());
//         Log::error('Stack trace: ' . $e->getTraceAsString());

//         // Clean up any partially created resources
//         $this->cleanupFailedRegistration($tenantId ?? null, $domainName ?? null);

//         return response()->json([

//             'success' => false,
//             // 'message' => 'Registration failed. Please try again.',
//             'message' => $e->getMessage(),
//             'error' => config('app.debug') ? $e->getMessage() : 'An unexpected error occurred'
//         ], 500);
//     }
// }

/**
 * Clean up any partially created resources after failed registration
 */
// private function cleanupFailedRegistration($tenantId = null, $domainName = null)
// {
//     try {
//         if ($tenantId) {
//             // Delete tenant if it was created
//             Tenant::where('id', $tenantId)->delete();
//             Log::info('Cleaned up failed tenant: ' . $tenantId);
//         }

//         if ($domainName) {
//             // Delete domain if it was created
//             Domain::where('domain', $domainName)->delete();
//             Log::info('Cleaned up failed domain: ' . $domainName);
//         }
//     } catch (\Exception $e) {
//         Log::error('Cleanup failed: ' . $e->getMessage());
//     }
// }
}
