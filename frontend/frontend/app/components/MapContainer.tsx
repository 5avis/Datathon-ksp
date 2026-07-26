import React from 'react';

interface MapContainerProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export default function MapContainer({ title, subtitle, children }: MapContainerProps) {
  return (
    <div className="glass-card flex h-full flex-col p-5">
      <div className="mb-4 border-b border-[#C0D1E3] pb-3">
        <h3 className="text-sm font-bold text-[#1A3459] tracking-wide">{title}</h3>
        <p className="mt-0.5 text-xs text-[#526D8E] font-sans">{subtitle}</p>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

