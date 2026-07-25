"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield, LayoutDashboard, Map, FileText, Settings, Users, AlertTriangle,
  Bot, BarChart3, Network, DollarSign, TrendingUp, FileBarChart,
  ClipboardList, Search, ChevronLeft, ChevronRight
} from 'lucide-react';

const navGroups = [
  {
    label: 'Operations',
    items: [
      { name: 'Dashboard', path: '/', icon: LayoutDashboard },
      { name: 'Case Investigation', path: '/investigations', icon: Search },
      { name: 'Crime Map', path: '/map', icon: Map },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { name: 'AI Crime Assistant', path: '/ai-assistant', icon: Bot },
      { name: 'Crime Analytics', path: '/analytics', icon: BarChart3 },
      { name: 'Criminal Networks', path: '/networks', icon: Network },
      { name: 'Offender Profiles', path: '/offenders', icon: Users },
      { name: 'Financial Crime', path: '/financial', icon: DollarSign },
      { name: 'Crime Forecasting', path: '/forecasting', icon: TrendingUp },
    ],
  },
  {
    label: 'Registry',
    items: [
      { name: 'FIR Registry', path: '/fir-registry', icon: FileText },
      { name: 'Hotspot Map', path: '/hotspots', icon: AlertTriangle },
      { name: 'Emergencies', path: '/emergencies', icon: AlertTriangle },
    ],
  },
  {
    label: 'Administration',
    items: [
      { name: 'Reports', path: '/reports', icon: FileBarChart },
      { name: 'Audit Logs', path: '/audit-logs', icon: ClipboardList },
      { name: 'Settings', path: '/settings', icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} hidden h-full shrink-0 flex-col border-r border-white/10 bg-slate-950/40 backdrop-blur-2xl transition-all duration-300 md:flex shadow-2xl`}>
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4">
        {!collapsed && (
          <div className="flex min-w-0 items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-400/40 bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Shield className="h-4.5 w-4.5 text-blue-400" />
            </div>
            <span className="truncate font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-white">
              Crime Intel
            </span>
          </div>
        )}
        {collapsed && <Shield className="mx-auto h-4.5 w-4.5 text-blue-400" />}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="glass-button-secondary shrink-0 p-1 text-slate-400"
          title={collapsed ? 'Expand' : 'Collapse'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          type="button"
        >
          {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-2.5 py-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <span className="mb-2 block px-2 font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-blue-400/70">
                {group.label}
              </span>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    title={collapsed ? item.name : undefined}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all duration-300 ${
                      isActive
                        ? 'border-blue-400/40 bg-blue-600/30 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] backdrop-blur-md'
                        : 'border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]' : ''}`} />
                    {!collapsed && <span className="truncate">{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="shrink-0 border-t border-white/10 p-3">
          <div className="glass-card flex items-center space-x-2.5 p-2.5 backdrop-blur-xl">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/20 text-[10px] font-bold text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
              IO
            </div>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-bold text-white">Officer Rathore</p>
              <p className="truncate font-mono text-[9px] text-slate-400">Central Division</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
