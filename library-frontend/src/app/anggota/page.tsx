'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { Users, Plus, Eye, Edit, Trash2, Search } from 'lucide-react';
import { Member } from '@/types/member';
import { memberApi } from '@/lib/api';
import Layout from '@/app/components/Layout';

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  /**
   * Fetch data anggota saat component mount
   */
  useEffect(() => {
    fetchMembers();
  }, []);

  /**
   * Function untuk mengambil data anggota dari API
   */
  const fetchMembers = async (searchQuery?: string) => {
    try {
      setLoading(true);
      const response = await memberApi.getAll(searchQuery);
      if (response.success && response.data) {
        setMembers(response.data);
      }
    } catch (error) {
      toast.error('Gagal memuat data anggota');
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Function untuk handle pencarian
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMembers(search);
  };

  /**
   * Function untuk handle hapus anggota
   */
  const handleDelete = async (uuid: string, nama: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus anggota ${nama}?`)) {
      try {
        const response = await memberApi.delete(uuid);
        if (response.success) {
          toast.success(`Anggota ${nama} berhasil dihapus`);
          fetchMembers(); // Refresh data
        }
      } catch (error) {
        toast.error('Gagal menghapus anggota');
        console.error('Error deleting member:', error);
      }
    }
  };

  /**
   * Loading component
   */
  if (loading) {
    return (
      <Layout title="Data Anggota">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data anggota...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Data Anggota">
      <div className="py-8">
        <Toaster position="top-right" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  <Users className="mr-3 h-8 w-8 text-blue-600" />
                  Data Anggota Perpustakaan
                </h1>
                <p className="mt-2 text-gray-600">Kelola data anggota perpustakaan dengan mudah</p>
              </div>
              <Link
                href="/anggota/create"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                Tambah Anggota
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari berdasarkan nama, email, atau nomor HP..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Cari
              </button>
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    fetchMembers();
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Reset
                </button>
              )}
            </form>
          </div>

          {/* Stats */}
          <div className="mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <Users className="h-12 w-12 text-blue-600 mr-4" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">{members.length}</div>
                  <div className="text-gray-600">Total Anggota Terdaftar</div>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Daftar Anggota</h3>
            </div>

            {members.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg">Belum ada data anggota</p>
                <p className="mt-2">Mulai dengan menambahkan anggota pertama</p>
                <Link
                  href="/anggota/create"
                  className="mt-4 inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Anggota Pertama
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No. HP
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Alamat
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal Daftar
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {members.map((member) => (
                      <tr key={member.uuid} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{member.nama}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{member.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{member.no_hp}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900 max-w-xs truncate" title={member.alamat}>
                            {member.alamat}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500 text-sm">
                            {new Date(member.created_at).toLocaleDateString('id-ID')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link
                              href={`/anggota/${member.uuid}`}
                              className="inline-flex items-center text-blue-600 hover:text-blue-800"
                              title="Lihat Detail"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <Link
                              href={`/anggota/${member.uuid}/edit`}
                              className="inline-flex items-center text-yellow-600 hover:text-yellow-800"
                              title="Edit Data"
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(member.uuid, member.nama)}
                              className="inline-flex items-center text-red-600 hover:text-red-800"
                              title="Hapus Data"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
