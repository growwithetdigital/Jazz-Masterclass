import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audioEngine } from '../utils/audioEngine';
import { CLARINET_DOUBLING_GUIDE } from '../data/conservatoryData';
import { PracticeItinerary, PracticeSessionRecord, PracticeGoalRecord } from '../types/masterclass';
import { WeeklyPracticeCalendar } from './WeeklyPracticeCalendar';
import { db, auth, onAuthStateChanged, User, signInWithPopup, signOut, googleProvider } from '../lib/firebase';
import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { 
  Play, Pause, Volume2, VolumeX, CheckSquare, Square, 
  Clock, Sparkles, Feather, AlertTriangle, Target, Calendar, 
  Flame, TrendingUp, BarChart2, Plus, Trash2, Cloud, ShieldCheck, 
  CheckCircle2, LogIn, LogOut, Mic
} from 'lucide-react';

interface PracticeRoutineModuleProps {
  onSelectTab?: (tab: string) => void;
}

export const PracticeRoutineModule: React.FC<PracticeRoutineModuleProps> = ({ onSelectTab }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<30 | 60 | 90>(60);
  const [includeClarinet, setIncludeClarinet] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<PracticeItinerary | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  // Practice Room Controls
  const [isMetronomeActive, setIsMetronomeActive] = useState(false);
  const [metronomeBpm, setMetronomeBpm] = useState(160);
  const [isSwingFeel, setIsSwingFeel] = useState(true);
  const [currentBeat, setCurrentBeat] = useState(0);

  // Drone Controls
  const [isDroneActive, setIsDroneActive] = useState(false);
  const [dronePitch, setDronePitch] = useState<'Bb' | 'F' | 'C' | 'Eb'>('Bb');

  // --- PRACTICE LOGGER & WEEKLY GOALS STATE ---
  const [sessionMinutes, setSessionMinutes] = useState(60);
  const [sessionCategory, setSessionCategory] = useState<PracticeSessionRecord['focusCategory']>('Tone & Overtones');
  const [sessionInstrument, setSessionInstrument] = useState<PracticeSessionRecord['instrument']>('Tenor Saxophone');
  const [sessionDate, setSessionDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [sessionNotes, setSessionNotes] = useState('');
  const [isLoggingSession, setIsLoggingSession] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Weekly Goal State (default 420 mins = 7 hours/wk, 6 days/wk)
  const [weeklyGoal, setWeeklyGoal] = useState<PracticeGoalRecord>(() => {
    try {
      const stored = localStorage.getItem('mason_practice_goal');
      if (stored) return JSON.parse(stored);
    } catch {}
    return {
      id: 'default-goal',
      studentUid: 'guest-mason',
      weeklyTargetMinutes: 420,
      daysPerWeekTarget: 6,
      updatedAt: new Date().toISOString()
    };
  });
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempTargetMinutes, setTempTargetMinutes] = useState(weeklyGoal.weeklyTargetMinutes);
  const [tempDaysTarget, setTempDaysTarget] = useState(weeklyGoal.daysPerWeekTarget);

  // Practice History Sessions (Local + Firestore)
  const [practiceSessions, setPracticeSessions] = useState<PracticeSessionRecord[]>(() => {
    try {
      const stored = localStorage.getItem('mason_practice_sessions');
      if (stored) return JSON.parse(stored);
    } catch {}
    // Seed sample initial week for Mason if empty
    const today = new Date();
    const sampleSeed: PracticeSessionRecord[] = [
      {
        id: 'seed-1',
        studentUid: 'guest-mason',
        date: new Date(today.getTime() - 4 * 86400000).toISOString().split('T')[0],
        minutes: 60,
        focusCategory: 'Tone & Overtones',
        instrument: 'Tenor Saxophone',
        notes: 'Low Bb overtone series matching concert Bb drone. Checked altissimo F# throat voicing.',
        createdAt: new Date().toISOString()
      },
      {
        id: 'seed-2',
        studentUid: 'guest-mason',
        date: new Date(today.getTime() - 3 * 86400000).toISOString().split('T')[0],
        minutes: 75,
        focusCategory: 'Parker Bebop & Enclosures',
        instrument: 'Tenor Saxophone',
        notes: 'Parker 3-to-9 arpeggio resolutions over rhythm changes in concert Bb.',
        createdAt: new Date().toISOString()
      },
      {
        id: 'seed-3',
        studentUid: 'guest-mason',
        date: new Date(today.getTime() - 2 * 86400000).toISOString().split('T')[0],
        minutes: 45,
        focusCategory: 'Clarinet Doubling',
        instrument: 'Bb Clarinet',
        notes: 'Throat register pitch centering (G, G#, A, Bb). Firm lower lip cushion drills.',
        createdAt: new Date().toISOString()
      },
      {
        id: 'seed-4',
        studentUid: 'guest-mason',
        date: new Date(today.getTime() - 1 * 86400000).toISOString().split('T')[0],
        minutes: 90,
        focusCategory: 'Ellington Repertoire',
        instrument: 'Both',
        notes: 'Cottontail Ben Webster transcription choruses 1-2. Quick 10-second switch to Bb clarinet.',
        createdAt: new Date().toISOString()
      }
    ];
    return sampleSeed;
  });

  const droneFrequencies = {
    'Bb': 233.08, // Concert Bb3 (Tenor Middle C)
    'F': 174.61,  // Concert F3 (Tenor G)
    'C': 130.81,  // Concert C3 (Tenor D)
    'Eb': 155.56  // Concert Eb3 (Tenor F)
  };

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  // Fetch Firestore sessions on mount or login
  useEffect(() => {
    const fetchFirestoreSessions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'practiceSessions'));
        const cloudSessions: PracticeSessionRecord[] = [];
        querySnapshot.forEach((docSnap) => {
          cloudSessions.push(docSnap.data() as PracticeSessionRecord);
        });

        if (cloudSessions.length > 0) {
          setPracticeSessions((prev) => {
            const map = new Map<string, PracticeSessionRecord>();
            prev.forEach(s => map.set(s.id, s));
            cloudSessions.forEach(s => map.set(s.id, s));
            const merged = Array.from(map.values()).sort((a, b) => b.date.localeCompare(a.date));
            try {
              localStorage.setItem('mason_practice_sessions', JSON.stringify(merged));
            } catch {}
            return merged;
          });
        }
      } catch (err) {
        console.warn("Using local cache for practice sessions:", err);
      }
    };

    fetchFirestoreSessions();
  }, [currentUser]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('mason_practice_sessions', JSON.stringify(practiceSessions));
    } catch {}
  }, [practiceSessions]);

  useEffect(() => {
    try {
      localStorage.setItem('mason_practice_goal', JSON.stringify(weeklyGoal));
    } catch {}
  }, [weeklyGoal]);

  // Metronome toggling
  const toggleMetronome = () => {
    if (isMetronomeActive) {
      audioEngine.stopMetronome();
      setIsMetronomeActive(false);
    } else {
      audioEngine.startMetronome(metronomeBpm, isSwingFeel, (beat) => {
        setCurrentBeat(beat);
      });
      setIsMetronomeActive(true);
    }
  };

  const handleBpmChange = (newBpm: number) => {
    setMetronomeBpm(newBpm);
    if (isMetronomeActive) {
      audioEngine.startMetronome(newBpm, isSwingFeel, (beat) => {
        setCurrentBeat(beat);
      });
    }
  };

  const handleSwingToggle = () => {
    const nextSwing = !isSwingFeel;
    setIsSwingFeel(nextSwing);
    if (isMetronomeActive) {
      audioEngine.startMetronome(metronomeBpm, nextSwing, (beat) => {
        setCurrentBeat(beat);
      });
    }
  };

  // Drone toggling
  const toggleDrone = () => {
    if (isDroneActive) {
      audioEngine.stopDrone();
      setIsDroneActive(false);
    } else {
      audioEngine.startDrone(droneFrequencies[dronePitch]);
      setIsDroneActive(true);
    }
  };

  const handleDronePitchChange = (pitch: 'Bb' | 'F' | 'C' | 'Eb') => {
    setDronePitch(pitch);
    if (isDroneActive) {
      audioEngine.startDrone(droneFrequencies[pitch]);
    }
  };

  // Fetch or generate itinerary
  const generateRoutine = async (duration = selectedDuration, clarinet = includeClarinet) => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          durationMinutes: duration,
          doublingFocus: clarinet,
          focusAreas: ['Overtones', 'Parker 3-to-9 arpeggios', 'Ellington Solo', 'Clarinet Embouchure']
        })
      });
      const data = await res.json();
      setItinerary(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleCheckExercise = (id: string) => {
    setCompletedExercises(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Log a Practice Session (Firestore + Local)
  const handleLogSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingSession(true);

    const sessionId = `practice-${Date.now()}`;
    const newSession: PracticeSessionRecord = {
      id: sessionId,
      studentUid: currentUser?.uid || 'guest-mason',
      date: sessionDate,
      minutes: Number(sessionMinutes),
      focusCategory: sessionCategory,
      instrument: sessionInstrument,
      notes: sessionNotes || 'Daily conservatory block completed.',
      createdAt: new Date().toISOString()
    };

    // Update state immediately
    setPracticeSessions(prev => [newSession, ...prev].sort((a, b) => b.date.localeCompare(a.date)));
    setSessionNotes('');
    setSaveSuccessMsg(`Logged ${newSession.minutes} minutes in ${newSession.focusCategory}!`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);

    // Sync to Firestore
    try {
      await setDoc(doc(db, 'practiceSessions', sessionId), newSession);
    } catch (err) {
      console.warn("Logged to local studio vault (Firestore write offline):", err);
    } finally {
      setIsLoggingSession(false);
    }
  };

  const handleDeleteSession = async (id: string) => {
    setPracticeSessions(prev => prev.filter(s => s.id !== id));
    try {
      await deleteDoc(doc(db, 'practiceSessions', id));
    } catch (err) {
      console.warn("Could not delete from Firestore:", err);
    }
  };

  const handleSaveGoal = async () => {
    const updated: PracticeGoalRecord = {
      ...weeklyGoal,
      weeklyTargetMinutes: Number(tempTargetMinutes),
      daysPerWeekTarget: Number(tempDaysTarget),
      updatedAt: new Date().toISOString()
    };
    setWeeklyGoal(updated);
    setIsEditingGoal(false);

    try {
      await setDoc(doc(db, 'practiceGoals', updated.id), updated);
    } catch (err) {
      console.warn("Updated local goal:", err);
    }
  };

  // --- STATS & CONSISTENCY COMPUTATION ---
  // Calculate total minutes practiced this current week (last 7 rolling days)
  const now = new Date();
  const dayOfWeek = (now.getDay() + 6) % 7; // 0 = Mon, 6 = Sun
  const mondayThisWeek = new Date(now);
  mondayThisWeek.setDate(now.getDate() - dayOfWeek);
  mondayThisWeek.setHours(0, 0, 0, 0);

  const thisWeekSessions = practiceSessions.filter(s => {
    const sDate = new Date(`${s.date}T00:00:00`);
    return sDate >= mondayThisWeek;
  });

  const totalMinutesThisWeek = thisWeekSessions.reduce((acc, s) => acc + s.minutes, 0);
  const uniqueDaysThisWeek = new Set(thisWeekSessions.map(s => s.date)).size;
  const weeklyPercent = Math.min(100, Math.round((totalMinutesThisWeek / (weeklyGoal.weeklyTargetMinutes || 1)) * 100));

  // Compute daily minutes for Mon-Sun of this week for the bar chart
  const daysOfWeekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dailyBreakdown = daysOfWeekLabels.map((label, idx) => {
    const d = new Date(mondayThisWeek);
    d.setDate(mondayThisWeek.getDate() + idx);
    const dateStr = d.toISOString().split('T')[0];
    const minutesOnDay = practiceSessions
      .filter(s => s.date === dateStr)
      .reduce((sum, s) => sum + s.minutes, 0);
    const isToday = dateStr === now.toISOString().split('T')[0];
    return { label, dateStr, minutes: minutesOnDay, isToday };
  });

  // Calculate current streak
  let currentStreak = 0;
  let checkDate = new Date();
  while (true) {
    const dStr = checkDate.toISOString().split('T')[0];
    const hasPracticed = practiceSessions.some(s => s.date === dStr && s.minutes > 0);
    if (hasPracticed) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      // If today hasn't been logged yet, give grace and check yesterday
      if (currentStreak === 0 && dStr === now.toISOString().split('T')[0]) {
        checkDate.setDate(checkDate.getDate() - 1);
        const yesterdayStr = checkDate.toISOString().split('T')[0];
        const practicedYesterday = practiceSessions.some(s => s.date === yesterdayStr && s.minutes > 0);
        if (practicedYesterday) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
          continue;
        }
      }
      break;
    }
  }

  useEffect(() => {
    generateRoutine(60, true);
    return () => {
      audioEngine.stopMetronome();
      audioEngine.stopDrone();
    };
  }, []);

  return (
    <div className="space-y-10">
      {/* Module Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#212433] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <span>Module 5</span>
            <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
            <span>Daily Practice Studio & Consistency Tracker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Practice Itinerary, Log & Firestore Consistency Tracker
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Log your daily practice minutes, set weekly conservatory goals, track your consistency over time with Firestore sync, and practice with the integrated Jazz Swing Metronome and Overtone Drone.
          </p>
        </div>

        {/* Duration Selectors */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-[#141624] rounded-lg border border-slate-200 dark:border-[#24293d]">
          <span className="text-xs text-slate-500 dark:text-slate-400 px-2 font-mono">Routine:</span>
          {([30, 60, 90] as const).map((d) => (
            <button
              key={d}
              onClick={() => {
                setSelectedDuration(d);
                generateRoutine(d, includeClarinet);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                selectedDuration === d
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {d} Min
            </button>
          ))}
        </div>
      </div>

      {/* WEEKLY PRACTICE CALENDAR (6 CORE PILLARS & BAR CHART PROGRESSION) */}
      <WeeklyPracticeCalendar />

      {/* =========================================================================
          FEATURE: PRACTICE LOGGER, WEEKLY GOALS & FIRESTORE CONSISTENCY VISUALIZER
         ========================================================================= */}
      <div className="p-6 rounded-2xl border border-amber-500/40 bg-white dark:bg-[#12141f] space-y-6 shadow-sm">
        
        {/* Header Strip with Cloud Sync indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-[#1f2334] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                  Mason's Practice Consistency & Weekly Target Engine
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                  Firestore Connected
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Visualizing weekly consistency toward Essentially Ellington and college audition readiness
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {currentUser ? `Synced to ${currentUser.displayName || currentUser.email}` : 'Local Session + Firestore (Open Access)'}
            </span>
          </div>
        </div>

        {/* 3 Metric Cards: Weekly Minutes, Days Target, Current Streak */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Card 1: Weekly Minutes Progress */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-[#25293d] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Weekly Practice</span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{weeklyPercent}%</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
                {totalMinutesThisWeek}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                / {weeklyGoal.weeklyTargetMinutes} mins
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${weeklyPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Goal: {(weeklyGoal.weeklyTargetMinutes / 60).toFixed(1)} hrs/wk</span>
              <button
                type="button"
                onClick={() => setIsEditingGoal(!isEditingGoal)}
                className="text-amber-600 dark:text-amber-400 hover:underline font-mono"
              >
                {isEditingGoal ? 'Cancel' : 'Edit Goal'}
              </button>
            </div>
          </div>

          {/* Card 2: Days Practiced this Week */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-[#25293d] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Active Days</span>
              <Calendar className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                {uniqueDaysThisWeek}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                / {weeklyGoal.daysPerWeekTarget} target days
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {uniqueDaysThisWeek >= weeklyGoal.daysPerWeekTarget ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Target Achieved This Week!
                </span>
              ) : (
                <span>{weeklyGoal.daysPerWeekTarget - uniqueDaysThisWeek} more practice day(s) to hit target</span>
              )}
            </div>
          </div>

          {/* Card 3: Consistency Streak */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-[#25293d] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Horn Streak</span>
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold font-mono text-amber-500 tabular-nums">
                {currentStreak}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                consecutive days
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {currentStreak >= 5 
                ? 'Coltrane-level stamina! Muscle memory locked.' 
                : 'Consistency builds the tone center.'}
            </div>
          </div>

        </div>

        {/* Goal Edit Modal / Drawer */}
        {isEditingGoal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-xl bg-slate-100 dark:bg-[#181a28] border border-amber-500/30 space-y-3"
          >
            <div className="font-bold text-xs uppercase tracking-wider font-mono text-amber-600 dark:text-amber-400">
              Set Weekly Practice Benchmarks
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">
                  Target Minutes / Week: <strong className="text-slate-900 dark:text-white font-mono">{tempTargetMinutes} min ({(tempTargetMinutes/60).toFixed(1)} hrs)</strong>
                </label>
                <input
                  type="range"
                  min="120"
                  max="900"
                  step="30"
                  value={tempTargetMinutes}
                  onChange={(e) => setTempTargetMinutes(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>3 hrs (30m/day)</span>
                  <span>7 hrs (60m/day)</span>
                  <span>14 hrs (Pro)</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">
                  Target Days / Week: <strong className="text-slate-900 dark:text-white font-mono">{tempDaysTarget} days</strong>
                </label>
                <div className="flex gap-2">
                  {[4, 5, 6, 7].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setTempDaysTarget(num)}
                      className={`flex-1 py-1.5 rounded font-mono font-bold text-xs border ${
                        tempDaysTarget === num
                          ? 'bg-amber-500 text-slate-950 border-amber-500'
                          : 'bg-white dark:bg-[#12141f] border-slate-300 dark:border-[#2d3248] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {num} Days
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditingGoal(false)}
                className="px-3 py-1.5 rounded text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveGoal}
                className="px-4 py-1.5 rounded bg-amber-500 text-slate-950 font-bold text-xs uppercase font-mono shadow-xs"
              >
                Save Goal to Firestore
              </button>
            </div>
          </motion.div>
        )}

        {/* 7-Day Consistency Visualization Bar Chart */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-[#141624] border border-slate-200 dark:border-[#24283c] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 font-display">
              <BarChart2 className="w-4 h-4 text-amber-500" />
              <span>Current Week Daily Practice Consistency</span>
            </span>
            <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
              Daily Target Benchmark: ~{Math.round(weeklyGoal.weeklyTargetMinutes / weeklyGoal.daysPerWeekTarget)} min/day
            </span>
          </div>

          {/* Bar Chart Container */}
          <div className="grid grid-cols-7 gap-2 pt-4 items-end h-40 border-b border-slate-200 dark:border-slate-800 pb-2">
            {dailyBreakdown.map((item, idx) => {
              const maxScale = Math.max(120, weeklyGoal.weeklyTargetMinutes / weeklyGoal.daysPerWeekTarget * 1.5);
              const heightPct = Math.min(100, (item.minutes / maxScale) * 100);
              const metBenchmark = item.minutes >= (weeklyGoal.weeklyTargetMinutes / weeklyGoal.daysPerWeekTarget);

              return (
                <div key={idx} className="flex flex-col items-center h-full justify-end group">
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.minutes}m
                  </div>
                  <div className="w-full max-w-[40px] h-28 bg-slate-200 dark:bg-[#1d2133] rounded-t-lg relative flex items-end overflow-hidden">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        item.minutes === 0 
                          ? 'h-0' 
                          : metBenchmark 
                          ? 'bg-gradient-to-t from-emerald-600 to-emerald-400' 
                          : 'bg-gradient-to-t from-amber-500 to-amber-400'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <div className={`mt-2 text-xs font-mono font-bold ${item.isToday ? 'text-amber-500 underline underline-offset-4' : 'text-slate-600 dark:text-slate-400'}`}>
                    {item.label}
                  </div>
                  <div className="text-[9px] text-slate-400 font-mono">
                    {item.minutes > 0 ? `${item.minutes}m` : '—'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Practice Session Logger Form */}
        <form onSubmit={handleLogSession} className="p-5 rounded-xl bg-slate-50 dark:bg-[#141624] border border-slate-200 dark:border-[#24283c] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white">
                Log Today's Practice Session
              </h4>
            </div>
            {saveSuccessMsg && (
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
                ✓ {saveSuccessMsg}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono">Practice Date:</label>
              <input
                type="date"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
                className="w-full bg-white dark:bg-[#0c0d14] border border-slate-200 dark:border-[#272b3d] rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono">Duration (Minutes):</label>
              <div className="flex items-center gap-1.5">
                {[30, 45, 60, 90].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSessionMinutes(m)}
                    className={`px-2 py-1.5 rounded font-mono text-xs border ${
                      sessionMinutes === m
                        ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                        : 'bg-white dark:bg-[#0c0d14] border-slate-200 dark:border-[#272b3d] text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {m}m
                  </button>
                ))}
                <input
                  type="number"
                  min="5"
                  max="360"
                  value={sessionMinutes}
                  onChange={(e) => setSessionMinutes(Number(e.target.value))}
                  className="w-16 bg-white dark:bg-[#0c0d14] border border-slate-200 dark:border-[#272b3d] rounded-lg px-2 py-1.5 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-amber-500 text-center"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono">Focus Domain:</label>
              <select
                value={sessionCategory}
                onChange={(e) => setSessionCategory(e.target.value as any)}
                className="w-full bg-white dark:bg-[#0c0d14] border border-slate-200 dark:border-[#272b3d] rounded-lg px-2.5 py-2 text-slate-900 dark:text-white font-sans text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="Tone & Overtones">Tone & Overtones</option>
                <option value="Parker Bebop & Enclosures">Parker Bebop & Enclosures</option>
                <option value="Coltrane Changes">Coltrane Changes</option>
                <option value="Ellington Repertoire">Ellington Repertoire</option>
                <option value="Clarinet Doubling">Clarinet Doubling</option>
                <option value="Full Routine">Full Routine</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono">Instrument:</label>
              <select
                value={sessionInstrument}
                onChange={(e) => setSessionInstrument(e.target.value as any)}
                className="w-full bg-white dark:bg-[#0c0d14] border border-slate-200 dark:border-[#272b3d] rounded-lg px-2.5 py-2 text-slate-900 dark:text-white font-sans text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="Tenor Saxophone">Tenor Saxophone</option>
                <option value="Bb Clarinet">Bb Clarinet</option>
                <option value="Both">Both (Tenor + Clarinet)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono text-xs">Technical Notes & Observations for Bob Hackett:</label>
            <input
              type="text"
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="e.g. Worked on altissimo F# fingering, matching low Bb overtone against drone, Cottontail bridge tempo..."
              className="w-full bg-white dark:bg-[#0c0d14] border border-slate-200 dark:border-[#272b3d] rounded-lg px-3 py-2 text-slate-900 dark:text-white font-sans text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingSession}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Save Practice Session to Firestore Log</span>
          </button>
        </form>

        {/* Practice History Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900 dark:text-white font-mono">Recent Logged Sessions ({practiceSessions.length})</span>
            <span className="text-slate-400 text-[11px] font-mono">Saved in Firestore & Local Studio Vault</span>
          </div>

          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {practiceSessions.slice(0, 10).map((session) => (
              <div
                key={session.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-[#141624] border border-slate-200 dark:border-[#222535] flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold font-mono text-[11px]">
                    {session.minutes} min
                  </span>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {session.focusCategory} · <span className="text-slate-500 dark:text-slate-400 font-normal">{session.instrument}</span>
                    </div>
                    {session.notes && (
                      <div className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1 italic">
                        &ldquo;{session.notes}&rdquo;
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-mono text-slate-400">
                    {session.date}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteSession(session.id)}
                    className="text-slate-400 hover:text-red-500 p-1"
                    title="Delete session"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Practice Room Interactive Audio Deck (Metronome + Drone) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Tool 1: Swing Metronome (Ellington / Bebop Pocket) */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-[#272c40] bg-white dark:bg-[#12141f] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white">Jazz Swing Metronome</h4>
            </div>
            <button
              onClick={handleSwingToggle}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors border ${
                isSwingFeel
                  ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40 font-bold'
                  : 'bg-slate-100 dark:bg-[#1a1d2c] text-slate-600 dark:text-slate-400 border-slate-300 dark:border-[#2a2f44]'
              }`}
            >
              {isSwingFeel ? 'Swing 2 & 4 Accent' : 'Straight 4/4'}
            </button>
          </div>

          {/* Visual Beat Indicator */}
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((b) => {
              const isCurrent = isMetronomeActive && currentBeat === b;
              const isAccentBeat = isSwingFeel ? (b === 1 || b === 3) : (b === 0);
              return (
                <div
                  key={b}
                  className={`h-9 rounded flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-amber-500 text-slate-950 scale-105 shadow-md'
                      : isAccentBeat
                      ? 'bg-amber-500/10 dark:bg-[#1b1e2c] text-amber-700 dark:text-amber-300 border border-amber-500/30'
                      : 'bg-slate-100 dark:bg-[#151724] text-slate-400'
                  }`}
                >
                  Beat {b + 1}
                </div>
              );
            })}
          </div>

          {/* BPM Slider and Controller */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500 dark:text-slate-400">Tempo:</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">{metronomeBpm} <span className="text-xs text-slate-400">BPM</span></span>
            </div>
            <input
              type="range"
              min="50"
              max="280"
              value={metronomeBpm}
              onChange={(e) => handleBpmChange(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>54 (Ballad)</span>
              <span>160 (Medium Swing)</span>
              <span>230 (Cottontail)</span>
              <span>260+ (Cherokee)</span>
            </div>
          </div>

          <button
            onClick={toggleMetronome}
            className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isMetronomeActive
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-md'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs'
            }`}
          >
            {isMetronomeActive ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Stop Metronome</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Start Swing Click</span>
              </>
            )}
          </button>
        </div>

        {/* Tool 2: Acoustic Overtone Tuning Drone */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-[#272c40] bg-white dark:bg-[#12141f] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-500" />
              <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white">Concert Pitch Tuning Drone</h4>
            </div>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">Harmonic Rich Sound</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            Sustains rich acoustic sine + 2nd/3rd harmonics for overtone voicing and pitch centering:
          </p>

          {/* Pitch Selector Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {(['Bb', 'F', 'C', 'Eb'] as const).map((p) => {
              const isSelected = dronePitch === p;
              return (
                <button
                  key={p}
                  onClick={() => handleDronePitchChange(p)}
                  className={`p-2.5 rounded-lg text-center transition-all border ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500 font-bold shadow-xs'
                      : 'bg-slate-50 dark:bg-[#151724] border-slate-200 dark:border-[#222533] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="text-sm font-bold font-mono">Concert {p}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {p === 'Bb' ? 'Tenor C' : p === 'F' ? 'Tenor G' : p === 'C' ? 'Tenor D' : 'Tenor F'}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#0f111a] border border-slate-200 dark:border-[#222638] text-[11px] text-slate-600 dark:text-slate-300">
            <strong className="text-amber-600 dark:text-amber-400">Pedagogical Note for Mason: </strong>
            Play low Bb, B, or middle C on Tenor against the drone. Match pitch center until beating stops, then blow overtones without octave key.
          </div>

          <button
            onClick={toggleDrone}
            className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isDroneActive
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-md'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xs'
            }`}
          >
            {isDroneActive ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Silence Drone</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Sound Concert {dronePitch} Drone</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Main Itinerary Modules & Clarinet Codex */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Columns: Customized Practice Blocks */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#12141f] space-y-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-[#1f2334] pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 font-semibold">
                  Agoura High Conservatory Regimen · {itinerary?.totalMinutes || selectedDuration} Minutes
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mt-0.5">
                  {itinerary?.title || `${selectedDuration}-Minute Masterclass Routine`}
                </h3>
                <p className="text-xs text-amber-700 dark:text-amber-200/90 italic font-serif mt-1">
                  &ldquo;{itinerary?.dailyMotto || "Tone is the mirror of the soul; technique is the freedom to express it."}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const nextVal = !includeClarinet;
                    setIncludeClarinet(nextVal);
                    generateRoutine(selectedDuration, nextVal);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs border font-medium transition-colors ${
                    includeClarinet
                      ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40'
                      : 'bg-slate-100 dark:bg-[#171926] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#272b3c]'
                  }`}
                >
                  {includeClarinet ? 'Clarinet Doubling: Included' : 'Clarinet Doubling: Off'}
                </button>
              </div>
            </div>

            {/* Time Blocks */}
            <div className="space-y-4">
              {itinerary?.blocks.map((block, bIdx) => (
                <div
                  key={bIdx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-[#252a3d] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
                        {block.minutes} min
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white font-display">
                        {block.section}
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {block.instrument}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    <strong className="text-slate-500 dark:text-slate-400">Goal: </strong>{block.goals}
                  </p>

                  <div className="space-y-2 pt-1">
                    {block.exercises.map((ex, eIdx) => {
                      const exKey = `${bIdx}-${eIdx}`;
                      const isDone = !!completedExercises[exKey];
                      return (
                        <div
                          key={eIdx}
                          onClick={() => toggleCheckExercise(exKey)}
                          className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                            isDone
                              ? 'bg-slate-100 dark:bg-[#10121a] border-emerald-500/40 text-slate-400 line-through'
                              : 'bg-white dark:bg-[#1c2030] border-slate-200 dark:border-[#292f44] text-slate-800 dark:text-slate-200 hover:border-amber-500/40'
                          }`}
                        >
                          <button
                            type="button"
                            className="mt-0.5 text-amber-500 shrink-0"
                          >
                            {isDone ? <CheckSquare className="w-4 h-4 text-emerald-500" /> : <Square className="w-4 h-4" />}
                          </button>
                          <div className="flex-1 space-y-0.5">
                            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-[12px]">
                              <span>{ex.name}</span>
                              <span className="font-mono text-amber-600 dark:text-amber-300 text-[11px] font-normal">{ex.tempo}</span>
                            </div>
                            <div className="text-slate-600 dark:text-slate-300 text-[11px]">{ex.description}</div>
                            {ex.notes && (
                              <div className="text-slate-400 text-[10px] italic">{ex.notes}</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right 5 Columns: Clarinet Doubling Codex */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Clarinet Doubling Emergency Reset Box */}
          <div className="p-5 rounded-2xl border border-amber-500/40 bg-white dark:bg-[#161825] space-y-4 shadow-xs">
            <div className="flex items-center gap-2">
              <Feather className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white">
                10-Second Clarinet Doubling Reset
              </h4>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              When Bob Hackett signals a fast switch from Tenor to Bb Clarinet in Studio Jazz, execute this immediate physical reset:
            </p>

            <div className="space-y-2 text-xs">
              {CLARINET_DOUBLING_GUIDE.emergencyTenSecondReset.map((step, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#10121b] border border-slate-200 dark:border-[#232738] text-slate-700 dark:text-slate-200 text-[11px]">
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Pitfalls & Mechanics Comparison */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#12141f] space-y-4 shadow-xs">
            <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Tenor vs. Clarinet Physics</span>
            </h4>

            <div className="space-y-3 text-xs">
              {CLARINET_DOUBLING_GUIDE.tenorVsClarinetComparisons.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-[#24283b] space-y-1.5">
                  <div className="font-bold text-amber-600 dark:text-amber-400 font-mono text-[11px]">
                    {item.parameter}
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 text-[11px]">
                    <strong className="text-slate-500 dark:text-slate-400">Tenor: </strong>{item.tenorSax}
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 text-[11px]">
                    <strong className="text-slate-500 dark:text-slate-400">Clarinet: </strong>{item.bbClarinet}
                  </div>
                  <div className="text-amber-800 dark:text-amber-200/90 text-[10px] italic pt-1 border-t border-slate-200 dark:border-[#202436]">
                    <strong>Trap: </strong>{item.pitfall}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
