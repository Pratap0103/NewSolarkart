import React from 'react';
import { 
  Sun, 
  ArrowRightLeft, 
  Home, 
  BatteryMedium, 
  Zap, 
  Calendar, 
  Cpu, 
  BatteryCharging 
} from 'lucide-react';

export default function LivePowerUsage() {
  return (
    <div className="mt-8 mb-6 mx-2 sm:mx-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight">Live Power Usage</h2>
          <p className="text-[10px] text-slate-500 font-medium hidden sm:block">Real-time solar generation, home loads, battery storage, and net metering.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-600 shadow-sm">
          <Calendar size={14} className="text-slate-400" />
          <span className="hidden sm:inline">Last updated: Just now</span>
          <span className="sm:hidden">Just now</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Left Card: Live Energy Distribution Flow */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col h-full">
          <div className="mb-8">
            <h3 className="text-[10px] font-black text-slate-900 flex items-center gap-2 mb-1">
              <Cpu size={16} className="text-brand-navy/80" /> Live Energy Distribution Flow
            </h3>
            <p className="text-[10px] font-medium text-slate-500 hidden sm:block">Visualizing dynamic energy transfers between system nodes.</p>
          </div>
          
          <div className="relative flex-1 min-h-[220px] flex items-center justify-center">
            
            {/* Center Node */}
            <div className="absolute z-10 w-14 h-14 bg-brand-navy/10 border-2 border-brand-navy/30 rounded-full flex items-center justify-center shadow-lg shadow-blue-100">
              <Zap size={24} className="text-brand-navy/80" />
            </div>

            {/* Left Node (Solar) */}
            <div className="absolute left-0 sm:left-4 z-10 flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-brand-orange/10 border-2 border-brand-orange/30 rounded-full flex items-center justify-center">
                <Sun size={20} className="text-brand-orange/80" />
              </div>
              <span className="text-[9px] font-black text-brand-orange tracking-wide">Solar: 3.8 kW</span>
            </div>

            {/* Right Node (Home) */}
            <div className="absolute right-0 sm:right-4 z-10 flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-brand-orange/10 border-2 border-brand-orange/30 rounded-full flex items-center justify-center">
                <Home size={20} className="text-brand-orange" />
              </div>
              <span className="text-[9px] font-black text-brand-orange tracking-wide">Home: 2.1 kW</span>
            </div>

            {/* Top Node (Export) */}
            <div className="absolute top-0 z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-brand-navy/10 border-2 border-brand-navy/30 rounded-full flex items-center justify-center">
                <ArrowRightLeft size={16} className="text-brand-navy" />
              </div>
              <span className="text-[9px] font-black text-brand-navy tracking-wide">Export: 0.5 kW</span>
            </div>

            {/* Bottom Node (Battery) */}
            <div className="absolute bottom-0 z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-brand-navy/10 border-2 border-brand-navy/30 rounded-full flex items-center justify-center">
                <BatteryMedium size={16} className="text-brand-navy" />
              </div>
              <span className="text-[9px] font-black text-brand-navy tracking-wide">Battery (82%)</span>
            </div>

            {/* SVG Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <line x1="25%" y1="50%" x2="50%" y2="50%" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="75%" y2="50%" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="50%" y1="25%" x2="50%" y2="50%" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="50%" y2="75%" stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase">
              <span className="w-2 h-2 rounded-full bg-brand-orange/80"></span> Solar Input
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase">
              <span className="w-2 h-2 rounded-full bg-brand-orange/80"></span> Appliance Load
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase">
              <span className="w-2 h-2 rounded-full bg-brand-navy/80"></span> Battery Flow
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase">
              <span className="w-2 h-2 rounded-full bg-brand-navy/80"></span> Grid Interaction
            </div>
          </div>
        </div>

        {/* Right Card: Battery Storage Diagnostics */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col h-full">
          <div className="mb-4">
            <h3 className="text-[10px] font-black text-slate-900 flex items-center gap-2 mb-1">
              <BatteryCharging size={16} className="text-brand-navy" /> Battery Storage Diagnostics
            </h3>
            <p className="text-[10px] font-medium text-slate-500 hidden sm:block">Monitoring backup reserve, charge/discharge rates, and SOH.</p>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center py-6">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="10" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#2563EB" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.82)} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center mt-2">
                <span className="text-base font-black text-slate-900 leading-none">82%</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide mt-1">State of Charge</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-2 mt-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center pr-4">
              <span className="text-[10px] font-medium text-slate-500">Power Transfer:</span>
              <span className="text-[10px] font-black text-brand-navy">+1.20 kW</span>
            </div>
            <div className="flex justify-between items-center pl-4 border-l border-slate-100">
              <span className="text-[10px] font-medium text-slate-500">Battery Temp:</span>
              <span className="text-[10px] font-black text-slate-900">28.4°C</span>
            </div>
            <div className="flex justify-between items-center pr-4">
              <span className="text-[10px] font-medium text-slate-500">Battery Health:</span>
              <span className="text-[10px] font-black text-brand-orange">98.2% (SOH)</span>
            </div>
            <div className="flex justify-between items-center pl-4 border-l border-slate-100">
              <span className="text-[10px] font-medium text-slate-500">Voltage / Cell:</span>
              <span className="text-[10px] font-black text-slate-900">52.8 V</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
