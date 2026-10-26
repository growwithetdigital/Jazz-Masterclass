import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { HeroBanner } from './components/HeroBanner';
import { CollegesGuideModule } from './components/CollegesGuideModule';
import { TenorTitansModule } from './components/TenorTitansModule';
import { LessonsHomeworkModule } from './components/LessonsHomeworkModule';
import { AudioVaultModule } from './components/AudioVaultModule';
import { EllingtonAuditionModule } from './components/EllingtonAuditionModule';
import { TranscendenceLabModule } from './components/TranscendenceLabModule';
import { PracticeRoutineModule } from './components/PracticeRoutineModule';
import { 
  Music, Award, Compass, BookOpen, Layers, ArrowRight, 
  GraduationCap, Users, Mic, Sparkles, ChevronLeft
} from 'lucide-react';

interface EngineCard {
  id: string;
  category: 'rehearsal' | 'vocabulary' | 'admissions';
  tag: string;
  title: string;
  description: string;
  ctaText: string;
  icon: React.ElementType;
}

const CONSERVATORY_ENGINES: EngineCard[] = [
  {
    id: 'practice',
    category: 'rehearsal',
    tag: 'Daily Studio & Calendar',
    title: 'Practice Studio & 6-Pillar Calendar',
    description: 'Weekly hour logging across 6 pillars with interactive bar chart, 2-and-4 swing metronome, overtone drone, and clarinet doubling reset.',
    ctaText: 'Enter Practice Studio',
    icon: Layers
  },
  {
    id: 'vault',
    category: 'rehearsal',
    tag: 'Adjudication Vault',
    title: 'Performance Vault & 100-Point Scorecard',
    description: 'Record audio or video takes with live VU meters and receive official 4-part feedback on Tone, Time, Vocabulary, and Stage Presence.',
    ctaText: 'Open Performance Vault',
    icon: Award
  },
  {
    id: 'colleges',
    category: 'admissions',
    tag: 'Audition Realities',
    title: 'Top 25 Colleges to Consider & Career Intel',
    description: 'Direct .edu & music department links, Reddit applicant audition room reports, tempo traps, and graduate career earnings data.',
    ctaText: 'Explore 25 Colleges',
    icon: GraduationCap
  },
  {
    id: 'titans',
    category: 'vocabulary',
    tag: 'The 10 Masters',
    title: 'Top 10 Tenor Titans & Note Sound Demos',
    description: 'Hawkins, Young, Webster, Gordon, Rollins, Coltrane, Getz, Shorter, Henderson, and Brecker with tone philosophies and sound synthesis.',
    ctaText: 'Study Tenor Masters',
    icon: Users
  },
  {
    id: 'ellington',
    category: 'rehearsal',
    tag: 'Essentially Ellington',
    title: 'Ellington Workshop & Cadenza Architect',
    description: 'Cottontail, Prelude to a Kiss, and Warm Valley solo analyses with unaccompanied ballad cadenza roadmap and prescreening targets.',
    ctaText: 'Master Big Band Solos',
    icon: Compass
  },
  {
    id: 'transcendence',
    category: 'vocabulary',
    tag: 'Harmonic Mechanics',
    title: 'Parker & Coltrane Transcendence Lab',
    description: 'Charlie Parker chromatic enclosures and 3-to-9 resolutions alongside Coltrane 3-key cycles and Michael Brecker overtone voicing.',
    ctaText: 'Open Harmony Lab',
    icon: Sparkles
  },
  {
    id: 'lessons',
    category: 'vocabulary',
    tag: 'Verified History',
    title: 'Historical Lessons & Practice Assignments',
    description: 'Fact-checked essays under 500 words grounded in Smithsonian Jazz, Gunther Schuller, and conservatory archives with step-by-step homework.',
    ctaText: 'Read Lessons & Homework',
    icon: BookOpen
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [engineFilter, setEngineFilter] = useState<'all' | 'rehearsal' | 'vocabulary' | 'admissions'>('all');
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('mason_theme') === 'dark';
    } catch {
      return false; // Light mode by default as requested
    }
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('mason_theme', 'dark');
      } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('mason_theme', 'light');
      } catch {}
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickRecord = () => {
    handleSelectTab('vault');
  };

  const filteredEngines = CONSERVATORY_ENGINES.filter(engine => {
    if (engineFilter === 'all') return true;
    return engine.category === engineFilter;
  });

  return (
    <div className="min-h-screen bg-[#fcfbfa] dark:bg-[#0b0c10] text-[#1c1b18] dark:text-[#f1f3f8] flex flex-col selection:bg-amber-500/20 selection:text-amber-900 dark:selection:bg-amber-500/30 dark:selection:text-amber-200 transition-colors duration-200">
      
      {/* 3-Zone Top Navigation Contract */}
      <TopNav
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onQuickRecord={handleQuickRecord}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-12">
        
        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-16 pb-16">
            {/* Conservatory Hero Banner with 4 High-Impact CTAs */}
            <HeroBanner onSelectTab={handleSelectTab} />

            {/* Conservatory Command Deck Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
              
              {/* Section Header with Category Filter Buttons */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#212433] pb-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    <span>Masterclass Curriculum</span>
                    <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                    <span>Agoura High Studio Jazz I Honors</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
                    Conservatory Command Deck
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                    Access all 7 specialized rehearsal engines, historical archives, and collegiate recruitment guides engineered for Mason.
                  </p>
                </div>

                {/* Segmented Module Filter Controls */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#141624] rounded-xl border border-slate-200 dark:border-[#24293d] self-start md:self-auto overflow-x-auto scrollbar-none max-w-full">
                  <button
                    onClick={() => setEngineFilter('all')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                      engineFilter === 'all'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    All Modules ({CONSERVATORY_ENGINES.length})
                  </button>
                  <button
                    onClick={() => setEngineFilter('rehearsal')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                      engineFilter === 'rehearsal'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Studio & Rehearsal
                  </button>
                  <button
                    onClick={() => setEngineFilter('vocabulary')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                      engineFilter === 'vocabulary'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Vocabulary & Tone
                  </button>
                  <button
                    onClick={() => setEngineFilter('admissions')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                      engineFilter === 'admissions'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Colleges & Legacy
                  </button>
                </div>
              </div>

              {/* Engine Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEngines.map((engine) => {
                  const Icon = engine.icon;
                  return (
                    <div
                      key={engine.id}
                      onClick={() => handleSelectTab(engine.id)}
                      className="p-6 rounded-2xl border border-slate-200 dark:border-[#23273a] bg-white dark:bg-[#12141f] hover:border-amber-500 dark:hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md"
                    >
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-700 dark:text-amber-400 group-hover:scale-105 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 uppercase tracking-wider block font-semibold">
                          {engine.tag}
                        </span>
                        <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors leading-snug">
                          {engine.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                          {engine.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 pt-2 border-t border-slate-100 dark:border-[#1d202e] group-hover:translate-x-1 transition-transform">
                        <span>{engine.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
              </div>

            </section>

            {/* Spotlight on Top 10 Tenor Titans */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
              <TenorTitansModule onSelectTab={handleSelectTab} />
            </section>
          </div>
        )}

        {/* SUB-MODULE VIEW WITH BREADCRUMB HEADER */}
        {activeTab !== 'overview' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
            
            {/* Breadcrumb & Quick Return Strip */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-[#1f2231] text-xs">
              <button
                onClick={() => handleSelectTab('overview')}
                className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-amber-700 dark:hover:text-amber-300 font-semibold transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Return to Conservatory Hub</span>
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-slate-400 dark:text-slate-500 font-mono hidden sm:inline">
                  Agoura High Honors
                </span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700 hidden sm:inline">·</span>
                <button
                  onClick={handleQuickRecord}
                  className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 hover:underline font-bold font-mono"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Quick Record</span>
                </button>
              </div>
            </div>

            {/* Active Sub-Module Components with cross-linking */}
            {activeTab === 'colleges' && (
              <CollegesGuideModule onSelectTab={handleSelectTab} />
            )}

            {activeTab === 'titans' && (
              <TenorTitansModule onSelectTab={handleSelectTab} />
            )}

            {activeTab === 'lessons' && (
              <LessonsHomeworkModule onSelectTab={handleSelectTab} />
            )}

            {activeTab === 'vault' && (
              <AudioVaultModule onSelectTab={handleSelectTab} />
            )}

            {activeTab === 'ellington' && (
              <EllingtonAuditionModule onSelectTab={handleSelectTab} />
            )}

            {activeTab === 'transcendence' && (
              <TranscendenceLabModule onSelectTab={handleSelectTab} />
            )}

            {activeTab === 'practice' && (
              <PracticeRoutineModule onSelectTab={handleSelectTab} />
            )}

          </div>
        )}

      </main>

      {/* Editorial Conservatory Footer */}
      <footer className="border-t border-slate-200 dark:border-[#1f2231] bg-slate-100 dark:bg-[#090a0e] text-slate-600 dark:text-slate-400 text-xs py-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-amber-500" />
            <span className="font-bold font-display text-slate-900 dark:text-white">Mason Jazz Masterclass</span>
            <span aria-hidden="true">·</span>
            <span>Agoura High School Studio Jazz I</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-500 dark:text-slate-400">
            <span>Essentially Ellington Preparation</span>
            <span aria-hidden="true">·</span>
            <span>Lincoln Center Adjudication Standards</span>
            <span aria-hidden="true">·</span>
            <span>Juilliard · MSM · USC · UNT · Berklee</span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Quick-Action Dock (Under 15% Mobile Viewport Cap) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0d0e14]/95 backdrop-blur-md border-t border-slate-200 dark:border-[#222533] px-4 py-2 flex items-center justify-around text-[10px] font-medium text-slate-600 dark:text-slate-400 shadow-lg">
        <button
          onClick={() => handleSelectTab('overview')}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === 'overview' ? 'text-amber-600 dark:text-amber-400 font-bold' : ''
          }`}
        >
          <Music className="w-4 h-4" />
          <span>Hub</span>
        </button>
        <button
          onClick={() => handleSelectTab('practice')}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === 'practice' ? 'text-amber-600 dark:text-amber-400 font-bold' : ''
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Practice</span>
        </button>
        <button
          onClick={() => handleSelectTab('vault')}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === 'vault' ? 'text-amber-600 dark:text-amber-400 font-bold' : ''
          }`}
        >
          <Mic className="w-4 h-4 text-amber-500" />
          <span>Vault</span>
        </button>
        <button
          onClick={() => handleSelectTab('colleges')}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === 'colleges' ? 'text-amber-600 dark:text-amber-400 font-bold' : ''
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Colleges</span>
        </button>
        <button
          onClick={() => handleSelectTab('titans')}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === 'titans' ? 'text-amber-600 dark:text-amber-400 font-bold' : ''
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Titans</span>
        </button>
      </div>

    </div>
  );
}
