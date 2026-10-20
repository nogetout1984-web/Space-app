/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, VolumeX, Eye, EyeOff, Activity, Compass, Gauge } from 'lucide-react';
import { sound } from '../utils/audioEngine';

interface HeaderNavProps {
  currentSection: 'planets' | 'rockets';
  onSwitchSection: (section: 'planets' | 'rockets') => void;
  telemetryCoords: string;
  telemetryVelocity: string;
  fps: number;
  showOrbits: boolean;
  onToggleOrbits: () => void;
  isWireframe: boolean;
  onToggleWireframe: () => void;
  isAudioOn: boolean;
  onToggleAudio: () => void;
  isHudCollapsed: boolean;
  onToggleHudCollapsed: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentSection,
  onSwitchSection,
  telemetryCoords,
  telemetryVelocity,
  fps,
  showOrbits,
  onToggleOrbits,
  isWireframe,
  onToggleWireframe,
  isAudioOn,
  onToggleAudio,
  isHudCollapsed,
  onToggleHudCollapsed,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 hud-glass px-4 py-2.5 border-b border-cyan-400/20 flex flex-wrap items-center justify-between gap-3 text-slate-100">
      {/* Brand / Title & State */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-7 h-7 rounded-sm border border-cyan-400/60 bg-cyan-950/40 text-cyan-400 font-mono font-bold text-xs">
          Ω
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-bold tracking-wider text-cyan-300 font-mono flex items-center gap-1.5">
              AETHERIA-ORBIT <span className="text-xs text-slate-400 font-mono font-normal tracking-widest hidden sm:inline">// COSMIC ATLAS</span>
            </h1>
          </div>
          <div className="text-[10px] text-slate-400 font-mono flex items-center space-x-2">
            <span className="flex items-center gap-1">
              SYS_STATE: <span className="text-emerald-400 font-semibold">NOMINAL</span>
            </span>
            <span>•</span>
            <span className="text-cyan-400/90 font-mono">{fps} FPS</span>
          </div>
        </div>
      </div>

      {/* Nav Section Switcher */}
      <nav className="flex items-center space-x-1 bg-[#0d1322] p-1 rounded border border-cyan-400/30">
        <button
          onClick={() => {
            sound.playBeep(620, 0.05);
            onSwitchSection('planets');
          }}
          className={`px-3 py-1.5 text-xs font-mono font-semibold rounded transition-all duration-150 ${
            currentSection === 'planets'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm'
              : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/30'
          }`}
        >
          SOLAR WORLDS & MOONS
        </button>
        <button
          onClick={() => {
            sound.playBeep(720, 0.05);
            onSwitchSection('rockets');
          }}
          className={`px-3 py-1.5 text-xs font-mono font-semibold rounded transition-all duration-150 ${
            currentSection === 'rockets'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm'
              : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/30'
          }`}
        >
          SATELLITES & ROCKET DYNAMICS
        </button>
      </nav>

      {/* Quick Telemetry & Control Toggles */}
      <div className="flex items-center space-x-3 text-xs font-mono">
        <div className="hidden lg:flex flex-col text-right pr-2.5 border-r border-slate-700/80">
          <span className="text-slate-400 text-[10px] flex items-center justify-end gap-1">
            <Compass className="w-2.5 h-2.5 text-amber-400" /> COORD (AU/REL)
          </span>
          <span className="text-amber-400 font-bold text-[11px]">{telemetryCoords}</span>
        </div>

        <div className="hidden sm:flex flex-col text-right pr-2.5 border-r border-slate-700/80">
          <span className="text-slate-400 text-[10px] flex items-center justify-end gap-1">
            <Gauge className="w-2.5 h-2.5 text-cyan-400" /> ORBITAL VEL
          </span>
          <span className="text-cyan-300 font-bold text-[11px]">{telemetryVelocity}</span>
        </div>

        {/* Action Toggles */}
        <div className="flex items-center space-x-1.5">
          {currentSection === 'planets' && (
            <button
              onClick={() => {
                sound.playBeep(800, 0.04);
                onToggleOrbits();
              }}
              title="Toggle Orbit Trails"
              className={`px-2 py-1 text-[11px] rounded border transition-colors ${
                showOrbits
                  ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300'
                  : 'bg-black/40 border-slate-700 text-slate-400 hover:border-cyan-400/40'
              }`}
            >
              TRAILS: {showOrbits ? 'ON' : 'OFF'}
            </button>
          )}

          <button
            onClick={() => {
              sound.playBeep(840, 0.04);
              onToggleWireframe();
            }}
            title="Toggle Wireframe HUD Mode"
            className={`px-2 py-1 text-[11px] rounded border transition-colors ${
              isWireframe
                ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300'
                : 'bg-black/40 border-slate-700 text-slate-400 hover:border-cyan-400/40'
            }`}
          >
            WIRE: {isWireframe ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => {
              onToggleAudio();
            }}
            title={isAudioOn ? 'Mute Audio Synthesizer' : 'Enable Procedural Audio'}
            className={`p-1.5 rounded border transition-colors ${
              isAudioOn
                ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                : 'bg-black/40 border-slate-700 text-slate-400 hover:border-amber-400/40'
            }`}
          >
            {isAudioOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => {
              sound.playBeep(700, 0.04);
              onToggleHudCollapsed();
            }}
            title={isHudCollapsed ? 'Expand HUD' : 'Collapse HUD for Zen View'}
            className={`p-1.5 rounded border transition-colors ${
              isHudCollapsed
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                : 'bg-black/40 border-slate-700 text-slate-400 hover:border-cyan-400/40'
            }`}
          >
            {isHudCollapsed ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
