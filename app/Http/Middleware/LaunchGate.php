<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class LaunchGate
{
    /**
     * Paths that are allowed without passing the gate (the gate page and unlock endpoint).
     */
    protected array $except = [
        'launch-gate',
        'launch-gate/unlock',
    ];

    public function handle(Request $request, Closure $next): Response
    {
        if (! config('launch_gate.enabled', true)) {
            return $next($request);
        }

        if ($this->isExcept($request)) {
            return $next($request);
        }

        if ($this->isUnlocked($request)) {
            return $next($request);
        }

        if ($request->expectsJson() || $request->is('api/*') || $request->is('*api*')) {
            return response()->json([
                'message' => 'Access restricted. Password required.',
                'require_launch_password' => true,
            ], 403);
        }

        return redirect()->guest('/launch-gate');
    }

    protected function isExcept(Request $request): bool
    {
        $path = $request->path();
        foreach ($this->except as $except) {
            if ($path === $except || str_starts_with($path, $except . '/')) {
                return true;
            }
        }
        return false;
    }

    protected function isUnlocked(Request $request): bool
    {
        return $request->session()->get('launch_gate_unlocked', false) === true;
    }
}
