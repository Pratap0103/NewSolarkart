import React, { useState } from 'react';
import { Coins, TrendingUp, IndianRupee, ArrowUpRight, ChevronRight, Search } from 'lucide-react';
import DataTable from '../../components/DataTable';

const mockSavings = [
  { id: 'CUST-001', customer: 'Rajesh Kumar', monthSavings: 14500, lifetimeSavings: 850000, roIMonths: 32 },
  { id: 'CUST-002', customer: 'Priya Sharma', monthSavings: 12200, lifetimeSavings: 420000, roIMonths: 36 },
  { id: 'CUST-003', customer: 'Amit Patel', monthSavings: 28000, lifetimeSavings: 1250000, roIMonths: 28 },
  { id: 'CUST-004', customer: 'Sneha Gupta', monthSavings: 9500, lifetimeSavings: 180000, roIMonths: 40 },
  { id: 'CUST-005', customer: 'Vikram Singh', monthSavings: 35000, lifetimeSavings: 2100000, roIMonths: 24 },
  { id: 'CUST-006', customer: 'Ananya Reddy', monthSavings: 6500, lifetimeSavings: 95000, roIMonths: 45 },
  { id: 'CUST-007', customer: 'Rohan Desai', monthSavings: 22000, lifetimeSavings: 980000, roIMonths: 30 },
  { id: 'CUST-008', customer: 'Kavita Menon', monthSavings: 11000, lifetimeSavings: 340000, roIMonths: 38 },
  { id: 'CUST-009', customer: 'Manoj Tiwari', monthSavings: 16500, lifetimeSavings: 720000, roIMonths: 34 },
  { id: 'CUST-010', customer: 'Deepak Verma', monthSavings: 42000, lifetimeSavings: 3100000, roIMonths: 22 },
];

export default function AdminSavedMoney() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filtered = mockSavings.filter(s => 
    s.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-0 sm:p-2 md:p-6 space-y-2 md:space-y-6 flex flex-col h-full min-h-0">
      
      {/* Top Banner & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-4 w-full px-2 sm:px-0">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
            <Coins className="text-brand-navy" /> Fleet Financial Impact
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-2 lg:gap-3 items-center">
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-2.5 top-[9px] lg:top-[11px] text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search by customer..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:border-brand-navy/80 text-xs md:text-sm h-[32px] md:h-[38px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Aggregate Cards (Matching standard User UI) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 sm:px-0">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Fleet Savings (Lifetime)</p>
          <h3 className="text-2xl font-black text-gray-900 mt-1">₹4.8 Crores</h3>
          <p className="text-xs font-semibold text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> Impacting 1,248 households
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Avg. Customer Savings / Mo</p>
          <h3 className="text-2xl font-black text-brand-orange mt-1">₹14,500</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Avg. Payback Period</p>
          <h3 className="text-2xl font-black text-brand-navy mt-1">3.2 Years</h3>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 min-h-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <DataTable
          headers={["Customer Name", "This Month's Savings", "Lifetime Savings", "Estimated Payback"]}
          data={paginatedData}
          minWidth="800px"
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
          totalResults={filtered.length}
          itemsPerPageOptions={[10, 20, 50]}
          renderRow={(s, idx) => (
            <tr key={idx} className="hover:bg-brand-navy/5 transition-colors border-b border-gray-100">
              <td className="px-4 py-3 text-sm font-bold text-gray-900 text-center">{s.customer}</td>
              <td className="px-4 py-3 text-center">
                <span className="inline-flex items-center justify-center gap-1 font-bold text-green-600">
                  <ArrowUpRight size={14} /> ₹{s.monthSavings.toLocaleString()}
                </span>
              </td>
              <td className="px-4 py-3 text-sm font-bold text-brand-navy text-center">₹{s.lifetimeSavings.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-gray-600 font-semibold text-center">{s.roIMonths} Months</td>
            </tr>
          )}
          renderCard={(s, idx) => {
            const globalIdx = (currentPage - 1) * itemsPerPage + idx + 1;
            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">
                      {globalIdx}
                    </span>
                    <span className="text-sm font-black text-brand-navy truncate max-w-[150px]">{s.customer}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 rounded-lg p-2 border border-slate-100/50">
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">This Month</span>
                    <span className="font-semibold text-green-600">₹{s.monthSavings.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Lifetime</span>
                    <span className="font-semibold text-brand-navy">₹{s.lifetimeSavings.toLocaleString()}</span>
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
