<?php
// app/Http/Controllers/Api/MemberController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMemberRequest;
use App\Http\Requests\UpdateMemberRequest;
use App\Models\Member;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MemberController extends Controller
{
    /**
     * GET /api/v1/members
     * Menampilkan daftar semua anggota dengan pagination opsional
     */
    public function index(Request $request): JsonResponse
    {
        try {
            // Query builder untuk fleksibilitas
            $query = Member::query();
            
            // Tambah fitur pencarian jika ada parameter 'search'
            if ($request->has('search') && !empty($request->search)) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('nama', 'LIKE', "%{$search}%")
                      ->orWhere('email', 'LIKE', "%{$search}%")
                      ->orWhere('no_hp', 'LIKE', "%{$search}%");
                });
            }
            
            // Urutkan berdasarkan created_at terbaru
            $members = $query->orderBy('created_at', 'desc')->get();
            
            return response()->json([
                'success' => true,
                'message' => 'Data anggota berhasil diambil',
                'data' => $members,
                'total' => $members->count()
            ], 200);
            
        } catch (\Exception $e) {
            // Log error untuk debugging
            Log::error('Error fetching members: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data anggota',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * POST /api/v1/members
     * Menyimpan anggota baru ke database
     */
    public function store(StoreMemberRequest $request): JsonResponse
    {
        try {
            // Data sudah divalidasi oleh StoreMemberRequest
            $member = Member::create($request->validated());
            
            Log::info('New member created', ['uuid' => $member->uuid, 'nama' => $member->nama]);
            
            return response()->json([
                'success' => true,
                'message' => 'Anggota berhasil ditambahkan',
                'data' => $member
            ], 201); // 201 Created
            
        } catch (\Exception $e) {
            Log::error('Error creating member: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan anggota',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * GET /api/v1/members/{uuid}
     * Menampilkan detail anggota berdasarkan UUID
     */
    public function show(string $uuid): JsonResponse
    {
        try {
            // findOrFail akan throw ModelNotFoundException jika tidak ditemukan
            $member = Member::findOrFail($uuid);
            
            return response()->json([
                'success' => true,
                'message' => 'Detail anggota berhasil diambil',
                'data' => $member
            ], 200);
            
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Anggota dengan UUID tersebut tidak ditemukan'
            ], 404);
            
        } catch (\Exception $e) {
            Log::error('Error showing member: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data anggota',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * PUT/PATCH /api/v1/members/{uuid}
     * Update data anggota berdasarkan UUID
     */
    public function update(UpdateMemberRequest $request, string $uuid): JsonResponse
    {
        try {
            $member = Member::findOrFail($uuid);
            
            // Update dengan data yang sudah divalidasi
            $member->update($request->validated());
            
            Log::info('Member updated', ['uuid' => $uuid, 'changes' => $request->validated()]);
            
            return response()->json([
                'success' => true,
                'message' => 'Data anggota berhasil diperbarui',
                'data' => $member->fresh() // fresh() untuk get data terbaru dari DB
            ], 200);
            
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Anggota dengan UUID tersebut tidak ditemukan'
            ], 404);
            
        } catch (\Exception $e) {
            Log::error('Error updating member: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui data anggota',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * DELETE /api/v1/members/{uuid}
     * Hapus anggota berdasarkan UUID
     */
    public function destroy(string $uuid): JsonResponse
    {
        try {
            $member = Member::findOrFail($uuid);
            
            // Simpan info untuk log sebelum dihapus
            $memberName = $member->nama;
            $member->delete();
            
            Log::info('Member deleted', ['uuid' => $uuid, 'nama' => $memberName]);
            
            return response()->json([
                'success' => true,
                'message' => "Anggota {$memberName} berhasil dihapus"
            ], 200);
            
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Anggota dengan UUID tersebut tidak ditemukan'
            ], 404);
            
        } catch (\Exception $e) {
            Log::error('Error deleting member: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus anggota',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
}