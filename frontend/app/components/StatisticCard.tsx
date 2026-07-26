import React from 'react';
import * as Icons from 'lucide-react';

interface StatisticCardProps {
  key?: any;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
}

export default function StatisticCard({ title, value, change, isPositive, icon }: StatisticCardProps) {
  const IconComponent = (Icons as any)[icon] || Icons.HelpCircle;

  return (
    <div className="glass-card glass-card-hover group flex flex-col justify-between p-5 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300">{title}</span>
        <div className={`rounded-xl border backdrop-blur-md p-2.5 transition-transform duration-300 group-hover:scale-110 ${
          isPositive ? 'bg-emerald-500/15 border-emerald-400/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-red-500/15 border-red-400/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
        }`}>
          <IconComponent className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-2xl font-bold tracking-tight text-white drop-shadow-md">{value}</span>
        <span className={`glass-badge ${
          isPositive ? 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300' : 'bg-red-500/15 border-red-400/30 text-red-300'
        }`}>
          {change}
        </span>
      </div>
    </div>
  );
}
