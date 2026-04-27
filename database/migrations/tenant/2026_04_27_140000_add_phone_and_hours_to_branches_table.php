<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('branches', function (Blueprint $table) {
            $table->string('phone', 32)->nullable()->after('address');
            $table->string('opens_at', 8)->nullable()->after('phone');
            $table->string('closes_at', 8)->nullable()->after('opens_at');
        });
    }

    public function down(): void
    {
        Schema::table('branches', function (Blueprint $table) {
            $table->dropColumn(['phone', 'opens_at', 'closes_at']);
        });
    }
};
