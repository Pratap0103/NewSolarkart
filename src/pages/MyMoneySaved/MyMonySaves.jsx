import React, { useState } from 'react';
import { PiggyBank, TrendingUp, DollarSign, Activity, Percent, Receipt, Search, Filter, RotateCcw } from 'lucide-react';
import DataTable from '../../components/DataTable';
import SearchableDropdown from '../../components/SearchableDropdown';

export default function MyMonySaves() {
  // Generate robust dummy data for years 2021 to 2026
  const dummyData = React.useMemo(() => {
    const years = [2021, 2022, 2023, 2024, 2025, 2026];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    let cumulative = 0;
    const data = [];
    
    years.forEach(year => {
      const maxMonth = year === 2026 ? 5 : 12; // Let's pretend 2026 goes up to May
      for (let i = 0; i < maxMonth; i++) {
        // Base bill amount roughly increases slightly over years to simulate inflation
        const baseInflation = (year - 2021) * 300;
        const before = 4000 + baseInflation + Math.floor(Math.random() * 1500); 
        const after = 800 + Math.floor(Math.random() * 800);
        
        const savings = before - after;
        cumulative += savings;
        
        const roi = ((cumulative / 340000) * 100).toFixed(1);
        
        data.push({
          year: year.toString(),
          month: months[i],
          before: before,
          after: after,
          monthlySavings: savings,
          cumulativeSavings: cumulative,
          roi: parseFloat(roi)
        });
      }
    });
    
    return data.reverse(); // Newest first
  }, []);

  const [filters, setFilters] = useState({ searchQuery: '', year: '', month: '' });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  const yearsList = ['2026', '2025', '2024', '2023', '2022', '2021'];
  const monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleClearFilters = () => {
    setFilters({ searchQuery: '', year: '', month: '' });
    setCurrentPage(1);
  };

  const filteredData = React.useMemo(() => {
    return dummyData.filter(item => {
      if (filters.year && item.year !== filters.year) return false;
      if (filters.month && item.month !== filters.month) return false;
      
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        return (
          item.year.toLowerCase().includes(q) ||
          item.month.toLowerCase().includes(q) ||
          item.before.toString().includes(q) ||
          item.after.toString().includes(q) ||
          item.monthlySavings.toString().includes(q) ||
          item.roi.toString().includes(q)
        );
      }
      return true;
    });
  }, [dummyData, filters]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // KPI calculations (Dummy values for demonstration)
  const kpis = {
    netInv: 340000, // ₹3,40,000
    totalSave: dummyData[0]?.cumulativeSavings || 0,
    roiPercent: dummyData[0]?.roi || 0,
    payback: '3.2 Years'
  };

  return (
    <div className="p-0 sm:p-2 md:p-6 space-y-2 md:space-y-6 flex flex-col h-full min-h-0">
      
      {/* KPI Cards Section */}
      <div className="grid grid-cols-4 gap-1 sm:gap-4 px-2 sm:px-0">
        {/* Net Investment */}
        <div className="bg-white rounded-lg sm:rounded-2xl p-1 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center sm:items-start justify-center sm:justify-between gap-0.5 sm:gap-2 relative overflow-hidden group hover:shadow-md transition-shadow text-center sm:text-left">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-brand-navy/10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 z-10 text-slate-500 w-full justify-center sm:justify-start">
            <DollarSign size={14} className="text-brand-navy/80 hidden sm:block" />
            <span className="text-[4px] sm:text-xs font-bold uppercase tracking-wider leading-none sm:leading-tight">Net Inv</span>
          </div>
          <div className="z-10 mt-0.5 sm:mt-1 w-full">
            <span className="text-[6px] sm:text-2xl font-black text-slate-800 block tracking-tighter">₹{kpis.netInv.toLocaleString()}</span>
          </div>
        </div>

        {/* Total Save */}
        <div className="bg-white rounded-lg sm:rounded-2xl p-1 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center sm:items-start justify-center sm:justify-between gap-0.5 sm:gap-2 relative overflow-hidden group hover:shadow-md transition-shadow text-center sm:text-left">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-brand-orange/10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 z-10 text-slate-500 w-full justify-center sm:justify-start">
            <TrendingUp size={14} className="text-brand-orange/80 hidden sm:block" />
            <span className="text-[4px] sm:text-xs font-bold uppercase tracking-wider leading-none sm:leading-tight">Total Save</span>
          </div>
          <div className="z-10 mt-0.5 sm:mt-1 w-full">
            <span className="text-[6px] sm:text-2xl font-black text-brand-orange block tracking-tighter">₹{kpis.totalSave.toLocaleString()}</span>
          </div>
        </div>

        {/* ROI % */}
        <div className="bg-white rounded-lg sm:rounded-2xl p-1 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center sm:items-start justify-center sm:justify-between gap-0.5 sm:gap-2 relative overflow-hidden group hover:shadow-md transition-shadow text-center sm:text-left">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-brand-navy/10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 z-10 text-slate-500 w-full justify-center sm:justify-start">
            <Percent size={14} className="text-brand-navy/80 hidden sm:block" />
            <span className="text-[4px] sm:text-xs font-bold uppercase tracking-wider leading-none sm:leading-tight">ROI %</span>
          </div>
          <div className="z-10 mt-0.5 sm:mt-1 w-full">
            <span className="text-[6px] sm:text-2xl font-black text-brand-navy block tracking-tighter">{kpis.roiPercent}%</span>
          </div>
        </div>

        {/* Payback */}
        <div className="bg-white rounded-lg sm:rounded-2xl p-1 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center sm:items-start justify-center sm:justify-between gap-0.5 sm:gap-2 relative overflow-hidden group hover:shadow-md transition-shadow text-center sm:text-left">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-brand-orange/10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 z-10 text-slate-500 w-full justify-center sm:justify-start">
            <Activity size={14} className="text-brand-orange/80 hidden sm:block" />
            <span className="text-[4px] sm:text-xs font-bold uppercase tracking-wider leading-none sm:leading-tight">Payback</span>
          </div>
          <div className="z-10 mt-0.5 sm:mt-1 w-full">
            <span className="text-[6px] sm:text-2xl font-black text-brand-orange block tracking-tighter">{kpis.payback}</span>
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-4 w-full px-2 sm:px-0">
        <div className="flex flex-col lg:flex-row w-full gap-2 lg:gap-3 items-center">
          
          {/* Search items box */}
          <div className="flex items-center gap-2 w-full lg:w-auto lg:flex-[1.5]">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-2.5 top-[9px] lg:top-[11px] text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search records..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:border-brand-navy/80 text-xs md:text-sm h-[32px] md:h-[38px]"
              />
            </div>
            <button
               onClick={() => setShowMobileFilters(!showMobileFilters)}
               className={`lg:hidden flex items-center justify-center rounded-lg shadow-sm h-[32px] w-[32px] flex-shrink-0 transition ${showMobileFilters ? 'bg-brand-navy/10 text-brand-navy border-brand-navy/30' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
               title="Toggle Filters"
            >
              <Filter size={14} />
            </button>
            <button
              onClick={handleClearFilters}
              className="lg:hidden flex items-center justify-center bg-gray-50 text-gray-500 border border-gray-200 rounded-lg h-[32px] w-[32px] flex-shrink-0 shadow-sm active:scale-95"
              title="Clear Filters"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Filtering dropdowns */}
          <div className={`${showMobileFilters ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row lg:flex-nowrap gap-2 w-full lg:w-auto lg:flex-[6] overflow-visible`}>
            
            {/* Year Dropdown */}
            <div className="flex-1 min-w-0 lg:min-w-[150px]">
              <SearchableDropdown
                options={yearsList.map(y => ({ value: y, label: y }))}
                value={filters.year}
                onChange={(val) => setFilters({ ...filters, year: val })}
                placeholder="All Years"
                className="h-[32px] md:h-[38px]"
                height="h-[32px] md:h-[38px]"
                rounded="rounded-lg"
              />
            </div>

            {/* Month Dropdown */}
            <div className="flex-1 min-w-0 lg:min-w-[150px]">
              <SearchableDropdown
                options={monthsList.map(m => ({ value: m, label: m }))}
                value={filters.month}
                onChange={(val) => setFilters({ ...filters, month: val })}
                placeholder="All Months"
                className="h-[32px] md:h-[38px]"
                height="h-[32px] md:h-[38px]"
                rounded="rounded-lg"
              />
            </div>

            <button
              onClick={handleClearFilters}
              className="hidden lg:flex items-center justify-center bg-gray-50 text-gray-500 border border-gray-200 rounded-lg w-[38px] h-[38px] hover:bg-gray-100 transition-colors shadow-sm"
              title="Clear Filters"
            >
              <RotateCcw size={16} />
            </button>

          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 min-h-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <DataTable
          headers={[
            "Year", "Month", "Bill Before Solar", "Bill After Solar", "Monthly Savings", "Cumulative Savings", "ROI %"
          ]}
          data={paginatedData}
          minWidth="1000px"
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
          totalResults={filteredData.length}
          itemsPerPageOptions={[50, 100, 200]}
          renderRow={(item, idx) => (
            <tr key={idx} className="hover:bg-brand-navy/30 transition-colors border-b border-gray-100">
              <td className="px-4 py-3 text-center text-xs text-gray-600 whitespace-nowrap">{item.year}</td>
              <td className="px-4 py-3 text-center text-xs text-gray-900 font-bold whitespace-nowrap">{item.month}</td>
              <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium whitespace-nowrap">₹{item.before.toLocaleString()}</td>
              <td className="px-4 py-3 text-center text-xs text-brand-orange font-bold whitespace-nowrap">₹{item.after.toLocaleString()}</td>
              <td className="px-4 py-3 text-center text-xs text-brand-orange font-black whitespace-nowrap bg-brand-navy/20">₹{item.monthlySavings.toLocaleString()}</td>
              <td className="px-4 py-3 text-center text-xs text-brand-navy font-bold whitespace-nowrap">₹{item.cumulativeSavings.toLocaleString()}</td>
              <td className="px-4 py-3 text-center text-xs text-brand-navy/80 font-bold whitespace-nowrap">{item.roi}%</td>
            </tr>
          )}
          renderCard={(item, idx) => {
            const globalIdx = (currentPage - 1) * itemsPerPage + idx + 1;
            return (
              <div key={idx} className="bg-white rounded-xl border border-brand-navy/10 shadow-sm p-4 space-y-3 transition-all hover:shadow-md hover:border-brand-navy/10">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">
                      {globalIdx}
                    </span>
                    <span className="text-xs font-bold text-gray-900 uppercase truncate max-w-[150px]">{item.month} {item.year}</span>
                  </div>
                  <span className="bg-brand-navy/10 text-brand-navy px-2 py-0.5 rounded text-[8px] font-black uppercase">
                    ROI: {item.roi}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 rounded-lg p-2 border border-slate-100/50">
                  <div>
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Before Solar</span>
                    <span className="text-gray-700 font-medium line-through">₹{item.before.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">After Solar</span>
                    <span className="text-brand-orange font-bold">₹{item.after.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-slate-100 pt-2 text-[11px]">
                  <span className="text-gray-400 uppercase text-[8px]">Savings (Monthly / Cum)</span>
                  <span className="text-gray-700 font-medium">
                    <span className="text-brand-orange font-bold">₹{item.monthlySavings.toLocaleString()}</span> / <span className="text-brand-navy font-bold">₹{item.cumulativeSavings.toLocaleString()}</span>
                  </span>
                </div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}
