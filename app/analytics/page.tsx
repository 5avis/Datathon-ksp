"use client";
import React, { useState } from 'react';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts';
import { Bot, X, Filter } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import StatisticCard from '../components/StatisticCard';
import ChartContainer from '../components/ChartContainer';
import ChatInterface from '../components/ChatInterface';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const monthlyTrend = [
  { month: 'Jan', violent: 120, property: 340, cyber: 180, financial: 90 },
  { month: 'Feb', violent: 132, property: 310, cyber: 210, financial: 105 },
  { month: 'Mar', violent: 101, property: 290, cyber: 250, financial: 130 },
  { month: 'Apr', violent: 145, property: 380, cyber: 280, financial: 160 },
  { month: 'May', violent: 160, property: 420, cyber: 310, financial: 190 },
  { month: 'Jun', violent: 138, property: 390, cyber: 350, financial: 210 },
  { month: 'Jul', violent: 155, property: 430, cyber: 390, financial: 240 },
];

const districtData = [
  { district: 'Central Metro', cases: 842 },
  { district: 'North District', cases: 610 },
  { district: 'South West', cases: 530 },
  { district: 'Cyber Cell East', cases: 410 },
  { district: 'Port Zone', cases: 370 },
  { district: 'Financial Cell', cases: 290 },
];

const categoryPie = [
  { name: 'Violent Crime', value: 28 },
  { name: 'Property Crime', value: 35 },
  { name: 'Cyber Fraud', value: 18 },
  { name: 'Financial Crime', value: 10 },
  { name: 'Drug Trafficking', value: 9 },
];
const PIE_COLORS = ['#D32F2F', '#F57C00', '#1976D2', '#388E3C', '#7B1FA2'];

const radarData = [
  { category: 'Violent', A: 120, B: 88 }, { category: 'Property', A: 98, B: 130 },
  { category: 'Cyber', A: 86, B: 100 }, { category: 'Financial', A: 99, B: 80 },
  { category: 'Narcotics', A: 85, B: 90 }, { category: 'Organized', A: 65, B: 75 },
];

const kpis = [
  { title: 'Total Crimes (YTD)', value: '14,289', change: '+5.2%', isPositive: false, icon: 'AlertTriangle' },
  { title: 'Resolved Cases', value: '11,203', change: '+3.6%', isPositive: true, icon: 'CheckCircle' },
  { title: 'Cyber Crime YoY', value: '+38.4%', change: 'Highest Growth', isPositive: false, icon: 'TrendingUp' },
  { title: 'Crime Rate Index', value: '84.6', change: '-2.1 pts', isPositive: true, icon: 'BarChart2' },
];

const TOOLTIP_STYLE = {
  contentStyle: { backgroundColor: '#FFFFFF', borderColor: '#99BCE0', borderRadius: '0.375rem', color: '#1450A0', fontSize: '11px', boxShadow: '0 4px 12px rgba(20,80,160,0.15)' },
};

