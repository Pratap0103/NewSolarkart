import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Dasboard from './pages/Dashboard/Dasboard';
import MySolarHistory from './pages/MySolarHistory/mySolarHistory';
import MyMonySaves from './pages/MyMoneySaved/MyMonySaves';
import GetHelp from './pages/GetHelp/GetHelp';
import AISolarAssistant from './pages/AISolarAssistant/AISolarAssistant';
import AMCManagement from './pages/AMCManagement/AMCManagement';
import DocumentCenter from './pages/DocumentCenter/DocumentCenter';
import LearningCenter from './pages/LearningCenter/LearningCenter';
import Profile from './pages/Profile/Profile';
import NotificationsPage from './pages/NotificationsPage/NotificationsPage';
import ReferralSystem from './pages/ReferralSystem/ReferralSystem';
import PlantHealth from './pages/PlantHealth/PlantHealth';

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { initializeStorage } from './store/dataStore';

function App() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dasboard />} />
            <Route path="settings" element={
              <AdminRoute>
                <Settings />
              </AdminRoute>
            } />
            <Route path="mySolarHistory" element={<MySolarHistory />} />
            <Route path="myMoneySaved" element={<MyMonySaves />} />
            <Route path="getHelp" element={<GetHelp />} />
            <Route path="aiAssistant" element={<AISolarAssistant />} />
            <Route path="amcManagement" element={<AMCManagement />} />
            <Route path="documentCenter" element={<DocumentCenter />} />
            <Route path="learningCenter" element={<LearningCenter />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="referrals" element={<ReferralSystem />} />
            <Route path="plantHealth" element={<PlantHealth />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;