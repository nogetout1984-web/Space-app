/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { SRC_SOLAR_DATA, SRC_SUN_DATA, SrcPlanetItem } from '../data/srcSolarData';
import { PLANET_MONOGRAPHS, PlanetMonograph } from '../data/planetMonographsData';
import { PROBES_MONOGRAPHS, ProbeMonograph } from '../data/probesMonographsData';
import { sound } from '../utils/audioEngine';
import {
  Sun,
  Globe,
  Satellite,
  Scale,
  LayoutGrid,
  ChevronDown,
  ChevronRight,
  Crosshair,
  Search,
  Atom,
  Layers,
  Flame,
  Clock,
  Sparkles,
  Rocket,
  Compass,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';

export type EncyclopediaRoute =
  | { type: 'sun' }
  | { type: 'planet'; id: string }
  | { type: 'probe'; id: string }
  | { type: 'compare' }
  | { type: 'catalog' };

interface EncyclopediaViewProps {
  route: EncyclopediaRoute;
  onChangeRoute: (newRoute: EncyclopediaRoute) => void;
  onCloseTo3D: () => void;
  onFocusIn3D: (planetId: string, moonId?: string | null, probeId?: string | null) => void;
}

// Procedural SVG fallback generator so zero broken images ever appear
function createFallbackSvg(title: string, hexColor: string, subtitle = 'SRC ARCHIVE'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
    <rect width="480" height="320" fill="#07090f"/>
    <circle cx="240" cy="145" r="78" fill="${hexColor}" opacity="0.82"/>
    <circle cx="218" cy="122" r="64" fill="#ffffff" opacity="0.12"/>
    <circle cx="240" cy="145" r="102" fill="none" stroke="${hexColor}" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.45"/>
    <text x="240" y="268" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-weight="bold" font-size="16" letter-spacing="3">${title.toUpperCase()}</text>
    <text x="240" y="290" text-anchor="middle" fill="#00f0ff" font-family="monospace" font-size="11" letter-spacing="2">${subtitle.toUpperCase()}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Persistent SRC 0.09 Opacity Futuristic Vector Watermark
const SrcWatermarkSvg: React.FC = () => (
  <svg
    id="src-watermark"
    viewBox="0 0 600 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="srcGradEnc" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00f0ff" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <polygon
      points="50,30 550,30 590,150 550,270 50,270 10,150"
      fill="none"
      stroke="url(#srcGradEnc)"
      strokeWidth="6"
    />
    <polygon
      points="70,50 530,50 565,150 530,250 70,250 35,150"
      fill="none"
      stroke="#00f0ff"
      strokeWidth="2"
      strokeDasharray="14 8"
    />
    <text
      x="50%"
      y="58%"
      textAnchor="middle"
      fill="url(#srcGradEnc)"
      fontFamily="Orbitron, 'Chakra Petch', 'Segoe UI', sans-serif"
      fontWeight="900"
      fontSize="145"
      letterSpacing="22"
    >
      SRC
    </text>
    <text
      x="50%"
      y="80%"
      textAnchor="middle"
      fill="#00f0ff"
      fontFamily="monospace"
      fontSize="18"
      letterSpacing="10"
    >
      STELLAR RECONNAISSANCE CORP
    </text>
  </svg>
);

const TERRESTRIAL_IDS = ['mercury', 'venus', 'earth', 'mars'];
const GIANT_IDS = ['jupiter', 'saturn', 'uranus', 'neptune'];
const ALL_PLANET_IDS = [...TERRESTRIAL_IDS, ...GIANT_IDS];
const ALL_PROBE_IDS = Object.keys(PROBES_MONOGRAPHS);

export const EncyclopediaView: React.FC<EncyclopediaViewProps> = ({
  route,
  onChangeRoute,
  onCloseTo3D,
  onFocusIn3D,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sidebar Accordion States
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    sun: true,
    terrestrial: true,
    giants: true,
    probes: true,
    tools: true,
  });

  // Search filter in sidebar
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Comparator State
  const [compareMode, setCompareMode] = useState<'planets' | 'probes'>('planets');
  const [comparePlanetA, setComparePlanetA] = useState<string>('earth');
  const [comparePlanetB, setComparePlanetB] = useState<string>('jupiter');
  const [compareProbeA, setCompareProbeA] = useState<string>('voyager');
  const [compareProbeB, setCompareProbeB] = useState<string>('jwst');

  const toggleGroup = (key: string) => {
    sound.playBeep(660, 0.03);
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navigateTo = (newRoute: EncyclopediaRoute) => {
    sound.playBeep(760, 0.05);
    onChangeRoute(newRoute);
    setMobileSidebarOpen(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    sound.playBeep(820, 0.04);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter helpers for sidebar search
  const q = searchQuery.trim().toLowerCase();
  const filteredTerrestrial = TERRESTRIAL_IDS.filter(
    (id) => !q || PLANET_MONOGRAPHS[id].name.toLowerCase().includes(q)
  );
  const filteredGiants = GIANT_IDS.filter(
    (id) => !q || PLANET_MONOGRAPHS[id].name.toLowerCase().includes(q)
  );
  const filteredProbes = ALL_PROBE_IDS.filter((id) => {
    const p = PROBES_MONOGRAPHS[id];
    return (
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.acronym.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  // Render Sub-Section Sticky Jump Bar
  const renderSectionJumpBar = (
    items: { id: string; label: string }[],
    accent: 'amber' | 'cyan' = 'cyan'
  ) => (
    <div className="sticky top-0 z-30 bg-[#080b12]/95 border-b border-white/10 py-2.5 px-4 -mx-4 sm:-mx-6 mb-6 flex items-center gap-2 overflow-x-auto">
      <span className="text-[11px] font-mono text-slate-400 shrink-0 mr-1">
        SECTIONS:
      </span>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={`px-3 py-1 rounded text-xs font-mono whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
            accent === 'amber'
              ? 'bg-amber-500/10 border-amber-400/30 text-amber-300 hover:bg-amber-400 hover:text-black'
              : 'bg-cyan-500/10 border-cyan-400/30 text-cyan-300 hover:bg-cyan-400 hover:text-black'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  // ============================================================================
  // 1. RENDER THE SUN (SOL) MONOGRAPH
  // ============================================================================
  const renderSunMonograph = () => (
    <div className="space-y-8 pb-12">
      {renderSectionJumpBar(
        [
          { id: 'sec-overview', label: '01. Telemetry & Composition' },
          { id: 'sec-works', label: '02. How It Works & 6 Layers' },
          { id: 'sec-formed', label: '03. How It Formed' },
          { id: 'sec-die', label: '04. When It Will Die' },
          { id: 'sec-facts', label: '05. Solar Fun Facts' },
        ],
        'amber'
      )}

      {/* Section 01: Hero & Telemetry */}
      <div id="sec-overview" className="planet-card !border-amber-500/35">
        <div className="flex flex-col gap-3">
          <img
            src={SRC_SUN_DATA.image}
            alt={SRC_SUN_DATA.name}
            referrerPolicy="no-referrer"
            className="planet-photo !h-56 !border-amber-400/30"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = createFallbackSvg(
                'THE SUN (SOL)',
                '#f59e0b',
                'G2V YELLOW DWARF'
              );
            }}
          />
          <button
            onClick={() => onFocusIn3D('sun')}
            className="w-full py-2.5 px-3 rounded border border-amber-400/50 bg-amber-500/15 hover:bg-amber-400 hover:text-black text-amber-300 text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Crosshair className="w-3.5 h-3.5" /> Focus The Sun in 3D Simulation
          </button>

          <div className="bg-black/45 border border-white/10 rounded-md p-3.5 space-y-2">
            <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-bold">
              Photospheric Elemental Composition (By Mass)
            </div>
            {SRC_SUN_DATA.composition.map((comp) => (
              <div key={comp.element} className="flex justify-between text-xs font-mono tabular-nums">
                <span className="text-slate-300">{comp.element}</span>
                <span className="text-amber-300 font-bold">{comp.byMass}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <div className="text-xs font-mono text-amber-400 mb-1">
                00. STELLAR ANCHOR · {SRC_SUN_DATA.spectralClass} · Age: {SRC_SUN_DATA.age}
              </div>
              <h2 className="!mb-0 text-amber-300 text-2xl sm:text-3xl">{SRC_SUN_DATA.name}</h2>
            </div>
            <span className="text-xs font-mono text-amber-300">
              99.86% of Solar System Mass
            </span>
          </div>

          <p className="planet-desc !mb-2">{SRC_SUN_DATA.summary}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {SRC_SUN_DATA.metrics.map((m) => (
              <div key={m.label} className="bg-black/45 border border-white/10 p-2.5 rounded">
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-0.5">
                  {m.label}
                </span>
                <span className="text-xs font-mono tabular-nums text-white font-bold">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 02: How the Sun Works */}
      <div id="sec-works" className="bg-[#0c0f17]/90 border border-white/10 rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
          <Atom className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold tracking-wider text-cyan-300">
            02. {SRC_SUN_DATA.howItWorks.title}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/40 border border-white/10 p-4 rounded-lg">
            <div className="text-xs font-mono text-cyan-300 font-bold uppercase mb-1.5">
              Hydrostatic Equilibrium Balance
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {SRC_SUN_DATA.howItWorks.coreMechanism}
            </p>
          </div>
          <div className="bg-black/40 border border-white/10 p-4 rounded-lg">
            <div className="text-xs font-mono text-amber-300 font-bold uppercase mb-1.5">
              Proton-Proton Nuclear Fusion (E = mc²)
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {SRC_SUN_DATA.howItWorks.fusionProcess}
            </p>
          </div>
        </div>

        <div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-400" /> The 6 Internal & Atmospheric Solar Zones (Inside → Out)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {SRC_SUN_DATA.howItWorks.layers.map((layer) => (
              <div
                key={layer.name}
                className="bg-white/[0.03] border border-white/10 hover:border-amber-400/40 rounded-lg p-4 space-y-2 transition-colors"
              >
                <h4 className="text-sm font-bold text-amber-300">{layer.name}</h4>
                <div className="text-[11px] font-mono tabular-nums text-cyan-300">
                  Temp: {layer.temp} · {layer.density}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{layer.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 03: How It Formed */}
      <div id="sec-formed" className="bg-[#0c0f17]/90 border border-white/10 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
          <Flame className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold tracking-wider text-white">
            03. {SRC_SUN_DATA.howItFormed.title}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SRC_SUN_DATA.howItFormed.phases.map((p) => (
            <div key={p.stage} className="bg-black/45 border border-white/10 rounded-lg p-4 space-y-1.5">
              <h4 className="text-sm font-bold text-cyan-300 font-mono">{p.stage}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 04: When & How It Will Die */}
      <div id="sec-die" className="bg-[#0c0f17]/90 border border-white/10 rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
          <Clock className="w-5 h-5 text-rose-400" />
          <h3 className="text-lg font-bold tracking-wider text-rose-300">
            04. {SRC_SUN_DATA.whenItWillDie.title}
          </h3>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed bg-black/40 border border-rose-500/25 p-4 rounded-lg">
          {SRC_SUN_DATA.whenItWillDie.overview}
        </p>
        <div className="space-y-3">
          {SRC_SUN_DATA.whenItWillDie.timeline.map((item, idx) => (
            <div
              key={idx}
              className="bg-black/45 border border-white/10 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="md:w-64 shrink-0">
                <div className="text-[10px] font-mono text-amber-400 font-bold mb-0.5">
                  STATUS: {item.status}
                </div>
                <div className="text-sm font-bold text-white font-mono tabular-nums">{item.time}</div>
                <div className="text-xs text-cyan-300 font-semibold">{item.phase}</div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed flex-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 05: Fun Facts */}
      <div id="sec-facts" className="bg-[#0c0f17]/90 border border-white/10 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold tracking-wider text-amber-300">
            05. Mind-Blowing Solar Fun Facts & Scientific Anomalies
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SRC_SUN_DATA.funFacts.map((ff, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 rounded-lg p-4 space-y-1.5 transition-colors"
            >
              <h4 className="text-sm font-bold text-cyan-300">
                0{i + 1}. {ff.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{ff.fact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Next Navigation */}
      <div className="flex justify-end pt-4 border-t border-white/10">
        <button
          onClick={() => navigateTo({ type: 'planet', id: 'mercury' })}
          className="px-5 py-2.5 rounded-lg border border-cyan-400/40 bg-cyan-500/10 hover:bg-cyan-400 hover:text-black text-cyan-300 text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer"
        >
          Next Monograph: 01. Mercury <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  // ============================================================================
  // 2. RENDER INDIVIDUAL PLANET MONOGRAPH (ALL 8 PLANETS WITH SUN-LEVEL DEPTH)
  // ============================================================================
  const renderPlanetMonograph = (planetId: string) => {
    const mono: PlanetMonograph = PLANET_MONOGRAPHS[planetId] || PLANET_MONOGRAPHS.earth;
    const solarItem: SrcPlanetItem | undefined = SRC_SOLAR_DATA.find((p) => p.id === mono.id);
    const idx = ALL_PLANET_IDS.indexOf(mono.id);
    const prevId = idx > 0 ? ALL_PLANET_IDS[idx - 1] : null;
    const nextId = idx < ALL_PLANET_IDS.length - 1 ? ALL_PLANET_IDS[idx + 1] : null;

    return (
      <div className="space-y-8 pb-12">
        {renderSectionJumpBar([
          { id: 'sec-overview', label: '01. Telemetry & Atmosphere' },
          { id: 'sec-works', label: '02. How It Works & Layers' },
          { id: 'sec-formed', label: '03. How It Formed' },
          { id: 'sec-die', label: '04. Future Fate & Death' },
          { id: 'sec-moons', label: `05. Natural Moons (${solarItem?.moons.length || 0})` },
          { id: 'sec-facts', label: '06. Fun Facts & Anomalies' },
        ])}

        {/* Section 01: Hero Profile, 10-Metric Telemetry & Atmospheric Composition */}
        <div id="sec-overview" className="planet-card">
          <div className="flex flex-col gap-3">
            <img
              src={mono.image}
              alt={mono.name}
              referrerPolicy="no-referrer"
              className="planet-photo !h-56"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = createFallbackSvg(
                  mono.name,
                  mono.hexColor,
                  mono.category
                );
              }}
            />
            <button
              onClick={() => onFocusIn3D(mono.id, null)}
              className="w-full py-2.5 px-3 rounded border border-cyan-400/50 bg-cyan-500/15 hover:bg-cyan-400 hover:text-black text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Crosshair className="w-3.5 h-3.5" /> Focus {mono.name} in 3D Simulation
            </button>

            <div className="bg-black/45 border border-white/10 rounded-md p-3.5 space-y-2">
              <div className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider font-bold">
                Atmospheric & Bulk Composition
              </div>
              {mono.composition.map((comp) => (
                <div key={comp.element} className="space-y-0.5 border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                  <div className="flex justify-between text-xs font-mono tabular-nums">
                    <span className="text-white font-semibold">{comp.element}</span>
                    <span className="text-cyan-300 font-bold">{comp.byMass}</span>
                  </div>
                  <div className="text-[10px] text-slate-400">{comp.role}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <div className="text-xs font-mono text-cyan-300 mb-1">
                  PLANET {mono.orderNumber} · {mono.category} · Age: {mono.age}
                </div>
                <h2 className="!mb-0.5 text-white text-2xl sm:text-3xl">{mono.name}</h2>
                <div className="text-xs font-mono text-slate-400">{mono.subtitle}</div>
              </div>

              <button
                onClick={() => {
                  setCompareMode('planets');
                  setComparePlanetA(mono.id);
                  navigateTo({ type: 'compare' });
                }}
                className="px-3 py-1.5 rounded border border-white/15 bg-white/5 hover:border-cyan-400 text-slate-200 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5 text-cyan-400" /> Compare {mono.name}
              </button>
            </div>

            <p className="planet-desc !mb-2">{mono.summary}</p>

            {/* 10-Metric Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {mono.metrics.map((m) => (
                <div key={m.label} className="bg-black/45 border border-white/10 p-2.5 rounded">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-0.5">
                    {m.label}
                  </span>
                  <span className="text-xs font-mono tabular-nums text-white font-bold">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 02: How the Planet Works & Concentric Internal Layers */}
        <div id="sec-works" className="bg-[#0c0f17]/90 border border-white/10 rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
            <Atom className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold tracking-wider text-cyan-300">
              02. {mono.howItWorks.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/40 border border-white/10 p-4 rounded-lg">
              <div className="text-xs font-mono text-cyan-300 font-bold uppercase mb-1.5">
                Core Mechanism & Internal Dynamo
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {mono.howItWorks.coreMechanism}
              </p>
            </div>
            <div className="bg-black/40 border border-white/10 p-4 rounded-lg">
              <div className="text-xs font-mono text-amber-300 font-bold uppercase mb-1.5">
                Surface Dynamics & Atmospheric Engine
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {mono.howItWorks.surfaceAndWeather}
              </p>
            </div>
          </div>

          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" /> Internal & Atmospheric Layers (Center → Space)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {mono.howItWorks.layers.map((layer) => (
                <div
                  key={layer.name}
                  className="bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 rounded-lg p-4 space-y-2 transition-colors"
                >
                  <h4 className="text-sm font-bold text-white">{layer.name}</h4>
                  <div className="text-[11px] font-mono tabular-nums text-cyan-300">
                    Temp: {layer.temp} · {layer.density}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{layer.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 03: How It Was Formed */}
        <div id="sec-formed" className="bg-[#0c0f17]/90 border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
            <Flame className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold tracking-wider text-white">
              03. {mono.howItFormed.title}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mono.howItFormed.phases.map((p) => (
              <div key={p.stage} className="bg-black/45 border border-white/10 rounded-lg p-4 space-y-1.5">
                <h4 className="text-sm font-bold text-amber-300 font-mono">{p.stage}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 04: When & How It Will Die / Long-Term Planetary Fate */}
        <div id="sec-die" className="bg-[#0c0f17]/90 border border-white/10 rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
            <Clock className="w-5 h-5 text-rose-400" />
            <h3 className="text-lg font-bold tracking-wider text-rose-300">
              04. {mono.whenItWillDie.title}
            </h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed bg-black/40 border border-rose-500/25 p-4 rounded-lg">
            {mono.whenItWillDie.overview}
          </p>
          <div className="space-y-3">
            {mono.whenItWillDie.timeline.map((item, i) => (
              <div
                key={i}
                className="bg-black/45 border border-white/10 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="md:w-64 shrink-0">
                  <div className="text-[10px] font-mono text-amber-400 font-bold mb-0.5">
                    PHASE: {item.status}
                  </div>
                  <div className="text-sm font-bold text-white font-mono tabular-nums">{item.time}</div>
                  <div className="text-xs text-cyan-300 font-semibold">{item.phase}</div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed flex-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 05: Cataloged Natural Moons */}
        <div id="sec-moons" className="bg-[#0c0f17]/90 border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <Globe className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold tracking-wider text-white">
                05. Natural Satellites of {mono.name} ({solarItem?.moons.length || 0} Featured in 3D)
              </h3>
            </div>
          </div>

          {solarItem && solarItem.moons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {solarItem.moons.map((moon) => (
                <div
                  key={moon.id}
                  className="bg-black/45 border border-white/10 hover:border-cyan-400/50 rounded-lg p-4 flex gap-4 items-start transition-colors"
                >
                  <img
                    src={moon.image}
                    alt={moon.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-md object-cover border border-white/10 shrink-0 bg-black"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = createFallbackSvg(
                        moon.name,
                        moon.hexColor,
                        'LUNAR SATELLITE'
                      );
                    }}
                  />
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-cyan-300">{moon.name}</h4>
                      <button
                        onClick={() => onFocusIn3D(mono.id, moon.id)}
                        className="px-2.5 py-1 rounded border border-cyan-400/40 bg-cyan-500/10 hover:bg-cyan-400 hover:text-black text-cyan-300 text-[10px] font-mono font-bold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Crosshair className="w-3 h-3" /> 3D Lock
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{moon.info}</p>
                    <div className="text-[11px] font-mono tabular-nums text-slate-400 pt-1">
                      Mean Radius: <span className="text-white">{moon.radiusKm}</span> · Orbital Period:{' '}
                      <span className="text-amber-300">{moon.orbitalPeriod}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-black/40 border border-white/10 rounded-lg p-4 text-xs font-mono text-slate-400">
              {mono.name} possesses zero natural moons due to its proximity to the Sun’s powerful tidal Hill sphere boundary.
            </div>
          )}
        </div>

        {/* Section 06: Fun Facts & Scientific Anomalies */}
        <div id="sec-facts" className="bg-[#0c0f17]/90 border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold tracking-wider text-amber-300">
              06. {mono.name} — Scientific Anomalies & Fun Facts
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mono.funFacts.map((ff, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 rounded-lg p-4 space-y-1.5 transition-colors"
              >
                <h4 className="text-sm font-bold text-cyan-300">
                  0{i + 1}. {ff.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">{ff.fact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Prev / Next Planet Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          {prevId ? (
            <button
              onClick={() => navigateTo({ type: 'planet', id: prevId })}
              className="px-4 py-2.5 rounded-lg border border-white/15 bg-white/5 hover:border-cyan-400 text-slate-200 text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Previous: {PLANET_MONOGRAPHS[prevId].name}
            </button>
          ) : (
            <button
              onClick={() => navigateTo({ type: 'sun' })}
              className="px-4 py-2.5 rounded-lg border border-amber-400/40 bg-amber-500/10 hover:bg-amber-400 hover:text-black text-amber-300 text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Previous: The Sun (Sol)
            </button>
          )}

          {nextId ? (
            <button
              onClick={() => navigateTo({ type: 'planet', id: nextId })}
              className="px-5 py-2.5 rounded-lg border border-cyan-400/40 bg-cyan-500/10 hover:bg-cyan-400 hover:text-black text-cyan-300 text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              Next Planet: {PLANET_MONOGRAPHS[nextId].name} <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => navigateTo({ type: 'probe', id: 'voyager' })}
              className="px-5 py-2.5 rounded-lg border border-amber-400/40 bg-amber-500/15 hover:bg-amber-400 hover:text-black text-amber-300 text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              Explore Probes & Satellites: Voyager 1 & 2 <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  // ============================================================================
  // 3. RENDER SPACECRAFT, PROBES, TELESCOPES, ROVERS & STATIONS MONOGRAPH
  // ============================================================================
  const renderProbeMonograph = (probeId: string) => {
    const probe: ProbeMonograph = PROBES_MONOGRAPHS[probeId] || PROBES_MONOGRAPHS.voyager;
    const idx = ALL_PROBE_IDS.indexOf(probe.id);
    const prevId = idx > 0 ? ALL_PROBE_IDS[idx - 1] : null;
    const nextId = idx < ALL_PROBE_IDS.length - 1 ? ALL_PROBE_IDS[idx + 1] : null;

    return (
      <div className="space-y-8 pb-12">
        {renderSectionJumpBar([
          { id: 'sec-probe-overview', label: '01. Mission & Hardware Telemetry' },
          { id: 'sec-probe-works', label: '02. How It Works & Instruments' },
          { id: 'sec-probe-chronology', label: '03. Trajectory & Chronology' },
          { id: 'sec-probe-fate', label: '04. End-of-Mission Fate' },
          { id: 'sec-probe-facts', label: '05. Discoveries & Engineering Feats' },
        ])}

        {/* Section 01: Hero Mission Profile & 10-Point Hardware Telemetry */}
        <div id="sec-probe-overview" className="planet-card">
          <div className="flex flex-col gap-3">
            <img
              src={probe.image}
              alt={probe.name}
              referrerPolicy="no-referrer"
              className="planet-photo !h-56"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = createFallbackSvg(
                  probe.name,
                  probe.hexColor,
                  probe.category
                );
              }}
            />
            <button
              onClick={() => onFocusIn3D(probe.focusPlanet3D, null, probe.id)}
              className="w-full py-2.5 px-3 rounded border border-cyan-400/50 bg-cyan-500/15 hover:bg-cyan-400 hover:text-black text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Crosshair className="w-3.5 h-3.5" /> Focus {probe.acronym} in 3D Simulation
            </button>

            <div className="bg-black/45 border border-white/10 rounded-md p-3.5 space-y-2">
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-bold">
                Core Spacecraft Subsystems
              </div>
              {probe.subsystems.map((sub) => (
                <div key={sub.system} className="space-y-0.5 border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white font-semibold">{sub.system}</span>
                  </div>
                  <div className="text-[11px] font-mono text-cyan-300">{sub.spec}</div>
                  <div className="text-[10px] text-slate-400">{sub.role}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <div className="text-xs font-mono text-amber-400 mb-1">
                  {probe.category.toUpperCase()} · {probe.operator} · Launched: {probe.launchDate}
                </div>
                <h2 className="!mb-0.5 text-white text-2xl sm:text-3xl">{probe.name}</h2>
                <div className="text-xs font-mono text-slate-400">{probe.subtitle}</div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  STATUS: {probe.status}
                </span>
                <button
                  onClick={() => {
                    setCompareMode('probes');
                    setCompareProbeA(probe.id);
                    navigateTo({ type: 'compare' });
                  }}
                  className="px-3 py-1.5 rounded border border-white/15 bg-white/5 hover:border-cyan-400 text-slate-200 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Scale className="w-3.5 h-3.5 text-cyan-400" /> Compare
                </button>
              </div>
            </div>

            <p className="planet-desc !mb-2">{probe.summary}</p>

            {/* 10-Metric Hardware & Orbital Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {probe.metrics.map((m) => (
                <div key={m.label} className="bg-black/45 border border-white/10 p-2.5 rounded">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-0.5">
                    {m.label}
                  </span>
                  <span className="text-xs font-mono tabular-nums text-white font-bold">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 02: How the Spacecraft Works & Scientific Instruments */}
        <div id="sec-probe-works" className="bg-[#0c0f17]/90 border border-white/10 rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
            <Rocket className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold tracking-wider text-cyan-300">
              02. {probe.howItWorks.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/40 border border-white/10 p-4 rounded-lg">
              <div className="text-xs font-mono text-cyan-300 font-bold uppercase mb-1.5">
                Propulsion, Trajectory & Orbital Mechanics
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {probe.howItWorks.propulsionAndNav}
              </p>
            </div>
            <div className="bg-black/40 border border-white/10 p-4 rounded-lg">
              <div className="text-xs font-mono text-amber-300 font-bold uppercase mb-1.5">
                Power Generation, Thermal & Deep-Space Telemetry
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {probe.howItWorks.powerAndComms}
              </p>
            </div>
          </div>

          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-400" /> Scientific Instruments & Payload Architecture
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {probe.howItWorks.instruments.map((inst) => (
                <div
                  key={inst.name}
                  className="bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 rounded-lg p-4 space-y-2 transition-colors"
                >
                  <h4 className="text-sm font-bold text-amber-300">{inst.name}</h4>
                  <div className="text-[11px] font-mono tabular-nums text-cyan-300">
                    {inst.temp} · {inst.density}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{inst.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 03: Mission Chronology */}
        <div id="sec-probe-chronology" className="bg-[#0c0f17]/90 border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
            <Compass className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold tracking-wider text-white">
              03. {probe.missionChronology.title}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {probe.missionChronology.phases.map((p) => (
              <div key={p.stage} className="bg-black/45 border border-white/10 rounded-lg p-4 space-y-1.5">
                <h4 className="text-sm font-bold text-cyan-300 font-mono">{p.stage}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 04: End-of-Mission Fate & Legacy */}
        <div id="sec-probe-fate" className="bg-[#0c0f17]/90 border border-white/10 rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
            <Clock className="w-5 h-5 text-rose-400" />
            <h3 className="text-lg font-bold tracking-wider text-rose-300">
              04. {probe.missionFate.title}
            </h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed bg-black/40 border border-rose-500/25 p-4 rounded-lg">
            {probe.missionFate.overview}
          </p>
          <div className="space-y-3">
            {probe.missionFate.timeline.map((item, i) => (
              <div
                key={i}
                className="bg-black/45 border border-white/10 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="md:w-64 shrink-0">
                  <div className="text-[10px] font-mono text-amber-400 font-bold mb-0.5">
                    STATUS: {item.status}
                  </div>
                  <div className="text-sm font-bold text-white font-mono tabular-nums">{item.time}</div>
                  <div className="text-xs text-cyan-300 font-semibold">{item.phase}</div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed flex-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 05: Discoveries, Records & Fun Facts */}
        <div id="sec-probe-facts" className="bg-[#0c0f17]/90 border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold tracking-wider text-amber-300">
              05. {probe.name} — Major Discoveries & Engineering Feats
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {probe.funFacts.map((ff, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 rounded-lg p-4 space-y-1.5 transition-colors"
              >
                <h4 className="text-sm font-bold text-cyan-300">
                  0{i + 1}. {ff.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">{ff.fact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Prev / Next Probe Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          {prevId ? (
            <button
              onClick={() => navigateTo({ type: 'probe', id: prevId })}
              className="px-4 py-2.5 rounded-lg border border-white/15 bg-white/5 hover:border-cyan-400 text-slate-200 text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Previous: {PROBES_MONOGRAPHS[prevId].name}
            </button>
          ) : (
            <button
              onClick={() => navigateTo({ type: 'planet', id: 'neptune' })}
              className="px-4 py-2.5 rounded-lg border border-white/15 bg-white/5 hover:border-cyan-400 text-slate-200 text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Planets: Neptune
            </button>
          )}

          {nextId ? (
            <button
              onClick={() => navigateTo({ type: 'probe', id: nextId })}
              className="px-5 py-2.5 rounded-lg border border-cyan-400/40 bg-cyan-500/10 hover:bg-cyan-400 hover:text-black text-cyan-300 text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              Next Spacecraft: {PROBES_MONOGRAPHS[nextId].name} <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => navigateTo({ type: 'compare' })}
              className="px-5 py-2.5 rounded-lg border border-amber-400/40 bg-amber-500/15 hover:bg-amber-400 hover:text-black text-amber-300 text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              Open Telemetry Comparator Tool <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  // ============================================================================
  // 4. RENDER SIDE-BY-SIDE PLANET & PROBE COMPARATOR TOOL
  // ============================================================================
  const renderComparator = () => {
    const pA = PLANET_MONOGRAPHS[comparePlanetA] || PLANET_MONOGRAPHS.earth;
    const pB = PLANET_MONOGRAPHS[comparePlanetB] || PLANET_MONOGRAPHS.jupiter;

    const sA = PROBES_MONOGRAPHS[compareProbeA] || PROBES_MONOGRAPHS.voyager;
    const sB = PROBES_MONOGRAPHS[compareProbeB] || PROBES_MONOGRAPHS.jwst;

    const renderBarComparison = (
      label: string,
      valA: number,
      valB: number,
      unit: string,
      nameA: string,
      nameB: string
    ) => {
      const maxVal = Math.max(valA, valB, 0.001);
      const pctA = Math.max(4, Math.min(100, (valA / maxVal) * 100));
      const pctB = Math.max(4, Math.min(100, (valB / maxVal) * 100));
      return (
        <div className="bg-black/45 border border-white/10 rounded-lg p-4 space-y-2.5">
          <div className="text-xs font-mono text-slate-300 uppercase tracking-wider font-bold">
            {label}
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono tabular-nums">
              <span className="text-cyan-300 font-semibold">{nameA}</span>
              <span className="text-white font-bold">
                {valA.toLocaleString()} {unit}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${pctA}%` }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono tabular-nums">
              <span className="text-amber-300 font-semibold">{nameB}</span>
              <span className="text-white font-bold">
                {valB.toLocaleString()} {unit}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pctB}%` }} />
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-8 pb-12">
        <div className="bg-[#0c0f17]/90 border border-white/10 rounded-xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-mono text-cyan-300 mb-1">
                INTERACTIVE TELEMETRY BENCHMARK
              </div>
              <h2 className="text-2xl font-bold text-white">
                Side-by-Side Planet & Spacecraft Comparator
              </h2>
            </div>

            <div className="flex items-center gap-1 p-1 bg-black/60 border border-white/10 rounded-lg">
              <button
                onClick={() => setCompareMode('planets')}
                className={`px-4 py-1.5 rounded-md text-xs font-mono font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  compareMode === 'planets'
                    ? 'bg-cyan-400 text-black'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Compare Planets (8)
              </button>
              <button
                onClick={() => setCompareMode('probes')}
                className={`px-4 py-1.5 rounded-md text-xs font-mono font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  compareMode === 'probes'
                    ? 'bg-amber-400 text-black'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Compare Spacecraft (7)
              </button>
            </div>
          </div>

          {compareMode === 'planets' ? (
            <div className="space-y-6">
              {/* Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/45 border border-cyan-400/35 rounded-lg p-4 space-y-2">
                  <label className="text-xs font-mono text-cyan-300 uppercase block font-bold">
                    Primary World (Target A)
                  </label>
                  <select
                    value={comparePlanetA}
                    onChange={(e) => setComparePlanetA(e.target.value)}
                    className="w-full bg-[#07090f] border border-white/15 rounded px-3 py-2 text-sm text-white font-mono outline-none focus:border-cyan-400"
                  >
                    {ALL_PLANET_IDS.map((id) => (
                      <option key={id} value={id}>
                        {PLANET_MONOGRAPHS[id].orderNumber}. {PLANET_MONOGRAPHS[id].name} ({PLANET_MONOGRAPHS[id].category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-black/45 border border-amber-400/35 rounded-lg p-4 space-y-2">
                  <label className="text-xs font-mono text-amber-300 uppercase block font-bold">
                    Comparison World (Target B)
                  </label>
                  <select
                    value={comparePlanetB}
                    onChange={(e) => setComparePlanetB(e.target.value)}
                    className="w-full bg-[#07090f] border border-white/15 rounded px-3 py-2 text-sm text-white font-mono outline-none focus:border-amber-400"
                  >
                    {ALL_PLANET_IDS.map((id) => (
                      <option key={id} value={id}>
                        {PLANET_MONOGRAPHS[id].orderNumber}. {PLANET_MONOGRAPHS[id].name} ({PLANET_MONOGRAPHS[id].category})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quantitative Scale Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderBarComparison(
                  'Equatorial Diameter',
                  pA.numericComparison.diameterKm,
                  pB.numericComparison.diameterKm,
                  'km',
                  pA.name,
                  pB.name
                )}
                {renderBarComparison(
                  'Planetary Mass (Earth = 1)',
                  pA.numericComparison.massEarths,
                  pB.numericComparison.massEarths,
                  'Earths',
                  pA.name,
                  pB.name
                )}
                {renderBarComparison(
                  'Surface / Cloud Gravity',
                  pA.numericComparison.gravityMps2,
                  pB.numericComparison.gravityMps2,
                  'm/s²',
                  pA.name,
                  pB.name
                )}
                {renderBarComparison(
                  'Solar Distance',
                  pA.numericComparison.distanceAU,
                  pB.numericComparison.distanceAU,
                  'AU',
                  pA.name,
                  pB.name
                )}
                {renderBarComparison(
                  'Orbital Velocity',
                  pA.numericComparison.orbitalSpeedKmS,
                  pB.numericComparison.orbitalSpeedKmS,
                  'km/s',
                  pA.name,
                  pB.name
                )}
                {renderBarComparison(
                  'Confirmed Natural Moons',
                  pA.numericComparison.moonsCount,
                  pB.numericComparison.moonsCount,
                  'Moons',
                  pA.name,
                  pB.name
                )}
              </div>

              {/* Side-by-Side Full Dossier Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  { item: pA, border: 'border-cyan-400/35', accent: 'text-cyan-300' },
                  { item: pB, border: 'border-amber-400/35', accent: 'text-amber-300' },
                ].map(({ item, border, accent }, idx) => (
                  <div
                    key={idx}
                    className={`bg-black/45 border ${border} rounded-xl p-5 space-y-4`}
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <h3 className={`text-xl font-bold ${accent}`}>{item.name}</h3>
                        <span className="text-xs font-mono text-slate-400">{item.subtitle}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigateTo({ type: 'planet', id: item.id })}
                          className="px-3 py-1.5 rounded border border-white/15 bg-white/5 hover:border-white text-xs font-mono text-white cursor-pointer"
                        >
                          Full Monograph
                        </button>
                        <button
                          onClick={() => onFocusIn3D(item.id, null)}
                          className="px-3 py-1.5 rounded border border-cyan-400/40 bg-cyan-500/15 hover:bg-cyan-400 hover:text-black text-xs font-mono text-cyan-300 font-bold cursor-pointer"
                        >
                          3D Lock
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {item.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="flex justify-between text-xs font-mono tabular-nums border-b border-white/5 pb-1.5"
                        >
                          <span className="text-slate-400">{m.label}</span>
                          <span className="text-white font-bold">{m.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <div className="text-xs font-mono text-slate-400 uppercase mb-1">
                        Core Mechanism
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.howItWorks.coreMechanism}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Spacecraft Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/45 border border-cyan-400/35 rounded-lg p-4 space-y-2">
                  <label className="text-xs font-mono text-cyan-300 uppercase block font-bold">
                    Spacecraft / Mission A
                  </label>
                  <select
                    value={compareProbeA}
                    onChange={(e) => setCompareProbeA(e.target.value)}
                    className="w-full bg-[#07090f] border border-white/15 rounded px-3 py-2 text-sm text-white font-mono outline-none focus:border-cyan-400"
                  >
                    {ALL_PROBE_IDS.map((id) => (
                      <option key={id} value={id}>
                        {PROBES_MONOGRAPHS[id].name} ({PROBES_MONOGRAPHS[id].category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-black/45 border border-amber-400/35 rounded-lg p-4 space-y-2">
                  <label className="text-xs font-mono text-amber-300 uppercase block font-bold">
                    Spacecraft / Mission B
                  </label>
                  <select
                    value={compareProbeB}
                    onChange={(e) => setCompareProbeB(e.target.value)}
                    className="w-full bg-[#07090f] border border-white/15 rounded px-3 py-2 text-sm text-white font-mono outline-none focus:border-amber-400"
                  >
                    {ALL_PROBE_IDS.map((id) => (
                      <option key={id} value={id}>
                        {PROBES_MONOGRAPHS[id].name} ({PROBES_MONOGRAPHS[id].category})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {renderBarComparison(
                  'Peak Velocity Achieved',
                  sA.numericComparison.maxSpeedKmH,
                  sB.numericComparison.maxSpeedKmH,
                  'km/h',
                  sA.acronym,
                  sB.acronym
                )}
                {renderBarComparison(
                  'Launch / Orbital Mass',
                  sA.numericComparison.massKg,
                  sB.numericComparison.massKg,
                  'kg',
                  sA.acronym,
                  sB.acronym
                )}
                {renderBarComparison(
                  'Electrical Power Budget',
                  sA.numericComparison.powerWatts,
                  sB.numericComparison.powerWatts,
                  'Watts',
                  sA.acronym,
                  sB.acronym
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  { item: sA, border: 'border-cyan-400/35', accent: 'text-cyan-300' },
                  { item: sB, border: 'border-amber-400/35', accent: 'text-amber-300' },
                ].map(({ item, border, accent }, idx) => (
                  <div
                    key={idx}
                    className={`bg-black/45 border ${border} rounded-xl p-5 space-y-4`}
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <h3 className={`text-xl font-bold ${accent}`}>{item.name}</h3>
                        <span className="text-xs font-mono text-slate-400">
                          {item.operator} · {item.launchDate}
                        </span>
                      </div>
                      <button
                        onClick={() => navigateTo({ type: 'probe', id: item.id })}
                        className="px-3 py-1.5 rounded border border-white/15 bg-white/5 hover:border-white text-xs font-mono text-white cursor-pointer"
                      >
                        Full Monograph
                      </button>
                    </div>

                    <div className="space-y-2">
                      {item.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="flex justify-between text-xs font-mono tabular-nums border-b border-white/5 pb-1.5"
                        >
                          <span className="text-slate-400">{m.label}</span>
                          <span className="text-white font-bold">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================================================
  // 5. RENDER ALL WORLDS & SPACECRAFT INDEX CATALOG
  // ============================================================================
  const renderCatalogIndex = () => (
    <div className="space-y-10 pb-12">
      {/* Solar Core Banner */}
      <div className="bg-[#0c0f17]/90 border border-amber-400/35 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            00. STELLAR CORE MONOGRAPH
          </div>
          <h2 className="text-2xl font-bold text-white">{SRC_SUN_DATA.name}</h2>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            {SRC_SUN_DATA.summary}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
          <button
            onClick={() => navigateTo({ type: 'sun' })}
            className="px-5 py-2.5 rounded-lg border border-amber-400 bg-amber-500/20 hover:bg-amber-400 hover:text-black text-amber-300 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
          >
            Read Sun Monograph
          </button>
          <button
            onClick={() => onFocusIn3D('sun')}
            className="px-4 py-2.5 rounded-lg border border-white/15 bg-white/5 hover:border-amber-400 text-slate-200 text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap"
          >
            3D Solar Lock
          </button>
        </div>
      </div>

      {/* All 8 Planets Grid */}
      <div className="space-y-4">
        <div className="border-b border-white/10 pb-2 flex items-center justify-between">
          <h3 className="text-lg font-bold tracking-wider uppercase text-cyan-300">
            Planetary Monographs (8 Solar Worlds)
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Select any planet for its 6-section scientific monograph
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ALL_PLANET_IDS.map((id) => {
            const p = PLANET_MONOGRAPHS[id];
            const sData = SRC_SOLAR_DATA.find((s) => s.id === id);
            return (
              <div
                key={id}
                className="bg-[#0c0f17]/90 border border-white/10 hover:border-cyan-400/45 rounded-xl p-5 flex flex-col justify-between gap-4 transition-colors"
              >
                <div className="flex gap-4 items-start">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-28 h-28 rounded-lg object-cover border border-white/10 shrink-0 bg-black"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = createFallbackSvg(
                        p.name,
                        p.hexColor,
                        p.category
                      );
                    }}
                  />
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-mono text-cyan-300">
                      {p.orderNumber}. {p.category} · {sData?.moons.length || 0} Featured Moons
                    </div>
                    <h4 className="text-xl font-bold text-white">{p.name}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {p.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/10">
                  <span className="text-[11px] font-mono text-slate-400">
                    6 Sections: Layers · Origin · Fate · Moons · Facts
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onFocusIn3D(p.id, null)}
                      className="px-3 py-1.5 rounded border border-white/15 bg-white/5 hover:border-cyan-400 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
                    >
                      3D View
                    </button>
                    <button
                      onClick={() => navigateTo({ type: 'planet', id: p.id })}
                      className="px-3.5 py-1.5 rounded border border-cyan-400/50 bg-cyan-500/15 hover:bg-cyan-400 hover:text-black text-cyan-300 text-xs font-mono font-bold transition-colors cursor-pointer"
                    >
                      Open Monograph →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Major Probes, Telescopes, Rovers & Stations Grid */}
      <div className="space-y-4">
        <div className="border-b border-white/10 pb-2 flex items-center justify-between">
          <h3 className="text-lg font-bold tracking-wider uppercase text-amber-300">
            Major Probes, Telescopes, Rovers & Orbital Stations ({ALL_PROBE_IDS.length} Flagships)
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Full hardware, propulsion, instrument & fate dossiers
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ALL_PROBE_IDS.map((id) => {
            const pr = PROBES_MONOGRAPHS[id];
            return (
              <div
                key={id}
                className="bg-[#0c0f17]/90 border border-white/10 hover:border-amber-400/45 rounded-xl p-5 flex flex-col justify-between gap-4 transition-colors"
              >
                <div className="flex gap-4 items-start">
                  <img
                    src={pr.image}
                    alt={pr.name}
                    referrerPolicy="no-referrer"
                    className="w-28 h-28 rounded-lg object-cover border border-white/10 shrink-0 bg-black"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = createFallbackSvg(
                        pr.acronym,
                        pr.hexColor,
                        pr.category
                      );
                    }}
                  />
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-mono text-amber-300">
                      {pr.category} · {pr.launchDate}
                    </div>
                    <h4 className="text-lg font-bold text-white">{pr.name}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {pr.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/10">
                  <span className="text-[11px] font-mono text-emerald-400">
                    {pr.status}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onFocusIn3D(pr.focusPlanet3D, null, pr.id)}
                      className="px-3 py-1.5 rounded border border-white/15 bg-white/5 hover:border-cyan-400 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
                    >
                      3D Sector
                    </button>
                    <button
                      onClick={() => navigateTo({ type: 'probe', id: pr.id })}
                      className="px-3.5 py-1.5 rounded border border-amber-400/50 bg-amber-500/15 hover:bg-amber-400 hover:text-black text-amber-300 text-xs font-mono font-bold transition-colors cursor-pointer"
                    >
                      Open Dossier →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Current Page Title for Top Header
  let activeHeaderTitle = 'All Worlds & Probes Master Index';
  if (route.type === 'sun') activeHeaderTitle = '00. The Sun (Sol) — Stellar Monograph';
  else if (route.type === 'planet') {
    const p = PLANET_MONOGRAPHS[route.id];
    if (p) activeHeaderTitle = `${p.orderNumber}. ${p.name} — Planetary Monograph`;
  } else if (route.type === 'probe') {
    const pr = PROBES_MONOGRAPHS[route.id];
    if (pr) activeHeaderTitle = `${pr.name} (${pr.acronym}) — Spacecraft Dossier`;
  } else if (route.type === 'compare') {
    activeHeaderTitle = 'Planet & Spacecraft Telemetry Comparator';
  }

  return (
    <div className="fixed inset-0 z-500 bg-[#07080c] text-slate-100 flex flex-col overflow-hidden select-text">
      {/* Background Watermark */}
      <SrcWatermarkSvg />

      {/* Top Navigation Bar */}
      <header className="relative z-20 h-16 px-4 sm:px-6 bg-[#0b0e17]/95 border-b border-cyan-400/25 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setMobileSidebarOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded border border-white/15 text-cyan-300 hover:bg-white/5 cursor-pointer"
            title="Toggle Directory Sidebar"
          >
            {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <div className="truncate">
            <div className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">
              SRC COSMIC ENCYCLOPEDIA · MULTI-SECTION TELEMETRY ARCHIVE
            </div>
            <h1 className="text-sm sm:text-base font-bold text-white truncate">
              {activeHeaderTitle}
            </h1>
          </div>
        </div>

        {/* Quick Top Section Pills & 3D Return */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigateTo({ type: 'catalog' })}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border transition-colors cursor-pointer whitespace-nowrap ${
              route.type === 'catalog'
                ? 'bg-cyan-400 text-black border-cyan-400 font-bold'
                : 'bg-white/5 border-white/15 text-slate-300 hover:border-cyan-400'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" /> Master Index
          </button>

          <button
            onClick={() => navigateTo({ type: 'compare' })}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border transition-colors cursor-pointer whitespace-nowrap ${
              route.type === 'compare'
                ? 'bg-amber-400 text-black border-amber-400 font-bold'
                : 'bg-white/5 border-white/15 text-slate-300 hover:border-amber-400'
            }`}
          >
            <Scale className="w-3.5 h-3.5" /> Comparator
          </button>

          <button
            onClick={() => {
              sound.playBeep(640, 0.05);
              onCloseTo3D();
            }}
            className="close-archive-btn whitespace-nowrap"
          >
            Return to 3D Simulation
          </button>
        </div>
      </header>

      {/* Main Split Workspace: Expandable Sidebar Directory + Scrollable Monograph Canvas */}
      <div className="relative z-10 flex-1 flex overflow-hidden">
        {/* EXPANDABLE NESTED SIDEBAR DIRECTORY */}
        <aside
          className={`${
            mobileSidebarOpen ? 'fixed inset-y-16 left-0 z-40 flex' : 'hidden lg:flex'
          } w-72 bg-[#0a0d16]/95 border-r border-cyan-400/20 flex-col shrink-0 overflow-y-auto p-3.5 space-y-3`}
        >
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter planets, probes..."
              className="w-full bg-black/50 border border-white/15 focus:border-cyan-400 rounded-md pl-8 pr-3 py-1.5 text-xs font-mono text-white placeholder-slate-500 outline-none"
            />
          </div>

          {/* 00. Master Index & Comparator */}
          <div className="space-y-1">
            <button
              onClick={() => navigateTo({ type: 'catalog' })}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono transition-colors cursor-pointer ${
                route.type === 'catalog'
                  ? 'bg-cyan-500/20 border border-cyan-400 text-white font-bold'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-2">
                <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" /> All Worlds & Probes Index
              </span>
            </button>

            <button
              onClick={() => navigateTo({ type: 'compare' })}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono transition-colors cursor-pointer ${
                route.type === 'compare'
                  ? 'bg-amber-500/20 border border-amber-400 text-amber-300 font-bold'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-amber-400" /> Planet & Probe Comparator
              </span>
            </button>
          </div>

          {/* 01. STELLAR CORE (THE SUN) */}
          <div className="border-t border-white/10 pt-2.5">
            <button
              onClick={() => toggleGroup('sun')}
              className="w-full flex items-center justify-between text-[11px] font-mono text-amber-400 uppercase tracking-wider font-bold mb-1.5 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5" /> 01. Stellar Core
              </span>
              {openGroups.sun ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {openGroups.sun && (
              <div className="space-y-1 pl-1">
                <button
                  onClick={() => navigateTo({ type: 'sun' })}
                  className={`w-full text-left px-3 py-1.5 rounded text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                    route.type === 'sun'
                      ? 'bg-amber-500/20 border border-amber-400 text-amber-300 font-bold'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>00. The Sun (Sol)</span>
                  <span className="text-[10px] text-amber-400">G2V</span>
                </button>
              </div>
            )}
          </div>

          {/* 02. TERRESTRIAL PLANETS */}
          <div className="border-t border-white/10 pt-2.5">
            <button
              onClick={() => toggleGroup('terrestrial')}
              className="w-full flex items-center justify-between text-[11px] font-mono text-cyan-300 uppercase tracking-wider font-bold mb-1.5 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" /> 02. Terrestrial Worlds
              </span>
              {openGroups.terrestrial ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>

            {openGroups.terrestrial && (
              <div className="space-y-1 pl-1">
                {filteredTerrestrial.map((id) => {
                  const p = PLANET_MONOGRAPHS[id];
                  const isActive = route.type === 'planet' && route.id === id;
                  return (
                    <div key={id} className="space-y-1">
                      <button
                        onClick={() => navigateTo({ type: 'planet', id })}
                        className={`w-full text-left px-3 py-1.5 rounded text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-cyan-500/20 border border-cyan-400 text-white font-bold'
                            : 'text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <span>
                          {p.orderNumber}. {p.name}
                        </span>
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: p.hexColor }}
                        />
                      </button>

                      {/* Nested Section Anchors when active */}
                      {isActive && (
                        <div className="pl-5 pr-2 py-1 space-y-1 border-l border-cyan-400/30 ml-3 text-[11px] font-mono text-slate-400">
                          <button
                            onClick={() => scrollToSection('sec-overview')}
                            className="block hover:text-cyan-300 cursor-pointer"
                          >
                            · Telemetry & Atmosphere
                          </button>
                          <button
                            onClick={() => scrollToSection('sec-works')}
                            className="block hover:text-cyan-300 cursor-pointer"
                          >
                            · How It Works & Layers
                          </button>
                          <button
                            onClick={() => scrollToSection('sec-formed')}
                            className="block hover:text-cyan-300 cursor-pointer"
                          >
                            · How It Formed
                          </button>
                          <button
                            onClick={() => scrollToSection('sec-die')}
                            className="block hover:text-cyan-300 cursor-pointer"
                          >
                            · Future Fate & Death
                          </button>
                          <button
                            onClick={() => scrollToSection('sec-moons')}
                            className="block hover:text-cyan-300 cursor-pointer"
                          >
                            · Natural Moons
                          </button>
                          <button
                            onClick={() => scrollToSection('sec-facts')}
                            className="block hover:text-cyan-300 cursor-pointer"
                          >
                            · Fun Facts
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 03. GAS & ICE GIANTS */}
          <div className="border-t border-white/10 pt-2.5">
            <button
              onClick={() => toggleGroup('giants')}
              className="w-full flex items-center justify-between text-[11px] font-mono text-cyan-300 uppercase tracking-wider font-bold mb-1.5 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" /> 03. Gas & Ice Giants
              </span>
              {openGroups.giants ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>

            {openGroups.giants && (
              <div className="space-y-1 pl-1">
                {filteredGiants.map((id) => {
                  const p = PLANET_MONOGRAPHS[id];
                  const isActive = route.type === 'planet' && route.id === id;
                  return (
                    <div key={id} className="space-y-1">
                      <button
                        onClick={() => navigateTo({ type: 'planet', id })}
                        className={`w-full text-left px-3 py-1.5 rounded text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-cyan-500/20 border border-cyan-400 text-white font-bold'
                            : 'text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <span>
                          {p.orderNumber}. {p.name}
                        </span>
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: p.hexColor }}
                        />
                      </button>

                      {isActive && (
                        <div className="pl-5 pr-2 py-1 space-y-1 border-l border-cyan-400/30 ml-3 text-[11px] font-mono text-slate-400">
                          <button
                            onClick={() => scrollToSection('sec-overview')}
                            className="block hover:text-cyan-300 cursor-pointer"
                          >
                            · Telemetry & Atmosphere
                          </button>
                          <button
                            onClick={() => scrollToSection('sec-works')}
                            className="block hover:text-cyan-300 cursor-pointer"
                          >
                            · How It Works & Layers
                          </button>
                          <button
                            onClick={() => scrollToSection('sec-formed')}
                            className="block hover:text-cyan-300 cursor-pointer"
                          >
                            · How It Formed
                          </button>
                          <button
                            onClick={() => scrollToSection('sec-die')}
                            className="block hover:text-cyan-300 cursor-pointer"
                          >
                            · Future Fate & Death
                          </button>
                          <button
                            onClick={() => scrollToSection('sec-moons')}
                            className="block hover:text-cyan-300 cursor-pointer"
                          >
                            · Natural Moons & Rings
                          </button>
                          <button
                            onClick={() => scrollToSection('sec-facts')}
                            className="block hover:text-cyan-300 cursor-pointer"
                          >
                            · Fun Facts
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 04. MAJOR PROBES, TELESCOPES, ROVERS & STATIONS */}
          <div className="border-t border-white/10 pt-2.5">
            <button
              onClick={() => toggleGroup('probes')}
              className="w-full flex items-center justify-between text-[11px] font-mono text-amber-300 uppercase tracking-wider font-bold mb-1.5 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Satellite className="w-3.5 h-3.5" /> 04. Probes & Satellites
              </span>
              {openGroups.probes ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>

            {openGroups.probes && (
              <div className="space-y-1 pl-1">
                {filteredProbes.map((id) => {
                  const pr = PROBES_MONOGRAPHS[id];
                  const isActive = route.type === 'probe' && route.id === id;
                  return (
                    <div key={id} className="space-y-1">
                      <button
                        onClick={() => navigateTo({ type: 'probe', id })}
                        className={`w-full text-left px-3 py-1.5 rounded text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-amber-500/20 border border-amber-400 text-amber-300 font-bold'
                            : 'text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <span className="truncate pr-2">{pr.name}</span>
                        <span className="text-[10px] text-slate-400 shrink-0">{pr.acronym}</span>
                      </button>

                      {isActive && (
                        <div className="pl-5 pr-2 py-1 space-y-1 border-l border-amber-400/30 ml-3 text-[11px] font-mono text-slate-400">
                          <button
                            onClick={() => scrollToSection('sec-probe-overview')}
                            className="block hover:text-amber-300 cursor-pointer"
                          >
                            · Hardware Telemetry
                          </button>
                          <button
                            onClick={() => scrollToSection('sec-probe-works')}
                            className="block hover:text-amber-300 cursor-pointer"
                          >
                            · How It Works & Payload
                          </button>
                          <button
                            onClick={() => scrollToSection('sec-probe-chronology')}
                            className="block hover:text-amber-300 cursor-pointer"
                          >
                            · Mission Chronology
                          </button>
                          <button
                            onClick={() => scrollToSection('sec-probe-fate')}
                            className="block hover:text-amber-300 cursor-pointer"
                          >
                            · End-of-Mission Fate
                          </button>
                          <button
                            onClick={() => scrollToSection('sec-probe-facts')}
                            className="block hover:text-amber-300 cursor-pointer"
                          >
                            · Discoveries & Facts
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* MAIN READING & MONOGRAPH VIEWPORT */}
        <main
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-4 sm:px-8 pt-6 pb-16"
        >
          <div className="max-w-5xl mx-auto">
            {route.type === 'sun' && renderSunMonograph()}
            {route.type === 'planet' && renderPlanetMonograph(route.id)}
            {route.type === 'probe' && renderProbeMonograph(route.id)}
            {route.type === 'compare' && renderComparator()}
            {route.type === 'catalog' && renderCatalogIndex()}
          </div>
        </main>
      </div>
    </div>
  );
};
