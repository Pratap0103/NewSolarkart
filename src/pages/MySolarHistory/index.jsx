import React from 'react';
import { useAuthStore } from '../../store/authStore';
import AdminSolarHistory from './AdminSolarHistory';
import MySolarHistory from './MySolarHistory';

export default function SolarHistoryRouter() {
  const { user } = useAuthStore();

  if (user?.role === 'ADMIN') {
    return <AdminSolarHistory />;
  }

  return <MySolarHistory />;
}
