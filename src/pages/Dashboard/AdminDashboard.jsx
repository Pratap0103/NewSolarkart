import React, { useState } from 'react';
import { 
  Users, 
  Zap, 
  TrendingUp, 
  Coins, 
  ShieldCheck, 
  Settings,
  ChevronRight,
  Activity,
  Award,
  Moon,
  Leaf,
  SunMedium,
  ArrowUpRight,
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  AreaChart, Area
} from 'recharts';

// Mock data for customer rankings with numeric values for calculation
const mockCustomers = [
  { id: 1, name: 'Rajesh Kumar', location: 'Pune, MH', capacity: 6.0, totalGen: 13232, status: 'Healthy', rank: 1, trend: '+15%', savings: 125000, co2: 8.5 },
  { id: 2, name: 'Priya Sharma', location: 'Mumbai, MH', capacity: 5.5, totalGen: 11500, status: 'Healthy', rank: 2, trend: '+12%', savings: 110000, co2: 7.2 },
  { id: 3, name: 'Amit Patel', location: 'Ahmedabad, GJ', capacity: 8.0, totalGen: 10840, status: 'Warning', rank: 3, trend: '-2%', savings: 95000, co2: 6.8 },
  { id: 4, name: 'Sneha Gupta', location: 'Delhi, DL', capacity: 4.5, totalGen: 9200, status: 'Healthy', rank: 4, trend: '+8%', savings: 85000, co2: 5.4 },
  { id: 5, name: 'Vikram Singh', location: 'Jaipur, RJ', capacity: 10.0, totalGen: 8450, status: 'Healthy', rank: 5, trend: '+5%', savings: 78000, co2: 5.1 },
  { id: 6, name: 'Ananya Reddy', location: 'Hyderabad, TS', capacity: 3.2, totalGen: 6100, status: 'Healthy', rank: 6, trend: '+10%', savings: 54000, co2: 4.2 },
  { id: 7, name: 'Rohan Desai', location: 'Surat, GJ', capacity: 7.5, totalGen: 5800, status: 'Offline', rank: 7, trend: '-15%', savings: 52000, co2: 3.9 },
  { id: 8, name: 'Kavita Menon', location: 'Kochi, KL', capacity: 5.0, totalGen: 5200, status: 'Healthy', rank: 8, trend: '+4%', savings: 48000, co2: 3.5 },
  { id: 9, name: 'Manoj Tiwari', location: 'Lucknow, UP', capacity: 6.5, totalGen: 4900, status: 'Warning', rank: 9, trend: '-1%', savings: 45000, co2: 3.1 },
  { id: 10, name: 'Deepak Verma', location: 'Noida, UP', capacity: 12.0, totalGen: 4600, status: 'Healthy', rank: 10, trend: '+22%', savings: 41000, co2: 2.9 },
  { id: 11, name: 'Sunita Rao', location: 'Bengaluru, KA', capacity: 4.0, totalGen: 4100, status: 'Healthy', rank: 11, trend: '+6%', savings: 38000, co2: 2.6 },
  { id: 12, name: 'Arjun Nair', location: 'Chennai, TN', capacity: 8.5, totalGen: 3800, status: 'Healthy', rank: 12, trend: '+3%', savings: 35000, co2: 2.3 }
];

const topGeneratorsData = [
  { name: 'Rajesh K.', generation: 1450, capacity: 6.0 },
  { name: 'Amit P.', generation: 1200, capacity: 8.0 },
  { name: 'Vikram S.', generation: 1180, capacity: 10.0 },
  { name: 'Deepak V.', generation: 1120, capacity: 12.0 },
  { name: 'Priya S.', generation: 1100, capacity: 5.5 },
];

const systemHealthData = [
  { name: 'Optimal', value: 890, color: '#10B981' }, 
  { name: 'Underperforming', value: 85, color: '#F59E0B' }, 
  { name: 'Offline', value: 25, color: '#EF4444' }, 
];

