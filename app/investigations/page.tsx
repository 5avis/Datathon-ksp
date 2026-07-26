"use client";
import React, { useState } from 'react';
import {
  Search, CheckCircle2, Clock, AlertCircle, FileText, Users, Camera,
  Fingerprint, MessageSquare, Bot, X, Plus, ChevronDown
} from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import StatisticCard from '../components/StatisticCard';
import ChatInterface from '../components/ChatInterface';

// ─── Mock Data ───────────────────────────────────────────────────────────────
const cases = [
  { id: 'FIR-2026-8891', crime: 'Armed Robbery', district: 'Central Metro', status: 'Active Investigation', severity: 'High', date: '2026-07-20' },
  { id: 'FIR-2026-8890', crime: 'Cyber Extortion', district: 'Cyber Cell East', status: 'Forensics Review', severity: 'Critical', date: '2026-07-20' },
  { id: 'FIR-2026-8889', crime: 'Vehicle Theft', district: 'North District', status: 'Suspect Identified', severity: 'Medium', date: '2026-07-19' },
  { id: 'FIR-2026-8888', crime: 'Narcotics Trafficking', district: 'Port Zone', status: 'Charge Sheet Filed', severity: 'Critical', date: '2026-07-19' },
  { id: 'FIR-2026-8887', crime: 'Assault & Battery', district: 'South West', status: 'Court Proceedings', severity: 'Low', date: '2026-07-18' },
];

const timelines: Record<string, { stage: string; detail: string; date: string; status: string }[]> = {
  'FIR-2026-8891': [
    { stage: 'FIR Registered', detail: 'Case officially logged in Crime & Criminal Tracking Network (CCTN).', date: 'July 20, 08:30 AM', status: 'completed' },
    { stage: 'Scene Evidence', detail: 'CCTV recovered from 4 intersections; bullet casing ballistic analysis pending.', date: 'July 20, 11:15 AM', status: 'completed' },
    { stage: 'Witness Statements', detail: 'Primary statement from bank guard and 2 civilian witnesses recorded.', date: 'July 20, 02:00 PM', status: 'completed' },
    { stage: 'Forensics Analysis', detail: 'AI fingerprint enhancement matched to Syndicate-B database partially.', date: 'In Progress', status: 'active' },
    { stage: 'Arrest', detail: 'SWAT team deployed to suspected hideout in Sector 18.', date: 'Pending', status: 'pending' },
    { stage: 'Charge Sheet', detail: 'Drafting prosecution dossier under BNSS Section 309.', date: 'Pending', status: 'pending' },
    { stage: 'Court Proceedings', detail: 'Fast-track sessions court assignment pending arrest.', date: 'Pending', status: 'pending' },
  ],
  'FIR-2026-8890': [
    { stage: 'FIR Registered', detail: 'Cyber extortion complaint filed against unknown IP.', date: 'July 20, 09:00 AM', status: 'completed' },
    { stage: 'IP Tracing', detail: 'Routing through 3 VPN layers traced to eastern European server.', date: 'July 20, 01:00 PM', status: 'completed' },
    { stage: 'Forensics', detail: 'Malware signature analysis running on seized device.', date: 'In Progress', status: 'active' },
    { stage: 'Interpol Alert', detail: 'International cooperation request filed.', date: 'Pending', status: 'pending' },
  ],
};

const evidence: Record<string, { id: string; type: string; desc: string; icon: any }[]> = {
  'FIR-2026-8891': [
    { id: 'EV-001', type: 'CCTV Footage', desc: '4 camera recordings, 2h 15m total. Timestamps: 08:12–10:27 AM.', icon: Camera },
    { id: 'EV-002', type: 'Ballistic Sample', desc: '.38 cal brass casing; rifling analysis match pending lab.', icon: Fingerprint },
    { id: 'EV-003', type: 'Witness Statement', desc: 'Sworn statement from security officer on duty.', icon: MessageSquare },
    { id: 'EV-004', type: 'Financial Records', desc: 'Bank transaction logs showing pre-crime recon withdrawals.', icon: FileText },
  ],
  'FIR-2026-8890': [
    { id: 'EV-005', type: 'Malware Sample', desc: 'Trojan.Spy variant recovered from victim device.', icon: FileText },
    { id: 'EV-006', type: 'Server Logs', desc: 'Encrypted request chain with TOR exit node metadata.', icon: Fingerprint },
  ],
};

const officers: Record<string, { name: string; rank: string; badge: string; role: string }[]> = {
  'FIR-2026-8891': [
    { name: 'Insp. R. Rathore', rank: 'Inspector', badge: 'B-4421', role: 'Lead Investigator' },
    { name: 'Sub-Insp. A. Patel', rank: 'Sub-Inspector', badge: 'B-5890', role: 'Forensics Liaison' },
    { name: 'ACP K. Varma', rank: 'ACP', badge: 'A-0012', role: 'Supervisor' },
  ],
  'FIR-2026-8890': [
    { name: 'Sub-Insp. A. Sharma', rank: 'Sub-Inspector', badge: 'B-6610', role: 'Lead Investigator' },
    { name: 'Cyber Analyst T. Rao', rank: 'Technical Expert', badge: 'CE-099', role: 'Forensic Analyst' },
  ],
};

