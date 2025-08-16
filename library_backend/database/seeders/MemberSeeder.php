<?php
// database/seeders/MemberSeeder.php

namespace Database\Seeders;

use App\Models\Member;
use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
{
    /**
     * Seed data dummy anggota untuk testing
     * Data ini akan membantu development dan testing aplikasi
     */
    public function run(): void
    {
        // Data dummy anggota dengan variasi yang realistic
        $members = [
            [
                'nama' => 'John Doe',
                'email' => 'john.doe@example.com',
                'no_hp' => '081234567890',
                'alamat' => 'Jl. Merdeka No. 123, RT 05/RW 02, Kelurahan Menteng, Jakarta Pusat, DKI Jakarta 10110'
            ],
            [
                'nama' => 'Jane Smith',
                'email' => 'jane.smith@example.com',
                'no_hp' => '081234567891',
                'alamat' => 'Jl. Sudirman No. 456, RT 08/RW 03, Kelurahan Senayan, Jakarta Selatan, DKI Jakarta 12190'
            ],
            [
                'nama' => 'Ahmad Rahman',
                'email' => 'ahmad.rahman@gmail.com',
                'no_hp' => '085234567892',
                'alamat' => 'Jl. Gatot Subroto No. 789, RT 12/RW 05, Kelurahan Jatinegara, Bekasi, Jawa Barat 17148'
            ],
            [
                'nama' => 'Siti Nurhaliza',
                'email' => 'siti.nurhaliza@yahoo.com',
                'no_hp' => '087234567893',
                'alamat' => 'Jl. Ahmad Yani No. 321, RT 03/RW 01, Kelurahan Dago, Bandung, Jawa Barat 40132'
            ],
            [
                'nama' => 'Budi Santoso',
                'email' => 'budi.santoso@outlook.com',
                'no_hp' => '089234567894',
                'alamat' => 'Jl. Diponegoro No. 654, RT 07/RW 04, Kelurahan Gubeng, Surabaya, Jawa Timur 60241'
            ],
            [
                'nama' => 'Dewi Lestari',
                'email' => 'dewi.lestari@gmail.com',
                'no_hp' => '081345678901',
                'alamat' => 'Jl. Malioboro No. 88, RT 02/RW 01, Kelurahan Gedongtengen, Yogyakarta, DI Yogyakarta 55271'
            ],
            [
                'nama' => 'Rizki Pratama',
                'email' => 'rizki.pratama@hotmail.com',
                'no_hp' => '082345678902',
                'alamat' => 'Jl. Asia Afrika No. 112, RT 09/RW 03, Kelurahan Braga, Bandung, Jawa Barat 40111'
            ]
        ];

        // Loop dan create setiap member
        foreach ($members as $memberData) {
            Member::create($memberData);
        }
        
        // Output info ke console
        $this->command->info('Berhasil menambahkan ' . count($members) . ' data anggota dummy');
    }
}