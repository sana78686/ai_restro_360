<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Launch Gate Enabled
    |--------------------------------------------------------------------------
    | When true, every request (web + API) must pass the launch password first.
    | Set to false when you're ready to go live — no code changes needed.
    |
    */
    'enabled' => env('LAUNCH_GATE_ENABLED', true),

    /*
    |--------------------------------------------------------------------------
    | Launch Gate Password
    |--------------------------------------------------------------------------
    | The password visitors must enter to access the site (per browser/session).
    |
    */
    'password' => env('LAUNCH_GATE_PASSWORD', 'restro360'),

];
