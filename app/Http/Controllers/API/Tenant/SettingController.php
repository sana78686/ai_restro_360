<?php

namespace App\Http\Controllers\API\Tenant;

use App\Http\Controllers\Controller;
use App\Helpers\FileUpload;
use App\Models\Setting;
use App\Models\EmailSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Carbon;

class SettingController extends Controller
{
    public function index()
    {
        try {
            $settings = Setting::first();

            if (!$settings) {
                $settings = Setting::create([
                    'business_name' => 'My Restaurant',
                    'logo' => null,
                    'address' => '',
                    'postal_code' => '',
                    'country' => '',
                    'state' => '',
                    'city' => '',
                    'phone' => '',
                    'email' => '',
                    'place_id' => '',
                    'pickup_start_end_time' => '',
                    'latitude' => null,
                    'longitude' => null,
                    'currency_symbol' => '$',
                    'timezone' => 'UTC',
                    'date_format' => 'Y-m-d',
                    'time_format' => 'H:i:s',
                    'is_active' => true,
                    'created_by' => auth()->id(),
                    'updated_by' => auth()->id(),
            //         'delivery_range_northeast_lat'=> "",
            // 'delivery_range_northeast_lng'=> "",
            // 'delivery_range_southwest_lat'=> "",
            // 'delivery_range_southwest_lng'=> "",
                    // 'available_delivery_start_location' => '',
                    // 'available_delivery_end_location' => '',
                ]);
            }

            // dd($settings);

            // dd($this->appendLogoUrlToSetting($settings));
            return response()->json([
                'success' => true,
                'data' => $this->prepareSettingPayload($settings),
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching settings: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch settings'
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'key' => 'required|string|unique:settings',
                'value' => 'required',
                'type' => 'required|string'
            ]);

            $setting = Setting::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Setting created successfully',
                'data' => $setting
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating setting: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create setting'
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $setting = Setting::findOrFail($id);
            return response()->json([
                'success' => true,
                'data' => $setting
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching setting: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Setting not found'
            ], 404);
        }
    }

