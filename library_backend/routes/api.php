<?php
// routes/api.php

use App\Http\Controllers\Api\MemberController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Routes untuk API endpoint aplikasi perpustakaan
| Semua route disini otomatis dapat prefix /api
|
*/

// Route untuk mendapatkan info user yang sedang login (jika menggunakan auth)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Group route dengan prefix v1 untuk versioning API
Route::prefix('v1')->group(function () {
    
    // Resource route untuk CRUD anggota
    // Ini akan generate semua route CRUD:
    // GET    /api/v1/members           -> index()
    // POST   /api/v1/members           -> store()
    // GET    /api/v1/members/{uuid}    -> show()
    // PUT    /api/v1/members/{uuid}    -> update()
    // DELETE /api/v1/members/{uuid}    -> destroy()
    Route::apiResource('members', MemberController::class)->parameters([
        'members' => 'uuid' // Gunakan UUID sebagai parameter, bukan ID
    ]);
    
    // Route tambahan jika diperlukan
    // Route::get('/members/search', [MemberController::class, 'search']);
    // Route::get('/members/export', [MemberController::class, 'export']);
    
});