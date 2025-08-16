/**
 * Interface untuk data anggota perpustakaan
 * Sesuai dengan struktur database Laravel
 */
export interface Member {
  uuid: string;
  nama: string;
  email: string;
  no_hp: string;
  alamat: string;
  created_at: string;
  updated_at: string;
}

/**
 * Interface untuk data input saat membuat/edit anggota
 * Tidak perlu UUID, created_at, updated_at karena auto-generated
 */
export interface CreateMemberData {
  nama: string;
  email: string;
  no_hp: string;
  alamat: string;
}

/**
 * Interface untuk update data anggota
 * Sama dengan CreateMemberData, tapi bisa ditambah field lain di masa depan
 */
export interface UpdateMemberData extends CreateMemberData {}

/**
 * Interface untuk response API Laravel
 * Generic type T bisa berupa Member, Member[], atau tipe lain
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  total?: number;
  error?: string;
}

/**
 * Interface untuk error handling
 */
export interface ApiError {
  success: false;
  message: string;
  error?: string;
  errors?: Record<string, string[]>; // Laravel validation errors
}

/**
 * Type untuk status loading
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
