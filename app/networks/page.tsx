"use client";
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Background, Controls, Node, Edge, NodeMouseHandler, useNodesState, useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Network, Search, Bot, X, ExternalLink, Users, Car, Package } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import StatisticCard from '../components/StatisticCard';
import ChatInterface from '../components/ChatInterface';

// ─── Mock Node Data ──────────────────────────────────────────────────────────
const nodeDetails: Record<string, { type: string; desc: string; links: string[]; risk: string }> = {
  'n1': { type: 'Accused', desc: 'R. "Bhai" Singh — Primary syndicate leader. Known associates: 12. Prior convictions: 3.', links: ['Armed robbery (2019)', 'Money laundering (2021)', 'Current: FIR-2026-8891'], risk: 'Critical' },
  'n2': { type: 'Phone', desc: '+91 98XXX-XXXXX registered to shell entity. Location last pinged: Sector 18 warehouse, 02:14 AM.', links: ['Call logs shared with n3'], risk: 'High' },
  'n3': { type: 'Bank Account', desc: 'Shell Account #4492 — National Bank West. Balance: ₹48.2L. Transaction history flagged.', links: ['Wire transfer to Diamond Jewellers (n6)'], risk: 'Critical' },
  'n4': { type: 'Vehicle', desc: 'Black SUV MH-04-AB-1234. ANPR flagged at 3 crime scenes. Insurance: Lapsed.', links: ['Spotted at FIR-8891 scene', 'Highway toll scan: July 20'], risk: 'High' },
  'n5': { type: 'Location', desc: 'Warehouse Sector-18. Known Syndicate-B staging area. Last raided: 2023.', links: ['Linked to Phone n2'], risk: 'High' },
  'n6': { type: 'Victim', desc: 'Diamond Jewellers — Central Metro. Robbery report filed July 20. Loss: ₹1.2Cr.', links: ['FIR-2026-8891'], risk: 'Low' },
  'n7': { type: 'Evidence', desc: 'CCTV, ballistics, financial records tagged to FIR-2026-8891.', links: ['Linked to Location n5', 'Victim n6'], risk: 'Low' },
};

