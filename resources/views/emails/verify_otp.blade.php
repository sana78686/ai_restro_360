<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification - {{ \App\Helpers\AppNameHelper::getAppName() }}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f6f8;
            margin: 0;
            padding: 20px;
        }

        .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            overflow: hidden;
        }

        .email-header {
            background: linear-gradient(135deg, #e53935, #d32f2f);
            color: #fff;
            text-align: center;
            padding: 30px 20px;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }

        .email-body {
            padding: 40px 30px;
        }

        .email-body h2 {
            color: #222;
            margin-top: 0;
            font-size: 20px;
        }

        .otp-box {
            background-color: #fff5f5;
            border: 2px dashed #e53935;
            border-radius: 8px;
            text-align: center;
            padding: 25px;
            margin: 30px 0;
        }

        .otp-label {
            font-size: 15px;
            color: #777;
        }

        .otp-code {
            font-size: 32px;
            font-weight: 700;
            color: #d32f2f;
            letter-spacing: 8px;
            margin: 12px 0;
            font-family: 'Courier New', monospace;
        }

        .notice-warning {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 6px;
            padding: 15px;
            color: #856404;
            margin: 20px 0;
        }

        .divider {
            height: 1px;
            background-color: #eee;
            margin: 30px 0;
        }

        .email-footer {
            background-color: #fafafa;
            text-align: center;
            padding: 20px;
            font-size: 13px;
            color: #777;
        }

        .email-footer strong {
            color: #d32f2f;
        }

        .btn-primary {
            display: inline-block;
            background-color: #d32f2f;
            color: #fff;
            padding: 12px 28px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 20px;
        }

        @media (max-width: 600px) {
            body {
                padding: 10px;
            }

            .email-body {
                padding: 25px 15px;
            }

            .otp-code {
                font-size: 28px;
                letter-spacing: 6px;
            }
        }
    </style>
</head>

<body>
    <div class="email-wrapper">
        <!-- Header -->
        <div class="email-header">
            <h1>{{ config('app.name', 'AiRestro360') }}</h1>
            <p style="margin-top: 8px; opacity: 0.9;">Email Verification</p>
        </div>

        <!-- Body -->
        <div class="email-body">
            <h2>Verify Your Email Address</h2>
            <p>Hello,</p>
            <p>Thank you for signing up with <strong>{{ config('app.name', 'AiRestro360') }}</strong>. Please verify
                your email using the code below to activate your account.</p>

            <div class="otp-box">
                <div class="otp-label">Your verification code is:</div>
                <div class="otp-code">{{ $otp }}</div>
            </div>

            <div class="notice-warning">
                ⏰ <strong>Note:</strong> This code will expire in <strong>10 minutes</strong>. Please use it promptly.
            </div>

            <p>If you didn’t request this verification, you can safely ignore this email.</p>

            <div class="divider"></div>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <p><strong>{{ config('app.name', 'AiRestro360') }}</strong> — Restaurant Management System</p>
            <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply.</p>
        </div>
    </div>
</body>

</html>
