import React, { useState, useMemo, useEffect } from 'react';
import {
  History,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Zap,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  Download,
  Filter,
  RefreshCw,
  Info,
  Search,
  RotateCcw
} from 'lucide-react';
import toast from 'react-hot-toast';
import CandleBarChart from '../../components/CandleBarChart';
import DataTable from '../../components/DataTable';

// Helper for formatting date display
const formatDateString = (date) => {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function MySolarHistory() {
  // 1. Core State
  const [activeView, setActiveView] = useState('Day'); // 'Day' | 'Week' | 'Month' | 'Year' | 'Lifetime'
  const [selectedDate, setSelectedDate] = useState(new Date('2026-05-26'));
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState(4); // 0-indexed (4 = May)
  const [selectedWeekStart, setSelectedWeekStart] = useState(new Date('2026-05-25')); // Monday of the week

  // From / To Date Range State
  const [fromDate, setFromDate] = useState(new Date('2026-05-26'));
  const [toDate, setToDate] = useState(new Date('2026-05-26'));

  // Section tab: 'chart' | 'table'
  const [activeSection, setActiveSection] = useState('chart');

  // Helper: format date as YYYY-MM-DD for input[type=date] value prop
  const toInputValue = (d) => d instanceof Date && !isNaN(d) ? d.toISOString().split('T')[0] : '';

  // Helper: format date as DD/MM/YYYY for display
  const toDDMMYYYY = (d) => {
    if (!(d instanceof Date) || isNaN(d)) return 'DD/MM/YYYY';
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  };

  // Auto-sync toDate whenever fromDate or activeView changes
  useEffect(() => {
    if (activeView === 'Day') {
      setToDate(new Date(fromDate));
    } else if (activeView === 'Week') {
      const end = new Date(fromDate);
      end.setDate(end.getDate() + 6);
      setToDate(end);
    } else if (activeView === 'Month') {
      // end of the month of fromDate
      const end = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);
      setToDate(end);
    } else if (activeView === 'Year') {
      const end = new Date(fromDate.getFullYear(), 11, 31);
      setToDate(end);
    }
  }, [fromDate, activeView]);

  // When activeView changes, reset fromDate to current selected period start
  useEffect(() => {
    if (activeView === 'Day') {
      setFromDate(new Date(selectedDate));
    } else if (activeView === 'Week') {
      setFromDate(new Date(selectedWeekStart));
    } else if (activeView === 'Month') {
      setFromDate(new Date(selectedYear, selectedMonth, 1));
    } else if (activeView === 'Year') {
      setFromDate(new Date(selectedYear, 0, 1));
    }
  }, [activeView]);

  // Table Search State
  const [tableSearch, setTableSearch] = useState('');

  // Helper lists
  const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const yearsList = [2021, 2022, 2023, 2024, 2025, 2026];

  // 2. Date Navigation handlers
  const handlePrevPeriod = () => {
    if (activeView === 'Day') {
      const prev = new Date(selectedDate);
      prev.setDate(prev.getDate() - 1);
      setSelectedDate(prev);
    } else if (activeView === 'Week') {
      const prev = new Date(selectedWeekStart);
      prev.setDate(prev.getDate() - 7);
      setSelectedWeekStart(prev);
    } else if (activeView === 'Month') {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(prev => Math.max(2021, prev - 1));
      } else {
        setSelectedMonth(prev => prev - 1);
      }
    } else if (activeView === 'Year') {
      setSelectedYear(prev => Math.max(2021, prev - 1));
    }
  };

  const handleNextPeriod = () => {
    if (activeView === 'Day') {
      const next = new Date(selectedDate);
      next.setDate(next.getDate() + 1);
      setSelectedDate(next);
    } else if (activeView === 'Week') {
      const next = new Date(selectedWeekStart);
      next.setDate(next.getDate() + 7);
      setSelectedWeekStart(next);
    } else if (activeView === 'Month') {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(prev => Math.min(2026, prev + 1));
      } else {
        setSelectedMonth(prev => prev + 1);
      }
    } else if (activeView === 'Year') {
      setSelectedYear(prev => Math.min(2026, prev + 1));
    }
  };

  // 3. Dynamic Mock Data Generator
  // Generates data on the fly to support dates, weather anomalies, and correct values.
  const chartData = useMemo(() => {
    const seed = (selectedDate.getDate() + selectedMonth + selectedYear + (activeView.charCodeAt(0) || 0)) % 100;

    const weatherOptions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'];
    const statusOptions = ['Optimal', 'Active', 'Low Yield', 'Standby'];

    const getWeatherData = (val) => {
      const idx = Math.abs(Math.sin(val) * 100) % weatherOptions.length;
      return weatherOptions[Math.floor(idx)];
    };

    const getStatusData = (gen, max) => {
      const ratio = gen / max;
      if (ratio > 0.8) return 'Optimal';
      if (ratio > 0.4) return 'Active';
      if (ratio > 0.05) return 'Low Yield';
      return 'Standby';
    };

    if (activeView === 'Day') {
      // 24 Hourly readings
      const list = [];
      for (let hour = 0; hour < 24; hour++) {
        const timeStr = `${hour.toString().padStart(2, '0')}:00`;
        let low = 0;
        let high = 0;
        let open = 0;
        let close = 0;
        let generation = 0;
        let power = 0;
        let weather = 'Sunny';

        // Solar window is primarily 06:00 to 18:00
        if (hour >= 6 && hour <= 18) {
          const intensity = Math.sin(((hour - 6) / 12) * Math.PI); // peak around 12:00
          const basePower = intensity * 6.5; // Up to 6.5 kW peak
          const weatherModifier = 0.5 + (Math.sin(seed + hour) * 0.3); // fluctuates with seed

          power = Math.max(0.1, basePower * weatherModifier);
          low = Math.max(0, power - (Math.random() * 0.8));
          high = power + (Math.random() * 1.2);
          open = Math.max(low, power - (Math.random() * 0.4));
          close = Math.min(high, power + (Math.random() * 0.4));
          generation = power * 0.95; // energy generated in this hour (kWh)
          weather = getWeatherData(seed + hour);
        } else {
          // Night hours
          power = 0;
          low = 0;
          high = 0;
          open = 0;
          close = 0;
          generation = 0;
          weather = 'Cloudy'; // Arbitrary night weather
        }

        const status = getStatusData(generation, 6.5);

        list.push({
          time: timeStr,
          low,
          high,
          open,
          close,
          generation,
          power,
          weather,
          status
        });
      }
      return list;

    } else if (activeView === 'Week') {
      // 7 Daily readings
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      return days.map((day, idx) => {
        const wSeed = seed + idx;
        const weather = getWeatherData(wSeed);
        const maxDailyPower = 7.5;
        const weatherRatio = weather === 'Sunny' ? 0.95 : weather === 'Partly Cloudy' ? 0.8 : weather === 'Cloudy' ? 0.5 : 0.25;

        const generation = (25 + Math.sin(wSeed) * 12) * weatherRatio;
        const power = (4.5 + Math.cos(wSeed) * 1.5) * weatherRatio;
        const low = Math.max(0.2, power - 2);
        const high = power + 2.5;
        const open = power - 0.5;
        const close = power + 0.6;
        const status = getStatusData(generation, 40);

        return {
          time: day,
          low,
          high,
          open,
          close,
          generation,
          power,
          weather,
          status
        };
      });

    } else if (activeView === 'Month') {
      // 30 days
      const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      const list = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const wSeed = seed + day;
        const weather = getWeatherData(wSeed);
        const weatherRatio = weather === 'Sunny' ? 0.95 : weather === 'Partly Cloudy' ? 0.75 : weather === 'Cloudy' ? 0.45 : 0.2;

        const generation = (28 + Math.cos(wSeed) * 10) * weatherRatio;
        const power = (4.8 + Math.sin(wSeed) * 1.2) * weatherRatio;
        const low = Math.max(0.1, power - 1.8);
        const high = power + 2.2;
        const open = power - 0.4;
        const close = power + 0.5;
        const status = getStatusData(generation, 40);

        list.push({
          time: `${day} ${monthsList[selectedMonth].substring(0, 3)}`,
          low,
          high,
          open,
          close,
          generation,
          power,
          weather,
          status
        });
      }
      return list;

    } else if (activeView === 'Year') {
      // 12 months
      return monthsList.map((month, idx) => {
        const wSeed = seed + idx;
        // Summer peak in May-July
        const seasonModifier = Math.sin((idx / 11) * Math.PI) * 0.5 + 0.5; // bell curve
        const weather = getWeatherData(wSeed);

        const generation = (850 + Math.sin(wSeed) * 150) * (0.6 + seasonModifier * 0.4);
        const power = (5.2 + Math.cos(wSeed) * 0.8) * (0.7 + seasonModifier * 0.3);
        const low = Math.max(0.5, power - 1.5);
        const high = power + 1.8;
        const open = power - 0.3;
        const close = power + 0.4;
        const status = getStatusData(generation / 30, 35);

        return {
          time: month.substring(0, 3),
          low,
          high,
          open,
          close,
          generation,
          power,
          weather,
          status
        };
      });

    } else {
      // Lifetime View (5+ years)
      return yearsList.map((year, idx) => {
        const wSeed = seed + idx;
        const weather = 'Sunny'; // Overall aggregated weather average

        const generation = 10500 + Math.sin(wSeed) * 800 - (idx * 50); // slight panel degradation over years
        const power = 5.4 + Math.cos(wSeed) * 0.3;
        const low = 4.2;
        const high = 6.8;
        const open = power - 0.2;
        const close = power + 0.2;
        const status = 'Optimal';

        return {
          time: year.toString(),
          low,
          high,
          open,
          close,
          generation,
          power,
          weather,
          status
        };
      });
    }
  }, [activeView, selectedDate, selectedYear, selectedMonth, selectedWeekStart]);

  // 4. Calculate System Performance Indicators
  const metrics = useMemo(() => {
    if (!chartData || chartData.length === 0) return {};

    const activeReadings = chartData.filter(d => d.generation > 0);

    const totalUnits = chartData.reduce((sum, d) => sum + d.generation, 0);
    const avgGen = totalUnits / (activeView === 'Day' ? activeReadings.length || 1 : chartData.length);

    // Find absolute maximums and minimums
    let maxGen = 0;
    let minGen = activeReadings.length > 0 ? Infinity : 0;
    let peakVal = 0;
    let peakTimeStr = 'N/A';

    chartData.forEach(d => {
      if (d.high > peakVal) {
        peakVal = d.high;
        peakTimeStr = d.time;
      }
      if (d.generation > maxGen) {
        maxGen = d.generation;
      }
      if (d.generation > 0 && d.generation < minGen) {
        minGen = d.generation;
      }
    });

    if (minGen === Infinity) minGen = 0;

    // Efficiency calculations: weather factored system capability vs output ratio
    const sunnyCount = chartData.filter(d => d.weather === 'Sunny').length;
    const weatherScore = (sunnyCount / chartData.length) * 20 + 78; // base efficiency fluctuates around 78% - 98%
    const seedDev = Math.abs(Math.sin(totalUnits) * 4);
    const efficiency = Math.min(99.4, Math.max(74.5, weatherScore + seedDev));

    return {
      totalUnits,
      peakTime: activeView === 'Day' ? `${peakTimeStr} (Peak Output)` : peakTimeStr,
      averageGeneration: avgGen,
      maximumGeneration: maxGen,
      minimumGeneration: minGen,
      efficiency
    };
  }, [chartData, activeView]);

  // 4.5. Table Search & Filtering Logic (Matching Dashboard UI)
  const filteredTableData = useMemo(() => {
    if (!chartData) return [];
    if (!tableSearch.trim()) return chartData;

    const query = tableSearch.toLowerCase();
    return chartData.filter(item => {
      return (
        item.time.toLowerCase().includes(query) ||
        item.weather.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        item.generation.toFixed(2).includes(query) ||
        item.power.toFixed(2).includes(query)
      );
    });
  }, [chartData, tableSearch]);

  // Reset scroll when view or search query changes
  useEffect(() => {
    // any necessary resets when data changes
  }, [activeView, selectedDate, selectedYear, selectedMonth, selectedWeekStart, tableSearch]);


  // 5. Utility handlers
  const handleExportData = () => {
    // Generate CSV on the fly
    const headers = ['Time/Period', 'Generation (kWh)', 'Power (kW)', 'Min Power (kW)', 'Max Power (kW)', 'Weather', 'Status'];
    const rows = chartData.map(d => [
      d.time,
      d.generation.toFixed(2),
      d.power.toFixed(2),
      d.low.toFixed(2),
      d.high.toFixed(2),
      d.weather,
      d.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `solar_history_${activeView.toLowerCase()}_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Solar readings log exported successfully!');
  };

  const handleRefreshData = () => {
    toast.success('Refreshed real-time telemetry logs');
  };

  // Weather Icon Component helper
  const renderWeatherIcon = (weather) => {
    switch (weather) {
      case 'Sunny': return <span className="flex items-center gap-1 text-brand-orange/80 font-bold"><Sun size={14} className="animate-spin-slow" /> Sunny</span>;
      case 'Partly Cloudy': return <span className="flex items-center gap-1 text-brand-orange/80 font-medium"><CloudSun size={14} /> Cloudy-Sun</span>;
      case 'Cloudy': return <span className="flex items-center gap-1 text-gray-500 font-medium"><Cloud size={14} /> Cloudy</span>;
      case 'Rainy': return <span className="flex items-center gap-1 text-brand-navy/80 font-bold"><CloudRain size={14} /> Rainy</span>;
      default: return <span className="flex items-center gap-1 text-gray-400"><CloudSun size={14} /> Overcast</span>;
    }
  };

  // Telemetry status badge helper with dynamic pulsing glow dot
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Optimal':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-wider bg-brand-orange/10 text-brand-orange border border-brand-orange/50 shadow-sm relative overflow-hidden">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange/80 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-orange/80"></span>
            </span>
            Optimal
          </span>
        );
      case 'Active':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-wider bg-brand-navy/10 text-brand-navy border border-brand-navy/50 shadow-sm relative overflow-hidden">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-navy/80 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-navy/80"></span>
            </span>
            Active
          </span>
        );
      case 'Low Yield':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-wider bg-brand-orange/10 text-brand-orange border border-brand-orange/50 shadow-sm relative overflow-hidden">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange/80 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-orange/80"></span>
            </span>
            Low Yield
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-wider bg-slate-50 text-slate-500 border border-slate-200/50 shadow-sm relative overflow-hidden">
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-slate-400"></span>
            </span>
            Standby
          </span>
        );
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-5 space-y-2 md:space-y-3 flex flex-col h-full min-h-0 overflow-y-auto scrollbar-thin scroll-smooth font-sans pb-8">

      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1">

        {/* View Selection Buttons */}
        <div className="flex flex-wrap gap-1.5">
          {['Day', 'Week', 'Month', 'Year', 'Lifetime'].map((view) => (
            <button
              key={view}
              onClick={() => {
                setActiveView(view);
                toast.success(`Switched to ${view} view`);
              }}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[11px] font-extrabold transition-all duration-200 ${activeView === view
                  ? 'bg-brand-navy text-white shadow-md shadow-indigo-100/30 scale-[1.02] border border-brand-navy'
                  : 'bg-white hover:bg-slate-50 text-slate-500 border border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
            >
              {view}
            </button>
          ))}
        </div>

        {/* From / To Date Range Filter */}
        {activeView !== 'Lifetime' && (
          <div className="flex flex-wrap items-center gap-2">

            {/* FROM date — shows DD/MM/YYYY, native picker on click */}
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">From:</span>
              <div className="relative h-[28px] sm:h-[32px]">
                <div className="bg-white border border-slate-200 hover:border-brand-navy/80 rounded-lg sm:rounded-xl px-2 sm:px-2.5 h-[28px] sm:h-[32px] flex items-center text-[10px] sm:text-xs font-bold text-slate-700 shadow-sm pointer-events-none min-w-[85px] sm:min-w-[105px] transition-all duration-200">
                  <Calendar size={10} className="text-brand-navy/80 mr-1 sm:mr-1.5 flex-shrink-0 sm:w-3 sm:h-3" />
                  {toDDMMYYYY(fromDate)}
                </div>
                <input
                  type="date"
                  value={toInputValue(fromDate)}
                  onChange={(e) => {
                    if (!e.target.value) return;
                    const d = new Date(e.target.value + 'T00:00:00');
                    setFromDate(d);
                    if (activeView === 'Day') setSelectedDate(d);
                    else if (activeView === 'Week') {
                      const day = d.getDay();
                      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
                      const mon = new Date(d); mon.setDate(diff);
                      setSelectedWeekStart(mon);
                    } else if (activeView === 'Month') {
                      setSelectedMonth(d.getMonth());
                      setSelectedYear(d.getFullYear());
                    } else if (activeView === 'Year') {
                      setSelectedYear(d.getFullYear());
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>
            </div>

            {/* TO date — read-only */}
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">To:</span>
              <div className="bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-2.5 h-[28px] sm:h-[32px] flex items-center text-[10px] sm:text-xs font-bold text-slate-400 shadow-sm min-w-[85px] sm:min-w-[105px] cursor-not-allowed select-none">
                <Calendar size={10} className="text-slate-300 mr-1 sm:mr-1.5 flex-shrink-0 sm:w-3 sm:h-3" />
                {toDDMMYYYY(toDate)}
              </div>
            </div>

            {/* Month Selector */}
            {activeView === 'Month' && (
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Month:</span>
                <select
                  value={selectedMonth}
                  onChange={(e) => {
                    const m = Number(e.target.value);
                    setSelectedMonth(m);
                    setFromDate(new Date(selectedYear, m, 1));
                  }}
                  className="bg-white border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-2.5 text-[10px] sm:text-xs font-bold text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy/15 focus:border-brand-navy/80 h-[28px] sm:h-[32px] shadow-sm cursor-pointer transition-all duration-200"
                >
                  {monthsList.map((m, idx) => (
                    <option key={idx} value={idx}>{m}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Year Selector */}
            {(activeView === 'Month' || activeView === 'Year') && (
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Year:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    const y = Number(e.target.value);
                    setSelectedYear(y);
                    if (activeView === 'Month') setFromDate(new Date(y, selectedMonth, 1));
                    else setFromDate(new Date(y, 0, 1));
                  }}
                  className="bg-white border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-2.5 text-[10px] sm:text-xs font-bold text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-navy/15 focus:border-brand-navy/80 h-[28px] sm:h-[32px] shadow-sm cursor-pointer transition-all duration-200"
                >
                  {yearsList.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            )}

          </div>
        )}

      </div>

      {/* 2. System Performance Indicators Div */}
      <div className="space-y-1.5">

        <div className="grid grid-cols-6 sm:grid-cols-3 xl:grid-cols-6 gap-1 sm:gap-2">

          {/* Indicator Card 1: Total Units */}
          <div className="w-full bg-white/80 backdrop-blur-md rounded-lg sm:rounded-xl p-1 sm:p-3 border border-brand-navy/60 shadow-sm hover:shadow-xl hover:border-brand-navy/80 transition-all duration-300 hover:-translate-y-0.5 flex flex-col items-center sm:items-start justify-center sm:justify-between group relative overflow-hidden text-center sm:text-left">
            <div className="absolute right-[-12px] top-[-12px] w-14 h-14 bg-brand-navy/40 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300"></div>
            <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-1.5 text-slate-400 font-black uppercase text-[4px] sm:text-[9px] tracking-wider z-10 w-full justify-center sm:justify-start">
              <Zap size={8} className="text-brand-navy/80 fill-brand-navy/10 sm:w-3 sm:h-3 hidden sm:block" />
              <span className="w-full leading-none sm:leading-tight">Total Units</span>
            </div>
            <div className="mt-0.5 sm:mt-1.5 z-10 w-full">
              <span className="text-[7px] sm:text-lg md:text-xl font-black text-brand-navy block tracking-tighter">
                {metrics.totalUnits?.toLocaleString('en-US', { maximumFractionDigits: 1 })}
              </span>
              <span className="text-[4px] sm:text-[9px] text-slate-400 font-extrabold uppercase tracking-widest leading-none hidden sm:block">kWh Generated</span>
            </div>
          </div>

          {/* Indicator Card 2: Peak Time */}
          <div className="w-full bg-white/80 backdrop-blur-md rounded-lg sm:rounded-xl p-1 sm:p-3 border border-brand-navy/60 shadow-sm hover:shadow-xl hover:border-brand-navy/80 transition-all duration-300 hover:-translate-y-0.5 flex flex-col items-center sm:items-start justify-center sm:justify-between group relative overflow-hidden text-center sm:text-left">
            <div className="absolute right-[-12px] top-[-12px] w-14 h-14 bg-brand-orange/40 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300"></div>
            <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-1.5 text-slate-400 font-black uppercase text-[4px] sm:text-[9px] tracking-wider z-10 w-full justify-center sm:justify-start">
              <Clock size={8} className="text-brand-orange/80 sm:w-3 sm:h-3 hidden sm:block" />
              <span className="w-full leading-none sm:leading-tight">Peak Time</span>
            </div>
            <div className="mt-0.5 sm:mt-1.5 z-10 w-full">
              <span className="text-[6px] sm:text-base md:text-lg font-black text-slate-800 block tracking-tighter" title={metrics.peakTime}>
                {metrics.peakTime}
              </span>
              <span className="text-[4px] sm:text-[9px] text-slate-400 font-extrabold uppercase tracking-widest leading-none hidden sm:block">Max Output Hour</span>
            </div>
          </div>

          {/* Indicator Card 3: Average Generation */}
          <div className="w-full bg-white/80 backdrop-blur-md rounded-lg sm:rounded-xl p-1 sm:p-3 border border-brand-navy/60 shadow-sm hover:shadow-xl hover:border-brand-navy/80 transition-all duration-300 hover:-translate-y-0.5 flex flex-col items-center sm:items-start justify-center sm:justify-between group relative overflow-hidden text-center sm:text-left">
            <div className="absolute right-[-12px] top-[-12px] w-14 h-14 bg-brand-orange/40 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300"></div>
            <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-1.5 text-slate-400 font-black uppercase text-[4px] sm:text-[9px] tracking-wider z-10 w-full justify-center sm:justify-start">
              <TrendingUp size={8} className="text-brand-orange/80 sm:w-3 sm:h-3 hidden sm:block" />
              <span className="w-full leading-none sm:leading-tight">Avg Gen</span>
            </div>
            <div className="mt-0.5 sm:mt-1.5 z-10 w-full">
              <span className="text-[7px] sm:text-lg md:text-xl font-black text-brand-navy block tracking-tighter">
                {metrics.averageGeneration?.toFixed(2)}
              </span>
              <span className="text-[4px] sm:text-[9px] text-slate-400 font-extrabold uppercase tracking-widest leading-none hidden sm:block">kWh / Period</span>
            </div>
          </div>

          {/* Indicator Card 4: Maximum Generation */}
          <div className="w-full bg-white/80 backdrop-blur-md rounded-lg sm:rounded-xl p-1 sm:p-3 border border-brand-navy/60 shadow-sm hover:shadow-xl hover:border-brand-navy/80 transition-all duration-300 hover:-translate-y-0.5 flex flex-col items-center sm:items-start justify-center sm:justify-between group relative overflow-hidden text-center sm:text-left">
            <div className="absolute right-[-12px] top-[-12px] w-14 h-14 bg-brand-navy/40 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300"></div>
            <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-1.5 text-slate-400 font-black uppercase text-[4px] sm:text-[9px] tracking-wider z-10 w-full justify-center sm:justify-start">
              <ArrowUpRight size={8} className="text-brand-navy bg-brand-navy/10 rounded sm:w-3 sm:h-3 hidden sm:block" />
              <span className="w-full leading-none sm:leading-tight">Max Gen</span>
            </div>
            <div className="mt-0.5 sm:mt-1.5 z-10 w-full">
              <span className="text-[7px] sm:text-lg md:text-xl font-black text-brand-navy block tracking-tighter">
                {metrics.maximumGeneration?.toFixed(2)}
              </span>
              <span className="text-[4px] sm:text-[9px] text-slate-400 font-extrabold uppercase tracking-widest leading-none hidden sm:block">Peak kWh</span>
            </div>
          </div>

          {/* Indicator Card 5: Minimum Generation */}
          <div className="w-full bg-white/80 backdrop-blur-md rounded-lg sm:rounded-xl p-1 sm:p-3 border border-brand-navy/60 shadow-sm hover:shadow-xl hover:border-brand-navy/80 transition-all duration-300 hover:-translate-y-0.5 flex flex-col items-center sm:items-start justify-center sm:justify-between group relative overflow-hidden text-center sm:text-left">
            <div className="absolute right-[-12px] top-[-12px] w-14 h-14 bg-brand-navy/40 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300"></div>
            <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-1.5 text-slate-400 font-black uppercase text-[4px] sm:text-[9px] tracking-wider z-10 w-full justify-center sm:justify-start">
              <ArrowDownRight size={8} className="text-brand-navy bg-brand-navy/10 rounded sm:w-3 sm:h-3 hidden sm:block" />
              <span className="w-full leading-none sm:leading-tight">Min Gen</span>
            </div>
            <div className="mt-0.5 sm:mt-1.5 z-10 w-full">
              <span className="text-[7px] sm:text-lg md:text-xl font-black text-brand-navy block tracking-tighter">
                {metrics.minimumGeneration?.toFixed(2)}
              </span>
              <span className="text-[4px] sm:text-[9px] text-slate-400 font-extrabold uppercase tracking-widest leading-none hidden sm:block">Min kWh</span>
            </div>
          </div>

          {/* Indicator Card 6: Efficiency % */}
          <div className="w-full bg-white/80 backdrop-blur-md rounded-lg sm:rounded-xl p-1 sm:p-3 border border-brand-navy/60 shadow-sm hover:shadow-xl hover:border-brand-navy/80 transition-all duration-300 hover:-translate-y-0.5 flex flex-col items-center sm:items-start justify-center sm:justify-between group relative overflow-hidden text-center sm:text-left">
            <div className="absolute right-[-12px] top-[-12px] w-14 h-14 bg-brand-navy/40 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300"></div>
            <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-1.5 text-slate-400 font-black uppercase text-[4px] sm:text-[9px] tracking-wider z-10 w-full justify-center sm:justify-start">
              <Percent size={8} className="text-brand-navy/80 sm:w-3 sm:h-3 hidden sm:block" />
              <span className="w-full leading-none sm:leading-tight">Efficiency</span>
            </div>
            <div className="mt-0.5 sm:mt-1.5 z-10 w-full">
              <span className="text-[7px] sm:text-lg md:text-xl font-black text-brand-navy block tracking-tighter">
                {metrics.efficiency?.toFixed(1)}%
              </span>
              <span className="text-[4px] sm:text-[9px] text-slate-400 font-extrabold uppercase tracking-widest leading-none hidden sm:block">Performance</span>
            </div>
          </div>

        </div>
      </div>

      {/* Section Tab Toggle — full row */}
      <div className="flex items-center gap-1.5 sm:gap-2 w-full">
        <button
          onClick={() => setActiveSection('chart')}
          className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-extrabold transition-all duration-200 border ${activeSection === 'chart'
              ? 'bg-brand-navy text-white border-brand-navy shadow-md shadow-indigo-200'
              : 'bg-white text-slate-500 border-slate-200 hover:border-brand-navy/30 hover:text-brand-navy'
            }`}
        >
          <Zap size={10} className={`${activeSection === 'chart' ? 'text-white' : 'text-slate-400'} sm:w-[13px] sm:h-[13px]`} />
          Solar 3D Telemetry
        </button>
        <button
          onClick={() => setActiveSection('table')}
          className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-extrabold transition-all duration-200 border ${activeSection === 'table'
              ? 'bg-brand-navy text-white border-brand-navy shadow-md shadow-indigo-200'
              : 'bg-white text-slate-500 border-slate-200 hover:border-brand-navy/30 hover:text-brand-navy'
            }`}
        >
          <Filter size={10} className={`${activeSection === 'table' ? 'text-white' : 'text-slate-400'} sm:w-[13px] sm:h-[13px]`} />
          Readings Log
        </button>
      </div>

      {/* 4. Chart Section */}
      {activeSection === 'chart' && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-2 sm:p-3 border border-brand-navy/60 shadow-md hover:shadow-lg transition-all duration-300 flex-1 min-h-0 min-h-[300px] flex flex-col animate-fade-in">
          <CandleBarChart data={chartData} />
        </div>
      )}

      {/* 5. Readings Log Table */}
      {activeSection === 'table' && (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-brand-navy/60 shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 animate-fade-in flex-1 min-h-0 min-h-[400px]">
          {/* Table Header — always one row */}
          <div className="px-3 sm:px-4 py-2 border-b border-slate-100/80 flex items-center justify-between gap-2 sm:gap-3 bg-white/40">
            {/* Title + Subtitle — one row */}
            <div className="flex-shrink-0 flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
              <h3 className="text-[10px] sm:text-xs font-extrabold text-brand-navy uppercase tracking-widest">
                Readings Log ({activeView})
              </h3>
              <span className="text-slate-300 text-[10px] sm:text-xs">·</span>
              <p className="text-[8px] sm:text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">
                Telemetry &amp; Conditions
              </p>
            </div>

            {/* Mobile Search Icon */}
            <button className="sm:hidden p-1.5 rounded-full border border-slate-200 text-slate-400 bg-white shadow-sm flex-shrink-0 ml-auto">
              <Search size={13} />
            </button>

            {/* Search bar — grows to fill middle on desktop */}
            <div className="hidden sm:block flex-1 min-w-0 relative max-w-sm">
              <Search className="absolute left-2.5 top-[9px] text-slate-400" size={13} />
              <input
                type="text"
                placeholder="Search logs..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-7 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/15 focus:border-brand-navy/80 h-[30px] shadow-sm transition-all duration-200"
              />
              {tableSearch && (
                <button
                  onClick={() => setTableSearch('')}
                  className="absolute right-2.5 top-[8px] text-slate-400 hover:text-slate-600 transition-colors"
                  title="Clear Search"
                >
                  <RotateCcw size={13} />
                </button>
              )}
            </div>

            {/* Right: rows count + total badge */}
            <div className="hidden sm:flex flex-shrink-0 items-center gap-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap">
                {filteredTableData.length} rows
              </span>
              <div className="text-xs bg-brand-navy/50 px-2.5 py-0.5 rounded-xl border border-brand-navy/30 text-brand-navy font-black shadow-sm whitespace-nowrap">
                Total: {filteredTableData.length}
              </div>
            </div>
          </div>

          {/* DataTable Integration */}
          <DataTable
            headers={[
              <span className="text-[10px] font-black text-slate-400">#</span>,
              <span className="flex items-center justify-center gap-1.5 text-[11px] font-black text-brand-navy uppercase tracking-widest"><Calendar size={13} className="text-slate-400" /> Time</span>,
              <span className="flex items-center justify-center gap-1.5 text-[11px] font-black text-brand-navy uppercase tracking-widest"><Zap size={13} className="text-brand-navy/80 fill-brand-navy/10" /> Generation kWh</span>,
              <span className="flex items-center justify-center gap-1.5 text-[11px] font-black text-brand-navy uppercase tracking-widest"><TrendingUp size={13} className="text-slate-400" /> Power kW</span>,
              <span className="flex items-center justify-center gap-1.5 text-[11px] font-black text-brand-navy uppercase tracking-widest"><Sun size={13} className="text-brand-orange/80 animate-spin-slow" /> Weather</span>,
              <span className="flex items-center justify-center gap-1.5 text-[11px] font-black text-brand-navy uppercase tracking-widest"><Info size={13} className="text-brand-navy/80" /> Status</span>
            ]}
            data={filteredTableData}
            minWidth="1000px"
            renderRow={(item, idx) => {
              const globalIdx = idx + 1;
              return (
                <tr key={idx} className="hover:bg-brand-navy/20 transition-colors duration-200 border-b border-slate-100">
                  <td className="px-6 py-3.5 text-center whitespace-nowrap text-[10px] font-black text-slate-400">{globalIdx}</td>
                  <td className="px-6 py-3.5 text-center whitespace-nowrap">
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-3 py-1 rounded-xl">
                      {item.time}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-center whitespace-nowrap text-brand-navy font-black text-sm">
                    {item.generation.toFixed(2)}
                  </td>
                  <td className="px-6 py-3.5 text-center whitespace-nowrap text-slate-700 font-bold">
                    {item.power.toFixed(2)}
                  </td>
                  <td className="px-6 py-3.5 text-center whitespace-nowrap">
                    <div className="inline-flex justify-center">
                      {renderWeatherIcon(item.weather)}
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-center whitespace-nowrap">
                    <div className="inline-flex justify-center">
                      {renderStatusBadge(item.status)}
                    </div>
                  </td>
                </tr>
              );
            }}
            renderCard={(item, idx) => {
              const globalIdx = idx + 1;
              return (
                <div key={idx} className="bg-white/90 backdrop-blur-sm p-2 sm:p-4 rounded-xl sm:rounded-2xl border border-brand-navy/60 shadow-sm hover:shadow-md transition-all duration-200 space-y-1.5 sm:space-y-3">
                  <div className="flex justify-between items-center pb-1.5 sm:pb-2.5 border-b border-slate-100/80">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[8px] sm:text-[10px] font-black text-slate-500">
                        {globalIdx}
                      </span>
                      <span className="text-[9px] sm:text-xs font-black text-slate-800 bg-slate-100 px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg sm:rounded-xl">
                        {item.time}
                      </span>
                    </div>
                    <span className="scale-75 sm:scale-100 origin-right">{renderStatusBadge(item.status)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-3 text-xs bg-slate-50/50 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-slate-100">
                    <div>
                      <span className="text-[6px] sm:text-[8px] uppercase font-black text-slate-400 block tracking-wider mb-0.5">Generation</span>
                      <span className="font-black text-brand-navy text-[10px] sm:text-sm">{item.generation.toFixed(2)} kWh</span>
                    </div>
                    <div>
                      <span className="text-[6px] sm:text-[8px] uppercase font-black text-slate-400 block tracking-wider mb-0.5">Power</span>
                      <span className="font-bold text-slate-800 text-[10px] sm:text-sm">{item.power.toFixed(2)} kW</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-1.5 sm:pt-2.5 border-t border-slate-100/80 text-[7px] sm:text-[10px]">
                    <span className="text-slate-400 font-black uppercase tracking-wider">Weather Conditions</span>
                    <span className="scale-[0.8] sm:scale-[0.95] origin-right">{renderWeatherIcon(item.weather)}</span>
                  </div>
                </div>
              );
            }}
          />
        </div>
      )}

    </div>
  );
}
