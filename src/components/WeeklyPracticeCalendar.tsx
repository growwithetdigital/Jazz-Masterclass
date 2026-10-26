import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CorePillarId, DailyPillarLog } from '../types/masterclass';
import { CORE_PILLARS_CONFIG, CORE_PILLARS_LIST } from '../data/practicePillarsData';
import { db, auth, onAuthStateChanged, User } from '../lib/firebase';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, 
  BarChart3, CheckCircle2, Flame, Award, Sparkles, RefreshCw, 
  Plus, Minus, Save, Info, AlertCircle, TrendingUp
} from 'lucide-react';

// Helper to format date as YYYY-MM-DD in local time
function toLocalDateString(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper to get Monday of the given date's week
function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = (date.getDay() + 6) % 7; // 0 = Mon, 6 = Sun
  date.setDate(date.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date;
}

const DEFAULT_PILLAR_HOURS: Record<CorePillarId, number> = {
  tone_overtones: 0,
  parker_bebop: 0,
  coltrane_changes: 0,
  ellington_repertoire: 0,
  clarinet_doubling: 0,
  transcription_sightreading: 0
};

export const WeeklyPracticeCalendar: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => getMonday(new Date()));
  const [selectedDate, setSelectedDate] = useState<string>(() => toLocalDateString(new Date()));
  const [chartViewMode, setChartViewMode] = useState<'daily_stacked' | 'pillar_targets'>('daily_stacked');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [dailyNote, setDailyNote] = useState<string>('');

  // Daily Logs Dictionary: Keyed by YYYY-MM-DD
  const [logsByDate, setLogsByDate] = useState<Record<string, DailyPillarLog>>(() => {
    try {
      const stored = localStorage.getItem('mason_daily_pillar_logs');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}

    // Initial Realistic Seed for Current Week so Mason has immediate rich data
    const today = new Date();
    const mon = getMonday(today);
    const seed: Record<string, DailyPillarLog> = {};

    const seedData = [
      { offset: 0, hours: { tone_overtones: 0.5, parker_bebop: 0.75, coltrane_changes: 0.25, ellington_repertoire: 0.5, clarinet_doubling: 0.25, transcription_sightreading: 0.25 }, note: "Overtone series matching drone; Cottontail chorus 1" },
      { offset: 1, hours: { tone_overtones: 0.5, parker_bebop: 1.0, coltrane_changes: 0.5, ellington_repertoire: 0.5, clarinet_doubling: 0.25, transcription_sightreading: 0.5 }, note: "Parker 3-to-9 arpeggio drill; clarinet throat register long tones" },
      { offset: 2, hours: { tone_overtones: 0.25, parker_bebop: 0.5, coltrane_changes: 0.25, ellington_repertoire: 0.75, clarinet_doubling: 0.25, transcription_sightreading: 0.25 }, note: "Agoura Studio Jazz chart rehearsal with Bob Hackett" },
      { offset: 3, hours: { tone_overtones: 0.5, parker_bebop: 0.75, coltrane_changes: 0.5, ellington_repertoire: 0.5, clarinet_doubling: 0.25, transcription_sightreading: 0.5 }, note: "Giant Steps 3-key cycles; Dexter Gordon behind-the-beat phrasing" },
      { offset: 4, hours: { tone_overtones: 0.5, parker_bebop: 0.5, coltrane_changes: 0.25, ellington_repertoire: 0.5, clarinet_doubling: 0.25, transcription_sightreading: 0.25 }, note: "Warm Valley ballad tone study & terminal vibrato" }
    ];

    seedData.forEach(item => {
      const d = new Date(mon);
      d.setDate(mon.getDate() + item.offset);
      const dStr = toLocalDateString(d);
      const total = Object.values(item.hours).reduce((a, b) => a + b, 0);
      seed[dStr] = {
        id: `pillar_${dStr}`,
        date: dStr,
        studentUid: 'guest-mason',
        pillarHours: { ...DEFAULT_PILLAR_HOURS, ...item.hours },
        totalHours: Math.round(total * 100) / 100,
        notes: item.note,
        updatedAt: new Date().toISOString()
      };
    });

    return seed;
  });

  // Listen for Firebase Auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  // Fetch from Firestore
  useEffect(() => {
    const fetchFirestorePillarLogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'dailyPillarLogs'));
        const cloudLogs: Record<string, DailyPillarLog> = {};
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data() as DailyPillarLog;
          if (data.date) {
            cloudLogs[data.date] = data;
          }
        });

        if (Object.keys(cloudLogs).length > 0) {
          setLogsByDate((prev) => {
            const merged = { ...prev, ...cloudLogs };
            try {
              localStorage.setItem('mason_daily_pillar_logs', JSON.stringify(merged));
            } catch {}
            return merged;
          });
        }
      } catch (err) {
        console.warn("Using local cache for daily pillar logs:", err);
      }
    };

    fetchFirestorePillarLogs();
  }, [currentUser]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mason_daily_pillar_logs', JSON.stringify(logsByDate));
    } catch {}
  }, [logsByDate]);

  // Sync active dailyNote from selected date
  useEffect(() => {
    const activeLog = logsByDate[selectedDate];
    setDailyNote(activeLog?.notes || '');
  }, [selectedDate, logsByDate]);

  // Days in currently viewed week (Monday through Sunday)
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(currentWeekStart);
      d.setDate(currentWeekStart.getDate() + i);
      const dateStr = toLocalDateString(d);
      const isToday = dateStr === toLocalDateString(new Date());
      const isSelected = dateStr === selectedDate;
      const log = logsByDate[dateStr];
      const totalHours = log ? log.totalHours : 0;
      return {
        date: d,
        dateStr,
        dayLabel: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        monthLabel: d.toLocaleDateString('en-US', { month: 'short' }),
        isToday,
        isSelected,
        totalHours,
        log
      };
    });
  }, [currentWeekStart, selectedDate, logsByDate]);

  // Week navigation
  const handlePrevWeek = () => {
    const prev = new Date(currentWeekStart);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekStart(prev);
    setSelectedDate(toLocalDateString(prev));
  };

  const handleNextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(next.getDate() + 7);
    setCurrentWeekStart(next);
    setSelectedDate(toLocalDateString(next));
  };

  const handleJumpToCurrentWeek = () => {
    const mon = getMonday(new Date());
    setCurrentWeekStart(mon);
    setSelectedDate(toLocalDateString(new Date()));
  };

  // Active day's hours
  const activeLog = logsByDate[selectedDate] || {
    id: `pillar_${selectedDate}`,
    date: selectedDate,
    studentUid: currentUser?.uid || 'guest-mason',
    pillarHours: { ...DEFAULT_PILLAR_HOURS },
    totalHours: 0,
    notes: '',
    updatedAt: new Date().toISOString()
  };

  // Modify hours for a specific pillar on the selected date
  const handleUpdatePillarHours = (pillarId: CorePillarId, delta: number) => {
    setLogsByDate((prev) => {
      const current = prev[selectedDate] || {
        id: `pillar_${selectedDate}`,
        date: selectedDate,
        studentUid: currentUser?.uid || 'guest-mason',
        pillarHours: { ...DEFAULT_PILLAR_HOURS },
        totalHours: 0,
        notes: dailyNote,
        updatedAt: new Date().toISOString()
      };

      const oldVal = current.pillarHours[pillarId] || 0;
      const newVal = Math.max(0, Math.round((oldVal + delta) * 100) / 100);

      const updatedPillarHours = {
        ...current.pillarHours,
        [pillarId]: newVal
      };

      const newTotal = Object.values(updatedPillarHours).reduce((a, b) => a + b, 0);

      const updatedLog: DailyPillarLog = {
        ...current,
        pillarHours: updatedPillarHours,
        totalHours: Math.round(newTotal * 100) / 100,
        notes: dailyNote,
        updatedAt: new Date().toISOString()
      };

      // Save to Firestore in background
      try {
        setDoc(doc(db, 'dailyPillarLogs', `pillar_${selectedDate}`), updatedLog);
      } catch (e) {
        console.warn("Saved to local storage:", e);
      }

      return {
        ...prev,
        [selectedDate]: updatedLog
      };
    });

    setSaveStatus("Saved to Calendar");
    setTimeout(() => setSaveStatus(null), 2500);
  };

  // Save manual notes
  const handleSaveNotes = () => {
    setLogsByDate((prev) => {
      const current = prev[selectedDate] || {
        id: `pillar_${selectedDate}`,
        date: selectedDate,
        studentUid: currentUser?.uid || 'guest-mason',
        pillarHours: { ...DEFAULT_PILLAR_HOURS },
        totalHours: 0,
        notes: dailyNote,
        updatedAt: new Date().toISOString()
      };

      const updatedLog: DailyPillarLog = {
        ...current,
        notes: dailyNote,
        updatedAt: new Date().toISOString()
      };

      try {
        setDoc(doc(db, 'dailyPillarLogs', `pillar_${selectedDate}`), updatedLog);
      } catch (e) {}

      return {
        ...prev,
        [selectedDate]: updatedLog
      };
    });

    setSaveStatus("Notes Saved");
    setTimeout(() => setSaveStatus(null), 2500);
  };

  // --- WEEKLY AGGREGATE STATS ---
  const weeklyTotalHours = useMemo(() => {
    return weekDays.reduce((sum, day) => sum + day.totalHours, 0);
  }, [weekDays]);

  const weeklyPillarTotals = useMemo(() => {
    const totals: Record<CorePillarId, number> = {
      tone_overtones: 0,
      parker_bebop: 0,
      coltrane_changes: 0,
      ellington_repertoire: 0,
      clarinet_doubling: 0,
      transcription_sightreading: 0
    };

    weekDays.forEach(day => {
      if (day.log) {
        CORE_PILLARS_LIST.forEach(p => {
          totals[p.id] += day.log?.pillarHours[p.id] || 0;
        });
      }
    });

    // Round to 2 decimals
    Object.keys(totals).forEach(k => {
      totals[k as CorePillarId] = Math.round(totals[k as CorePillarId] * 100) / 100;
    });

    return totals;
  }, [weekDays]);

  // Target total for the week
  const weeklyTargetTotal = useMemo(() => {
    return CORE_PILLARS_LIST.reduce((sum, p) => sum + p.targetWeeklyHours, 0);
  }, []);

  const overallWeeklyProgressPct = Math.min(100, Math.round((weeklyTotalHours / weeklyTargetTotal) * 100));

  // Find most practiced pillar this week
  const topPillar = useMemo(() => {
    let bestId: CorePillarId = 'tone_overtones';
    let bestVal = -1;
    CORE_PILLARS_LIST.forEach(p => {
      if (weeklyPillarTotals[p.id] > bestVal) {
        bestVal = weeklyPillarTotals[p.id];
        bestId = p.id;
      }
    });
    return CORE_PILLARS_CONFIG[bestId];
  }, [weeklyPillarTotals]);

  // Formatted date range for header
  const weekRangeLabel = useMemo(() => {
    const end = new Date(currentWeekStart);
    end.setDate(end.getDate() + 6);
    return `${currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  }, [currentWeekStart]);

  return (
    <div className="p-6 sm:p-7 rounded-2xl border border-amber-500/40 bg-white dark:bg-[#12141f] space-y-7 shadow-sm">
      
      {/* Top Header & Week Navigation */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-[#1f2334] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono">
              6 Core Pillars Curriculum
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
              Firestore Sync Active
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-1 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-amber-500" />
            <span>Weekly Practice Calendar</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 max-w-2xl leading-relaxed">
            Log your daily practice hours across all 6 core conservatory pillars (Tone, Bebop, Coltrane Cycles, Ellington Lead, Clarinet Doubling, Transcription) and track your balanced progression.
          </p>
        </div>

        {/* Week Controls */}
        <div className="flex items-center gap-2 self-start lg:self-auto">
          <div className="flex items-center bg-slate-100 dark:bg-[#181a28] rounded-xl border border-slate-200 dark:border-[#262a3d] p-1">
            <button
              onClick={handlePrevWeek}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-white dark:hover:bg-[#202436] transition-colors"
              title="Previous Week"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 min-w-[150px] text-center">
              {weekRangeLabel}
            </span>
            <button
              onClick={handleNextWeek}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-white dark:hover:bg-[#202436] transition-colors"
              title="Next Week"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleJumpToCurrentWeek}
            className="px-3 py-2 rounded-xl text-xs font-mono font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 transition-colors whitespace-nowrap"
          >
            Today
          </button>
        </div>
      </div>

      {/* 7-Day Interactive Week Calendar Strip */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {weekDays.map((day) => {
          const hasLoggedHours = day.totalHours > 0;
          return (
            <button
              key={day.dateStr}
              type="button"
              onClick={() => setSelectedDate(day.dateStr)}
              className={`p-3 sm:p-3.5 rounded-xl text-center transition-all border cursor-pointer flex flex-col justify-between min-h-[90px] relative overflow-hidden ${
                day.isSelected
                  ? 'bg-amber-500/15 dark:bg-[#1d2136] border-amber-500 text-slate-900 dark:text-white shadow-md ring-2 ring-amber-500/30'
                  : 'bg-slate-50 dark:bg-[#151724] border-slate-200 dark:border-[#232738] text-slate-700 dark:text-slate-300 hover:border-amber-400/50'
              }`}
            >
              {day.isToday && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              )}
              
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider block text-slate-500 dark:text-slate-400">
                  {day.dayLabel}
                </span>
                <span className={`text-base sm:text-lg font-bold font-mono block ${day.isSelected ? 'text-amber-600 dark:text-amber-400' : ''}`}>
                  {day.dayNum}
                </span>
              </div>

              <div className="mt-1 pt-1 border-t border-slate-200 dark:border-[#24283c]">
                <span className={`text-xs font-mono font-bold block ${hasLoggedHours ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                  {hasLoggedHours ? `${day.totalHours}h` : '0h'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Banner & Total Hours Status */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#151725] border border-slate-200 dark:border-[#222538] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-amber-500 shrink-0" />
          <div>
            <span className="text-slate-500 dark:text-slate-400 font-mono">
              Logging Hours For:
            </span>{' '}
            <strong className="text-slate-900 dark:text-white font-mono text-sm">
              {new Date(`${selectedDate}T00:00:00`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </strong>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-slate-500 dark:text-slate-400">Day Total:</span>
            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
              {activeLog.totalHours} Hours ({Math.round(activeLog.totalHours * 60)} min)
            </span>
          </div>

          {saveStatus && (
            <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold animate-pulse text-[11px] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {saveStatus}
            </span>
          )}
        </div>
      </div>

      {/* =========================================================================
          THE 6 CORE PILLARS DAILY HOURS LOGGING CONTROLS
         ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono flex items-center gap-2">
            <span>Log Practice Hours by Pillar:</span>
            <span className="text-[10px] text-slate-400 normal-case font-normal">(Use + / - buttons to log 15-min or 30-min blocks)</span>
          </h4>
          <span className="text-xs font-mono text-amber-600 dark:text-amber-400">
            6 Pillars Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {CORE_PILLARS_LIST.map((pillar) => {
            const currentHours = activeLog.pillarHours[pillar.id] || 0;
            const currentMins = Math.round(currentHours * 60);

            return (
              <div
                key={pillar.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-[#161827] border border-slate-200 dark:border-[#252a3d] space-y-3 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${pillar.badgeBg} ${pillar.badgeText}`}>
                      {pillar.shortLabel}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      Goal: {pillar.targetWeeklyHours}h/wk
                    </span>
                  </div>

                  <h5 className="font-bold text-sm text-slate-900 dark:text-white font-display">
                    {pillar.name}
                  </h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {pillar.description}
                  </p>
                  <div className="text-[10px] font-mono text-amber-600 dark:text-amber-400 mt-1">
                    Mentor Focus: {pillar.legend}
                  </div>
                </div>

                {/* Hours Counter & Quick Stepper Controls */}
                <div className="pt-2 border-t border-slate-200 dark:border-[#222538] flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
                      {currentHours}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono ml-1">
                      hrs ({currentMins}m)
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleUpdatePillarHours(pillar.id, -0.25)}
                      disabled={currentHours <= 0}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-[#202436] border border-slate-300 dark:border-[#2d3248] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2b3047] disabled:opacity-30 flex items-center justify-center transition-all cursor-pointer"
                      title="Subtract 15 minutes"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdatePillarHours(pillar.id, 0.25)}
                      className="px-2.5 h-8 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-mono text-xs font-bold flex items-center justify-center transition-all cursor-pointer"
                      title="Add 15 minutes"
                    >
                      +15m
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdatePillarHours(pillar.id, 0.5)}
                      className="px-2.5 h-8 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold flex items-center justify-center transition-all cursor-pointer shadow-xs"
                      title="Add 30 minutes"
                    >
                      +30m
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Reflection Notes Input */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#151725] border border-slate-200 dark:border-[#222538] space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-mono text-slate-600 dark:text-slate-400 font-medium">
            Daily Rehearsal Notes & Technical Observations for Bob Hackett:
          </label>
          <button
            type="button"
            onClick={handleSaveNotes}
            className="text-amber-600 dark:text-amber-400 font-mono font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Notes</span>
          </button>
        </div>
        <textarea
          rows={2}
          value={dailyNote}
          onChange={(e) => setDailyNote(e.target.value)}
          placeholder="e.g. Worked on altissimo F# overtone voicing with Coltrane's larynx exercise; Cottontail chorus 2 lead phrasing; 10-second switch to Bb clarinet..."
          className="w-full bg-white dark:bg-[#0c0d14] border border-slate-200 dark:border-[#272b3d] rounded-lg p-2.5 text-xs text-slate-900 dark:text-white font-sans focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* =========================================================================
          BAR CHART PROGRESS VISUALIZATION (USER REQUESTED FEATURE)
         ========================================================================= */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#141624] border border-slate-200 dark:border-[#25293d] space-y-5">
        
        {/* Bar Chart Header with View Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-[#232738] pb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-500" />
            <div>
              <h4 className="text-base font-bold font-display text-slate-900 dark:text-white">
                Pillar Progress & Weekly Balance Bar Chart
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Visualizing hours invested across the 6 pillars for the week of {weekRangeLabel}
              </p>
            </div>
          </div>

          {/* Chart Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-[#1c2032] p-1 rounded-xl self-start sm:self-auto border border-slate-300/60 dark:border-[#2b3046]">
            <button
              onClick={() => setChartViewMode('daily_stacked')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                chartViewMode === 'daily_stacked'
                  ? 'bg-white dark:bg-amber-500 text-slate-950 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Daily Stacked Bars (Mon–Sun)
            </button>
            <button
              onClick={() => setChartViewMode('pillar_targets')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                chartViewMode === 'pillar_targets'
                  ? 'bg-white dark:bg-amber-500 text-slate-950 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Weekly Pillar Targets
            </button>
          </div>
        </div>

        {/* Aggregate KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white dark:bg-[#181a28] border border-slate-200 dark:border-[#262a3d]">
            <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-mono">Week Practice Total</span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
              {weeklyTotalHours} <span className="text-xs text-slate-400 font-normal">hours</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-[#181a28] border border-slate-200 dark:border-[#262a3d]">
            <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-mono">Target Completion</span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
              {overallWeeklyProgressPct}%
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-[#181a28] border border-slate-200 dark:border-[#262a3d]">
            <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-mono">Lead Pillar</span>
            <div className="text-sm font-bold font-display text-amber-600 dark:text-amber-400 truncate mt-1">
              {topPillar.shortLabel}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-[#181a28] border border-slate-200 dark:border-[#262a3d]">
            <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-mono">Doubling Status</span>
            <div className="text-sm font-bold font-display text-rose-600 dark:text-rose-400 mt-1">
              {weeklyPillarTotals.clarinet_doubling >= 1.0 ? '✓ Balanced' : `${weeklyPillarTotals.clarinet_doubling}h / 1.0h`}
            </div>
          </div>
        </div>

        {/* Legend for the 6 Pillars */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
          <span className="font-mono text-slate-400 text-[11px] font-semibold">Pillars:</span>
          {CORE_PILLARS_LIST.map((pillar) => (
            <div key={pillar.id} className="flex items-center gap-1.5 text-[11px]">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: pillar.colorHex }}
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium font-sans">
                {pillar.shortLabel}
              </span>
            </div>
          ))}
        </div>

        {/* CHART RENDER: MODE 1 - DAILY STACKED BARS */}
        {chartViewMode === 'daily_stacked' && (
          <div className="space-y-4 pt-3">
            <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 border-b border-slate-200 dark:border-slate-800 pb-3 px-2">
              {weekDays.map((day) => {
                const maxChartScale = 3.5; // Up to 3.5 hours per day on vertical scale
                const dayLog = day.log;
                const totalH = dayLog ? dayLog.totalHours : 0;
                const totalPct = Math.min(100, (totalH / maxChartScale) * 100);

                return (
                  <div key={day.dateStr} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 mb-1 opacity-80 group-hover:opacity-100">
                      {totalH > 0 ? `${totalH}h` : '0h'}
                    </span>

                    {/* Stacked Pillar Bar */}
                    <div className="w-full max-w-[48px] h-44 bg-slate-200 dark:bg-[#1e2235] rounded-t-lg overflow-hidden flex flex-col-reverse relative shadow-inner">
                      {dayLog && totalH > 0 ? (
                        CORE_PILLARS_LIST.map((pillar) => {
                          const pHours = dayLog.pillarHours[pillar.id] || 0;
                          if (pHours <= 0) return null;
                          const segmentPct = (pHours / maxChartScale) * 100;
                          return (
                            <div
                              key={pillar.id}
                              style={{
                                height: `${segmentPct}%`,
                                backgroundColor: pillar.colorHex
                              }}
                              className="w-full transition-all duration-300 hover:opacity-90 relative"
                              title={`${pillar.name}: ${pHours}h`}
                            />
                          );
                        })
                      ) : (
                        <div className="w-full h-0" />
                      )}
                    </div>

                    <div className={`mt-2 font-mono text-xs font-bold text-center ${day.isSelected ? 'text-amber-500 underline underline-offset-4' : 'text-slate-700 dark:text-slate-300'}`}>
                      {day.dayLabel}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {day.dayNum}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 px-2">
              <span>0h Baseline</span>
              <span>1.5h Recommended Daily Load</span>
              <span>3.5h Max Scale</span>
            </div>
          </div>
        )}

        {/* CHART RENDER: MODE 2 - WEEKLY PILLAR TARGET COMPARISON */}
        {chartViewMode === 'pillar_targets' && (
          <div className="space-y-3.5 pt-2">
            {CORE_PILLARS_LIST.map((pillar) => {
              const actual = weeklyPillarTotals[pillar.id];
              const target = pillar.targetWeeklyHours;
              const pct = Math.min(100, Math.round((actual / target) * 100));
              const isGoalMet = actual >= target;

              return (
                <div key={pillar.id} className="p-3 rounded-xl bg-white dark:bg-[#181a28] border border-slate-200 dark:border-[#262a3d] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: pillar.colorHex }}
                      />
                      <span className="font-bold text-slate-900 dark:text-white font-display">
                        {pillar.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                        ({pillar.legend})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                        {actual}h
                      </span>
                      <span className="text-slate-400 text-xs">/ {target}h</span>
                      {isGoalMet && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                          Goal Met!
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: pillar.colorHex
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};
