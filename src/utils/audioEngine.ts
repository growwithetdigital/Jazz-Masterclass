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

  // --- INTERACTIVE NOTE & SOUND SYNTHESIS FOR LESSONS ---
  private activeSequenceTimers: number[] = [];

  public stopSequence() {
    this.activeSequenceTimers.forEach(t => clearTimeout(t));
    this.activeSequenceTimers = [];
  }

  public playNote(freq: number, durationSec = 0.5, oscType: OscillatorType = 'triangle') {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = oscType;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm sax-like envelope with quick attack and natural decay
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + durationSec + 0.05);
  }

  public playNoteSequence(notes: Array<{ noteName: string; durationMs: number; freq: number }>, onFinish?: () => void) {
    this.stopSequence();
    let accumulatedTime = 0;

    notes.forEach((item, idx) => {
      const timer = window.setTimeout(() => {
        this.playNote(item.freq, (item.durationMs / 1000) * 0.9);
        if (idx === notes.length - 1 && onFinish) {
          setTimeout(onFinish, item.durationMs);
        }
      }, accumulatedTime);
      this.activeSequenceTimers.push(timer);
      accumulatedTime += item.durationMs;
    });
  }
}

// Frequency map for standard saxophone / piano range notes (Bb2 to F6)
export const NOTE_FREQUENCIES: Record<string, number> = {
  // Low Tenor / Sub-tone range
  'Bb2': 116.54, 'B2': 123.47, 'C3': 130.81, 'C#3': 138.59, 'Db3': 138.59,
  'D3': 146.83, 'D#3': 155.56, 'Eb3': 155.56, 'E3': 164.81, 'F3': 174.61,
  'F#3': 185.00, 'Gb3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'Ab3': 207.65,
  'A3': 220.00, 'A#3': 233.08, 'Bb3': 233.08, 'B3': 246.94,

  // Middle Register
  'C4': 261.63, 'C#4': 277.18, 'Db4': 277.18, 'D4': 293.66,
  'D#4': 311.13, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23,
  'F#4': 369.99, 'Gb4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'Ab4': 415.30,
  'A4': 440.00, 'A#4': 466.16, 'Bb4': 466.16, 'B4': 493.88,

  // High Palm Keys & Altissimo
  'C5': 523.25, 'C#5': 554.37, 'Db5': 554.37, 'D5': 587.33,
  'D#5': 622.25, 'Eb5': 622.25, 'E5': 659.25, 'F5': 698.46,
  'F#5': 739.99, 'Gb5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'Ab5': 830.61,
  'A5': 880.00, 'A#5': 932.33, 'Bb5': 932.33, 'B5': 987.77,
  'C6': 1046.50, 'D6': 1174.66, 'E6': 1318.51, 'F6': 1396.91
};

export const audioEngine = new AudioEngine();
