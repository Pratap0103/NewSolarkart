import React from 'react';
import { useAuthStore } from '../../store/authStore';
import AdminDocumentCenter from './AdminDocumentCenter';
import DocumentCenter from './DocumentCenter';

export default function DocumentCenterRouter() {
  const { user } = useAuthStore();

  if (user?.role === 'ADMIN') {
    return <AdminDocumentCenter />;
  }

  return <DocumentCenter />;
}
