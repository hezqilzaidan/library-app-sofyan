<?php
// database/migrations/xxxx_create_members_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Membuat tabel members dengan UUID sebagai primary key
     */
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            // UUID sebagai primary key (bukan auto increment)
            $table->uuid('uuid')->primary();
            
            // Field sesuai requirement
            $table->string('nama', 255)->comment('Nama lengkap anggota');
            $table->string('email')->unique()->comment('Email unik anggota');
            $table->string('no_hp', 15)->comment('Nomor HP anggota');
            $table->text('alamat')->comment('Alamat lengkap anggota');
            
            // Timestamps Laravel (created_at, updated_at)
            $table->timestamps();
        });
    }

    /**
     * Rollback migration
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};