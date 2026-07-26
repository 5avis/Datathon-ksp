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
      badgeColor = 'bg-[#FDE8E8] text-[#9B1C1C] border-[#F89999]';
      IconComponent = Flame;
      break;
    case 'warning':
      badgeColor = 'bg-[#FFF8E1] text-[#B76E00] border-[#FFE082]';
      IconComponent = AlertTriangle;
      break;
    case 'prediction':
      badgeColor = 'bg-[#EAF4FC] text-[#1450A0] border-[#99BCE0]';
      IconComponent = Brain;
      break;
    case 'alert':
      badgeColor = 'bg-[#EAF4FC] text-[#1450A0] border-[#99BCE0]';
      IconComponent = ShieldAlert;
      break;
  }

  return (
    <div className="glass-card flex flex-col space-y-2 p-3.5 border border-[#C0D1E3]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <IconComponent className={`h-4 w-4 ${
            type === 'critical' ? 'text-[#D32F2F]' :
            type === 'warning' ? 'text-[#F57C00]' :
            'text-[#1976D2]'
          }`} />
          <span className="text-xs font-bold uppercase text-[#1450A0]">{title}</span>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${badgeColor}`}>
          {type}
        </span>
      </div>

      <p className="text-xs leading-relaxed text-[#2C4466]">{description}</p>

      <div className="flex items-center justify-between pt-1 font-mono text-xs">
        <div className="flex w-2/3 items-center space-x-2">
          <span className="text-[#556F90] text-[11px]">Confidence:</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#DDE6EE] border border-[#B0C4DA] inset-shadow">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                confidence >= 90 ? 'bg-gradient-to-r from-[#72D646] to-[#47A61E]' :
                confidence >= 80 ? 'bg-gradient-to-r from-[#6BB8F0] to-[#1E60B8]' :
                'bg-gradient-to-r from-[#FFC107] to-[#FF9800]'
              }`}
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
          <span className="font-bold text-[#1450A0] text-[11px]">{confidence}%</span>
        </div>
        <span className="text-[#657E9E] text-[11px]">{timestamp}</span>
      </div>
    </div>
  );
}
