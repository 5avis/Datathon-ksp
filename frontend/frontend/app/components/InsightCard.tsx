import React from 'react';
import { ShieldAlert, AlertTriangle, Brain, Flame } from 'lucide-react';

interface InsightCardProps {
  key?: any;
  title: string;
  description: string;
  confidence: number;
  timestamp: string;
  type: 'warning' | 'critical' | 'prediction' | 'alert';
}

export default function InsightCard({ title, description, confidence, timestamp, type }: InsightCardProps) {
  let badgeColor = '';
  let IconComponent = Brain;

  switch (type) {
    case 'critical':
      badgeColor = 'border border-red-400/30 bg-red-500/20 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.2)]';
      IconComponent = Flame;
      break;
    case 'warning':
      badgeColor = 'border border-amber-400/30 bg-amber-500/20 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]';
      IconComponent = AlertTriangle;
      break;
    case 'prediction':
      badgeColor = 'border border-blue-400/30 bg-blue-500/20 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.2)]';
      IconComponent = Brain;
      break;
    case 'alert':
      badgeColor = 'border border-purple-400/30 bg-purple-500/20 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]';
      IconComponent = ShieldAlert;
      break;
  }

  return (
    <div className="glass-card glass-card-hover flex flex-col space-y-2.5 p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <IconComponent className={`h-4 w-4 ${
            type === 'critical' ? 'text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
            type === 'warning' ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' :
            type === 'prediction' ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]'
          }`} />
          <span className="text-xs font-bold uppercase tracking-wider text-white">{title}</span>
        </div>
        <span className={`glass-badge text-[10px] ${badgeColor}`}>
          {type}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-slate-300">{description}</p>

      <div className="flex items-center justify-between pt-1 font-mono text-[11px]">
        <div className="flex w-2/3 items-center space-x-2">
          <span className="text-slate-400">Confidence:</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-950/80 border border-white/5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                confidence >= 90 ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                confidence >= 80 ? 'bg-gradient-to-r from-blue-500 to-indigo-400 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-gradient-to-r from-amber-500 to-orange-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
              }`}
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
          <span className="font-bold text-slate-200">{confidence}%</span>
        </div>
        <span className="text-slate-400">{timestamp}</span>
      </div>
    </div>
  );
}
