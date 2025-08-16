'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeft, Edit, Trash2, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Member } from '@/types/member';
import { memberApi } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import Layout from '@/app/components/Layout';
import Card, { CardHeader, CardContent, CardFooter } from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';

export default function MemberDetailPage() {
  const params = useParams();
  const router = useRouter();
  const uuid = params.uuid as string;
  
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async () => {
    if (!member) return;
    
    if (confirm(`Apakah Anda yakin ingin menghapus anggota ${member.nama}?`)) {
      try {
        const response = await memberApi.delete(uuid);
        if (response.success) {
          toast.success(`Anggota ${member.nama} berhasil dihapus`);
          router.push('/anggota');
        }
      } catch (error) {
        toast.error('Gagal menghapus anggota');
        console.error('Error deleting member:', error);
      }
    }
  };

  if (loading) {
    return (
      <Layout title="Detail Anggota">
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
                <Button variant="primary">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Daftar Anggota
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Detail Anggota - ${member.nama}`}>
      <div className="py-8">
        <Toaster position="top-right" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link
                  href="/anggota"
                  className="mr-4 p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Detail Anggota</h1>
                  <p className="mt-2 text-gray-600">Informasi lengkap anggota perpustakaan</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Link href={`/anggota/${uuid}/edit`}>
                  <Button variant="outline" icon={Edit}>
                    Edit
                  </Button>
                </Link>
                <Button variant="danger" icon={Trash2} onClick={handleDelete}>
                  Hapus
                </Button>
              </div>
            </div>
          </div>

          {/* Member Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{member.nama}</h2>
                  <p className="text-gray-500">ID: {member.uuid}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="flex items-start space-x-3">
                  <Mail className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">{member.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <Phone className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Nomor HP</p>
                    <p className="text-gray-600">{member.no_hp}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-3 md:col-span-2">
                  <MapPin className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Alamat</p>
                    <p className="text-gray-600">{member.alamat}</p>
                  </div>
                </div>

                {/* Registration Date */}
                <div className="flex items-start space-x-3">
                  <Calendar className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Tanggal Daftar</p>
                    <p className="text-gray-600">{formatDate(member.created_at)}</p>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="flex items-start space-x-3">
                  <Calendar className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Terakhir Diupdate</p>
                    <p className="text-gray-600">{formatDate(member.updated_at)}</p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <div className="flex justify-between w-full">
                <Link href="/anggota">
                  <Button variant="outline" icon={ArrowLeft}>
                    Kembali ke Daftar
                  </Button>
                </Link>
                <Link href={`/anggota/${uuid}/edit`}>
                  <Button variant="primary" icon={Edit}>
                    Edit Data
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
