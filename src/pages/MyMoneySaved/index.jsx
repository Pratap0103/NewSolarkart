import React from 'react';
import { useAuthStore } from '../../store/authStore';
import AdminSavedMoney from './AdminSavedMoney';
import MyMonySaves from './MyMonySaves';

export default function MoneySavedRouter() {
  const { user } = useAuthStore();

  if (user?.role === 'ADMIN') {
    return <AdminSavedMoney />;
  }

  return <MyMonySaves />;
}
