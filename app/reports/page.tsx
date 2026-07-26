"use client";
import React, { useState } from 'react';
import { FileBarChart, Download, Printer, FileText, CheckCircle, Clock, Bot, X, Plus } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import StatisticCard from '../components/StatisticCard';
import ChatInterface from '../components/ChatInterface';

const kpis = [
  { title: 'Reports Generated (MTD)', value: '148', change: '+12', isPositive: true, icon: 'FileBarChart' },
  { title: 'Pending Reports', value: '7', change: '-3', isPositive: true, icon: 'Clock' },
  { title: 'CSV Exports', value: '84', change: '+8', isPositive: true, icon: 'Download' },
  { title: 'PDF Exports', value: '64', change: '+4', isPositive: true, icon: 'FileText' },
];

const reportHistory = [
  { id: 'RPT-2026-0089', name: 'Monthly Crime Summary — July 2026', type: 'PDF', district: 'All Districts', generatedBy: 'ACP K. Varma', date: '2026-07-20', status: 'Ready' },
  { id: 'RPT-2026-0088', name: 'Cyber Fraud Case Digest Q2', type: 'CSV', district: 'Cyber Cell East', generatedBy: 'Sub-Insp. A. Sharma', date: '2026-07-18', status: 'Ready' },
  { id: 'RPT-2026-0087', name: 'FIR Registry Dump — North District', type: 'CSV', district: 'North District', generatedBy: 'Insp. T. Deshmukh', date: '2026-07-17', status: 'Ready' },
  { id: 'RPT-2026-0086', name: 'Financial Crime Annual Overview', type: 'PDF', district: 'Financial Crime Cell', generatedBy: 'ACP V. Reddy', date: '2026-07-15', status: 'Ready' },
  { id: 'RPT-2026-0085', name: 'Hotspot Intelligence Forecast Q3', type: 'PDF', district: 'Central Metro', generatedBy: 'Insp. R. Rathore', date: '2026-07-12', status: 'Archived' },
];

const reportTypes = [
  'Crime Summary Report', 'FIR Registry Dump', 'Hotspot Analysis Report',
  'Offender Activity Log', 'Financial Crime Overview', 'Cyber Incident Digest',
  'Court Submission Package', 'Monthly KPI Dashboard', 'Patrol Deployment Report',
];

const districts = ['All Districts', 'Central Metro', 'North District', 'Cyber Cell East', 'Port Zone', 'South West', 'Financial Crime Cell'];

