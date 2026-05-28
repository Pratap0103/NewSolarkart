import React from 'react';
import { useAuthStore } from '../../store/authStore';
import AdminReferralSystem from './AdminReferralSystem';
import ReferralSystem from './ReferralSystem';

export default function ReferralSystemRouter() {
  const { user } = useAuthStore();

  if (user?.role === 'ADMIN') {
    return <AdminReferralSystem />;
  }

  return <ReferralSystem />;
}
