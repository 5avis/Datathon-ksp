"use client";
import React, { useState } from 'react';
import { ShieldAlert, Bot, Bell, Volume2, Wifi, Send } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import StatisticCard from '../components/StatisticCard';
import AlertCard from '../components/AlertCard';
import ChatInterface from '../components/ChatInterface';

const emergencyKPIs = [
  { title: 'Emergency Queue', value: '38 Alerts', change: '+4 Today', isPositive: false, icon: 'AlertTriangle' },
  { title: 'SWAT deployments', value: '2 Active', change: '+1', isPositive: false, icon: 'Shield' },
  { title: 'Acoustic Gunshot Alarms', value: '1 Signal', change: 'En Route', isPositive: false, icon: 'Volume2' },
  { title: 'Dispatcher Status', value: 'Active', change: '8 Dispatchers', isPositive: true, icon: 'CheckCircle' },
];

const initialAlerts = [
  { id: 'ALT-901', type: 'Gang Activity', severity: 'Critical' as const, location: 'Zone 4, Industrial Wasteland', time: '2 mins ago', description: 'Armed gathering reported by automated acoustic gunshot sensor.' },
  { id: 'ALT-902', type: 'Cyber Fraud', severity: 'High' as const, location: 'Server Node / Cyber Cell D-2', time: '14 mins ago', description: 'Mass phishing campaign targeting state pension accounts actively draining funds.' },
  { id: 'ALT-903', type: 'Kidnapping', severity: 'Critical' as const, location: 'Highway Toll Plaza, North Exit', time: '31 mins ago', description: 'Black SUV (MH-04-AB-1234) flagged in distress alert. Intercept vectors calculated.' },
  { id: 'ALT-904', type: 'Robbery', severity: 'Medium' as const, location: 'National Bank, West branch', time: '45 mins ago', description: 'Silent vault alarm triggered. Patrol Unit 14 dispatched.' },
  { id: 'ALT-905', type: 'Assault Report', severity: 'High' as const, location: 'Central Commercial Plaza', time: '1 hour ago', description: '911 call reporting active physical altercation outside Metro Gate 1.' },
  { id: 'ALT-906', type: 'Vandalism', severity: 'Medium' as const, location: 'Sector 12 Public Park', time: '2 hours ago', description: 'CCTV analytics detected unauthorized graffiti and damage to infrastructure.' },
];

export default function EmergenciesPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [dispatchToast, setDispatchToast] = useState<string | null>(null);

  const handleDispatch = (alertId: string) => {
    console.log(`Dispatching unit for emergency ${alertId}`);
    const alert = alerts.find(a => a.id === alertId);
    setDispatchToast(`🚨 Mobilizing response teams for ${alert?.type || 'emergency'} at ${alert?.location || 'scene'}.`);
    
    // Simulate removing from queue or updating status
    setTimeout(() => {
      setDispatchToast(null);
      setAlerts(prev => prev.filter(a => a.id !== alertId));
    }, 4000);
  };

  return (
    <AppLayout>
      <div className="flex h-screen bg-[#EAF4FC] text-[#1F3250] font-sans antialiased overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <TopNavbar />

          <main className="flex-1 p-6 space-y-8 max-w-7xl mx-auto w-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#C0D1E3] pb-5">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-red-50 text-red-600 border border-red-200">
                    <span className="w-1.5 h-1.5 mr-1.5 bg-red-500 rounded-full animate-ping"></span>
                    PRIORITY DISPATCH DISCIPLINE
                  </span>
                  <span className="text-xs text-[#526D8E]">| Acoustic gunshot sensors: 100% operational</span>
                </div>
                <h1 className="text-2xl font-bold text-[#1A3459] tracking-tight mt-1">
                  Tactical Emergency Queue &amp; Dispatch Control
                </h1>
              </div>
            </div>

            {/* SECTION 1: Metrics */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {emergencyKPIs.map((kpi, idx) => (
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

            {/* SECTION 2: Queue Content */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column (2 span): Main emergencies list */}
              <div className="lg:col-span-2 flex flex-col space-y-4">
                <div className="panel-surface p-5">
                  <div className="flex items-center justify-between border-b border-[#C0D1E3] pb-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-5 h-5 text-red-500" />
                      <h3 className="font-semibold text-[#1A3459]">Pending Dispatch Emergency Queue</h3>
                    </div>
                    <span className="text-xs text-[#526D8E] font-mono">{alerts.length} ALERTS ACTIVE</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {alerts.map((alert) => (
                      <AlertCard
                        key={alert.id}
                        title={alert.type}
                        severity={alert.severity}
                        location={alert.location}
                        time={alert.time}
                        description={alert.description}
                        onDispatch={() => handleDispatch(alert.id)}
                      />
                    ))}
                    {alerts.length === 0 && (
                      <div className="col-span-full py-12 text-center text-[#657E9E] text-xs border border-dashed border-[#C0D1E3] rounded-lg">
                        All emergency dispatches processed and resolved. No items currently in queue.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Acoustic Threat Detection telemetry & Logs */}
              <div className="panel-surface flex flex-col justify-between p-5">
                <div>
                  <div className="border-b border-[#C0D1E3] pb-3 mb-4">
                    <div className="flex items-center space-x-2 text-[#1450A0]">
                      <Volume2 className="w-5 h-5 animate-pulse" />
                      <h3 className="font-semibold text-[#1A3459]">Acoustic Threat Stream</h3>
                    </div>
                    <p className="text-xs text-[#526D8E] mt-0.5">Real-time decibel & frequency spikes</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3 bg-red-50 rounded border border-red-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-red-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5 animate-ping"></span>
                          GUNSHOT MATCH (94.8%)
                        </span>
                        <span className="text-[9px] font-mono text-[#657E9E]">23:38:12</span>
                      </div>
                      <p className="text-[11px] text-[#526D8E]">Acoustic node #802 (Sector 4) recorded 138dB transient sound matching muzzle signature. Triangulating coordinates...</p>
                    </div>

                    <div className="p-3 bg-[#EAF4FC] rounded border border-[#C0D1E3] space-y-2 opacity-70">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-[#526D8E]">DECIBEL SPIKE (88.1%)</span>
                        <span className="text-[9px] font-mono text-[#657E9E]">22:45:00</span>
                      </div>
                      <p className="text-[11px] text-[#526D8E]">Node #814 (Transit Hub) logged 104dB frequency spike. Potential civil assembly. Vector patterns normal.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#C0D1E3] mt-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#657E9E]">
                    <span>Acoustic Network status:</span>
                    <span className="text-[#2E7D32] font-bold flex items-center">
                      <Wifi className="w-3.5 h-3.5 mr-1" />
                      ONLINE
                    </span>
                  </div>
                  <button
                    onClick={() => alert("Acoustic calibration initialized...")}
                    className="glass-button-secondary w-full py-2 text-xs font-semibold font-mono"
                  >
                    CALIBRATE SENSOR GRIDS
                  </button>
                </div>
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

        {/* Dispatch Toast */}
        {dispatchToast && (
          <div className="fixed bottom-24 right-6 z-50 bg-white border-2 border-[#3E8EDE] text-[#1A2B4C] rounded-lg px-5 py-3.5 shadow-2xl flex items-center space-x-3 animate-bounce">
            <span className="text-xl">🚀</span>
            <span className="text-xs font-medium font-mono tracking-tight">{dispatchToast}</span>
          </div>
        )}

        {/* Chat Drawer */}
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
