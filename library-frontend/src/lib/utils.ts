/**
 * Utility functions untuk aplikasi perpustakaan
 */

/**
 * Format tanggal ke format Indonesia
 * @param dateString - String tanggal dari API
 * @returns String tanggal yang sudah diformat
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format tanggal dan waktu ke format Indonesia
 * @param dateString - String tanggal dari API
 * @returns String tanggal dan waktu yang sudah diformat
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Validasi email menggunakan regex
 * @param email - Email yang akan divalidasi
 * @returns Boolean true jika email valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validasi nomor HP Indonesia
 * @param phone - Nomor HP yang akan divalidasi
 * @returns Boolean true jika nomor HP valid
 */
export const isValidPhone = (phone: string): boolean => {
  // Format: 08xx-xxxx-xxxx atau +628xx-xxxx-xxxx
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
  return phoneRegex.test(phone.replace(/[-\s]/g, ''));
};

/**
 * Truncate text jika terlalu panjang
 * @param text - Text yang akan di-truncate
 * @param maxLength - Panjang maksimal text
 * @returns Text yang sudah di-truncate
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Generate UUID v4 (untuk testing atau fallback)
 * @returns String UUID
 */
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Debounce function untuk search input
 * @param func - Function yang akan di-debounce
 * @param wait - Waktu tunggu dalam milisecond
 * @returns Function yang sudah di-debounce
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Capitalize first letter of each word
 * @param text - Text yang akan di-capitalize
 * @returns Text yang sudah di-capitalize
 */
export const capitalizeWords = (text: string): string => {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
