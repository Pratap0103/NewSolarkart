import React, { useState } from 'react';
import { Share2, Search, Users, Coins, CheckCircle, Clock } from 'lucide-react';
import DataTable from '../../components/DataTable';

const mockReferrals = [
  { id: 'REF-801', referrer: 'Rajesh Kumar', referee: 'Suresh Patel', status: 'Completed', coinsEarned: '+1,500', date: '2026-05-25' },
  { id: 'REF-802', referrer: 'Priya Sharma', referee: 'Neha Gupta', status: 'Pending Install', coinsEarned: '0', date: '2026-05-27' },
  { id: 'REF-803', referrer: 'Amit Patel', referee: 'Vikram Singh', status: 'Completed', coinsEarned: '+1,500', date: '2026-04-10' },
  { id: 'REF-804', referrer: 'Sneha Gupta', referee: 'Rahul Verma', status: 'In Review', coinsEarned: '0', date: '2026-05-28' },
  { id: 'REF-805', referrer: 'Rajesh Kumar', referee: 'Anita Desai', status: 'Completed', coinsEarned: '+1,500', date: '2026-03-15' },
  { id: 'REF-806', referrer: 'Ananya Reddy', referee: 'Kiran Rao', status: 'Pending Verification', coinsEarned: '0', date: '2026-05-20' },
  { id: 'REF-807', referrer: 'Vikram Singh', referee: 'Mohit Sharma', status: 'Completed', coinsEarned: '+1,500', date: '2026-02-18' },
  { id: 'REF-808', referrer: 'Priya Sharma', referee: 'Tanya Singh', status: 'Rejected', coinsEarned: '0', date: '2026-01-05' },
  { id: 'REF-809', referrer: 'Rohan Desai', referee: 'Akash Jain', status: 'Completed', coinsEarned: '+1,500', date: '2025-12-11' },
  { id: 'REF-810', referrer: 'Deepak Verma', referee: 'Sunil Gavaskar', status: 'In Review', coinsEarned: '0', date: '2026-05-29' },
];

export default function AdminReferralSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filtered = mockReferrals.filter(r => 
    r.referrer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.referee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-0 sm:p-2 md:p-6 space-y-2 md:space-y-6 flex flex-col h-full min-h-0">
      
      {/* Top Banner & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-4 w-full px-2 sm:px-0">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
            <Share2 className="text-brand-navy" /> Fleet Referrals Manager
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-2 lg:gap-3 items-center">
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-2.5 top-[9px] lg:top-[11px] text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search referrer or referee..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:border-brand-navy/80 text-xs md:text-sm h-[32px] md:h-[38px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 min-h-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <DataTable
          headers={["Ref ID", "Referrer", "Referee", "Status", "Coins Earned", "Date"]}
          data={paginatedData}
          minWidth="1000px"
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
          totalResults={filtered.length}
          itemsPerPageOptions={[10, 20, 50]}
          renderRow={(r, idx) => (
            <tr key={idx} className="hover:bg-brand-navy/5 transition-colors border-b border-gray-100">
              <td className="px-4 py-3 text-sm font-bold text-gray-900 text-center whitespace-nowrap">{r.id}</td>
              <td className="px-4 py-3 text-sm font-bold text-brand-navy text-center">{r.referrer}</td>
              <td className="px-4 py-3 text-sm text-gray-700 text-center">{r.referee}</td>
              <td className="px-4 py-3 text-center">
                <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                  r.status === 'Completed' ? 'bg-green-50 text-green-600' :
                  r.status === 'Pending Install' ? 'bg-orange-50 text-orange-600' :
                  'bg-blue-50 text-blue-600'
                }`}>
                  {r.status === 'Completed' ? <CheckCircle size={12}/> : <Clock size={12}/>}
                  {r.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm font-bold text-brand-orange text-center">{r.coinsEarned}</td>
              <td className="px-4 py-3 text-sm text-gray-600 text-center whitespace-nowrap">{r.date}</td>
            </tr>
          )}
          renderCard={(r, idx) => {
            const globalIdx = (currentPage - 1) * itemsPerPage + idx + 1;
            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">
                      {globalIdx}
                    </span>
                    <span className="text-sm font-black text-brand-navy truncate max-w-[150px]">{r.referrer}</span>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                    r.status === 'Completed' ? 'bg-green-50 text-green-600' :
                    r.status === 'Pending Install' ? 'bg-orange-50 text-orange-600' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {r.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 rounded-lg p-2 border border-slate-100/50">
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Referee</span>
                    <span className="font-semibold text-gray-700">{r.referee}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Coins Earned</span>
                    <span className="font-semibold text-brand-orange">{r.coinsEarned}</span>
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
