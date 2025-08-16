<?php
// app/Http/Requests/StoreMemberRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMemberRequest extends FormRequest
{
    /**
     * Menentukan apakah user boleh melakukan request ini
     * Untuk sekarang return true, tapi nanti bisa ditambah logic authorization
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Aturan validasi untuk input data anggota baru
     */
    public function rules(): array
    {
        return [
            'nama' => 'required|string|max:255|min:2',
            'email' => 'required|email|unique:members,email|max:255',
            'no_hp' => 'required|string|max:15|min:10',
            'alamat' => 'required|string|max:500|min:10'
        ];
    }

    /**
     * Pesan error kustom dalam bahasa Indonesia
     */
    public function messages(): array
    {
        return [
            'nama.required' => 'Nama wajib diisi',
            'nama.min' => 'Nama minimal 2 karakter',
            'nama.max' => 'Nama maksimal 255 karakter',
            
            'email.required' => 'Email wajib diisi',
            'email.email' => 'Format email tidak valid',
            'email.unique' => 'Email sudah terdaftar sebagai anggota',
            'email.max' => 'Email maksimal 255 karakter',
            
            'no_hp.required' => 'Nomor HP wajib diisi',
            'no_hp.min' => 'Nomor HP minimal 10 karakter',
            'no_hp.max' => 'Nomor HP maksimal 15 karakter',
            
            'alamat.required' => 'Alamat wajib diisi',
            'alamat.min' => 'Alamat minimal 10 karakter',
            'alamat.max' => 'Alamat maksimal 500 karakter'
        ];
    }
}