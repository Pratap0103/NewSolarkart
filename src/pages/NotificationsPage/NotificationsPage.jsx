import React, { useState } from 'react';
import { Eye, Check, Trash2, Bell, ShieldAlert, Filter, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/DataTable';

export default function NotificationsPage() {
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [notifications, setNotifications] = useState(Array.from({ length: 40 }).map((_, i) => {
    const types = ['System Alert', 'Maintenance', 'Billing', 'Performance'];
    const messages = [
      'Inverter diagnostic fault code 402 detected: AC SPD blow-out. Please schedule a support visit immediately.',
      'Your scheduled bi-monthly solar panel cleaning is due tomorrow.',
      'Your monthly solar generation and savings report for October has been generated.',
      'Congratulations! Your system reached a peak generation of 25.4 kWh today.'
    ];
    return {
      notificationId: `NOTIF-${10000 + i * 13}`,
      type: types[i % 4],
      message: messages[i % 4],
      date: `12 Nov 202${4 - (i % 3)} 10:${i % 60 < 10 ? '0'+(i%60) : i%60} AM`,
      status: i % 5 === 0 || i === 0 ? 'Unread' : 'Read'
    };
  }));

  const filteredNotifs = notifications.filter(n => 
    n.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.notificationId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const totalPages = Math.ceil(filteredNotifs.length / itemsPerPage);
  const paginatedData = filteredNotifs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const unreadCount = notifications.filter(n => n.status === 'Unread').length;

  const handleOpenDetail = (notif) => {
    setSelectedNotif(notif);
    setShowDetail(true);
    if (notif.status === 'Unread') {
      handleMarkRead(notif.notificationId);
    }
  };

  const handleMarkRead = (id) => {
    setNotifications(prev => prev.map(n => n.notificationId === id ? { ...n, status: 'Read' } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, status: 'Read' })));
    toast.success('All notifications marked as read.');
  };

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(n => n.notificationId !== id));
    toast.success('Notification deleted.');
    setShowDetail(false);
  };

  return (
    <div className="p-0 sm:p-2 md:p-6 space-y-2 md:space-y-6 flex flex-col h-full min-h-0 overflow-hidden">
      
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-4 w-full px-2 sm:px-0">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
              <Bell size={20} className="text-indigo-600" />
            </div>
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Notifications</h2>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-2 lg:gap-3 items-center">
          <div className="flex items-center gap-2 w-full lg:w-auto lg:flex-[1.5]">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-2.5 top-[9px] lg:top-[11px] text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:border-indigo-500 text-xs md:text-sm h-[32px] md:h-[38px]"
              />
            </div>
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllRead}
              className="w-full lg:w-auto px-4 h-[32px] md:h-[38px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs md:text-sm font-bold transition-colors whitespace-nowrap border border-indigo-100"
            >
              Mark All Read
            </button>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 min-h-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <DataTable
          headers={["Alert ID", "Type", "Message", "Date", "Status", "Action"]}
          data={paginatedData}
          minWidth="1100px"
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
          totalResults={filteredNotifs.length}
          itemsPerPageOptions={[50, 100, 200]}
          renderRow={(notif, idx) => (
            <tr key={idx} className={`hover:bg-indigo-50/30 transition-colors border-b border-gray-100 ${notif.status === 'Unread' ? 'bg-indigo-50/20' : ''}`}>
              <td className="px-4 py-3 text-sm font-bold text-gray-900 text-center whitespace-nowrap">{notif.notificationId}</td>
              <td className="px-4 py-3 text-sm text-center">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  notif.type === 'System Alert' ? 'bg-red-50 text-red-600' : 
                  notif.type === 'Maintenance' ? 'bg-amber-50 text-amber-600' :
                  notif.type === 'Billing' ? 'bg-indigo-50 text-indigo-600' :
                  'bg-emerald-50 text-emerald-600'
                }`}>
                  {notif.type}
                </span>
              </td>
              <td className={`px-4 py-3 text-sm max-w-md truncate ${notif.status === 'Unread' ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                {notif.message}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500 text-center whitespace-nowrap">{notif.date}</td>
              <td className="px-4 py-3 text-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  notif.status === 'Unread' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {notif.status}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-2">
                  <button onClick={() => handleOpenDetail(notif)} className="p-1.5 bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 rounded-lg transition-colors border border-gray-200" title="View Details">
                    <Eye size={14} />
                  </button>
                  {notif.status === 'Unread' && (
                    <button onClick={() => handleMarkRead(notif.notificationId)} className="p-1.5 bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 rounded-lg transition-colors border border-gray-200" title="Mark as Read">
                      <Check size={14} />
                    </button>
                  )}
                  <button onClick={() => handleDelete(notif.notificationId)} className="p-1.5 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg transition-colors border border-gray-200" title="Delete Alert">
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          )}
          renderCard={(notif, idx) => {
            const globalIdx = (currentPage - 1) * itemsPerPage + idx + 1;
            return (
              <div key={idx} className={`bg-white rounded-xl border ${notif.status === 'Unread' ? 'border-indigo-200' : 'border-indigo-50'} shadow-sm p-4 space-y-3 transition-all hover:shadow-md hover:border-indigo-100`}>
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">
                      {globalIdx}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      notif.type === 'System Alert' ? 'bg-red-50 text-red-600' : 
                      notif.type === 'Maintenance' ? 'bg-amber-50 text-amber-600' :
                      notif.type === 'Billing' ? 'bg-indigo-50 text-indigo-600' :
                      'bg-emerald-50 text-emerald-600'
                    }`}>
                      {notif.type}
                    </span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    notif.status === 'Unread' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {notif.status}
                  </span>
                </div>
                <p className={`text-sm ${notif.status === 'Unread' ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                  {notif.message}
                </p>
                <div className="text-xs text-gray-400 font-semibold">{notif.date}</div>
                <div className="flex gap-2 pt-2 border-t border-slate-100 mt-1">
                  <button onClick={() => handleOpenDetail(notif)} className="flex-1 flex justify-center items-center gap-1.5 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold">
                    <Eye size={12} /> View
                  </button>
                  <button onClick={() => handleDelete(notif.notificationId)} className="flex-[0.3] flex justify-center items-center gap-1.5 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-bold">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* DETAIL MODAL */}
      {showDetail && selectedNotif && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 md:p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <ShieldAlert className={selectedNotif.type === 'System Alert' ? 'text-red-500' : 'text-indigo-500'} /> Alert Details
              </h3>
              <button onClick={() => setShowDetail(false)} className="text-gray-400 hover:text-gray-600 p-1">
                ✕
              </button>
            </div>
            
            <div className="p-4 md:p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-0.5">Notification ID</div>
                  <div className="font-bold text-gray-900">{selectedNotif.notificationId}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-0.5">Alert Type</div>
                  <div className="font-semibold text-gray-800">{selectedNotif.type}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-0.5">Date & Time</div>
                  <div className="font-semibold text-gray-800">{selectedNotif.date}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-0.5">Status</div>
                  <div className="font-semibold text-gray-800">{selectedNotif.status}</div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Message Details</span>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  {selectedNotif.message}
                </p>
              </div>

              <div className="flex gap-3 pt-2 mt-2">
                <button onClick={() => handleDelete(selectedNotif.notificationId)} className="flex-1 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-sm font-bold transition-colors flex justify-center items-center gap-2">
                  <Trash2 size={16} /> Delete Alert
                </button>
                <button onClick={() => setShowDetail(false)} className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-200 transition-all flex justify-center items-center gap-2">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
