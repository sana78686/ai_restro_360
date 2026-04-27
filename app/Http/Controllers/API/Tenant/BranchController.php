<?php

namespace App\Http\Controllers\API\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class BranchController extends Controller
{
    public function index()
    {
        try {
            if (! Branch::query()->exists()) {
                $setting = Setting::first();
                $business = $setting?->business_name ?: 'Restaurant';
                Branch::create([
                    'name' => $business.' — Main',
                    'code' => 'main',
                    'address' => $setting?->address,
                    'phone' => null,
                    'opens_at' => null,
                    'closes_at' => null,
                    'cutoff_time' => '04:00',
                    'is_default' => true,
                    'sort_order' => 0,
                ]);
            }

            $branches = Branch::query()
                ->orderByDesc('is_default')
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $branches,
            ]);
        } catch (\Exception $e) {
            Log::error('Branch index: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to load branches',
            ], 500);
        }
    }

    public function store(Request $request)
    {
        if ($request->input('code') === '') {
            $request->merge(['code' => null]);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:64|unique:branches,code',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:32',
            'opens_at' => 'nullable|string|max:8',
            'closes_at' => 'nullable|string|max:8',
            'cutoff_time' => 'nullable|string|max:16',
            'is_default' => 'sometimes|boolean',
        ]);

        try {
            return DB::transaction(function () use ($validated) {
                $isDefault = $validated['is_default'] ?? false;
                if ($isDefault || ! Branch::query()->where('is_default', true)->exists()) {
                    Branch::query()->update(['is_default' => false]);
                    $isDefault = true;
                }

                $maxSort = (int) Branch::query()->max('sort_order');

                $code = isset($validated['code']) && $validated['code'] !== ''
                    ? trim($validated['code'])
                    : null;
                if ($code === null || $code === '') {
                    $base = Str::slug($validated['name']) ?: 'branch';
                    $code = $base;
                    $i = 0;
                    while (Branch::where('code', $code)->exists()) {
                        $i++;
                        $code = $base.'-'.$i;
                    }
                } else {
                    $code = strtolower(preg_replace('/\s+/', '-', $code));
                }

                $branch = Branch::create([
                    'name' => $validated['name'],
                    'code' => $code,
                    'address' => $validated['address'] ?? null,
                    'phone' => $validated['phone'] ?? null,
                    'opens_at' => $validated['opens_at'] ?? null,
                    'closes_at' => $validated['closes_at'] ?? null,
                    'cutoff_time' => $validated['cutoff_time'] ?? null,
                    'is_default' => $isDefault,
                    'sort_order' => $maxSort + 1,
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Branch created',
                    'data' => $branch,
                ], 201);
            });
        } catch (\Exception $e) {
            Log::error('Branch store: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Could not create branch',
            ], 500);
        }
    }

    public function update(Request $request, Branch $branch)
    {
        if ($request->input('code') === '') {
            $request->merge(['code' => null]);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'code' => 'sometimes|nullable|string|max:64|unique:branches,code,'.$branch->id,
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:32',
            'opens_at' => 'nullable|string|max:8',
            'closes_at' => 'nullable|string|max:8',
            'cutoff_time' => 'nullable|string|max:16',
            'is_default' => 'sometimes|boolean',
        ]);

        try {
            return DB::transaction(function () use ($branch, $validated) {
                if (array_key_exists('code', $validated) && ($validated['code'] === null || $validated['code'] === '')) {
                    unset($validated['code']);
                }

                if (! empty($validated['is_default']) && $validated['is_default']) {
                    Branch::query()->where('id', '!=', $branch->id)->update(['is_default' => false]);
                }

                $branch->update($validated);

                if (! Branch::query()->where('is_default', true)->exists()) {
                    Branch::query()->orderBy('id')->first()?->update(['is_default' => true]);
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Branch updated',
                    'data' => $branch->fresh(),
                ]);
            });
        } catch (\Exception $e) {
            Log::error('Branch update: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Could not update branch',
            ], 500);
        }
    }

    public function destroy(Branch $branch)
    {
        try {
            if (Branch::query()->count() <= 1) {
                return response()->json([
                    'success' => false,
                    'message' => 'You must keep at least one branch.',
                ], 422);
            }

            return DB::transaction(function () use ($branch) {
                $wasDefault = $branch->is_default;
                $branch->delete();

                if ($wasDefault) {
                    $next = Branch::query()->orderBy('id')->first();
                    if ($next) {
                        $next->update(['is_default' => true]);
                    }
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Branch deleted',
                ]);
            });
        } catch (\Exception $e) {
            Log::error('Branch destroy: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Could not delete branch',
            ], 500);
        }
    }

    public function setDefault(Branch $branch)
    {
        try {
            DB::transaction(function () use ($branch) {
                Branch::query()->update(['is_default' => false]);
                $branch->update(['is_default' => true]);
            });

            return response()->json([
                'success' => true,
                'message' => 'Default branch updated',
                'data' => $branch->fresh(),
            ]);
        } catch (\Exception $e) {
            Log::error('Branch setDefault: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Could not set default branch',
            ], 500);
        }
    }
}
