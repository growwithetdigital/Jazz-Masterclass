// Web Audio Engine for Jazz Metronome, Drone Tuning, and Audio Recording

class AudioEngine {
  private ctx: AudioContext | null = null;
  private metronomeTimer: number | null = null;
  private isPlayingMetronome = false;
  private bpm = 120;
  private currentBeat = 0;
  private swingFeel = true; // Jazz swing: accent beats 2 & 4
  private droneOscs: OscillatorNode[] = [];
  private droneGain: GainNode | null = null;
  private isDroneActive = false;

  private getContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'suspended') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // --- JAZZ SWING METRONOME ---
  public startMetronome(bpm: number, swing: boolean, onTick?: (beat: number) => void) {
    this.stopMetronome();
    this.bpm = bpm;
    this.swingFeel = swing;
    this.isPlayingMetronome = true;
    this.currentBeat = 0;

    const intervalMs = (60 / this.bpm) * 1000;

    const playClick = () => {
      if (!this.isPlayingMetronome) return;
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // In jazz, beats 2 and 4 are the hi-hat snap
      const isAccent = this.swingFeel ? (this.currentBeat === 1 || this.currentBeat === 3) : (this.currentBeat === 0);
      
      osc.type = isAccent ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(isAccent ? 1200 : 800, ctx.currentTime);

      gain.gain.setValueAtTime(isAccent ? 0.35 : 0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (isAccent ? 0.08 : 0.04));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);

      if (onTick) {
        onTick(this.currentBeat);
      }

      this.currentBeat = (this.currentBeat + 1) % 4;
      this.metronomeTimer = window.setTimeout(playClick, intervalMs);
    };

    playClick();
  }

  public stopMetronome() {
    this.isPlayingMetronome = false;
    if (this.metronomeTimer !== null) {
      clearTimeout(this.metronomeTimer);
      this.metronomeTimer = null;
    }
    this.currentBeat = 0;
  }

  public isMetronomeRunning(): boolean {
    return this.isPlayingMetronome;
  }

  // --- CONCERT TUNING DRONE (Rich Acoustic Overtone Sound) ---
  public startDrone(frequency: number) {
    this.stopDrone();
    const ctx = this.getContext();

    this.droneGain = ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, ctx.currentTime);
    this.droneGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.3);
    this.droneGain.connect(ctx.destination);

    // Fundamental + 2nd harmonic + 3rd harmonic for rich acoustic warmth
    const harmonics = [
      { freq: frequency, gainFactor: 1.0, type: 'sine' as OscillatorType },
      { freq: frequency * 2, gainFactor: 0.35, type: 'sine' as OscillatorType },
      { freq: frequency * 3, gainFactor: 0.15, type: 'triangle' as OscillatorType }
    ];

    harmonics.forEach(({ freq, gainFactor, type }) => {
      const osc = ctx.createOscillator();
      const hGain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      hGain.gain.setValueAtTime(gainFactor, ctx.currentTime);
      osc.connect(hGain);
      hGain.connect(this.droneGain!);

      osc.start();
      this.droneOscs.push(osc);
    });

    this.isDroneActive = true;
  }

  public stopDrone() {
    if (!this.isDroneActive) return;
    if (this.droneGain && this.ctx) {
      try {
        this.droneGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      } catch (e) {
        // ignore
      }
    }
    setTimeout(() => {
      this.droneOscs.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {}
      });
      this.droneOscs = [];
      if (this.droneGain) {
        this.droneGain.disconnect();
        this.droneGain = null;
      }
      this.isDroneActive = false;
    }, 160);
  }

  public isDronePlaying(): boolean {
    return this.isDroneActive;
  }
}

export const audioEngine = new AudioEngine();
