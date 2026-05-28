import React, { useState } from 'react';
import { Activity, ShieldAlert, Cpu, Layers, CheckCircle, AlertTriangle, Zap, BatteryCharging, Sun, FileWarning, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/DataTable';

export default function PlantHealth() {
  const [selectedComp, setSelectedComp] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [plantHealth, setPlantHealth] = useState({
    alerts: 1,
    inverterStatus: 'Fault Detected',
    batteryStatus: 'Charging Normal',
    panelStatus: 'Optimal (Clean)',
    overallEfficiency: '84.2%',
    components: Array.from({ length: 40 }).map((_, i) => ({
      component: i % 4 === 0 ? `String Inverter #${Math.floor(i/4)+1}` : (i % 4 === 1 ? `Battery Bank #${Math.floor(i/4)+1}` : (i % 4 === 2 ? `Solar Array #${Math.floor(i/4)+1}` : `Smart Meter #${Math.floor(i/4)+1}`)),
      status: i === 0 ? 'Warning' : (i % 7 === 0 ? 'Suboptimal' : 'Healthy'),
      efficiency: i === 0 ? '42.0' : (99.5 - (i%15)).toFixed(1),
      lastChecked: `12 Nov 2024, 09:${i%60 < 10 ? '0'+(i%60) : i%60} AM`,
      alert: i === 0 ? 'Fault 402: AC SPD blow-out' : (i % 7 === 0 ? 'Minor voltage dip' : 'None')
    }))
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  const filteredComps = plantHealth.components.filter(comp => 
    comp.component.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comp.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredComps.length / itemsPerPage);
  const paginatedData = filteredComps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleViewDetails = (comp) => {
    setSelectedComp(comp);
    setShowDetails(true);
  };

  const handleCreateTicket = (compName) => {
    toast.success(`Service ticket raised for ${compName}`);
    setShowDetails(false);
  };

  return (
    <div className="p-0 sm:p-2 md:p-6 space-y-2 md:space-y-6 flex flex-col h-full min-h-0 overflow-y-auto">
      
      {/* Alert Warning banner if offline/abnormal is detected */}
      {plantHealth.alerts > 0 && (
        <div className="bg-red-500 text-white p-4 rounded-xl shadow-md flex items-start gap-4 shrink-0 animate-in fade-in duration-300">
          <div className="bg-white/20 p-2 rounded-full shrink-0">
            <ShieldAlert size={24} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-black uppercase tracking-wider mb-0.5">Active Diagnostic Fault Detected</h4>
            <span className="text-xs text-red-50">Inverter report fault code 402: AC SPD blow-out. Please schedule support visit immediately to prevent data loss or power interruption.</span>
          </div>
          <button onClick={() => handleCreateTicket('System Overview')} className="hidden sm:block px-4 py-2 bg-white text-red-600 font-bold text-xs rounded-lg shadow-sm hover:bg-red-50 transition-colors whitespace-nowrap">
            Resolve Now
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-1 sm:gap-4 px-2 sm:px-0 shrink-0">
        <div className="bg-white rounded-lg sm:rounded-2xl p-1 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center sm:items-start justify-center sm:justify-between gap-0.5 sm:gap-2 relative overflow-hidden group hover:shadow-md transition-shadow text-center sm:text-left">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-red-50 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 z-10 text-slate-500 w-full justify-center sm:justify-start">
            <Zap size={14} className="text-red-500 hidden sm:block" />
            <span className="text-[4px] sm:text-xs font-bold uppercase tracking-wider leading-none sm:leading-tight">Inverter</span>
          </div>
          <div className="z-10 mt-0.5 sm:mt-1 w-full">
            <span className="text-[5px] sm:text-xl font-black text-red-600 block tracking-tighter truncate leading-tight sm:leading-normal">{plantHealth.inverterStatus}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-2xl p-1 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center sm:items-start justify-center sm:justify-between gap-0.5 sm:gap-2 relative overflow-hidden group hover:shadow-md transition-shadow text-center sm:text-left">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-brand-navy/10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 z-10 text-slate-500 w-full justify-center sm:justify-start">
            <BatteryCharging size={14} className="text-brand-navy/80 hidden sm:block" />
            <span className="text-[4px] sm:text-xs font-bold uppercase tracking-wider leading-none sm:leading-tight">Battery</span>
          </div>
          <div className="z-10 mt-0.5 sm:mt-1 w-full">
            <span className="text-[5px] sm:text-xl font-black text-gray-900 block tracking-tighter truncate leading-tight sm:leading-normal">{plantHealth.batteryStatus}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-2xl p-1 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center sm:items-start justify-center sm:justify-between gap-0.5 sm:gap-2 relative overflow-hidden group hover:shadow-md transition-shadow text-center sm:text-left">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-brand-orange/10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 z-10 text-slate-500 w-full justify-center sm:justify-start">
            <Sun size={14} className="text-brand-orange/80 hidden sm:block" />
            <span className="text-[4px] sm:text-xs font-bold uppercase tracking-wider leading-none sm:leading-tight">Panel</span>
          </div>
          <div className="z-10 mt-0.5 sm:mt-1 w-full">
            <span className="text-[5px] sm:text-xl font-black text-gray-900 block tracking-tighter truncate leading-tight sm:leading-normal">{plantHealth.panelStatus}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-2xl p-1 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center sm:items-start justify-center sm:justify-between gap-0.5 sm:gap-2 relative overflow-hidden group hover:shadow-md transition-shadow text-center sm:text-left">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-brand-orange/10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 z-10 text-slate-500 w-full justify-center sm:justify-start">
            <FileWarning size={14} className="text-brand-orange/80 hidden sm:block" />
            <span className="text-[4px] sm:text-xs font-bold uppercase tracking-wider leading-none sm:leading-tight">Faults</span>
          </div>
          <div className="z-10 mt-0.5 sm:mt-1 w-full">
            <span className="text-[6px] sm:text-2xl font-black text-gray-900 block tracking-tighter">{plantHealth.alerts}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-2xl p-1 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center sm:items-start justify-center sm:justify-between gap-0.5 sm:gap-2 relative overflow-hidden group hover:shadow-md transition-shadow text-center sm:text-left">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-brand-orange/10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 z-10 text-slate-500 w-full justify-center sm:justify-start">
            <Activity size={14} className="text-brand-orange/80 hidden sm:block" />
            <span className="text-[4px] sm:text-xs font-bold uppercase tracking-wider leading-none sm:leading-tight">Efficiency</span>
          </div>
          <div className="z-10 mt-0.5 sm:mt-1 w-full">
            <span className="text-[6px] sm:text-2xl font-black text-gray-900 block tracking-tighter">{plantHealth.overallEfficiency}</span>
          </div>
        </div>
      </div>

      {/* Table Toolbar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-4 w-full px-2 sm:px-0 mt-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Cpu className="text-brand-navy" /> Hardware Diagnostic Panel
          </h3>
        </div>
        <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-2 lg:gap-3 items-center">
          <div className="flex items-center gap-2 w-full lg:w-auto lg:flex-[1.5]">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-2.5 top-[9px] lg:top-[11px] text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:border-brand-navy/80 text-xs md:text-sm h-[32px] md:h-[38px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 min-h-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col mt-2">
        <DataTable
          headers={["Component", "Status", "Efficiency %", "Last Checked", "System Alert", "Action"]}
          data={paginatedData}
          minWidth="1000px"
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(val) => { setItemsPerPage(val); setCurrentPage(1); }}
          totalResults={filteredComps.length}
          itemsPerPageOptions={[50, 100, 200]}
          renderRow={(comp, idx) => (
            <tr key={idx} className="hover:bg-brand-navy/30 transition-colors border-b border-gray-100">
              <td className="px-4 py-3 text-sm font-bold text-gray-900 text-center whitespace-nowrap">{comp.component}</td>
              <td className="px-4 py-3 text-center">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  comp.status === 'Healthy' ? 'bg-brand-orange/10 text-brand-orange' : 
                  comp.status === 'Warning' ? 'bg-red-100 text-red-800' : 'bg-brand-orange/10 text-brand-orange'
                }`}>
                  {comp.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm font-black text-gray-900 text-center">{comp.efficiency}%</td>
              <td className="px-4 py-3 text-sm text-gray-500 text-center whitespace-nowrap">{comp.lastChecked}</td>
              <td className={`px-4 py-3 text-sm font-semibold text-center ${comp.alert !== 'None' ? 'text-red-600' : 'text-gray-400'}`}>
                {comp.alert}
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-2">
                  <button onClick={() => handleViewDetails(comp)} className="px-3 py-1.5 bg-gray-50 hover:bg-brand-navy/10 text-gray-700 hover:text-brand-navy rounded-lg text-xs font-bold transition-colors border border-gray-200 whitespace-nowrap">
                    View
                  </button>
                  {comp.alert !== 'None' && (
                    <button onClick={() => handleCreateTicket(comp.component)} className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-bold transition-colors border border-red-200 whitespace-nowrap">
                      Ticket
                    </button>
                  )}
                </div>
              </td>
            </tr>
          )}
          renderCard={(comp, idx) => {
            const globalIdx = (currentPage - 1) * itemsPerPage + idx + 1;
            return (
              <div key={idx} className={`bg-white rounded-xl border ${comp.status === 'Warning' ? 'border-red-200 bg-red-50/10' : 'border-brand-navy/10'} shadow-sm p-4 space-y-3 transition-all hover:shadow-md hover:border-brand-navy/10`}>
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">
                      {globalIdx}
                    </span>
                    <span className="text-sm font-black text-brand-navy truncate max-w-[150px]">{comp.component}</span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    comp.status === 'Healthy' ? 'bg-brand-orange/10 text-brand-orange' : 
                    comp.status === 'Warning' ? 'bg-red-100 text-red-800' : 'bg-brand-orange/10 text-brand-orange'
                  }`}>
                    {comp.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 rounded-lg p-2 border border-slate-100/50">
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Efficiency</span>
                    <span className="font-semibold text-gray-700">{comp.efficiency}%</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Last Checked</span>
                    <span className="font-semibold text-gray-700">{comp.lastChecked.split(',')[1]}</span>
                  </div>
                  {comp.alert !== 'None' && (
                    <div className="col-span-2 flex flex-col mt-1">
                      <span className="text-red-400 block uppercase text-[8px] tracking-tight">System Alert</span>
                      <span className="font-semibold text-red-600">{comp.alert}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 pt-2 border-t border-slate-100 mt-1">
                  <button onClick={() => handleViewDetails(comp)} className="flex-1 flex justify-center items-center py-1.5 bg-brand-navy/10 text-brand-navy rounded-lg text-xs font-bold">
                    View Data
                  </button>
                  {comp.alert !== 'None' && (
                    <button onClick={() => handleCreateTicket(comp.component)} className="flex-1 flex justify-center items-center py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-bold">
                      Raise Ticket
                    </button>
                  )}
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* COMPONENT DIAGNOSTIC DETAILS MODAL */}
      {showDetails && selectedComp && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 md:p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Layers className="text-brand-navy" /> Diagnostics Log
              </h3>
              <button onClick={() => setShowDetails(false)} className="text-gray-400 hover:text-gray-600 p-1">
                ✕
              </button>
            </div>
            
            <div className="p-4 md:p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-0.5">Component Name</div>
                  <div className="font-bold text-gray-900">{selectedComp.component}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-0.5">Hardware Status</div>
                  <div className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    selectedComp.status === 'Healthy' ? 'bg-brand-orange/10 text-brand-orange' : 
                    selectedComp.status === 'Warning' ? 'bg-red-100 text-red-800' : 'bg-brand-orange/10 text-brand-orange'
                  }`}>
                    {selectedComp.status}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-0.5">Conversion Efficiency</div>
                  <div className="font-black text-gray-900">{selectedComp.efficiency}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-0.5">Last Sync Time</div>
                  <div className="font-semibold text-gray-800">{selectedComp.lastChecked}</div>
                </div>
                {selectedComp.alert !== 'None' && (
                  <div className="col-span-2">
                    <div className="text-xs text-red-500 font-bold mb-0.5 flex items-center gap-1"><AlertTriangle size={12}/> Critical Alert</div>
                    <div className="font-bold text-red-700">{selectedComp.alert}</div>
                  </div>
                )}
              </div>

              <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 mt-2 font-mono text-xs text-slate-300 shadow-inner">
                <div className="text-brand-orange/80 font-bold mb-2 uppercase tracking-wider">Raw Diagnostics Streams:</div>
                <div className="flex flex-col gap-1.5 opacity-90">
                  <div className="flex justify-between"><span>Output Voltage:</span> <span className="font-bold text-white">232.4 V</span></div>
                  <div className="flex justify-between"><span>Core Temperature:</span> <span className="font-bold text-white">42.1°C</span></div>
                  <div className="flex justify-between"><span>Wireless Gateway:</span> <span className="font-bold text-brand-orange/80">ACTIVE</span></div>
                  <div className="flex justify-between"><span>Firmware Version:</span> <span className="font-bold text-white">v2.4.1</span></div>
                  <div className="flex justify-between border-t border-slate-700 pt-1.5 mt-1"><span>Packet Loss:</span> <span className="font-bold text-white">0.01%</span></div>
                </div>
              </div>

              <div className="flex gap-3 pt-2 mt-2">
                {selectedComp.alert !== 'None' && (
                  <button onClick={() => handleCreateTicket(selectedComp.component)} className="flex-[1.5] px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-md shadow-red-200 transition-all flex justify-center items-center gap-2">
                    <ShieldAlert size={16} /> Create Service Ticket
                  </button>
                )}
                <button onClick={() => setShowDetails(false)} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold transition-colors">
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
