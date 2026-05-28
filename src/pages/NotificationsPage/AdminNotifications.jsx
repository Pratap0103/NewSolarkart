import React, { useState } from 'react';
import { Bell, Send, CheckCircle, Info, AlertTriangle, Users, X, Search } from 'lucide-react';
import DataTable from '../../components/DataTable';

const initialNotifications = [
  { id: 'NOT-1', type: 'System', title: 'Maintenance Scheduled', message: 'Server maintenance on Sunday 2 AM.', date: '2026-05-28', status: 'Sent' },
  { id: 'NOT-2', type: 'Alert', title: 'Grid Outage Detected', message: 'Outage reported in Pune sector 4.', date: '2026-05-27', status: 'Sent' },
  { id: 'NOT-3', type: 'Promo', title: 'Referral Bonus Double', message: 'Earn double coins this weekend!', date: '2026-05-25', status: 'Sent' },
  { id: 'NOT-4', type: 'System', title: 'App Version Update', message: 'Please update your app to v2.4', date: '2026-05-24', status: 'Sent' },
  { id: 'NOT-5', type: 'Alert', title: 'Weather Warning', message: 'Heavy rain expected, panels safe.', date: '2026-05-22', status: 'Sent' },
  { id: 'NOT-6', type: 'Promo', title: 'Diwali Special Offer', message: 'Refer a friend during Diwali for 2000 coins.', date: '2025-10-15', status: 'Sent' },
  { id: 'NOT-7', type: 'System', title: 'New Feature: AI Assistant', message: 'Try out our new AI Solar Assistant!', date: '2026-01-10', status: 'Sent' },
  { id: 'NOT-8', type: 'Alert', title: 'Low Voltage Detected', message: 'Grid voltage below 200V in some areas.', date: '2026-04-18', status: 'Sent' },
  { id: 'NOT-9', type: 'System', title: 'Policy Update', message: 'Updates to our standard AMC terms.', date: '2026-03-01', status: 'Sent' },
  { id: 'NOT-10', type: 'Alert', title: 'Inverter Connectivity Issue', message: 'Airtel/Jio outages affecting sync.', date: '2026-05-15', status: 'Sent' },
];

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  
  const [audience, setAudience] = useState('All Customers');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Modal State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const filtered = notifications.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePreSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;
    setIsConfirmOpen(true);
  };

  const handleBroadcast = () => {
    const newNotif = {
      id: `NOT-${notifications.length + 1}`,
      type: title.toLowerCase().includes('alert') || title.toLowerCase().includes('outage') ? 'Alert' : 'System',
      title: title,
      message: message,
      date: new Date().toISOString().split('T')[0],
      status: 'Sent'
    };

    setNotifications([newNotif, ...notifications]);
    setIsConfirmOpen(false);
    setTitle('');
    setMessage('');
    setAudience('All Customers');
  };

  return (
    <div className="p-0 sm:p-2 md:p-6 space-y-2 md:space-y-6 flex flex-col h-full min-h-0">
      
      {/* Top Banner & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-4 w-full px-2 sm:px-0">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="text-brand-navy" /> Notification Center
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-2 lg:gap-3 items-center">
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-2.5 top-[9px] lg:top-[11px] text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search history..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:border-brand-navy/80 text-xs md:text-sm h-[32px] md:h-[38px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        
        {/* Compose Notification */}
        <div className="w-full lg:w-1/3 bg-white border border-gray-200 rounded-xl shadow-sm overflow-y-auto shrink-0 flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-sm font-bold text-gray-900">Broadcast Message</h2>
          </div>
          <form onSubmit={handlePreSubmit} className="p-4 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Target Audience</label>
              <select 
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy text-sm bg-white"
              >
                <option>All Customers</option>
                <option>Active AMCs Only</option>
                <option>Specific Region...</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Title</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Notification Title" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy text-sm" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Message</label>
              <textarea 
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..." 
                rows="4" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy text-sm resize-none"
              ></textarea>
            </div>
            <button 
              type="submit"
              disabled={!title.trim() || !message.trim()}
              className="flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-navy/90 text-white py-2.5 rounded-lg font-bold transition-colors w-full mt-2 disabled:opacity-50"
            >
              <Send size={16} />
              Review Broadcast
            </button>
          </form>
        </div>

        {/* History Table */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col min-h-0">
          <DataTable
            headers={["Date", "Type", "Title / Message", "Status"]}
            data={paginatedData}
            minWidth="700px"
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
            totalResults={filtered.length}
            itemsPerPageOptions={[10, 20, 50]}
            renderRow={(notif, idx) => (
              <tr key={notif.id} className="hover:bg-brand-navy/5 transition-colors border-b border-gray-100">
                <td className="px-4 py-3 text-sm font-semibold text-gray-600 text-center whitespace-nowrap">{notif.date}</td>
                <td className="px-4 py-3 text-center">
                   <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    notif.type === 'Alert' ? 'bg-red-100 text-red-700' :
                    notif.type === 'Promo' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {notif.type === 'Alert' ? <AlertTriangle size={10}/> : notif.type === 'Promo' ? <Users size={10}/> : <Info size={10}/>}
                    {notif.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-left">
                  <p className="font-bold text-gray-900 text-sm">{notif.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 max-w-[300px]">{notif.message}</p>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600">
                    <CheckCircle size={12} /> {notif.status}
                  </span>
                </td>
              </tr>
            )}
            renderCard={(notif, idx) => {
              const globalIdx = (currentPage - 1) * itemsPerPage + idx + 1;
              return (
                <div key={notif.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">
                        {globalIdx}
                      </span>
                      <span className="text-sm font-black text-brand-navy truncate max-w-[150px]">{notif.title}</span>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      notif.type === 'Alert' ? 'bg-red-100 text-red-700' :
                      notif.type === 'Promo' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {notif.type}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {notif.message}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 rounded-lg p-2 border border-slate-100/50 mt-2">
                    <div className="flex flex-col">
                      <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Date</span>
                      <span className="font-semibold text-gray-700">{notif.date}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Status</span>
                      <span className="font-semibold text-green-600">{notif.status}</span>
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>

      {/* --- CONFIRMATION MODAL --- */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
                <Send className="text-brand-orange" />
                Confirm Broadcast
              </h3>
              <button 
                onClick={() => setIsConfirmOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-center">
                <AlertTriangle size={24} className="text-brand-orange mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-800">You are about to send a notification to:</p>
                <p className="text-lg font-black text-brand-orange mt-1">{audience}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm">
                <p className="font-bold text-gray-900 mb-1">{title}</p>
                <p className="text-gray-600">{message}</p>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  onClick={() => setIsConfirmOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  Edit Message
                </button>
                <button 
                  onClick={handleBroadcast}
                  className="flex-1 px-4 py-2.5 bg-brand-orange text-white rounded-xl font-bold hover:bg-brand-orange/90 transition-colors shadow-md shadow-orange-200"
                >
                  Send Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
