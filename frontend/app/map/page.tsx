"use client";
import React, { useState } from 'react';
import { Search, Layers, MapPin, Shield, AlertTriangle, Crosshair, Bot, X, Radio } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import StatisticCard from '../components/StatisticCard';
import MapContainer from '../components/MapContainer';
import ChatInterface from '../components/ChatInterface';
import KarnatakaMap from '../components/KarnatakaMap';

const kpis = [
  { title: 'Active Crime Zones', value: '18', change: '-2', isPositive: true, icon: 'MapPin' },
  { title: 'Police Stations', value: '14 Online', change: '100%', isPositive: true, icon: 'Shield' },
  { title: 'Active Patrol Units', value: '12 / 16', change: '+3', isPositive: true, icon: 'Users' },
];

const crimeMarkers = [
  { id: 'm1', label: 'Zone 4 - Gang Activity', risk: 'Critical', top: '28%', left: '35%', activity: '2 patrols dispatched', type: 'crime' },
  { id: 'm2', label: 'Transit Hub - Snatching', risk: 'High', top: '55%', left: '20%', activity: 'Patrol en route', type: 'crime' },
  { id: 'm3', label: 'Port Outer Dockyard', risk: 'High', top: '70%', left: '58%', activity: 'CCTV monitoring', type: 'crime' },
  { id: 'm4', label: 'North Toll Plaza', risk: 'Medium', top: '18%', left: '60%', activity: 'Intercept planned', type: 'crime' },
  { id: 'm5', label: 'South West Market', risk: 'Low', top: '75%', left: '40%', activity: 'Routine patrol', type: 'crime' },
];

const stationMarkers = [
  { id: 'ps1', label: 'North District HQ', units: '8/12', top: '22%', left: '18%' },
  { id: 'ps2', label: 'Cyber Cell East', units: '5/5', top: '55%', left: '72%' },
  { id: 'ps3', label: 'Port Zone Station', units: '6/8', top: '80%', left: '65%' },
];

const riskColors: Record<string, string> = {
  Critical: 'border-red-500 bg-red-100 text-red-600',
  High: 'border-orange-500 bg-orange-100 text-orange-600',
  Medium: 'border-amber-500 bg-amber-100 text-amber-600',
  Low: 'border-[#B8C6D6] bg-[#EAF4FC] text-[#526D8E]',
};

export default function MapPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [layers, setLayers] = useState({ heatmap: true, stations: true, crimeZones: true, cctv: false, patrols: true });
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [filterRisk, setFilterRisk] = useState('All');

  const toggleLayer = (key: keyof typeof layers) => setLayers(l => ({ ...l, [key]: !l[key] }));

  const visibleCrimeMarkers = crimeMarkers.filter(m =>
    (filterRisk === 'All' || m.risk === filterRisk) &&
    m.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="flex h-screen bg-[#EAF4FC] text-[#1F3250] font-sans antialiased overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <TopNavbar />
          <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
            {/* Header */}
            <div className="border-b border-[#C0D1E3] pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7] mb-1">
                  <span className="w-1.5 h-1.5 mr-1.5 bg-[#4CAF50] rounded-full animate-pulse"></span>
                  GIS CORE ONLINE
                </span>
                <h1 className="text-2xl font-bold text-[#1A3459] tracking-tight">Live Crime Intelligence Map</h1>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#657E9E]" />
                  <input
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search crime zones..."
                    className="bg-white border border-[#C0D1E3] rounded-lg pl-9 pr-3 py-2 text-xs text-[#1A2B4C] focus:outline-none focus:ring-1 focus:ring-blue-500 w-52"
                  />
                </div>
                <select
                  value={filterRisk}
                  onChange={e => setFilterRisk(e.target.value)}
                  className="bg-white border border-[#C0D1E3] rounded-lg px-3 py-2 text-xs text-[#1A2B4C] focus:outline-none"
                >
                  <option value="All">All Risk Levels</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((k, i) => <StatisticCard key={i} {...k} />)}
            </div>

            {/* Map + Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Map takes 3 cols */}
              <div className="lg:col-span-3">
                <KarnatakaMap />
              </div>

              {/* Right Panel: Zone list */}
              <div className="panel-surface flex flex-col space-y-3 p-4 lg:col-span-1">
                <h3 className="text-xs font-bold text-[#1A3459] border-b border-[#C0D1E3] pb-2">Active Threat Zones</h3>
                <div className="space-y-2 overflow-y-auto flex-1">
                  {visibleCrimeMarkers.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMarker(m.id)}
                      className={`w-full text-left p-3 rounded-lg border transition ${selectedMarker === m.id ? 'border-[#3E8EDE]/60 bg-blue-50' : 'border-[#C0D1E3] bg-white hover:border-[#3E8EDE]/40'}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${riskColors[m.risk]}`}>{m.risk}</span>
                      </div>
                      <p className="text-xs font-semibold text-[#1A3459] leading-snug">{m.label}</p>
                      <p className="text-[11px] text-[#657E9E] mt-0.5">{m.activity}</p>
                    </button>
                  ))}
                  {visibleCrimeMarkers.length === 0 && (
                    <div className="text-center text-[#657E9E] text-xs py-8">No zones match current filters.</div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* FAB */}
        <div className="fixed bottom-6 right-6 z-50">
          <button onClick={() => setIsChatOpen(true)} className="glass-button flex items-center space-x-2.5 px-5 py-3 rounded-full shadow-2xl text-sm">
            <Bot className="w-5 h-5" />
            <span>Ask Crime AI</span>
          </button>
        </div>

        {isChatOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-[#1A3459]/20 backdrop-blur-sm" onClick={() => setIsChatOpen(false)}></div>
            <div className="relative w-full max-w-lg bg-white border-l border-[#C0D1E3] flex flex-col h-full shadow-2xl">
              <div className="glass-header flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-2"><Bot className="w-5 h-5 text-white" /><h3 className="font-bold text-white text-sm">Crime Intelligence Assistant</h3></div>
                <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white p-1 rounded"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 overflow-hidden p-4 bg-[#EAF4FC]"><ChatInterface /></div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
