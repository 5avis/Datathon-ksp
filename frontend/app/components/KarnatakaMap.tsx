"use client";
import React, { useState } from 'react';
import { Shield, AlertTriangle, Radio, Navigation, Eye, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';

interface KarnatakaDistrict {
  id: string;
  name: string;
  range: string;
  policeStations: number;
  activeCases: number;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  coordinates: string;
  x: number; // SVG X position
  y: number; // SVG Y position
  crimeType: string;
  patrolUnits: string;
}

const karnatakaDistricts: KarnatakaDistrict[] = [
  {
    id: 'blr',
    name: 'Bengaluru Urban & City Commissionerate',
    range: 'City Commissionerate HQ',
    policeStations: 112,
    activeCases: 1420,
    riskLevel: 'Critical',
    coordinates: '12.9716° N, 77.5946° E',
    x: 580,
    y: 660,
    crimeType: 'Cyber Fraud & Commercial Theft',
    patrolUnits: '34 Mobile Patrols Active'
  },
  {
    id: 'mys',
    name: 'Mysuru Division',
    range: 'Southern Range',
    policeStations: 38,
    activeCases: 340,
    riskLevel: 'Medium',
    coordinates: '12.2958° N, 76.6394° E',
    x: 440,
    y: 760,
    crimeType: 'Heritage Security & Inter-state Checkpost',
    patrolUnits: '12 Patrols Active'
  },
  {
    id: 'mng',
    name: 'Mangaluru & Dakshina Kannada',
    range: 'Western Range (Coastal Command)',
    policeStations: 42,
    activeCases: 512,
    riskLevel: 'High',
    coordinates: '12.8700° N, 74.8800° E',
    x: 200,
    y: 640,
    crimeType: 'Port Zone Contraband & Coastal Smuggling',
    patrolUnits: '18 Patrols & Marine Wing'
  },
  {
    id: 'hbl',
    name: 'Hubballi - Dharwad Twin Cities',
    range: 'Northern Range',
    policeStations: 29,
    activeCases: 410,
    riskLevel: 'High',
    coordinates: '15.3647° N, 75.1240° E',
    x: 310,
    y: 300,
    crimeType: 'Transit Interception & Vehicle Theft',
    patrolUnits: '15 Mobile Patrols'
  },
  {
    id: 'blg',
    name: 'Belagavi District Command',
    range: 'Northern Range (Border Checkpost)',
    policeStations: 48,
    activeCases: 380,
    riskLevel: 'Medium',
    coordinates: '15.8497° N, 74.4977° E',
    x: 230,
    y: 220,
    crimeType: 'Cross-border Intercept & Highway Crime',
    patrolUnits: '16 Border Checkposts'
  },
  {
    id: 'klb',
    name: 'Kalaburagi Division',
    range: 'North-Eastern Range',
    policeStations: 35,
    activeCases: 290,
    riskLevel: 'High',
    coordinates: '17.3297° N, 76.8343° E',
    x: 550,
    y: 120,
    crimeType: 'Land Disputes & Property Crimes',
    patrolUnits: '10 Patrols Active'
  },
  {
    id: 'blr_ind',
    name: 'Ballari & Vijayanagara Range',
    range: 'North-Eastern Range',
    policeStations: 26,
    activeCases: 245,
    riskLevel: 'Medium',
    coordinates: '15.1394° N, 76.9214° E',
    x: 520,
    y: 330,
    crimeType: 'Industrial Logistics & Illegal Mining Check',
    patrolUnits: '9 Patrol Units'
  },
  {
    id: 'smg',
    name: 'Shivamogga (Shimoga) Malnad Division',
    range: 'Central Range',
    policeStations: 24,
    activeCases: 195,
    riskLevel: 'Low',
    coordinates: '13.9299° N, 75.5681° E',
    x: 310,
    y: 480,
    crimeType: 'Forest Produce & Timber Protection',
    patrolUnits: '8 Forest Patrol Units'
  },
  {
    id: 'bdr',
    name: 'Bidar Northern Tip Command',
    range: 'North-Eastern Range',
    policeStations: 19,
    activeCases: 180,
    riskLevel: 'Medium',
    coordinates: '17.9104° N, 77.5199° E',
    x: 590,
    y: 50,
    crimeType: 'Tri-State Highway Intercept',
    patrolUnits: '7 Border Outposts'
  },
  {
    id: 'udr',
    name: 'Udupi Coastal Sector',
    range: 'Western Range',
    policeStations: 18,
    activeCases: 140,
    riskLevel: 'Low',
    coordinates: '13.3409° N, 74.7421° E',
    x: 180,
    y: 550,
    crimeType: 'Maritime Patrol & Tourist Safety',
    patrolUnits: '6 Coastal Outposts'
  }
];

const riskStyles = {
  Critical: { bg: 'bg-red-500', border: 'border-red-600', text: 'text-red-700', badge: 'bg-red-100 text-red-700 border-red-300' },
  High: { bg: 'bg-orange-500', border: 'border-orange-600', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700 border-orange-300' },
  Medium: { bg: 'bg-amber-500', border: 'border-amber-600', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700 border-amber-300' },
  Low: { bg: 'bg-blue-500', border: 'border-blue-600', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700 border-blue-300' },
};

export default function KarnatakaMap() {
  const [selectedDistrict, setSelectedDistrict] = useState<KarnatakaDistrict>(karnatakaDistricts[0]);
  const [layers, setLayers] = useState({
    heatmap: true,
    stations: true,
    patrols: true,
    boundaries: true
  });

  const toggleLayer = (key: keyof typeof layers) => setLayers(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="relative w-full rounded-xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] border border-slate-700/70 p-4 shadow-2xl text-slate-100 overflow-hidden">
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-3 mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/40 bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-400">
                KARNATAKA STATE POLICE (KSP) GIS CORE
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-medium text-emerald-400 border border-emerald-500/30">
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                LIVE SATELLITE FEED
              </span>
            </div>
            <h2 className="text-sm font-bold text-white tracking-wide">
              Official State Tactical GIS & Crime Hotspot Map
            </h2>
          </div>
        </div>

        {/* GPS Badge */}
        <div className="flex items-center space-x-2 rounded-lg border border-blue-400/30 bg-blue-950/60 px-3 py-1.5 font-mono text-xs text-blue-300 backdrop-blur-md">
          <Radio className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
          <span>GPS LOCK: {selectedDistrict.coordinates}</span>
        </div>
      </div>

      {/* Main Map Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Interactive Map Canvas (8 Columns) */}
        <div className="lg:col-span-8 relative min-h-[520px] rounded-xl border border-slate-700/70 bg-[#070F1E] overflow-hidden flex items-center justify-center">
          {/* Subtle Radar Background Grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(#38BDF8 1px, transparent 1px), radial-gradient(#38BDF8 1px, #070F1E 1px)',
              backgroundSize: '36px 36px',
              backgroundPosition: '0 0, 18px 18px',
            }}
          ></div>

          {/* Arabian Sea Label */}
          <div className="absolute top-1/2 left-4 -translate-y-1/2 font-mono text-[10px] tracking-widest text-slate-500/70 uppercase -rotate-90 pointer-events-none select-none">
            Arabian Sea (Coastal Sector)
          </div>

          {/* Neighboring States Annotations */}
          <span className="absolute top-6 left-12 font-mono text-[9px] text-slate-500/80 uppercase pointer-events-none">Goa Border</span>
          <span className="absolute top-4 left-1/3 font-mono text-[9px] text-slate-500/80 uppercase pointer-events-none">Maharashtra Border</span>
          <span className="absolute top-12 right-12 font-mono text-[9px] text-slate-500/80 uppercase pointer-events-none">Telangana / AP Border</span>
          <span className="absolute bottom-12 right-6 font-mono text-[9px] text-slate-500/80 uppercase pointer-events-none">Tamil Nadu Border</span>
          <span className="absolute bottom-4 left-1/3 font-mono text-[9px] text-slate-500/80 uppercase pointer-events-none">Kerala Border</span>

          {/* Heatmap Layer Gradients */}
          {layers.heatmap && (
            <g className="pointer-events-none">
              {/* Bengaluru High Density Heat Node */}
              <div className="absolute top-[64%] left-[68%] -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-red-600/30 blur-2xl animate-pulse pointer-events-none"></div>
              {/* Hubballi Heat Node */}
              <div className="absolute top-[32%] left-[38%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-orange-500/25 blur-2xl pointer-events-none"></div>
              {/* Mangaluru Coastal Heat Node */}
              <div className="absolute top-[62%] left-[24%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-orange-600/20 blur-xl pointer-events-none"></div>
              {/* Kalaburagi Heat Node */}
              <div className="absolute top-[16%] left-[64%] -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-amber-500/20 blur-xl pointer-events-none"></div>
            </g>
          )}

          {/* SVG Vector Map of Karnataka State */}
          <svg viewBox="0 0 800 900" className="w-full h-full max-h-[500px] z-10 drop-shadow-[0_0_25px_rgba(59,130,246,0.15)]">
            <defs>
              <linearGradient id="karnatakaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#0F172A" stopOpacity="0.90" />
                <stop offset="100%" stopColor="#1E293B" stopOpacity="0.85" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Official Karnataka Geographic Outline Path */}
            <path
              d="M 580 40 
                 L 620 70 
                 L 570 140 
                 L 640 210 
                 L 600 340 
                 L 690 440 
                 L 720 590 
                 L 700 660 
                 L 620 740 
                 L 530 840 
                 L 460 880 
                 L 420 830 
                 L 350 780 
                 L 270 730 
                 L 220 680 
                 L 190 620 
                 L 160 520 
                 L 130 420 
                 L 140 350 
                 L 210 240 
                 L 220 180 
                 L 300 210 
                 L 380 180 
                 L 460 130 
                 L 510 70 Z"
              fill="url(#karnatakaGrad)"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeDasharray={layers.boundaries ? "none" : "4 4"}
              className="transition-all duration-500 hover:stroke-blue-400 filter"
            />

            {/* Internal District Connector Grid & Ranges */}
            {layers.boundaries && (
              <g stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.6">
                <line x1="580" y1="40" x2="310" y2="300" />
                <line x1="310" y1="300" x2="580" y2="660" />
                <line x1="310" y1="300" x2="200" y2="640" />
                <line x1="580" y1="660" x2="440" y2="760" />
                <line x1="580" y1="660" x2="550" y2="120" />
              </g>
            )}

            {/* Patrol Vectors Overlay */}
            {layers.patrols && (
              <g opacity="0.8">
                {/* Bengaluru to Mysuru Patrol Vector */}
                <path d="M 580 660 L 500 710 L 440 760" stroke="#10B981" strokeWidth="2.5" strokeDasharray="6 4" fill="none" />
                {/* Belagavi to Hubballi Patrol Vector */}
                <path d="M 230 220 L 310 300" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="6 4" fill="none" />
                {/* Mangaluru Coastal Patrol Vector */}
                <path d="M 180 550 L 200 640" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="6 4" fill="none" />
              </g>
            )}

            {/* Interactive District Pins */}
            {karnatakaDistricts.map((district) => {
              const isSelected = selectedDistrict.id === district.id;
              const style = riskStyles[district.riskLevel];

              return (
                <g
                  key={district.id}
                  transform={`translate(${district.x}, ${district.y})`}
                  className="cursor-pointer group"
                  onClick={() => setSelectedDistrict(district)}
                >
                  {/* Outer Pulsing Ring for High Risk */}
                  {(district.riskLevel === 'Critical' || district.riskLevel === 'High') && (
                    <circle
                      r="16"
                      className={`${style.bg} opacity-30 animate-ping`}
                    />
                  )}

                  {/* Marker Pin Base */}
                  <circle
                    r={isSelected ? "12" : "9"}
                    className={`${style.bg} stroke-white stroke-2 shadow-lg transition-all duration-300 group-hover:scale-125`}
                  />

                  {/* Icon / Selection Ring */}
                  {isSelected && (
                    <circle
                      r="16"
                      fill="none"
                      stroke="#38BDF8"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                      className="animate-spin"
                    />
                  )}

                  {/* District Text Label */}
                  <text
                    x="16"
                    y="4"
                    fill={isSelected ? "#38BDF8" : "#94A3B8"}
                    fontSize={isSelected ? "13" : "11"}
                    fontWeight={isSelected ? "bold" : "normal"}
                    fontFamily="sans-serif"
                    className="select-none pointer-events-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                  >
                    {district.name.split('&')[0].trim()}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Map Layer Toggles (Bottom Left) */}
          <div className="absolute bottom-3 left-3 z-20 rounded-lg border border-slate-700/80 bg-slate-900/90 p-2.5 backdrop-blur-md shadow-xl text-[11px]">
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              GIS Tactical Layers
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {Object.entries({
                'Heatmap': 'heatmap',
                'Police Stations': 'stations',
                'Patrol Vectors': 'patrols',
                'District Boundaries': 'boundaries'
              }).map(([label, key]) => (
                <label key={key} className="flex items-center space-x-1.5 cursor-pointer text-slate-300 hover:text-blue-400 transition">
                  <input
                    type="checkbox"
                    checked={layers[key as keyof typeof layers]}
                    onChange={() => toggleLayer(key as keyof typeof layers)}
                    className="rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-0 h-3 w-3"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Karnataka District Telemetry Briefing (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col justify-between rounded-xl border border-slate-700/70 bg-slate-900/80 p-4 backdrop-blur-xl">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <span className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${riskStyles[selectedDistrict.riskLevel].badge}`}>
                {selectedDistrict.riskLevel} RISK ZONE
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                RANGE: {selectedDistrict.range}
              </span>
            </div>

            <h3 className="text-base font-bold text-white tracking-wide leading-snug">
              {selectedDistrict.name}
            </h3>
            <p className="font-mono text-xs text-blue-400 mt-1">
              📍 {selectedDistrict.coordinates}
            </p>

            {/* Metrics Breakdown */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-2.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active FIRs</span>
                <span className="text-lg font-bold text-white mt-0.5 block">{selectedDistrict.activeCases}</span>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-2.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Police Stations</span>
                <span className="text-lg font-bold text-blue-400 mt-0.5 block">{selectedDistrict.policeStations} Stations</span>
              </div>
            </div>

            {/* Tactical Details */}
            <div className="mt-4 space-y-2.5 text-xs text-slate-300">
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-2.5">
                <span className="font-mono text-[10px] text-slate-400 uppercase block mb-1">Primary Crime Classification</span>
                <p className="font-semibold text-slate-200">{selectedDistrict.crimeType}</p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-2.5">
                <span className="font-mono text-[10px] text-slate-400 uppercase block mb-1">Patrol Deployment</span>
                <p className="font-semibold text-emerald-400 flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  {selectedDistrict.patrolUnits}
                </p>
              </div>
            </div>
          </div>

          {/* District Selection Quick Bar */}
          <div className="mt-4 border-t border-slate-800 pt-3">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-2">
              Karnataka Division Selector
            </span>
            <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
              {karnatakaDistricts.map(d => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDistrict(d)}
                  className={`flex items-center justify-between text-[11px] p-1.5 rounded transition ${
                    selectedDistrict.id === d.id
                      ? 'bg-blue-600/30 text-white border border-blue-400/40 font-semibold'
                      : 'bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{d.name.split(' ')[0]}</span>
                  <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
