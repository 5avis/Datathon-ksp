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
    <div className="glass-card glass-card-hover group flex flex-col justify-between p-4 h-[125px] rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#3B5478] font-sans">{title}</span>
        <div className={`w-8 h-8 rounded-md border flex items-center justify-center transition-transform duration-150 group-hover:scale-105 shrink-0 shadow-sm ${
          isPositive
            ? 'glass-button-green border-[#2B5718]'
            : 'bg-gradient-to-b from-[#F88] via-[#E44] to-[#C22] border-[#800] text-white'
        }`}>
          <IconComponent className="h-4 w-4 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" />
        </div>
      </div>

      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-2.5xl font-black tracking-tight text-[#1450A0]">{value}</span>
        <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono border shadow-sm ${
          isPositive
            ? 'bg-[#EBF7E6] text-[#2B6317] border-[#81C765]'
            : 'bg-[#FDE8E8] text-[#9B1C1C] border-[#F89999]'
        }`}>
          {change}
        </span>
      </div>
    </div>
  );
}
