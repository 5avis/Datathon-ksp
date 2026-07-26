"use client";
import React, { useState } from 'react';
import ReactFlow, { Background, Controls, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Bot, Network, ShieldAlert, CheckCircle2, Clock, MapPin, ExternalLink, X } from 'lucide-react';

// Imported existing components
import AppLayout from './components/AppLayout';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import StatisticCard from './components/StatisticCard';
import TrendCard from './components/TrendCard';
import InsightCard from './components/InsightCard';
import AlertCard from './components/AlertCard';
import ChartContainer from './components/ChartContainer';
import MapContainer from './components/MapContainer';
import TableContainer from './components/TableContainer';
import ChatInterface from './components/ChatInterface';

// --- MOCK DATA ---

const kpiData = [
  { title: 'Total FIRs', value: '14,289', change: '+5.2%', isPositive: false, icon: 'FileText' },
  { title: 'Pending Investigations', value: '1,842', change: '-2.4%', isPositive: true, icon: 'Clock' },
  { title: 'Repeat Offenders', value: '642', change: '+12.1%', isPositive: false, icon: 'Users' },
  { title: 'High Priority Alerts', value: '38', change: '+4', isPositive: false, icon: 'AlertTriangle' },
  { title: 'Organized Crime Groups', value: '24', change: '0%', isPositive: true, icon: 'Shield' },
  { title: 'Crime Hotspots', value: '18', change: '-3', isPositive: true, icon: 'MapPin' },
  { title: 'Financial Crime Cases', value: '892', change: '+18.4%', isPositive: false, icon: 'DollarSign' },
  { title: 'Case Resolution Rate', value: '78.4%', change: '+3.6%', isPositive: true, icon: 'CheckCircle' },
];

const crimeTrendData = [
  { month: 'Jan', violent: 120, property: 340, cyber: 180, financial: 90 },
  { month: 'Feb', violent: 132, property: 310, cyber: 210, financial: 105 },
  { month: 'Mar', violent: 101, property: 290, cyber: 250, financial: 130 },
  { month: 'Apr', violent: 145, property: 380, cyber: 280, financial: 160 },
  { month: 'May', violent: 160, property: 420, cyber: 310, financial: 190 },
  { month: 'Jun', violent: 138, property: 390, cyber: 350, financial: 210 },
  { month: 'Jul', violent: 155, property: 430, cyber: 390, financial: 240 },
];

const aiInsights = [
  {
    id: 1,
    title: 'Vehicle Theft Increased',
    description: 'Anomalous 24% spike in two-wheeler thefts detected across Sector 4 and North District over the last 48 hours.',
    confidence: 94,
    timestamp: '10 mins ago',
    type: 'warning' as const,
  },
  {
    id: 2,
    title: 'Gang Activity Detected',
    description: 'Cross-referencing encrypted comms and CCTV suggests Syndicate-B restructuring near industrial zones.',
    confidence: 88,
    timestamp: '25 mins ago',
    type: 'critical' as const,
  },
  {
    id: 3,
    title: 'Crime Hotspot Prediction',
    description: 'High probability (82%) of snatching incidents predicted in Downtown Transit Hub between 18:00 and 22:00.',
    confidence: 82,
    timestamp: '1 hour ago',
    type: 'prediction' as const,
  },
  {
    id: 4,
    title: 'Repeat Offender Detected',
    description: 'Facial recognition match (99.1%) for parole violator Vikram "Vicky" Sharma at Metro Station Gate 3.',
    confidence: 99,
    timestamp: '2 hours ago',
    type: 'alert' as const,
  },
];

const liveAlerts = [
  {
    id: 'ALT-901',
    type: 'Gang Activity',
    severity: 'Critical' as const,
    location: 'Zone 4, Industrial Wasteland',
    time: '2 mins ago',
    description: 'Armed gathering reported by automated acoustic gunshot sensor.',
  },
  {
    id: 'ALT-902',
    type: 'Cyber Fraud',
    severity: 'High' as const,
    location: 'Server Node / Cyber Cell D-2',
    time: '14 mins ago',
    description: 'Mass phishing campaign targeting state pension accounts actively draining funds.',
  },
  {
    id: 'ALT-903',
    type: 'Kidnapping',
    severity: 'Critical' as const,
    location: 'Highway Toll Plaza, North Exit',
    time: '31 mins ago',
    description: 'Black SUV (MH-04-AB-1234) flagged in distress alert. Intercept vectors calculated.',
  },
  {
    id: 'ALT-904',
    type: 'Robbery',
    severity: 'Medium' as const,
    location: 'National Bank, West branch',
    time: '45 mins ago',
    description: 'Silent vault alarm triggered. Patrol Unit 14 dispatched.',
  },
];

