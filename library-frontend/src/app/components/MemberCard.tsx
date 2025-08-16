import React from 'react';
import Link from 'next/link';
import { User, Mail, Phone, MapPin, Calendar, Eye, Edit, Trash2 } from 'lucide-react';
import { Member } from '@/types/member';
import { formatDate } from '@/lib/utils';
import Card, { CardHeader, CardContent, CardFooter } from './ui/Card';
import Button from './ui/Button';

interface MemberCardProps {
  member: Member;
  onDelete?: (uuid: string, nama: string) => void;
  showActions?: boolean;
}

export default function MemberCard({ 
  member, 
  onDelete, 
  showActions = true 
}: MemberCardProps) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(member.uuid, member.nama);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{member.nama}</h3>
              <p className="text-sm text-gray-500">ID: {member.uuid.slice(0, 8)}...</p>
            </div>
          </div>
          {showActions && (
            <div className="flex space-x-2">
              <Link
                href={`/anggota/${member.uuid}`}
                className="inline-flex items-center p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                title="Lihat Detail"
              >
                <Eye className="h-4 w-4" />
              </Link>
              <Link
                href={`/anggota/${member.uuid}/edit`}
                className="inline-flex items-center p-2 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded-md transition-colors"
                title="Edit Data"
              >
                <Edit className="h-4 w-4" />
              </Link>
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                  title="Hapus Data"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Email</p>
              <p className="text-sm text-gray-600 truncate">{member.email}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Nomor HP</p>
              <p className="text-sm text-gray-600">{member.no_hp}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Alamat</p>
              <p className="text-sm text-gray-600 line-clamp-2">{member.alamat}</p>
            </div>
          </div>

          {/* Registration Date */}
          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Tanggal Daftar</p>
              <p className="text-sm text-gray-600">{formatDate(member.created_at)}</p>
            </div>
          </div>
        </div>
      </CardContent>

      {showActions && (
        <CardFooter>
          <div className="flex space-x-3 w-full">
            <Link
              href={`/anggota/${member.uuid}`}
              className="flex-1"
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Eye className="w-4 h-4 mr-2" />
                Detail
              </Button>
            </Link>
            <Link
              href={`/anggota/${member.uuid}/edit`}
              className="flex-1"
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
            {onDelete && (
              <Button
                variant="danger"
                size="sm"
                onClick={handleDelete}
                className="flex-1"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Hapus
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
