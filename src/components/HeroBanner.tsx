import React from 'react';
import { Award, Compass, Play, BookOpen, GraduationCap, Users } from 'lucide-react';

interface HeroBannerProps {
  onSelectTab: (tab: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectTab }) => {
  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-[#0c0d13] border-b border-slate-200 dark:border-[#212433] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Direct Address to Mason & Mission */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 tracking-wider uppercase">
              <span>Agoura High Studio Jazz I</span>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
              <span>Wind Honors Studio</span>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
              <span>Tenor Saxophone & Clarinet</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Welcome to the Studio, Mason.
            </h1>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-2xl">
              Engineered specifically for your journey toward the <strong className="text-amber-800 dark:text-amber-300 font-semibold">Essentially Ellington Competition</strong>, the legendary Agoura High big band legacy, and national scholarship recruitment at Juilliard, MSM, USC Thornton, and UNT.
            </p>

            {/* Bob Hackett Quote Block */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#141622] border border-slate-200 dark:border-[#262a3d] text-slate-700 dark:text-slate-300 text-sm shadow-xs">
              <p className="italic text-amber-900 dark:text-amber-200/90 font-serif text-base leading-relaxed">
                &ldquo;Mason has a chance to be one of the Agoura High greats.&rdquo;
              </p>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-sans">
                <span>— Bob Hackett, Director of Bands</span>
                <span className="font-mono text-amber-700 dark:text-amber-400">Agoura Studio Jazz I</span>
              </div>
            </div>

            {/* Action Launches */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectTab('colleges')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-xs active:scale-95"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Colleges to Consider</span>
              </button>

              <button
                onClick={() => onSelectTab('titans')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white dark:bg-[#1b1e2c] hover:bg-slate-100 dark:hover:bg-[#25293d] border border-slate-300 dark:border-[#30364d] text-slate-900 dark:text-white font-semibold text-sm transition-colors shadow-xs"
              >
                <Users className="w-4 h-4 text-amber-500" />
                <span>Top 10 Tenor Greats</span>
              </button>

              <button
                onClick={() => onSelectTab('lessons')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white dark:bg-[#141622] hover:bg-slate-100 dark:hover:bg-[#1f2233] border border-slate-300 dark:border-[#292e42] text-slate-700 dark:text-slate-300 font-semibold text-sm transition-colors shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Lessons & Reading</span>
              </button>
            </div>

            {/* Metric Strip */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-200 dark:border-[#1d202e] text-slate-600 dark:text-slate-400 text-xs">
              <div>
                <span className="block text-xl font-bold font-mono text-slate-900 dark:text-white">10+2</span>
                <span className="mt-0.5 block">Top Tenor Masters</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-mono text-amber-600 dark:text-amber-400">100 Pts</span>
                <span className="mt-0.5 block">Lincoln Center Rubric</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-mono text-slate-900 dark:text-white">Top 6</span>
                <span className="mt-0.5 block">Audition Prescreenings</span>
              </div>
            </div>

          </div>

          {/* Right Column: Tenor Saxophone Visual Studio Asset */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-[#2a2f44] shadow-xl bg-slate-900 aspect-video sm:aspect-[4/3] lg:aspect-[16/11]">
              <img
                src="/src/assets/images/hero_tenor_masterclass_1792946308614.jpg"
                alt="Vintage gold lacquer tenor saxophone resting in dark velvet case"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60 pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white bg-slate-950/80 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
                <span className="flex items-center gap-1.5 font-medium">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Agoura Studio Jazz I Spec
                </span>
                <span className="text-slate-400 font-mono">Tenor & Clarinet</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
