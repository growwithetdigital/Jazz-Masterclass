import React from 'react';
import { Music, Radio, GraduationCap, Users, BookOpen, Mic } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface TopNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onQuickRecord: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onSelectTab,
  onQuickRecord,
  isDark,
  onToggleTheme
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#0d0e14]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#222533] transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 py-3.5">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('overview')}
          className="text-left group flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 dark:text-white font-display whitespace-nowrap shrink-0 transition-opacity hover:opacity-90"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-xs">
            <Music className="w-4 h-4 stroke-[2.5]" />
          </span>
          <span className="tracking-wide">Mason Jazz Masterclass</span>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
          <button
            onClick={() => onSelectTab('colleges')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'colleges' ? 'text-amber-600 dark:text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Colleges to Consider
          </button>
          <button
            onClick={() => onSelectTab('titans')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'titans' ? 'text-amber-600 dark:text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Top 10 Tenor Greats
          </button>
          <button
            onClick={() => onSelectTab('lessons')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'lessons' ? 'text-amber-600 dark:text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Lessons & Homework
          </button>
          <button
            onClick={() => onSelectTab('vault')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'vault' ? 'text-amber-600 dark:text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Audio Vault
          </button>
          <button
            onClick={() => onSelectTab('ellington')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'ellington' ? 'text-amber-600 dark:text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Ellington Workshop
          </button>
          <button
            onClick={() => onSelectTab('transcendence')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'transcendence' ? 'text-amber-600 dark:text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Parker & Coltrane
          </button>
          <button
            onClick={() => onSelectTab('practice')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'practice' ? 'text-amber-600 dark:text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Practice Studio
          </button>
        </nav>

        {/* Zone 3: Theme Toggle + 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

          <button
            onClick={onQuickRecord}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors whitespace-nowrap shadow-xs active:scale-95"
          >
            <Mic className="w-3.5 h-3.5 text-slate-950" />
            <span>Record Take</span>
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Sub-Navigation Bar */}
      <div className="xl:hidden flex items-center overflow-x-auto gap-4 px-6 py-2.5 border-t border-slate-200 dark:border-[#1d202d] text-xs font-medium text-slate-600 dark:text-slate-400 scrollbar-none">
        <button
          onClick={() => onSelectTab('overview')}
          className={`whitespace-nowrap ${activeTab === 'overview' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}
        >
          Overview
        </button>
        <button
          onClick={() => onSelectTab('colleges')}
          className={`whitespace-nowrap ${activeTab === 'colleges' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}
        >
          Colleges
        </button>
        <button
          onClick={() => onSelectTab('titans')}
          className={`whitespace-nowrap ${activeTab === 'titans' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}
        >
          Top 10 Greats
        </button>
        <button
          onClick={() => onSelectTab('lessons')}
          className={`whitespace-nowrap ${activeTab === 'lessons' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}
        >
          Lessons & Reading
        </button>
        <button
          onClick={() => onSelectTab('vault')}
          className={`whitespace-nowrap ${activeTab === 'vault' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}
        >
          Audio Vault
        </button>
        <button
          onClick={() => onSelectTab('ellington')}
          className={`whitespace-nowrap ${activeTab === 'ellington' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}
        >
          Ellington
        </button>
        <button
          onClick={() => onSelectTab('transcendence')}
          className={`whitespace-nowrap ${activeTab === 'transcendence' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}
        >
          Parker & Coltrane
        </button>
        <button
          onClick={() => onSelectTab('practice')}
          className={`whitespace-nowrap ${activeTab === 'practice' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}
        >
          Practice
        </button>
      </div>
    </header>
  );
};
