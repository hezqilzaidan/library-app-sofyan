# Sofyan Library - Backend

Backend aplikasi **Sistem Perpustakaan Sofyan** yang dibangun menggunakan **Laravel 10**.  
Aplikasi ini menyediakan **RESTful API** untuk manajemen data anggota dan terhubung dengan frontend (Next.js).

---

## 🚀 Fitur Utama
- CRUD data anggota (Create, Read, Update, Delete).
- Validasi input menggunakan **Form Request**.
- Seeder untuk mengisi data awal.
- API berbasis JSON untuk komunikasi dengan frontend.

---

## 🛠️ Teknologi
- [Laravel 10](https://laravel.com/)
- [PHP 8.1+](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [MySQL / MariaDB](https://www.mysql.com/)

---

## ⚙️ Persiapan
Sebelum menjalankan project, pastikan sudah menginstall:
- **PHP 8.1+**
- **Composer**
- **MySQL/MariaDB**
- (Opsional) XAMPP/Laragon untuk mempermudah environment.

---

## ▶️ Cara Menjalankan
1. Clone repository:

   git clone <repo-url>
   cd library_backend

2. Install dependencies:

   composer install

3. Buat file .env dari .env.example lalu sesuaikan konfigurasi database:

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=library_db
    DB_USERNAME=root
    DB_PASSWORD=

4. Generate application key:

  php artisan key:generate

5. Jalankan migrasi & seeder:
  
  php artisan migrate --seed

6.Jalankan server:

  php artisan serve

7. API tersedia di:

  http://127.0.0.1:8000/api


  📂 Struktur Direktori
  app/
  ├── Http/
  │    ├── Controllers/    # Controller API
  │    ├── Requests/       # Form Request (validasi input)
  ├── Models/              # Model Eloquent
  database/
  ├── migrations/          # Struktur tabel database
  ├── seeders/             # Data awal
  routes/
  ├── api.php              # Endpoint API

📡 Contoh Endpoint API

  GET /api/anggota → list semua anggota

  POST /api/anggota → tambah anggota baru

  PUT /api/anggota/{id} → update data anggota

  DELETE /api/anggota/{id} → hapus anggota

🧑‍💻 Pengembangan

Gunakan php artisan tinker untuk testing query.

Gunakan php artisan migrate:refresh --seed untuk reset database dengan data awal.

