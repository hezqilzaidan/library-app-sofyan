<?php
// app/Http/Requests/UpdateMemberRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validasi untuk update data
     * Bedanya dengan create: email unique ignore current record
     */
    public function rules(): array
    {
        return [
            'nama' => 'required|string|max:255|min:2',
            // Email unique kecuali untuk record yang sedang diedit
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('members')->ignore($this->route('uuid'), 'uuid')
            ],
            'no_hp' => 'required|string|max:15|min:10',
            'alamat' => 'required|string|max:500|min:10'
        ];
    }

    public function messages(): array
    {
        return [
            'nama.required' => 'Nama wajib diisi',
            'nama.min' => 'Nama minimal 2 karakter',
            'nama.max' => 'Nama maksimal 255 karakter',
            
            'email.required' => 'Email wajib diisi',
            'email.email' => 'Format email tidak valid',
            'email.unique' => 'Email sudah digunakan anggota lain',
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