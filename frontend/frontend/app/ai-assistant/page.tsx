"use client";
import React, { useState } from 'react';
import { Bot, Shield, Zap, Brain, ChevronRight } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import ChatInterface from '../components/ChatInterface';

const capabilities = [
  { icon: Brain, title: 'Predictive Analysis', desc: 'Forecast crime hotspots using ML pattern recognition', color: 'text-[#6A1B9A]', bg: 'bg-[#EDE7F6] border-[#CE93D8]' },
  { icon: Shield, title: 'Suspect Profiling', desc: 'Cross-reference criminal records and behavioral patterns', color: 'text-[#1450A0]', bg: 'bg-blue-50 border-blue-200' },
  { icon: Zap, title: 'Real-time Alerts', desc: 'Instant contextual intelligence on live incidents', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
  { icon: Zap, title: 'Evidence Correlation', desc: 'Link forensic evidence across multiple case files', color: 'text-[#2E7D32]', bg: 'bg-[#E8F5E9] border-[#A5D6A7]' },
];

const sampleQueries = [
  'Analyze crime trends in Sector 4 for the past 30 days',
  'List all repeat offenders associated with narcotics trafficking',
  'What are the predicted high-risk zones for this weekend?',
  'Summarize FIR-2026-8891 with evidence links',
  'Compare vehicle theft rates between North and South districts',
  'Identify shell companies linked to money laundering in Port Zone',
];

export default function AiAssistantPage() {
  const [started, setStarted] = useState(false);

  return (
    <AppLayout>
      <div className="flex h-screen bg-[#EAF4FC] text-[#1F3250] font-sans antialiased overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <TopNavbar />
          <div className="flex-1 flex overflow-hidden">
            {!started ? (
              /* Landing / Welcome state */
              <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-10">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/30">
                    <Bot className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-[#1A3459] tracking-tight">Crime Intelligence Assistant</h1>
                    <p className="text-[#526D8E] mt-2 text-sm max-w-xl mx-auto leading-relaxed">
                      Powered by <span className="text-[#1450A0] font-semibold">CRIME-BERT-v4</span> and <span className="text-[#6A1B9A] font-semibold">LangGraph Orchestrator</span>. Ask anything about cases, offenders, hotspots, or request tactical analysis.
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-xs text-[#657E9E]">
                    <span className="flex items-center space-x-1.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span><span>Model Online</span></span>
                    <span>•</span>
                    <span>14,289 Case Files Indexed</span>
                    <span>•</span>
                    <span>Response: ~1.2s</span>
                  </div>
                </div>

                {/* Capability Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                  {capabilities.map((cap) => (
                    <div key={cap.title} className={`panel-surface panel-surface-hover flex flex-col space-y-2 p-4 ${cap.bg}`}>
                      <cap.icon className={`h-5 w-5 ${cap.color}`} />
                      <p className="text-xs font-bold text-[#1A3459]">{cap.title}</p>
                      <p className="text-[11px] leading-relaxed text-[#526D8E]">{cap.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Sample queries */}
                <div className="w-full max-w-3xl space-y-3">
                  <p className="text-xs font-semibold text-[#657E9E] uppercase tracking-wider text-center">Try asking...</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {sampleQueries.map((q) => (
                      <button
                        key={q}
                        onClick={() => setStarted(true)}
                        className="group flex items-center justify-between rounded-xl border border-[#C0D1E3] bg-white/60 px-4 py-3 text-left text-xs text-[#526D8E] transition hover:border-blue-500/30 hover:bg-white hover:text-[#1A2B4C]"
                      >
                        <span className="leading-relaxed">{q}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#1450A0] shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStarted(true)}
                  className="glass-button px-8 py-3 rounded-full shadow-xl text-sm"
                >
                  Start Intelligence Session →
                </button>
              </div>
            ) : (
              /* Chat mode */
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex shrink-0 items-center justify-between border-b border-[#C0D1E3]/80 bg-[#EAF4FC]/50 px-6 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-[#1450A0]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1A3459]">Crime Intelligence Assistant</p>
                      <p className="text-[10px] text-[#657E9E] font-mono">CRIME-BERT-v4 • LangGraph Orchestrator • Active Session</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setStarted(false)}
                    className="glass-button-secondary text-xs transition px-3 py-1.5 rounded"
                  >
                    New Session
                  </button>
                </div>
                <div className="flex-1 overflow-hidden p-4">
                  <ChatInterface />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
