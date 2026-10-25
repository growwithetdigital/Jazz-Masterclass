import React, { useState } from 'react';
import { ELLINGTON_REPERTOIRE, COLLEGE_PRESCREENINGS } from '../data/conservatoryData';
import { EllingtonTune } from '../types/masterclass';
import { BookOpen, ExternalLink, GraduationCap, Sparkles, Music2, Clock } from 'lucide-react';
import { JAZZ_IMAGES } from '../assets/imageAssets';

export const EllingtonAuditionModule: React.FC = () => {
  const [selectedTune, setSelectedTune] = useState<EllingtonTune>(ELLINGTON_REPERTOIRE[0]);
  const [cadenzaKey, setCadenzaKey] = useState<'concert' | 'tenor'>('tenor');

  return (
    <div className="space-y-10">
      {/* Module Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#212433] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>Module 1</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Essentially Ellington & Audition Workshop</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            Ellington Tenor Masterworks & College Prescreening
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            In-depth analysis of Duke Ellington & Billy Strayhorn tenor saxophone masterworks alongside national conservatory prescreening criteria for Juilliard, MSM, USC Thornton, UNT, and Berklee.
          </p>
        </div>
      </div>

      {/* Repertoire Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {ELLINGTON_REPERTOIRE.map((tune) => {
          const isSelected = selectedTune.id === tune.id;
          return (
            <button
              key={tune.id}
              onClick={() => setSelectedTune(tune)}
              className={`px-4 py-2.5 rounded-lg text-left transition-all border whitespace-nowrap shrink-0 ${
                isSelected
                  ? 'bg-[#181a26] border-amber-400 text-white shadow-sm'
                  : 'bg-[#10121a] border-[#222533] text-slate-400 hover:text-slate-200 hover:border-[#32374c]'
              }`}
            >
              <div className="text-sm font-bold font-display">{tune.title}</div>
              <div className="text-xs text-amber-300/80 mt-0.5">{tune.style.split('/')[0]}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Tune Deep-Dive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Columns: In-depth Repertoire Dossier */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-xl border border-[#252a3d] bg-[#12141f] space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1f2334] pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-mono">
                  {selectedTune.year} · Composed by {selectedTune.composer}
                </span>
                <h3 className="text-2xl font-bold font-display text-white mt-0.5">
                  {selectedTune.title}
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
                <span className="px-2.5 py-1 rounded bg-[#1b1f2e] border border-[#2d334a]">
                  Concert: {selectedTune.keyConcert}
                </span>
                <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Tenor: {selectedTune.keyTenor}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#1b1f2e] border border-[#2d334a] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {selectedTune.tempoBpm} BPM
                </span>
              </div>
            </div>

            {/* Historical Context */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Historical Context & Tenor Legend Blueprint
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {selectedTune.historicalContext}
              </p>
              <div className="mt-2.5 text-xs text-amber-300 flex items-center gap-1.5 font-medium">
                <Music2 className="w-3.5 h-3.5" />
                <span>Benchmark Lineage: {selectedTune.leadTenorLegend}</span>
              </div>
            </div>

            {/* Solo Pillars */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                Mason's Solo Performance Objectives (Bob Hackett & Adjudication Standards)
              </h4>
              <div className="space-y-2">
                {selectedTune.soloFocus.map((point, i) => (
                  <div key={i} className="p-3 rounded bg-[#161826] border border-[#232738] flex items-start gap-2.5 text-xs text-slate-200">
                    <span className="text-amber-400 font-mono font-bold mt-0.5">0{i + 1}.</span>
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Listening Reference */}
            <div className="p-4 rounded-lg bg-[#151824] border border-[#262b3e] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Recommended Archival Recording:</span>
                <span className="text-white font-medium">{selectedTune.recommendedListen}</span>
              </div>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedTune.searchQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 font-medium transition-colors whitespace-nowrap"
              >
                <span>Study on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Prescreening Suitability Callout */}
            <div className="text-xs text-slate-400 pt-2 border-t border-[#1d2130]">
              <span className="font-semibold text-amber-400">College Audition Match: </span>
              <span>{selectedTune.prescreeningSuitability}</span>
            </div>

          </div>
        </div>

        {/* Right 5 Columns: Archival Manuscript & Interactive Cadenza Architect */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Manuscript Art Visual */}
          <div className="rounded-xl overflow-hidden border border-[#272c40] bg-[#12141f]">
            <div className="relative aspect-[16/10] bg-black">
              <img
                src={JAZZ_IMAGES.ellingtonManuscript}
                alt="Vintage big band music manuscript on wooden orchestra stand"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12141f] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                <span className="font-display font-bold text-white">Ellington Library Archival Score</span>
                <span className="font-mono text-amber-400 text-[11px]">Agoura Big Band Prep</span>
              </div>
            </div>
          </div>

          {/* Ballad Unaccompanied Cadenza Architect */}
          <div className="p-5 rounded-xl border border-[#252a3d] bg-[#12141f] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold font-display text-white">Ballad Cadenza Architect</h4>
              </div>
              <div className="flex items-center gap-1 p-0.5 rounded bg-[#1c202f] text-[11px] font-mono">
                <button
                  onClick={() => setCadenzaKey('tenor')}
                  className={`px-2 py-0.5 rounded ${cadenzaKey === 'tenor' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                >
                  Bb Tenor
                </button>
                <button
                  onClick={() => setCadenzaKey('concert')}
                  className={`px-2 py-0.5 rounded ${cadenzaKey === 'concert' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                >
                  Concert
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Every elite college audition (Juilliard, MSM, USC) requires an unaccompanied ballad cadenza. Use this architectural roadmap for <em className="text-amber-200">Prelude to a Kiss</em> or <em className="text-amber-200">Warm Valley</em>:
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-[#171926] border border-[#24283b]">
                <span className="text-amber-400 font-bold block mb-0.5">Phase 1: Low Sub-Tone Statement</span>
                <p className="text-slate-300">
                  {cadenzaKey === 'tenor' 
                    ? 'Start on low C (Concert Bb) at ppp. Arpeggiate Cmaj9 (C-E-G-B-D) with gentle warm breath vibrato.'
                    : 'Start on low Bb at ppp. Arpeggiate Bbmaj9 (Bb-D-F-A-C) with sub-tone warmth.'}
                </p>
              </div>

              <div className="p-2.5 rounded bg-[#171926] border border-[#24283b]">
                <span className="text-amber-400 font-bold block mb-0.5">Phase 2: Chromatic Whole-Tone Descent</span>
                <p className="text-slate-300">
                  {cadenzaKey === 'tenor'
                    ? 'Execute Billy Strayhorn whole-tone descent: G# - F# - E - D - C - Bb into an open pause.'
                    : 'Execute Billy Strayhorn whole-tone descent: F# - E - D - C - Bb - Ab into an open pause.'}
                </p>
              </div>

              <div className="p-2.5 rounded bg-[#171926] border border-[#24283b]">
                <span className="text-amber-400 font-bold block mb-0.5">Phase 3: Altissimo Bloom & Resolution</span>
                <p className="text-slate-300">
                  {cadenzaKey === 'tenor'
                    ? 'Leap from middle G up to Altissimo High E or F (voice with high tongue "EE"), descending into the final fermata tonic.'
                    : 'Leap from middle F up to Altissimo High D or Eb, descending into final fermata.'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* College Prescreening Targets Section */}
      <div className="border-t border-[#212433] pt-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <GraduationCap className="w-4 h-4" />
            <span>Collegiate Recruitment Benchmarks</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
            Top Conservatory Prescreening Requirements
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Adjudication panels look for distinct strengths across different music programs. Here are the specific submission standards for Mason's target schools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COLLEGE_PRESCREENINGS.map((school, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-[#23273a] bg-[#11131c] flex flex-col justify-between space-y-4 hover:border-[#333a52] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="font-mono text-amber-400">{school.location}</span>
                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#191c28] border border-[#282d3e]">
                    Acceptance {school.acceptanceRate}
                  </span>
                </div>
                <h4 className="text-base font-bold font-display text-white">
                  {school.institution}
                </h4>
                <p className="text-xs text-amber-200/80 mt-0.5">
                  Faculty: {school.facultyNotables}
                </p>

                <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                  <span className="font-semibold text-slate-400 block text-[11px] uppercase tracking-wider">
                    Prescreening Repertoire:
                  </span>
                  {school.prescreeningRequirements.map((req, rIdx) => (
                    <div key={rIdx} className="text-[11px] leading-relaxed text-slate-300 pl-2 border-l border-[#292f44]">
                      {req}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded bg-[#161825] border border-[#252a3c] text-xs text-slate-300">
                <span className="font-semibold text-amber-400 block mb-1">Adjudicator Inside Note:</span>
                <p className="text-[11px] leading-relaxed text-slate-300">{school.scoutTips}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
