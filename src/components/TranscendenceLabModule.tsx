import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HARMONIC_LICKS, OVERTONE_CHART } from '../data/conservatoryData';
import { HarmonicLick, SoundDemoNote } from '../types/masterclass';
import { audioEngine, NOTE_FREQUENCIES } from '../utils/audioEngine';
import { 
  Sparkles, ArrowRight, Layers, Volume2, Search, Sliders, 
  Mic, Play, Pause, Send, User, MessageCircle, BookOpen, Music, FileText
} from 'lucide-react';

interface TranscendenceLabModuleProps {
  onSelectTab?: (tab: string) => void;
}

export const TranscendenceLabModule: React.FC<TranscendenceLabModuleProps> = ({ onSelectTab }) => {
  const [selectedLick, setSelectedLick] = useState<HarmonicLick>(HARMONIC_LICKS[0]);
  const [selectedPitchView, setSelectedPitchView] = useState<'tenor' | 'concert' | 'alto'>('tenor');
  const [selectedOvertoneFundamental, setSelectedOvertoneFundamental] = useState<number>(0);
  const [filterMaster, setFilterMaster] = useState<'all' | 'parker' | 'coltrane' | 'brecker'>('all');
  
  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeNotePlaying, setActiveNotePlaying] = useState<string | null>(null);
  const [playbackTempo, setPlaybackTempo] = useState<number>(selectedLick.tempoBpm || 210);

  // Coltrane Matrix State
  const [activeMatrixTonic, setActiveMatrixTonic] = useState<number>(0);

  // Virtual Consultation Desk State (Bird vs Trane)
  const [consultantMaster, setConsultantMaster] = useState<'parker' | 'coltrane'>('parker');
  const [consultQuery, setConsultQuery] = useState('');
  const [isConsulting, setIsConsulting] = useState(false);
  const [consultHistory, setConsultHistory] = useState<Array<{ sender: 'user' | 'master'; name: string; text: string }>>([
    {
      sender: 'master',
      name: 'Charlie "Bird" Parker',
      text: "Mason, Bob Hackett told me you've got fire on that tenor at Agoura High. But remember: you've got to learn your instrument, learn the music, and then forget all that mess and just play. What enclosure or bridge transition is hanging you up today?"
    }
  ]);

  // Progression Analyzer State
  const [customProgression, setCustomProgression] = useState('');
  const [customAnalysis, setCustomAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredLicks = HARMONIC_LICKS.filter(lick => {
    if (filterMaster === 'all') return true;
    if (filterMaster === 'parker') return lick.sourceMaster === 'Charlie Parker';
    if (filterMaster === 'coltrane') return lick.sourceMaster === 'John Coltrane';
    if (filterMaster === 'brecker') return lick.sourceMaster === 'Michael Brecker';
    return true;
  });

  const handleSelectLick = (lick: HarmonicLick) => {
    audioEngine.stopSequence();
    setIsPlayingAudio(false);
    setActiveNotePlaying(null);
    setSelectedLick(lick);
    setPlaybackTempo(lick.tempoBpm || 210);
  };

  // Play single note button
  const handlePlaySingleNote = (note: SoundDemoNote) => {
    setActiveNotePlaying(note.noteName);
    audioEngine.playNote(note.freq, (note.durationMs / 1000) * 1.2, 'triangle');
    setTimeout(() => {
      setActiveNotePlaying(null);
    }, note.durationMs * 1.2);
  };

  // Play full phrase sequence
  const handlePlayFullSequence = () => {
    if (!selectedLick.soundNotes || selectedLick.soundNotes.length === 0) return;

    if (isPlayingAudio) {
      audioEngine.stopSequence();
      setIsPlayingAudio(false);
      setActiveNotePlaying(null);
      return;
    }

    setIsPlayingAudio(true);
    const originalBpm = selectedLick.tempoBpm || 210;
    const speedRatio = originalBpm / playbackTempo;

    const adjustedNotes = selectedLick.soundNotes.map(n => ({
      ...n,
      durationMs: n.durationMs * speedRatio
    }));

    let delay = 0;
    adjustedNotes.forEach((n, idx) => {
      setTimeout(() => {
        if (!isPlayingAudio && idx > 0) return;
        setActiveNotePlaying(n.noteName);
      }, delay);
      delay += n.durationMs;
    });

    audioEngine.playNoteSequence(adjustedNotes, () => {
      setIsPlayingAudio(false);
      setActiveNotePlaying(null);
    });
  };

  // Handle Virtual Faculty Dialogue
  const handleSendConsultation = async (customPromptText?: string) => {
    const textToSend = customPromptText || consultQuery;
    if (!textToSend.trim() || isConsulting) return;

    const userMessage = { sender: 'user' as const, name: 'Mason (Agoura Studio Jazz)', text: textToSend };
    setConsultHistory(prev => [...prev, userMessage]);
    setConsultQuery('');
    setIsConsulting(true);

    try {
      const res = await fetch('/api/faculty-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          facultyId: consultantMaster === 'parker' ? 'parker' : 'coltrane',
          studentQuestion: textToSend,
          currentRepertoire: selectedLick.title,
          studentFocus: `Studying ${selectedLick.harmonicConcept} at Agoura High`
        })
      });
      const data = await res.json();
      
      const masterName = consultantMaster === 'parker' ? 'Charlie "Bird" Parker' : 'John Coltrane';
      setConsultHistory(prev => [
        ...prev,
        {
          sender: 'master',
          name: masterName,
          text: data.reply || (consultantMaster === 'parker'
            ? "Hear the line inside your chest before you touch the brass, Mason. Enclose the third, hit beat 2 like a hammer, and resolve cleanly."
            : "The 3 keys are one single prayer divided into three reflections. Play each digital pattern (1-2-3-5) with unbroken breath support.")
        }
      ]);
    } catch (err) {
      const fallbackReply = consultantMaster === 'parker'
        ? "Mason, the key is where your line lands. If you drop the lower chromatic note on the upbeat and pop the chord tone on the downbeat, the rhythm section can't drag you."
        : "Dedication and sound center. When you practice the 3-key cycles, don't rush. Slow it down to 140 BPM, hear every major third resolve, and maintain your core tone.";
      
      setConsultHistory(prev => [
        ...prev,
        {
          sender: 'master',
          name: consultantMaster === 'parker' ? 'Charlie "Bird" Parker' : 'John Coltrane',
          text: fallbackReply
        }
      ]);
    } finally {
      setIsConsulting(false);
    }
  };

  const handleSwitchMaster = (master: 'parker' | 'coltrane') => {
    setConsultantMaster(master);
    if (master === 'parker') {
      setConsultHistory([
        {
          sender: 'master',
          name: 'Charlie "Bird" Parker',
          text: "Mason, let's talk bebop mechanics. Bebop isn't just fast scales—it's target notes, chromatic enclosures, and rhythmic accents. What line are we perfecting today?"
        }
      ]);
    } else {
      setConsultHistory([
        {
          sender: 'master',
          name: 'John Coltrane',
          text: "Greetings, Mason. To master the tenor saxophone, you must build an immovable tone center and see harmony as infinite geometry. How are the 3-key cycles and overtones treating your horn?"
        }
      ]);
    }
  };

  // Analyze Custom Progression
  const handleAnalyzeProgression = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customProgression.trim() || isAnalyzing) return;
    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/transcribe-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chordProgression: customProgression,
          tuneTitle: "Mason Studio Analysis"
        })
      });
      const data = await res.json();
      setCustomAnalysis(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#212433] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <span>Harmonic Architecture & Transcendence</span>
            <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
            <span>Charlie Parker & John Coltrane Master Lab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Parker & Coltrane Transcendence Lab
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Master Charlie Parker's chromatic enclosures and 3-to-9 arpeggio resolutions alongside John Coltrane's 3-key cycles, digital pentatonics, sheets of sound, and altissimo overtone voicings with interactive Web Audio synthesis and virtual master consultation.
          </p>
        </div>

        {/* Global Pitch Transposition Filter */}
        <div className="flex flex-col gap-1.5 self-start md:self-auto">
          <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400">Transposition:</span>
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#151724] rounded-xl border border-slate-200 dark:border-[#25293d]">
            <button
              onClick={() => setSelectedPitchView('tenor')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedPitchView === 'tenor'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Bb Tenor / Clarinet
            </button>
            <button
              onClick={() => setSelectedPitchView('concert')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedPitchView === 'concert'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Concert Pitch
            </button>
            <button
              onClick={() => setSelectedPitchView('alto')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedPitchView === 'alto'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Eb Alto (Bird Key)
            </button>
          </div>
        </div>
      </div>

      {/* Filter by Master Pattern */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-medium">
        {[
          { id: 'all', label: `All Patterns (${HARMONIC_LICKS.length})` },
          { id: 'parker', label: 'Charlie Parker Bebop Enclosures' },
          { id: 'coltrane', label: 'John Coltrane 3-Key Cycles & Sheets' },
          { id: 'brecker', label: 'Brecker Altissimo & Overtones' }
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilterMaster(f.id as any)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all border ${
              filterMaster === f.id
                ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500 text-amber-700 dark:text-amber-400 font-bold'
                : 'bg-white dark:bg-[#12141f] border-slate-200 dark:border-[#222533] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Main Two-Zone Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 6 Columns: Lick Engine & Interactive Sound Player */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Lick Selector Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
            {filteredLicks.map((lick) => {
              const isSelected = selectedLick.id === lick.id;
              return (
                <button
                  key={lick.id}
                  onClick={() => handleSelectLick(lick)}
                  className={`p-3.5 rounded-xl text-left transition-all border shadow-xs ${
                    isSelected
                      ? 'bg-amber-500/10 dark:bg-[#1a1c2a] border-amber-500 ring-1 ring-amber-500/30'
                      : 'bg-white dark:bg-[#11131c] border-slate-200 dark:border-[#222533] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-[#32364c]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-amber-700 dark:text-amber-400 mb-1 font-semibold">
                    <span>{lick.sourceMaster}</span>
                    <span className="text-slate-500 dark:text-slate-400">{lick.tempoBpm} BPM</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white font-display line-clamp-1">{lick.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{lick.chordContext}</p>
                </button>
              );
            })}
          </div>

          {/* Active Lick Interactive Display Board */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#12141f] space-y-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-[#1e2233] pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-amber-700 dark:text-amber-400 font-semibold">
                  Source: {selectedLick.sourceMaster}
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mt-0.5">
                  {selectedLick.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md bg-slate-100 dark:bg-[#1c2030] border border-slate-200 dark:border-[#2c3248] font-bold">
                {selectedLick.chordContext}
              </span>
            </div>

            {/* Note Sequence in Selected Pitch */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0e1017] border border-slate-200 dark:border-[#23273a] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-amber-700 dark:text-amber-400 font-semibold uppercase">
                  {selectedPitchView === 'tenor'
                    ? 'Written Notes for Bb Tenor Saxophone (and Bb Clarinet)'
                    : selectedPitchView === 'alto'
                    ? 'Transposed for Eb Alto Saxophone (Bird Alto Key)'
                    : 'Concert Pitch (Piano / Rhythm Section Key)'}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  {selectedPitchView === 'tenor' ? '+1 Whole Step' : selectedPitchView === 'alto' ? '+Major 6th' : 'Tonic C'}
                </span>
              </div>

              <div className="text-base sm:text-lg font-mono font-bold text-amber-900 dark:text-amber-200 tracking-wide break-words py-1">
                {selectedPitchView === 'tenor' && selectedLick.tenorNotes}
                {selectedPitchView === 'concert' && selectedLick.concertNotes}
                {selectedPitchView === 'alto' && selectedLick.altoNotes}
              </div>
            </div>

            {/* INTERACTIVE SOUND SYNTHESIS & NOTE BUTTONS (NEW TITAN-STYLE FEATURE) */}
            {selectedLick.soundNotes && selectedLick.soundNotes.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#151726] border border-slate-200 dark:border-[#262a3f] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold uppercase font-mono tracking-wider text-slate-900 dark:text-white">
                      Web Audio Synthesizer & Note Sandbox
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Click any note to hear pitch
                  </span>
                </div>

                {/* Individual Note Buttons */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase text-slate-500 block">Phrase Notes (Tenor Pitch):</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedLick.soundNotes.map((note, nIdx) => {
                      const isNoteActive = activeNotePlaying === note.noteName;
                      return (
                        <button
                          key={nIdx}
                          type="button"
                          onClick={() => handlePlaySingleNote(note)}
                          className={`px-3 py-1.5 rounded-lg font-mono font-bold text-xs transition-all cursor-pointer border ${
                            isNoteActive
                              ? 'bg-amber-500 text-slate-950 border-amber-400 scale-110 shadow-md ring-2 ring-amber-400'
                              : 'bg-white dark:bg-[#1a1c2d] border-slate-300 dark:border-[#2f354a] text-slate-800 dark:text-slate-200 hover:border-amber-500 hover:text-amber-600'
                          }`}
                        >
                          {note.noteName}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Full Sequence Playback Button & Tempo Control */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-[#202434]">
                  <button
                    type="button"
                    onClick={handlePlayFullSequence}
                    className={`py-2 px-4 rounded-lg text-xs font-extrabold uppercase font-mono tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                      isPlayingAudio
                        ? 'bg-red-600 hover:bg-red-500 text-white'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Stop Lick</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Play Complete Master Lick</span>
                      </>
                    )}
                  </button>

                  {/* Tempo Slider */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-300">
                    <span>Tempo:</span>
                    <input
                      type="range"
                      min={120}
                      max={260}
                      step={10}
                      value={playbackTempo}
                      onChange={(e) => setPlaybackTempo(Number(e.target.value))}
                      className="w-24 accent-amber-500"
                    />
                    <span className="font-bold text-amber-700 dark:text-amber-400 w-16">{playbackTempo} BPM</span>
                  </div>
                </div>
              </div>
            )}

            {/* Harmonic Theory Breakdown */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Harmonic Architecture:
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {selectedLick.harmonicConcept}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#171926] border border-slate-200 dark:border-[#24283c]">
                <span className="font-semibold text-amber-800 dark:text-amber-300 block mb-1">
                  Conservatory Practice Directive (For Mason):
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {selectedLick.pedagogicalTip}
                </p>
              </div>
            </div>

            {/* In-Module Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200 dark:border-[#1d2130]">
              {onSelectTab && (
                <>
                  <button
                    onClick={() => onSelectTab('practice')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-xs"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Practice with Swing Metronome (2 & 4)</span>
                  </button>
                  <button
                    onClick={() => onSelectTab('vault')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-[#181b29] hover:bg-slate-200 dark:hover:bg-[#202538] text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors border border-slate-300 dark:border-[#2c3248]"
                  >
                    <Mic className="w-3.5 h-3.5 text-amber-500" />
                    <span>Record Take with This Enclosure</span>
                  </button>
                  <button
                    onClick={() => onSelectTab('sheets')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-[#181b29] hover:bg-slate-200 dark:hover:bg-[#202538] text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors border border-slate-300 dark:border-[#2c3248]"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span>Find in Sheet Music Vault</span>
                  </button>
                </>
              )}
            </div>

          </div>

        </div>

        {/* Right 6 Columns: Interactive Virtual Consultation Desk + Coltrane Matrix */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* INTERACTIVE VIRTUAL FACULTY DESK: BIRD & TRANE */}
          <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#10121b] h-[520px] shadow-xs">
            
            {/* Header: Toggle Between Bird and Trane */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-[#1f2334] bg-slate-50 dark:bg-[#141624] rounded-t-2xl">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSwitchMaster('parker')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    consultantMaster === 'parker'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Charlie "Bird" Parker
                </button>
                <button
                  onClick={() => handleSwitchMaster('coltrane')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    consultantMaster === 'coltrane'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  John Coltrane
                </button>
              </div>

              <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                Virtual Master Consultation
              </span>
            </div>

            {/* Quick Consultation Starters for Mason */}
            <div className="px-5 py-2.5 bg-slate-100/70 dark:bg-[#141724] border-b border-slate-200 dark:border-[#1d202e] flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
              <span className="text-slate-500 shrink-0 font-mono">Ask:</span>
              <button
                onClick={() => handleSendConsultation("How do I connect the 3 keys of Giant Steps at 240 BPM?")}
                className="px-2.5 py-1 rounded-md bg-white dark:bg-[#1a1e2f] border border-slate-200 dark:border-[#2d3348] text-slate-700 dark:text-slate-300 whitespace-nowrap hover:border-amber-500"
              >
                "Connecting Giant Steps at 240 BPM"
              </button>
              <button
                onClick={() => handleSendConsultation("How do I make my enclosures swing hard on beats 2 and 4?")}
                className="px-2.5 py-1 rounded-md bg-white dark:bg-[#1a1e2f] border border-slate-200 dark:border-[#2d3348] text-slate-700 dark:text-slate-300 whitespace-nowrap hover:border-amber-500"
              >
                "Swinging Enclosures on 2 and 4"
              </button>
              <button
                onClick={() => handleSendConsultation("How do I voice altissimo without biting the reed?")}
                className="px-2.5 py-1 rounded-md bg-white dark:bg-[#1a1e2f] border border-slate-200 dark:border-[#2d3348] text-slate-700 dark:text-slate-300 whitespace-nowrap hover:border-amber-500"
              >
                "Voicing Altissimo without Biting"
              </button>
            </div>

            {/* Chat Transcript */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              {consultHistory.map((msg, mIdx) => {
                const isMaster = msg.sender === 'master';
                return (
                  <div key={mIdx} className={`flex flex-col ${isMaster ? 'items-start' : 'items-end'}`}>
                    <span className="font-mono text-[10px] text-slate-400 mb-1 px-1">
                      {isMaster ? msg.name : 'Mason (Agoura Studio Jazz)'}
                    </span>
                    <div
                      className={`max-w-[88%] rounded-xl p-3.5 leading-relaxed text-xs ${
                        isMaster
                          ? 'bg-slate-100 dark:bg-[#181a28] border border-slate-200 dark:border-[#262a3f] text-slate-800 dark:text-slate-200'
                          : 'bg-amber-500 text-slate-950 font-medium'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              {isConsulting && (
                <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-mono italic">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>{consultantMaster === 'parker' ? 'Bird is demonstrating the enclosure...' : 'Trane is meditating on the harmonic cycle...'}</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleSendConsultation(); }} className="p-3 border-t border-slate-100 dark:border-[#1f2334] flex gap-2">
              <input
                type="text"
                value={consultQuery}
                onChange={(e) => setConsultQuery(e.target.value)}
                placeholder={`Ask ${consultantMaster === 'parker' ? 'Charlie Parker' : 'John Coltrane'} a technical or phrasing question...`}
                className="flex-1 px-3.5 py-2 bg-slate-50 dark:bg-[#0c0d13] border border-slate-200 dark:border-[#222534] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={!consultQuery.trim() || isConsulting}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>

          {/* Coltrane 3-Key Cycle Matrix Diagram */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#12141f] space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" />
                <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white">The Coltrane Matrix (3-Key Cycle)</h4>
              </div>
              <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-semibold">Giant Steps</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Coltrane replaces standard ii-V-I progressions by dividing the octave into 3 equal major thirds:
            </p>

            {/* Tri-Tonic Visual Diagram */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0e1017] border border-slate-200 dark:border-[#24283c] space-y-3">
              <div className="flex items-center justify-between text-center font-mono text-xs">
                <button
                  onClick={() => {
                    setActiveMatrixTonic(0);
                    audioEngine.playNote(NOTE_FREQUENCIES['D4'], 0.6);
                  }}
                  className={`p-2.5 rounded-lg border text-amber-800 dark:text-amber-300 font-bold flex-1 transition-all ${
                    activeMatrixTonic === 0 ? 'bg-amber-500/20 border-amber-500 ring-2 ring-amber-400' : 'bg-amber-500/10 border-amber-500/30'
                  }`}
                >
                  <div className="text-[10px] uppercase text-slate-500">Tonic 1</div>
                  <div className="text-sm text-slate-900 dark:text-white mt-0.5">
                    {selectedPitchView === 'tenor' ? 'Dmaj7' : selectedPitchView === 'alto' ? 'Amaj7' : 'Cmaj7'}
                  </div>
                </button>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 mx-1 shrink-0" />
                <button
                  onClick={() => {
                    setActiveMatrixTonic(1);
                    audioEngine.playNote(NOTE_FREQUENCIES['Bb3'], 0.6);
                  }}
                  className={`p-2.5 rounded-lg border text-amber-800 dark:text-amber-300 font-bold flex-1 transition-all ${
                    activeMatrixTonic === 1 ? 'bg-amber-500/20 border-amber-500 ring-2 ring-amber-400' : 'bg-amber-500/10 border-amber-500/30'
                  }`}
                >
                  <div className="text-[10px] uppercase text-slate-500">Tonic 2</div>
                  <div className="text-sm text-slate-900 dark:text-white mt-0.5">
                    {selectedPitchView === 'tenor' ? 'Bbmaj7' : selectedPitchView === 'alto' ? 'Fmaj7' : 'Abmaj7'}
                  </div>
                </button>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 mx-1 shrink-0" />
                <button
                  onClick={() => {
                    setActiveMatrixTonic(2);
                    audioEngine.playNote(NOTE_FREQUENCIES['F#4'], 0.6);
                  }}
                  className={`p-2.5 rounded-lg border text-amber-800 dark:text-amber-300 font-bold flex-1 transition-all ${
                    activeMatrixTonic === 2 ? 'bg-amber-500/20 border-amber-500 ring-2 ring-amber-400' : 'bg-amber-500/10 border-amber-500/30'
                  }`}
                >
                  <div className="text-[10px] uppercase text-slate-500">Tonic 3</div>
                  <div className="text-sm text-slate-900 dark:text-white mt-0.5">
                    {selectedPitchView === 'tenor' ? 'F#maj7' : selectedPitchView === 'alto' ? 'C#maj7' : 'Emaj7'}
                  </div>
                </button>
              </div>

              <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Each tonic is 4 semitones (major third) apart. On Tenor Sax: <strong className="text-slate-900 dark:text-slate-200">D &rarr; Bb &rarr; F# &rarr; D</strong>. Connecting them at 240 BPM requires digital patterns (1-2-3-5) and unbroken breath support.
              </div>
            </div>
          </div>

          {/* Overtone Series & Altissimo Voicing Chart */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#12141f] space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-500" />
                <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white">Tenor Overtone Voicing Codex</h4>
              </div>
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100 dark:bg-[#1c202e] text-[11px] font-mono">
                <button
                  onClick={() => {
                    setSelectedOvertoneFundamental(0);
                    audioEngine.playNote(NOTE_FREQUENCIES['Bb2'], 0.8);
                  }}
                  className={`px-2 py-0.5 rounded-md ${selectedOvertoneFundamental === 0 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  Low Bb
                </button>
                <button
                  onClick={() => {
                    setSelectedOvertoneFundamental(1);
                    audioEngine.playNote(NOTE_FREQUENCIES['B2'], 0.8);
                  }}
                  className={`px-2 py-0.5 rounded-md ${selectedOvertoneFundamental === 1 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  Low B
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {OVERTONE_CHART[selectedOvertoneFundamental].conservatoryValue}
            </p>

            {/* Overtones List */}
            <div className="space-y-2 text-xs">
              {OVERTONE_CHART[selectedOvertoneFundamental].harmonics.map((h, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-[#161825] border border-slate-200 dark:border-[#232738] flex items-center justify-between gap-2"
                >
                  <div>
                    <span className="font-mono text-amber-700 dark:text-amber-400 font-bold block">{h.order}</span>
                    <span className="text-slate-900 dark:text-white font-medium text-sm">{h.note}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{h.fingeringNote}</span>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1e2233] text-amber-700 dark:text-amber-300 font-mono text-[11px] border border-slate-200 dark:border-[#2d334a]">
                      Vowel: {h.embouchure.split(',')[0]}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">{h.pitch}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#151724] border border-slate-200 dark:border-[#25293d] text-xs text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-amber-700 dark:text-amber-400 block mb-0.5">Michael Brecker Altissimo Tip:</span>
              <p className="text-[11px] leading-relaxed">
                Never bite to squeeze out the high overtones. The overtone series is manipulated purely through tongue arch (voicing "OH" to "EE") and soft palate control.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
