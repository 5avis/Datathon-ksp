import React from 'react';

interface ChartContainerProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export default function ChartContainer({ title, subtitle, children }: ChartContainerProps) {
  return (
    <div className="glass-card flex h-full flex-col p-6 backdrop-blur-2xl border-white/10 shadow-2xl">
      <div className="border-b border-white/10 pb-3">
        <h3 className="text-base font-bold text-white tracking-wide">{title}</h3>
        <p className="mt-1 text-xs text-slate-400 font-mono">{subtitle}</p>
      </div>
      <div className="flex flex-1 flex-col justify-center">
        {children}
      </div>
    </div>
  );
}
