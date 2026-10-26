import React from 'react';
import { Award, Compass, Play, BookOpen, GraduationCap, Users, Mic, Flame } from 'lucide-react';
import { JAZZ_IMAGES } from '../assets/imageAssets';

interface HeroBannerProps {
  onSelectTab: (tab: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectTab }) => {
  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-[#0c0d13] border-b border-slate-200 dark:border-[#202332] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Direct Address to Mason & Mission */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean Typographic Kicker (Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 tracking-wider uppercase">
              <span>Agoura High Studio Jazz I</span>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
              <span>Wind Honors Studio</span>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
              <span>Tenor Saxophone & Clarinet Doubling</span>
            </div>

            {/* Display Headline */}
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Welcome to the Studio, Mason.
            </h1>

            {/* Context & Conservatory Standard */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-2xl">
              Engineered specifically for your peak preparation toward the <strong className="text-amber-800 dark:text-amber-300 font-semibold">Essentially Ellington Competition</strong> at Lincoln Center, solo leadership in Agoura High's big band, and recruitment at Juilliard, MSM, USC Thornton, and UNT.
            </p>

            {/* Bob Hackett Quote Card */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#131522] border border-slate-200 dark:border-[#24283c] text-slate-700 dark:text-slate-300 text-sm shadow-xs">
              <p className="italic text-amber-900 dark:text-amber-200/90 font-serif text-base sm:text-lg leading-relaxed">
                &ldquo;Mason has a chance to be one of the Agoura High greats.&rdquo;
              </p>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-sans">
                <span>— Bob Hackett, Director of Bands</span>
                <span className="font-mono text-amber-700 dark:text-amber-400">Agoura Studio Jazz I Honors</span>
              </div>
            </div>

            {/* High-Impact Conservatory CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              
              {/* Primary Action CTA */}
              <button
                onClick={() => onSelectTab('practice')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-sm active:scale-95"
              >
                <Flame className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>Start Practice Routine & Calendar</span>
              </button>

              {/* Secondary Action CTA */}
              <button
                onClick={() => onSelectTab('vault')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-[#1a1c2b] hover:bg-slate-100 dark:hover:bg-[#23273c] border border-slate-300 dark:border-[#31374f] text-slate-900 dark:text-white font-semibold text-sm transition-all shadow-xs active:scale-95"
              >
                <Mic className="w-4 h-4 text-amber-500" />
                <span>Record Audition Take (100 Pts)</span>
              </button>

              {/* Tertiary Action CTA */}
              <button
                onClick={() => onSelectTab('colleges')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#171926] text-xs font-semibold transition-colors"
              >
                <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Explore Top 25 Colleges</span>
              </button>

              {/* Quaternary Action CTA */}
              <button
                onClick={() => onSelectTab('titans')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#171926] text-xs font-semibold transition-colors"
              >
                <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>The 10 Tenor Titans</span>
              </button>
            </div>

            {/* Quantitative Precision Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-[#1d202e] text-slate-600 dark:text-slate-400 text-xs">
              <div>
                <span className="block text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">10+2</span>
                <span className="mt-0.5 block">Tenor Titans & Sounds</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums">100 Pts</span>
                <span className="mt-0.5 block">Lincoln Center Rubric</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">Top 25</span>
                <span className="mt-0.5 block">College Audition Guides</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">6 Pillars</span>
                <span className="mt-0.5 block">Practice Log & Calendar</span>
              </div>
            </div>

          </div>

          {/* Right Column: Tenor Saxophone Visual Studio Asset */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-[#2a2f44] shadow-xl bg-slate-900 aspect-video sm:aspect-[4/3] lg:aspect-[16/11] relative group">
              <img
                src={JAZZ_IMAGES.heroTenor}
                alt="Vintage gold lacquer tenor saxophone resting in dark velvet case"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60 pointer-events-none" />
              
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 shadow-sm">
                <span className="flex items-center gap-1.5 font-medium">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Agoura Studio Jazz I Benchmark</span>
                </span>
                <span className="text-slate-400 font-mono text-[11px]">Bb Tenor & Clarinet</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
