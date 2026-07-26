import React from 'react';
import { Search, Bell, Activity, Wifi } from 'lucide-react';

export default function TopNavbar() {
  return (
    <header className="sticky top-0 z-40 flex h-12 shrink-0 items-center justify-between glass-header px-4">
      <div className="relative w-full max-w-xs sm:w-72">
        <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-[#5D7A9E]">
          <Search className="h-3.5 w-3.5" />
        </span>
        <input
          type="text"
          placeholder="Search suspects, FIRs, vehicles..."
          className="glass-input h-7 w-full pl-8 text-xs font-medium"
        />
      </div>

      <div className="ml-4 flex items-center space-x-2.5">
        <div className="hidden h-7 items-center space-x-1.5 glass-button-green text-xs md:flex px-3 rounded text-white shadow-sm font-sans font-bold">
          <Wifi className="h-3.5 w-3.5 animate-pulse text-white" />
          <span>GRID SYNC: ONLINE</span>
        </div>

        <button className="glass-button-secondary relative h-7 w-7 flex items-center justify-center p-0 text-[#1450A0] rounded" type="button" aria-label="Notifications">
          <Bell className="h-3.5 w-3.5 text-[#1450A0]" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#EF4444] border border-white"></span>
        </button>

        <div className="h-7 glass-badge bg-[#EAF4FC] text-[#1450A0] border-[#99BCE0] text-xs flex items-center space-x-1 px-2.5 rounded font-sans font-bold">
          <Activity className="h-3.5 w-3.5 text-[#3E8EDE]" />
          <span>CPU: 18%</span>
        </div>
      </div>
    </header>
  );
}
