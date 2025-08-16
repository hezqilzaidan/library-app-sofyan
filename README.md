📚 Sofyan Library App

Project ini adalah aplikasi manajemen anggota perpustakaan yang dikembangkan sebagai bagian dari test coding.
Aplikasi terdiri dari 2 bagian utama:

Frontend → Dibangun menggunakan Next.js + TypeScript

Backend → Dibangun menggunakan Laravel

🚀 Fitur Utama

CRUD Data Anggota Perpustakaan

Validasi input menggunakan Laravel Form Request

Seeder untuk data awal

Dashboard interaktif (Next.js)

Integrasi API Laravel dengan frontend


🛠️ Cara Menjalankan

1️⃣ Jalankan Backend (Laravel)

- Masuk ke folder backend
cd library_backend


- Install dependency
composer install

- Copy file .env.example → rename jadi .env, lalu sesuaikan database.
- Generate key & migrate database

php artisan key:generate
php artisan migrate --seed

- Jalankan server
php artisan serve

Backend jalan di: http://127.0.0.1:8000


2️⃣ Jalankan Frontend (Next.js)

- Masuk ke folder frontend
cd library-frontend

- Install dependency
npm install

- Jalankan development server
npm run dev

Frontend jalan di: http://localhost:3000

👨‍💻 Author
Developed by Ahmed Hezqial Zaidan
