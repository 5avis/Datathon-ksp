"use client";
import React, { useState } from 'react';
import { Search, Filter, Bot, ExternalLink, ShieldAlert, CheckCircle, FileText, Download, X } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import StatisticCard from '../components/StatisticCard';
import TableContainer from '../components/TableContainer';
import ChatInterface from '../components/ChatInterface';

const firKPIs = [
  { title: 'Total Registered FIRs', value: '14,289', change: '+5.2%', isPositive: false, icon: 'FileText' },
  { title: 'Pending Charge Sheets', value: '912', change: '-4.6%', isPositive: true, icon: 'Clock' },
  { title: 'Under Investigation', value: '1,842', change: '-2.4%', isPositive: true, icon: 'Users' },
  { title: 'Evidence Match Index', value: '94.2%', change: '+3.1%', isPositive: true, icon: 'CheckCircle' },
];

const initialFIRs = [
  { fir: 'FIR-2026-8891', crime: 'Armed Robbery', district: 'Central Metro', officer: 'Insp. R. Rathore', status: 'Active Investigation', date: '2026-07-20', severity: 'High' },
  { fir: 'FIR-2026-8890', crime: 'Cyber Extortion', district: 'Cyber Cell East', officer: 'Sub-Insp. A. Sharma', status: 'Forensics Review', date: '2026-07-20', severity: 'Critical' },
  { fir: 'FIR-2026-8889', crime: 'Vehicle Theft', district: 'North District', officer: 'Insp. T. Deshmukh', status: 'Suspect Identified', date: '2026-07-19', severity: 'Medium' },
  { fir: 'FIR-2026-8888', crime: 'Narcotics Trafficking', district: 'Port Zone', officer: 'ACP K. Varma', status: 'Charge Sheet Filed', date: '2026-07-19', severity: 'Critical' },
  { fir: 'FIR-2026-8887', crime: 'Assault & Battery', district: 'South West', officer: 'Insp. M. Ali', status: 'Court Proceedings', date: '2026-07-18', severity: 'Low' },
  { fir: 'FIR-2026-8886', crime: 'Corporate Embezzlement', district: 'Financial Crime Cell', officer: 'ACP V. Reddy', status: 'Active Investigation', date: '2026-07-17', severity: 'High' },
  { fir: 'FIR-2026-8885', crime: 'IP Spoofing & Phishing', district: 'Cyber Cell East', officer: 'Sub-Insp. A. Sharma', status: 'Forensics Review', date: '2026-07-16', severity: 'Medium' },
  { fir: 'FIR-2026-8884', crime: 'Illegal Assembly', district: 'South West', officer: 'Insp. M. Ali', status: 'Case Solved', date: '2026-07-15', severity: 'Low' },
];

