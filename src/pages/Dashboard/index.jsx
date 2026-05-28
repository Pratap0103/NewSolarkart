import React from 'react';
import { useAuthStore } from '../../store/authStore';
import AdminDashboard from './AdminDashboard';
import Dasboard from './Dasboard';

export default function DashboardRouter() {
  const { user } = useAuthStore();

  if (user?.role === 'ADMIN') {
    return <AdminDashboard />;
  }

  return <Dasboard currentUser={user || {}} />;
}