export default function AnalyticsPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('7months');

  return (
    <AppLayout>
      <div className="flex h-screen bg-[#EAF4FC] text-[#1F3250] font-sans antialiased overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <TopNavbar />
          <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
            {/* Header */}
            <div className="border-b border-[#C0D1E3] pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-[#EAF4FC] text-[#1450A0] border border-[#99BCE0] mb-1">
                  <span className="w-1.5 h-1.5 mr-1.5 bg-[#3E8EDE] rounded-full animate-pulse"></span>
                  ANALYTICS ENGINE ACTIVE
                </span>
                <h1 className="text-xl font-black text-[#1450A0] tracking-wide">Crime Analytics &amp; Statistical Intelligence</h1>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-[#526D8E]" />
                <select
                  value={timeRange}
                  onChange={e => setTimeRange(e.target.value)}
                  className="glass-input text-xs font-bold"
                >
                  <option value="7months">Last 7 Months</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="ytd">Year to Date</option>
                </select>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((k, i) => <StatisticCard key={i} {...k} />)}
            </div>

            {/* Row 1: Multi-domain trend line chart */}
            <ChartContainer title="Multi-Domain Crime Vector Trends" subtitle="Tracking violent, property, cyber, and financial crime indices over time">
              <div className="h-72 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#C0D1E3" opacity={0.7} />
                    <XAxis dataKey="month" stroke="#4A668C" fontSize={11} tickLine={false} />
                    <YAxis stroke="#4A668C" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip {...TOOLTIP_STYLE} />
                    <Legend wrapperStyle={{ fontSize: '11px', color: '#1A3E70' }} />
                    <Line type="monotone" name="Violent" dataKey="violent" stroke="#D32F2F" strokeWidth={2.5} dot={{ r: 3 }} />
                    <Line type="monotone" name="Property" dataKey="property" stroke="#F57C00" strokeWidth={2.5} dot={{ r: 3 }} />
                    <Line type="monotone" name="Cyber Fraud" dataKey="cyber" stroke="#1976D2" strokeWidth={2.5} dot={{ r: 3 }} />
                    <Line type="monotone" name="Financial" dataKey="financial" stroke="#388E3C" strokeWidth={2.5} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>

            {/* Row 2: District bar + Category pie */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartContainer title="District-wise Case Volume Comparison" subtitle="Total registered FIRs by policing district">
                <div className="h-64 pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={districtData} margin={{ top: 5, right: 10, left: 0, bottom: 20 }} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#C0D1E3" opacity={0.7} horizontal={false} />
                      <XAxis type="number" stroke="#4A668C" fontSize={11} tickLine={false} />
                      <YAxis type="category" dataKey="district" stroke="#4A668C" fontSize={10} tickLine={false} width={110} />
                      <Tooltip {...TOOLTIP_STYLE} />
                      <Bar dataKey="cases" fill="#3E8EDE" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartContainer>

              <ChartContainer title="Crime Category Distribution" subtitle="Proportional breakdown of all registered crime types">
                <div className="h-64 pt-4 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryPie} cx="50%" cy="50%" outerRadius={80} innerRadius={40} dataKey="value" paddingAngle={3}>
                        {categoryPie.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                      </Pie>
                      <Tooltip {...TOOLTIP_STYLE} formatter={(val: any) => [`${val}%`, '']} />
                      <Legend wrapperStyle={{ fontSize: '11px', color: '#1A3E70' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </ChartContainer>
            </div>

            {/* Row 3: Radar chart */}
            <ChartContainer title="YoY Crime Category Radar Comparison" subtitle="Current year vs prior year crime category index scores">
              <div className="h-72 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={100}>
                    <PolarGrid stroke="#C0D1E3" />
                    <PolarAngleAxis dataKey="category" tick={{ fill: '#4A668C', fontSize: 11 }} />
                    <Radar name="Current Year" dataKey="A" stroke="#1976D2" fill="#1976D2" fillOpacity={0.25} />
                    <Radar name="Prior Year" dataKey="B" stroke="#D32F2F" fill="#D32F2F" fillOpacity={0.15} />
                    <Legend wrapperStyle={{ fontSize: '11px', color: '#1A3E70' }} />
                    <Tooltip {...TOOLTIP_STYLE} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>

          </main>
        </div>

        {/* FAB */}
        <div className="fixed bottom-6 right-6 z-50">
          <button onClick={() => setIsChatOpen(true)} className="flex items-center space-x-2.5 px-4 py-2.5 glass-button shadow-xl text-xs font-bold uppercase tracking-wide">
            <Bot className="w-4 h-4" />
            <span>Ask Crime AI</span>
          </button>
        </div>

        {isChatOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-[#142B4C]/40 backdrop-blur-xs" onClick={() => setIsChatOpen(false)}></div>
            <div className="relative w-full max-w-lg bg-white border-l border-[#99BCE0] flex flex-col h-full shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 glass-header">
                <div className="flex items-center space-x-2"><Bot className="w-4 h-4 text-white" /><h3 className="font-bold text-white text-xs">Crime Intelligence Assistant</h3></div>
                <button onClick={() => setIsChatOpen(false)} className="glass-button-secondary p-1 text-[#1450A0] rounded"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 overflow-hidden p-4 bg-[#F2F7FC]"><ChatInterface /></div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
