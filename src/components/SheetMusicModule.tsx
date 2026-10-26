import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TENOR_SHEET_MUSIC_CATALOG } from '../data/sheetMusicData';
import { TenorSheetMusic, SheetMusicMeasure, SoundDemoNote } from '../types/masterclass';
import { audioEngine, NOTE_FREQUENCIES } from '../utils/audioEngine';
import { 
  FileText, Play, Pause, Volume2, ExternalLink, Mic, 
  Layers, Search, Music, Award, Sparkles, BookOpen, 
  Filter, CheckCircle2, ChevronRight
} from 'lucide-react';

interface SheetMusicModuleProps {
  onSelectTab?: (tab: string) => void;
}

export const SheetMusicModule: React.FC<SheetMusicModuleProps> = ({ onSelectTab }) => {
  const [selectedSheet, setSelectedSheet] = useState<TenorSheetMusic>(TENOR_SHEET_MUSIC_CATALOG[0]);
  const [transposition, setTransposition] = useState<'tenor' | 'clarinet' | 'concert' | 'alto'>('tenor');
  const [filterStyle, setFilterStyle] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // Sax Great Master Notes State (Parker vs Coltrane)
  const [activeMasterView, setActiveMasterView] = useState<'both' | 'parker' | 'coltrane'>('both');
  const [playingMaster, setPlayingMaster] = useState<'parker' | 'coltrane' | null>(null);
  const [activeNoteIdx, setActiveNoteIdx] = useState<number | null>(null);

  // Entire Song Section Filter (e.g. All bars vs A1 vs Bridge)
  const [sectionFilter, setSectionFilter] = useState<string>('all');

  const filteredSheets = TENOR_SHEET_MUSIC_CATALOG.filter(sheet => {
    const matchesStyle = filterStyle === 'all' || sheet.style.toLowerCase().includes(filterStyle.toLowerCase());
    const matchesSearch = sheet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sheet.composer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sheet.leadTenorLegend.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sheet.style.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStyle && matchesSearch;
  });

  const handleSelectSheet = (sheet: TenorSheetMusic) => {
    audioEngine.stopSequence();
    setIsPlayingAudio(false);
    setPlayingMaster(null);
    setActiveNoteIdx(null);
    setSelectedSheet(sheet);
    setSectionFilter('all');
  };

  const handleTogglePlayback = () => {
    if (!selectedSheet.audioPlaybackDemo || selectedSheet.audioPlaybackDemo.length === 0) return;

    if (isPlayingAudio) {
      audioEngine.stopSequence();
      setIsPlayingAudio(false);
      return;
    }

    setPlayingMaster(null);
    setIsPlayingAudio(true);
    const speedRatio = 1 / playbackSpeed;
    const adjustedNotes = selectedSheet.audioPlaybackDemo.map(n => ({
      ...n,
      durationMs: n.durationMs * speedRatio
    }));

    audioEngine.playNoteSequence(adjustedNotes, () => {
      setIsPlayingAudio(false);
    });
  };

  const handlePlayMasterSequence = (master: 'parker' | 'coltrane') => {
    const notes = master === 'parker' ? selectedSheet.parkerApproach.soundNotes : selectedSheet.coltraneApproach.soundNotes;
    if (!notes || notes.length === 0) return;

    if (playingMaster === master) {
      audioEngine.stopSequence();
      setPlayingMaster(null);
      setActiveNoteIdx(null);
      return;
    }

    audioEngine.stopSequence();
    setIsPlayingAudio(false);
    setPlayingMaster(master);

    const speedRatio = 1 / playbackSpeed;
    const adjustedNotes = notes.map(n => ({
      ...n,
      durationMs: n.durationMs * speedRatio
    }));

    // Step-by-step note lighting
    let accTime = 0;
    adjustedNotes.forEach((n, idx) => {
      window.setTimeout(() => {
        if (playingMaster !== null || idx === 0) {
          setActiveNoteIdx(idx);
        }
      }, accTime);
      accTime += n.durationMs;
    });

    audioEngine.playNoteSequence(adjustedNotes, () => {
      setPlayingMaster(null);
      setActiveNoteIdx(null);
    });
  };

  const handlePlaySingleNote = (freq: number) => {
    audioEngine.playNote(freq, 0.5, 'triangle');
  };

  // Helper to extract the chord symbol based on current transposition
  const getChordForTransposition = (chords: SheetMusicMeasure['chords']) => {
    switch (transposition) {
      case 'clarinet':
        return chords.clarinetChord;
      case 'concert':
        return chords.concertChord;
      case 'alto':
        return chords.altoChord;
      case 'tenor':
      default:
        return chords.tenorChord;
    }
  };

  const getKeyForTransposition = (sheet: TenorSheetMusic) => {
    switch (transposition) {
      case 'clarinet':
        return sheet.keyClarinet;
      case 'concert':
        return sheet.keyConcert;
      case 'alto':
        return sheet.keyAlto;
      case 'tenor':
      default:
        return sheet.keyTenor;
    }
  };

  // Extract unique sections from the selected sheet's measures
  const availableSections = Array.from(new Set(selectedSheet.measures.map(m => m.section || 'Part'))).filter(Boolean);

  const displayedMeasures = selectedSheet.measures.filter(m => {
    if (sectionFilter === 'all') return true;
    return m.section === sectionFilter;
  });

  return (
    <div className="space-y-10">
      
      {/* Module Title & Top Transposition Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#212433] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <span>Historical Tenor Repertoire</span>
            <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
            <span>Entire Song Lead Sheets & Greats Interactive Breakdown</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Complete Tenor Saxophone Sheet Music Vault
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Full-song lead sheets across entire standard forms (all 32 bars of AABA standards, 16 bars of Coltrane changes, and 12-bar blues). Includes dedicated interactive buttons and synthesizer pitch breakdowns from saxophone titans <strong>Charlie Parker</strong> and <strong>John Coltrane</strong> for every single standard.
          </p>
        </div>

        {/* Global 4-Way Transposition Switcher */}
        <div className="flex flex-col gap-1.5 self-start md:self-auto">
          <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400">Transposition:</span>
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#141624] rounded-xl border border-slate-200 dark:border-[#24293d] overflow-x-auto scrollbar-none">
            <button
              onClick={() => setTransposition('tenor')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                transposition === 'tenor'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Bb Tenor (Standard)
            </button>
            <button
              onClick={() => setTransposition('clarinet')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                transposition === 'clarinet'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Bb Clarinet (Doubling)
            </button>
            <button
              onClick={() => setTransposition('concert')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                transposition === 'concert'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Concert Pitch (Piano)
            </button>
            <button
              onClick={() => setTransposition('alto')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                transposition === 'alto'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Eb Alto
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-medium">
          {[
            { id: 'all', label: 'All 12 Standards' },
            { id: 'swing', label: 'Swing & Ellington' },
            { id: 'ballad', label: 'Ballads with Cadenza' },
            { id: 'bebop', label: 'Bebop Classics' },
            { id: 'modal', label: 'Coltrane Changes' },
            { id: 'bossa', label: 'Bossa Nova' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterStyle(tab.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                filterStyle === tab.id
                  ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 font-bold'
                  : 'bg-slate-100 dark:bg-[#151726] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#1e2233]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, composer, legend..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-[#141624] border border-slate-200 dark:border-[#252a3d] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Main 12-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 4 Columns: Scrollable Sheet Music Catalog */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 pb-1">
            <span>Repertoire Catalog ({filteredSheets.length})</span>
            <span>Entire Form</span>
          </div>

          {filteredSheets.map((sheet) => {
            const isSelected = selectedSheet.id === sheet.id;
            return (
              <div
                key={sheet.id}
                onClick={() => handleSelectSheet(sheet)}
                className={`p-4 rounded-xl text-left transition-all border cursor-pointer shadow-xs ${
                  isSelected
                    ? 'bg-amber-500/10 dark:bg-[#181a28] border-amber-500 ring-1 ring-amber-500/30'
                    : 'bg-white dark:bg-[#12141f] border-slate-200 dark:border-[#23273a] hover:border-slate-300 dark:hover:border-[#32364c]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-amber-700 dark:text-amber-400 font-semibold mb-1">
                  <span>{sheet.leadTenorLegend}</span>
                  <span className="text-slate-500 dark:text-slate-400">{sheet.year}</span>
                </div>
                
                <h4 className="text-base font-bold font-display text-slate-900 dark:text-white line-clamp-1">
                  {sheet.title}
                </h4>
                
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>{sheet.composer}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{sheet.tempoBpm} BPM</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{sheet.totalBars} Bars</span>
                </div>

                <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-slate-100 dark:border-[#1e2233] text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400 font-mono">
                    {sheet.style.split('/')[0]}
                  </span>
                  <span className={`font-mono font-bold ${
                    sheet.difficulty === 'Elite Conservatory' 
                      ? 'text-red-600 dark:text-red-400' 
                      : sheet.difficulty === 'Advanced' 
                      ? 'text-amber-600 dark:text-amber-400' 
                      : 'text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {sheet.difficulty}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 8 Columns: Interactive Sheet Music Score, Master Greats Panels & Audio Player */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedSheet.id}-${transposition}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-[#24293c] bg-white dark:bg-[#11131c] shadow-xs space-y-8"
            >
              
              {/* Score Header Lockup */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 dark:border-[#1e2233] pb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold">
                    <span>{selectedSheet.year}</span>
                    <span aria-hidden="true" className="text-slate-400">·</span>
                    <span>Composed by {selectedSheet.composer}</span>
                    <span aria-hidden="true" className="text-slate-400">·</span>
                    <span>Lineage: {selectedSheet.leadTenorLegend}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white mt-1">
                    {selectedSheet.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                    {selectedSheet.leadSheetDescription}
                  </p>
                </div>

                {/* Score Key & Tempo Badges */}
                <div className="flex sm:flex-col items-end gap-1.5 font-mono text-xs">
                  <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-bold whitespace-nowrap">
                    Key: {getKeyForTransposition(selectedSheet)}
                  </span>
                  <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-[#1b1e2c] border border-slate-200 dark:border-[#292f44] text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    {selectedSheet.tempoBpm} BPM · {selectedSheet.timeSignature}
                  </span>
                  <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-[#1b1e2c] border border-slate-200 dark:border-[#292f44] text-slate-500 dark:text-slate-400 text-[11px] whitespace-nowrap">
                    {selectedSheet.form} ({selectedSheet.totalBars} Total Bars)
                  </span>
                </div>
              </div>

              {/* Web Audio Melody Playback & External Audio Deck */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-[#232738] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleTogglePlayback}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase font-mono tracking-wider transition-all shadow-xs ${
                      isPlayingAudio
                        ? 'bg-red-600 hover:bg-red-500 text-white'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Stop Melody Demo</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Synthesize Melody Demo</span>
                      </>
                    )}
                  </button>

                  {/* Playback speed selector */}
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span>Speed:</span>
                    {([0.75, 1.0, 1.25] as const).map(speed => (
                      <button
                        key={speed}
                        onClick={() => setPlaybackSpeed(speed)}
                        className={`px-1.5 py-0.5 rounded ${
                          playbackSpeed === speed 
                            ? 'bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white font-bold' 
                            : 'hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>

                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedSheet.youtubeQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 hover:underline font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Listen to Original ({selectedSheet.leadTenorLegend})</span>
                </a>
              </div>

              {/* ======================================================== */}
              {/* SAX GREATS MASTER STUDY DESK: PARKER & COLTRANE BREAKDOWN */}
              {/* ======================================================== */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/5 via-slate-50 to-slate-100 dark:from-[#171a2a] dark:via-[#131522] dark:to-[#0f111a] border border-amber-500/20 shadow-xs space-y-6">
                
                {/* Header & Master View Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Saxophone Greats Master Study Desk</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white mt-0.5">
                      Parker & Coltrane Interactive Notes on {selectedSheet.title}
                    </h4>
                  </div>

                  {/* Switch between Bird, Trane, or Both */}
                  <div className="flex items-center gap-1 p-1 bg-white dark:bg-[#1b1e2f] rounded-xl border border-slate-200 dark:border-[#282d44] self-start sm:self-auto">
                    <button
                      onClick={() => setActiveMasterView('both')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                        activeMasterView === 'both'
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Compare Both
                    </button>
                    <button
                      onClick={() => setActiveMasterView('parker')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                        activeMasterView === 'parker'
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Charlie Parker Only
                    </button>
                    <button
                      onClick={() => setActiveMasterView('coltrane')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                        activeMasterView === 'coltrane'
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      John Coltrane Only
                    </button>
                  </div>
                </div>

                {/* Master Cards Grid */}
                <div className={`grid gap-6 ${activeMasterView === 'both' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                  
                  {/* CHARLIE PARKER CARD */}
                  {(activeMasterView === 'both' || activeMasterView === 'parker') && (
                    <div className="p-5 rounded-xl bg-white dark:bg-[#141624] border border-amber-500/30 shadow-xs space-y-4">
                      
                      {/* Master Head */}
                      <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-[#1e2233] pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-xs font-mono font-bold uppercase text-amber-700 dark:text-amber-400">
                              Charlie "Bird" Parker
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">1920–1955</span>
                          </div>
                          <h5 className="text-sm font-bold font-display text-slate-900 dark:text-white mt-1">
                            {selectedSheet.parkerApproach.title}
                          </h5>
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            Focus: {selectedSheet.parkerApproach.focusBars}
                          </span>
                        </div>

                        {/* Play Full Parker Sequence Button */}
                        <button
                          onClick={() => handlePlayMasterSequence('parker')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-xs ${
                            playingMaster === 'parker'
                              ? 'bg-red-600 hover:bg-red-500 text-white'
                              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95'
                          }`}
                        >
                          {playingMaster === 'parker' ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              <span>Stop Line</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-slate-950" />
                              <span>Play Bird Line</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Concept Explanation */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        {selectedSheet.parkerApproach.concept}
                      </p>

                      {/* INTERACTIVE NOTE BUTTONS: CLICK ANY NOTE TO HEAR IT */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-[#1e2233]">
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          <span className="font-semibold text-amber-700 dark:text-amber-400">
                            Interactive Note Triggers (Click each note to hear pitch):
                          </span>
                          <span className="text-[10px] text-slate-400">Web Audio Synth</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          {selectedSheet.parkerApproach.soundNotes.map((note, idx) => {
                            const isCurrentPlaying = playingMaster === 'parker' && activeNoteIdx === idx;
                            return (
                              <button
                                key={`parker-note-${idx}-${note.noteName}`}
                                onClick={() => handlePlaySingleNote(note.freq)}
                                className={`px-2.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all border shadow-xs ${
                                  isCurrentPlaying
                                    ? 'bg-amber-500 text-slate-950 border-amber-400 scale-110 ring-2 ring-amber-400'
                                    : 'bg-slate-100 dark:bg-[#1b1e2d] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-[#292f44] hover:bg-amber-500/20 hover:border-amber-500 active:scale-95'
                                }`}
                                title={`Click to play ${note.noteName} (${Math.round(note.freq)}Hz)`}
                              >
                                {note.noteName}
                              </button>
                            );
                          })}
                        </div>

                        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-1">
                          <strong>Scale Degrees: </strong>{selectedSheet.parkerApproach.scaleDegrees}
                        </div>
                      </div>

                      {/* Direct Pedagogy Note for Mason */}
                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-900 dark:text-amber-300 leading-snug">
                        <strong>Bird's Directive to Mason: </strong>{selectedSheet.parkerApproach.pedagogyNote}
                      </div>

                    </div>
                  )}

                  {/* JOHN COLTRANE CARD */}
                  {(activeMasterView === 'both' || activeMasterView === 'coltrane') && (
                    <div className="p-5 rounded-xl bg-white dark:bg-[#141624] border border-blue-500/30 dark:border-amber-500/30 shadow-xs space-y-4">
                      
                      {/* Master Head */}
                      <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-[#1e2233] pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-amber-400 animate-pulse" />
                            <span className="text-xs font-mono font-bold uppercase text-blue-700 dark:text-amber-400">
                              John Coltrane
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">1926–1967</span>
                          </div>
                          <h5 className="text-sm font-bold font-display text-slate-900 dark:text-white mt-1">
                            {selectedSheet.coltraneApproach.title}
                          </h5>
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            Focus: {selectedSheet.coltraneApproach.focusBars}
                          </span>
                        </div>

                        {/* Play Full Coltrane Sequence Button */}
                        <button
                          onClick={() => handlePlayMasterSequence('coltrane')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-xs ${
                            playingMaster === 'coltrane'
                              ? 'bg-red-600 hover:bg-red-500 text-white'
                              : 'bg-blue-600 hover:bg-blue-500 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 active:scale-95'
                          }`}
                        >
                          {playingMaster === 'coltrane' ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              <span>Stop Line</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Play Trane Line</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Concept Explanation */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        {selectedSheet.coltraneApproach.concept}
                      </p>

                      {/* INTERACTIVE NOTE BUTTONS: CLICK ANY NOTE TO HEAR IT */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-[#1e2233]">
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          <span className="font-semibold text-blue-700 dark:text-amber-400">
                            Interactive Note Triggers (Click each note to hear pitch):
                          </span>
                          <span className="text-[10px] text-slate-400">Web Audio Synth</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          {selectedSheet.coltraneApproach.soundNotes.map((note, idx) => {
                            const isCurrentPlaying = playingMaster === 'coltrane' && activeNoteIdx === idx;
                            return (
                              <button
                                key={`coltrane-note-${idx}-${note.noteName}`}
                                onClick={() => handlePlaySingleNote(note.freq)}
                                className={`px-2.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all border shadow-xs ${
                                  isCurrentPlaying
                                    ? 'bg-blue-600 dark:bg-amber-500 text-white dark:text-slate-950 border-blue-400 dark:border-amber-400 scale-110 ring-2 ring-blue-400 dark:ring-amber-400'
                                    : 'bg-slate-100 dark:bg-[#1b1e2d] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-[#292f44] hover:bg-blue-500/20 dark:hover:bg-amber-500/20 hover:border-blue-500 dark:hover:border-amber-500 active:scale-95'
                                }`}
                                title={`Click to play ${note.noteName} (${Math.round(note.freq)}Hz)`}
                              >
                                {note.noteName}
                              </button>
                            );
                          })}
                        </div>

                        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-1">
                          <strong>Scale Degrees: </strong>{selectedSheet.coltraneApproach.scaleDegrees}
                        </div>
                      </div>

                      {/* Direct Pedagogy Note for Mason */}
                      <div className="p-3 rounded-lg bg-blue-500/10 dark:bg-amber-500/10 border border-blue-500/20 dark:border-amber-500/20 text-[11px] text-blue-950 dark:text-amber-300 leading-snug">
                        <strong>Trane's Directive to Mason: </strong>{selectedSheet.coltraneApproach.pedagogyNote}
                      </div>

                    </div>
                  )}

                </div>

              </div>

              {/* ======================================================== */}
              {/* ENTIRE SONG LEAD SHEET NOTATION & SECTION FILTER */}
              {/* ======================================================== */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-[#202434] pb-3">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-amber-500" />
                      <span>Entire Song Form: All {selectedSheet.totalBars} Measures</span>
                      <span className="text-slate-400 dark:text-slate-500">· Selected: {transposition.toUpperCase()}</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Complete measure-by-measure chords across all four transpositions with Parker & Coltrane tactical bar notes.
                    </p>
                  </div>

                  {/* Section View Selector (e.g. All bars vs A1 vs Bridge) */}
                  <div className="flex items-center gap-1 overflow-x-auto scrollbar-none self-start sm:self-auto text-xs font-mono">
                    <button
                      onClick={() => setSectionFilter('all')}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        sectionFilter === 'all'
                          ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 font-bold'
                          : 'bg-slate-100 dark:bg-[#161826] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      All Bars ({selectedSheet.totalBars})
                    </button>
                    {availableSections.map(sec => (
                      <button
                        key={sec}
                        onClick={() => setSectionFilter(sec)}
                        className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                          sectionFilter === sec
                            ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 font-bold'
                            : 'bg-slate-100 dark:bg-[#161826] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        Section {sec}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Measure Grid Layout for the Entire Song */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
                  {displayedMeasures.map((m) => {
                    const activeChord = getChordForTransposition(m.chords);
                    return (
                      <div
                        key={m.measureNumber}
                        className="p-3.5 rounded-xl border border-slate-200 dark:border-[#24293c] bg-slate-50/60 dark:bg-[#141624] space-y-2 flex flex-col justify-between hover:border-amber-500/40 transition-colors shadow-2xs"
                      >
                        <div>
                          {/* Measure Number & Section Tag */}
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-200 dark:border-[#202434] pb-1.5 mb-1.5">
                            <span className="font-bold text-amber-700 dark:text-amber-400">m.{m.measureNumber}</span>
                            {m.section && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 dark:bg-[#1f2334] text-slate-700 dark:text-slate-300 font-semibold">
                                {m.section}
                              </span>
                            )}
                          </div>

                          {/* Chord Symbol */}
                          <div className="text-base font-extrabold font-mono text-slate-900 dark:text-amber-300 tracking-tight">
                            {activeChord}
                          </div>

                          {/* Notes */}
                          <div className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-200 mt-1">
                            {m.melodyNotes}
                          </div>

                          {/* Scale Degrees / Solfege */}
                          <div className="text-[11px] font-mono text-amber-700 dark:text-amber-400/90 mt-0.5">
                            Deg: {m.solfegeOrDegrees}
                          </div>
                        </div>

                        {/* Parker & Coltrane Specific Bar Tips */}
                        <div className="pt-2 border-t border-slate-200 dark:border-[#1d202d] space-y-1 text-[11px] leading-snug">
                          {m.parkerTip && (
                            <div className="text-amber-800 dark:text-amber-300 flex items-start gap-1 font-mono">
                              <span className="font-bold text-[10px] px-1 py-0.2 rounded bg-amber-500/15 text-amber-900 dark:text-amber-300">Bird:</span>
                              <span className="text-[10px]">{m.parkerTip}</span>
                            </div>
                          )}
                          {m.coltraneTip && (
                            <div className="text-blue-800 dark:text-blue-300 flex items-start gap-1 font-mono">
                              <span className="font-bold text-[10px] px-1 py-0.2 rounded bg-blue-500/15 text-blue-900 dark:text-blue-300">Trane:</span>
                              <span className="text-[10px]">{m.coltraneTip}</span>
                            </div>
                          )}
                          <div className="text-slate-500 dark:text-slate-400 text-[10px] pt-0.5 italic">
                            {m.transcriptionSnippet}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Historical Context & Audition Intel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                
                {/* Historical Context Card */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#141624] border border-slate-200 dark:border-[#222638] space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white font-display">
                    <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                    <span>Historical Masterwork Lineage</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {selectedSheet.historicalContext}
                  </p>
                </div>

                {/* Audition Intel Card */}
                <div className="p-4 rounded-xl bg-amber-500/5 dark:bg-[#171a2b] border border-amber-500/20 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-400 font-display">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Audition & Rehearsal Intelligence</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {selectedSheet.auditionTips}
                  </p>
                  {selectedSheet.cadenzaGuide && (
                    <div className="pt-1 text-[11px] font-mono text-amber-700 dark:text-amber-300 border-t border-amber-500/20">
                      <strong>Cadenza Note: </strong>{selectedSheet.cadenzaGuide}
                    </div>
                  )}
                </div>

              </div>

              {/* Action CTAs: Record Take & Practice with Metronome */}
              {onSelectTab && (
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200 dark:border-[#1f2231]">
                  <button
                    onClick={() => onSelectTab('vault')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-xs active:scale-95"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Record Take of {selectedSheet.title}</span>
                  </button>
                  <button
                    onClick={() => onSelectTab('practice')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#181b29] hover:bg-slate-200 dark:hover:bg-[#202538] text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors border border-slate-300 dark:border-[#2c3248]"
                  >
                    <Layers className="w-4 h-4 text-amber-500" />
                    <span>Practice with Swing Metronome ({selectedSheet.tempoBpm} BPM)</span>
                  </button>
                  <button
                    onClick={() => onSelectTab('transcendence')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#181b29] hover:bg-slate-200 dark:hover:bg-[#202538] text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors border border-slate-300 dark:border-[#2c3248]"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Consult Parker & Coltrane in Transcendence Lab</span>
                  </button>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
