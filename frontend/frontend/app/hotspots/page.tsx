"use client";
import React, { useState } from 'react';
import { ShieldAlert, MapPin, Bot, Layers, Compass, Crosshair, CheckCircle, Clock } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import StatisticCard from '../components/StatisticCard';
import MapContainer from '../components/MapContainer';
import TableContainer from '../components/TableContainer';
import ChatInterface from '../components/ChatInterface';

const hotspotKPIs = [
  { title: 'Active Hotspots', value: '18', change: '-2', isPositive: true, icon: 'MapPin' },
  { title: 'Patrol Vectors Mobilized', value: '12 / 16', change: '+3', isPositive: true, icon: 'Shield' },
  { title: 'Avg Response Time', value: '6.4 mins', change: '-1.2m', isPositive: true, icon: 'Clock' },
  { title: 'Density Index Score', value: '84.6', change: '+5.4%', isPositive: false, icon: 'AlertTriangle' },
];

const hotspotList = [
  { id: 'HZ-104', zone: 'Sector 4, Industrial Area', risk: 'Critical', activity: 'High frequency two-wheeler theft', coordinates: '12.9716° N, 77.5946° E', status: '2 Patrols Active' },
  { id: 'HZ-109', zone: 'Downtown Transit Hub', risk: 'High', activity: 'Predicted chain snatching (18:00 - 22:00)', coordinates: '12.9279° N, 77.6271° E', status: '1 Patrol En Route' },
  { id: 'HZ-112', zone: 'Port Zone Outer Dockyard', risk: 'High', activity: 'Unusual shipping container activity', coordinates: '13.0827° N, 80.2707° E', status: 'Monitoring CCTV' },
  { id: 'HZ-120', zone: 'Highway Toll Plaza North', risk: 'Medium', activity: 'Vehicle tracking flagged (SUV MH-04)', coordinates: '12.8315° N, 77.6712° E', status: 'Intercept Planned' },
  { id: 'HZ-122', zone: 'Koramangala Commercial Strip', risk: 'Medium', activity: 'Public nuisance & noise spikes', coordinates: '12.9352° N, 77.6244° E', status: 'Routine Patrol' },
];

