import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TENOR_TITANS } from '../data/conservatoryData';
import { TenorTitan, SoundDemoNote } from '../types/masterclass';
import { audioEngine } from '../utils/audioEngine';
import { ExternalLink, Sparkles, Send, Music, Award, Radio, Play, Pause, Volume2, CheckCircle2 } from 'lucide-react';
import { JAZZ_IMAGES } from '../assets/imageAssets';

export const TenorTitansModule: React.FC = () => {
  const [selectedTitan, setSelectedTitan] = useState<TenorTitan>(TENOR_TITANS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [consultQuery, setConsultQuery] = useState('');
  const [isConsulting, setIsConsulting] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeNotePlaying, setActiveNotePlaying] = useState<string | null>(null);

  const [consultationHistory, setConsultationHistory] = useState<Array<{ sender: 'user' | 'titan'; name: string; text: string }>>([
    {
      sender: 'titan',
      name: TENOR_TITANS[0].name,
      text: `Mason, Bob Hackett speaks highly of your fire at Agoura High. To play this horn, you must master the fundamental harmony. What chord progression, ballad voicing, or articulation question is challenging you today?`
    }
  ]);

  const filteredTitans = TENOR_TITANS.filter(t => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'legends') return t.category === 'Tenor Legend';
    if (activeCategory === 'recruitment') return t.category !== 'Tenor Legend';
    return true;
  });

  const handleSelectTitan = (titan: TenorTitan) => {
    audioEngine.stopSequence();
    setIsPlayingAudio(false);
    setActiveNotePlaying(null);
    setSelectedTitan(titan);
    setConsultationHistory([
      {
        sender: 'titan',
        name: titan.name,
        text: `Mason, this is ${titan.name}. Regarding my sound philosophy ("${titan.soundPhilosophy.slice(0, 80)}..."), what are you working through in the studio today?`
      }
    ]);
  };

  // Play single note button
  const handlePlaySingleNote = (note: SoundDemoNote) => {
    setActiveNotePlaying(note.noteName);
    audioEngine.playNote(note.freq, (note.durationMs / 1000) * 1.2, 'triangle');
    setTimeout(() => {
      setActiveNotePlaying(null);
    }, note.durationMs * 1.2);
  };

  // Play complete sequence
  const handlePlayFullSequence = () => {
    if (!selectedTitan.facultySoundDemo) return;
    if (isPlayingAudio) {
      audioEngine.stopSequence();
      setIsPlayingAudio(false);
      setActiveNotePlaying(null);
      return;
    }

    setIsPlayingAudio(true);
    const notes = selectedTitan.facultySoundDemo.notes;

    let delay = 0;
    notes.forEach((n) => {
      setTimeout(() => {
        if (isPlayingAudio) {
          setActiveNotePlaying(n.noteName);
        }
      }, delay);
      delay += n.durationMs;
    });

    audioEngine.playNoteSequence(notes, () => {
      setIsPlayingAudio(false);
      setActiveNotePlaying(null);
    });
  };

  const handleSendConsult = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!consultQuery.trim() || isConsulting) return;

    const userText = consultQuery.trim();
    setConsultQuery('');
    setConsultationHistory(prev => [...prev, { sender: 'user', name: 'Mason', text: userText }]);
    setIsConsulting(true);

    try {
      const res = await fetch('/api/faculty-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mentorId: selectedTitan.id,
          userMessage: userText,
          conversationHistory: consultationHistory.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          }))
        })
      });
      const data = await res.json();
      setConsultationHistory(prev => [
        ...prev,
        {
          sender: 'titan',
          name: data.mentorName || selectedTitan.name,
          text: data.response
        }
      ]);
    } catch (err) {
      console.error(err);
      setConsultationHistory(prev => [
        ...prev,
        {
          sender: 'titan',
          name: selectedTitan.name,
          text: `Mason, center your tone on the fundamental. Make every breath support the center of the pitch before adding speed.`
        }
      ]);
    } finally {
      setIsConsulting(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#212433] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <span>The Expert Panel</span>
            <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
            <span>Top 10 Tenor Greats & Interactive Sound Lessons</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            The Pantheon of Tenor Saxophone Masters & Panel Sound Studio
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            The defining 10 tenor saxophonists who built the modern sound of the instrument—paired with interactive sound & note buttons so Mason can hear, inspect, and match the exact acoustic pitches, overtones, and enclosures.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#141624] rounded-lg border border-slate-200 dark:border-[#25293d] self-start md:self-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              activeCategory === 'all'
                ? 'bg-white dark:bg-amber-500 text-slate-900 dark:text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Masters (12)
          </button>
          <button
            onClick={() => setActiveCategory('legends')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              activeCategory === 'legends'
                ? 'bg-white dark:bg-amber-500 text-slate-900 dark:text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Top 10 Tenor Legends
          </button>
          <button
            onClick={() => setActiveCategory('recruitment')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              activeCategory === 'recruitment'
                ? 'bg-white dark:bg-amber-500 text-slate-900 dark:text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Audition & Studio Voices
          </button>
        </div>
      </div>

      {/* 12 Titan Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTitans.map((titan, idx) => {
          const isSelected = selectedTitan.id === titan.id;
          let titanImage = JAZZ_IMAGES.tenorSaxSoloist;
          if (['hawkins', 'young', 'webster', 'gordon', 'henderson'].includes(titan.id)) {
            titanImage = JAZZ_IMAGES.tenorLegendPortrait;
          } else if (titan.id === 'coltrane' || titan.id === 'rollins' || titan.id === 'brecker') {
            titanImage = JAZZ_IMAGES.tenorTitansStage;
          } else if (titan.id === 'adjudicator') {
            titanImage = JAZZ_IMAGES.auditionHall;
          } else if (titan.id === 'studio_chair') {
            titanImage = JAZZ_IMAGES.studioMixingConsole;
          }

          return (
            <motion.div
              key={titan.id}
              whileHover={{ y: -2 }}
              onClick={() => handleSelectTitan(titan)}
              className={`p-4 rounded-xl text-left transition-all border cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-amber-500/10 dark:bg-[#181a28] border-amber-500 dark:border-amber-400 shadow-sm ring-1 ring-amber-500/30'
                  : 'bg-white dark:bg-[#11131c] border-slate-200 dark:border-[#222533] hover:border-slate-300 dark:hover:border-[#32364c]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                    {idx < 10 ? `0${idx + 1}. Tenor Great` : 'Panel Voice'}
                  </span>
                  <span className="font-mono text-[11px]">{titan.era.split('-')[0].trim()}</span>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-900 border border-slate-300 dark:border-[#2d3248]">
                    <img
                      src={titanImage}
                      alt={titan.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white font-display">
                      {titan.name}
                    </h3>
                    <p className="text-xs text-amber-700 dark:text-amber-300 font-medium line-clamp-1">
                      {titan.moniker}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 line-clamp-2 leading-relaxed font-sans">
                  {titan.soundPhilosophy}
                </p>
              </div>

              {/* Quick Note Sound Badge */}
              <div className="pt-2 border-t border-slate-100 dark:border-[#1e2233] flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Interactive Audio</span>
                </span>
                <span className="font-semibold text-amber-600 dark:text-amber-400 text-[11px]">
                  {isSelected ? 'Active In Console' : 'Consult Master'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Titan Master Dossier & Live Mentorship Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 6 Columns: Deep Profile, Audio Sound Notes & Curated YouTube */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#12141f] space-y-5 shadow-xs">
            
            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-[#1f2334] pb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-500/40 bg-slate-900 shadow-md">
                <img
                  src={
                    selectedTitan.category === 'Tenor Legend'
                      ? (['hawkins', 'young', 'webster', 'gordon', 'henderson'].includes(selectedTitan.id)
                          ? JAZZ_IMAGES.tenorLegendPortrait
                          : JAZZ_IMAGES.tenorSaxSoloist)
                      : (selectedTitan.id === 'adjudicator'
                          ? JAZZ_IMAGES.auditionHall
                          : JAZZ_IMAGES.studioMixingConsole)
                  }
                  alt={selectedTitan.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-amber-600 dark:text-amber-400 font-bold">
                  {selectedTitan.category} · {selectedTitan.era}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-0.5">
                  {selectedTitan.name}
                </h3>
                <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold mt-0.5">
                  {selectedTitan.moniker}
                </p>
              </div>
            </div>

            {/* INTERACTIVE SOUND & NOTE BUTTONS FOR LESSON (USER REQUESTED FEATURE) */}
            {selectedTitan.facultySoundDemo && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-50 dark:via-[#161825] to-emerald-500/10 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-amber-500" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
                      Faculty Sound Lesson & Interactive Pitches
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
                    Web Audio Synthesis
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white font-display">
                    {selectedTitan.facultySoundDemo.title}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 font-sans">
                    {selectedTitan.facultySoundDemo.concept}
                  </div>
                </div>

                {/* Individual Note Trigger Buttons */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Click Any Note to Sound Pitch for Saxophone Match:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTitan.facultySoundDemo.notes.map((note, nIdx) => {
                      const isActive = activeNotePlaying === note.noteName;
                      return (
                        <button
                          key={nIdx}
                          type="button"
                          onClick={() => handlePlaySingleNote(note)}
                          className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all border cursor-pointer active:scale-95 ${
                            isActive
                              ? 'bg-amber-500 text-slate-950 border-amber-500 scale-105 shadow-md animate-pulse'
                              : 'bg-white dark:bg-[#1a1d2c] border-slate-300 dark:border-[#2c3247] text-slate-800 dark:text-slate-200 hover:border-amber-500 hover:text-amber-500'
                          }`}
                        >
                          <span>{note.noteName}</span>
                          <span className="text-[9px] text-slate-400 block font-normal">
                            {Math.round(note.freq)} Hz
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Play Full Sequence Button */}
                <button
                  type="button"
                  onClick={handlePlayFullSequence}
                  className={`w-full py-2.5 rounded-xl text-xs font-extrabold uppercase font-mono tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                    isPlayingAudio
                      ? 'bg-red-600 hover:bg-red-500 text-white'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Stop Playing Phrase</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Play Complete Lesson Phrase</span>
                    </>
                  )}
                </button>

                {/* Pedagogical Advice */}
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-[11px] text-amber-900 dark:text-amber-200 leading-relaxed font-sans">
                  <strong>Master Keynote for Mason: </strong>
                  {selectedTitan.facultySoundDemo.pedagogyAdvice}
                </div>
              </div>
            )}

            {/* Famous Quote */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-[#24283c]">
              <p className="italic font-serif text-slate-800 dark:text-amber-100 text-sm leading-relaxed">
                &ldquo;{selectedTitan.famousQuote}&rdquo;
              </p>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-2 block">
                — {selectedTitan.quoteSource}
              </span>
            </div>

            {/* Why Mason Must Study */}
            <div className="space-y-1.5 text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-mono">
                Why Mason Must Study This Titan (Agoura High Context):
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {selectedTitan.whyMasonMustStudy}
              </p>
            </div>

            {/* Technical Keynote */}
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-slate-800 dark:text-amber-200">
              <strong className="text-amber-700 dark:text-amber-400">Technical Keynote: </strong>
              {selectedTitan.technicalKeynote}
            </div>

            {/* Curated Works with Direct YouTube Links */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-[#1e2233]">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-mono">
                Curated Essential Recordings & YouTube Links:
              </span>
              <div className="space-y-2">
                {selectedTitan.famousWorks.map((work, wIdx) => (
                  <div
                    key={wIdx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#151724] border border-slate-200 dark:border-[#232738] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Music className="w-3.5 h-3.5 text-amber-500" />
                        <span className="font-bold text-slate-900 dark:text-white font-display text-sm">
                          {work.title}
                        </span>
                        <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                          ({work.year})
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                        {work.albumOrSession}
                      </div>
                      <div className="text-[11px] text-amber-700 dark:text-amber-300/90 mt-1 italic">
                        {work.musicalHighlight}
                      </div>
                    </div>

                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(work.youtubeQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-800 dark:text-amber-300 hover:bg-amber-500/30 font-semibold transition-colors whitespace-nowrap self-start sm:self-auto text-xs"
                    >
                      <span>Listen on YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right 6 Columns: Interactive Mentorship Consultation Desk */}
        <div className="lg:col-span-6 flex flex-col rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#10121b] h-[640px] shadow-xs">
          
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-[#1f2334] bg-slate-50 dark:bg-[#141624] rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-600 dark:text-amber-300 font-bold text-sm">
                {selectedTitan.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white leading-tight">
                  Consultation: {selectedTitan.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedTitan.moniker}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
              Interactive Panelist
            </span>
          </div>

          {/* Chat Transcript */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
            {consultationHistory.map((msg, mIdx) => {
              const isTitan = msg.sender === 'titan';
              return (
                <div key={mIdx} className={`flex flex-col ${isTitan ? 'items-start' : 'items-end'}`}>
                  <span className="font-mono text-[10px] text-slate-400 mb-1 px-1">
                    {isTitan ? msg.name : 'Mason (Agoura Studio Jazz)'}
                  </span>
                  <div
                    className={`max-w-[88%] rounded-xl p-3.5 leading-relaxed text-xs ${
                      isTitan
                        ? 'bg-slate-100 dark:bg-[#181a28] border border-slate-200 dark:border-[#272b3e] text-slate-800 dark:text-slate-200'
                        : 'bg-amber-500 text-slate-950 font-medium'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>
                </div>
              );
            })}
            {isConsulting && (
              <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-300 italic p-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>{selectedTitan.name} is reviewing your question...</span>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="px-5 py-2.5 border-t border-slate-100 dark:border-[#1d202d] bg-slate-50/50 dark:bg-[#0e1017]">
            <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400 block mb-1">
              Ask {selectedTitan.name.split(' ')[0]}:
            </span>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                "How do I keep my sound thick down to low Bb?",
                "What is your secret to phrasing over the bar-line?",
                "How should I approach my college audition tape?",
                "How do you handle switching to Bb Clarinet?"
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setConsultQuery(q);
                  }}
                  className="px-2.5 py-1 text-[11px] rounded bg-white dark:bg-[#171924] border border-slate-200 dark:border-[#282d40] text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-white whitespace-nowrap transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="p-4 border-t border-slate-100 dark:border-[#212433] bg-slate-50 dark:bg-[#141624] rounded-b-2xl">
            <form onSubmit={handleSendConsult} className="flex gap-2">
              <input
                type="text"
                value={consultQuery}
                onChange={(e) => setConsultQuery(e.target.value)}
                placeholder={`Ask ${selectedTitan.name.split(' ')[0]} about sound, rhythm changes, or audition readiness...`}
                className="flex-1 bg-white dark:bg-[#0b0c12] border border-slate-200 dark:border-[#262a3d] focus:border-amber-500 focus:outline-none rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400"
              />
              <button
                type="submit"
                disabled={!consultQuery.trim() || isConsulting}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <span>Ask</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
