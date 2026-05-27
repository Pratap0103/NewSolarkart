import React, { useState } from 'react';
import { Shield, FileCheck, CreditCard, ShieldAlert, CheckCircle, Clock, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/DataTable';

export default function AMCManagement() {
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [form, setForm] = useState({
    newPlan: 'SolarKart Care Platinum',
    duration: '1 Year',
    amount: '₹4,999',
    paymentMode: 'UPI / NetBanking',
    remark: ''
  });

  const profile = { customerName: 'Rajesh Kumar' };
  
  const [amc] = useState({
    status: 'Active',
    expiryDate: '12 Nov 2026',
    planName: 'SolarKart Standard Care',
    remainingDays: 142,
    servicesRemaining: 2,
    renewalAmount: '₹1,999',
    history: Array.from({ length: 40 }).map((_, i) => {
      const year = 2025 - i;
      return {
        id: `AMC-${10000 + i * 73}`,
        planName: i % 3 === 0 ? 'SolarKart Gold Guard' : 'SolarKart Standard Care',
        startDate: `12 Nov ${year}`,
        endDate: `12 Nov ${year + 1}`,
        amount: i % 3 === 0 ? '₹3,499' : '₹1,999',
        servicesIncluded: i % 3 === 0 ? 4 : 2,
        servicesUsed: i === 0 ? 0 : (i % 3 === 0 ? 4 : 2),
        status: i === 0 ? 'Active' : 'Expired'
      };
    })
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  const filteredHistory = amc.history.filter(item => 
    item.planName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const paginatedData = filteredHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const planAmountMap = {
    'SolarKart Care Platinum': '₹4,999',
    'SolarKart Gold Guard': '₹3,499',
    'SolarKart Standard Care': '₹1,999'
  };

  const handlePlanChange = (e) => {
    const plan = e.target.value;
    setForm({
      ...form,
      newPlan: plan,
      amount: planAmountMap[plan] || '₹1,999'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('AMC Renewal request submitted successfully!');
    setShowRenewModal(false);
  };

  return (
    <div className="p-0 sm:p-2 md:p-6 space-y-2 md:space-y-6 flex flex-col h-full min-h-0">
      
      {/* Top Banner & Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-4 w-full px-2 sm:px-0">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="text-indigo-600" /> AMC Management
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-2 lg:gap-3 items-center">
          <div className="flex items-center gap-2 w-full lg:w-auto lg:flex-[1.5]">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-2.5 top-[9px] lg:top-[11px] text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search AMC history..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:border-indigo-500 text-xs md:text-sm h-[32px] md:h-[38px]"
              />
            </div>
          </div>
          <button 
            onClick={() => setShowRenewModal(true)}
            className="w-full lg:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 h-[32px] md:h-[38px] rounded-lg text-xs md:text-sm font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <CreditCard size={16} />
            Renew AMC
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-1 sm:gap-4 px-2 sm:px-0 shrink-0">
        <div className="bg-white rounded-lg sm:rounded-2xl p-1 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center sm:items-start justify-center sm:justify-between gap-0.5 sm:gap-2 relative overflow-hidden group hover:shadow-md transition-shadow text-center sm:text-left">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-50 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 z-10 text-slate-500 w-full justify-center sm:justify-start">
            <ShieldAlert size={14} className="text-emerald-500 hidden sm:block" />
            <span className="text-[4px] sm:text-xs font-bold uppercase tracking-wider leading-none sm:leading-tight">AMC Status</span>
          </div>
          <div className="z-10 mt-0.5 sm:mt-1 w-full">
            <span className="text-[6px] sm:text-2xl font-black text-gray-900 block tracking-tighter">{amc.status}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-2xl p-1 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center sm:items-start justify-center sm:justify-between gap-0.5 sm:gap-2 relative overflow-hidden group hover:shadow-md transition-shadow text-center sm:text-left">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-indigo-50 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 z-10 text-slate-500 w-full justify-center sm:justify-start">
            <FileCheck size={14} className="text-indigo-500 hidden sm:block" />
            <span className="text-[4px] sm:text-xs font-bold uppercase tracking-wider leading-none sm:leading-tight">Plan</span>
          </div>
          <div className="z-10 mt-0.5 sm:mt-1 w-full">
            <span className="text-[5px] sm:text-xl font-black text-indigo-600 block tracking-tighter truncate leading-tight sm:leading-normal">{amc.planName}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-2xl p-1 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center sm:items-start justify-center sm:justify-between gap-0.5 sm:gap-2 relative overflow-hidden group hover:shadow-md transition-shadow text-center sm:text-left">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-50 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 z-10 text-slate-500 w-full justify-center sm:justify-start">
            <Clock size={14} className="text-blue-500 hidden sm:block" />
            <span className="text-[4px] sm:text-xs font-bold uppercase tracking-wider leading-none sm:leading-tight">Days Left</span>
          </div>
          <div className="z-10 mt-0.5 sm:mt-1 w-full">
            <span className="text-[6px] sm:text-2xl font-black text-gray-900 block tracking-tighter">{amc.remainingDays}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-2xl p-1 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center sm:items-start justify-center sm:justify-between gap-0.5 sm:gap-2 relative overflow-hidden group hover:shadow-md transition-shadow text-center sm:text-left">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-50 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 z-10 text-slate-500 w-full justify-center sm:justify-start">
            <CheckCircle size={14} className="text-emerald-500 hidden sm:block" />
            <span className="text-[4px] sm:text-xs font-bold uppercase tracking-wider leading-none sm:leading-tight">Services</span>
          </div>
          <div className="z-10 mt-0.5 sm:mt-1 w-full">
            <span className="text-[6px] sm:text-2xl font-black text-emerald-600 block tracking-tighter">{amc.servicesRemaining}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-2xl p-1 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center sm:items-start justify-center sm:justify-between gap-0.5 sm:gap-2 relative overflow-hidden group hover:shadow-md transition-shadow text-center sm:text-left">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-50 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 z-10 text-slate-500 w-full justify-center sm:justify-start">
            <CreditCard size={14} className="text-amber-500 hidden sm:block" />
            <span className="text-[4px] sm:text-xs font-bold uppercase tracking-wider leading-none sm:leading-tight">Renew</span>
          </div>
          <div className="z-10 mt-0.5 sm:mt-1 w-full">
            <span className="text-[6px] sm:text-2xl font-black text-gray-900 block tracking-tighter">{amc.renewalAmount}</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 min-h-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <DataTable
          headers={["AMC ID", "Plan Name", "Duration", "Amount", "Services", "Status", "Action"]}
          data={paginatedData}
          minWidth="900px"
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
          totalResults={filteredHistory.length}
          itemsPerPageOptions={[50, 100, 200]}
          renderRow={(item, idx) => (
            <tr key={idx} className="hover:bg-indigo-50/30 transition-colors border-b border-gray-100">
              <td className="px-4 py-3 text-sm font-bold text-gray-900 text-center whitespace-nowrap">{item.id}</td>
              <td className="px-4 py-3 text-sm font-bold text-indigo-700 text-center">{item.planName}</td>
              <td className="px-4 py-3 text-sm text-gray-600 text-center whitespace-nowrap">
                <div className="flex flex-col items-center">
                  <span className="font-semibold">{item.startDate}</span>
                  <span className="text-[10px] text-gray-400">to {item.endDate}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm font-bold text-gray-900 text-center">{item.amount}</td>
              <td className="px-4 py-3 text-sm text-gray-600 text-center">
                {item.servicesUsed} / {item.servicesIncluded}
              </td>
              <td className="px-4 py-3 text-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  item.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => toast.success(`Downloaded agreement for ${item.id}`)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
                >
                  <FileCheck size={14} /> Agreement
                </button>
              </td>
            </tr>
          )}
          renderCard={(item, idx) => {
            const globalIdx = (currentPage - 1) * itemsPerPage + idx + 1;
            return (
              <div key={idx} className="bg-white rounded-xl border border-indigo-50 shadow-sm p-4 space-y-3 transition-all hover:shadow-md hover:border-indigo-100">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">
                      {globalIdx}
                    </span>
                    <span className="text-sm font-black text-indigo-700 truncate max-w-[150px]">{item.planName}</span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 rounded-lg p-2 border border-slate-100/50">
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Duration</span>
                    <span className="font-semibold text-gray-700">{item.startDate.split(' ')[2]} - {item.endDate.split(' ')[2]}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Amount</span>
                    <span className="font-semibold text-gray-700">{item.amount}</span>
                  </div>
                  <div className="flex flex-col col-span-2">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Services Used</span>
                    <span className="font-semibold text-gray-700">{item.servicesUsed} of {item.servicesIncluded}</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-slate-100 mt-1">
                  <button
                    onClick={() => toast.success(`Downloaded agreement for ${item.id}`)}
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold"
                  >
                    <FileCheck size={14} /> Download Agreement
                  </button>
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* RENEW AMC MODAL */}
      {showRenewModal && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 md:p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">Renew AMC Contract</h3>
              <button onClick={() => setShowRenewModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 md:p-5 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Customer Name</label>
                <input type="text" readOnly value={profile.customerName} className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-600" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Select Renewal Plan</label>
                <select value={form.newPlan} onChange={handlePlanChange} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none">
                  <option>SolarKart Care Platinum</option>
                  <option>SolarKart Gold Guard</option>
                  <option>SolarKart Standard Care</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Duration</label>
                  <select value={form.duration} onChange={(e) => setForm({...form, duration: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none">
                    <option>1 Year</option>
                    <option>2 Years</option>
                    <option>3 Years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Total Amount</label>
                  <input type="text" readOnly value={form.amount} className="w-full px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-sm font-bold text-emerald-700" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Payment Mode</label>
                <select value={form.paymentMode} onChange={(e) => setForm({...form, paymentMode: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none">
                  <option>UPI / NetBanking</option>
                  <option>Credit / Debit Card</option>
                  <option>Cash on Delivery (Site Visit)</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-gray-100 mt-2">
                <button type="button" onClick={() => setShowRenewModal(false)} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2">
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