const recentFIRs = [
  { fir: 'FIR-2026-8891', crime: 'Armed Robbery', district: 'Central Metro', officer: 'Insp. R. Rathore', status: 'Active Investigation', date: '2026-07-20' },
  { fir: 'FIR-2026-8890', crime: 'Cyber Extortion', district: 'Cyber Cell East', officer: 'Sub-Insp. A. Sharma', status: 'Forensics Review', date: '2026-07-20' },
  { fir: 'FIR-2026-8889', crime: 'Vehicle Theft', district: 'North District', officer: 'Insp. T. Deshmukh', status: 'Suspect Identified', date: '2026-07-19' },
  { fir: 'FIR-2026-8888', crime: 'Narcotics Trafficking', district: 'Port Zone', officer: 'ACP K. Varma', status: 'Charge Sheet Filed', date: '2026-07-19' },
  { fir: 'FIR-2026-8887', crime: 'Assault & Battery', district: 'South West', officer: 'Insp. M. Ali', status: 'Court Proceedings', date: '2026-07-18' },
];

const timelineSteps = [
  { stage: 'FIR Registered', detail: 'Case #8891 officially logged in Crime & Criminal Tracking Network.', date: 'July 20, 08:30 AM', status: 'completed' },
  { stage: 'Evidence', detail: 'CCTV footage recovered from 4 traffic intersections; bullet casing ballistic match pending.', date: 'July 20, 11:15 AM', status: 'completed' },
  { stage: 'Witness', detail: 'Primary statement recorded from bank security guard and 2 civilian bystanders.', date: 'July 20, 02:00 PM', status: 'completed' },
  { stage: 'Forensics', detail: 'AI fingerprint enhancement identified partial match to Syndicate-B database.', date: 'In Progress', status: 'active' },
  { stage: 'Arrest', detail: 'Special Weapons Tactical team deployed to suspected hideout in Sector 18.', date: 'Pending', status: 'pending' },
  { stage: 'Charge Sheet', detail: 'Drafting preliminary prosecution dossier under BNSS Section 309.', date: 'Pending', status: 'pending' },
  { stage: 'Court', detail: 'Fast-track sessions court assignment pending arrest confirmation.', date: 'Pending', status: 'pending' },
];

