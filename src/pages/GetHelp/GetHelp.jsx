import React, { useState } from 'react';
import { LifeBuoy, Clock, CheckCircle, Search, Filter, RotateCcw, Eye, MessageCircle } from 'lucide-react';
import DataTable from '../../components/DataTable';
import SearchableDropdown from '../../components/SearchableDropdown';

export default function GetHelp() {
  const [activeTab, setActiveTab] = useState('Pending'); // 'Pending' | 'History'
  const [filters, setFilters] = useState({ searchQuery: '', category: '', status: '' });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Dummy Data Generation
  const generatePending = () => {
    const categories = ['Hardware', 'Software', 'Maintenance'];
    const priorities = ['High', 'Medium', 'Low'];
    const statuses = ['In Progress', 'Assigned', 'Pending Review'];
    const engineers = ['Rajesh K.', 'Amit S.', 'Suresh V.', 'Unassigned'];
    const times = ['Morning', 'Afternoon', 'Evening', 'Anytime'];
    const titles = ['Inverter error code', 'Panel cleaning', 'App sync issue', 'Battery fast drain', 'ROI report query', 'Birds nesting', 'Cracked panel', 'Wi-Fi disconnect', 'Firmware failure', 'Meter reading wrong'];
    
    return Array.from({ length: 40 }).map((_, i) => ({
      id: `TKT-${1029 + i}`,
      title: titles[Math.floor(Math.random() * titles.length)] + ` - Site #${i+1}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      created: `${Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0')}/05/2026`,
      prefVisit: `${Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0')}/06/2026`,
      prefTime: times[Math.floor(Math.random() * times.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      engineer: engineers[Math.floor(Math.random() * engineers.length)],
    })).reverse();
  };

  const generateHistory = () => {
    const categories = ['Hardware', 'Software', 'Maintenance'];
    const priorities = ['High', 'Medium', 'Low'];
    const engineers = ['Rajesh K.', 'Amit S.', 'Suresh V.', 'System'];
    const statuses = ['Resolved', 'Replaced', 'Closed Without Fix'];
    const ratings = ['5/5', '4/5', '3/5', '5/5', '5/5']; // Skewed towards good ratings
    const titles = ['Deep cleaning', 'Loose connection', 'Backup failure', 'Update required', 'Shadow analysis', 'Humming noise', 'Password reset'];
    
    return Array.from({ length: 40 }).map((_, i) => ({
      id: `TKT-${800 + i}`,
      title: titles[Math.floor(Math.random() * titles.length)] + ` - Past Request #${i+1}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      created: `${Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0')}/01/2026`,
      resolved: `${Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0')}/02/2026`,
      closed: `${Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0')}/02/2026`,
      finalStatus: statuses[Math.floor(Math.random() * statuses.length)],
      rating: ratings[Math.floor(Math.random() * ratings.length)],
      engineer: engineers[Math.floor(Math.random() * engineers.length)],
    })).reverse();
  };

  const [pendingData, setPendingData] = useState(generatePending);
  const [historyData, setHistoryData] = useState(generateHistory);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: '', category: 'Hardware', priority: 'Medium', prefVisit: '', prefTime: 'Anytime', description: '' });

  const handleRaiseTicket = (e) => {
    e.preventDefault();
    const ticket = {
      id: `TKT-${1052 + pendingData.length}`,
      title: newTicket.title,
      category: newTicket.category,
      priority: newTicket.priority,
      created: new Date().toLocaleDateString('en-GB'),
      prefVisit: newTicket.prefVisit || 'N/A',
      prefTime: newTicket.prefVisit ? newTicket.prefTime : 'N/A',
      status: 'Pending Review',
      engineer: 'Unassigned'
    };
    setPendingData([ticket, ...pendingData]);
    setIsModalOpen(false);
    setNewTicket({ title: '', category: 'Hardware', priority: 'Medium', prefVisit: '', prefTime: 'Anytime', description: '' });
  };

  const currentDataset = activeTab === 'Pending' ? pendingData : historyData;

  const handleClearFilters = () => {
    setFilters({ searchQuery: '', category: '', status: '' });
  };

  const filteredData = React.useMemo(() => {
    return currentDataset.filter(item => {
      if (filters.category && item.category !== filters.category) return false;
      if (filters.status && (item.status || item.finalStatus) !== filters.status) return false;
      
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        return (
          item.id.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          item.engineer.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [currentDataset, filters]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-rose-600 bg-rose-50';
      case 'Medium': return 'text-amber-600 bg-amber-50';
      case 'Low': return 'text-emerald-600 bg-emerald-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="p-0 sm:p-2 md:p-6 space-y-2 md:space-y-6 flex flex-col h-full min-h-0">
      
      {/* Top Toolbar */}
      <div className="flex flex-row justify-between items-center gap-3 w-full px-2 sm:px-0 overflow-x-auto scrollbar-none pb-2">
        
        {/* Left Side: Tabs */}
        <div className="flex gap-6 shrink-0 w-auto items-center px-1">
          <button
            onClick={() => { setActiveTab('Pending'); handleClearFilters(); }}
            className={`flex items-center gap-1.5 text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'Pending' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Clock size={16} />
            Pending Tickets
          </button>
          <button
            onClick={() => { setActiveTab('History'); handleClearFilters(); }}
            className={`flex items-center gap-1.5 text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'History' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <CheckCircle size={16} />
            Ticket History
          </button>
        </div>

        {/* Right Side: Filters & Actions */}
        <div className="flex flex-row w-auto gap-2 lg:gap-3 items-center flex-1 justify-end shrink-0">
          
          {/* Search Box */}
          <div className="flex items-center gap-2 w-[250px] md:w-[350px] shrink-0">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-2.5 top-[9px] lg:top-[11px] text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search tickets by ID, title..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:border-indigo-500 text-xs md:text-sm h-[32px] md:h-[38px]"
              />
            </div>
            <button
               onClick={() => setShowMobileFilters(!showMobileFilters)}
               className={`hidden flex items-center justify-center rounded-lg shadow-sm h-[32px] w-[32px] flex-shrink-0 transition ${showMobileFilters ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
            >
              <Filter size={14} />
            </button>
          </div>

          {/* Filters */}
          <div className={`flex flex-row flex-nowrap gap-2 w-auto overflow-visible shrink-0`}>
            <div className="w-[150px] shrink-0">
              <SearchableDropdown
                options={[{value:'Hardware', label:'Hardware'}, {value:'Software', label:'Software'}, {value:'Maintenance', label:'Maintenance'}]}
                value={filters.category}
                onChange={(val) => setFilters({ ...filters, category: val })}
                placeholder="All Categories"
                className="h-[32px] md:h-[38px]"
                height="h-[32px] md:h-[38px]"
                rounded="rounded-lg"
              />
            </div>
            <button
              onClick={handleClearFilters}
              className="flex items-center justify-center bg-gray-50 text-gray-500 border border-gray-200 rounded-lg w-[32px] md:w-[38px] h-[32px] md:h-[38px] hover:bg-gray-100 transition-colors shadow-sm shrink-0"
              title="Clear Filters"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          {/* New Ticket Button */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-indigo-200 transition-all active:scale-95 items-center justify-center gap-2 whitespace-nowrap h-[32px] md:h-[38px] shrink-0"
          >
            <MessageCircle size={16} />
            Raise New Ticket
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 min-h-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        {activeTab === 'Pending' ? (
          <DataTable
            headers={["Ticket ID", "Complaint Title", "Category", "Priority", "Created Date", "Pref. Visit Date", "Pref. Time", "Status", "Engineer", "Action"]}
            data={filteredData}
            minWidth="1200px"
            renderRow={(item, idx) => (
              <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors border-b border-gray-100">
                <td className="px-4 py-3 text-center text-xs text-indigo-600 font-bold whitespace-nowrap">{item.id}</td>
                <td className="px-4 py-3 text-left text-xs text-gray-900 font-bold max-w-[200px] truncate">{item.title}</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 whitespace-nowrap">{item.category}</td>
                <td className="px-4 py-3 text-center text-xs whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded-md font-black uppercase text-[10px] tracking-wider ${getPriorityColor(item.priority)}`}>{item.priority}</span>
                </td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium whitespace-nowrap">{item.created}</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium whitespace-nowrap">{item.prefVisit}</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 whitespace-nowrap">{item.prefTime}</td>
                <td className="px-4 py-3 text-center text-xs text-indigo-600 font-bold whitespace-nowrap">{item.status}</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 whitespace-nowrap">{item.engineer}</td>
                <td className="px-4 py-3 text-center whitespace-nowrap">
                  <button className="p-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors">
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            )}
            renderCard={(item, idx) => (
              <div key={item.id} className="bg-white rounded-xl border border-indigo-50 shadow-sm p-4 space-y-3 transition-all hover:shadow-md hover:border-indigo-100">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-black uppercase">{item.id}</span>
                  <span className={`px-2 py-0.5 rounded-md font-black uppercase text-[9px] tracking-wider ${getPriorityColor(item.priority)}`}>{item.priority}</span>
                </div>
                <div className="font-bold text-gray-900 text-sm leading-tight">{item.title}</div>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 rounded-lg p-2 border border-slate-100/50">
                  <div>
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Status</span>
                    <span className="text-indigo-600 font-bold">{item.status}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Engineer</span>
                    <span className="text-gray-700 font-medium">{item.engineer}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Created</span>
                    <span className="text-gray-700 font-medium">{item.created}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Visit Pref.</span>
                    <span className="text-gray-700 font-medium">{item.prefVisit} {item.prefTime !== 'N/A' && `(${item.prefTime})`}</span>
                  </div>
                </div>
              </div>
            )}
          />
        ) : (
          <DataTable
            headers={["Ticket ID", "Complaint Title", "Category", "Priority", "Engineer", "Created Date", "Resolved Date", "Closed Date", "Final Status", "Rating", "Action"]}
            data={filteredData}
            minWidth="1200px"
            renderRow={(item, idx) => (
              <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors border-b border-gray-100">
                <td className="px-4 py-3 text-center text-xs text-indigo-600 font-bold whitespace-nowrap">{item.id}</td>
                <td className="px-4 py-3 text-left text-xs text-gray-900 font-bold max-w-[200px] truncate">{item.title}</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 whitespace-nowrap">{item.category}</td>
                <td className="px-4 py-3 text-center text-xs whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded-md font-black uppercase text-[10px] tracking-wider ${getPriorityColor(item.priority)}`}>{item.priority}</span>
                </td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 whitespace-nowrap">{item.engineer}</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium whitespace-nowrap">{item.created}</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium whitespace-nowrap">{item.resolved}</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium whitespace-nowrap">{item.closed}</td>
                <td className="px-4 py-3 text-center text-xs text-emerald-600 font-bold whitespace-nowrap">{item.finalStatus}</td>
                <td className="px-4 py-3 text-center text-xs text-amber-500 font-black whitespace-nowrap">{item.rating}</td>
                <td className="px-4 py-3 text-center whitespace-nowrap">
                  <button className="p-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors">
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            )}
            renderCard={(item, idx) => (
              <div key={item.id} className="bg-white rounded-xl border border-indigo-50 shadow-sm p-4 space-y-3 transition-all hover:shadow-md hover:border-indigo-100">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-black uppercase">{item.id}</span>
                  <span className="text-emerald-600 font-black text-[10px] uppercase">{item.finalStatus}</span>
                </div>
                <div className="font-bold text-gray-900 text-sm leading-tight">{item.title}</div>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 rounded-lg p-2 border border-slate-100/50">
                  <div>
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Engineer</span>
                    <span className="text-gray-700 font-medium">{item.engineer}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Rating</span>
                    <span className="text-amber-500 font-black">{item.rating}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Created</span>
                    <span className="text-gray-700 font-medium">{item.created}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Closed</span>
                    <span className="text-gray-700 font-medium">{item.closed}</span>
                  </div>
                </div>
              </div>
            )}
          />
        )}
      </div>

      {/* Raise Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <LifeBuoy className="text-indigo-600" size={20} />
                Raise New Ticket
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-500 transition-colors">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleRaiseTicket} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Complaint Title *</label>
                <input 
                  required
                  type="text" 
                  value={newTicket.title}
                  onChange={e => setNewTicket({...newTicket, title: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                  placeholder="E.g. Inverter not turning on"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Category</label>
                  <select 
                    value={newTicket.category}
                    onChange={e => setNewTicket({...newTicket, category: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 bg-white"
                  >
                    <option>Hardware</option>
                    <option>Software</option>
                    <option>Maintenance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Priority</label>
                  <select 
                    value={newTicket.priority}
                    onChange={e => setNewTicket({...newTicket, priority: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 bg-white"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Pref. Visit Date</label>
                  <input 
                    type="date" 
                    value={newTicket.prefVisit}
                    onChange={e => setNewTicket({...newTicket, prefVisit: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Pref. Time</label>
                  <select 
                    value={newTicket.prefTime}
                    onChange={e => setNewTicket({...newTicket, prefTime: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 bg-white"
                  >
                    <option>Anytime</option>
                    <option>Morning (9AM-12PM)</option>
                    <option>Afternoon (12PM-4PM)</option>
                    <option>Evening (4PM-7PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Description</label>
                <textarea 
                  rows="3"
                  value={newTicket.description}
                  onChange={e => setNewTicket({...newTicket, description: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 resize-none"
                  placeholder="Please describe the issue in detail..."
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-slate-100 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2">
                  <CheckCircle size={16} />
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
