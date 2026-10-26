import React, { useState } from 'react';
import { HARMONIC_LICKS, OVERTONE_CHART } from '../data/conservatoryData';
import { HarmonicLick } from '../types/masterclass';
import { Sparkles, ArrowRight, Layers, Volume2, Search, Sliders, Mic } from 'lucide-react';

interface TranscendenceLabModuleProps {
  onSelectTab?: (tab: string) => void;
}

export const TranscendenceLabModule: React.FC<TranscendenceLabModuleProps> = ({ onSelectTab }) => {
  const [selectedLick, setSelectedLick] = useState<HarmonicLick>(HARMONIC_LICKS[0]);
  const [selectedPitchView, setSelectedPitchView] = useState<'tenor' | 'concert' | 'alto'>('tenor');
  const [selectedOvertoneFundamental, setSelectedOvertoneFundamental] = useState<number>(0);
  const [customProgression, setCustomProgression] = useState('');
  const [customAnalysis, setCustomAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#212433] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>Module 3</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>The Parker & Coltrane Transcendence Lab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            Harmonic Mechanics, Enclosures & Overtones
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Master Charlie Parker's chromatic enclosures and 3-to-9 arpeggio resolutions alongside John Coltrane's 3-key cycles, overtone series voicings, and exact instrument transposition.
          </p>
        </div>

        {/* Global Pitch Transposition Filter */}
        <div className="flex items-center gap-1 p-1 bg-[#151724] rounded-lg border border-[#25293d] self-start md:self-auto">
          <span className="text-xs text-slate-400 px-2 font-mono">View as:</span>
          <button
            onClick={() => setSelectedPitchView('tenor')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              selectedPitchView === 'tenor'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bb Tenor / Clarinet
          </button>
          <button
            onClick={() => setSelectedPitchView('concert')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              selectedPitchView === 'concert'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Concert Pitch
          </button>
          <button
            onClick={() => setSelectedPitchView('alto')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              selectedPitchView === 'alto'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Eb Alto (Bird)
          </button>
        </div>
      </div>

      {/* Main Two-Zone Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Columns: Lick Engine & Enclosure Blueprint */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Lick Selector Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HARMONIC_LICKS.map((lick) => {
              const isSelected = selectedLick.id === lick.id;
              return (
                <button
                  key={lick.id}
                  onClick={() => setSelectedLick(lick)}
                  className={`p-3.5 rounded-lg text-left transition-all border ${
                    isSelected
                      ? 'bg-[#181a28] border-amber-400 shadow-sm ring-1 ring-amber-400/30'
                      : 'bg-[#11131c] border-[#222533] text-slate-400 hover:text-white hover:border-[#32364c]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-amber-400 mb-1">
                    <span>{lick.sourceMaster}</span>
                    <span className="text-slate-500">Bebop Unit</span>
                  </div>
                  <h4 className="font-bold text-sm text-white font-display line-clamp-1">{lick.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{lick.chordContext}</p>
                </button>
              );
            })}
          </div>

          {/* Active Lick Interactive Display Board */}
          <div className="p-6 rounded-xl border border-[#252a3d] bg-[#12141f] space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1e2233] pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-amber-400">
                  Concept Source: {selectedLick.sourceMaster}
                </span>
                <h3 className="text-xl font-bold font-display text-white mt-0.5">
                  {selectedLick.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-300 px-2.5 py-1 rounded bg-[#1c2030] border border-[#2c3248]">
                {selectedLick.chordContext}
              </span>
            </div>

            {/* Note Sequence in Selected Pitch */}
            <div className="p-4 rounded-lg bg-[#0e1017] border border-[#23273a] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-amber-400 font-semibold uppercase">
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

              <div className="text-base sm:text-lg font-mono font-bold text-amber-200 tracking-wide break-words py-1">
                {selectedPitchView === 'tenor' && selectedLick.tenorNotes}
                {selectedPitchView === 'concert' && selectedLick.concertNotes}
                {selectedPitchView === 'alto' && selectedLick.altoNotes}
              </div>
            </div>

            {/* Harmonic Theory Breakdown */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Harmonic Architecture:
                </span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  {selectedLick.harmonicConcept}
                </p>
              </div>

              <div className="p-3.5 rounded bg-[#171926] border border-[#24283c]">
                <span className="font-semibold text-amber-300 block mb-1">
                  Conservatory Practice Directive (For Mason):
                </span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  {selectedLick.pedagogicalTip}
                </p>
              </div>
            </div>

            {/* Quick All-3-Keys Transposition Strip */}
            <div className="pt-2 border-t border-[#1d2130] grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] font-mono">
              <div className="p-2 rounded bg-[#151724] border border-[#232738]">
                <span className="text-slate-400 block mb-0.5">Bb Tenor / Clarinet:</span>
                <span className="text-amber-300 font-semibold">{selectedLick.tenorNotes.split('->')[0]}...</span>
              </div>
              <div className="p-2 rounded bg-[#151724] border border-[#232738]">
                <span className="text-slate-400 block mb-0.5">Concert Key:</span>
                <span className="text-slate-200 font-semibold">{selectedLick.concertNotes.split('->')[0]}...</span>
              </div>
              <div className="p-2 rounded bg-[#151724] border border-[#232738]">
                <span className="text-slate-400 block mb-0.5">Eb Alto:</span>
                <span className="text-slate-200 font-semibold">{selectedLick.altoNotes.split('->')[0]}...</span>
              </div>
            </div>

          </div>

          {/* AI Harmonic Progression Analyzer Form */}
          <div className="p-5 rounded-xl border border-[#252a3d] bg-[#12141f] space-y-4">
            <div className="flex items-center gap-2 text-white font-display font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Harmonic Progression Analyzer & Transposition Generator</span>
            </div>
            <p className="text-xs text-slate-400">
              Paste or type any chord progression from your Agoura High charts (e.g. <code className="text-amber-300 font-mono">Fm7 - Bb7 - Ebmaj7 - Abmaj7</code> or <code className="text-amber-300 font-mono">Cmaj7 - Eb7 - Abmaj7</code>) for instant Roman numeral analysis, target guide tones, and Parker/Coltrane substitution.
            </p>

            <form onSubmit={handleAnalyzeProgression} className="flex gap-2">
              <input
                type="text"
                value={customProgression}
                onChange={(e) => setCustomProgression(e.target.value)}
                placeholder="Enter chords, e.g.: Dm7 - G7 - Cmaj7 or Coltrane Changes"
                className="flex-1 bg-[#0b0c12] border border-[#272b3e] focus:border-amber-400 focus:outline-none rounded px-3.5 py-2 text-xs font-mono text-white placeholder-slate-500"
              />
              <button
                type="submit"
                disabled={!customProgression.trim() || isAnalyzing}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold rounded text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors whitespace-nowrap"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze'}
              </button>
            </form>

            {customAnalysis && (
              <div className="mt-4 p-4 rounded-lg bg-[#0e1017] border border-[#272c40] text-xs space-y-3">
                <div className="flex items-center justify-between font-mono text-amber-400 border-b border-[#1f2334] pb-2">
                  <span className="font-bold">{customAnalysis.title}</span>
                  <span className="text-slate-400">{customAnalysis.romanNumerals}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
                  <div>
                    <span className="text-slate-400 block">Bb Tenor Chords:</span>
                    <span className="text-white font-bold">{customAnalysis.tenorBbChords}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Guide Tones:</span>
                    <span className="text-amber-300 font-bold">{customAnalysis.guideTones}</span>
                  </div>
                </div>

                {customAnalysis.parkerEnclosureLick && (
                  <div className="p-2.5 rounded bg-[#151724] border border-[#232738]">
                    <span className="font-bold text-amber-400 block mb-0.5">Parker Enclosure Lick:</span>
                    <span className="font-mono text-slate-200 block">{customAnalysis.parkerEnclosureLick.tenorNotes}</span>
                    <span className="text-slate-400 mt-1 block">{customAnalysis.parkerEnclosureLick.explanation}</span>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Right 5 Columns: The Coltrane & Brecker Overtone Voicing Lab */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Coltrane 3-Key Cycle Matrix Diagram */}
          <div className="p-5 rounded-xl border border-[#252a3d] bg-[#12141f] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold font-display text-white">The Coltrane Matrix (3-Key Cycle)</h4>
              </div>
              <span className="text-[11px] font-mono text-amber-400">Giant Steps Cycle</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Coltrane replaces standard ii-V-I progressions by dividing the octave into 3 equal major thirds:
            </p>

            {/* Tri-Tonic Visual Diagram */}
            <div className="p-3.5 rounded-lg bg-[#0e1017] border border-[#24283c] space-y-3">
              <div className="flex items-center justify-between text-center font-mono text-xs">
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold flex-1">
                  <div>Tonic 1</div>
                  <div className="text-sm text-white mt-0.5">
                    {selectedPitchView === 'tenor' ? 'Dmaj7' : selectedPitchView === 'alto' ? 'Amaj7' : 'Cmaj7'}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 mx-1 shrink-0" />
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold flex-1">
                  <div>Tonic 2</div>
                  <div className="text-sm text-white mt-0.5">
                    {selectedPitchView === 'tenor' ? 'Bbmaj7' : selectedPitchView === 'alto' ? 'Fmaj7' : 'Abmaj7'}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 mx-1 shrink-0" />
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold flex-1">
                  <div>Tonic 3</div>
                  <div className="text-sm text-white mt-0.5">
                    {selectedPitchView === 'tenor' ? 'F#maj7' : selectedPitchView === 'alto' ? 'C#maj7' : 'Emaj7'}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Each tonic is 4 semitones (major third) apart. On Tenor Sax: <strong className="text-slate-200">D &rarr; Bb &rarr; F# &rarr; D</strong>. Connecting them at 240 BPM requires digital patterns (1-2-3-5) and unbroken breath support.
              </div>
            </div>
          </div>

          {/* Overtone Series & Altissimo Voicing Chart */}
          <div className="p-5 rounded-xl border border-[#252a3d] bg-[#12141f] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold font-display text-white">Tenor Overtone Voicing Codex</h4>
              </div>
              <div className="flex items-center gap-1 p-0.5 rounded bg-[#1c202e] text-[11px] font-mono">
                <button
                  onClick={() => setSelectedOvertoneFundamental(0)}
                  className={`px-2 py-0.5 rounded ${selectedOvertoneFundamental === 0 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                >
                  Low Bb
                </button>
                <button
                  onClick={() => setSelectedOvertoneFundamental(1)}
                  className={`px-2 py-0.5 rounded ${selectedOvertoneFundamental === 1 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                >
                  Low B
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {OVERTONE_CHART[selectedOvertoneFundamental].conservatoryValue}
            </p>

            {/* Overtones List */}
            <div className="space-y-2 text-xs">
              {OVERTONE_CHART[selectedOvertoneFundamental].harmonics.map((h, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded bg-[#161825] border border-[#232738] flex items-center justify-between gap-2"
                >
                  <div>
                    <span className="font-mono text-amber-400 font-bold block">{h.order}</span>
                    <span className="text-white font-medium text-sm">{h.note}</span>
                    <span className="text-[11px] text-slate-400 block">{h.fingeringNote}</span>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-[#1e2233] text-amber-300 font-mono text-[11px] border border-[#2d334a]">
                      Vowel: {h.embouchure.split(',')[0]}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-1">{h.pitch}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded bg-[#151724] border border-[#25293d] text-xs text-slate-300">
              <span className="font-semibold text-amber-400 block mb-0.5">Michael Brecker Altissimo Tip:</span>
              <p className="text-[11px] leading-relaxed text-slate-300">
                Never bite to squeeze out the high overtones. The overtone series is manipulated purely through tongue arch (voicing "OH" to "EE") and soft palate control.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
