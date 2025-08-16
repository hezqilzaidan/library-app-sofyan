<?php
// database/seeders/DatabaseSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed aplikasi database.
     * Method ini dipanggil saat menjalankan php artisan db:seed
     */
    public function run(): void
    {
        // Panggil seeder lain
        $this->call([
            MemberSeeder::class,
            // Tambahkan seeder lain jika diperlukan
            // UserSeeder::class,
        ]);
    }
}