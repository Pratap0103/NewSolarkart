import React, { useState } from 'react';
import { User, Edit, FileText, LogOut, CheckCircle, MapPin, Phone, Mail, Zap, Shield, PenTool, Hash, Activity, Building, Settings2, Box } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [showEdit, setShowEdit] = useState(false);

  const [profile, setProfile] = useState({
    customerName: 'Rajesh Kumar',
    mobile: '+91 98765 43210',
    alternateMobile: '+91 99887 76655',
    email: 'rajesh.kumar@example.com',
    address: 'A-402, Sunshine Apartments, Koregaon Park, Pune, Maharashtra 411001',
    location: 'Pune',
    installationDate: '12 Nov 2024',
    plantCapacity: '5 kW On-Grid',
    plantType: 'Net-Metered Residential',
    installer: 'SolarKart Elite Partner (Pune)',
    inverterBrand: 'Solax Power X1-Hybrid G4',
    panelBrand: 'Trina Solar Vertex S 435W (12 Units)',
    gridConnection: 'MSEDCL (3-Phase)',
    warrantyStatus: 'Active - 24 Years Remaining'
  });

  const [form, setForm] = useState({ ...profile });

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(form);
    toast.success('Profile details updated successfully!');
    setShowEdit(false);
  };

  const InfoRow = ({ icon: Icon, label, value, highlight }) => (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
      <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${highlight ? 'bg-brand-navy/10 text-brand-navy' : 'bg-white text-gray-500 border border-gray-200 shadow-sm'}`}>
        <Icon size={16} />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">{label}</span>
        <span className={`text-sm ${highlight ? 'font-black text-brand-navy' : 'font-semibold text-gray-800'}`}>{value}</span>
      </div>
    </div>
  );

  return (
    <div className="p-0 sm:p-2 md:p-6 space-y-4 md:space-y-6 flex flex-col h-full min-h-0 overflow-y-auto">
      
      {/* Top Profile Summary */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        
        {/* Left Column: Avatar Card */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center shrink-0">
            <div className="w-24 h-24 rounded-full bg-brand-navy/10 border-4 border-brand-navy/10 flex items-center justify-center mb-4 relative shadow-inner">
              <User size={48} className="text-brand-navy/80" />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-brand-orange/80 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                <CheckCircle size={12} className="text-white" />
              </div>
            </div>
            <h2 className="text-xl font-black text-gray-900">{profile.customerName}</h2>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1 flex items-center gap-1">
              <MapPin size={12} /> {profile.location}
            </span>
            <div className="mt-4 py-2 px-4 bg-brand-navy/10 text-brand-navy rounded-lg text-xs font-bold border border-brand-navy/10 w-full">
              Solar Customer Since {profile.installationDate.split(' ')[2]}
            </div>

            <div className="w-full flex flex-col gap-2 mt-6">
              <button onClick={() => { setForm({ ...profile }); setShowEdit(true); }} className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-sm font-bold border border-gray-200 transition-colors flex items-center justify-center gap-2">
                <Edit size={16} /> Edit Profile
              </button>
              <button onClick={() => navigate('/documentCenter')} className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-sm font-bold border border-gray-200 transition-colors flex items-center justify-center gap-2">
                <FileText size={16} /> View Documents
              </button>
              <button onClick={handleLogout} className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-sm font-bold border border-red-100 transition-colors flex items-center justify-center gap-2 mt-2">
                <LogOut size={16} /> Logout Securely
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Specs */}
        <div className="w-full md:w-2/3 flex flex-col gap-4 md:gap-6">
          
          {/* Contact Information */}
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm shrink-0">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <User className="text-brand-navy/80" /> Contact Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InfoRow icon={Phone} label="Primary Mobile" value={profile.mobile} />
              <InfoRow icon={Mail} label="Email Address" value={profile.email} />
              <div className="md:col-span-2">
                <InfoRow icon={Building} label="Installation Address" value={profile.address} />
              </div>
            </div>
          </div>

          {/* Plant Specifications */}
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm shrink-0">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <Settings2 className="text-brand-navy/80" /> Solar Plant Technical Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InfoRow icon={Zap} label="Solar Plant Capacity" value={profile.plantCapacity} highlight />
              <InfoRow icon={Activity} label="Connection Type" value={profile.plantType} />
              <InfoRow icon={PenTool} label="Authorized Installer" value={profile.installer} />
              <InfoRow icon={Hash} label="Grid Connection" value={profile.gridConnection} />
              <InfoRow icon={Shield} label="Warranty Status" value={profile.warrantyStatus} highlight />
              <InfoRow icon={Settings2} label="Smart Inverter Model" value={profile.inverterBrand} />
              <div className="md:col-span-2">
                <InfoRow icon={Box} label="Solar PV Panel Model" value={profile.panelBrand} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {showEdit && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 md:p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Edit className="text-brand-navy" /> Edit Profile Details
              </h3>
              <button onClick={() => setShowEdit(false)} className="text-gray-400 hover:text-gray-600 p-1">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 md:p-5 flex flex-col gap-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Customer Name</label>
                <input required type="text" value={form.customerName} onChange={(e) => setForm({...form, customerName: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-brand-navy/80 focus:ring-1 focus:ring-brand-navy/80 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Primary Mobile</label>
                  <input required type="tel" value={form.mobile} onChange={(e) => setForm({...form, mobile: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-brand-navy/80 focus:ring-1 focus:ring-brand-navy/80 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Alternate Mobile</label>
                  <input type="tel" value={form.alternateMobile} onChange={(e) => setForm({...form, alternateMobile: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-brand-navy/80 focus:ring-1 focus:ring-brand-navy/80 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-brand-navy/80 focus:ring-1 focus:ring-brand-navy/80 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Billing / Installation Address</label>
                <textarea required rows={3} value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-brand-navy/80 focus:ring-1 focus:ring-brand-navy/80 outline-none resize-none"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">City / Location</label>
                <input required type="text" value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-brand-navy/80 focus:ring-1 focus:ring-brand-navy/80 outline-none" />
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-gray-100 mt-2">
                <button type="button" onClick={() => setShowEdit(false)} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-brand-navy hover:bg-brand-navy text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2">
                  <CheckCircle size={16} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
