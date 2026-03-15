<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enter password — {{ \App\Helpers\AppNameHelper::getAppName() }}</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; }
        body {
            margin: 0;
            min-height: 100vh;
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }
        .gate {
            background: rgba(255,255,255,0.06);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 16px;
            padding: 2.5rem;
            width: 100%;
            max-width: 380px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
            margin: 0 0 0.5rem;
            font-size: 1.35rem;
            font-weight: 600;
            color: #fff;
            text-align: center;
        }
        .sub {
            color: rgba(255,255,255,0.6);
            font-size: 0.9rem;
            text-align: center;
            margin-bottom: 1.75rem;
        }
        form { margin: 0; }
        label {
            display: block;
            color: rgba(255,255,255,0.85);
            font-size: 0.9rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
        }
        input[type="password"] {
            width: 100%;
            padding: 0.85rem 1rem;
            font-size: 1rem;
            font-family: inherit;
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 10px;
            background: rgba(255,255,255,0.08);
            color: #fff;
            margin-bottom: 1rem;
        }
        input[type="password"]::placeholder { color: rgba(255,255,255,0.4); }
        input[type="password"]:focus {
            outline: none;
            border-color: rgba(99, 102, 241, 0.6);
            background: rgba(255,255,255,0.1);
        }
        .btn {
            width: 100%;
            padding: 0.9rem;
            font-size: 1rem;
            font-weight: 600;
            font-family: inherit;
            color: #fff;
            background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: transform 0.05s, box-shadow 0.2s;
        }
        .btn:hover {
            box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
        }
        .btn:active { transform: scale(0.98); }
        .error {
            background: rgba(239, 68, 68, 0.2);
            border: 1px solid rgba(239, 68, 68, 0.4);
            color: #fca5a5;
            font-size: 0.875rem;
            padding: 0.6rem 0.75rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="gate">
        <h1>Enter password</h1>
        <p class="sub">This site is not yet public. Enter the access password to continue.</p>

        @if ($errors->has('password'))
            <div class="error" role="alert">{{ $errors->first('password') }}</div>
        @endif

        <form method="POST" action="{{ route('launch-gate.unlock') }}">
            @csrf
            <label for="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Enter password" required autofocus autocomplete="current-password">
            <button type="submit" class="btn">Continue</button>
        </form>
    </div>
</body>
</html>
