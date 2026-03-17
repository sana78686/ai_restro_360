<?php

namespace App\Helpers;

use App\Models\Setting;
use Illuminate\Support\Facades\DB;

class AppNameHelper
{
    /**
     * Get the application name based on tenant context
     *
     * @return string
     */
    public static function getAppName(): string
    {
        $defaultName = config('app.name', 'AiRestro360');

        try {
            // Check if we're in tenant context - multiple methods
            $isTenantContext = false;

            // Method 1: Check if tenant() helper returns a tenant
            try {
                $tenant = tenant();
                $isTenantContext = $tenant !== null;
            } catch (\Exception $e) {
                // tenant() might throw if tenancy not available
            }

            // Method 2: Check if tenancy is initialized
            if (!$isTenantContext) {
                try {
                    $isTenantContext = tenancy()->initialized ?? false;
                } catch (\Exception $e) {
                    // tenancy() might not be available
                }
            }

            // Method 3: Check by hostname as fallback
            if (!$isTenantContext) {
                $mainDomain = config('app.name', 'AiRestro360');
                $currentHost = request()->getHost();
                $currentPort = request()->getPort();
                if ($currentPort && $currentPort != 80 && $currentPort != 443) {
                    $currentHost .= ':' . $currentPort;
                }
                $isTenantContext = $currentHost && $currentHost !== $mainDomain;
            }

            if ($isTenantContext) {
                try {
                    // When in tenant context, Setting model should use tenant database
                    $setting = Setting::first();
                    if ($setting && !empty(trim($setting->business_name ?? ''))) {
                        return trim($setting->business_name);
                    }
                } catch (\Exception $e) {
                    // If query fails, fall back to default
                    \Log::warning('Failed to get tenant business name: ' . $e->getMessage());
                }
            }
        } catch (\Exception $e) {
            // If anything fails, return default
            \Log::warning('Failed to determine app name: ' . $e->getMessage());
        }

        return $defaultName;
    }
}

