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
import KarnatakaMap from '../components/KarnatakaMap';

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
                <KarnatakaMap />
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