const kpis = [
  { title: 'Total Active Cases', value: '1,842', change: '-2.4%', isPositive: true, icon: 'FileText' },
  { title: 'Awaiting Charge Sheet', value: '312', change: '+8', isPositive: false, icon: 'Clock' },
  { title: 'Evidence Items Logged', value: '9,240', change: '+142', isPositive: true, icon: 'Database' },
  { title: 'Avg. Resolution (days)', value: '28.4', change: '-3.2', isPositive: true, icon: 'CheckCircle' },
];

const statusColors: Record<string, string> = {
  'Active Investigation': 'bg-[#FFF8E1] text-[#B76E00] border-[#FFE082]',
  'Forensics Review': 'bg-[#EAF4FC] text-[#1450A0] border-[#99BCE0]',
  'Suspect Identified': 'bg-[#F3E5F5] text-[#7B1FA2] border-[#CE93D8]',
  'Charge Sheet Filed': 'bg-[#EBF7E6] text-[#2B6317] border-[#81C765]',
  'Court Proceedings': 'bg-[#EAEFF5] text-[#3B5478] border-[#C0D1E3]',
};

const severityColors: Record<string, string> = {
  Critical: 'bg-[#FDE8E8] text-[#9B1C1C] border-[#F89999]',
  High: 'bg-[#FFF8E1] text-[#B76E00] border-[#FFE082]',
  Medium: 'bg-[#FFF8E1] text-[#B76E00] border-[#FFE082]',
  Low: 'bg-[#EBF7E6] text-[#2B6317] border-[#81C765]',
};

