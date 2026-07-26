"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield, LayoutDashboard, Map, FileText, Settings, Users, AlertTriangle,
  Bot, BarChart3, Network, DollarSign, TrendingUp, FileBarChart,
  ClipboardList, Search, ChevronDown, ChevronRight, Folder
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
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    Operations: true,
    Intelligence: true,
    Registry: true,
    Administration: true,
  });

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} hidden h-full shrink-0 flex-col border-r border-[#B8C6D6] bg-[#F2F7FC] transition-all duration-200 md:flex shadow-[2px_0_8px_rgba(20,80,160,0.1)] z-30`}>
      {/* Glossy Window Titlebar */}
      <div className="flex h-12 shrink-0 items-center justify-between glass-header px-3">
        {!collapsed && (
          <div className="flex min-w-0 items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-gradient-to-b from-[#FFF] to-[#CBE2F7] border border-[#14498C] shadow-sm">
              <Shield className="h-4 w-4 text-[#1450A0]" />
            </div>
            <span className="truncate font-sans text-xs font-black tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              Crime Intel 2.0
            </span>
          </div>
        )}
        {collapsed && <Shield className="mx-auto h-5 w-5 text-white" />}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="glass-button-secondary shrink-0 p-1 text-[#1450A0]"
          title={collapsed ? 'Expand' : 'Collapse'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          type="button"
        >
          {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5 rotate-180" />}
        </button>
      </div>

      {/* Explorer Tree-View Navigation */}
      <nav className="flex-1 space-y-3 overflow-y-auto px-2 py-3">
        {navGroups.map((group) => {
          const isOpen = expandedGroups[group.label] ?? true;
          return (
            <div key={group.label} className="select-none">
              {!collapsed && (
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="mb-1 flex w-full items-center justify-between px-2 py-1 text-[11px] font-bold text-[#1450A0] hover:bg-[#E2EEF8] rounded transition"
                  type="button"
                >
                  <div className="flex items-center space-x-1.5">
                    <Folder className="h-3.5 w-3.5 text-[#F5C242] fill-[#F5C242]" />
                    <span className="uppercase tracking-wider">{group.label}</span>
                  </div>
                  {isOpen ? <ChevronDown className="h-3 w-3 text-[#1450A0]" /> : <ChevronRight className="h-3 w-3 text-[#1450A0]" />}
                </button>
              )}

              {(isOpen || collapsed) && (
                <div className="space-y-0.5 pl-2">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        title={collapsed ? item.name : undefined}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-2.5'} rounded-md px-2.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
                          isActive
                            ? 'glass-button text-white shadow-md'
                            : 'text-[#2C4466] hover:bg-[#DCE8F4] hover:text-[#1450A0] hover:border hover:border-[#B0C6DC]'
                        }`}
                      >
                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-[#3E8EDE]'}`} />
                        {!collapsed && <span className="truncate">{item.name}</span>}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Profile Bar */}
      {!collapsed && (
        <div className="shrink-0 border-t border-[#B8C6D6] bg-[#E4EEF7] p-2.5">
          <div className="flex items-center space-x-2.5 rounded-md border border-[#A8BDD4] bg-white p-2 shadow-sm">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#6BB8F0] to-[#1D5DAE] text-[10px] font-bold text-white shadow-sm border border-[#14498C]">
              IO
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-[#1450A0]">Officer Rathore</p>
              <p className="truncate text-[10px] text-[#4A668C]">Central Division</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
