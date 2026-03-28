<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\Tenant\HomeController;
use App\Http\Controllers\API\Tenant\OrderController;
use App\Http\Controllers\API\Payments\TestController;
use App\Http\Controllers\API\Dashboard\PlanController;
use App\Http\Controllers\API\Tenant\CmsMenuController;
use App\Http\Controllers\API\Tenant\ProfileController;
use App\Http\Controllers\API\Tenant\SettingController;
use App\Http\Controllers\API\Dashboard\TenantController;
use App\Http\Controllers\API\Payments\GatewayController;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use App\Http\Controllers\API\Tenant\StockCheckController;
use App\Http\Controllers\API\Tenant\DeliveryBoyController;
use App\Http\Controllers\API\Dashboard\DashboardController;
use App\Http\Controllers\API\Dashboard\PaymentController;
use App\Http\Controllers\API\Tenant\NotificationController;
use App\Http\Controllers\API\Tenant\PasswordResetController;
use App\Http\Controllers\API\Tenant\ChangePasswordController;
use App\Http\Controllers\API\Tenant\TenantDashboardController;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use App\Http\Controllers\API\Dashboard\SuperAdminMailLogController;
use App\Http\Controllers\API\Dashboard\SubscriptionController;
use App\Http\Controllers\API\Dashboard\StripeCheckoutController;
use App\Http\Controllers\API\AppController;