export default function ReportsPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('Crime Summary Report');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [format, setFormat] = useState<'PDF' | 'CSV'>('PDF');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [history, setHistory] = useState(reportHistory);

  const handleGenerate = () => {
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      setHistory(prev => [{
        id: `RPT-2026-00${90 + prev.length}`,
        name: selectedType + (selectedDistrict !== 'All Districts' ? ` — ${selectedDistrict}` : ''),
        type: format,
        district: selectedDistrict,
        generatedBy: 'Officer Rathore',
        date: new Date().toISOString().slice(0, 10),
        status: 'Ready',
      }, ...prev]);
      setTimeout(() => setGenerated(false), 4000);
    }, 2200);
  };

  return (
    <AppLayout>
      <div className="flex h-screen bg-[#EAF4FC] text-[#1F3250] font-sans antialiased overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <TopNavbar />
          <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
            {/* Header */}
            <div className="border-b border-[#C0D1E3] pb-5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#EAF4FC] text-[#1450A0] border border-[#B8C6D6] mb-1">REPORTING ENGINE</span>
              <h1 className="text-2xl font-bold text-[#1A3459] tracking-tight">Report Generation &amp; Export Center</h1>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((k, i) => <StatisticCard key={i} {...k} />)}
            </div>

            {/* Generator + History */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Generator Card */}
              <div className="panel-surface space-y-5 p-5 lg:col-span-1">
                <div className="border-b border-[#C0D1E3] pb-3">
                  <div className="flex items-center space-x-2">
                    <Plus className="w-4 h-4 text-[#1450A0]" />
                    <h3 className="font-semibold text-[#1A3459] text-sm">Generate New Report</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-semibold text-[#657E9E] uppercase tracking-wide block mb-1.5">Report Type</label>
                    <select value={selectedType} onChange={e => setSelectedType(e.target.value)} className="w-full bg-[#EAF4FC] border border-[#C0D1E3] rounded-lg px-3 py-2.5 text-xs text-[#1A2B4C] focus:outline-none focus:ring-1 focus:ring-blue-500">
                      {reportTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-[#657E9E] uppercase tracking-wide block mb-1.5">Jurisdiction</label>
                    <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)} className="w-full bg-[#EAF4FC] border border-[#C0D1E3] rounded-lg px-3 py-2.5 text-xs text-[#1A2B4C] focus:outline-none focus:ring-1 focus:ring-blue-500">
                      {districts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-[#657E9E] uppercase tracking-wide block mb-1.5">Output Format</label>
                    <div className="flex space-x-2">
                      {(['PDF', 'CSV'] as const).map(f => (
                        <button key={f} onClick={() => setFormat(f)} className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition ${format === f ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#EAF4FC] border-[#C0D1E3] text-[#526D8E] hover:text-[#1A2B4C]'}`}>{f}</button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={generating}
                    className={`w-full py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-2 ${generating ? 'glass-button-secondary cursor-wait opacity-60' : 'glass-button shadow-lg'}`}
                  >
                    {generating ? (
                      <><span className="animate-spin w-3 h-3 border-2 border-slate-400 border-t-white rounded-full"></span><span>Generating...</span></>
                    ) : (
                      <><FileBarChart className="w-4 h-4" /><span>Generate Report</span></>
                    )}
                  </button>

                  {generated && (
                    <div className="flex items-center space-x-2 text-xs text-[#2E7D32] font-semibold animate-pulse">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Report generated and added to history!</span>
                    </div>
                  )}
                </div>

                {/* Export Actions */}
                <div className="border-t border-[#C0D1E3] pt-4 space-y-2">
                  <p className="text-[10px] font-semibold text-[#657E9E] uppercase tracking-wide">Quick Actions</p>
                  <button onClick={() => alert('Exporting as PDF...')} className="glass-button-secondary w-full py-2 flex items-center space-x-2 text-xs font-medium">
                    <Download className="w-3.5 h-3.5 ml-3" /><span>Download Last Report (PDF)</span>
                  </button>
                  <button onClick={() => alert('Exporting as CSV...')} className="glass-button-secondary w-full py-2 flex items-center space-x-2 text-xs font-medium">
                    <Download className="w-3.5 h-3.5 ml-3" /><span>Download Last Report (CSV)</span>
                  </button>
                  <button onClick={() => alert('Opening print preview...')} className="glass-button-secondary w-full py-2 flex items-center space-x-2 text-xs font-medium">
                    <Printer className="w-3.5 h-3.5 ml-3" /><span>Print Preview</span>
                  </button>
                </div>
              </div>

              {/* Report History */}
              <div className="panel-surface flex flex-col space-y-3 p-5 lg:col-span-2">
                <h3 className="font-semibold text-[#1A3459] text-sm border-b border-[#C0D1E3] pb-3">Report History</h3>
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-[#C0D1E3] text-[#657E9E] font-mono uppercase text-[10px]">
                        <th className="py-2 px-3">Report ID</th>
                        <th className="py-2 px-3">Name</th>
                        <th className="py-2 px-3">Format</th>
                        <th className="py-2 px-3">Generated By</th>
                        <th className="py-2 px-3">Date</th>
                        <th className="py-2 px-3">Status</th>
                        <th className="py-2 px-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E0E9F3]">
                      {history.map(r => (
                        <tr key={r.id} className="hover:bg-[#EAF4FC] transition">
                          <td className="py-3 px-3 font-mono text-[#1450A0] font-bold">{r.id}</td>
                          <td className="py-3 px-3 text-[#1A3459] font-medium max-w-[200px] truncate">{r.name}</td>
                          <td className="py-3 px-3"><span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${r.type === 'PDF' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]'}`}>{r.type}</span></td>
                          <td className="py-3 px-3 text-[#526D8E]">{r.generatedBy}</td>
                          <td className="py-3 px-3 text-[#657E9E] font-mono text-[10px]">{r.date}</td>
                          <td className="py-3 px-3"><span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${r.status === 'Ready' ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]' : 'bg-[#EAF4FC] text-[#657E9E] border-[#B8C6D6]'}`}>{r.status}</span></td>
                          <td className="py-3 px-3">
                            <button onClick={() => alert(`Downloading ${r.id}...`)} className="text-[#657E9E] hover:text-[#1450A0] transition">
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* FAB */}
        <div className="fixed bottom-6 right-6 z-50">
          <button onClick={() => setIsChatOpen(true)} className="glass-button flex items-center space-x-2.5 px-5 py-3 rounded-full shadow-2xl text-sm">
            <Bot className="w-5 h-5" /><span>Ask Crime AI</span>
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
