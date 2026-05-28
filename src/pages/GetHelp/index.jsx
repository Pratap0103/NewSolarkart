import React from 'react';
import { useAuthStore } from '../../store/authStore';
import AdminGetHelp from './AdminGetHelp';
import GetHelp from './GetHelp';

export default function GetHelpRouter() {
  const { user } = useAuthStore();

  if (user?.role === 'ADMIN') {
    return <AdminGetHelp />;
  }

  return <GetHelp />;
}
