import React, { useState } from 'react';
import { ShieldCheck, Search, Filter, Wrench, MoreVertical } from 'lucide-react';
import DataTable from '../../components/DataTable';

const mockContracts = [
  { id: 'AMC-2026-001', customer: 'Rajesh Kumar', plan: 'Comprehensive', status: 'Active', expiry: '2027-01-15', lastService: '2026-05-10', cost: '₹12,000/yr' },
  { id: 'AMC-2026-002', customer: 'Priya Sharma', plan: 'Basic Maintenance', status: 'Expiring Soon', expiry: '2026-06-30', lastService: '2025-12-05', cost: '₹5,000/yr' },
  { id: 'AMC-2026-003', customer: 'Amit Patel', plan: 'Premium Care', status: 'Active', expiry: '2028-03-22', lastService: '2026-02-18', cost: '₹18,000/yr' },
  { id: 'AMC-2026-004', customer: 'Sneha Gupta', plan: 'Basic Maintenance', status: 'Expired', expiry: '2026-01-10', lastService: '2025-08-11', cost: '₹5,000/yr' },
  { id: 'AMC-2026-005', customer: 'Vikram Singh', plan: 'Comprehensive', status: 'Active', expiry: '2027-11-05', lastService: '2026-04-20', cost: '₹12,000/yr' },
  { id: 'AMC-2026-006', customer: 'Ananya Reddy', plan: 'Premium Care', status: 'Active', expiry: '2027-08-15', lastService: '2026-03-12', cost: '₹18,000/yr' },
  { id: 'AMC-2026-007', customer: 'Rohan Desai', plan: 'Comprehensive', status: 'Expiring Soon', expiry: '2026-07-20', lastService: '2026-01-08', cost: '₹12,000/yr' },
  { id: 'AMC-2026-008', customer: 'Kavita Menon', plan: 'Basic Maintenance', status: 'Active', expiry: '2027-02-14', lastService: '2026-05-02', cost: '₹5,000/yr' },
  { id: 'AMC-2026-009', customer: 'Manoj Tiwari', plan: 'Premium Care', status: 'Expired', expiry: '2025-12-31', lastService: '2025-06-15', cost: '₹18,000/yr' },
  { id: 'AMC-2026-010', customer: 'Deepak Verma', plan: 'Comprehensive', status: 'Active', expiry: '2028-05-10', lastService: '2026-05-20', cost: '₹12,000/yr' },
];

export default function AdminAMCManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filtered = mockContracts.filter(c => 
    c.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-0 sm:p-2 md:p-6 space-y-2 md:space-y-6 flex flex-col h-full min-h-0">
      
      {/* Top Banner & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-4 w-full px-2 sm:px-0">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShieldCheck className="text-brand-navy" /> Fleet AMC Management
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-2 lg:gap-3 items-center">
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-2.5 top-[9px] lg:top-[11px] text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search by ID or customer..."
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
          headers={["Contract ID", "Customer", "Plan Type", "Cost", "Expiry Date", "Last Service", "Status", "Action"]}
          data={paginatedData}
          minWidth="1200px"
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
          totalResults={filtered.length}
          itemsPerPageOptions={[10, 20, 50]}
          renderRow={(c, idx) => (
            <tr key={idx} className="hover:bg-brand-navy/5 transition-colors border-b border-gray-100">
              <td className="px-4 py-3 text-sm font-bold text-brand-navy text-center whitespace-nowrap">{c.id}</td>
              <td className="px-4 py-3 text-sm font-bold text-gray-900 text-center">{c.customer}</td>
              <td className="px-4 py-3 text-sm text-center">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 uppercase tracking-wider border border-gray-200">
                  {c.plan}
                </span>
              </td>
              <td className="px-4 py-3 text-sm font-semibold text-brand-orange text-center">{c.cost}</td>
              <td className="px-4 py-3 text-sm text-gray-600 text-center whitespace-nowrap">{c.expiry}</td>
              <td className="px-4 py-3 text-sm text-gray-600 text-center whitespace-nowrap">{c.lastService}</td>
              <td className="px-4 py-3 text-center">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  c.status === 'Active' ? 'bg-green-100 text-green-700 border border-green-200' :
                  c.status === 'Expiring Soon' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                  'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {c.status}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-2">
                  <button className="p-1.5 bg-gray-50 hover:bg-brand-navy/10 text-brand-navy rounded-lg transition-colors border border-gray-200" title="Dispatch Service">
                    <Wrench size={14} />
                  </button>
                  <button className="p-1.5 bg-gray-50 hover:bg-brand-navy/10 text-gray-600 hover:text-brand-navy rounded-lg transition-colors border border-gray-200" title="Options">
                    <MoreVertical size={14} />
                  </button>
                </div>
              </td>
            </tr>
          )}
          renderCard={(c, idx) => {
            const globalIdx = (currentPage - 1) * itemsPerPage + idx + 1;
            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">
                      {globalIdx}
                    </span>
                    <span className="text-sm font-black text-brand-navy truncate max-w-[150px]">{c.customer}</span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    c.status === 'Active' ? 'bg-green-100 text-green-700 border border-green-200' :
                    c.status === 'Expiring Soon' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                    'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {c.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 rounded-lg p-2 border border-slate-100/50">
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Plan & ID</span>
                    <span className="font-semibold text-gray-700">{c.plan} • {c.id}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Expiry & Last Svc</span>
                    <span className="font-semibold text-gray-700">{c.expiry} • {c.lastService}</span>
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
