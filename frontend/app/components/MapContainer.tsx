import React from 'react';

interface MapContainerProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export default function MapContainer({ title, subtitle, children }: MapContainerProps) {
  return (
    <div className="glass-card flex h-full flex-col p-6 backdrop-blur-2xl border-white/10 shadow-2xl">
      <div className="mb-4 border-b border-white/10 pb-3">
        <h3 className="text-base font-bold text-white tracking-wide">{title}</h3>
        <p className="mt-1 text-xs text-slate-400 font-mono">{subtitle}</p>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