const capacityDistributionData = [
  { size: '2-4 kW', count: 210 },
  { size: '4-6 kW', count: 480 },
  { size: '6-8 kW', count: 195 },
  { size: '8-10 kW', count: 85 },
  { size: '>10 kW', count: 30 },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isSleepMode, setIsSleepMode] = useState(false);

  // Dynamic Calculations across all customers
  const totalCapacity = mockCustomers.reduce((acc, curr) => acc + curr.capacity, 0); // kWp
  const totalGen = mockCustomers.reduce((acc, curr) => acc + curr.totalGen, 0); // kWh
  const totalSavings = mockCustomers.reduce((acc, curr) => acc + curr.savings, 0); // ₹
  const totalCO2 = mockCustomers.reduce((acc, curr) => acc + curr.co2, 0); // Tons
  const activeCustomersCount = mockCustomers.length;

  // Fleet Gauge Data (Dynamic based on total capacity)
  const activeMW = isSleepMode ? 0.0 : (totalCapacity * 0.7); // Mocking active generation as 70% of capacity
  const capacityMW = totalCapacity;
  const percentFill = capacityMW > 0 ? (activeMW / capacityMW) * 100 : 0;
  
  // Circumference of ring = 2 * PI * r (r = 90) => ~565.48
  const strokeDashoffset = 565.48 - (565.48 * percentFill) / 100;

  return (
    <div className="p-4 md:p-6 space-y-6 flex flex-col h-full overflow-y-auto animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-brand-navy p-6 rounded-2xl text-white shadow-lg">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="text-brand-orange" />
            Fleet Analytics Dashboard
          </h1>
          <p className="text-brand-white/80 text-sm mt-1">
            Real-time telemetry, fleet performance ranking, and system analytics.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-md"
          >
            <Settings size={18} />
            System Settings
          </button>
        </div>
      </div>

      {/* Main Grid: Gauge + Stats */}
      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* --- CENTRAL GAUGE --- */}
        <div className="ola-gauge-card shrink-0 xl:w-1/3 w-full self-start">
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--gray-text)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Fleet Power Generation
              </span>
              <button 
                onClick={() => setIsSleepMode(!isSleepMode)}
                style={{ fontSize: '8px', padding: '2px 6px', borderRadius: '12px', background: isSleepMode ? 'var(--dark-blue)' : '#F1F5F9', color: isSleepMode ? 'var(--white)' : 'var(--gray-text)', border: 'none', cursor: 'pointer' }}
              >
                {isSleepMode ? 'Wake Up' : 'Test Night Mode'}
              </button>
            </div>
            <span style={{ fontSize: '9px', color: isSleepMode ? 'var(--gray-text)' : '#10B981', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isSleepMode ? 'var(--gray-text)' : '#10B981', display: 'inline-block', animation: isSleepMode ? 'none' : 'pulse-subtle 2s infinite alternate' }}></span>
              {isSleepMode ? 'Standby' : 'Synced'}
            </span>
          </div>

          <div className="gauge-wrapper">
            <svg className="gauge-svg" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#30329A" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="90" fill="none" stroke="#f1f5f9" strokeWidth="14" />
              <circle 
                cx="100" 
                cy="100" 
                r="90" 
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray="565.48"
                style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
              />
            </svg>
            
            <div className="gauge-readout">
              {isSleepMode ? <Moon size={22} style={{ color: 'var(--gray-text)', marginBottom: '2px' }} /> : <Zap size={22} style={{ color: '#F89B22', marginBottom: '2px' }} />}
              <span className="gauge-value" style={{ color: isSleepMode ? 'var(--gray-text)' : 'var(--dark-blue)' }}>{activeMW.toFixed(1)}</span>
              <span className="gauge-unit">Megawatts (MW)</span>
              <span className="gauge-status-badge" style={{ 
                background: isSleepMode ? '#F8FAFC' : '#EEF2FF', 
                color: isSleepMode ? '#64748B' : '#30329A', 
                borderColor: isSleepMode ? '#E2E8F0' : '#C7D2FE' 
              }}>
                {isSleepMode ? '🌙 Night Mode' : '☀️ Peak Prod'}
              </span>
            </div>
          </div>

          <div style={{ fontSize: '10px', color: 'var(--gray-text)', fontWeight: '600' }}>
            Total Installed Fleet Capacity: {capacityMW} MW
          </div>

          <div className="gauge-stats-row">
            <div className="gauge-stat-box" style={{ borderRight: '1px solid rgba(0, 82, 255, 0.08)' }}>
              <span className="gauge-stat-lbl">Today Fleet KWh</span>
              <span className="gauge-stat-val">{(activeMW * 4.5).toFixed(1)} MWh</span>
            </div>
            <div className="gauge-stat-box">
              <span className="gauge-stat-lbl">Active Customers</span>
              <span className="gauge-stat-val">{activeCustomersCount}</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE STATS --- */}
        <div className="flex-1 space-y-6">
          
          {/* OLA STYLE LIFETIME STATS (Aggregated) */}
          <div className="ola-container w-full" style={{ padding: '20px' }}>
            <h2 className="ola-title">Global Fleet Summary</h2>
            <div className="ola-subtitle">
              <span>Lifetime Statistics • Mar 2022 - May 2026</span>
            </div>

            <div className="ola-grid">
              <div className="ola-card ola-card-large bg-brand-navy/5 border-none">
                <div>
                  <div className="ola-label text-brand-navy">TOTAL FLEET YIELD <ChevronRight size={14} /></div>
                  <div className="ola-value text-brand-navy">{(totalGen / 1000).toFixed(1)} MWh</div>
                  <div style={{ fontSize: '9px', color: '#10B981', fontWeight: 'bold', marginTop: '6px' }}>☀️ Dynamically calculated</div>
                </div>
                <div className="ola-bar-chart opacity-70">
                  {[40, 60, 50, 70, 80, 50, 65, 80, 95, 75, 55, 60, 85, 100, 70, 60].map((val, i) => (
                    <div key={i} className="ola-bar-col">
                      <div className="ola-bar bg-brand-navy" style={{ height: `${val}%` }}></div>
                      <div className="ola-bar-base bg-brand-navy/20"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ola-card border-none bg-orange-50">
                <div className="ola-label text-orange-900">MONEY SAVED (ALL) <ChevronRight size={14} /></div>
                <div className="ola-value text-brand-orange">₹{(totalSavings / 100000).toFixed(2)} L</div>
                <div style={{ fontSize: '9px', color: '#10B981', fontWeight: 'bold', marginTop: '8px' }}>Calculated total</div>
              </div>

              <div className="ola-card border-none bg-green-50">
                <div className="ola-label text-green-900">CO2 AVOIDED <ChevronRight size={14} /></div>
                <div className="ola-value text-green-700">{totalCO2.toFixed(1)} Tons</div>
                <div style={{ fontSize: '9px', color: '#30329A', fontWeight: 'bold', marginTop: '8px' }}>🌲 {(totalCO2 * 28).toFixed(0)} trees planted</div>
              </div>
            </div>
          </div>

          {/* MONTHLY COMPARISON */}
          <div className="card" style={{ border: '1px solid #E2E8F0', background: '#F8FAFC', padding: '20px' }}>
            <div className="card-header" style={{ marginBottom: '16px' }}>
              <h3 className="card-title flex items-center gap-2 text-brand-navy"><TrendingUp size={18} className="text-brand-orange" /> Fleet Monthly Performance</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div style={{ background: '#FFF', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '9px', color: 'var(--gray-text)', textTransform: 'uppercase', fontWeight: '800', marginBottom: '8px' }}>Power Generated (Fleet)</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                  <div>
                    <div style={{ fontSize: '17px', fontWeight: '800', color: '#10B981' }}>425 <span style={{ fontSize: '10px' }}>MWh</span></div>
                  </div>
                  <div style={{ paddingBottom: '4px' }}>
                    <span style={{ fontSize: '10px', color: '#10B981', fontWeight: 'bold' }}>+12% ⬆️</span>
                  </div>
                </div>
                <div style={{ fontSize: '9px', color: '#94A3B8', marginTop: '8px' }}>Last Month: 380 MWh</div>
              </div>

              <div style={{ background: '#FFF', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '9px', color: 'var(--gray-text)', textTransform: 'uppercase', fontWeight: '800', marginBottom: '8px' }}>Total Grid Export</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                  <div>
                    <div style={{ fontSize: '17px', fontWeight: '800', color: '#30329A' }}>115 <span style={{ fontSize: '10px' }}>MWh</span></div>
                  </div>
                  <div style={{ paddingBottom: '4px' }}>
                    <span style={{ fontSize: '10px', color: '#10B981', fontWeight: 'bold' }}>+8% ⬆️</span>
                  </div>
                </div>
                <div style={{ fontSize: '9px', color: '#94A3B8', marginTop: '8px' }}>Last Month: 106 MWh</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- FLEET ANALYTICS CHARTS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 mx-2 sm:mx-0">
        
        {/* Top Generators Chart */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm col-span-1 lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Zap size={18} className="text-brand-orange" /> Top Generating Customers (MTD)
          </h2>
          <p className="text-xs text-gray-500 mb-6">Comparing total kWh generation against installed capacity.</p>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topGeneratorsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B', fontWeight: 'bold' }} />
                <YAxis yAxisId="left" orientation="left" stroke="#30329A" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" stroke="#F89B22" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" />
                <Bar yAxisId="left" dataKey="generation" name="Total Generation (kWh)" fill="#30329A" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="capacity" name="System Capacity (kWp)" fill="#F89B22" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Health Pie Chart */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Activity size={18} className="text-brand-orange" /> Global System Health
          </h2>
          <p className="text-xs text-gray-500 mb-2">Current telemetry status across 1,024 active installations.</p>
          
          <div className="h-64 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={systemHealthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {systemHealthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value, name) => [`${value} Systems`, name]}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Custom Legend */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              {systemHealthData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <div>
                    <p className="text-xs font-bold text-gray-700">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.value} systems</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Capacity Distribution */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Users size={18} className="text-brand-orange" /> Fleet Capacity Distribution
          </h2>
          <p className="text-xs text-gray-500 mb-6">Distribution of installed plant sizes across the customer base.</p>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={capacityDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#30329A" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#30329A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="size" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="count" name="Total Installations" stroke="#30329A" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* --- CUSTOMER SUMMARY TABLE --- */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mt-6 flex flex-col mx-2 sm:mx-0" style={{ minHeight: '400px' }}>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Users className="text-brand-orange" /> 
            All Customer Summary Records
          </h2>
          <button className="text-sm font-bold text-brand-navy hover:text-brand-orange transition-colors flex items-center gap-1">
            Export <Download size={14} />
          </button>
        </div>
        
        <DataTable
          headers={["Rank", "Customer Name", "Location", "System Capacity", "Total Gen (kWh)", "Status", "Actions"]}
          data={mockCustomers}
          minWidth="1000px"
          currentPage={1}
          totalPages={1}
          itemsPerPage={10}
          onPageChange={() => {}}
          onItemsPerPageChange={() => {}}
          totalResults={mockCustomers.length}
          itemsPerPageOptions={[10, 20, 50]}
          renderRow={(customer, idx) => (
            <tr key={customer.id} className="hover:bg-brand-navy/5 transition-colors border-b border-gray-100">
              <td className="px-4 py-3 text-center">
                <div className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  customer.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                  customer.rank === 2 ? 'bg-gray-200 text-gray-700' :
                  customer.rank === 3 ? 'bg-orange-100 text-orange-700' :
                  'bg-brand-navy/10 text-brand-navy'
                }`}>
                  #{customer.rank}
                </div>
              </td>
              <td className="px-4 py-3 font-bold text-gray-900 text-center">{customer.name}</td>
              <td className="px-4 py-3 text-gray-600 text-sm text-center">{customer.location}</td>
              <td className="px-4 py-3 text-brand-navy font-semibold text-sm text-center">{customer.capacity} kWp</td>
              <td className="px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="font-bold text-brand-navy">{customer.totalGen.toLocaleString()}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    customer.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {customer.trend}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-center">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  customer.status === 'Healthy' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                }`}>
                  {customer.status}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <button className="p-1.5 bg-gray-50 hover:bg-brand-navy/10 text-brand-navy rounded-lg transition-colors border border-gray-200 text-xs font-bold px-3">
                  View
                </button>
              </td>
            </tr>
          )}
          renderCard={(customer, idx) => (
            <div key={customer.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                    customer.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    customer.rank === 2 ? 'bg-gray-200 text-gray-700' :
                    customer.rank === 3 ? 'bg-orange-100 text-orange-700' :
                    'bg-brand-navy/10 text-brand-navy'
                  }`}>
                    #{customer.rank}
                  </div>
                  <span className="text-sm font-black text-brand-navy truncate">{customer.name}</span>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  customer.status === 'Healthy' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                }`}>
                  {customer.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 rounded-lg p-2 border border-slate-100/50">
                <div className="flex flex-col">
                  <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Capacity & Location</span>
                  <span className="font-semibold text-gray-700">{customer.capacity} kWp • {customer.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 block uppercase text-[8px] tracking-tight">Total Generation</span>
                  <span className="font-semibold text-brand-navy flex items-center gap-1">
                    {customer.totalGen.toLocaleString()} 
                    <span className={`text-[8px] px-1 rounded ${customer.trend.startsWith('+') ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>{customer.trend}</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        />
      </div>
      
    </div>
  );
}
