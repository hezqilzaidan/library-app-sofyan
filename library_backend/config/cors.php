<?php
// config/cors.php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Konfigurasi ini menentukan origin mana yang boleh mengakses API
    | Penting untuk keamanan dan mencegah unauthorized access
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'], // Semua HTTP methods (GET, POST, PUT, DELETE, dll)

    'allowed_origins' => [
        'http://localhost:3000',    // Next.js default port
        'http://127.0.0.1:3000',   // Alternatif localhost
        'http://localhost:5173',   // Vite default port (jika pakai Vite)
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Semua headers diizinkan

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false, // Set true jika pakai cookies/session

];