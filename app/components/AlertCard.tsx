import React from 'react';
import { MapPin, Clock, Send } from 'lucide-react';

interface AlertCardProps {
  key?: any;
  title: string;
  severity: 'Critical' | 'High' | 'Medium';
  location: string;
  time: string;
  description: string;
  onDispatch: () => void;
}

export default function AlertCard({ title, severity, location, time, description, onDispatch }: AlertCardProps) {
  let severityBadge = '';
  switch (severity) {
    case 'Critical':
      severityBadge = 'bg-[#FDE8E8] text-[#9B1C1C] border-[#F89999]';
      break;
    case 'High':
      severityBadge = 'bg-[#FFF8E1] text-[#B76E00] border-[#FFE082]';
      break;
    case 'Medium':
      severityBadge = 'bg-[#FFF8E1] text-[#B76E00] border-[#FFE082]';
      break;
  }

  return (
    <div className="glass-card group relative flex flex-col space-y-2.5 p-3.5 border border-[#C0D1E3]">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-xs font-bold text-[#1450A0] tracking-wide">{title}</h4>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#526D8E]">
            <span className="flex items-center font-semibold text-[#2C4466]">
              <MapPin className="mr-1 h-3.5 w-3.5 text-[#3E8EDE]" />
              {location}
            </span>
            <span className="flex items-center text-[#657E9E]">
              <Clock className="mr-1 h-3.5 w-3.5" />
              {time}
            </span>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${severityBadge}`}>
          {severity}
        </span>
      </div>

      <p className="text-xs leading-relaxed text-[#2C4466]">{description}</p>

      <div className="flex justify-end pt-1">
        <button
          onClick={onDispatch}
          className="glass-button-green flex items-center space-x-1.5 px-3 py-1 text-xs font-bold tracking-wide"
          type="button"
        >
          <Send className="h-3 w-3" />
          <span>DISPATCH UNIT</span>
        </button>
      </div>
    </div>
  );
}