use App\Http\Controllers\API\Tenant\AuthController as TenantAuthController;
use App\Http\Controllers\API\Tenant\RoleController as TenantRoleController;
use App\Http\Controllers\API\Tenant\UserController as TenantUserController;
use App\Http\Controllers\API\Tenant\OrderController as TenantOrderController;
use App\Http\Controllers\API\Dashboard\RoleController as DashboardRoleController;
use App\Http\Controllers\API\Dashboard\UserController as DashboardUserController;
use App\Http\Controllers\API\Tenant\BookingController as TenantBookingController;
use App\Http\Controllers\API\Tenant\ProductController as TenantProductController;
use App\Http\Controllers\API\Tenant\CategoryController as TenantCategoryController;
use App\Http\Controllers\API\Tenant\CustomerController as TenantCustomerController;
use App\Http\Controllers\API\Tenant\TenantController as RestaurantTenantController;
use App\Http\Controllers\API\Dashboard\TenantController as DashboardTenantController;
use App\Http\Controllers\API\Tenant\StockCheckController as TenantStockCheckController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('/tenant/find-by-email', [TenantController::class, 'findByEmail']);
// Public Routes
Route::get('/check-subdomain/{subdomain}', [AuthController::class, 'checkSubdomain']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Public routes
Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink']);
Route::post('/reset-password', [PasswordResetController::class, 'reset']);

Route::get('tenants/list', [DashboardTenantController::class, 'index']);
// Public Routes for Tenant Registration
Route::post('/tenants/register', [RestaurantTenantController::class, 'register'])->name('tenant.register');

 Route::post('/subscribe/request', [TenantController::class, 'requestSubscription']);
 Route::post('/subscribe/verify', [TenantController::class, 'verifySubscription']);


   // payment gateway integration
Route::post('/create-payment-intent', [TenantController::class, 'createPaymentIntent']);
Route::post('/payment/success', [TenantController::class, 'webhook']);
Route::post('/subscription/activate', [TenantController::class, 'activateSubscription']);



// Public route - only GET for viewing plans (used by frontend pricing page)
Route::get('/plans', [PlanController::class, 'index']);
// Public route - get app name (works for main app)
Route::get('/app-name', [AppController::class, 'getAppName']);
// Main application routes (using main database auth)
Route::middleware(['auth:sanctum'])->group(function () {

// Roles Management
Route::prefix('dashboard')->group(function () {
    Route::get('stats', [DashboardController::class, 'getStats']);
    Route::get('recent-tenants', [DashboardController::class, 'getRecentTenants']);
    Route::post('clear-cache', [DashboardController::class, 'clearCache']);
    Route::get('permissions', [DashboardRoleController::class, 'permissions']);
    Route::apiResource('roles', DashboardRoleController::class);
    Route::apiResource('users', DashboardUserController::class);
    Route::apiResource('tenants', DashboardTenantController::class);
    // Route::get('/tenants', [DashboardTenantController::class, 'index']);
    Route::get('/tenants/{id}', [DashboardTenantController::class, 'show']);
    Route::patch('/tenants/{id}/status', [DashboardTenantController::class, 'updateStatus']);

        Route::get('/mail-logs', [SuperAdminMailLogController::class, 'SuperAdminMailLog']);


        // routes/api.php
        Route::post('/create-payment-intent', [TenantController::class, 'createPaymentIntent']);
        Route::post('/payment/success', [TenantController::class, 'webhook']);
        Route::post('/subscription/activate', [TenantController::class, 'activateSubscription']);



        // Plan Management Routes (Super Admin Dashboard)
        // These routes are protected by auth:sanctum middleware and dashboard prefix
        Route::get('/plansDashboard', [PlanController::class, 'index']);
        Route::post('/plansDashboardStore', [PlanController::class, 'store']);
        Route::put('/plansDashboard/{id}', [PlanController::class, 'update']);
        Route::delete('/plansDashboard/{id}', [PlanController::class, 'destroy']);

        // Payment Management Routes (Super Admin Dashboard)
        Route::get('/payments', [PaymentController::class, 'index']);
        Route::get('/payments/stats', [PaymentController::class, 'getStats']);
        Route::get('/payments/{id}', [PaymentController::class, 'show']);

        // Subscription Management Routes (Super Admin Dashboard)
        Route::get('/subscriptions', [SubscriptionController::class, 'index']);
        Route::get('/subscriptions/stats', [SubscriptionController::class, 'getStats']);



});
});

// Tenant routes (using tenant database auth)
Route::middleware([
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->prefix('tenant')->group(function () {
    // Tenant Routes


    Route::post('/login', [TenantAuthController::class, 'login']);
    Route::get('/get-tenant-details', [App\Http\Controllers\API\Tenant\SettingController::class, 'getDetails']);
    Route::get('public/categories', [App\Http\Controllers\API\Tenant\HomeController::class, 'categories']);
    Route::get('public/products', [App\Http\Controllers\API\Tenant\HomeController::class, 'products']);
    Route::get('public/currency', [App\Http\Controllers\API\Tenant\HomeController::class, 'fetchCurrency']);
    Route::get('cms_page/{slug}', [App\Http\Controllers\API\Tenant\CmsMenuController::class, 'getPageBySlug']);
    Route::post('subscribe', [App\Http\Controllers\API\Tenant\HomeController::class, 'storeSubscriberEmail']);
    Route::post('save-order', [App\Http\Controllers\API\Tenant\HomeController::class, 'saveOrder']);
    Route::post('contact-info', [App\Http\Controllers\API\Tenant\HomeController::class, 'storeContactInfo']);
    Route::post('reservation', [TenantBookingController::class, 'storeReservationInfo']);
    Route::post('stock-check', [App\Http\Controllers\API\Tenant\HomeController::class, 'storeStockCheck']);
    Route::get('/settings', [App\Http\Controllers\API\Tenant\SettingController::class, 'index']);
    Route::get('/email-setting', [App\Http\Controllers\API\Tenant\SettingController::class, 'email_index']);
    Route::get('/app-name', [AppController::class, 'getAppName']);
    // Public CMS list for storefront header/footer (dashboard uses auth cms_menu resource)
    Route::get('/public/cms_menu', [CmsMenuController::class, 'index']);
    Route::post('/verify-otp', [TenantAuthController::class, 'verifyOtp']);
    Route::post('/resend-otp', [TenantAuthController::class, 'resendOtp']);
    if (app()->environment('local')) {
        Route::post('/debug/pending-otp', [TenantAuthController::class, 'debugPendingOtp']);
    }
    Route::post('/send-otp', [TenantAuthController::class, 'sendOtp']);
    Route::post('/reset-password', [TenantAuthController::class, 'resetPassword']);


        Route::prefix('checkout')->group(function () {
    Route::get('/payment-methods', [CheckoutController::class, 'getPaymentMethods']);
    Route::post('/test-payment', [CheckoutController::class, 'createTestPayment']);
    Route::post('/confirm-payment', [CheckoutController::class, 'confirmTestPayment']);
    Route::post('/refund-payment', [CheckoutController::class, 'refundTestPayment']);
    });

Route::prefix('stripe')->group(function () {
    // Create Stripe Checkout Session
    Route::post('/create-checkout-session', [CheckoutController::class, 'redirectToGatewayCheckout']);

    // Verify Stripe Checkout Session
    Route::get('/verify-checkout-session', [CheckoutController::class, 'verifyGatewayCheckout']);
});

    Route::post('/check-delivery', [HomeController::class, 'check']);


    Route::middleware('auth:sanctum')->group(function () {

        // Subscription routes for tenants (not plan management)
        Route::get('/my-subscription', [SubscriptionController::class, 'show']);
        Route::get('/plans', [PlanController::class, 'index']);
        Route::post('/create-checkout-session', [StripeCheckoutController::class, 'createCheckoutSession']);
        Route::get('/verifyCheckoutSession', [StripeCheckoutController::class, 'verifyCheckoutSession']);




        // Get available delivery boys within range
    Route::get('/delivery-boys/available', [App\Http\Controllers\API\Tenant\DeliveryBoyController::class, 'getAvailableDeliveryBoys']);


        // check location route for tenant
    Route::get('/check/location', [TenantAuthController::class, 'checkLoaction']);
// Assign delivery boy to order
    Route::post('/orders/assign-delivery', [OrderController::class, 'assignDeliveryBoy']);

    // Additional delivery boy management routes
    Route::get('/delivery-boys', [DeliveryBoyController::class, 'index']);
    Route::put('/delivery-boys/{id}/status', [DeliveryBoyController::class, 'updateStatus']);
    Route::put('/delivery-boys/{id}/location', [DeliveryBoyController::class, 'updateLocation']);

    Route::get('/delivery-boy/orders', [DeliveryBoyController::class, 'getMyOrders']);
            // Route::get('/delivery-boy/orders', [TenantOrderController::class, 'index']);
    Route::post('/delivery-boy/orders/update-status', [DeliveryBoyController::class, 'updateDeliveryStatus']);
    Route::post('/delivery-boy/availability', [DeliveryBoyController::class, 'updateAvailability']); // ← Add this
    // delivery boy profile
    Route::get('/delivery-boy/profile', [DeliveryBoyController::class, 'getProfile']);


        // update location route for tenant
        Route::post('/update-location', [TenantAuthController::class, 'updateLocation']);

        // get user role route for tenant
        Route::get('/user-role', [TenantRoleController::class, 'getUserRole']);

        // dashboard home route for tenant
        Route::get('/dashboard/home', [TenantDashboardController::class, 'index']);
        Route::get('/notifications', [TenantDashboardController::class, 'getNotifications']);
        Route::post('/notifications/{id}/read', [TenantDashboardController::class, 'markNotificationRead']);
        Route::post('/notifications/mark-all-read', [TenantDashboardController::class, 'markAllNotificationsRead']);
        Route::get('/cms_menu/menus', [CmsMenuController::class, 'getMenus']);
        Route::apiResource('cms_menu', CmsMenuController::class);
        Route::post('/cms_menu/reorder', [CmsMenuController::class, 'reorder']);
        Route::delete('/cms_menu/{id}/force', [CmsMenuController::class, 'forceDelete']);
        Route::post('/cms_menu/{id}/restore', [CmsMenuController::class, 'restore']);
        Route::post('/cms_menu/upload-image', [CmsMenuController::class, 'uploadImage']);

        // Booking Rooutes
        Route::get('/reservations-list', [TenantBookingController::class, 'showReservationInfo']);
        Route::get('/contacts-list', [TenantBookingController::class, 'showContactInfo']);
        Route::get('/subscribers-list', [TenantBookingController::class, 'showSubscriberEmail']);

        // New reservation management routes
        Route::prefix('reservations')->group(function () {
            Route::get('/', [TenantBookingController::class, 'showReservationInfo']); // Alternative endpoint
            Route::get('/{id}', [TenantBookingController::class, 'show']);
            Route::put('/{id}/assign-table', [TenantBookingController::class, 'assignTable']);
            Route::put('/{id}/update-status', [TenantBookingController::class, 'updateStatus']);
            Route::delete('/{id}', [TenantBookingController::class, 'destroy']);
        });
        // Settings Routes
        Route::put('/settings', [App\Http\Controllers\API\Tenant\SettingController::class, 'update']);
        Route::put('/settings/discount', [App\Http\Controllers\API\Tenant\SettingController::class, 'updateDiscount']);
        Route::put('/email-setting', [App\Http\Controllers\API\Tenant\SettingController::class, 'save_email_setting']);
        Route::post('/upload-logo', [App\Http\Controllers\API\Tenant\SettingController::class, 'uploadLogo']);

        // Roles
        Route::get('permissions', [TenantRoleController::class, 'permissions']);
        Route::get('/roles', [TenantRoleController::class, 'index']);
        Route::post('/roles', [TenantRoleController::class, 'store']);
        Route::put('/roles/{role}', [TenantRoleController::class, 'update']);
        Route::delete('/roles/{role}', [TenantRoleController::class, 'destroy']);

        // Users
        Route::get('/users', [TenantUserController::class, 'index']);
        Route::post('/users', [TenantUserController::class, 'store']);
        Route::put('/users/{user}', [TenantUserController::class, 'update']);
        Route::delete('/users/{user}', [TenantUserController::class, 'destroy']);

        // Categories
        Route::get('/categories', [TenantCategoryController::class, 'index']);
        Route::post('/categories', [TenantCategoryController::class, 'store']);
        Route::post('/categories/{id}/restore', [TenantCategoryController::class, 'restore']);
        Route::put('/categories/{category}', [TenantCategoryController::class, 'update']);
        Route::delete('/categories/{category}', [TenantCategoryController::class, 'destroy']);
        Route::post('/categories/reorder', [TenantCategoryController::class, 'reorder']);

        // Products
        Route::get('/products', [TenantProductController::class, 'index']);
        Route::post('/products', [TenantProductController::class, 'store']);
        Route::put('/products/{product}', [TenantProductController::class, 'update']);
        Route::delete('/products/{product}', [TenantProductController::class, 'destroy']);
        Route::post('/products/{id}/restore', [TenantProductController::class, 'restore']);
        Route::post('/products/reorder', [TenantProductController::class, 'reorder']);



        // customers
        Route::get('/customers', [TenantCustomerController::class, 'index']);
        Route::get('/orders', [TenantOrderController::class, 'index']);
        // Route::get('/stock-check-reqs', [TenantStockCheckController::class, 'index']);



        // Stock Check Requests Routes
        Route::prefix('stock-check-reqs')->group(function () {
            Route::get('/', [StockCheckController::class, 'index']);
            Route::post('/', [StockCheckController::class, 'store']);
            Route::get('/{id}', [StockCheckController::class, 'show']);
            Route::put('/{id}', [StockCheckController::class, 'update']);
            Route::delete('/{id}', [StockCheckController::class, 'destroy']);
            Route::put('/{id}/status', [StockCheckController::class, 'updateStatus']);
        });

        Route::get('/orders/{id}/status-change', [TenantOrderController::class, 'updateStatus']);
        // Authenticated tenant user info for dashboard auth check
        Route::get('/orders/mail-logs', [TenantOrderController::class, 'MailLogs']);
        Route::get('/user', function (Request $request) {
            return response()->json("Saan");
        });


        Route::get('/profile', [ProfileController::class, 'show']);
        Route::put('/profile', [ProfileController::class, 'update']);

        // notifications routes for tenant
        Route::get('/notifications/all', [NotificationController::class, 'index'])->name('notifications.all');
        Route::post('/notifications/{id}/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.markasread');

        /*
        Route::get('/auth-info', function () {
            $user = auth()->user();
            // dd(auth()->user());
            return response()->json("Saan");
        });

        */
        Route::get('/auth-check', function () {
            $user = Auth::user();
            Log::info("user is:".$user);

            $roles = $user->getRoleNames();
            Log::info("roles are:".$roles);
            $roleName = $roles->first();
            $formattedRoleName = ucwords(str_replace('_', ' ', $roleName));

            Log::info("Role Name is:".$roleName);
            return response()->json([
                'authenticated' => $user ? true : false,
                'user' => $user,
                'role_name' => $formattedRoleName
            ]);
        });


        // reset password link

        // Protected routes (require authentication)
        // Route::middleware('auth:sanctum')->group(function () {
            Route::post('/change-password', [ChangePasswordController::class, 'change']);
            Route::get('/user', function (Request $request) {
                return $request->user();
            });
        // });

        Route::post('/logout', function (Request $request) {
            $user = $request->user();

    // Reset latitude and longitude to null (or any default value)
    $user->latitude = null;
    $user->longitude = null;
    $user->is_in_range = false;
    $user->save();
            $request->user()->currentAccessToken()->delete();
            Log::info("Logged out successfully");
            return response()->json(['message' => 'Logged out successfully']);
        });

                // order invoice route
        Route::get('/orders/{order}/invoice', [OrderController::class, 'exportInvoice']);
        Route::get('/tenant/orders/{order}/invoice', [OrderController::class, 'exportInvoice']);


        // In your Laravel routes

            // Payment Gateway Routes for Vue.js SPA
    Route::prefix('payment-gateways')->name('tenant.gateways.')->group(function () {
        // Get all available gateways and current configurations
        Route::get('/', [GatewayController::class, 'index'])->name('index');

        // Get gateway configuration form schema
        Route::get('/{gatewayName}/schema', [GatewayController::class, 'getGatewaySchema'])->name('schema');

        // Get current gateway configuration
        Route::get('/{gatewayName}/config', [GatewayController::class, 'getGatewayConfig'])->name('config');

        // Store/update gateway credentials
        Route::post('/{gatewayName}/configure', [GatewayController::class, 'storeCredentials'])->name('store');

        // Test gateway connection
        Route::post('/{gatewayName}/test', [GatewayController::class, 'testConnection'])->name('test');

        // Toggle gateway active status
        Route::post('/{gatewayName}/toggle-active', [GatewayController::class, 'toggleActive'])->name('toggle-active');

        // Set default gateway
        Route::post('/{gatewayName}/set-default', [GatewayController::class, 'setDefault'])->name('set-default');
    });



});



    // Test payment routes
    Route::prefix('test-payments')->group(function () {
        Route::get('/setup', [TestController::class, 'getTestSetup']);
        Route::post('/create-customer', [TestController::class, 'testCreateCustomer']);
        Route::post('/process-payment', [TestController::class, 'testProcessPayment']);
    });
});
