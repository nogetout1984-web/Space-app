/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { CosmicViewport } from './components/CosmicViewport';
import { EncyclopediaView, EncyclopediaRoute } from './components/EncyclopediaView';
import {
  SRC_SOLAR_DATA,
  SrcPlanetItem,
  SrcMoonItem,
} from './data/srcSolarData';
import { PROBES_MONOGRAPHS } from './data/probesMonographsData';
import { sound } from './utils/audioEngine';
import {
  Volume2,
  VolumeX,
  Sun,
  BookOpen,
  Satellite,
  Scale,
  Globe,
} from 'lucide-react';

export default function App() {
  const [hudOpacity, setHudOpacity] = useState<number>(100);
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>('earth');
  const [selectedMoonId, setSelectedMoonId] = useState<string | null>(null);
  const [activeProbeBadgeId, setActiveProbeBadgeId] = useState<string | null>(null);

  // Encyclopedia modal state & active route
  const [isEncyclopediaOpen, setIsEncyclopediaOpen] = useState<boolean>(false);
  const [encyclopediaRoute, setEncyclopediaRoute] = useState<EncyclopediaRoute>({
    type: 'catalog',
  });

  const [timeSpeed, setTimeSpeed] = useState<number>(1.0);
  const [showOrbits, setShowOrbits] = useState<boolean>(true);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(60);

  const activePlanet: SrcPlanetItem | undefined = SRC_SOLAR_DATA.find(
    (p) => p.id === selectedPlanetId
  );
  const activeMoon: SrcMoonItem | undefined = activePlanet?.moons.find(
    (m) => m.id === selectedMoonId
  );
  const activeProbe = activeProbeBadgeId ? PROBES_MONOGRAPHS[activeProbeBadgeId] : null;

  const handleUpdateTelemetry = useCallback((_coords: string, _vel: string, currentFps: number) => {
    setFps(currentFps);
  }, []);

  const handleSelectPlanet = useCallback((planetId: string) => {
    sound.playBeep(680, 0.05);
    setSelectedPlanetId(planetId);
    setSelectedMoonId(null);
    setActiveProbeBadgeId(null);
  }, []);

  const handleSelectMoon = useCallback((moonId: string | null) => {
    sound.playBeep(820, 0.05);
    setSelectedMoonId((prev) => (prev === moonId ? null : moonId));
    setActiveProbeBadgeId(null);
  }, []);

  const handleOpenEncyclopedia = useCallback((route: EncyclopediaRoute) => {
    sound.playBeep(880, 0.06);
    setEncyclopediaRoute(route);
    setIsEncyclopediaOpen(true);
  }, []);

  const handleFocusIn3D = useCallback(
    (planetId: string, moonId: string | null = null, probeId: string | null = null) => {
      sound.playBeep(760, 0.05);
      setSelectedPlanetId(planetId);
      setSelectedMoonId(moonId);
      setActiveProbeBadgeId(probeId);
      setIsEncyclopediaOpen(false);
    },
    []
  );

  const handleToggleAudio = () => {
    const muted = sound.toggleMute();
    setIsAudioOn(!muted);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#07080c]">
      {/* 3D Viewport (Zero floating text overlays when HUD Opacity is 0) */}
      <CosmicViewport
        currentSection="planets"
        selectedPlanetId={selectedPlanetId}
        selectedMoonId={selectedMoonId}
        focusedSatelliteId={null}
        timeSpeed={timeSpeed}
        showOrbits={showOrbits}
        isWireframe={isWireframe}
        isExploded={false}
        rocketStageStep={0}
        onUpdateTelemetry={handleUpdateTelemetry}
        onSelectPlanet={handleSelectPlanet}
        onSelectMoon={setSelectedMoonId}
      />

      {/* Persistent HUD Slider (Visible in 3D Simulation, hidden when Text Encyclopedia is open) */}
      {!isEncyclopediaOpen && (
        <div id="hud-master-control">
          <label htmlFor="hud-slider">HUD Opacity</label>
          <input
            type="range"
            id="hud-slider"
            min={0}
            max={100}
            value={hudOpacity}
            onChange={(e) => setHudOpacity(Number(e.target.value))}
          />
          <span className="text-[11px] font-mono tabular-nums text-cyan-300 w-8 text-right">
            {hudOpacity}%
          </span>
          <button
            onClick={handleToggleAudio}
            title={isAudioOn ? 'Mute Telemetry Audio' : 'Enable Telemetry Audio'}
            className="ml-1 p-1 rounded border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition-colors cursor-pointer"
          >
            {isAudioOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* Collapsible HUD Wrapper (Hidden when Text Encyclopedia is open) */}
      <div
        id="hud-wrapper"
        style={{
          opacity: isEncyclopediaOpen ? 0 : hudOpacity / 100,
          pointerEvents: 'none',
          visibility: isEncyclopediaOpen ? 'hidden' : 'visible',
        }}
      >
        {/* Left Planet Switch Bar */}
        <div
          id="planet-bar"
          className="hud-interactive"
          style={{ pointerEvents: hudOpacity === 0 ? 'none' : 'auto' }}
        >
          <div className="panel-title">Solar System</div>
          <div id="planet-list" className="flex flex-col gap-1.5">
            <button
              onClick={() => handleSelectPlanet('sun')}
              className={`nav-btn ${selectedPlanetId === 'sun' ? 'active' : ''}`}
            >
              <span>The Sun (Sol)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            </button>

            <div className="panel-title mt-2">Planets (8)</div>
            {SRC_SOLAR_DATA.map((p) => {
              const isSelected = selectedPlanetId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPlanet(p.id)}
                  className={`nav-btn ${isSelected ? 'active' : ''}`}
                >
                  <span>{p.name}</span>
                  <div className="flex items-center gap-1.5">
                    {p.moons.length > 0 && (
                      <span className="text-[10px] text-cyan-300/80 font-mono">
                        {p.moons.length}M
                      </span>
                    )}
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: p.hexColor }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Simulation Controls inside Planet Bar */}
          <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono tabular-nums">
              <span>ORBIT SPEED</span>
              <span className="text-cyan-300">{timeSpeed}x</span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {[0, 1, 3, 10].map((spd) => (
                <button
                  key={spd}
                  onClick={() => {
                    sound.playBeep(750, 0.04);
                    setTimeSpeed(spd);
                  }}
                  className={`py-1 text-[10px] font-mono rounded border transition-colors cursor-pointer ${
                    timeSpeed === spd
                      ? 'bg-cyan-400/20 border-cyan-400 text-white font-bold'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {spd === 0 ? 'II' : `${spd}x`}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-1 mt-1">
              <button
                onClick={() => setShowOrbits((prev) => !prev)}
                className={`py-1 text-[10px] font-mono rounded border transition-colors cursor-pointer ${
                  showOrbits
                    ? 'bg-cyan-400/15 border-cyan-400/50 text-cyan-300'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                ORBITS: {showOrbits ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={() => setIsWireframe((prev) => !prev)}
                className={`py-1 text-[10px] font-mono rounded border transition-colors cursor-pointer ${
                  isWireframe
                    ? 'bg-cyan-400/15 border-cyan-400/50 text-cyan-300'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                WIRE: {isWireframe ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>

        {/* Separate Conditional Moon Tab */}
        <div
          id="moon-tab"
          className={`hud-interactive ${
            activePlanet && activePlanet.moons.length > 0 ? 'visible' : ''
          }`}
          style={{ pointerEvents: hudOpacity === 0 ? 'none' : 'auto' }}
        >
          <div className="panel-title" id="moon-tab-title">
            {activePlanet ? `${activePlanet.name} Moons` : 'Moons'}
          </div>
          <div id="moon-list" className="flex flex-col gap-1.5">
            {activePlanet?.moons.map((m) => {
              const isMoonActive = selectedMoonId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => handleSelectMoon(m.id)}
                  className={`nav-btn ${isMoonActive ? 'active' : ''}`}
                >
                  <span>{m.name}</span>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: m.hexColor }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom-Right Live Telemetry Status Card with Direct Monograph Opener */}
        <div
          className="hud-interactive fixed bottom-5 right-5 w-88 bg-[#0e111a]/92 border border-cyan-400/25 rounded-lg p-3.5 shadow-xl hidden sm:block"
          style={{ pointerEvents: hudOpacity === 0 ? 'none' : 'auto' }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-300 font-bold truncate pr-2">
              {activeProbe
                ? `MISSION SECTOR // ${activeProbe.acronym}`
                : activeMoon
                ? `LUNAR LOCK // ${activeMoon.name.toUpperCase()}`
                : activePlanet
                ? `PLANETARY LOCK // ${activePlanet.name.toUpperCase()}`
                : 'SOLAR LOCK // THE SUN (SOL)'}
            </span>
            <span className="text-[10px] font-mono tabular-nums text-emerald-400 shrink-0">
              {fps} FPS
            </span>
          </div>

          {activeProbe ? (
            <div className="space-y-2 text-xs">
              <div className="text-amber-300 font-bold font-mono text-[11px]">
                {activeProbe.name} · {activeProbe.status}
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-2">
                {activeProbe.summary}
              </p>
              <button
                onClick={() =>
                  handleOpenEncyclopedia({ type: 'probe', id: activeProbe.id })
                }
                className="w-full py-1.5 px-3 rounded border border-amber-400/50 bg-amber-500/15 hover:bg-amber-400 hover:text-black text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Satellite className="w-3.5 h-3.5" /> Return to {activeProbe.acronym} Dossier
              </button>
            </div>
          ) : activeMoon ? (
            <div className="space-y-2 text-xs">
              <p className="text-slate-300 text-[11px] leading-relaxed">{activeMoon.info}</p>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px] tabular-nums">
                <div className="bg-black/40 p-1.5 rounded border border-white/5">
                  <span className="text-slate-400 block">MEAN RADIUS</span>
                  <span className="text-white font-bold">{activeMoon.radiusKm}</span>
                </div>
                <div className="bg-black/40 p-1.5 rounded border border-white/5">
                  <span className="text-slate-400 block">ORBIT PERIOD</span>
                  <span className="text-cyan-300 font-bold">{activeMoon.orbitalPeriod}</span>
                </div>
              </div>
              {activePlanet && (
                <button
                  onClick={() =>
                    handleOpenEncyclopedia({ type: 'planet', id: activePlanet.id })
                  }
                  className="w-full py-1.5 px-3 rounded border border-cyan-400/50 bg-cyan-500/15 hover:bg-cyan-400 hover:text-black text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Open {activePlanet.name} Monograph
                </button>
              )}
            </div>
          ) : activePlanet ? (
            <div className="space-y-2 text-xs">
              <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-2">
                {activePlanet.description}
              </p>
              <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px] tabular-nums">
                <div className="bg-black/40 p-1.5 rounded border border-white/5">
                  <span className="text-slate-400 block">DIAMETER</span>
                  <span className="text-white font-bold">{activePlanet.diameterKm}</span>
                </div>
                <div className="bg-black/40 p-1.5 rounded border border-white/5">
                  <span className="text-slate-400 block">GRAVITY</span>
                  <span className="text-cyan-300 font-bold">{activePlanet.gravity}</span>
                </div>
                <div className="bg-black/40 p-1.5 rounded border border-white/5">
                  <span className="text-slate-400 block">DISTANCE</span>
                  <span className="text-amber-300 font-bold">{activePlanet.distanceAU}</span>
                </div>
              </div>
              <button
                onClick={() =>
                  handleOpenEncyclopedia({ type: 'planet', id: activePlanet.id })
                }
                className="w-full py-1.5 px-3 rounded border border-cyan-400/50 bg-cyan-500/15 hover:bg-cyan-400 hover:text-black text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5" /> Open {activePlanet.name} 6-Section Monograph
              </button>
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              <p className="text-slate-300 text-[11px] leading-relaxed">
                G2V Main-Sequence Star containing 99.86% of Solar System mass. Fuses 600M tons of hydrogen/sec at 15,000,000 °C.
              </p>
              <button
                onClick={() => handleOpenEncyclopedia({ type: 'sun' })}
                className="w-full py-1.5 px-3 rounded border border-amber-400/50 bg-amber-500/15 hover:bg-amber-400 hover:text-black text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sun className="w-3.5 h-3.5" /> Open Sun (Sol) Monograph
              </button>
            </div>
          )}
        </div>

        {/* Top-Right Encyclopedia & Section Launch Bar */}
        <div
          id="top-right-actions"
          className="hud-interactive flex-wrap justify-end max-w-[calc(100vw-280px)]"
          style={{ pointerEvents: hudOpacity === 0 ? 'none' : 'auto' }}
        >
          <button
            id="sun-switch-btn"
            onClick={() => handleOpenEncyclopedia({ type: 'sun' })}
          >
            <Sun className="w-4 h-4" />
            <span>Sun Monograph</span>
          </button>

          <button
            onClick={() =>
              handleOpenEncyclopedia({
                type: 'planet',
                id: selectedPlanetId === 'sun' ? 'earth' : selectedPlanetId,
              })
            }
            className="bg-[#0e111a]/90 border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black px-4 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
          >
            <Globe className="w-4 h-4" />
            <span>Planets (8)</span>
          </button>

          <button
            onClick={() => handleOpenEncyclopedia({ type: 'probe', id: 'voyager' })}
            className="bg-[#0e111a]/90 border border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-black px-4 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.18)]"
          >
            <Satellite className="w-4 h-4" />
            <span>Probes & Satellites (7)</span>
          </button>

          <button
            id="mode-switch-btn"
            onClick={() => handleOpenEncyclopedia({ type: 'compare' })}
            className="flex items-center gap-2"
          >
            <Scale className="w-4 h-4" />
            <span>Comparator</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          MULTI-SECTION COSMIC ENCYCLOPEDIA & SPACECRAFT ARCHIVE
      ===================================================================== */}
      {isEncyclopediaOpen && (
        <EncyclopediaView
          route={encyclopediaRoute}
          onChangeRoute={setEncyclopediaRoute}
          onCloseTo3D={() => setIsEncyclopediaOpen(false)}
          onFocusIn3D={handleFocusIn3D}
        />
      )}
    </div>
  );
}
