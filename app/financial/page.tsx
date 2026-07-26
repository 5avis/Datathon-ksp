"use client";
import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { DollarSign, AlertTriangle, Bot, X, Search, Building2, CreditCard, ArrowRight } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import StatisticCard from '../components/StatisticCard';
import ChartContainer from '../components/ChartContainer';
import TableContainer from '../components/TableContainer';
import ChatInterface from '../components/ChatInterface';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const kpis = [
  { title: 'Suspicious Transactions', value: '2,481', change: '+18.4%', isPositive: false, icon: 'AlertTriangle' },
  { title: 'Total Illicit Flow Est.', value: '₹482 Cr', change: '+12.1%', isPositive: false, icon: 'DollarSign' },
  { title: 'Shell Companies Flagged', value: '38', change: '+5', isPositive: false, icon: 'Building2' },
  { title: 'Accounts Frozen', value: '14', change: '+2', isPositive: true, icon: 'CreditCard' },
];

const moneyFlowTrend = [
  { month: 'Jan', flow: 28 }, { month: 'Feb', flow: 34 }, { month: 'Mar', flow: 44 },
  { month: 'Apr', flow: 52 }, { month: 'May', flow: 68 }, { month: 'Jun', flow: 74 }, { month: 'Jul', flow: 82 },
];

const transactions = [
  { id: 'TXN-9901', amount: '₹18,40,000', from: 'Shell Acc #4492', to: 'Overseas Wire — Dubai', date: '2026-07-20', status: 'Flagged', risk: 'Critical' },
  { id: 'TXN-9889', amount: '₹4,20,000', from: 'B. Kumar Pvt Ltd', to: 'Shell Acc #4492', date: '2026-07-19', status: 'Under Review', risk: 'High' },
  { id: 'TXN-9876', amount: '₹9,80,000', from: 'Narco Fund Bearer', to: 'Port Import Invoice', date: '2026-07-18', status: 'Flagged', risk: 'Critical' },
  { id: 'TXN-9855', amount: '₹1,10,000', from: 'Anonymous Cash Deposit', to: 'Temp Account #8891', date: '2026-07-17', status: 'Monitoring', risk: 'Medium' },
  { id: 'TXN-9840', amount: '₹62,000', from: 'Property Holdings GHI', to: 'X Corp (Singapore)', date: '2026-07-16', status: 'Under Review', risk: 'High' },
];

const shellCompanies = [
  { name: 'TechGlobe Solutions Pvt Ltd', regNo: 'CIN-001928', director: 'R. "Bhai" Singh (nominee)', links: 'Shell Acc #4492, FIR-8891', risk: 'Critical' },
  { name: 'B. Kumar Pvt Ltd', regNo: 'CIN-004412', director: 'B. Kumar (alias Raman)', links: 'TXN-9889', risk: 'High' },
  { name: 'Property Holdings GHI', regNo: 'CIN-009120', director: 'Unknown Beneficiary', links: 'X Corp Singapore', risk: 'High' },
];

const bankAccounts = [
  { account: '****4492', bank: 'National Bank West', type: 'Shell', balance: '₹48.2L', status: 'Frozen', linked: 'R. Singh' },
  { account: '****8891', bank: 'Central Cooperative', type: 'Temp', balance: '₹1.1L', status: 'Monitoring', linked: 'Anonymous' },
  { account: '****1203', bank: 'Port Finance Hub', type: 'Corporate', balance: '₹9.8L', status: 'Under Review', linked: 'Narco Fund Bearer' },
];

const riskBadge: Record<string, string> = {
  Critical: 'bg-red-50 text-red-600 border-red-200',
  High: 'bg-orange-50 text-orange-600 border-orange-200',
  Medium: 'bg-amber-50 text-amber-600 border-amber-200',
};

const statusBadge: Record<string, string> = {
  Flagged: 'bg-red-50 text-red-600 border-red-200',
  'Under Review': 'bg-amber-50 text-amber-600 border-amber-200',
  Monitoring: 'bg-blue-50 text-[#1450A0] border-blue-200',
  Frozen: 'bg-red-100 text-red-700 border-red-300',
};

