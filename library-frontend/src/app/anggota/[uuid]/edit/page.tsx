'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeft, Edit } from 'lucide-react';
import { Member, UpdateMemberData } from '@/types/member';
import { memberApi } from '@/lib/api';
import Layout from '@/app/components/Layout';
import MemberForm from '@/app/components/MemberForm';
import Card from '@/app/components/ui/Card';

export default function EditMemberPage() {
  const params = useParams();
  const router = useRouter();
  const uuid = params.uuid as string;
  
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (uuid) {
      fetchMember();
    }
  }, [uuid]);

  const fetchMember = async () => {
    try {
      setLoading(true);
      const response = await memberApi.getById(uuid);
      if (response.success && response.data) {
        setMember(response.data);
      } else {
        toast.error('Anggota tidak ditemukan');
        router.push('/anggota');
      }
    } catch (error) {
      toast.error('Gagal memuat data anggota');
      console.error('Error fetching member:', error);
      router.push('/anggota');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: UpdateMemberData) => {
    try {
      setSubmitting(true);
      const response = await memberApi.update(uuid, data);
      
      if (response.success) {
        toast.success('Data anggota berhasil diperbarui');
        router.push(`/anggota/${uuid}`);
      } else {
        toast.error(response.message || 'Gagal memperbarui data anggota');
      }
    } catch (error) {
      toast.error('Gagal memperbarui data anggota');
      console.error('Error updating member:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout title="Edit Anggota">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data anggota...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!member) {
    return (
      <Layout title="Anggota Tidak Ditemukan">
        <div className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Anggota Tidak Ditemukan</h1>
              <p className="text-gray-600 mb-6">Anggota yang Anda cari tidak ditemukan atau telah dihapus.</p>
              <Link href="/anggota">
                <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Daftar Anggota
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Edit Anggota - ${member.nama}`}>
      <div className="py-8">
        <Toaster position="top-right" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center">
              <Link
                href={`/anggota/${uuid}`}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Data Anggota</h1>
                <p className="mt-2 text-gray-600">Perbarui informasi anggota perpustakaan</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <Card>
            <MemberForm
              initialData={{
                nama: member.nama,
                email: member.email,
                no_hp: member.no_hp,
                alamat: member.alamat,
              }}
              onSubmit={handleSubmit}
              loading={submitting}
              submitText="Simpan Perubahan"
            />
          </Card>
        </div>
      </div>
    </Layout>
  );
}