// React Flow Mock Nodes & Edges for Criminal Network Preview
const initialNodes: Node[] = [
  { id: '1', type: 'input', data: { label: '🔴 Accused: R. "Bhai" Singh' }, position: { x: 250, y: 20 }, style: { background: '#FDE8E8', color: '#9B1C1C', border: '2px solid #F89999', borderRadius: '10px', fontWeight: 'bold', fontSize: '11px', padding: '8px 12px' } },
  { id: '2', data: { label: '📱 Phone: +91 98XXX-XXXXX' }, position: { x: 80, y: 120 }, style: { background: '#FFFFFF', color: '#1F3250', border: '1px solid #B8C6D6', borderRadius: '10px', fontSize: '11px', padding: '6px 10px' } },
  { id: '3', data: { label: '🏦 Shell Account #4492' }, position: { x: 250, y: 120 }, style: { background: '#FFFFFF', color: '#1F3250', border: '1px solid #B8C6D6', borderRadius: '10px', fontSize: '11px', padding: '6px 10px' } },
  { id: '4', data: { label: '🚗 SUV: MH-04-AB-1234' }, position: { x: 420, y: 120 }, style: { background: '#FFFFFF', color: '#1F3250', border: '1px solid #3E8EDE', borderRadius: '10px', fontSize: '11px', padding: '6px 10px' } },
  { id: '5', data: { label: '📍 Warehouse, Sector-18' }, position: { x: 160, y: 220 }, style: { background: '#FFFFFF', color: '#1F3250', border: '1px solid #3E8EDE', borderRadius: '10px', fontSize: '11px', padding: '6px 10px' } },
  { id: '6', data: { label: '🟡 Victim: Diamond Jewellers' }, position: { x: 350, y: 220 }, style: { background: '#FFF8E1', color: '#B76E00', border: '1px solid #FFE082', borderRadius: '10px', fontSize: '11px', padding: '6px 10px' } },
  { id: '7', type: 'output', data: { label: '📁 Evidence: Ballistics & CCTV #8891' }, position: { x: 250, y: 320 }, style: { background: '#EBF7E6', color: '#2B6317', border: '2px solid #81C765', borderRadius: '10px', fontWeight: 'bold', fontSize: '11px', padding: '8px 12px' } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#4FC3F7', strokeWidth: 1.5 } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#4FC3F7', strokeWidth: 1.5 } },
  { id: 'e1-4', source: '1', target: '4', animated: true, style: { stroke: '#4FC3F7', strokeWidth: 1.5 } },
  { id: 'e2-5', source: '2', target: '5', style: { stroke: '#334155' } },
  { id: 'e3-6', source: '3', target: '6', label: 'Wire Transfer', style: { stroke: '#EF4444', strokeWidth: 1.5 }, labelStyle: { fill: '#F87171', fontSize: 10 } },
  { id: 'e4-6', source: '4', target: '6', label: 'At Scene', style: { stroke: '#F59E0B', strokeWidth: 1.5 }, labelStyle: { fill: '#FBBF24', fontSize: 10 } },
  { id: 'e5-7', source: '5', target: '7', style: { stroke: '#10B981', strokeWidth: 1.5 } },
  { id: 'e6-7', source: '6', target: '7', style: { stroke: '#10B981', strokeWidth: 1.5 } },
];

export default function Dashboard() {
  const [nodes] = useState<Node[]>(initialNodes);
  const [edges] = useState<Edge[]>(initialEdges);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [dispatchToast, setDispatchToast] = useState<string | null>(null);

  const handleDispatch = (alertId: string) => {
    console.log(`Dispatching unit for alert ${alertId}`);
    const alert = liveAlerts.find(a => a.id === alertId);
    setDispatchToast(`🚨 Mobilizing response teams for ${alert?.type || 'emergency'} at ${alert?.location || 'scene'}.`);
    setTimeout(() => {
      setDispatchToast(null);
    }, 4000);
  };

  return (
    <AppLayout>
      <div className="flex h-screen bg-[#EAF4FC] text-[#1F3250] font-sans antialiased overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Navbar */}
          <TopNavbar />

          <main className="flex-1 p-6 space-y-8 max-w-7xl mx-auto w-full">
            {/* Header Banner */}
            <div className="glass-card p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-[#FDE8E8] text-[#9B1C1C] border border-[#F89999] shadow-sm">
                    <span className="w-2 h-2 mr-1.5 inline-block bg-[#D32F2F] rounded-full animate-pulse"></span>
                    DEFCON-2 ACTIVE
                  </span>
                  <span className="text-xs font-mono text-[#526D8E]">| National Crime Grid Sync: 99.9%</span>
                </div>
                <h1 className="text-xl font-black text-[#1450A0] tracking-wide mt-1">
                  AI Crime Intelligence &amp; Tactical Dispatch
                </h1>
              </div>
              <div className="mt-3 md:mt-0 flex items-center space-x-2.5">
                <button
                  onClick={() => alert("Dossier exported to local server.")}
                  className="glass-button-secondary px-3.5 py-1.5 text-xs font-bold"
                >
                  Export Dossier
                </button>
                <button
                  onClick={() => alert("Creating new tactical operation...")}
                  className="glass-button-green px-4 py-1.5 text-xs font-bold"
                >
                  + New Tactical Operation
                </button>
              </div>
            </div>

            {/* SECTION 1: Responsive 8 KPI cards */}
            <section>
              <h2 className="section-title mb-4">
                Real-Time Operational Telemetry
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiData.map((kpi, idx) => (
                  <StatisticCard
                    key={idx}
                    title={kpi.title}
                    value={kpi.value}
                    change={kpi.change}
                    isPositive={kpi.isPositive}
                    icon={kpi.icon}
                  />
                ))}
              </div>
            </section>

            {/* SECTION 2: Left - Crime Trend Line Chart, Right - AI Crime Insights */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column (2 span): Recharts Line Chart inside ChartContainer */}
              <div className="lg:col-span-2 flex flex-col">
                <ChartContainer
                  title="Multi-Domain Crime Vector Trends (6-Month Telemetry)"
                  subtitle="Aggregating violent, property, cyber, and financial crime indices"
                >
                  <div className="h-[360px] w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={crimeTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#C0D1E3" opacity={0.7} />
                        <XAxis dataKey="month" stroke="#4A668C" fontSize={11} tickLine={false} />
                        <YAxis stroke="#4A668C" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#99BCE0',
                            borderRadius: '0.375rem',
                            color: '#1450A0',
                            boxShadow: '0 4px 12px rgba(20,80,160,0.15)',
                            fontSize: '11px',
                          }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px', color: '#1A3E70' }} />
                        <Line type="monotone" name="Violent Crime" dataKey="violent" stroke="#D32F2F" strokeWidth={2.5} dot={{ r: 3, fill: '#D32F2F' }} activeDot={{ r: 5 }} />
                        <Line type="monotone" name="Property Crime" dataKey="property" stroke="#F57C00" strokeWidth={2.5} dot={{ r: 3, fill: '#F57C00' }} activeDot={{ r: 5 }} />
                        <Line type="monotone" name="Cyber Fraud" dataKey="cyber" stroke="#1976D2" strokeWidth={2.5} dot={{ r: 3, fill: '#1976D2' }} activeDot={{ r: 5 }} />
                        <Line type="monotone" name="Financial" dataKey="financial" stroke="#388E3C" strokeWidth={2.5} dot={{ r: 3, fill: '#388E3C' }} activeDot={{ r: 5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </ChartContainer>
              </div>

              {/* Right Column: AI Crime Insights using InsightCard */}
              <div className="glass-card flex flex-col space-y-3 p-4">
                <div className="flex items-center justify-between border-b border-[#C0D1E3] pb-2.5">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-[#3E8EDE]" />
                    <h3 className="font-bold text-[#1450A0] text-xs">AI Crime Insights</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#EAF4FC] text-[#1450A0] border border-[#99BCE0] font-mono font-bold">
                    CRIME-BERT-v4
                  </span>
                </div>
                <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1">
                  {aiInsights.map((insight) => (
                    <InsightCard
                      key={insight.id}
                      title={insight.title}
                      description={insight.description}
                      confidence={insight.confidence}
                      timestamp={insight.timestamp}
                      type={insight.type}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 3: Left - Crime Hotspot Map, Right - Live Alerts */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column (2 span): Crime Hotspot Map */}
              <div className="lg:col-span-2 flex flex-col">
                <MapContainer
                  title="Live Crime Hotspot & Tactical Deployment Map"
                  subtitle="Heatmap overlays, police stations, active crime zones, and patrol vectors"
                >
                  <div className="relative w-full h-[420px] bg-[#F4F9FD] rounded-md overflow-hidden border border-[#B8C6D6] flex items-center justify-center">
                    {/* Simulated Map Background Grid & Topography */}
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage:
                          'radial-gradient(#3E8EDE 1px, transparent 1px), radial-gradient(#3E8EDE 1px, #EAF4FC 1px)',
                        backgroundSize: '30px 30px',
                        backgroundPosition: '0 0, 15px 15px',
                      }}
                    ></div>

                    {/* Heatmap Zones */}
                    <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-red-600/30 rounded-full blur-2xl pointer-events-none animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute top-1/2 right-1/3 w-36 h-36 bg-blue-600/20 rounded-full blur-xl pointer-events-none"></div>

                    {/* Simulated Map Overlay Content */}
                    <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between pointer-events-none">
                      {/* Top Controls Overlay */}
                      <div className="flex justify-between items-start pointer-events-auto">
                        <div className="bg-white border border-[#B8C6D6] p-3 space-y-2 rounded-lg shadow-md">
                          <div className="text-xs font-bold text-[#1A3459] uppercase tracking-wider font-mono">Map Layers</div>
                          <div className="flex items-center space-x-3 text-xs text-[#526D8E]">
                            <label className="flex items-center space-x-1.5 cursor-pointer">
                              <input type="checkbox" defaultChecked className="rounded border-[#B8C6D6] text-[#3E8EDE] focus:ring-0" />
                              <span className="text-red-600 font-bold font-mono">Heatmap</span>
                            </label>
                            <label className="flex items-center space-x-1.5 cursor-pointer">
                              <input type="checkbox" defaultChecked className="rounded border-[#B8C6D6] text-[#3E8EDE] focus:ring-0" />
                              <span className="text-[#1450A0] font-bold font-mono">Police Stations (14)</span>
                            </label>
                            <label className="flex items-center space-x-1.5 cursor-pointer">
                              <input type="checkbox" defaultChecked className="rounded border-[#B8C6D6] text-[#3E8EDE] focus:ring-0" />
                              <span className="text-amber-600 font-bold font-mono">Crime Zones (6)</span>
                            </label>
                          </div>
                        </div>

                        <div className="glass-badge bg-[#10B981]/20 text-[#34D399] border-[#10B981]/40 font-mono text-xs shadow-[0_0_15px_rgba(16,185,129,0.3)] px-3 py-2">
                          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse mr-2"></span>
                          <span>GPS SATELLITE LOCK: 28.6139° N, 77.2090° E</span>
                        </div>
                      </div>

                      {/* Mock Markers on Map */}
                      <div className="absolute inset-0 pointer-events-auto">
                        {/* Police Station Marker 1 */}
                        <div className="absolute top-[30%] left-[25%] group cursor-pointer transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-8 h-8 rounded-full bg-blue-600/20 border-2 border-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-110 transition">
                            <span className="text-xs font-bold text-blue-400">PS</span>
                          </div>
                          <div className="absolute left-10 top-0 hidden group-hover:block bg-white border border-[#B8C6D6] text-[#1A2B4C] text-xs rounded p-2 shadow-xl whitespace-nowrap z-20">
                            <p className="font-bold text-[#1A3459]">North District HQ</p>
                            <p className="text-[#657E9E]">Units Available: 8 / 12</p>
                          </div>
                        </div>

                        {/* Police Station Marker 2 */}
                        <div className="absolute top-[65%] left-[70%] group cursor-pointer transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-8 h-8 rounded-full bg-blue-600/20 border-2 border-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-110 transition">
                            <span className="text-xs font-bold text-blue-400">PS</span>
                          </div>
                          <div className="absolute left-10 top-0 hidden group-hover:block bg-white border border-[#B8C6D6] text-[#1A2B4C] text-xs rounded p-2 shadow-xl whitespace-nowrap z-20">
                            <p className="font-bold text-[#1A3459]">Cyber Cell East</p>
                            <p className="text-[#657E9E]">Units Available: 5 / 5</p>
                          </div>
                        </div>

                        {/* Active Crime Zone Marker 1 */}
                        <div className="absolute top-[35%] left-[40%] group cursor-pointer transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-8 h-8 rounded-full bg-red-600/30 border-2 border-red-500 flex items-center justify-center shadow-lg shadow-red-500/50 animate-bounce">
                            <ShieldAlert className="w-4 h-4 text-red-400" />
                          </div>
                          <div className="absolute left-10 top-0 hidden group-hover:block bg-white border border-red-200 text-[#1A2B4C] text-xs rounded p-2 shadow-xl whitespace-nowrap z-20">
                            <p className="font-bold text-red-600">CRIME ZONE: Sector 4</p>
                            <p className="text-[#526D8E]">High frequency vehicle theft &amp; gang activity</p>
                            <p className="text-xs text-[#657E9E] mt-1">Status: 2 Patrols En Route</p>
                          </div>
                        </div>

                        {/* Active Crime Zone Marker 2 */}
                        <div className="absolute top-[70%] left-[30%] group cursor-pointer transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-8 h-8 rounded-full bg-amber-600/30 border-2 border-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/50">
                            <span className="text-xs font-bold text-amber-400">!</span>
                          </div>
                          <div className="absolute left-10 top-0 hidden group-hover:block bg-white border border-amber-200 text-[#1A2B4C] text-xs rounded p-2 shadow-xl whitespace-nowrap z-20">
                            <p className="font-bold text-amber-600">CRIME ZONE: Transit Hub</p>
                            <p className="text-[#526D8E]">Snatching hotspot predicted</p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Legend Overlay */}
                      <div className="flex justify-between items-end pointer-events-auto">
                        <div className="bg-white border border-[#B8C6D6] rounded px-3 py-1.5 text-xs text-[#526D8E] flex items-center space-x-4 shadow-md">
                          <div className="flex items-center space-x-1">
                            <span className="w-3 h-3 rounded-full bg-red-100 border border-red-500"></span>
                            <span>High Intensity Zone</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="w-3 h-3 rounded-full bg-amber-100 border border-amber-500"></span>
                            <span>Medium Risk</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="w-3 h-3 rounded-full bg-blue-100 border border-blue-500"></span>
                            <span>Police Outpost</span>
                          </div>
                        </div>
                        <button className="glass-button-secondary text-xs px-3 py-1.5">
                          Center Map
                        </button>
                      </div>
                    </div>
                  </div>
                </MapContainer>
              </div>

              {/* Right Column: Live Alerts using AlertCard */}
              <div className="glass-card flex flex-col space-y-3 p-4">
                <div className="flex items-center justify-between border-b border-[#C0D1E3] pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 bg-[#D32F2F] rounded-full animate-ping"></span>
                    <h3 className="font-bold text-[#1450A0] text-xs">Live Emergency Alerts</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#FDE8E8] text-[#9B1C1C] border border-[#F89999] font-mono font-bold">PRIORITY QUEUE</span>
                </div>
                <div className="space-y-3 overflow-y-auto max-h-[420px] pr-1">
                  {liveAlerts.map((alert) => (
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
                </div>
              </div>
            </section>

            {/* SECTION 4: Left - Recent FIR Table, Right - Investigation Timeline */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column (2 span): Recent FIR Table using TableContainer */}
              <div className="lg:col-span-2 flex flex-col">
                <TableContainer
                  title="Recent FIR Registry & Case Tracking"
                  subtitle="Live feed from National Crime Tracking Database"
                >
                  <div className="overflow-x-auto mt-3">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-[#B8C6D6] text-[#1450A0] font-sans text-xs uppercase font-bold bg-[#EBF3FB]">
                          <th className="py-2.5 px-3">FIR #</th>
                          <th className="py-2.5 px-3">Crime Classification</th>
                          <th className="py-2.5 px-3">District</th>
                          <th className="py-2.5 px-3">Investigating Officer</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3">Date Registered</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D5E2F0] text-[#2C4466] font-sans text-xs">
                        {recentFIRs.map((row, idx) => (
                          <tr key={idx} className="hover:bg-[#EBF4FC] transition-colors cursor-pointer" onClick={() => alert(`Details for ${row.fir} loaded in investigative board.`)}>
                            <td className="py-2.5 px-3 font-mono font-bold text-[#1450A0]">{row.fir}</td>
                            <td className="py-2.5 px-3 font-semibold text-[#1A2B4C]">{row.crime}</td>
                            <td className="py-2.5 px-3 text-[#3B5478]">{row.district}</td>
                            <td className="py-2.5 px-3 text-[#3B5478]">{row.officer}</td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border ${
                                  row.status === 'Active Investigation'
                                    ? 'bg-[#FFF8E1] text-[#B76E00] border-[#FFE082]'
                                    : row.status === 'Charge Sheet Filed'
                                    ? 'bg-[#EBF7E6] text-[#2B6317] border-[#81C765]'
                                    : row.status === 'Suspect Identified'
                                    ? 'bg-[#F3E5F5] text-[#7B1FA2] border-[#CE93D8]'
                                    : 'bg-[#EAF4FC] text-[#1450A0] border-[#99BCE0]'
                                }`}
                              >
                                {row.status}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-[#526D8E] font-mono text-xs">{row.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TableContainer>
              </div>

              {/* Right Column: Investigation Timeline */}
              <div className="glass-card flex flex-col p-4">
                <div className="border-b border-[#C0D1E3] pb-2.5 mb-3">
                  <h3 className="font-bold text-[#1450A0] text-xs">Investigation Timeline</h3>
                  <p className="text-xs text-[#526D8E] mt-0.5 font-mono">Active Case Progression: FIR-2026-8891</p>
                </div>

                <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#B8C6D6] overflow-y-auto max-h-[380px] pr-2">
                  {timelineSteps.map((step, idx) => {
                    const isCompleted = step.status === 'completed';
                    const isActive = step.status === 'active';

                    return (
                      <div key={idx} className="relative group">
                        {/* Timeline Node Indicator */}
                        <div
                          className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center border-2 bg-white ${
                            isCompleted
                              ? 'border-[#388E3C] text-[#388E3C]'
                              : isActive
                              ? 'border-[#1976D2] text-[#1976D2] animate-pulse'
                              : 'border-[#A0B2C6] text-slate-400'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-3 h-3 text-[#388E3C]" />
                          ) : isActive ? (
                            <Clock className="w-3 h-3 text-[#1976D2]" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B0C2D6]"></span>
                          )}
                        </div>

                        {/* Timeline Content */}
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs font-bold ${
                                isCompleted ? 'text-[#1A2B4C]' : isActive ? 'text-[#1450A0]' : 'text-slate-500'
                              }`}
                            >
                              {step.stage}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500">{step.date}</span>
                          </div>
                          <p className={`text-xs mt-1 leading-relaxed ${isActive ? 'text-[#1A2B4C]' : 'text-[#526D8E]'}`}>
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* SECTION 5: Criminal Network Preview (Small React Flow graph) */}
            <section className="glass-card p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#C0D1E3] pb-3 mb-3 gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <Network className="w-4 h-4 text-[#1450A0]" />
                    <h3 className="font-bold text-[#1450A0] text-xs">Criminal Network Preview</h3>
                  </div>
                  <p className="text-xs text-[#526D8E] mt-0.5 font-mono">
                    Syndicate-B linkage: Accused · Victims · Vehicles · Phones · Financial Shells · Evidence
                  </p>
                </div>
                <button onClick={() => alert("Opening full graphic analysis interface...")} className="glass-button inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold whitespace-nowrap">
                  <span>Open Network Analysis</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Small React Flow Graph Container */}
              <div className="w-full h-[360px] bg-[#FAFDFE] border border-[#B8C6D6] rounded-md overflow-hidden relative">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  fitView
                  attributionPosition="bottom-right"
                  proOptions={{ hideAttribution: true }}
                >
                  <Background color="#C0D1E3" gap={24} size={1} />
                  <Controls className="bg-white border-[#B8C6D6] fill-[#1450A0]" />
                </ReactFlow>
                <div className="absolute top-2.5 left-2.5 bg-[#EAF4FC] border border-[#99BCE0] px-2.5 py-1 rounded text-xs text-[#1450A0] font-mono font-bold pointer-events-none z-10">
                  GRAPH: SYNDICATE-B · 7 NODES · 8 EDGES
                </div>
              </div>
            </section>
          </main>
        </div>

        {/* FLOATING BUTTON: Ask Crime AI (Bottom Right) */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center space-x-2.5 px-4 py-2.5 glass-button shadow-xl group text-xs font-bold uppercase tracking-wide"
          >
            <Bot className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Ask Crime AI</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
          </button>
        </div>

        {/* Tactical Dispatch Toast Notification */}
        {dispatchToast && (
          <div className="fixed bottom-24 right-6 z-50 bg-white border-2 border-[#3E8EDE] text-[#1A3459] rounded-xl px-5 py-3.5 shadow-2xl flex items-center space-x-3">
            <span className="text-lg">🚀</span>
            <span className="text-xs font-semibold font-mono tracking-tight text-[#1450A0]">{dispatchToast}</span>
          </div>
        )}

        {/* Chat Interface Drawer */}
        {isChatOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div
              className="absolute inset-0 bg-[#142B4C]/40 backdrop-blur-xs"
              onClick={() => setIsChatOpen(false)}
            ></div>
            <div className="relative w-full max-w-lg bg-white border-l border-[#99BCE0] flex flex-col h-full shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 glass-header">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-white" />
                  <h3 className="font-bold text-white text-xs">Crime Intelligence Assistant</h3>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="glass-button-secondary p-1 text-[#1450A0] rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden p-4 bg-[#F2F7FC] flex flex-col">
                <ChatInterface />
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}