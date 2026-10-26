import React, { useState } from 'react';
import { 
  Music, GraduationCap, Users, BookOpen, Mic, 
  Layers, Compass, Sparkles, Menu, X, ArrowRight, Award, FileText
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface TopNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onQuickRecord: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Conservatory Hub', shortLabel: 'Hub', icon: Music, description: 'Overview, core engines & audition roadmap' },
  { id: 'practice', label: 'Practice Studio', shortLabel: 'Practice', icon: Layers, description: 'Weekly calendar, swing metronome & tuning drone' },
  { id: 'vault', label: 'Performance Vault', shortLabel: 'Vault', icon: Mic, description: 'Audio/video recorder & 100-pt Lincoln Center adjudication' },
  { id: 'sheets', label: 'Sheet Music Vault', shortLabel: 'Sheets', icon: FileText, description: '12 classic lead sheets & master solo transcriptions' },
  { id: 'colleges', label: 'Top 25 Colleges', shortLabel: 'Colleges', icon: GraduationCap, description: 'Audition reality, Reddit intel & Agoura alumni' },
  { id: 'titans', label: '10 Tenor Titans', shortLabel: 'Titans', icon: Users, description: 'Sound philosophies, note synthesis & YouTube archives' },
  { id: 'transcendence', label: 'Parker & Coltrane', shortLabel: 'Harmony', icon: Sparkles, description: 'Bebop enclosures, 3-key cycles & overtone series' },
  { id: 'ellington', label: 'Ellington Workshop', shortLabel: 'Ellington', icon: Compass, description: 'Cottontail, Warm Valley & ballad cadenza architect' },
  { id: 'lessons', label: 'Lessons & Homework', shortLabel: 'Lessons', icon: BookOpen, description: 'Fact-checked historical essays & practice drills' },
];

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onSelectTab,
  onQuickRecord,
  isDark,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#0c0d13]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#202332] transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 lg:gap-8 px-4 sm:px-6 py-3">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('overview')}
            className="text-left group flex items-center gap-2.5 whitespace-nowrap shrink-0 transition-opacity hover:opacity-90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-xs">
              <Music className="w-4 h-4 stroke-[2.5]" />
            </span>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white leading-tight">
                Mason Jazz Masterclass
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Agoura Studio Jazz I
              </span>
            </div>
          </button>

          {/* Zone 2: Desktop 4-5 core navigation links with subtle active underline */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium text-slate-600 dark:text-slate-400">
            {NAV_ITEMS.slice(0, 6).map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap shrink-0 relative ${
                    isActive
                      ? 'text-amber-700 dark:text-amber-300 font-semibold bg-amber-500/10 dark:bg-amber-500/15'
                      : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <span>{item.shortLabel}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Dropdown / Overflow for Remaining Tabs */}
            <div className="relative group">
              <button
                className={`px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1 ${
                  ['transcendence', 'ellington', 'lessons'].includes(activeTab)
                    ? 'text-amber-700 dark:text-amber-300 font-semibold bg-amber-500/10'
                    : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40'
                }`}
              >
                <span>More</span>
                <span className="text-[10px]">▼</span>
              </button>
              <div className="absolute right-0 top-full mt-1 w-52 p-1.5 bg-white dark:bg-[#141624] border border-slate-200 dark:border-[#262b3e] rounded-xl shadow-xl hidden group-hover:block transition-all z-50">
                {NAV_ITEMS.slice(6).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                      activeTab === item.id
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1c2032]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-60" />
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Zone 3: Theme Toggle + 1 Primary CTA Button + Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            <button
              onClick={onQuickRecord}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-95 rounded-lg transition-all shadow-xs whitespace-nowrap"
            >
              <Mic className="w-3.5 h-3.5 text-slate-950" />
              <span className="hidden sm:inline">Record Take</span>
              <span className="sm:hidden">Record</span>
            </button>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle navigation drawer"
              className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-[#25293d] bg-slate-50 dark:bg-[#141624] text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Quick-Scroll Pill Strip */}
        <div className="lg:hidden flex items-center overflow-x-auto gap-1.5 px-4 py-2 border-t border-slate-200 dark:border-[#1d202d] text-xs font-medium text-slate-600 dark:text-slate-400 scrollbar-none">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1 rounded-md transition-all whitespace-nowrap shrink-0 text-xs ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'hover:text-slate-900 dark:hover:text-white bg-slate-100/70 dark:bg-[#131522]'
                }`}
              >
                {item.shortLabel}
              </button>
            );
          })}
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-slate-950/60 backdrop-blur-xs flex justify-end transition-opacity">
          <div className="w-full max-w-sm h-full bg-white dark:bg-[#0e1017] border-l border-slate-200 dark:border-[#23273a] p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#202434] pb-4">
                <div>
                  <span className="font-display font-bold text-base text-slate-900 dark:text-white block">
                    Conservatory Navigation
                  </span>
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-mono">
                    Mason's Studio Suite
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1.5">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border ${
                        isActive
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
                          : 'border-transparent hover:bg-slate-100 dark:hover:bg-[#151724] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isActive 
                          ? 'bg-amber-500 text-slate-950' 
                          : 'bg-slate-100 dark:bg-[#1a1d2e] text-slate-600 dark:text-slate-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold font-display">{item.label}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{item.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-[#202434] space-y-3">
              <button
                onClick={() => {
                  onQuickRecord();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-colors shadow-xs"
              >
                <Mic className="w-4 h-4" />
                <span>Launch Audio/Video Vault</span>
              </button>
              <div className="text-center text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                Agoura Studio Jazz I · Lincoln Center Criteria
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
