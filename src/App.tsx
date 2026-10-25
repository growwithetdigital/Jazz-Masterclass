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
import { Music, Award, Compass, BookOpen, Layers, ArrowRight, GraduationCap, Users, Bookmark, Mic, CloudUpload } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
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

  const handleQuickRecord = () => {
    setActiveTab('vault');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fcfbfa] dark:bg-[#0b0c10] text-[#1c1b18] dark:text-[#f1f3f8] flex flex-col selection:bg-amber-500/20 selection:text-amber-900 dark:selection:bg-amber-500/30 dark:selection:text-amber-200 transition-colors duration-200">
      
      {/* 3-Zone Top Navigation Contract with Light Mode Default */}
      <TopNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onQuickRecord={handleQuickRecord}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-16 pb-20">
            {/* Conservatory Hero Banner */}
            <HeroBanner onSelectTab={setActiveTab} />

            {/* Core Modules Grid Overview */}
            <section className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#212433] pb-4 mb-8">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Conservatory Hub
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
                    Masterclass Engines & Audition Preparation
                  </h2>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Agoura High School Studio Jazz I Honors Spec
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Pillar 1: Colleges to Consider */}
                <div
                  onClick={() => setActiveTab('colleges')}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-[#23273a] bg-white dark:bg-[#12141f] hover:border-amber-500 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider block">Audition Intel</span>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                      Colleges to Consider & Audition Reality
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Deep profiles on Juilliard, MSM, USC Thornton, UNT, Berklee, and Jacobs with Reddit applicant intel on the live audition room, tempo traps, and sight-reading surprises.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore College Auditions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Pillar 2: Top 10 Tenor Greats */}
                <div
                  onClick={() => setActiveTab('titans')}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-[#23273a] bg-white dark:bg-[#12141f] hover:border-amber-500 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider block">The 10 Masters</span>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                      Top 10 Tenor Greats & YouTube Archives
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Hawkins, Young, Webster, Gordon, Rollins, Coltrane, Getz, Shorter, Henderson, and Brecker with sound philosophies, quotes, and direct YouTube masterwork links.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                    <span>Meet the Greats</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Pillar 3: Lessons & Homework */}
                <div
                  onClick={() => setActiveTab('lessons')}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-[#23273a] bg-white dark:bg-[#12141f] hover:border-amber-500 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                      <Bookmark className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider block">Factual Reading</span>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                      Historical Lessons & Homework
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Inspiring articles under 500 words with 100% verified citations (Smithsonian Jazz, Gunther Schuller, Lewis Porter) paired with structured practice homework.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                    <span>Read Lessons & Homework</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Pillar 4: Audio Vault & 4-Part Adjudication */}
                <div
                  onClick={() => setActiveTab('vault')}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-[#23273a] bg-white dark:bg-[#12141f] hover:border-amber-500 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider block">Performance Vault</span>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                      Recording Vault & 4-Part Adjudication
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Record or upload takes, save your practice history, and receive official 100-point feedback on Tone, Time, Harmonic Language, and Stage Presence.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                    <span>Open Performance Vault</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Pillar 5: Ellington Repertoire */}
                <div
                  onClick={() => setActiveTab('ellington')}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-[#23273a] bg-white dark:bg-[#12141f] hover:border-amber-500 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                      <Compass className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider block">Essentially Ellington</span>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                      Ellington Workshop & Cadenza Architect
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Cottontail, Prelude to a Kiss, Warm Valley, and Newport '56 Diminuendo with unaccompanied ballad cadenza roadmaps.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                    <span>Study Ellington Repertoire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Pillar 6: Practice Studio */}
                <div
                  onClick={() => setActiveTab('practice')}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-[#23273a] bg-white dark:bg-[#12141f] hover:border-amber-500 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                      <Layers className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Daily Studio</span>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                      Swing Metronome, Drone & Clarinet Codex
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      30/60/90-minute itineraries with built-in Web Audio 2-and-4 Swing Click, Acoustic Overtone Tuning Drone, and Clarinet Doubling Reset.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span>Enter Practice Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            </section>

            {/* Quick Spotlight on Top 10 Tenor Titans */}
            <section className="max-w-7xl mx-auto px-6">
              <TenorTitansModule />
            </section>
          </div>
        )}

        {/* TAB: COLLEGES TO CONSIDER */}
        {activeTab === 'colleges' && (
          <div className="max-w-7xl mx-auto px-6 py-10">
            <CollegesGuideModule />
          </div>
        )}

        {/* TAB: TENOR TITANS */}
        {activeTab === 'titans' && (
          <div className="max-w-7xl mx-auto px-6 py-10">
            <TenorTitansModule />
          </div>
        )}

        {/* TAB: LESSONS & HOMEWORK */}
        {activeTab === 'lessons' && (
          <div className="max-w-7xl mx-auto px-6 py-10">
            <LessonsHomeworkModule />
          </div>
        )}

        {/* TAB: AUDIO VAULT */}
        {activeTab === 'vault' && (
          <div className="max-w-7xl mx-auto px-6 py-10">
            <AudioVaultModule />
          </div>
        )}

        {/* TAB: ELLINGTON WORKSHOP */}
        {activeTab === 'ellington' && (
          <div className="max-w-7xl mx-auto px-6 py-10">
            <EllingtonAuditionModule />
          </div>
        )}

        {/* TAB: TRANSCENDENCE LAB */}
        {activeTab === 'transcendence' && (
          <div className="max-w-7xl mx-auto px-6 py-10">
            <TranscendenceLabModule />
          </div>
        )}

        {/* TAB: PRACTICE STUDIO */}
        {activeTab === 'practice' && (
          <div className="max-w-7xl mx-auto px-6 py-10">
            <PracticeRoutineModule />
          </div>
        )}

      </main>

      {/* Editorial Conservatory Footer */}
      <footer className="border-t border-slate-200 dark:border-[#1f2231] bg-slate-100 dark:bg-[#090a0e] text-slate-600 dark:text-slate-400 text-xs py-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-amber-500" />
            <span className="font-bold font-display text-slate-900 dark:text-white">Mason Jazz Masterclass</span>
            <span aria-hidden="true">·</span>
            <span>Agoura High School Studio Jazz I</span>
          </div>

          <div className="flex items-center gap-6 text-slate-500 dark:text-slate-400">
            <span>Essentially Ellington Preparation</span>
            <span aria-hidden="true">·</span>
            <span>Juilliard · MSM · USC Thornton · UNT · Berklee · Jacobs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
