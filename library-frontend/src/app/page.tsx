'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Users, Book, Clock, TrendingUp, Plus } from 'lucide-react';
import { memberApi } from '@/lib/api';
import Layout from '@/app/components/Layout';
import Card from '@/app/components/ui/Card';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    recentMembers: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await memberApi.getAll();
      if (response.success && response.data) {
        const members = response.data;
        const recentMembers = members.filter(member => {
          const memberDate = new Date(member.created_at);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return memberDate >= weekAgo;
        });

        setStats({
          totalMembers: members.length,
          recentMembers: recentMembers.length,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const quickActions = [
    {
      title: 'Kelola Anggota',
      description: 'Tambah, edit, dan hapus data anggota perpustakaan',
      icon: Users,
      href: '/anggota',
      color: 'bg-blue-500',
    },
    {
      title: 'Tambah Anggota Baru',
      description: 'Daftarkan anggota baru ke sistem perpustakaan',
      icon: Plus,
      href: '/anggota/create',
      color: 'bg-green-500',
    },
  ];

  return (
    <Layout title="Dashboard">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Selamat Datang di Sistem Perpustakaan</h1>
            <p className="mt-2 text-gray-600">Kelola perpustakaan Anda dengan mudah dan efisien</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Anggota</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalMembers}</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Anggota Baru</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.recentMembers}</p>
                  <p className="text-xs text-gray-500">7 hari terakhir</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100">
                  <Book className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Buku</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-500">Fitur dalam pengembangan</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Peminjaman Aktif</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-500">Fitur dalam pengembangan</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.title} href={action.href}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-full ${action.color} bg-opacity-10`}>
                          <Icon className={`h-8 w-8 ${action.color.replace('bg-', 'text-')}`} />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                          <p className="text-gray-600">{action.description}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* System Info */}
          <Card>
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sistem Perpustakaan</h3>
              <p className="text-gray-600 mb-4">
                Sistem manajemen perpustakaan yang modern dan mudah digunakan
              </p>
              <div className="flex justify-center space-x-4 text-sm text-gray-500">
                <span>• Manajemen Anggota</span>
                <span>• Pencarian Cepat</span>
                <span>• Interface Responsif</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