export default function HotspotsPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  return (
    <AppLayout>
      <div className="flex h-screen bg-[#EAF4FC] text-[#1F3250] font-sans antialiased overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <TopNavbar />

          <main className="flex-1 p-6 space-y-8 max-w-7xl mx-auto w-full">
            {/* Header Banner */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#C0D1E3] pb-5">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7]">
                    <span className="w-1.5 h-1.5 mr-1.5 bg-[#4CAF50] rounded-full animate-pulse"></span>
                    GIS SERVICE ONLINE
                  </span>
                  <span className="text-xs text-[#526D8E]">| Last synced with GPS Core: Just now</span>
                </div>
                <h1 className="text-2xl font-bold text-[#1A3459] tracking-tight mt-1">
                  Tactical GIS &amp; Hotspot Analytics Map
                </h1>
              </div>
            </div>

            {/* SECTION 1: Metrics */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {hotspotKPIs.map((kpi, idx) => (
                <StatisticCard
                  key={idx}
                  title={kpi.title}
                  value={kpi.value}
                  change={kpi.change}
                  isPositive={kpi.isPositive}
                  icon={kpi.icon}
                />
              ))}
            </section>

            {/* SECTION 2: Map & Detail List */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column (2 span): Big Map */}
              <div className="lg:col-span-2 flex flex-col">
                <MapContainer
                  title="Interactive Geofence & Deployment Canvas"
                  subtitle="Visualizing live crime reports overlaid on coordinate grids"
                >
                  <div className="relative w-full h-[500px] bg-[#EAF4FC] rounded-lg overflow-hidden border border-[#C0D1E3]/80 flex items-center justify-center">
                    {/* Simulated Map Background Grid */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          'radial-gradient(#3E8EDE 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                      }}
                    ></div>

                    {/* Glowing hot zones */}
                    <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-red-400/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Vector lines representing patrol paths */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                      <path d="M 150 120 L 250 170 L 300 350 L 400 320" stroke="#3E8EDE" strokeWidth="2.5" strokeDasharray="6 4" fill="none" />
                      <path d="M 450 180 L 350 280 L 500 420" stroke="#5FA83F" strokeWidth="2.5" strokeDasharray="6 4" fill="none" />
                    </svg>

                    <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between pointer-events-none">
                      {/* Top Overlay controls */}
                      <div className="flex justify-between items-start pointer-events-auto">
                        <div className="bg-white border border-[#B8C6D6] rounded-lg p-3 space-y-1.5 shadow-md">
                          <span className="text-[10px] font-semibold text-[#526D8E] uppercase tracking-wider block">Visual Filters</span>
                          <div className="flex flex-col space-y-1 text-xs text-[#2C4466]">
                            <label className="flex items-center space-x-2"><input type="checkbox" defaultChecked className="rounded" /> <span>Heat Density Overlay</span></label>
                            <label className="flex items-center space-x-2"><input type="checkbox" defaultChecked className="rounded" /> <span>Live Patrol Vectors</span></label>
                            <label className="flex items-center space-x-2"><input type="checkbox" className="rounded" /> <span>CCTV Feeds</span></label>
                          </div>
                        </div>

                        <div className="flex flex-col items-end space-y-2 pointer-events-auto">
                          <div className="bg-white border border-[#B8C6D6] rounded px-2.5 py-1.5 text-[10px] font-mono text-[#2C4466] shadow-md flex items-center space-x-1.5">
                            <Compass className="w-3.5 h-3.5 text-[#1450A0] animate-spin" />
                            <span>GPS CORE LOCK: 12.9716° N</span>
                          </div>
                          {selectedZone && (
                            <div className="bg-white border border-[#3E8EDE]/50 rounded p-2.5 text-xs text-[#1A2B4C] max-w-xs shadow-xl animate-fade-in">
                              <p className="font-bold text-[#1450A0]">{selectedZone}</p>
                              <p className="text-[10px] text-[#526D8E] mt-1">Patrol Team #8 dispatched. Sector frequency: 446.025 MHz.</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Map Pins */}
                      <div className="absolute inset-0 pointer-events-auto">
                        {hotspotList.map((spot, i) => (
                          <div
                            key={spot.id}
                            onClick={() => setSelectedZone(`${spot.id}: ${spot.zone}`)}
                            className={`absolute group cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
                            style={{
                              top: `${20 + (i * 15)}%`,
                              left: `${25 + (i * 12)}%`,
                            }}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-lg hover:scale-110 transition ${
                              spot.risk === 'Critical'
                                ? 'bg-red-100 border-red-500 animate-bounce'
                                : spot.risk === 'High'
                                ? 'bg-orange-100 border-orange-500'
                                : 'bg-amber-100 border-amber-500'
                            }`}>
                              <MapPin className={`w-4 h-4 ${
                                spot.risk === 'Critical' ? 'text-red-600' : 'text-orange-600'
                              }`} />
                            </div>
                            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-white border border-[#B8C6D6] text-[#1A2B4C] text-[10px] rounded p-2 shadow-2xl z-20 whitespace-nowrap">
                              <p className="font-bold">{spot.zone}</p>
                              <p className="text-[#526D8E]">{spot.activity}</p>
                              <p className="text-[#1450A0] mt-0.5">{spot.status}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Legend */}
                      <div className="flex justify-between items-end pointer-events-auto">
                        <div className="bg-white border border-[#B8C6D6] rounded px-3 py-1.5 text-[10px] text-[#526D8E] flex items-center space-x-3 shadow-md">
                          <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-red-200 border border-red-500"></span><span>Critical</span></span>
                          <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-200 border border-orange-500"></span><span>High</span></span>
                          <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-200 border border-amber-500"></span><span>Medium</span></span>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedZone(null);
                            alert("Recalibrating satellite mapping telemetry...");
                          }}
                          className="glass-button-secondary text-[10px] px-3 py-1.5 flex items-center space-x-1.5"
                        >
                          <Crosshair className="w-3.5 h-3.5" />
                          <span>Recalibrate Map</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </MapContainer>
              </div>

              {/* Right Column: Hotspot Details Table */}
              <div className="flex flex-col">
                <TableContainer
                  title="Geospatial Threat Index"
                  subtitle="Detailed parameters for active hotspot buffers"
                >
                  <div className="space-y-4 overflow-y-auto max-h-[500px] mt-4 pr-1">
                    {hotspotList.map((spot) => (
                      <div
                        key={spot.id}
                        onClick={() => setSelectedZone(`${spot.id}: ${spot.zone}`)}
                        className={`p-4 bg-white border border-[#C0D1E3] rounded-lg hover:border-[#3E8EDE]/60 cursor-pointer transition flex flex-col space-y-2`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-[#1450A0]">{spot.id}</span>
                          <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-semibold border ${
                            spot.risk === 'Critical'
                              ? 'bg-red-50 text-red-600 border-red-200'
                              : spot.risk === 'High'
                              ? 'bg-orange-50 text-orange-600 border-orange-200'
                              : 'bg-amber-50 text-amber-600 border-amber-200'
                          }`}>
                            {spot.risk}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#1A3459] leading-snug">{spot.zone}</h4>
                        <p className="text-[11px] text-[#526D8E] leading-normal">{spot.activity}</p>
                        <div className="flex justify-between items-center text-[10px] text-[#657E9E] font-mono pt-1">
                          <span>{spot.coordinates}</span>
                          <span>{spot.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TableContainer>
              </div>
            </section>
          </main>
        </div>

        {/* FLOATING BUTTON: Ask Crime AI */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsChatOpen(true)}
            className="glass-button flex items-center space-x-3 px-5 py-3.5 rounded-full shadow-2xl"
          >
            <Bot className="w-5 h-5" />
            <span className="tracking-wide font-semibold">Ask Crime AI</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
          </button>
        </div>

        {/* Chat Interface Drawer */}
        {isChatOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div
              className="absolute inset-0 bg-[#1A3459]/20 backdrop-blur-sm transition-opacity"
              onClick={() => setIsChatOpen(false)}
            ></div>

            <div className="relative w-full max-w-lg bg-white border-l border-[#C0D1E3] flex flex-col h-full shadow-2xl">
              <div className="glass-header flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-white" />
                  <h3 className="font-bold text-white text-base">Crime Intelligence Assistant</h3>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-white/80 hover:text-white transition p-1 rounded font-mono text-base"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-hidden p-6 bg-[#EAF4FC] flex flex-col">
                <ChatInterface />
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