export default function FinancialPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'transactions' | 'shells' | 'accounts'>('transactions');

  const filteredTxns = transactions.filter(t =>
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.from.toLowerCase().includes(search.toLowerCase()) ||
    t.to.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="flex h-screen bg-[#EAF4FC] text-[#1F3250] font-sans antialiased overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <TopNavbar />
          <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
            {/* Header */}
            <div className="border-b border-[#C0D1E3] pb-5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7] mb-1">
                <span className="w-1.5 h-1.5 mr-1.5 bg-[#4CAF50] rounded-full animate-pulse"></span>
                FINANCIAL INTELLIGENCE UNIT
              </span>
              <h1 className="text-2xl font-bold text-[#1A3459] tracking-tight">Financial Crime &amp; Money Laundering Tracker</h1>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((k, i) => <StatisticCard key={i} {...k} />)}
            </div>

            {/* Money Flow Trend */}
            <ChartContainer title="Illicit Money Flow Trend (Crore INR)" subtitle="Monthly estimated volume of suspicious financial transactions detected">
              <div className="h-52 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moneyFlowTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} unit=" Cr" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#f8fafc', fontSize: '12px' }} formatter={(v: any) => [`₹${v} Cr`, 'Illicit Flow']} />
                    <Line type="monotone" dataKey="flow" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>

            {/* Tabs: Transactions / Shells / Accounts */}
            <div className="panel-surface space-y-4 p-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex border-b border-[#C0D1E3] w-full">
                  {(['transactions', 'shells', 'accounts'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2.5 text-xs font-semibold capitalize border-b-2 transition ${activeTab === tab ? 'border-[#3E8EDE] text-[#1450A0]' : 'border-transparent text-[#657E9E] hover:text-[#2C4466]'}`}>
                      {tab === 'shells' ? 'Shell Companies' : tab === 'accounts' ? 'Bank Accounts' : 'Suspicious Transactions'}
                    </button>
                  ))}
                  <div className="flex-1 flex justify-end items-center pb-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#657E9E]" />
                      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="glass-input pl-7 pr-3 py-1.5 w-36" />
                    </div>
                  </div>
                </div>

                {/* Transactions Table */}
                {activeTab === 'transactions' && (
                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#C0D1E3] text-[#657E9E] font-mono uppercase text-[10px]">
                          <th className="py-2 px-3">TXN ID</th>
                          <th className="py-2 px-3">Amount</th>
                          <th className="py-2 px-3">From</th>
                          <th className="py-2 px-3"></th>
                          <th className="py-2 px-3">To</th>
                          <th className="py-2 px-3">Date</th>
                          <th className="py-2 px-3">Status</th>
                          <th className="py-2 px-3">Risk</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E0E9F3]">
                        {filteredTxns.map(t => (
                          <tr key={t.id} className="hover:bg-[#EAF4FC] transition cursor-pointer">
                            <td className="py-3 px-3 font-mono text-[#2E7D32] font-bold">{t.id}</td>
                            <td className="py-3 px-3 font-semibold text-[#1A3459]">{t.amount}</td>
                            <td className="py-3 px-3 text-[#526D8E] max-w-[120px] truncate">{t.from}</td>
                            <td className="py-3 px-1"><ArrowRight className="w-3 h-3 text-slate-600" /></td>
                            <td className="py-3 px-3 text-[#526D8E] max-w-[120px] truncate">{t.to}</td>
                            <td className="py-3 px-3 text-[#657E9E] font-mono text-[10px]">{t.date}</td>
                            <td className="py-3 px-3"><span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${statusBadge[t.status]}`}>{t.status}</span></td>
                            <td className="py-3 px-3"><span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${riskBadge[t.risk]}`}>{t.risk}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Shell Companies */}
                {activeTab === 'shells' && (
                  <div className="w-full space-y-3">
                    {shellCompanies.map(s => (
                      <div key={s.regNo} className="p-4 bg-white border border-[#C0D1E3] rounded-lg hover:border-[#3E8EDE] transition">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start space-x-3">
                            <Building2 className="w-4 h-4 text-[#657E9E] mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-bold text-[#1A3459]">{s.name}</p>
                              <p className="text-[11px] text-[#657E9E] font-mono mt-0.5">CIN: {s.regNo}</p>
                              <p className="text-[11px] text-[#526D8E] mt-1">Director: {s.director}</p>
                              <p className="text-[11px] text-[#1450A0] mt-0.5">Links: {s.links}</p>
                            </div>
                          </div>
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${riskBadge[s.risk]}`}>{s.risk}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bank Accounts */}
                {activeTab === 'accounts' && (
                  <div className="w-full space-y-3">
                    {bankAccounts.map(a => (
                      <div key={a.account} className="p-4 bg-white border border-[#C0D1E3] rounded-lg hover:border-[#3E8EDE] transition flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-4 h-4 text-[#657E9E] shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-[#1A3459] font-mono">{a.account}</p>
                            <p className="text-[11px] text-[#526D8E]">{a.bank} · {a.type}</p>
                            <p className="text-[11px] text-[#657E9E] mt-0.5">Linked to: {a.linked}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-xs font-semibold text-[#1A3459]">{a.balance}</p>
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${statusBadge[a.status]}`}>{a.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
