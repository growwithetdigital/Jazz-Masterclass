import React, { useState, useEffect } from 'react';
import { audioEngine } from '../utils/audioEngine';
import { CLARINET_DOUBLING_GUIDE } from '../data/conservatoryData';
import { PracticeItinerary, PracticeBlock } from '../types/masterclass';
import { Play, Pause, RotateCcw, Volume2, VolumeX, CheckSquare, Square, Clock, Sparkles, Feather, AlertTriangle } from 'lucide-react';

export const PracticeRoutineModule: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState<30 | 60 | 90>(60);
  const [includeClarinet, setIncludeClarinet] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<PracticeItinerary | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  // Practice Room Controls
  const [isMetronomeActive, setIsMetronomeActive] = useState(false);
  const [metronomeBpm, setMetronomeBpm] = useState(160);
  const [isSwingFeel, setIsSwingFeel] = useState(true);
  const [currentBeat, setCurrentBeat] = useState(0);

  // Drone Controls
  const [isDroneActive, setIsDroneActive] = useState(false);
  const [dronePitch, setDronePitch] = useState<'Bb' | 'F' | 'C' | 'Eb'>('Bb');

  const droneFrequencies = {
    'Bb': 233.08, // Concert Bb3 (Tenor Middle C)
    'F': 174.61,  // Concert F3 (Tenor G)
    'C': 130.81,  // Concert C3 (Tenor D)
    'Eb': 155.56  // Concert Eb3 (Tenor F)
  };

  // Metronome toggling
  const toggleMetronome = () => {
    if (isMetronomeActive) {
      audioEngine.stopMetronome();
      setIsMetronomeActive(false);
    } else {
      audioEngine.startMetronome(metronomeBpm, isSwingFeel, (beat) => {
        setCurrentBeat(beat);
      });
      setIsMetronomeActive(true);
    }
  };

  const handleBpmChange = (newBpm: number) => {
    setMetronomeBpm(newBpm);
    if (isMetronomeActive) {
      audioEngine.startMetronome(newBpm, isSwingFeel, (beat) => {
        setCurrentBeat(beat);
      });
    }
  };

  const handleSwingToggle = () => {
    const nextSwing = !isSwingFeel;
    setIsSwingFeel(nextSwing);
    if (isMetronomeActive) {
      audioEngine.startMetronome(metronomeBpm, nextSwing, (beat) => {
        setCurrentBeat(beat);
      });
    }
  };

  // Drone toggling
  const toggleDrone = () => {
    if (isDroneActive) {
      audioEngine.stopDrone();
      setIsDroneActive(false);
    } else {
      audioEngine.startDrone(droneFrequencies[dronePitch]);
      setIsDroneActive(true);
    }
  };

  const handleDronePitchChange = (pitch: 'Bb' | 'F' | 'C' | 'Eb') => {
    setDronePitch(pitch);
    if (isDroneActive) {
      audioEngine.startDrone(droneFrequencies[pitch]);
    }
  };

  // Fetch or generate itinerary
  const generateRoutine = async (duration = selectedDuration, clarinet = includeClarinet) => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          durationMinutes: duration,
          doublingFocus: clarinet,
          focusAreas: ['Overtones', 'Parker 3-to-9 arpeggios', 'Ellington Solo', 'Clarinet Embouchure']
        })
      });
      const data = await res.json();
      setItinerary(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleCheckExercise = (id: string) => {
    setCompletedExercises(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    generateRoutine(60, true);
    return () => {
      audioEngine.stopMetronome();
      audioEngine.stopDrone();
    };
  }, []);

  return (
    <div className="space-y-10">
      {/* Module Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#212433] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>Module 5</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Daily Conservatory Practice Studio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            Practice Itinerary & Live Audio Tools
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Customized 30-, 60-, or 90-minute conservatory practice blocks with an integrated Jazz Swing Metronome (2 & 4 accent), Acoustic Overtone Tuning Drone, and Clarinet Doubling Codex.
          </p>
        </div>

        {/* Duration Selectors */}
        <div className="flex items-center gap-2 p-1 bg-[#141624] rounded-lg border border-[#24293d]">
          <span className="text-xs text-slate-400 px-2 font-mono">Plan:</span>
          {([30, 60, 90] as const).map((d) => (
            <button
              key={d}
              onClick={() => {
                setSelectedDuration(d);
                generateRoutine(d, includeClarinet);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                selectedDuration === d
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {d} Min
            </button>
          ))}
        </div>
      </div>

      {/* Practice Room Interactive Audio Deck (Metronome + Drone) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Tool 1: Swing Metronome (Ellington / Bebop Pocket) */}
        <div className="p-5 rounded-xl border border-[#272c40] bg-[#12141f] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-bold font-display text-white">Jazz Swing Metronome</h4>
            </div>
            <button
              onClick={handleSwingToggle}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors border ${
                isSwingFeel
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                  : 'bg-[#1a1d2c] text-slate-400 border-[#2a2f44]'
              }`}
            >
              {isSwingFeel ? 'Swing 2 & 4 Accent' : 'Straight 4/4'}
            </button>
          </div>

          {/* Visual Beat Indicator */}
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((b) => {
              const isCurrent = isMetronomeActive && currentBeat === b;
              const isAccentBeat = isSwingFeel ? (b === 1 || b === 3) : (b === 0);
              return (
                <div
                  key={b}
                  className={`h-9 rounded flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-amber-400 text-slate-950 scale-105 shadow-md'
                      : isAccentBeat
                      ? 'bg-[#1b1e2c] text-amber-300/80 border border-amber-500/20'
                      : 'bg-[#151724] text-slate-500'
                  }`}
                >
                  Beat {b + 1}
                </div>
              );
            })}
          </div>

          {/* BPM Slider and Controller */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Tempo:</span>
              <span className="text-xl font-bold text-white tabular-nums">{metronomeBpm} <span className="text-xs text-slate-400">BPM</span></span>
            </div>
            <input
              type="range"
              min="50"
              max="280"
              value={metronomeBpm}
              onChange={(e) => handleBpmChange(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>54 (Ballad)</span>
              <span>160 (Medium Swing)</span>
              <span>230 (Cottontail)</span>
              <span>260+ (Cherokee)</span>
            </div>
          </div>

          <button
            onClick={toggleMetronome}
            className={`w-full py-2.5 rounded font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              isMetronomeActive
                ? 'bg-red-600 hover:bg-red-500 text-white'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
            }`}
          >
            {isMetronomeActive ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Stop Metronome</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Start Swing Click</span>
              </>
            )}
          </button>
        </div>

        {/* Tool 2: Acoustic Overtone Tuning Drone */}
        <div className="p-5 rounded-xl border border-[#272c40] bg-[#12141f] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-bold font-display text-white">Concert Pitch Tuning Drone</h4>
            </div>
            <span className="text-[11px] font-mono text-emerald-400">Harmonic Rich Sound</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Sustains rich acoustic sine + 2nd/3rd harmonics for overtone voicing and pitch centering:
          </p>

          {/* Pitch Selector Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {(['Bb', 'F', 'C', 'Eb'] as const).map((p) => {
              const isSelected = dronePitch === p;
              return (
                <button
                  key={p}
                  onClick={() => handleDronePitchChange(p)}
                  className={`p-2.5 rounded text-center transition-all border ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 font-bold shadow-sm'
                      : 'bg-[#151724] border-[#222533] text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-sm font-bold font-mono">Concert {p}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {p === 'Bb' ? 'Tenor C' : p === 'F' ? 'Tenor G' : p === 'C' ? 'Tenor D' : 'Tenor F'}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded bg-[#0f111a] border border-[#222638] text-[11px] text-slate-300">
            <strong className="text-amber-400">Pedagogical Note for Mason: </strong>
            Play low Bb, B, or middle C on Tenor against the drone. Match pitch center until beating stops, then blow overtones without octave key.
          </div>

          <button
            onClick={toggleDrone}
            className={`w-full py-2.5 rounded font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              isDroneActive
                ? 'bg-red-600 hover:bg-red-500 text-white'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm'
            }`}
          >
            {isDroneActive ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Silence Drone</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Sound Concert {dronePitch} Drone</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Main Itinerary Modules & Clarinet Codex (Split Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Columns: Customized Practice Blocks */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-xl border border-[#252a3d] bg-[#12141f] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1f2334] pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-amber-400">
                  Agoura High Conservatory Regimen · {itinerary?.totalMinutes || selectedDuration} Minutes
                </span>
                <h3 className="text-xl font-bold font-display text-white mt-0.5">
                  {itinerary?.title || `${selectedDuration}-Minute Masterclass Routine`}
                </h3>
                <p className="text-xs text-amber-200/90 italic font-serif mt-1">
                  &ldquo;{itinerary?.dailyMotto || "Tone is the mirror of the soul; technique is the freedom to express it."}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const nextVal = !includeClarinet;
                    setIncludeClarinet(nextVal);
                    generateRoutine(selectedDuration, nextVal);
                  }}
                  className={`px-3 py-1 rounded text-xs border font-medium transition-colors ${
                    includeClarinet
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-[#171926] text-slate-400 border-[#272b3c]'
                  }`}
                >
                  {includeClarinet ? 'Clarinet Doubling: Included' : 'Clarinet Doubling: Off'}
                </button>
              </div>
            </div>

            {/* Time Blocks */}
            <div className="space-y-4">
              {itinerary?.blocks.map((block, bIdx) => (
                <div
                  key={bIdx}
                  className="p-4 rounded-lg bg-[#161826] border border-[#252a3d] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
                        {block.minutes} min
                      </span>
                      <h4 className="font-bold text-sm text-white font-display">
                        {block.section}
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {block.instrument}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    <strong className="text-slate-400">Goal: </strong>{block.goals}
                  </p>

                  <div className="space-y-2 pt-1">
                    {block.exercises.map((ex, eIdx) => {
                      const exKey = `${bIdx}-${eIdx}`;
                      const isDone = !!completedExercises[exKey];
                      return (
                        <div
                          key={eIdx}
                          onClick={() => toggleCheckExercise(exKey)}
                          className={`p-2.5 rounded border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                            isDone
                              ? 'bg-[#10121a] border-emerald-500/40 text-slate-400 line-through'
                              : 'bg-[#1c2030] border-[#292f44] text-slate-200 hover:border-[#38405d]'
                          }`}
                        >
                          <button
                            type="button"
                            className="mt-0.5 text-amber-400 shrink-0"
                          >
                            {isDone ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4" />}
                          </button>
                          <div className="flex-1 space-y-0.5">
                            <div className="flex items-center justify-between font-bold text-white text-[12px]">
                              <span>{ex.name}</span>
                              <span className="font-mono text-amber-300 text-[11px] font-normal">{ex.tempo}</span>
                            </div>
                            <div className="text-slate-300 text-[11px]">{ex.description}</div>
                            {ex.notes && (
                              <div className="text-slate-400 text-[10px] italic">{ex.notes}</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right 5 Columns: Clarinet Doubling Codex & 10-Second Emergency Reset */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Clarinet Doubling Emergency Reset Box */}
          <div className="p-5 rounded-xl border border-amber-500/40 bg-[#161825] space-y-4">
            <div className="flex items-center gap-2">
              <Feather className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-bold font-display text-white">
                10-Second Clarinet Doubling Reset
              </h4>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              When Bob Hackett signals a fast switch from Tenor to Bb Clarinet in Studio Jazz, execute this immediate physical reset:
            </p>

            <div className="space-y-2 text-xs">
              {CLARINET_DOUBLING_GUIDE.emergencyTenSecondReset.map((step, idx) => (
                <div key={idx} className="p-2.5 rounded bg-[#10121b] border border-[#232738] text-slate-200 text-[11px]">
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Pitfalls & Mechanics Comparison */}
          <div className="p-5 rounded-xl border border-[#252a3d] bg-[#12141f] space-y-4">
            <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Tenor vs. Clarinet Physics</span>
            </h4>

            <div className="space-y-3 text-xs">
              {CLARINET_DOUBLING_GUIDE.tenorVsClarinetComparisons.map((item, idx) => (
                <div key={idx} className="p-3 rounded bg-[#161826] border border-[#24283b] space-y-1.5">
                  <div className="font-bold text-amber-400 font-mono text-[11px]">
                    {item.parameter}
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    <strong className="text-slate-400">Tenor: </strong>{item.tenorSax}
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    <strong className="text-slate-400">Clarinet: </strong>{item.bbClarinet}
                  </div>
                  <div className="text-amber-200/90 text-[10px] italic pt-1 border-t border-[#202436]">
                    <strong>Trap: </strong>{item.pitfall}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
