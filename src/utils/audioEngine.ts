/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Procedural Web Audio API sound generator - 100% code-driven, zero external audio assets
class AudioEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private isMuted: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  public toggleMute(): boolean {
    this.init();
    if (!this.ctx) return true;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.startAmbientDrone();
      this.playBeep(880, 0.08, 'sine');
    } else {
      this.stopAmbientDrone();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public startAmbientDrone() {
    if (this.isMuted || !this.ctx) return;
    try {
      if (this.ambientOsc) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.02, this.ctx.currentTime + 3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      this.ambientOsc = osc;
      this.ambientGain = gain;
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public stopAmbientDrone() {
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, this.ctx.currentTime);
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          this.ambientOsc?.stop();
          this.ambientOsc?.disconnect();
          this.ambientOsc = null;
          this.ambientGain = null;
        }, 500);
      } catch {
        this.ambientOsc = null;
        this.ambientGain = null;
      }
    }
  }

  public playBeep(freq = 660, duration = 0.06, type: OscillatorType = 'sine') {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio error safety
    }
  }

  public playThrusterBlast(duration = 0.8) {
    if (this.isMuted || !this.ctx) return;
    try {
      // Filtered white noise for rocket rumble
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + duration);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // Silence on error
    }
  }
}

export const sound = new AudioEngine();