    public function update(Request $request)
    {
        try {
            Log::info("Request data:", $request->all());
            $validated = $request->validate([
                'business_name' => 'sometimes|required|string|max:255',
                'logo' => 'nullable|string',
                'address' => 'nullable|string',
                'postal_code' => 'nullable|string|max:20',
                'country' => 'nullable|string|max:100',
                'state' => 'nullable|string|max:100',
                'city' => 'nullable|string|max:100',
                'phone' => 'nullable|string|max:20',
                'public_phone' => 'nullable|string|max:20',
                'public_email' => 'nullable|email|max:255',
                'email' => 'nullable|email|max:255',
                'place_id' => 'nullable|string',
                'pickup_start_end_time' => 'nullable|string',
                'latitude' => 'nullable|numeric',
                'longitude' => 'nullable|numeric',
                'currency_symbol' => 'sometimes|required|string',
                'timezone' => 'sometimes|required|string|max:255',
                'date_format' => 'sometimes|required|string|max:20',
                'time_format' => 'sometimes|required|string|max:20',
                'is_active' => 'boolean',
                'facebook_link' => 'nullable|url',
                'twitter_link' => 'nullable|url',
                'linkedin_link' => 'nullable|url',
                'google_plus_link' => 'nullable|url',
                'instagram_link' => 'nullable|url',
                'description' => 'nullable|string',
                'available_delivery_start_location' => 'nullable|string|max:255',
                'available_delivery_end_location' => 'nullable|string|max:255', 
                'delivery_range_northeast_lat' => 'nullable|string|max:255',
                'delivery_range_northeast_lng' => 'nullable|string|max:255',
                'delivery_range_southwest_lat' => 'nullable|string|max:255',
                'delivery_range_southwest_lng' => 'nullable|string|max:255',

            ]);
            // dd($validated);
            Log::info("Validated data:", $validated);
            $settings = Setting::first();
            Log::info("Settings fetch");
            if (!$settings) {
                $settings = Setting::create($validated
                //  + [
                //     'created_by' => auth()->id(),
                //     'updated_by' => auth()->id()
                // ]
            );
            } else {
                $settings->update($validated
                // + [
                //     'updated_by' => auth()->id()
                // ]
            );
            }
            Log::info("Settings after update:");
            return response()->json([
                'success' => true,
                'message' => 'Settings updated successfully',
                'data' => $this->prepareSettingPayload($settings),
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating settings: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update settings'.$e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $setting = Setting::findOrFail($id);
            $setting->delete();

            return response()->json([
                'success' => true,
                'message' => 'Setting soft deleted successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error soft deleting setting: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to soft delete setting'
            ], 500);
        }
    }

    public function forceDelete($id)
    {
        try {
            $setting = Setting::withTrashed()->findOrFail($id);
            $setting->forceDelete();

            return response()->json([
                'success' => true,
                'message' => 'Setting permanently deleted successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error permanently deleting setting: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to permanently delete setting'
            ], 500);
        }
    }

    public function restore($id)
    {
        try {
            $setting = Setting::withTrashed()->findOrFail($id);
            $setting->restore();

            return response()->json([
                'success' => true,
                'message' => 'Setting restored successfully',
                'data' => $setting
            ]);
        } catch (\Exception $e) {
            Log::error('Error restoring setting: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to restore setting'
            ], 500);
        }
    }

    // public function uploadLogo(Request $request, Setting $setting)
    // {
    //     try {
    //         $request->validate([
    //             'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
    //         ]);

    //         // ✅ Ensure model has been saved
    //         if (!$setting->exists) {
    //             $setting->save();
    //         }

    //         if ($request->hasFile('logo')) {
    //             $file = $request->file('logo');
    //             $existingPath = optional(Setting::first())->logo; // if you store path in settings->logo
    //             // $result = FileUpload::upload($file, 'logos', $existingPath, true);

    //             $result = FileUpload::upload(
    //                 $file,
    //                 'logos',
    //                 $existingPath ?? null,
    //                 true,
    //                 $setting,
    //                 'logo',
    //                 true // replace old
    //             );



    //             return response()->json([
    //                 'success' => true,
    //                 'url' => $result['urls'][0] ?? null,
    //                 'path' => $result['paths'][0] ?? null,
    //             ]);
    //         }

    //         return response()->json([
    //             'success' => false,
    //             'message' => 'No file uploaded'
    //         ], 400);
    //     } catch (\Exception $e) {
    //         Log::error('Error uploading logo: ' . $e->getMessage());
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Failed to upload logo'
    //         ], 500);
    //     }
    // }
    // public function uploadLogo(Request $request)
    // {
    //     try {
    //         $request->validate([
    //             'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
    //         ]);

    //         // Work with the singleton settings row for the tenant
    //         $setting = Setting::first();
    //         if (!$setting) {
    //             $setting = Setting::create([
    //                 'business_name' => 'My Restaurant',
    //                 'created_by' => auth()->id(),
    //                 'updated_by' => auth()->id(),
    //             ]);
    //         }

    //         if ($request->hasFile('logo')) {
    //             $file = $request->file('logo');

    //             // delete all existing logo media items (defensive)
    //             try {
    //                 $existing = $setting->getMedia('logo');
    //                 foreach ($existing as $m) {
    //                     try { $m->delete(); } catch (\Throwable $ex) { /* ignore individual delete errors */ }
    //                 }
    //             } catch (\Throwable $e) {
    //                 // ignore deletion errors
    //             }

    //             // create a predictable unique filename to avoid caching issues
    //             $fileName = 'logo_' . tenant('id') . '_' . time() . '.' . $file->getClientOriginalExtension();

    //             // store media
    //             $media = $setting->addMediaFromRequest('logo')
    //                 ->usingFileName($fileName)
    //                 ->toMediaCollection('logo', 's3');

    //             $url = $media->getUrl();

    //             // Build normalized S3 key with an 'assets/' prefix to match CDN layout
    //             $s3Key = 'assets/tenant_' . tenant('id') . '/logo/' . $fileName;
    //             // normalize separators (ensure forward slashes)
    //             $s3Key = str_replace('\\', '/', $s3Key);

    //             // Persist s3_path as a custom property on the media record so it's authoritative
    //             try {
    //                 $media->setCustomProperty('s3_path', $s3Key);
    //                 $media->save();
    //             } catch (\Throwable $e) {
    //                 // ignore if unable to set custom property
    //             }

    //             // Save url to settings->logo and path to settings->logo_path (keep both)
    //             try {
    //                 $publicUrl = Storage::disk('s3')->url($s3Key);
    //             } catch (\Throwable $e) {
    //                 // fallback to media url
    //                 $publicUrl = $url;
    //             }

    //             $setting->logo = $publicUrl;
    //             if (array_key_exists('logo_path', $setting->getAttributes()) || in_array('logo_path', $setting->getFillable())) {
    //                 $setting->logo_path = $s3Key;
    //             }
    //             $setting->save();

    //             return response()->json([
    //                 'success' => true,
    //                 'url'  => $url,
    //                 'path' => $s3Key ?? null,
    //                 'media' => ['id' => $media->id, 'url' => $url, 'file_name' => $media->file_name ?? null, 'collection' => $media->collection_name ?? null],
    //                 'setting' => $this->appendLogoUrlToSetting($setting)
    //             ]);
    //         }

    //         return response()->json([
    //             'success' => false,
    //             'message' => 'No file uploaded'
    //         ], 400);
    //     } catch (\Exception $e) {
    //         Log::error('Error uploading logo: ' . $e->getMessage());

    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Failed to upload logo'
    //         ], 500);
    //     }
    // }

public function uploadLogo(Request $request)
{
    try {
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $setting = Setting::firstOrCreate([], [
            'business_name' => 'My Restaurant',
            'created_by' => auth()->id(),
            'updated_by' => auth()->id(),
        ]);

        if (!$request->hasFile('logo')) {
            return response()->json(['success' => false, 'message' => 'No file uploaded'], 400);
        }

        $file = $request->file('logo');

        // Get previous path safely
        $previousPath = $setting->logo_path;
        if (!$previousPath && $setting->hasMedia('logo')) {
            $previousPath = $setting->getFirstMedia('logo')?->getCustomProperty('s3_path');
        }

        // Upload to S3
        $result = FileUpload::upload($file, 'logos', $previousPath, true);
        $path = $result['paths'][0] ?? null;
        $url = $result['urls'][0] ?? null;

        if (!$path || !$url) {
            return response()->json(['success' => false, 'message' => 'Failed to store file'], 500);
        }

        // Remove existing logo media
        $setting->clearMediaCollection('logo');

        // Add new media - use the correct approach
        $media = $setting
            ->addMediaFromRequest('logo') // Use the uploaded file directly
            ->usingFileName($file->getClientOriginalName())
            ->toMediaCollection('logo', 's3');

        // Set custom properties
        $media->setCustomProperty('s3_path', $path);
        $media->setCustomProperty('public_url', $url);
        $media->save();

        // Update setting
        $setting->update([
            'logo' => $url,
            // 'logo_path' => $path,
            // 'updated_by' => auth()->id(),
        ]);

        // Refresh the setting to get latest data
        $setting->refresh();

        return response()->json([
            'success' => true,
            'url' => $url,
            'path' => $path,
            'media' => [
                'id' => $media->id,
                'url' => $url,
                's3_path' => $path,
            ],
            'setting' => $this->prepareSettingPayload($setting),
        ]);

    } catch (\Exception $e) {
        Log::error('Error uploading logo: ' . $e->getMessage());
        return response()->json(['success' => false, 'message' => 'Failed to upload logo: ' . $e->getMessage()], 500);
    }
}


    public function getDetails()
    {
        Log::info("Fetching public settings");
        try {
            $settings = Setting::first();

            Log::info("Fetching public settings", [$settings]);
            if (!$settings) {
                return response()->json([
                    'success' => false,
                    'message' => 'Settings not found',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $this->prepareSettingPayload($settings),
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching public settings: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch public settings'
            ], 500);
        }
    }

    /**
     * Helper to include computed logo_url in settings response.
     */
    protected function appendLogoUrlToSetting($settings)
    {
        if (!$settings) return $settings;

        // If media exists in 'logo' collection, use its url
        try {
            $media = $settings->getFirstMedia('logo');
            if ($media) {
                // prefer custom s3_path if set
                $s3Path = $media->getCustomProperty('s3_path');
                if ($s3Path) {
                    try {
                        $settings->logo_url = Storage::disk('s3')->url(str_replace('\\', '/', $s3Path));
                        return $settings;
                    } catch (\Throwable $e) {
                        // fallback to media url
                    }
                }
                $settings->logo_url = $media->getUrl();
                return $settings;
            }
        } catch (\Throwable $e) {
            // ignore
        }

        // If media exists in 'logo' collection, prefer that URL
        try {
            $media = $settings->getFirstMedia('logo');
            if ($media) {
                $settings->logo_url = $media->getUrl();
                return $settings;
            }
        } catch (\Throwable $e) {
            // ignore
        }

        // If settings->logo_path exists, try to build a disk URL
        if (array_key_exists('logo_path', $settings->getAttributes()) && $settings->logo_path) {
            try {
                $settings->logo_url = Storage::disk('s3')->url($settings->logo_path);
                return $settings;
            } catch (\Throwable $e) {
                // ignore
            }
        }

        // fall back to any stored logo value (may be full URL)
        if ($settings->logo) {
            // sanitize backslashes and duplicate assets segments
            $clean = str_replace('\\', '/', $settings->logo);
            // collapse repeated 'assets/' occurrences (assets/assets/... -> assets/...)
            $clean = preg_replace('#assets/+(assets/)+#i', 'assets/', $clean);
            // also collapse any accidental double 'assets/assets'
            $clean = str_replace('assets/assets/', 'assets/', $clean);
            $settings->logo_url = $clean;
            return $settings;
        }

        $settings->logo_url = null;
        return $settings;
    }

    /**
     * Logo + tenant hostname from central `domains` (and optional subdomain fallback).
     */
    protected function prepareSettingPayload($settings)
    {
        $withLogo = $this->appendLogoUrlToSetting($settings);

        return $this->appendTenantPublicSiteToSetting($withLogo);
    }

    protected function appendTenantPublicSiteToSetting($settings)
    {
        if (! $settings) {
            return $settings;
        }

        try {
            $tenant = tenant();
            if (! $tenant) {
                return $settings;
            }

            $host = $tenant->domains()->orderBy('id')->value('domain');

            if (! $host && filled($tenant->subdomain)) {
                $host = $tenant->subdomain.'.'.ltrim((string) config('app.domain'), '.');
            }

            if ($host) {
                $host = preg_replace('#^https?://#i', '', rtrim((string) $host, '/'));
                $host = preg_replace('#/.*$#', '', $host);

                $lower = strtolower($host);
                $isLocal = str_contains($lower, 'localhost') || str_contains($lower, '127.0.0.1');
                $scheme = $isLocal ? 'http' : 'https';

                $settings->setAttribute('public_website_host', $host);
                $settings->setAttribute('public_website_url', $scheme.'://'.$host);
            }
        } catch (\Throwable $e) {
            Log::debug('appendTenantPublicSiteToSetting: '.$e->getMessage());
        }

        return $settings;
    }

    public function email_index()

    {
        try {
            Log::info('Email setting is fetching');
            $email_setting = EmailSettings::first();

            if (!$email_setting) {
                $email_setting = EmailSettings::create([
                    'driver' => '',
                    'host' => '',
                    'port' => '',
                    'username' => '',
                    'password' => '',
                    'email' => '',
                    'encryption' => '',
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $email_setting
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching settings: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch settings'
            ], 500);
        }
    }
    public function save_email_setting(Request $request)
    {
        try {
            Log::info("Request data:", $request->all());
            dd($request->all());
            $validated = $request->validate([
                'driver' => 'nullable|string',
                'host' => 'nullable|string',
                'port' => 'nullable|string',
                'username' => 'nullable|email|string',
                'email' => 'nullable|email|string',
                'password' => 'nullable|string',
                'encryption' => 'nullable|string',
            ]);
            Log::info("Validated data:", $validated);
            $email_settings = EmailSettings::first();
            Log::info("Settings fetch");
            if (!$email_settings) {
                $email_settings = EmailSettings::create($validated
            );
            } else {
                $email_settings->update($validated
            );
            }
            Log::info("Email Setting after update:");
            return response()->json([
                'success' => true,
                'message' => 'Email Setup updated successfully',
                'data' => $email_settings
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating settings: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update Email'
            ], 500);
        }
    }

    public function updateDiscount(Request $request)
    {
        try {
            Log::info("Request data:", $request->all());
            $validated = $request->validate([
                'discount' => 'nullable'
            ]);
            Log::info("Validated data:", $validated);
            $settings = Setting::first();
            Log::info("Settings fetch");
            if (!$settings) {
                $settings = Setting::create($validated
                //  + [
                //     'created_by' => auth()->id(),
                //     'updated_by' => auth()->id()
                // ]
            );
            } else {
                $settings->update($validated
            );
            }
            Log::info("Settings after update:");
            return response()->json([
                'success' => true,
                'message' => 'Settings updated successfully',
                'data' => $this->prepareSettingPayload($settings),
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating settings: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update settings'
            ], 500);
        }
    }
}