const initialNodes: Node[] = [
  { id: 'n1', type: 'input', data: { label: '🔴 Accused: R. "Bhai" Singh' }, position: { x: 280, y: 30 }, style: { background: 'linear-gradient(to bottom, #F88, #D32F2F)', color: '#FFFFFF', border: '1px solid #900', borderRadius: '6px', fontWeight: 'bold', fontSize: '11px', padding: '6px 10px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' } },
  { id: 'n2', data: { label: '📱 Phone: +91-98XXX-XXXXX' }, position: { x: 60, y: 150 }, style: { background: 'linear-gradient(to bottom, #FFF, #E2EEF8)', color: '#1450A0', border: '1px solid #99BCE0', borderRadius: '6px', fontSize: '11px', padding: '5px 8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } },
  { id: 'n3', data: { label: '🏦 Shell Account #4492' }, position: { x: 280, y: 150 }, style: { background: 'linear-gradient(to bottom, #FFF, #E2EEF8)', color: '#1450A0', border: '1px solid #99BCE0', borderRadius: '6px', fontSize: '11px', padding: '5px 8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } },
  { id: 'n4', data: { label: '🚗 SUV: MH-04-AB-1234' }, position: { x: 500, y: 150 }, style: { background: 'linear-gradient(to bottom, #FFF, #E2EEF8)', color: '#1450A0', border: '1px solid #3E8EDE', borderRadius: '6px', fontSize: '11px', padding: '5px 8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } },
  { id: 'n5', data: { label: '📍 Warehouse, Sector-18' }, position: { x: 160, y: 290 }, style: { background: 'linear-gradient(to bottom, #FFF, #E2EEF8)', color: '#1450A0', border: '1px solid #3E8EDE', borderRadius: '6px', fontSize: '11px', padding: '5px 8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } },
  { id: 'n6', data: { label: '🟡 Victim: Diamond Jewellers' }, position: { x: 380, y: 290 }, style: { background: 'linear-gradient(to bottom, #FFE082, #FFA000)', color: '#5D4037', border: '1px solid #E65100', borderRadius: '6px', fontSize: '11px', padding: '5px 8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } },
  { id: 'n7', type: 'output', data: { label: '📁 Evidence #FIR-2026-8891' }, position: { x: 280, y: 420 }, style: { background: 'linear-gradient(to bottom, #A4E685, #388E3C)', color: '#FFFFFF', border: '1px solid #1B5E20', borderRadius: '6px', fontWeight: 'bold', fontSize: '11px', padding: '6px 10px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'n1', target: 'n2', animated: true, style: { stroke: '#3E8EDE', strokeWidth: 1.5 } },
  { id: 'e1-3', source: 'n1', target: 'n3', animated: true, style: { stroke: '#3E8EDE', strokeWidth: 1.5 } },
  { id: 'e1-4', source: 'n1', target: 'n4', animated: true, style: { stroke: '#3E8EDE', strokeWidth: 1.5 } },
  { id: 'e2-5', source: 'n2', target: 'n5', style: { stroke: '#8FA3BA' } },
  { id: 'e3-6', source: 'n3', target: 'n6', label: 'Wire Transfer', style: { stroke: '#D32F2F', strokeWidth: 1.5 }, labelStyle: { fill: '#D32F2F', fontSize: 10, fontWeight: 'bold' } },
  { id: 'e4-6', source: 'n4', target: 'n6', label: 'At Scene', style: { stroke: '#F57C00', strokeWidth: 1.5 }, labelStyle: { fill: '#E65100', fontSize: 10, fontWeight: 'bold' } },
  { id: 'e5-7', source: 'n5', target: 'n7', style: { stroke: '#388E3C', strokeWidth: 1.5 } },
  { id: 'e6-7', source: 'n6', target: 'n7', style: { stroke: '#388E3C', strokeWidth: 1.5 } },
];

const kpis = [
  { title: 'Mapped Crime Groups', value: '24', change: '0 new', isPositive: true, icon: 'Network' },
  { title: 'Entity Nodes Indexed', value: '1,204', change: '+38', isPositive: false, icon: 'Users' },
  { title: 'Linkage Edges Active', value: '3,842', change: '+124', isPositive: false, icon: 'GitBranch' },
  { title: 'Highest Risk Cluster', value: 'Syndicate-B', change: 'Critical', isPositive: false, icon: 'AlertTriangle' },
];

const riskBadge: Record<string, string> = {
  Critical: 'bg-[#FDE8E8] text-[#9B1C1C] border-[#F89999]',
  High: 'bg-[#FFF8E1] text-[#B76E00] border-[#FFE082]',
  Medium: 'bg-[#FFF8E1] text-[#B76E00] border-[#FFE082]',
  Low: 'bg-[#EBF7E6] text-[#2B6317] border-[#81C765]',
};

export default function NetworksPage() {
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const onNodeClick: NodeMouseHandler = useCallback((_: any, node: any) => {
    setSelectedNode(prev => prev === node.id ? null : node.id);
  }, []);

  const detail = selectedNode ? nodeDetails[selectedNode] : null;

  return (
    <AppLayout>
      <div className="flex h-screen bg-[#EAF4FC] text-[#1F3250] font-sans antialiased overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <TopNavbar />
          <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
            {/* Header */}
            <div className="border-b border-[#C0D1E3] pb-4 flex items-center justify-between">
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#EAF4FC] text-[#1450A0] border border-[#99BCE0] mb-1 font-mono">
                  <span className="w-1.5 h-1.5 mr-1.5 bg-[#3E8EDE] rounded-full animate-pulse"></span>
                  GRAPH DATABASE CONNECTED
                </span>
                <h1 className="text-xl font-black text-[#1450A0] tracking-wide">Criminal Network Relationship Graph</h1>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((k, i) => <StatisticCard key={i} {...k} />)}
            </div>

            {/* Graph + Node Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Graph canvas — takes 2 cols */}
              <div className="glass-card flex flex-col space-y-3 p-4 lg:col-span-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Network className="w-4 h-4 text-[#1450A0]" />
                    <span className="text-xs font-bold text-[#1450A0]">Syndicate-B Entity Linkage Graph</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#657E9E]" />
                      <input
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Search nodes..."
                        className="glass-input h-7 pl-8 pr-3 text-xs w-40"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full h-[460px] rounded-md overflow-hidden border border-[#B8C6D6] relative bg-[#FAFDFE]">
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodeClick={onNodeClick}
                    fitView
                    proOptions={{ hideAttribution: true }}
                  >
                    <Background color="#C0D1E3" gap={24} size={1} />
                    <Controls className="bg-white border-[#B8C6D6] fill-[#1450A0]" />
                  </ReactFlow>
                  <div className="absolute top-2 left-2 bg-[#EAF4FC] border border-[#99BCE0] px-2.5 py-1 rounded text-[10px] font-mono font-bold text-[#1450A0] pointer-events-none">
                    GRAPH: SYNDICATE-B · 7 NODES · 8 EDGES
                  </div>
                </div>
              </div>

              {/* Node Detail Panel */}
              <div className="glass-card flex flex-col p-4">
                {!detail ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3">
                    <Network className="w-10 h-10 text-[#99ABC0]" />
                    <div>
                      <p className="text-sm font-bold text-[#1450A0]">Select a Node</p>
                      <p className="text-xs text-[#526D8E] mt-1">Click any node on the graph to view entity details, linkages, and risk assessment.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3.5 flex flex-col h-full">
                    <div className="border-b border-[#C0D1E3] pb-2.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono font-bold text-[#1450A0]">NODE: {selectedNode}</span>
                        <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border ${riskBadge[detail.risk]}`}>{detail.risk}</span>
                      </div>
                      <p className="text-sm font-black text-[#1A2B4C]">{detail.type}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#556F90] uppercase tracking-wide mb-1">Entity Details</p>
                      <p className="text-xs text-[#2C4466] leading-relaxed">{detail.desc}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#556F90] uppercase tracking-wide mb-1.5">Case Linkages</p>
                      <div className="space-y-1.5">
                        {detail.links.map((l, i) => (
                          <div key={i} className="flex items-start space-x-2 text-xs text-[#2C4466] bg-[#F2F7FC] p-2 rounded border border-[#C8D8E8]">
                            <span className="text-[#3E8EDE] font-bold mt-0.5 shrink-0">→</span>
                            <span>{l}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-auto space-y-2 pt-2">
                      <button onClick={() => alert(`Opening full dossier for node ${selectedNode}...`)} className="w-full py-2 glass-button text-xs font-bold flex items-center justify-center space-x-1.5">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View Full Entity Report</span>
                      </button>
                      <button onClick={() => setSelectedNode(null)} className="w-full py-1.5 glass-button-secondary text-xs font-bold">
                        Clear Selection
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Entity type legend */}
            <div className="glass-card p-3.5">
              <p className="text-xs font-bold text-[#1450A0] uppercase tracking-wider mb-2 font-mono">Entity Type Legend</p>
              <div className="flex flex-wrap gap-3 text-xs text-[#2C4466]">
                {[
                  { icon: Users, label: 'Accused / Suspects', color: 'text-[#D32F2F]' },
                  { icon: Car, label: 'Vehicles (ANPR flagged)', color: 'text-[#1976D2]' },
                  { icon: Package, label: 'Evidence / Assets', color: 'text-[#388E3C]' }
                ].map(t => (
                  <div key={t.label} className="flex items-center space-x-2 bg-[#F2F7FC] border border-[#C8D8E8] rounded px-2.5 py-1">
                    <t.icon className={`w-3.5 h-3.5 ${t.color}`} />
                    <span className="font-semibold">{t.label}</span>
                  </div>
                ))}
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
