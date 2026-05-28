import React from 'react';
import { useAuthStore } from '../../store/authStore';
import AdminNotifications from './AdminNotifications';
import NotificationsPage from './NotificationsPage';

export default function NotificationsRouter() {
  const { user } = useAuthStore();

  if (user?.role === 'ADMIN') {
    return <AdminNotifications />;
  }

  return <NotificationsPage />;
}
