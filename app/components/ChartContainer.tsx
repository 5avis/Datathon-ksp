import React from 'react';

interface ChartContainerProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export default function ChartContainer({ title, subtitle, children }: ChartContainerProps) {
  return (
    <div className="glass-card flex h-full flex-col p-4 rounded-lg">
      <div className="border-b border-[#C0D1E3] pb-2.5 mb-2">
        <h3 className="text-sm font-bold text-[#1450A0] tracking-wide">{title}</h3>
        <p className="mt-0.5 text-xs text-[#526D8E] font-sans">{subtitle}</p>
      </div>
      <div className="flex flex-1 flex-col justify-center">
        {children}
      </div>
    </div>
  );
}
