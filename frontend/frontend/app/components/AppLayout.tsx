import React from 'react';

interface AppLayoutProps {
  children?: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#EAF4FC] text-[#1F3250] font-sans antialiased">
      <div className="min-h-screen bg-[linear-gradient(140deg,#EAF4FC_0%,#D8E7F5_40%,#E3EEF8_70%,#FFFFFF_100%)]">
        {children}
      </div>
    </div>
  );
}
