import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';
import { Sun, Cloud, CloudSun, CloudRain, Activity } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    const WeatherIcon = () => {
      switch (data.weather) {
        case 'Sunny': return <Sun className="text-brand-orange/80 animate-spin-slow" size={16} />;
        case 'Cloudy': return <Cloud className="text-gray-400" size={16} />;
        case 'Rainy': return <CloudRain className="text-brand-navy/80" size={16} />;
        default: return <CloudSun className="text-brand-orange/80" size={16} />;
      }
    };

    return (
      <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-brand-navy/80 text-xs font-sans space-y-3 min-w-[220px]">
        {/* Header with Time */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
          <span className="font-extrabold text-slate-800 text-[13px]">{data.time}</span>
          <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase font-black tracking-wider ${
            data.status === 'Optimal' ? 'bg-brand-orange/10 text-brand-orange' :
            data.status === 'Active' ? 'bg-brand-navy/10 text-brand-navy' :
            data.status === 'Low Yield' ? 'bg-brand-orange/10 text-brand-orange' :
            'bg-slate-100 text-slate-700'
          }`}>
            {data.status}
          </span>
        </div>

        {/* Energy & Power */}
        <div className="space-y-2 text-slate-600 font-semibold">
          <div className="flex justify-between items-center gap-4">
            <span className="text-slate-400 font-bold">Total Generation:</span>
            <span className="font-black text-brand-navy text-sm">{data.generation.toFixed(2)} kWh</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-slate-400 font-bold">Average Power:</span>
            <span className="font-extrabold text-slate-800">{data.power.toFixed(2)} kW</span>
          </div>
          <div className="flex justify-between items-center gap-4 border-t border-slate-50 pt-2 text-[10px]">
            <span className="text-slate-400">Peak Capacity:</span>
            <span className="font-bold text-slate-500">{data.capacity.toFixed(2)} kWh</span>
          </div>
        </div>

        {/* Weather Status */}
        <div className="flex items-center gap-2 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500">
          <WeatherIcon />
          <span className="font-bold">{data.weather} Skies</span>
        </div>
      </div>
    );
  }
  return null;
};

// 3D Cylinder Column Custom Shape Component (Matching Reference Image)
const CylinderBar = (props) => {
  const { x, y, width, height, payload } = props;
  
  if (!payload || width <= 0 || height <= 0) return null;

  // Skip entirely for zero-generation hours — no floating dot at baseline
  const generation = payload.generation || 0;
  if (generation === 0) return null;

  const rx = width / 2;
  const ry = Math.min(6, width / 4.5);
  
  const status = payload.status || 'Active';
  let gradientId = 'activeGrad';
  let lidColor = '#a5b4fc';
  
  if (status === 'Optimal') {
    gradientId = 'optimalGrad';
    lidColor = '#6ee7b7';
  } else if (status === 'Low Yield') {
    gradientId = 'lowYieldGrad';
    lidColor = '#fde047';
  } else if (status === 'Standby') {
    gradientId = 'standbyGrad';
    lidColor = '#cbd5e1';
  }

  // 1. Background Glass Capacity Tube coordinates
  const bgTopY = y;
  const bgBottomY = y + height;
  const centerX = x + rx;
  
  // 2. Foreground Solid Active Column coordinates
  const fgHeight = height * Math.min(1, Math.max(0, generation / (payload.capacity || 1)));
  const fgTopY = bgBottomY - fgHeight;
  const fgBottomY = bgBottomY;

  return (
    <g className="transition-all duration-300">
      {/* ================= BACKGROUND GLASS TUBE ================= */}
      <g opacity={0.35}>
        {/* Bottom Cap */}
        <ellipse cx={centerX} cy={bgBottomY} rx={rx} ry={ry} fill={`url(#${gradientId}Bg)`} />
        
        {/* Cylinder Body */}
        <path
          d={`M ${x} ${bgTopY}
              L ${x} ${bgBottomY}
              A ${rx} ${ry} 0 0 0 ${x + width} ${bgBottomY}
              L ${x + width} ${bgTopY}
              A ${rx} ${ry} 0 0 1 ${x} ${bgTopY} Z`}
          fill={`url(#${gradientId}Bg)`}
        />
        
        {/* Top Lid */}
        <ellipse cx={centerX} cy={bgTopY} rx={rx} ry={ry} fill={`url(#${gradientId}BgLid)`} />
      </g>

      {/* ================= FOREGROUND SOLID COLUMN ================= */}
      {fgHeight > 0 && (
        <g opacity={0.95}>
          {/* Bottom Cap */}
          <ellipse cx={centerX} cy={fgBottomY} rx={rx} ry={ry} fill={`url(#${gradientId})`} />
          
          {/* Cylinder Body */}
          <path
            d={`M ${x} ${fgTopY}
                L ${x} ${fgBottomY}
                A ${rx} ${ry} 0 0 0 ${x + width} ${fgBottomY}
                L ${x + width} ${fgTopY}
                A ${rx} ${ry} 0 0 1 ${x} ${fgTopY} Z`}
            fill={`url(#${gradientId})`}
          />
          
          {/* Top Lid */}
          <ellipse cx={centerX} cy={fgTopY} rx={rx} ry={ry} fill={lidColor} />
        </g>
      )}
    </g>
  );
};

export default function CandleBarChart({ data }) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 640);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Find maximum values to establish dynamic capacity ceiling
  const maxVal = Math.max(...data.map(item => item.generation), 1);
  const capacityLimit = maxVal * 1.15; // 15% headroom above highest reading

  // Map dataset to overlay standard capacity background cylinders
  const formattedData = data.map(item => ({
    ...item,
    capacity: capacityLimit
  }));

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-row flex-wrap justify-between items-center gap-1.5 mb-2 px-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-brand-navy uppercase tracking-wider flex items-center gap-1 sm:gap-2">
            <Activity size={14} className="text-brand-navy animate-pulse sm:w-4 sm:h-4" />
            Solar 3D Telemetry
          </h3>
          <span className="text-[7px] sm:text-[9px] md:text-[10px] text-slate-400 font-normal uppercase tracking-wide">
            — Glass: Capacity | Solid: Yield
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[8px] sm:text-[10px] md:text-xs">
          <div className="flex items-center gap-1 sm:gap-1.5 font-bold text-brand-orange">
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-brand-orange/80 rounded-sm shadow-sm"></span>
            Optimal Yield
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 font-bold text-brand-navy">
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-brand-navy/80 rounded-sm shadow-sm"></span>
            Active Yield
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 font-bold text-brand-orange">
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-brand-orange/80 rounded-sm shadow-sm"></span>
            Low Yield
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={formattedData}
            barGap="-100%"
            margin={{ top: 20, right: 10, bottom: 10, left: -20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#64748b" 
              fontSize={isMobile ? 8 : 11} 
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              dy={8}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={isMobile ? 8 : 11} 
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              dx={-8}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.03)' }} />
            
            {/* Strong baseline at y=0 */}
            <ReferenceLine y={0} stroke="#c7d2fe" strokeWidth={1.5} />
            
            {/* 3D Volumetric Cylinder (Background Capacity & Foreground Yield combined in a single-pass draw) */}
            <Bar 
              dataKey="capacity" 
              shape={<CylinderBar />}
              barSize={isMobile ? 10 : 22}
              animationDuration={1000}
            />

            {/* Specular horizontal lighting reflection linear gradients */}
            <defs>
              {/* Optimal (Emerald) */}
              <linearGradient id="optimalGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#047857" />
                <stop offset="30%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#34d399" />
                <stop offset="85%" stopColor="#059669" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="optimalGradBg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a7f3d0" stopOpacity={0.2} />
                <stop offset="50%" stopColor="#ecfdf5" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#a7f3d0" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="optimalGradBgLid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ecfdf5" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#a7f3d0" stopOpacity={0.3} />
              </linearGradient>

              {/* Active (Indigo) */}
              <linearGradient id="activeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3730a3" />
                <stop offset="30%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="85%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#3730a3" />
              </linearGradient>
              <linearGradient id="activeGradBg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#c7d2fe" stopOpacity={0.2} />
                <stop offset="50%" stopColor="#e0e7ff" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#c7d2fe" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="activeGradBgLid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e0e7ff" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#c7d2fe" stopOpacity={0.3} />
              </linearGradient>

              {/* Low Yield (Amber) */}
              <linearGradient id="lowYieldGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#92400e" />
                <stop offset="30%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="85%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#92400e" />
              </linearGradient>
              <linearGradient id="lowYieldGradBg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fde68a" stopOpacity={0.2} />
                <stop offset="50%" stopColor="#fef3c7" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#fde68a" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="lowYieldGradBgLid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fef3c7" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#fde68a" stopOpacity={0.3} />
              </linearGradient>

              {/* Standby (Slate) */}
              <linearGradient id="standbyGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="30%" stopColor="#64748b" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="85%" stopColor="#475569" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <linearGradient id="standbyGradBg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#cbd5e1" stopOpacity={0.2} />
                <stop offset="50%" stopColor="#f1f5f9" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#cbd5e1" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="standbyGradBgLid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f1f5f9" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#cbd5e1" stopOpacity={0.3} />
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
