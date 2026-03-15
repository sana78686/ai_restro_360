<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LaunchGateController extends Controller
{
    public function show()
    {
        if (! config('launch_gate.enabled', true)) {
            return redirect('/');
        }

        if (session('launch_gate_unlocked', false)) {
            return redirect()->intended('/');
        }

        return view('launch-gate');
    }

    public function unlock(Request $request)
    {
        if (! config('launch_gate.enabled', true)) {
            return $request->expectsJson()
                ? response()->json(['unlocked' => true, 'redirect' => '/'])
                : redirect('/');
        }

        $request->validate([
            'password' => ['required', 'string'],
        ]);

        $correct = config('launch_gate.password');
        $given = $request->input('password');

        // Support hashed (bcrypt) or plain password in config
        $matches = $given === $correct || (strlen($correct) >= 60 && Hash::check($given, $correct));
        if (! $matches) {
            throw ValidationException::withMessages([
                'password' => ['The password is incorrect.'],
            ]);
        }

        $request->session()->put('launch_gate_unlocked', true);

        if ($request->expectsJson()) {
            return response()->json(['unlocked' => true, 'redirect' => '/']);
        }

        return redirect()->intended('/');
    }
}
