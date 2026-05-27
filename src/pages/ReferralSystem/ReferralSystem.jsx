import React, { useState } from 'react';
import { Award, Copy, Share2, MessageCircle, Info, Users, PlusCircle, CreditCard, ChevronRight, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/DataTable';

export default function ReferralSystem() {
  const [selectedLead, setSelectedLead] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    city: '',
    plantInterest: '5 kW On-Grid'
  });

  const [referrals, setReferrals] = useState({
    referralCode: 'SOLARKART500',
    totalReferrals: 40,
    pendingRewards: '₹14,000',
    earnedRewards: '₹32,500',
    leads: Array.from({ length: 40 }).map((_, i) => ({
      referralId: `REF-${20000 + i * 23}`,
      name: i % 3 === 0 ? 'Amit Sharma' : (i % 3 === 1 ? 'Sunita Patel' : 'Vikram Singh'),
      mobile: '+91 98765 000' + (i % 99),
      city: i % 3 === 0 ? 'Pune' : (i % 3 === 1 ? 'Mumbai' : 'Nagpur'),
      plantInterest: i % 3 === 0 ? '5 kW On-Grid' : (i % 3 === 1 ? '10 kW Hybrid' : '3 kW Off-Grid'),
      status: i % 4 === 0 ? 'Converted' : (i % 4 === 1 ? 'Site Visit Done' : (i % 4 === 2 ? 'Quotation Sent' : 'Follow up')),
      rewardAmount: i % 3 === 0 ? '₹1,500' : (i % 3 === 1 ? '₹2,500' : '₹1,000'),
      rewardStatus: i % 4 === 0 ? 'Paid' : 'Pending',
      date: `12 Nov 202${4 - (i % 3)}`
    }))
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  const filteredLeads = referrals.leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.referralId.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedData = filteredLeads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOpenDetail = (lead) => {
    setSelectedLead(lead);
    setShowDetail(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referrals.referralCode);
    toast.success('Referral code copied to clipboard!');
  };

  const handleWhatsAppInvite = () => {
    const text = encodeURIComponent(`Hey! I recently installed SolarKart solar panels and saved ₹7,300 this month. Use my code ${referrals.referralCode} to get a special discount! Join clean energy today!`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareLink = () => {
    toast.success('Referral invite link copied to clipboard!');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.city) {
      toast.error('Please fill out all fields.');
      return;
    }
    
    toast.success('New referral lead registered successfully!');
    setForm({
      name: '',
      mobile: '',
      city: '',
      plantInterest: '5 kW On-Grid'
    });
  };

  return (
    <div className="p-0 sm:p-2 md:p-6 space-y-2 md:space-y-6 flex flex-col h-full min-h-0 overflow-y-auto">
      
      {/* Top Section: Refer & Earn Stats */}
      <div className="flex flex-col xl:flex-row gap-4 xl:gap-6 shrink-0">
        
        {/* Code & Actions */}
        <div className="flex flex-col gap-4 w-full xl:w-1/3">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-5 rounded-2xl shadow-md flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Award size={100} />
            </div>
            <Award size={36} className="text-yellow-400 mb-2 z-10" />
            <h3 className="text-sm font-semibold text-indigo-100 z-10">Your Unique Referral Code</h3>
            <div className="flex items-center justify-center gap-3 mt-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20 z-10 w-full max-w-xs cursor-pointer hover:bg-white/20 transition-colors" onClick={handleCopyCode}>
              <span className="text-2xl font-black tracking-widest">{referrals.referralCode}</span>
              <Copy size={20} className="text-indigo-200" />
            </div>
            <p className="text-xs text-indigo-200 mt-4 z-10">Share this code with neighbors & friends to earn cashback!</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3">
            <button onClick={handleWhatsAppInvite} className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
              <MessageCircle size={18} /> Send WhatsApp Invite
            </button>
            <button onClick={handleShareLink} className="w-full flex items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 py-2.5 rounded-xl text-sm font-bold transition-colors">
              <Share2 size={18} /> Share Referral Link
            </button>
          </div>
        </div>

        {/* KPIs & Registration Form */}
        <div className="flex flex-col gap-4 w-full xl:w-2/3">
          <div className="grid grid-cols-3 gap-1 sm:gap-4 px-2 sm:px-0">
            <div className="bg-white rounded-lg sm:rounded-2xl p-1 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center sm:items-start justify-center sm:justify-between gap-0.5 sm:gap-2 relative overflow-hidden group hover:shadow-md transition-shadow text-center sm:text-left">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-indigo-50 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
              <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 z-10 text-slate-500 w-full justify-center sm:justify-start">
                <Users size={14} className="text-indigo-500 hidden sm:block" />
                <span className="text-[4px] sm:text-xs font-bold uppercase tracking-wider leading-none sm:leading-tight">Referrals</span>
              </div>
              <div className="z-10 mt-0.5 sm:mt-1 w-full">
                <span className="text-[6px] sm:text-2xl font-black text-gray-900 block tracking-tighter">{referrals.totalReferrals}</span>
              </div>
            </div>

            <div className="bg-white rounded-lg sm:rounded-2xl p-1 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center sm:items-start justify-center sm:justify-between gap-0.5 sm:gap-2 relative overflow-hidden group hover:shadow-md transition-shadow text-center sm:text-left">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-50 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
              <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 z-10 text-slate-500 w-full justify-center sm:justify-start">
                <ChevronRight size={14} className="text-amber-500 hidden sm:block" />
                <span className="text-[4px] sm:text-xs font-bold uppercase tracking-wider leading-none sm:leading-tight">Pending</span>
              </div>
              <div className="z-10 mt-0.5 sm:mt-1 w-full">
                <span className="text-[6px] sm:text-2xl font-black text-gray-900 block tracking-tighter">{referrals.pendingRewards}</span>
              </div>
            </div>

            <div className="bg-white rounded-lg sm:rounded-2xl p-1 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center sm:items-start justify-center sm:justify-between gap-0.5 sm:gap-2 relative overflow-hidden group hover:shadow-md transition-shadow text-center sm:text-left">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-50 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
              <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 z-10 text-slate-500 w-full justify-center sm:justify-start">
                <CreditCard size={14} className="text-emerald-500 hidden sm:block" />
                <span className="text-[4px] sm:text-xs font-bold uppercase tracking-wider leading-none sm:leading-tight">Earned</span>
              </div>
              <div className="z-10 mt-0.5 sm:mt-1 w-full">
                <span className="text-[6px] sm:text-2xl font-black text-emerald-600 block tracking-tighter">{referrals.earnedRewards}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <PlusCircle className="text-indigo-600" /> Register New Referral Lead
            </h3>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
              <div className="lg:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">Name</label>
                <input required type="text" placeholder="Friend's Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:bg-white outline-none transition-colors" />
              </div>
              <div className="lg:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">Mobile</label>
                <input required type="tel" maxLength={10} placeholder="10-digit mobile" value={form.mobile} onChange={(e) => setForm({...form, mobile: e.target.value})} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:bg-white outline-none transition-colors" />
              </div>
              <div className="lg:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
                <input required type="text" placeholder="e.g. Pune" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:bg-white outline-none transition-colors" />
              </div>
              <div className="lg:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">Plant Interest</label>
                <select value={form.plantInterest} onChange={(e) => setForm({...form, plantInterest: e.target.value})} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:bg-white outline-none transition-colors">
                  <option>3 kW Off-Grid</option>
                  <option>5 kW On-Grid</option>
                  <option>10 kW Hybrid</option>
                  <option>15 kW Commercial</option>
                </select>
              </div>
              <div className="lg:col-span-1">
                <button type="submit" className="w-full h-[38px] bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold shadow-md shadow-indigo-200 transition-all flex items-center justify-center">
                  Submit Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Table Toolbar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-4 w-full px-2 sm:px-0 mt-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Your Referral Leads</h2>
        </div>
        <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-2 lg:gap-3 items-center">
          <div className="flex items-center gap-2 w-full lg:w-auto lg:flex-[1.5]">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-2.5 top-[9px] lg:top-[11px] text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:border-indigo-500 text-xs md:text-sm h-[32px] md:h-[38px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 min-h-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col mt-2">
        <DataTable
          headers={["Ref ID", "Name", "Mobile", "City", "Interest", "Lead Status", "Reward", "Payout", "Action"]}
          data={paginatedData}
          minWidth="1200px"
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
          totalResults={filteredLeads.length}
          itemsPerPageOptions={[50, 100, 200]}
          renderRow={(lead, idx) => (
            <tr key={idx} className="hover:bg-indigo-50/30 transition-colors border-b border-gray-100">
              <td className="px-4 py-3 text-sm font-bold text-gray-900 text-center whitespace-nowrap">{lead.referralId}</td>
              <td className="px-4 py-3 text-sm font-bold text-indigo-700 text-center whitespace-nowrap">{lead.name}</td>
              <td className="px-4 py-3 text-sm text-gray-600 text-center whitespace-nowrap">{lead.mobile}</td>
              <td className="px-4 py-3 text-sm text-gray-600 text-center whitespace-nowrap">{lead.city}</td>
              <td className="px-4 py-3 text-sm text-gray-900 text-center whitespace-nowrap">{lead.plantInterest}</td>
              <td className="px-4 py-3 text-center">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  lead.status === 'Converted' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {lead.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm font-bold text-emerald-600 text-center whitespace-nowrap">{lead.rewardAmount}</td>
              <td className="px-4 py-3 text-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  lead.rewardStatus === 'Paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-gray-100 text-gray-500'
                }`}>
                  {lead.rewardStatus}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <button onClick={() => handleOpenDetail(lead)} className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition-colors whitespace-nowrap">
                  <Info size={14} /> Details
                </button>
              </td>
            </tr>
          )}
          renderCard={(lead, idx) => {
            const globalIdx = (currentPage - 1) * itemsPerPage + idx + 1;
            return (
              <div key={idx} className="bg-white rounded-xl border border-indigo-50 shadow-sm p-4 space-y-3 transition-all hover:shadow-md hover:border-indigo-100">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">
                      {globalIdx}
                    </span>
                    <span className="text-sm font-black text-indigo-700 truncate max-w-[150px]">{lead.name}</span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    lead.status === 'Converted' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {lead.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 rounded-lg p-2 border border-slate-100/50">
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Mobile & City</span>
                    <span className="font-semibold text-gray-700">{lead.mobile} • {lead.city}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Plant Interest</span>
                    <span className="font-semibold text-gray-700">{lead.plantInterest}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Reward</span>
                    <span className="font-semibold text-emerald-600">{lead.rewardAmount}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Payout</span>
                    <span className="font-semibold text-gray-700">{lead.rewardStatus}</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-slate-100 mt-1">
                  <button onClick={() => handleOpenDetail(lead)} className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold">
                    <Info size={14} /> View Details
                  </button>
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* DETAIL MODAL */}
      {showDetail && selectedLead && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 md:p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Users className="text-indigo-600" /> Referral Details
              </h3>
              <button onClick={() => setShowDetail(false)} className="text-gray-400 hover:text-gray-600 p-1">
                ✕
              </button>
            </div>
            
            <div className="p-4 md:p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-0.5">Referral ID</div>
                  <div className="font-bold text-gray-900">{selectedLead.referralId}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-0.5">Lead Name</div>
                  <div className="font-semibold text-gray-800">{selectedLead.name}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-0.5">Mobile Number</div>
                  <div className="font-semibold text-gray-800">{selectedLead.mobile}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-0.5">City / Region</div>
                  <div className="font-semibold text-gray-800">{selectedLead.city}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-0.5">Capacity Interest</div>
                  <div className="font-semibold text-gray-800">{selectedLead.plantInterest}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-0.5">Lead Status</div>
                  <div className="font-bold text-indigo-700">{selectedLead.status}</div>
                </div>
                <div className="col-span-2 border-t border-gray-100 pt-3 mt-1 grid grid-cols-2">
                  <div>
                    <div className="text-xs text-gray-500 font-semibold mb-0.5">Reward Amount</div>
                    <div className="font-black text-emerald-600 text-lg">{selectedLead.rewardAmount}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-semibold mb-0.5">Payout Status</div>
                    <div className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      selectedLead.rewardStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {selectedLead.rewardStatus}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mt-2 text-xs text-indigo-800">
                <strong>Payout Rule:</strong> Rewards are cleared and paid directly to your linked bank account within 7 working days once the lead completes site verification and pays their system advance.
              </div>

              <div className="flex justify-end pt-2 mt-2">
                <button onClick={() => setShowDetail(false)} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-200 transition-all">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
