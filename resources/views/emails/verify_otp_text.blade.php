{{ config('app.name', 'AiRestro360') }} - Email Verification
================================================

Hello,

Thank you for registering with {{ \App\Helpers\AppNameHelper::getAppName() }}. To complete your account setup and start using our services, please verify your email address using the verification code below.

Your verification code is: {{ $otp }}

IMPORTANT: This verification code will expire in 10 minutes for security reasons. Please use it promptly.

SECURITY NOTICE: Never share this code with anyone. Our team will never ask for your verification code via phone, email, or any other means.

If you didn't request this verification code, please ignore this email or contact our support team if you have concerns.

Need help? If you're having trouble with verification, please contact our support team at {{ config('app.contact.email', 'info@apimstec.com') }}

---
{{ config('app.name', 'AiRestro360') }}
Restaurant Management System

This is an automated message. Please do not reply to this email.
