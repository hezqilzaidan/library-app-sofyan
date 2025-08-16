<?php
// app/Models/Member.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Member extends Model
{
    use HasFactory;

    /**
     * Konfigurasi UUID sebagai primary key
     * Laravel defaultnya menggunakan auto-increment integer,
     * jadi kita override untuk menggunakan UUID string
     */
    protected $primaryKey = 'uuid';
    public $incrementing = false;  // Tidak auto increment
    protected $keyType = 'string'; // Tipe key adalah string

    /**
     * Field yang boleh diisi mass assignment
     * Ini untuk keamanan agar tidak semua field bisa diisi
     */
    protected $fillable = [
        'nama',
        'email',
        'no_hp',
        'alamat'
    ];

    /**
     * Boot method untuk auto-generate UUID saat membuat record baru
     * Method ini akan dipanggil setiap kali model di-instantiate
     */
    protected static function boot()
    {
        parent::boot();
        
        // Event 'creating' akan trigger sebelum data disimpan ke database
        static::creating(function ($model) {
            // Jika UUID belum ada, generate UUID baru
            if (empty($model->uuid)) {
                $model->uuid = Str::uuid();
            }
        });
    }

    /**
     * Accessor untuk format tanggal yang lebih readable
     */
    public function getCreatedAtFormattedAttribute()
    {
        return $this->created_at->format('d M Y H:i');
    }
}