/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PLANETS_DATA } from '../data/celestialData';
import { PlanetData, MoonData } from '../types/cosmic';
import {
  Globe2,
  Orbit,
  Flame,
  Wind,
  Layers,
  Sparkles,
  Focus,
  RotateCcw,
  Info,
  Calendar,
  Compass,
} from 'lucide-react';
import { sound } from '../utils/audioEngine';

interface PlanetsExplorerProps {
  currentTarget: string;
  onSelectTarget: (targetKey: string) => void;
  timeSpeed: number;
  onSetTimeSpeed: (speed: number) => void;
  focusedMoonId: string | null;
  onFocusMoon: (moonId: string | null) => void;
}

export const PlanetsExplorer: React.FC<PlanetsExplorerProps> = ({
  currentTarget,
  onSelectTarget,
  timeSpeed,
  onSetTimeSpeed,
  focusedMoonId,
  onFocusMoon,
}) => {
  const [activeTab, setActiveTab] = useState<'dossier' | 'moons' | 'atmosphere'>('dossier');
  const planet = PLANETS_DATA[currentTarget] || PLANETS_DATA.earth;

  return (
    <div className="relative z-10 w-full h-[calc(100vh-3.5rem)] pt-14 pb-3 px-3 sm:px-4 pointer-events-none flex flex-col md:flex-row justify-between gap-3 overflow-hidden">
      {/* Left Target Selector & Dossier Column */}
      <aside className="w-full md:w-84 lg:w-96 h-full pointer-events-auto flex flex-col gap-2.5 overflow-hidden">
        {/* Celestial Target Selection Grid */}
        <div className="hud-glass p-3 rounded-md flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-cyan-300 font-mono tracking-wider font-bold flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5" /> CELESTIAL REPOSITORY
            </span>
            <span className="text-[10px] text-slate-400 font-mono">6 SYSTEMS</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 font-mono">
            {Object.keys(PLANETS_DATA).map((key) => {
              const p = PLANETS_DATA[key];
              const isSelected = currentTarget === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    sound.playBeep(700, 0.05);
                    onSelectTarget(key);
                    onFocusMoon(null);
                  }}
                  className={`px-2.5 py-1.5 text-xs text-left rounded border transition-all duration-150 ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 font-bold shadow-sm'
                      : 'border-slate-800 bg-[#0d1322]/80 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{p.order} // {p.name.split(' ')[0]}</span>
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: p.accentColor }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Real-time Orbital Time-Warp Controls */}
        <div className="hud-glass p-2.5 rounded-md flex flex-col gap-1.5 text-xs font-mono">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-300 flex items-center gap-1">
              <Orbit className="w-3 h-3 text-cyan-400" /> TIME WARP RATE
            </span>
            <span className="text-cyan-300 font-bold">
              {timeSpeed === 0 ? 'PAUSED' : `${timeSpeed.toFixed(1)}x SPEED`}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[1.0, 5.0, 20.0, 0.0].map((spd) => {
              const isCurrent = timeSpeed === spd;
              const label = spd === 0.0 ? 'PAUSE' : `${spd}x`;
              return (
                <button
                  key={spd}
                  onClick={() => {
                    sound.playBeep(800, 0.04);
                    onSetTimeSpeed(spd);
                  }}
                  className={`py-1 text-[11px] rounded border font-mono transition-all ${
                    isCurrent
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                      : 'bg-[#0d1322] border-slate-800 text-slate-400 hover:border-cyan-400/40 hover:text-slate-200'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Celestial Target Dossier */}
        <div className="hud-glass p-3.5 rounded-md flex-1 overflow-y-auto font-mono text-xs space-y-3">
          {/* Header */}
          <div className="border-b border-cyan-400/20 pb-2">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] text-amber-400 font-bold tracking-wider uppercase">
                {planet.type}
              </span>
              <span className="text-[10px] text-slate-400">{planet.order} / SOLAR GRID</span>
            </div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              {planet.name}
            </h3>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded bg-black/40 border border-slate-800/80">
              <div className="text-[10px] text-slate-400">EQUATORIAL DIAMETER</div>
              <div className="text-cyan-300 font-bold">{planet.diameterKm.toLocaleString()} km</div>
            </div>
            <div className="p-2 rounded bg-black/40 border border-slate-800/80">
              <div className="text-[10px] text-slate-400">SURFACE GRAVITY</div>
              <div className="text-cyan-300 font-bold">{planet.gravityMps2} m/s²</div>
            </div>
            <div className="p-2 rounded bg-black/40 border border-slate-800/80">
              <div className="text-[10px] text-slate-400">ESCAPE VELOCITY</div>
              <div className="text-cyan-300 font-bold">{planet.escapeVelocityKmS} km/s</div>
            </div>
            <div className="p-2 rounded bg-black/40 border border-slate-800/80">
              <div className="text-[10px] text-slate-400">SOLAR DISTANCE</div>
              <div className="text-amber-400 font-bold">{planet.orbitalDistanceAU} AU</div>
            </div>
            <div className="p-2 rounded bg-black/40 border border-slate-800/80">
              <div className="text-[10px] text-slate-400">DAY LENGTH (ROT)</div>
              <div className="text-white font-bold">{planet.dayLengthHours} h</div>
            </div>
            <div className="p-2 rounded bg-black/40 border border-slate-800/80">
              <div className="text-[10px] text-slate-400">ORBITAL PERIOD</div>
              <div className="text-white font-bold">{planet.yearLengthDays.toFixed(1)} d</div>
            </div>
          </div>

          {/* Scientific Overview */}
          <div className="space-y-1">
            <span className="text-[10px] text-cyan-300 font-bold flex items-center gap-1">
              <Info className="w-3 h-3" /> PHYSICAL OVERVIEW
            </span>
            <p className="text-[11px] text-slate-300 leading-relaxed bg-black/30 p-2 rounded border border-slate-800/60">
              {planet.description}
            </p>
          </div>

          {/* Fun Fact Badge */}
          <div className="p-2.5 rounded bg-amber-500/10 border border-amber-400/30 text-amber-200 text-[11px] leading-relaxed">
            <span className="font-bold text-amber-400 flex items-center gap-1 mb-1">
              <Sparkles className="w-3 h-3" /> CELESTIAL ANOMALY / FACT:
            </span>
            {planet.funFact}
          </div>

          {/* Atmospheric Breakdown */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] text-cyan-300 font-bold flex items-center gap-1">
              <Wind className="w-3 h-3" /> ATMOSPHERE SPECTRUM ({planet.atmospherePressureBar})
            </span>
            <div className="space-y-1.5 bg-black/30 p-2 rounded border border-slate-800/60">
              {planet.atmosphere.map((gas) => (
                <div key={gas.gas} className="space-y-0.5">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-300">{gas.gas} ({gas.formula})</span>
                    <span className="text-cyan-300 font-bold">{gas.percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full"
                      style={{ width: `${Math.min(gas.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exploration Milestones */}
          <div className="space-y-1 pt-1">
            <span className="text-[10px] text-cyan-300 font-bold flex items-center gap-1">
              <Calendar className="w-3 h-3" /> EXPLORATION CHRONOLOGY
            </span>
            <div className="space-y-1">
              {planet.explorationMilestones.map((m, idx) => (
                <div key={idx} className="text-[10px] text-slate-300 p-1.5 bg-black/40 rounded border border-slate-800/60">
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Right Column: Moons Directory & Specific Moon Mechanics */}
      <aside className="w-full md:w-88 lg:w-96 h-full pointer-events-auto flex flex-col gap-2.5 overflow-hidden">
        <div className="hud-glass p-3.5 rounded-md flex-1 overflow-y-auto space-y-3 font-mono">
          <div className="flex justify-between items-center border-b border-cyan-400/20 pb-2">
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-cyan-300 tracking-wider">
                LUNAR SYSTEM DIRECTORY ({planet.moons.length} CATALOGED)
              </h3>
            </div>
            {focusedMoonId && (
              <button
                onClick={() => {
                  sound.playBeep(640, 0.05);
                  onFocusMoon(null);
                }}
                className="text-[10px] px-2 py-0.5 rounded border border-amber-400/50 bg-amber-500/20 text-amber-300 flex items-center gap-1 hover:bg-amber-500/30"
              >
                <RotateCcw className="w-2.5 h-2.5" /> RESET VIEW
              </button>
            )}
          </div>

          {planet.moons.map((moon) => {
            const isFocused = focusedMoonId === moon.id;
            return (
              <div
                key={moon.id}
                className={`p-3 rounded border transition-all duration-200 space-y-2 ${
                  isFocused
                    ? 'border-amber-400 bg-amber-950/20 shadow-md'
                    : 'border-slate-800 bg-[#0d1322]/90 hover:border-cyan-400/40'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full inline-block"
                        style={{ backgroundColor: moon.color }}
                      />
                      {moon.name}
                    </div>
                    <span className="text-[10px] text-slate-400">{moon.designation}</span>
                  </div>

                  <button
                    onClick={() => {
                      sound.playBeep(780, 0.05);
                      onFocusMoon(isFocused ? null : moon.id);
                    }}
                    className={`text-[10px] px-2 py-1 rounded border flex items-center gap-1 transition-all ${
                      isFocused
                        ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-bold'
                        : 'bg-black/40 border-slate-700 text-slate-300 hover:border-cyan-400 hover:text-cyan-300'
                    }`}
                  >
                    <Focus className="w-3 h-3" /> {isFocused ? 'TRACKING' : 'FOCUS'}
                  </button>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1">
                  {moon.badges.map((b) => (
                    <span
                      key={b}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-400/30 text-cyan-300"
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed">{moon.overview}</p>

                {/* Moon Orbital & Physical Specs */}
                <div className="grid grid-cols-2 gap-1.5 text-[10px] bg-black/40 p-2 rounded border border-slate-800/80">
                  <div>
                    <span className="text-slate-400">Mean Radius: </span>
                    <span className="text-white font-bold">{moon.radiusKm.toLocaleString()} km</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Orbital Dist: </span>
                    <span className="text-white font-bold">{moon.orbitDistanceKm.toLocaleString()} km</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Orbital Period: </span>
                    <span className="text-cyan-300 font-bold">{moon.orbitalPeriodDays} d</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Eccentricity: </span>
                    <span className="text-amber-400 font-bold">{moon.eccentricity}</span>
                  </div>
                </div>

                {/* Distinguishing Surface Features */}
                <div className="space-y-0.5 pt-1">
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider block">
                    Distinguishing Surface Features:
                  </span>
                  <ul className="text-[10px] text-slate-300 list-disc list-inside space-y-0.5">
                    {moon.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
};