export default function FirRegistryPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedFIR, setSelectedFIR] = useState<any>(null);

  const filteredFIRs = initialFIRs.filter(fir => {
    const matchesSearch = fir.fir.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          fir.crime.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          fir.officer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || fir.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout>
      <div className="flex h-screen bg-[#EAF4FC] text-[#1F3250] font-sans antialiased overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <TopNavbar />

          <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#C0D1E3] pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-[#EAF4FC] text-[#1450A0] border border-[#99BCE0]">
                    <span className="w-1.5 h-1.5 mr-1.5 bg-[#3E8EDE] rounded-full animate-pulse"></span>
                    REGISTRY ONLINE
                  </span>
                  <span className="text-xs text-[#526D8E]">| National Crime Database Sync: 99.9%</span>
                </div>
                <h1 className="text-xl font-black text-[#1450A0] tracking-wide mt-1">
                  National FIR Registry &amp; Case Logs
                </h1>
              </div>
              <div className="mt-3 md:mt-0">
                <button
                  onClick={() => alert("Downloading registry dump...")}
                  className="glass-button-secondary px-3.5 py-1.5 text-xs font-bold shadow-sm flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Registry (CSV)</span>
                </button>
              </div>
            </div>

            {/* SECTION 1: Metrics */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {firKPIs.map((kpi, idx) => (
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

            {/* SECTION 2: Advanced Search & Filter */}
            <section className="glass-card space-y-3 p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-[#526D8E]">
                    <Search className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by FIR #, crime classification, or investigating officer..."
                    className="glass-input w-full pl-9 pr-4 text-xs font-medium"
                  />
                </div>
                <div className="flex items-center space-x-3 shrink-0">
                  <div className="flex items-center space-x-1.5 text-xs text-[#1450A0] font-bold">
                    <Filter className="w-3.5 h-3.5 text-[#3E8EDE]" />
                    <span>STATUS:</span>
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="glass-input text-xs font-bold"
                  >
                    <option value="All">All Case Statuses</option>
                    <option value="Active Investigation">Active Investigation</option>
                    <option value="Forensics Review">Forensics Review</option>
                    <option value="Suspect Identified">Suspect Identified</option>
                    <option value="Charge Sheet Filed">Charge Sheet Filed</option>
                    <option value="Court Proceedings">Court Proceedings</option>
                    <option value="Case Solved">Case Solved</option>
                  </select>
                </div>
              </div>
            </section>

            {/* SECTION 3: Main Table Registry */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 flex flex-col">
                <TableContainer
                  title="Filterable Case Registry Records"
                  subtitle={`Displaying ${filteredFIRs.length} records matching current filters`}
                >
                  <div className="overflow-x-auto mt-2">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-[#B8C6D6] text-[#1450A0] font-sans font-bold uppercase bg-[#EBF3FB]">
                          <th className="py-2.5 px-3">FIR #</th>
                          <th className="py-2.5 px-3">Classification</th>
                          <th className="py-2.5 px-3">District</th>
                          <th className="py-2.5 px-3">Officer</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3">Registered</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D5E2F0] text-[#2C4466]">
                        {filteredFIRs.map((row) => (
                          <tr
                            key={row.fir}
                            onClick={() => setSelectedFIR(row)}
                            className={`hover:bg-[#EBF4FC] cursor-pointer transition-colors ${
                              selectedFIR?.fir === row.fir ? 'bg-[#E3EEF8] border-l-4 border-l-[#3E8EDE]' : ''
                            }`}
                          >
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
                                    : row.status === 'Case Solved'
                                    ? 'bg-[#EBF7E6] text-[#2B6317] border-[#81C765]'
                                    : 'bg-[#EAF4FC] text-[#1450A0] border-[#99BCE0]'
                                }`}
                              >
                                {row.status}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-[#526D8E] font-mono">{row.date}</td>
                          </tr>
                        ))}
                        {filteredFIRs.length === 0 && (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-[#526D8E] text-xs">
                              No records match the current filter criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </TableContainer>
              </div>

              {/* Side Detail Card */}
              <div className="glass-card flex flex-col justify-between p-4">
                {selectedFIR ? (
                  <div className="space-y-4 flex flex-col h-full justify-between">
                    <div>
                      <div className="border-b border-[#C0D1E3] pb-2.5 mb-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-[#1450A0]">{selectedFIR.fir}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase border ${
                            selectedFIR.severity === 'Critical' ? 'bg-[#FDE8E8] text-[#9B1C1C] border-[#F89999]' :
                            selectedFIR.severity === 'High' ? 'bg-[#FFF8E1] text-[#B76E00] border-[#FFE082]' : 'bg-[#EAF4FC] text-[#1450A0] border-[#99BCE0]'
                          }`}>
                            {selectedFIR.severity} Priority
                          </span>
                        </div>
                        <h3 className="font-bold text-[#1A2B4C] text-sm mt-1.5">{selectedFIR.crime}</h3>
                        <p className="text-xs text-[#526D8E] font-mono mt-0.5">Registered: {selectedFIR.date}</p>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#526D8E]">Jurisdiction:</span>
                          <span className="text-[#1A2B4C] font-bold">{selectedFIR.district}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#526D8E]">Officer Assigned:</span>
                          <span className="text-[#1A2B4C]">{selectedFIR.officer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#526D8E]">Current Progress:</span>
                          <span className="text-[#1450A0] font-bold">{selectedFIR.status}</span>
                        </div>
                        <div className="pt-2.5 border-t border-[#C0D1E3] space-y-1">
                          <span className="text-[#526D8E] font-bold block">Case Summary Brief:</span>
                          <p className="text-[11px] text-[#2C4466] leading-relaxed bg-[#F2F7FC] p-2 rounded border border-[#C8D8E8]">
                            Telemetry indicates potential linkage with local syndicates. Surveillance logs and forensics review are ongoing. Subpoena requests for network headers submitted.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Opening official dossier window for ${selectedFIR.fir}`)}
                      className="mt-4 w-full py-2 glass-button text-xs font-bold shadow-md flex items-center justify-center space-x-1.5"
                    >
                      <span>Open Dossier Details</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2.5">
                    <FileText className="w-8 h-8 text-[#99ABC0]" />
                    <div>
                      <h4 className="text-xs font-bold text-[#1450A0]">No FIR Selected</h4>
                      <p className="text-[11px] text-[#526D8E] mt-1 leading-normal max-w-[200px] mx-auto">
                        Click on any FIR row in the database registry to view full intelligence briefings.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
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
