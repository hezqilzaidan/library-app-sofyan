'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { CreateMemberData, UpdateMemberData } from '@/types/member';
import { isValidEmail, isValidPhone } from '@/lib/utils';
import Input from './ui/Input';
import Button from './ui/Button';

interface MemberFormProps {
  initialData?: Partial<CreateMemberData>;
  onSubmit: (data: CreateMemberData | UpdateMemberData) => Promise<void>;
  loading?: boolean;
  submitText?: string;
}

interface FormErrors {
  nama?: string;
  email?: string;
  no_hp?: string;
  alamat?: string;
}

export default function MemberForm({
  initialData = {},
  onSubmit,
  loading = false,
  submitText = 'Simpan',
}: MemberFormProps) {
  const [formData, setFormData] = useState<CreateMemberData>({
    nama: initialData.nama || '',
    email: initialData.email || '',
    no_hp: initialData.no_hp || '',
    alamat: initialData.alamat || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: keyof CreateMemberData, value: string): string => {
    switch (name) {
      case 'nama':
        if (!value.trim()) return 'Nama wajib diisi';
        if (value.trim().length < 2) return 'Nama minimal 2 karakter';
        if (value.trim().length > 100) return 'Nama maksimal 100 karakter';
        break;
      
      case 'email':
        if (!value.trim()) return 'Email wajib diisi';
        if (!isValidEmail(value)) return 'Format email tidak valid';
        break;
      
      case 'no_hp':
        if (!value.trim()) return 'Nomor HP wajib diisi';
        if (!isValidPhone(value)) return 'Format nomor HP tidak valid';
        break;
      
      case 'alamat':
        if (!value.trim()) return 'Alamat wajib diisi';
        if (value.trim().length < 10) return 'Alamat minimal 10 karakter';
        if (value.trim().length > 500) return 'Alamat maksimal 500 karakter';
        break;
    }
    return '';
  };

  const handleChange = (name: keyof CreateMemberData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (name: keyof CreateMemberData) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof CreateMemberData>).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const getFieldError = (name: keyof CreateMemberData): string => {
    return touched[name] ? errors[name] || '' : '';
  };

  const getFieldVariant = (name: keyof CreateMemberData): 'default' | 'error' | 'success' => {
    if (!touched[name]) return 'default';
    return errors[name] ? 'error' : 'success';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nama */}
        <div className="md:col-span-2">
          <Input
            label="Nama Lengkap"
            type="text"
            value={formData.nama}
            onChange={(e) => handleChange('nama', e.target.value)}
            onBlur={() => handleBlur('nama')}
            placeholder="Masukkan nama lengkap"
            icon={User}
            error={getFieldError('nama')}
            variant={getFieldVariant('nama')}
            required
          />
        </div>

        {/* Email */}
        <div>
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="contoh@email.com"
            icon={Mail}
            error={getFieldError('email')}
            variant={getFieldVariant('email')}
            helperText="Email akan digunakan untuk login"
            required
          />
        </div>

        {/* No HP */}
        <div>
          <Input
            label="Nomor HP"
            type="tel"
            value={formData.no_hp}
            onChange={(e) => handleChange('no_hp', e.target.value)}
            onBlur={() => handleBlur('no_hp')}
            placeholder="08xxxxxxxxxx"
            icon={Phone}
            error={getFieldError('no_hp')}
            variant={getFieldVariant('no_hp')}
            helperText="Format: 08xxxxxxxxxx"
            required
          />
        </div>

        {/* Alamat */}
        <div className="md:col-span-2">
          <Input
            label="Alamat"
            type="text"
            value={formData.alamat}
            onChange={(e) => handleChange('alamat', e.target.value)}
            onBlur={() => handleBlur('alamat')}
            placeholder="Masukkan alamat lengkap"
            icon={MapPin}
            error={getFieldError('alamat')}
            variant={getFieldVariant('alamat')}
            helperText="Alamat lengkap termasuk RT/RW, Kelurahan, Kecamatan, Kota"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          disabled={loading}
        >
          Batal
        </Button>
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
}
