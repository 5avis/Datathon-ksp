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
      severityBadge = 'border border-red-400/40 bg-red-500/20 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.25)]';
      break;
    case 'High':
      severityBadge = 'border border-orange-400/40 bg-orange-500/20 text-orange-300 shadow-[0_0_12px_rgba(249,115,22,0.25)]';
      break;
    case 'Medium':
      severityBadge = 'border border-amber-400/40 bg-amber-500/20 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]';
      break;
  }

  return (
    <div className="glass-card glass-card-hover group relative flex flex-col space-y-3 p-4 backdrop-blur-xl">
      {severity === 'Critical' && (
        <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-red-500/10 blur-2xl transition-transform duration-500 group-hover:scale-125"></div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-bold text-white tracking-wide">{title}</h4>
          <div className="mt-1 flex flex-wrap items-center gap-3 font-mono text-[11px] text-slate-400">
            <span className="flex items-center">
              <MapPin className="mr-1 h-3 w-3 text-blue-400" />
              {location}
            </span>
            <span className="flex items-center">
              <Clock className="mr-1 h-3 w-3 text-indigo-400" />
              {time}
            </span>
          </div>
        </div>
        <span className={`glass-badge text-[10px] ${severityBadge}`}>
          {severity}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-slate-300">{description}</p>

      <div className="flex justify-end pt-1">
        <button
          onClick={onDispatch}
          className="glass-button flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-mono tracking-wider font-semibold"
          type="button"
        >
          <Send className="h-3 w-3" />
          <span>DISPATCH UNIT</span>
        </button>
      </div>
    </div>
  );
}