export default function InvestigationsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<string[]>(['Initial scene walkthrough notes logged by Insp. Rathore at 10:00 AM.']);
  const [activeTab, setActiveTab] = useState<'timeline' | 'evidence' | 'officers' | 'notes'>('timeline');

  const filtered = cases.filter(c =>
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.crime.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const selected = cases.find(c => c.id === selectedId);

  const addNote = () => {
    if (note.trim()) {
      setNotes(prev => [...prev, note.trim()]);
      setNote('');
    }
  };

  return (
    <AppLayout>
      <div className="flex h-screen bg-[#EAF4FC] text-[#1F3250] font-sans antialiased overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <TopNavbar />
          <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
            {/* Header */}
            <div className="border-b border-[#C0D1E3] pb-4">
              <div className="flex items-center space-x-2 mb-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-[#EAF4FC] text-[#1450A0] border border-[#99BCE0]">
                  <span className="w-1.5 h-1.5 mr-1.5 bg-[#3E8EDE] rounded-full animate-pulse"></span>
                  CASE MANAGEMENT SYSTEM
                </span>
              </div>
              <h1 className="text-xl font-black text-[#1450A0] tracking-wide">Case Investigation Board</h1>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((k, i) => <StatisticCard key={i} {...k} />)}
            </div>

            {/* Main layout: case list + detail panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Case List */}
              <div className="glass-card flex flex-col lg:col-span-1">
                <div className="p-4 border-b border-[#C0D1E3]">
                  <h3 className="font-bold text-[#1450A0] text-xs mb-3">Case Files</h3>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#526D8E]" />
                    <input
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      placeholder="Search cases..."
                      className="glass-input w-full pl-8 pr-3 text-xs"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto divide-y divide-[#D5E2F0]">
                  {filtered.map(c => (
                    <button
                      key={c.id}
                      onClick={() => { setSelectedId(c.id); setActiveTab('timeline'); }}
                      className={`w-full text-left p-3.5 hover:bg-[#EBF4FC] transition ${selectedId === c.id ? 'bg-[#E3EEF8] border-l-4 border-l-[#3E8EDE]' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-mono text-xs font-bold text-[#1450A0]">{c.id}</p>
                          <p className="font-bold text-[#1A2B4C] text-xs mt-0.5">{c.crime}</p>
                          <p className="text-[11px] text-[#526D8E] mt-0.5">{c.district}</p>
                        </div>
                        <span className={`text-[9px] uppercase font-mono px-1.5 py-0.5 rounded border shrink-0 font-bold ${severityColors[c.severity]}`}>{c.severity}</span>
                      </div>
                      <span className={`mt-2 inline-flex text-[10px] px-1.5 py-0.5 rounded border font-bold ${statusColors[c.status]}`}>{c.status}</span>
                    </button>
                  ))}
                  {filtered.length === 0 && (
                    <div className="p-8 text-center text-[#526D8E] text-xs">No matching cases found.</div>
                  )}
                </div>
              </div>

              {/* Detail Panel */}
              <div className="glass-card flex flex-col lg:col-span-2">
                {!selected ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
                    <FileText className="w-10 h-10 text-[#99ABC0]" />
                    <div>
                      <p className="text-[#1450A0] font-bold text-sm">No Case Selected</p>
                      <p className="text-[#526D8E] text-xs mt-1">Select a case from the list to view investigation details.</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Detail Header */}
                    <div className="p-4 border-b border-[#C0D1E3]">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-xs font-bold text-[#1450A0]">{selected.id}</span>
                            <span className={`text-[9px] uppercase font-mono px-1.5 py-0.5 rounded border font-bold ${severityColors[selected.severity]}`}>{selected.severity}</span>
                          </div>
                          <h2 className="text-base font-black text-[#1450A0] mt-1">{selected.crime}</h2>
                          <p className="text-xs text-[#526D8E]">{selected.district} • Registered: {selected.date}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded border font-bold ${statusColors[selected.status]}`}>{selected.status}</span>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-[#C0D1E3] px-3 bg-[#EBF3FB] shrink-0">
                      {(['timeline', 'evidence', 'officers', 'notes'] as const).map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-3 py-2 text-xs font-bold capitalize transition ${
                            activeTab === tab
                              ? 'web20-tab-active border-t border-x border-[#A0B4CC]'
                              : 'web20-tab-inactive'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                      {/* Timeline Tab */}
                      {activeTab === 'timeline' && (
                        <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#B8C6D6]">
                          {(timelines[selected.id] ?? []).map((step, i) => (
                            <div key={i} className="relative">
                              <div className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white ${
                                step.status === 'completed' ? 'border-[#388E3C]' :
                                step.status === 'active' ? 'border-[#1976D2] animate-pulse' : 'border-[#A0B2C6]'
                              }`}>
                                {step.status === 'completed' && <CheckCircle2 className="w-2.5 h-2.5 text-[#388E3C]" />}
                                {step.status === 'active' && <Clock className="w-2.5 h-2.5 text-[#1976D2]" />}
                                {step.status === 'pending' && <div className="w-1.5 h-1.5 rounded-full bg-[#B0C2D6]"></div>}
                              </div>
                              <div>
                                <div className="flex items-center justify-between">
                                  <span className={`text-xs font-bold ${step.status === 'active' ? 'text-[#1450A0]' : step.status === 'completed' ? 'text-[#1A2B4C]' : 'text-[#657E9E]'}`}>{step.stage}</span>
                                  <span className="text-[10px] font-mono text-[#526D8E]">{step.date}</span>
                                </div>
                                <p className="text-xs text-[#2C4466] mt-0.5 leading-relaxed">{step.detail}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Evidence Tab */}
                      {activeTab === 'evidence' && (
                        <div className="space-y-2.5">
                          {(evidence[selected.id] ?? []).map(ev => (
                            <div key={ev.id} className="flex items-start space-x-3 p-3 bg-white border border-[#C0D1E3] rounded hover:border-[#3E8EDE] transition">
                              <div className="p-2 bg-[#EAF4FC] border border-[#99BCE0] rounded shrink-0">
                                <ev.icon className="w-4 h-4 text-[#1450A0]" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs font-bold text-[#1450A0]">{ev.type}</span>
                                  <span className="text-[9px] font-mono text-[#526D8E]">{ev.id}</span>
                                </div>
                                <p className="text-xs text-[#2C4466] mt-0.5 leading-relaxed">{ev.desc}</p>
                              </div>
                            </div>
                          ))}
                          {!(evidence[selected.id]?.length) && (
                            <div className="text-center text-[#526D8E] text-xs py-8">No evidence logged for this case yet.</div>
                          )}
                        </div>
                      )}

                      {/* Officers Tab */}
                      {activeTab === 'officers' && (
                        <div className="space-y-2.5">
                          {(officers[selected.id] ?? []).map(o => (
                            <div key={o.badge} className="flex items-center space-x-3 p-3 bg-white border border-[#C0D1E3] rounded hover:border-[#3E8EDE] transition">
                              <div className="w-9 h-9 rounded-full bg-[#EAF4FC] border border-[#99BCE0] flex items-center justify-center text-xs font-bold text-[#1450A0] shrink-0">
                                {o.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-bold text-[#1450A0]">{o.name}</p>
                                <p className="text-[11px] text-[#526D8E]">{o.role} • Badge: {o.badge}</p>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#EBF3FB] text-[#1450A0] border border-[#C0D1E3] rounded font-bold">{o.rank}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Notes Tab */}
                      {activeTab === 'notes' && (
                        <div className="space-y-3">
                          <div className="space-y-2">
                            {notes.map((n, i) => (
                              <div key={i} className="p-3 bg-white border border-[#C0D1E3] rounded text-xs text-[#2C4466] leading-relaxed">
                                <span className="text-[10px] font-mono text-[#526D8E] block mb-1">Note #{i + 1}</span>
                                {n}
                              </div>
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <input
                              value={note}
                              onChange={e => setNote(e.target.value)}
                              onKeyDown={e => e.key === 'Enter' && addNote()}
                              placeholder="Add an investigation note..."
                              className="flex-1 glass-input text-xs"
                            />
                            <button
                              onClick={addNote}
                              className="px-3 py-1.5 glass-button text-xs"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </main>
        </div>

        {/* FAB */}
        <div className="fixed bottom-6 right-6 z-50">
          <button onClick={() => setIsChatOpen(true)} className="flex items-center space-x-2 px-4 py-2.5 glass-button shadow-xl text-xs font-bold uppercase tracking-wide">
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
