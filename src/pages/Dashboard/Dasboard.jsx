import React, { useState } from 'react';
import { 
  Sun, 
  Moon,
  Zap,
  Leaf,
  PlugZap,
  FileText,
  Bell,
  SunMedium,
  Sparkles,
  CloudSun,
  ShieldCheck,
  Lock,
  BatteryCharging,
  Info,
  ChevronRight,
  ArrowRight,
  Share2,
  Activity
} from 'lucide-react';
import Usage from './Usage';
import LivePowerUsage from './LivePowerUsage';
import { useNavigate } from 'react-router-dom';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Area, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip,
  ReferenceDot
} from 'recharts';

const dailyData = [
  { time: '6 AM', today: 0.1, yesterday: 0.2 },
  { time: '8 AM', today: 1.5, yesterday: 1.8 },
  { time: '10 AM', today: 3.8, yesterday: 4.2 },
  { time: '12 PM', today: 5.5, yesterday: 5.8 },
  { time: '2 PM', today: 4.8, yesterday: 6.0 },
  { time: '4 PM', today: null, yesterday: 3.2 },
  { time: '6 PM', today: null, yesterday: 0.5 },
];

export default function Dasboard({
  profile = { plantCapacity: '6.0 kWp', plantType: 'On-Grid' },
  amc,
  onNavigateTab = () => {},
  onNavigateMorePage = () => {},
  onTriggerModal = () => {},
  currentUser = { name: 'User' },
  usage = {},
  lastCleanedDate = '12 May 2026',
  nextCleanedDate = '12 Jun 2026'
}) {
  const [isSleepMode, setIsSleepMode] = useState(false);
  const navigate = useNavigate();

  // If onNavigateMorePage isn't provided or we want real routing:
  const handleNavigate = (path) => {
    if (path === 'plant_health') navigate('/plantHealth');
    else if (path === 'care_panel') navigate('/amcManagement');
    else if (path === 'referrals') navigate('/referrals');
    else if (path === 'analytics') navigate('/mySolarHistory');
    else onNavigateMorePage(path);
  };

  // Peak Active Generation is 3.8 kW out of 6.0 kWp capacity
  const activeKW = isSleepMode ? 0.0 : 3.8;
  const capacityKW = 6.0;
  const percentFill = (activeKW / capacityKW) * 100;
  
  // Circumference of ring = 2 * PI * r (r = 90) => ~565.48
  const strokeDashoffset = 565.48 - (565.48 * percentFill) / 100;

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }} className="p-0 sm:p-2 md:p-6 space-y-4 md:space-y-6 flex flex-col h-full min-h-0 overflow-y-auto pb-20">
      
      {/* Central Solar Power Ring Gauge - Ola Electric Style */}
      <div className="ola-gauge-card mx-2 sm:mx-0 mt-2 sm:mt-0 shrink-0">
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--gray-text)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              <span className="hidden sm:inline">Power Being Made Right Now</span>
              <span className="sm:hidden">Current Power</span>
            </span>
            <button 
              onClick={() => setIsSleepMode(!isSleepMode)}
              style={{ fontSize: '8px', padding: '2px 6px', borderRadius: '12px', background: isSleepMode ? 'var(--dark-blue)' : '#F1F5F9', color: isSleepMode ? 'var(--white)' : 'var(--gray-text)', border: 'none', cursor: 'pointer' }}
            >
              {isSleepMode ? 'Wake Up' : 'Test Sleep'}
            </button>
          </div>
          <span style={{ fontSize: '9px', color: isSleepMode ? 'var(--gray-text)' : '#10B981', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isSleepMode ? 'var(--gray-text)' : '#10B981', display: 'inline-block', animation: isSleepMode ? 'none' : 'pulse-subtle 2s infinite alternate' }}></span>
            <span className="hidden sm:inline">{isSleepMode ? 'Standby Night Mode' : 'Grid Synced'}</span>
            <span className="sm:hidden">{isSleepMode ? 'Standby' : 'Synced'}</span>
          </span>
        </div>

        <div className="gauge-wrapper">
          <svg className="gauge-svg" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
            {/* Background Track */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="#f1f5f9" strokeWidth="14" />
            {/* Animated Active Fill */}
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
            {isSleepMode ? <Moon size={22} style={{ color: 'var(--gray-text)', marginBottom: '2px' }} /> : <Zap size={22} style={{ color: 'var(--sky-blue)', marginBottom: '2px' }} />}
            <span className="gauge-value" style={{ color: isSleepMode ? 'var(--gray-text)' : 'var(--dark-blue)' }}>{activeKW.toFixed(1)}</span>
            <span className="gauge-unit">{isSleepMode ? 'Standby kW' : 'Active kW'}</span>
            <span className="gauge-status-badge" style={{ 
              background: isSleepMode ? '#F8FAFC' : '#EEF2FF', 
              color: isSleepMode ? '#64748B' : '#4338ca', 
              borderColor: isSleepMode ? '#E2E8F0' : '#C7D2FE' 
            }}>
              {isSleepMode ? '🌙 Sleep Mode' : '☀️ Peak Prod'}
            </span>
          </div>
        </div>

        <div style={{ fontSize: '10px', color: 'var(--gray-text)', fontWeight: '600' }}>
          System Capacity: {profile.plantCapacity} ({profile.plantType})
        </div>

        {/* Quick Grid inside Central Widget */}
        <div className="gauge-stats-row">
          <div className="gauge-stat-box" style={{ borderRight: '1px solid rgba(0, 82, 255, 0.08)' }}>
            <span className="gauge-stat-lbl">Today KWh</span>
            <span className="gauge-stat-val">22.4 kWh</span>
          </div>
          <div className="gauge-stat-box">
            <span className="gauge-stat-lbl">Money Saved</span>
            <span className="gauge-stat-val">₹1.92 Lakhs</span>
          </div>
        </div>
      </div>

      <LivePowerUsage />

      {/* --- INTEGRATED USAGE (MY HOME POWER) OVERVIEW --- */}
      <div className="px-2 sm:px-0">
        <Usage usage={usage} profile={profile} />
      </div>

      {/* Grid: Health & Maintenance */}
      <div className="stats-row stack-mobile px-2 sm:px-0">
        {/* System Diagnostics */}
        <div className="card" style={{ marginBottom: '0', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: '280px', flex: '1 0 auto' }}>
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BatteryCharging size={16} style={{ color: 'var(--primary-green)' }} /> My Equipment Health
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: 'var(--gray-text)', fontWeight: '500' }}>Smart Inverter</span>
                <span style={{ color: 'var(--success)', fontWeight: '800' }}>Healthy (96.5%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: 'var(--gray-text)', fontWeight: '500' }}>Solar Panels (10x)</span>
                <span style={{ color: 'var(--success)', fontWeight: '800' }}>Healthy (98.2%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--gray-text)', fontWeight: '500' }}>Battery storage</span>
                <span style={{ color: 'var(--success)', fontWeight: '800' }}>Healthy (95.0%)</span>
              </div>
            </div>
          </div>
          <span 
            onClick={() => handleNavigate('plant_health')}
            style={{ fontSize: '9px', color: 'var(--primary-green)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '14px', cursor: 'pointer' }}
          >
            Check My Equipment <ChevronRight size={12} />
          </span>
        </div>

        {/* Maintenance Scheduler Summary */}
        <div className="card" style={{ marginBottom: '0', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: '280px', flex: '1 0 auto' }}>
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} style={{ color: 'var(--primary-green)' }} /> My Service Schedule
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: 'var(--gray-text)', fontWeight: '500' }}>Last Panel Cleaning</span>
                <span style={{ fontWeight: '800', color: 'var(--dark-blue)' }}>{lastCleanedDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: 'var(--gray-text)', fontWeight: '500' }}>Next Cleaning Due</span>
                <span style={{ color: 'var(--warning)', fontWeight: '800' }}>{nextCleanedDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--gray-text)', fontWeight: '500' }}>Next Technical Service</span>
                <span style={{ color: 'var(--primary-green)', fontWeight: '800' }}>June 10, 2026</span>
              </div>
            </div>
          </div>
          <span 
            onClick={() => handleNavigate('care_panel')}
            style={{ fontSize: '9px', color: 'var(--primary-green)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '14px', cursor: 'pointer' }}
          >
            Maintenance Tips <ChevronRight size={12} />
          </span>
        </div>
      </div>

      {/* --- MONTH-OVER-MONTH COMPARISON --- */}
      <div className="card mx-2 sm:mx-0" style={{ border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
        <div className="card-header" style={{ marginBottom: '16px' }}>
          <h3 className="card-title flex items-center gap-2" style={{ color: 'var(--dark-blue)' }}><Activity size={18} style={{ color: 'var(--primary-green)' }} /> Your Monthly Performance</h3>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div style={{ background: '#FFF', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '9px', color: 'var(--gray-text)', textTransform: 'uppercase', fontWeight: '800', marginBottom: '8px' }}>Power Made</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <div>
                <div style={{ fontSize: '9px', color: 'var(--gray-text)' }}>This Month</div>
                <div style={{ fontSize: '17px', fontWeight: '800', color: 'var(--primary-green)' }}>572 <span style={{ fontSize: '10px' }}>kWh</span></div>
              </div>
              <div style={{ paddingBottom: '4px' }}>
                <span style={{ fontSize: '10px', color: '#10B981', fontWeight: 'bold' }}>+15% ⬆️</span>
              </div>
            </div>
            <div style={{ fontSize: '9px', color: '#94A3B8', marginTop: '8px' }}>Last Month: 498 kWh</div>
          </div>

          <div style={{ background: '#FFF', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '9px', color: 'var(--gray-text)', textTransform: 'uppercase', fontWeight: '800', marginBottom: '8px' }}>Power Used</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <div>
                <div style={{ fontSize: '9px', color: 'var(--gray-text)' }}>This Month</div>
                <div style={{ fontSize: '17px', fontWeight: '800', color: '#4f46e5' }}>412 <span style={{ fontSize: '10px' }}>kWh</span></div>
              </div>
              <div style={{ paddingBottom: '4px' }}>
                <span style={{ fontSize: '10px', color: '#10B981', fontWeight: 'bold' }}>-5% ⬇️</span>
              </div>
            </div>
            <div style={{ fontSize: '9px', color: '#94A3B8', marginTop: '8px' }}>Last Month: 435 kWh</div>
          </div>
        </div>
        <p className="hidden sm:block" style={{ fontSize: '11px', color: '#475569', background: '#ECFDF5', padding: '10px', borderRadius: '8px', border: '1px solid #D1FAE5' }}>
          <strong>Great job!</strong> You generated more power this month because of sunnier days, and your home used less power. You have extra power to sell back to the grid!
        </p>
      </div>

      {/* --- HOW YOUR BILL IS REDUCED --- */}
      <div className="card mx-2 sm:mx-0">
        <div className="card-header flex items-center justify-between" style={{ marginBottom: '16px' }}>
          <h3 className="card-title flex items-center gap-2 m-0" style={{ color: 'var(--dark-blue)' }}><FileText size={18} style={{ color: '#4f46e5' }} /> How Your Bill Is Reduced</h3>
          <span className="badge" style={{ background: '#E0F2FE', color: '#4338ca', padding: '4px 8px', borderRadius: '12px', fontSize: '9px', fontWeight: 'bold' }}>Simple Math</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#F8FAFC', padding: '16px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--gray-text)', fontWeight: '600' }}>☀️ Power Sent to Grid <span className="hidden sm:inline">(Day)</span></span>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary-green)' }}>+300 Units</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--gray-text)', fontWeight: '600' }}>🌙 Power Taken from Grid <span className="hidden sm:inline">(Night)</span></span>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#EF4444' }}>-150 Units</span>
          </div>
          <div style={{ height: '1px', background: '#CBD5E1', margin: '4px 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--dark-blue)', fontWeight: '800' }}>Total Billed Units</span>
            <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--dark-blue)' }}>0 Units</span>
          </div>
        </div>

        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1, background: '#F8FAFC', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', color: '#94A3B8', fontWeight: '800', textTransform: 'uppercase' }}>LAST MONTH (APR)</div>
            <div style={{ fontSize: '15px', fontWeight: '900', color: '#64748B', marginTop: '4px' }}>₹1,400</div>
            <div style={{ fontSize: '9px', color: 'var(--primary-green)', fontWeight: 'bold', marginTop: '2px' }}>Saved ₹7,800</div>
          </div>
          <div style={{ flex: 1, background: '#F0FDF4', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid #BBF7D0' }}>
            <div style={{ fontSize: '9px', color: '#166534', fontWeight: '800', textTransform: 'uppercase' }}>THIS MONTH (MAY)</div>
            <div style={{ fontSize: '19px', fontWeight: '900', color: 'var(--primary-green)', marginTop: '4px' }}>₹1,200</div>
            <div style={{ fontSize: '9px', color: 'var(--primary-green)', fontWeight: 'bold', marginTop: '2px' }}>Saved ₹7,300</div>
          </div>
        </div>
      </div>

      {/* --- REVAMPED REWARDS BANNER --- */}
      <div className="card mx-2 sm:mx-0" style={{ background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)', border: '1px solid #BAE6FD' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '900', color: '#3730a3', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
              <SunMedium size={20} fill="#818cf8" color="#3730a3" /> My Solar Rewards
            </h3>
            <p className="hidden sm:block" style={{ fontSize: '10px', color: '#4338ca', marginTop: '4px', maxWidth: '200px' }}>Earn coins by referring friends or hitting generation milestones!</p>
          </div>
          <div style={{ background: '#FFF', padding: '8px 12px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', fontWeight: 'bold', color: 'var(--gray-text)', textTransform: 'uppercase' }}>Balance</div>
            <div style={{ fontSize: '19px', fontWeight: '900', color: '#4338ca' }}>450 🪙</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
          <button 
            onClick={() => handleNavigate('referrals')}
            style={{ flex: 1, padding: '12px', background: '#4338ca', color: '#FFF', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
          >
            Redeem Rewards <ChevronRight size={14} />
          </button>
          <button 
            onClick={() => handleNavigate('referrals')}
            style={{ flex: 1, padding: '12px', background: '#FFF', color: '#4338ca', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Earn More
          </button>
        </div>
      </div>

      {/* --- OLA STYLE PERFORMANCE UI SECTION --- */}
      <div className="ola-container mx-2 sm:mx-0">
        <h2 className="ola-title">My Solar Summary</h2>
        <div className="ola-subtitle">
          <span className="hidden sm:inline">Lifetime Statistics • Mar 2024 - May 2026</span>
          <span className="sm:hidden">Lifetime Stats</span>
        </div>

        <div className="ola-grid">
          {/* TOTAL YIELD CARD (Large) */}
          <div className="ola-card ola-card-large">
            <div>
              <div className="ola-label">TOTAL YIELD <ChevronRight size={14} /></div>
              <div className="ola-value">13,232 kWh</div>
              <div style={{ fontSize: '9px', color: '#10B981', fontWeight: 'bold', marginTop: '6px' }}>☀️ Avg. 15 kWh / day</div>
            </div>
            
            <div className="ola-bar-chart">
              {/* Simulate 12 small vertical bars for the chart */}
              {[40, 60, 50, 70, 80, 50, 65, 80, 95, 75, 55, 60, 85, 100, 70, 60].map((val, i) => (
                <div key={i} className="ola-bar-col">
                  <div className="ola-bar" style={{ height: `${val}%` }}></div>
                  <div className="ola-bar-base"></div>
                </div>
              ))}
            </div>
          </div>

          {/* MONEY SAVED CARD */}
          <div className="ola-card">
            <div className="ola-label">MONEY SAVED <ChevronRight size={14} /></div>
            <div className="ola-value">₹62,741</div>
            <div style={{ fontSize: '9px', color: '#10B981', fontWeight: 'bold', marginTop: '8px' }}>+₹4,200 this month</div>
          </div>

          {/* CO2 AVOIDED CARD */}
          <div className="ola-card">
            <div className="ola-label">CO2 AVOIDED <ChevronRight size={14} /></div>
            <div className="ola-value">777 kg</div>
            <div style={{ fontSize: '9px', color: '#4f46e5', fontWeight: 'bold', marginTop: '8px' }}>🌲 482 trees planted</div>
          </div>

          {/* GRID EXPORT CARD */}
          <div className="ola-card">
            <div className="ola-label">GRID EXPORT <ChevronRight size={14} /></div>
            <div className="ola-value">2,776 kWh</div>
            <div style={{ fontSize: '9px', color: '#10B981', fontWeight: 'bold', marginTop: '8px' }}>+₹1,250 earned</div>
          </div>

          {/* ACHIEVEMENTS CARD */}
          <div className="ola-card">
            <div className="ola-label">ACHIEVEMENTS <ChevronRight size={14} /></div>
            <div className="ola-achievements">
              <div className="ola-badge-img"><Zap size={16} /></div>
              <div className="ola-badge-img"><Leaf size={16} /></div>
              <div className="ola-badge-img"><SunMedium size={16} /></div>
              <div className="ola-badge-img"><ShieldCheck size={16} /></div>
            </div>
            <div style={{ fontSize: '9px', color: '#F59E0B', fontWeight: 'bold', marginTop: '12px' }}>⭐ Level 3 Pro - 10k Club</div>
          </div>
        </div>

        {/* RECENT PERFORMANCE SECTION */}
        <div className="ola-recent">
          <div className="ola-recent-header">
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: '800', fontStyle: 'italic', color: '#1e293b', marginBottom: '4px' }}>Daily Generation</h3>
              <div style={{ fontSize: '9px', color: '#94a3b8' }}>Today vs Yesterday</div>
            </div>
            <div className="ola-share-btn">
              <Share2 size={18} />
            </div>
          </div>

          <div className="ola-recent-detail">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Today Section */}
              <div>
                <div style={{ fontSize: '9px', fontWeight: '800', color: '#4f46e5', marginBottom: '4px', fontStyle: 'italic', textTransform: 'uppercase' }}>TODAY (SO FAR)</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '31px', fontWeight: '800', color: '#4f46e5', lineHeight: '1' }}>18.2</span>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#1e293b' }}>kWh</span>
                </div>
              </div>

              {/* Yesterday Section */}
              <div>
                <div style={{ fontSize: '9px', fontWeight: '800', color: '#94a3b8', marginBottom: '4px', fontStyle: 'italic', textTransform: 'uppercase' }}>YESTERDAY TOTAL</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '800', color: '#334155', lineHeight: '1' }}>24.8</span>
                  <span style={{ fontSize: '10px', fontWeight: '800', color: '#1e293b' }}>kWh</span>
                </div>
              </div>
            </div>

            {/* Real Recharts Interactive Graph */}
            <div className="ola-map-preview" style={{ height: '180px', padding: '10px 0' }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorToday" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#64748B' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#64748B' }} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                    labelStyle={{ fontSize: '10px', color: '#64748B', marginBottom: '4px' }}
                  />
                  
                  {/* Yesterday Line */}
                  <Line 
                    type="monotone" 
                    dataKey="yesterday" 
                    name="Yesterday (kWh)"
                    stroke="#94A3B8" 
                    strokeWidth={2} 
                    strokeDasharray="5 5" 
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                  
                  {/* Today Area */}
                  <Area 
                    type="monotone" 
                    dataKey="today" 
                    name="Today (kWh)"
                    stroke="#4f46e5" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorToday)" 
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#4f46e5' }}
                    connectNulls
                  />
                  
                  {/* Current Position Marker */}
                  <ReferenceDot x="2 PM" y={4.8} r={6} fill="#ef4444" stroke="rgba(239,68,68,0.3)" strokeWidth={6} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="ola-bottom-action" onClick={() => handleNavigate('analytics')}>
            <span>
              <span className="hidden sm:inline">View detailed analytics</span>
              <span className="sm:hidden">Detailed Analytics</span>
            </span>
            <ArrowRight size={18} />
          </div>
        </div>
      </div>

      {/* --- CUSTOMER & SYSTEM INFORMATION --- */}
      <div className="card mx-2 sm:mx-0" style={{ border: '1px solid #E2E8F0', background: '#FFF', marginTop: '16px' }}>
        <div className="card-header" style={{ marginBottom: '16px', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          <h3 className="card-title flex items-center gap-2" style={{ color: 'var(--dark-blue)', fontSize: '14px' }}>
            <Info size={16} style={{ color: 'var(--sky-blue)' }} /> Customer & System Details
          </h3>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px' }}>
            <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--gray-text)', textTransform: 'uppercase' }}>Customer</span>
            <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--dark-blue)', marginTop: '4px' }}>{currentUser.name || 'Rajesh Kumar'}</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>+91 98765 43210</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Pune, Maharashtra</div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px' }}>
            <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--gray-text)', textTransform: 'uppercase' }}>System Specs</span>
            <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--dark-blue)', marginTop: '4px' }}>{profile.plantCapacity || '5 kW On-Grid'}</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Trina Solar Vertex S 435W</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Solax Power X1-Hybrid G4</div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px' }}>
            <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--gray-text)', textTransform: 'uppercase' }}>Warranty & Support</span>
            <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--success)', marginTop: '4px' }}>Active (24 Yrs Left)</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Installed: 12 Nov 2024</div>
            <div style={{ fontSize: '11px', color: '#4f46e5', cursor: 'pointer', marginTop: '4px', fontWeight: 'bold' }}>Contact Support →</div>
          </div>
        </div>
      </div>

    </div>
  );
}
