import React from 'react';
import { useAuthStore } from '../../store/authStore';
import AdminLearningCenter from './AdminLearningCenter';
import LearningCenter from './LearningCenter';

export default function LearningCenterRouter() {
  const { user } = useAuthStore();

  if (user?.role === 'ADMIN') {
    return <AdminLearningCenter />;
  }

  return <LearningCenter />;
}
