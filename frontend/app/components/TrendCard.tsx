import React from 'react';

interface TrendCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export default function TrendCard({ title, value, change, isPositive }: TrendCardProps) {
  return (
    <div className="glass-card glass-card-hover p-5 flex flex-col justify-between">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">{title}</span>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-xl font-bold text-white">{value}</span>
        <span className={`glass-badge text-xs px-2.5 py-1 ${isPositive ? 'bg-[#10B981]/15 border-[#10B981]/35 text-[#34D399]' : 'bg-[#EF4444]/15 border-[#EF4444]/35 text-[#F87171]'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}

