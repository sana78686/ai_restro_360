<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\API\Dashboard\StripeCheckoutController;
use App\Http\Controllers\Frontend\TenantRegistrationController;
use App\Http\Controllers\SuperAdmin\DashboardController;
use App\Http\Controllers\SuperAdmin\UserController;
use App\Http\Controllers\SuperAdmin\RoleController;
use App\Http\Controllers\SuperAdmin\TenantController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\SuperAdmin\TenantDashboardController;
use App\Http\Controllers\SuperAdmin\TenantProfileController;
use App\Http\Controllers\SuperAdmin\TenantSubscriptionController;
use App\Http\Controllers\LaunchGateController;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

use Stancl\Tenancy\Resolvers\DomainTenantResolver;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/
// routes/web.php

// Route::middleware([
//     // Apply tenancy only if tenant exists
//     \Stancl\Tenancy\Middleware\InitializeTenancyByDomain::class,
// ])->group(function () {


//     if (tenancy()->initialized) {
//         Route::get('/{any}', function () {
//             return view('app'); // Your Vue SPA entry
//         })->where('any', '.*');
//     }
// });
Route::middleware(['web'])->group(function () {
    // Launch gate: password required until LAUNCH_GATE_ENABLED=false (easy to remove at launch)
    Route::get('/launch-gate', [LaunchGateController::class, 'show'])->name('launch-gate');
    Route::post('/launch-gate/unlock', [LaunchGateController::class, 'unlock'])->name('launch-gate.unlock');

    Route::get('/stripe/success', [StripeCheckoutController::class, 'handleSuccess'])->name('stripe.success');
    Route::get('/stripe/cancel', [StripeCheckoutController::class, 'handleCancel'])->name('stripe.cancel');

    Route::get('/login', fn() => view('app'))->name('login');
    Route::get('/{any}', fn() => view('app'))->where('any', '.*');
});

