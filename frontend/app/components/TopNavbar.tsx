import React from 'react';
import { Search, Bell, Activity, Wifi } from 'lucide-react';

export default function TopNavbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between glass-header px-4 sm:px-6">
      <div className="relative w-full max-w-xs sm:w-64">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
          <Search className="h-4 w-4" />
        </span>
        <input
          type="text"
          placeholder="Search suspects, FIRs..."
          className="glass-input w-full py-1.5 pl-9 text-xs"
        />
      </div>

      <div className="ml-4 flex items-center space-x-2 sm:space-x-4">
        <div className="hidden items-center space-x-1.5 glass-badge bg-emerald-500/10 text-emerald-300 border-emerald-500/20 font-mono text-[11px] md:flex shadow-[0_0_12px_rgba(16,185,129,0.2)]">
          <Wifi className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
          <span>GRID SYNC: ONLINE</span>
        </div>

        <button className="glass-button-secondary relative p-2 text-slate-300" type="button" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
        </button>

        <div className="glass-badge bg-blue-500/15 text-blue-300 border-blue-400/30 font-mono text-[10px] space-x-1 shadow-[0_0_12px_rgba(59,130,246,0.2)]">
          <Activity className="h-3 w-3" />
          <span>CPU: 18%</span>
        </div>
      </div>
    </header>
  );
}
