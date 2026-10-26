import { CorePillarConfig, CorePillarId } from '../types/masterclass';

export const CORE_PILLARS_CONFIG: Record<CorePillarId, CorePillarConfig> = {
  tone_overtones: {
    id: 'tone_overtones',
    name: "Tone & Overtone Production",
    shortLabel: "Tone & Overtones",
    legend: "Coltrane & Ben Webster",
    colorHex: "#f59e0b",
    badgeBg: "bg-amber-500/15",
    badgeText: "text-amber-500 dark:text-amber-400",
    borderHex: "border-amber-500/40",
    targetWeeklyHours: 2.0,
    description: "Long tones, low Bb overtone matching against concert drone, throat voicing ('OH' vowel), and sub-tone whisper control."
  },
  parker_bebop: {
    id: 'parker_bebop',
    name: "Parker Bebop Architecture & Enclosures",
    shortLabel: "Bebop & Enclosures",
    legend: "Charlie 'Bird' Parker",
    colorHex: "#06b6d4",
    badgeBg: "bg-cyan-500/15",
    badgeText: "text-cyan-600 dark:text-cyan-400",
    borderHex: "border-cyan-500/40",
    targetWeeklyHours: 2.5,
    description: "3-to-9 arpeggio resolutions over ii-V-I, chromatic half-step enclosures, bebop scales, and off-beat swing articulation."
  },
  coltrane_changes: {
    id: 'coltrane_changes',
    name: "Coltrane Harmonic Systems & 3-Key Cycles",
    shortLabel: "Coltrane Cycles",
    legend: "John Coltrane",
    colorHex: "#a855f7",
    badgeBg: "bg-purple-500/15",
    badgeText: "text-purple-600 dark:text-purple-400",
    borderHex: "border-purple-500/40",
    targetWeeklyHours: 1.5,
    description: "Major thirds relationship permutations (Giant Steps cycle), digital 1-2-3-5 patterns, and pentatonic substitutions."
  },
  ellington_repertoire: {
    id: 'ellington_repertoire',
    name: "Essentially Ellington Repertoire & Lead Tenor",
    shortLabel: "Ellington Charts",
    legend: "Paul Gonsalves & Bob Hackett",
    colorHex: "#10b981",
    badgeBg: "bg-emerald-500/15",
    badgeText: "text-emerald-600 dark:text-emerald-400",
    borderHex: "border-emerald-500/40",
    targetWeeklyHours: 2.0,
    description: "Authentic Ellington swing literature (Cottontail, Warm Valley), lead tenor projection, section blend, and ballad storytelling."
  },
  clarinet_doubling: {
    id: 'clarinet_doubling',
    name: "Bb Clarinet Doubling Maintenance",
    shortLabel: "Clarinet Doubling",
    legend: "Dan Higgins & Sal Lozano",
    colorHex: "#f43f5e",
    badgeBg: "bg-rose-500/15",
    badgeText: "text-rose-600 dark:text-rose-400",
    borderHex: "border-rose-500/40",
    targetWeeklyHours: 1.0,
    description: "10-second rapid horn swap, throat-register pitch centering (G, G#, A, Bb), pointed chin embouchure calibration."
  },
  transcription_sightreading: {
    id: 'transcription_sightreading',
    name: "Transcription & Sight-Reading Mastery",
    shortLabel: "Transcription",
    legend: "Dexter Gordon & Juilliard Jury",
    colorHex: "#6366f1",
    badgeBg: "bg-indigo-500/15",
    badgeText: "text-indigo-600 dark:text-indigo-400",
    borderHex: "border-indigo-500/40",
    targetWeeklyHours: 1.5,
    description: "By-ear horn transcription of classic solos, sight-reading big band charts, and guide tone voice leading tests."
  }
};

export const CORE_PILLARS_LIST = Object.values(CORE_PILLARS_CONFIG);
