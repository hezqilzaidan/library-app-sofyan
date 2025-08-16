import axios, { AxiosResponse } from 'axios';
import { Member, CreateMemberData, UpdateMemberData, ApiResponse } from '@/types/member';

/**
 * Base URL untuk API Laravel
 * Bisa dipindah ke environment variable untuk production
 */
const API_BASE_URL = 'http://localhost:8000/api/v1';

/**
 * Axios instance dengan konfigurasi default
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 detik timeout
});

/**
 * Axios interceptor untuk handle response dan error secara global
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error untuk debugging
    console.error('API Error:', error);
    
    // Jika server tidak merespon
    if (!error.response) {
      throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
    }
    
    // Jika ada error response dari server
    const message = error.response.data?.message || 'Terjadi kesalahan pada server';
    throw new Error(message);
  }
);

/**
 * Service functions untuk operasi CRUD anggota perpustakaan
 */
export const memberApi = {
  
  /**
   * GET /api/v1/members
   * Mengambil semua data anggota
   * @param search - Optional parameter untuk pencarian
   */
  getAll: async (search?: string): Promise<ApiResponse<Member[]>> => {
    const params = search ? { search } : {};
    const response: AxiosResponse<ApiResponse<Member[]>> = await api.get('/members', { params });
    return response.data;
  },

  /**
   * GET /api/v1/members/{uuid}
   * Mengambil detail anggota berdasarkan UUID
   * @param uuid - UUID anggota
   */
  getById: async (uuid: string): Promise<ApiResponse<Member>> => {
    const response: AxiosResponse<ApiResponse<Member>> = await api.get(`/members/${uuid}`);
    return response.data;
  },

  /**
   * POST /api/v1/members
   * Membuat anggota baru
   * @param data - Data anggota yang akan dibuat
   */
  create: async (data: CreateMemberData): Promise<ApiResponse<Member>> => {
    const response: AxiosResponse<ApiResponse<Member>> = await api.post('/members', data);
    return response.data;
  },

  /**
   * PUT /api/v1/members/{uuid}
   * Update data anggota
   * @param uuid - UUID anggota yang akan diupdate
   * @param data - Data anggota yang baru
   */
  update: async (uuid: string, data: UpdateMemberData): Promise<ApiResponse<Member>> => {
    const response: AxiosResponse<ApiResponse<Member>> = await api.put(`/members/${uuid}`, data);
    return response.data;
  },

  /**
   * DELETE /api/v1/members/{uuid}
   * Hapus anggota
   * @param uuid - UUID anggota yang akan dihapus
   */
  delete: async (uuid: string): Promise<ApiResponse<null>> => {
    const response: AxiosResponse<ApiResponse<null>> = await api.delete(`/members/${uuid}`);
    return response.data;
  },
};
