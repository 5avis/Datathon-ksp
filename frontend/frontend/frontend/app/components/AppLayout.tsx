import React from 'react';

interface AppLayoutProps {
  children?: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020617] text-slate-100 font-sans antialiased">
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_15%_15%,rgba(59,130,246,0.18),transparent_45%),radial-gradient(ellipse_at_85%_85%,rgba(147,51,234,0.15),transparent_45%),radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.08),transparent_60%)]">
        {children}
      </div>
    </div>
  );
}
