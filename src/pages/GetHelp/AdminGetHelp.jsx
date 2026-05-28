import React, { useState } from 'react';
import { HelpCircle, Search, Filter, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import DataTable from '../../components/DataTable';

const mockTickets = [
  { id: 'TKT-1021', customer: 'Rajesh Kumar', subject: 'Inverter showing Error 404', status: 'Open', priority: 'High', date: '2026-05-28' },
  { id: 'TKT-1022', customer: 'Priya Sharma', subject: 'Billing discrepancy in last cycle', status: 'In Progress', priority: 'Medium', date: '2026-05-27' },
  { id: 'TKT-1023', customer: 'Amit Patel', subject: 'Panel cleaning request', status: 'Resolved', priority: 'Low', date: '2026-05-25' },
  { id: 'TKT-1024', customer: 'Sneha Gupta', subject: 'App not syncing with inverter', status: 'Open', priority: 'High', date: '2026-05-28' },
  { id: 'TKT-1025', customer: 'Vikram Singh', subject: 'Upgrading system capacity', status: 'In Progress', priority: 'Medium', date: '2026-05-26' },
  { id: 'TKT-1026', customer: 'Ananya Reddy', subject: 'Low generation during sunny day', status: 'Open', priority: 'High', date: '2026-05-28' },
  { id: 'TKT-1027', customer: 'Rohan Desai', subject: 'Request for AMC renewal quote', status: 'Resolved', priority: 'Low', date: '2026-05-20' },
  { id: 'TKT-1028', customer: 'Kavita Menon', subject: 'Wi-Fi dongle disconnected', status: 'In Progress', priority: 'Medium', date: '2026-05-27' },
  { id: 'TKT-1029', customer: 'Manoj Tiwari', subject: 'Physical damage to panel', status: 'Open', priority: 'High', date: '2026-05-28' },
  { id: 'TKT-1030', customer: 'Deepak Verma', subject: 'Referral bonus not credited', status: 'Resolved', priority: 'Low', date: '2026-05-22' },
];

export default function AdminGetHelp() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filtered = mockTickets.filter(t => 
    t.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-0 sm:p-2 md:p-6 space-y-2 md:space-y-6 flex flex-col h-full min-h-0">
      
      {/* Top Banner & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-4 w-full px-2 sm:px-0">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
            <HelpCircle className="text-brand-navy" /> Fleet Support Tickets
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-2 lg:gap-3 items-center">
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-2.5 top-[9px] lg:top-[11px] text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search by ID, customer or subject..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:border-brand-navy/80 text-xs md:text-sm h-[32px] md:h-[38px]"
              />
            </div>
            <button className="flex items-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all shadow-sm h-[32px] md:h-[38px]">
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 min-h-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <DataTable
          headers={["Ticket ID", "Customer", "Subject", "Priority", "Status", "Date", "Action"]}
          data={paginatedData}
          minWidth="1000px"
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
          totalResults={filtered.length}
          itemsPerPageOptions={[10, 20, 50]}
          renderRow={(t, idx) => (
            <tr key={idx} className="hover:bg-brand-navy/5 transition-colors border-b border-gray-100">
              <td className="px-4 py-3 text-sm font-bold text-gray-900 text-center whitespace-nowrap">{t.id}</td>
              <td className="px-4 py-3 text-sm font-bold text-brand-navy text-center">{t.customer}</td>
              <td className="px-4 py-3 text-sm text-gray-700 font-medium max-w-[300px] truncate">{t.subject}</td>
              <td className="px-4 py-3 text-sm text-center">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  t.priority === 'High' ? 'bg-red-100 text-red-700 border border-red-200' :
                  t.priority === 'Medium' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                  'bg-green-100 text-green-700 border border-green-200'
                }`}>
                  {t.priority}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                  t.status === 'Open' ? 'bg-red-50 text-red-600' :
                  t.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                  'bg-green-50 text-green-600'
                }`}>
                  {t.status === 'Open' && <Clock size={12}/>}
                  {t.status === 'In Progress' && <MessageSquare size={12}/>}
                  {t.status === 'Resolved' && <CheckCircle size={12}/>}
                  {t.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 text-center whitespace-nowrap">{t.date}</td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-2">
                  <button className="p-1.5 bg-gray-50 hover:bg-brand-navy/10 text-brand-navy rounded-lg transition-colors border border-gray-200" title="Reply">
                    <MessageSquare size={14} />
                  </button>
                </div>
              </td>
            </tr>
          )}
          renderCard={(t, idx) => {
            const globalIdx = (currentPage - 1) * itemsPerPage + idx + 1;
            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">
                      {globalIdx}
                    </span>
                    <span className="text-sm font-black text-brand-navy truncate max-w-[150px]">{t.id}</span>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                    t.status === 'Open' ? 'bg-red-50 text-red-600' :
                    t.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                    'bg-green-50 text-green-600'
                  }`}>
                    {t.status}
                  </span>
                </div>
                <div className="text-sm font-medium text-gray-800 line-clamp-2">
                  {t.subject}
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 rounded-lg p-2 border border-slate-100/50 mt-2">
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Customer</span>
                    <span className="font-semibold text-gray-700">{t.customer}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Date & Priority</span>
                    <span className="font-semibold text-gray-700">{t.date} • {t.priority}</span>
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}
