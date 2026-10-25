import React, { useState } from 'react';
import { TENOR_TITANS } from '../data/conservatoryData';
import { TenorTitan } from '../types/masterclass';
import { ExternalLink, Sparkles, Send, Music, Award, Radio } from 'lucide-react';

export const TenorTitansModule: React.FC = () => {
  const [selectedTitan, setSelectedTitan] = useState<TenorTitan>(TENOR_TITANS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [consultQuery, setConsultQuery] = useState('');
  const [isConsulting, setIsConsulting] = useState(false);
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
    setSelectedTitan(titan);
    setConsultationHistory([
      {
        sender: 'titan',
        name: titan.name,
        text: `Mason, this is ${titan.name}. Regarding my sound philosophy ("${titan.soundPhilosophy.slice(0, 80)}..."), what are you working through in the studio today?`
      }
    ]);
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
            <span>Top 10 Tenor Greats & Recruitment Voices</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            The Pantheon of Tenor Saxophone Masters
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            The definitive 10 tenor saxophonists who defined the sound of the instrument—from Coleman Hawkins's foundational 1939 Body and Soul to Michael Brecker's modern altissimo—plus expert college audition scout perspectives.
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
            Top 10 Tenor Greats
          </button>
          <button
            onClick={() => setActiveCategory('recruitment')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              activeCategory === 'recruitment'
                ? 'bg-white dark:bg-amber-500 text-slate-900 dark:text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            College & Studio Voices
          </button>
        </div>
      </div>

      {/* Stage Backdrop Visual */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-[#272c40] bg-slate-900 text-white aspect-[21/9] sm:aspect-[24/8] max-h-64">
        <img
          src="/src/assets/images/tenor_titans_stage_1792948138626.jpg"
          alt="Archival Blue Note New York Jazz Club Stage"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-60 filter contrast-110"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
          <div>
            <span className="text-xs uppercase font-mono text-amber-400 tracking-wider">
              Acoustic Lineage
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-0.5">
              Stand on the Shoulders of the Titans
            </h3>
          </div>
          <span className="text-xs font-mono text-amber-300 bg-black/40 px-3 py-1 rounded backdrop-blur border border-white/10 hidden sm:inline-block">
            Hawkins · Young · Webster · Gordon · Rollins · Coltrane
          </span>
        </div>
      </div>

      {/* Titans Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTitans.map((titan, idx) => {
          const isSelected = selectedTitan.id === titan.id;
          return (
            <div
              key={titan.id}
              onClick={() => handleSelectTitan(titan)}
              className={`p-4 rounded-xl text-left transition-all border cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-amber-500/10 dark:bg-[#181a28] border-amber-500 dark:border-amber-400 shadow-sm ring-1 ring-amber-500/30'
                  : 'bg-white dark:bg-[#11131c] border-slate-200 dark:border-[#222533] hover:border-slate-300 dark:hover:border-[#32364c]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                    {idx < 10 ? `0${idx + 1}. Tenor Great` : 'Panel Voice'}
                  </span>
                  <span className="font-mono text-[11px]">{titan.era.split('-')[0].trim()}</span>
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white font-display">
                  {titan.name}
                </h3>
                <p className="text-xs text-amber-700 dark:text-amber-300 font-medium mt-0.5 line-clamp-1">
                  {titan.moniker}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {titan.soundPhilosophy}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-[#1e2233] flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {titan.famousWorks.length} Essential Works
                </span>
                <span className="font-semibold text-amber-600 dark:text-amber-400 text-[11px]">
                  {isSelected ? 'Active In Console' : 'Consult Master'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Titan Master Dossier & Live Mentorship Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 6 Columns: Deep Profile & Curated YouTube Masterpieces */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#12141f] space-y-5 shadow-xs">
            
            <div className="border-b border-slate-100 dark:border-[#1f2334] pb-4">
              <span className="text-xs uppercase font-mono tracking-wider text-amber-600 dark:text-amber-400">
                {selectedTitan.category} · {selectedTitan.era}
              </span>
              <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
                {selectedTitan.name}
              </h3>
              <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold mt-0.5">
                {selectedTitan.moniker}
              </p>
            </div>

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
              <span className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
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
              <span className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
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
                  className="px-2.5 py-1 text-[11px] rounded bg-white dark:bg-[#171924] border border-slate-200 dark:border-[#282d40] text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-white whitespace-nowrap transition-colors"
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
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs"
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
