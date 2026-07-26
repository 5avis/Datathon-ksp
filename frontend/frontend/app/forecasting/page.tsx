"use client";
import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { TrendingUp, Bot, X, Brain, AlertTriangle, Zap } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import StatisticCard from '../components/StatisticCard';
import ChartContainer from '../components/ChartContainer';
import InsightCard from '../components/InsightCard';
import ChatInterface from '../components/ChatInterface';

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const kpis = [
  { title: 'Predicted Incidents (7d)', value: '124', change: '+8.3%', isPositive: false, icon: 'TrendingUp' },
  { title: 'High-Risk Zones Next Week', value: '6 Zones', change: '+1', isPositive: false, icon: 'MapPin' },
  { title: 'Forecast Accuracy', value: '91.4%', change: '+2.1%', isPositive: true, icon: 'CheckCircle' },
  { title: 'Model Confidence Score', value: '0.89', change: 'High', isPositive: true, icon: 'Brain' },
];

const futureTrend = [
  { day: 'Mon', actual: 22, forecast: 24 }, { day: 'Tue', actual: 18, forecast: 21 },
  { day: 'Wed', actual: 28, forecast: 30 }, { day: 'Thu', actual: null, forecast: 35 },
  { day: 'Fri', actual: null, forecast: 42 }, { day: 'Sat', actual: null, forecast: 38 },
  { day: 'Sun', actual: null, forecast: 28 },
];

const riskZones = [
  { zone: 'Sector 4', risk: 92 }, { zone: 'Transit Hub', risk: 84 },
  { zone: 'Port Zone', risk: 71 }, { zone: 'N. Toll Plaza', risk: 65 },
  { zone: 'SW Market', risk: 54 }, { zone: 'Financial Dist.', risk: 48 },
];

const aiRecommendations: { title: string; description: string; confidence: number; timestamp: string; type: 'warning' | 'critical' | 'prediction' | 'alert' }[] = [
  { title: 'Deploy Extra Patrols — Sector 4', description: 'Model predicts 42% spike in vehicle theft on Friday 18:00–22:00 based on historical weekend patterns and recent reconnaissance activity.', confidence: 91, timestamp: 'Forecast: Fri Jul 25', type: 'warning' },
  { title: 'Gangs Reformation Window Closing', description: 'Network analysis indicates Syndicate-B is reorganizing. High probability of coordinated crime event in next 96 hours.', confidence: 87, timestamp: 'Forecast: 96h window', type: 'critical' },
  { title: 'Cyber Phishing Wave Incoming', description: 'AI detected seasonal pattern repeating from last year — pension phishing attack cycle aligns with government disbursement dates.', confidence: 84, timestamp: 'Forecast: Jul 28–Aug 3', type: 'prediction' },
  { title: 'Transit Hub Snatching Risk Peak', description: 'Saturday crowd density model indicates snatching risk peak between 17:00 and 21:00 at Metro Gate 1 and Gate 3.', confidence: 79, timestamp: 'Forecast: Sat Jul 26', type: 'alert' },
];

const TOOLTIP_STYLE = { contentStyle: { backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#f8fafc', fontSize: '12px' } };

export default function ForecastingPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [horizon, setHorizon] = useState('7days');

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
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#EDE7F6] text-[#6A1B9A] border border-[#CE93D8] mb-1">
                  <span className="w-1.5 h-1.5 mr-1.5 bg-[#9C27B0] rounded-full animate-pulse"></span>
                  PREDICTIVE MODEL ONLINE
                </span>
                <h1 className="text-2xl font-bold text-[#1A3459] tracking-tight">Crime Forecasting &amp; Predictive Intelligence</h1>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-xs text-[#526D8E]">Forecast Horizon:</label>
                <select value={horizon} onChange={e => setHorizon(e.target.value)} className="bg-white border border-[#C0D1E3] rounded-lg px-3 py-2 text-xs text-[#1A2B4C] focus:outline-none">
                  <option value="7days">Next 7 Days</option>
                  <option value="30days">Next 30 Days</option>
                  <option value="90days">Next Quarter</option>
                </select>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((k, i) => <StatisticCard key={i} {...k} />)}
            </div>

            {/* Forecast Trend Area Chart */}
            <ChartContainer title="Predictive Crime Incident Volume — 7-Day Forecast" subtitle="Actual observed vs AI-predicted incident volume. Shaded area = forecast range.">
              <div className="h-64 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={futureTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip {...TOOLTIP_STYLE} />
                    <Area type="monotone" dataKey="actual" name="Actual" stroke="#3b82f6" strokeWidth={2.5} fill="url(#actualGrad)" dot={{ r: 4, fill: '#3b82f6' }} />
                    <Area type="monotone" dataKey="forecast" name="Forecast" stroke="#a855f7" strokeWidth={2} fill="url(#forecastGrad)" strokeDasharray="5 3" dot={{ r: 3, fill: '#a855f7' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>

            {/* Risk Zone + AI Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Zone Index */}
              <ChartContainer title="Zone Risk Index — Predicted Severity" subtitle="Normalized 0–100 score for each zone's predicted crime risk next 7 days">
                <div className="space-y-3 mt-4">
                  {riskZones.map(z => (
                    <div key={z.zone} className="flex items-center space-x-3 text-xs">
                      <span className="w-32 text-[#526D8E] shrink-0">{z.zone}</span>
                      <div className="flex-1 bg-[#E0E9F3] rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${z.risk >= 80 ? 'bg-red-500' : z.risk >= 65 ? 'bg-orange-500' : 'bg-amber-500'}`}
                          style={{ width: `${z.risk}%` }}
                        ></div>
                      </div>
                      <span className={`w-8 text-right font-mono font-bold ${z.risk >= 80 ? 'text-red-600' : z.risk >= 65 ? 'text-orange-600' : 'text-amber-600'}`}>{z.risk}</span>
                    </div>
                  ))}
                </div>
              </ChartContainer>

              {/* AI Recommendations */}
              <div className="panel-surface flex flex-col space-y-3 p-5">
                <div className="flex items-center space-x-2 border-b border-[#C0D1E3] pb-3">
                  <Brain className="w-4 h-4 text-[#6A1B9A]" />
                  <h3 className="font-semibold text-[#1A3459] text-sm">AI Tactical Recommendations</h3>
                  <span className="ml-auto text-[10px] font-mono text-[#6A1B9A] bg-[#EDE7F6] border border-[#CE93D8] px-2 py-0.5 rounded">CRIME-BERT-v4</span>
                </div>
                <div className="space-y-3 overflow-y-auto flex-1">
                  {aiRecommendations.map((r, i) => <InsightCard key={i} {...r} />)}
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
