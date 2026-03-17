🎉 Welcome to {{ config('app.name', 'AiRestro360') }}!
================================================

Hello {{ $user->name ?? 'there' }}!

Congratulations! Your email has been successfully verified and your account is now fully activated. You're all set to start managing your restaurant with our comprehensive management system.

✅ Email Successfully Verified

@if($tenant)
🏪 Your Restaurant: {{ $tenant->business_name ?? 'Restaurant' }}
🌐 Your Domain: {{ $tenant->domains->first()->domain ?? 'your-domain.com' }}
@endif

WHAT YOU CAN DO NOW:
===================

🍽️  Menu Management
   Create and manage your restaurant menu with categories, items, and pricing

📊  Order Tracking
   Monitor and manage customer orders in real-time

👥  Staff Management
   Manage your team with role-based access and permissions

📈  Analytics & Reports
   Track sales, performance, and customer insights

📱  Online Presence
   Manage your restaurant's online ordering and reservations

⚙️  Settings & Customization
   Customize your restaurant's appearance and settings

READY TO GET STARTED?
====================

Access your restaurant management dashboard and begin setting up your system.

Dashboard: {{ config('app.url') }}/dashboard/home

NEED HELP GETTING STARTED?
=========================

We're here to help you make the most of your restaurant management system:

📚 Documentation: Check our comprehensive guides and tutorials
🎥 Video Tutorials: Watch step-by-step setup videos
💬 Support Team: Contact us at {{ config('app.contact.email', 'info@apimstec.com') }}
📞 Phone Support: Call us for immediate assistance

💡 PRO TIP: Start by setting up your restaurant profile, adding your menu items, and configuring your delivery settings. This will get your system ready for customers in no time!

---
{{ config('app.name', 'AiRestro360') }}
Restaurant Management System

This is an automated message. Please do not reply to this email.
