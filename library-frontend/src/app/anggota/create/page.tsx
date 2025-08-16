'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { CreateMemberData } from '@/types/member';
import { memberApi } from '@/lib/api';
import Layout from '@/app/components/Layout';
import MemberForm from '@/app/components/MemberForm';
import Card from '@/app/components/ui/Card';

export default function CreateMemberPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: CreateMemberData) => {
    try {
      setLoading(true);
      const response = await memberApi.create(data);
      
      if (response.success) {
        toast.success('Anggota berhasil ditambahkan');
        router.push('/anggota');
      } else {
        toast.error(response.message || 'Gagal menambahkan anggota');
      }
    } catch (error) {
      toast.error('Gagal menambahkan anggota');
      console.error('Error creating member:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Tambah Anggota">
      <div className="py-8">
        <Toaster position="top-right" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center">
              <Plus className="mr-3 h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Tambah Anggota Baru</h1>
                <p className="mt-2 text-gray-600">Isi form di bawah untuk menambahkan anggota baru</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <Card>
            <MemberForm
              onSubmit={handleSubmit}
              loading={loading}
              submitText="Tambah Anggota"
            />
          </Card>
        </div>
      </div>
    </Layout>
  );
}
