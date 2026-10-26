export type TenorMasterId = 
  | 'hawkins'
  | 'young'
  | 'webster'
  | 'gordon'
  | 'rollins'
  | 'coltrane'
  | 'getz'
  | 'shorter'
  | 'henderson'
  | 'brecker'
  | 'adjudicator'
  | 'studio_chair';

export interface TenorTitan {
  id: TenorMasterId;
  name: string;
  moniker: string;
  era: string;
  category: 'Tenor Legend' | 'Adjudication & College Scout' | 'Career & Studio Director';
  soundPhilosophy: string;
  whyMasonMustStudy: string;
  imageAsset?: string;
  famousWorks: Array<{
    title: string;
    albumOrSession: string;
    year: string;
    youtubeQuery: string;
    musicalHighlight: string;
  }>;
  famousQuote: string;
  quoteSource: string;
  technicalKeynote: string;
  facultySoundDemo?: FacultySoundDemo;
}

export interface CollegeCareerOutcome {
  primaryRoles: string[];
  typicalEmployersOrGigs: string[];
  estimatedSalaryRange: string;
  midCareerPotential: string;
  industryDescription: string;
}

export interface CollegeAuditionProfile {
  id: string;
  schoolName: string;
  divisionOrCollege: string;
  location: string;
  programType: 'Conservatory' | 'University School of Music' | 'Contemporary College';
  officialWebsite: string;
  auditionPortalUrl: string;
  eduUrl: string;
  musicDeptUrl: string;
  imageBanner?: string;
  degreesOffered: string[];
  facultyHighlights: string[];
  acceptanceRate: string;
  scholarshipReality: string;
  prescreeningRequirements: string[];
  liveAuditionFormat: string[];
  careerOutcomes: CollegeCareerOutcome;
  redditApplicantIntel: {
    roomAtmosphere: string;
    tempoTrap: string;
    sightReadingReality: string;
    theInterviewVibe: string;
    communityTip: string;
  };
}

export interface AgouraAlum {
  id: string;
  name: string;
  gradYear?: string;
  instrumentOrSpecialty: string;
  agouraLegacyRole: string;
  notableCredits: string[];
  careerSummary: string;
  directAdviceForMason: string;
}

export type CorePillarId = 
  | 'tone_overtones'
  | 'parker_bebop'
  | 'coltrane_changes'
  | 'ellington_repertoire'
  | 'clarinet_doubling'
  | 'transcription_sightreading';

export interface CorePillarConfig {
  id: CorePillarId;
  name: string;
  shortLabel: string;
  legend: string;
  colorHex: string;
  badgeBg: string;
  badgeText: string;
  borderHex: string;
  targetWeeklyHours: number;
  description: string;
}

export interface DailyPillarLog {
  id: string; // e.g. "pillar_2026-10-26"
  date: string; // YYYY-MM-DD
  studentUid: string;
  pillarHours: Record<CorePillarId, number>; // Hours spent per pillar on this date
  totalHours: number;
  notes?: string;
  updatedAt: string;
}

export interface PracticeSessionRecord {
  id: string;
  studentUid: string;
  date: string; // YYYY-MM-DD
  minutes: number;
  focusCategory: 'Tone & Overtones' | 'Parker Bebop & Enclosures' | 'Coltrane Changes' | 'Ellington Repertoire' | 'Clarinet Doubling' | 'Full Routine' | 'Transcription & Sight-Reading';
  instrument: 'Tenor Saxophone' | 'Bb Clarinet' | 'Both';
  notes?: string;
  createdAt: string;
}

export interface PracticeGoalRecord {
  id: string;
  studentUid: string;
  weeklyTargetMinutes: number;
  daysPerWeekTarget: number;
  updatedAt: string;
}

export interface SoundDemoNote {
  noteName: string;
  durationMs: number;
  freq: number;
}

export interface FacultySoundDemo {
  title: string;
  concept: string;
  notes: SoundDemoNote[];
  pedagogyAdvice: string;
}

export interface JazzArticleLesson {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  readingMinutes: number;
  wordCount: number;
  historicalCitation: string;
  sourceUrl?: string;
  leadQuote: {
    quote: string;
    speaker: string;
    context: string;
  };
  articleBody: string[];
  homeworkAssignment: {
    title: string;
    tempoTarget: string;
    focusNotes: string;
    steps: string[];
  };
}

export interface SavedRecordingTake {
  id: string;
  timestamp: number;
  dateFormatted: string;
  tuneTitle: string;
  key: string;
  tempo: string;
  durationSeconds: number;
  mediaType?: 'audio' | 'video';
  mediaBlobUrl?: string;
  audioBlobUrl?: string;
  audioBase64?: string;
  mimeType: string;
  studentNotes: string;
  scorecard?: AdjudicationScorecard;
  firebaseSaved?: boolean;
}

export interface AdjudicationScorecard {
  tuneTitle: string;
  overallScore: number;
  divisionRating: string;
  categories: {
    toneAndIntonation: {
      score: number;
      critique: string;
      specificFix: string;
    };
    timeFeelAndRhythm: {
      score: number;
      critique: string;
      specificFix: string;
    };
    harmonicLanguage: {
      score: number;
      critique: string;
      specificFix: string;
    };
    stagePresenceAndExpressiveness: {
      score: number;
      critique: string;
      specificFix: string;
    };
  };
  timestampCritiques: Array<{
    time: string;
    observation: string;
    facultyAdvice: string;
  }>;
  prescreeningReadiness: {
    juilliardMSMScore: string;
    essentiallyEllingtonRank: string;
    topPriorityForBobHackettRehearsal: string;
  };
  customPracticePrescription: Array<{
    exercise: string;
    routine: string;
    targetBpm: string;
  }>;
}

export interface PracticeBlock {
  minutes: number;
  section: string;
  instrument: 'Tenor Saxophone' | 'Bb Clarinet' | 'Both';
  goals: string;
  exercises: Array<{
    name: string;
    description: string;
    tempo: string;
    notes: string;
  }>;
}

export interface PracticeItinerary {
  totalMinutes: number;
  title: string;
  dailyMotto: string;
  blocks: PracticeBlock[];
}

export interface EllingtonTune {
  id: string;
  title: string;
  year: string;
  composer: string;
  leadTenorLegend: string;
  tempoBpm: number;
  keyConcert: string;
  keyTenor: string;
  style: string;
  historicalContext: string;
  soloFocus: string[];
  recommendedListen: string;
  searchQuery: string;
  prescreeningSuitability: string;
}

export interface HarmonicLick {
  id: string;
  title: string;
  sourceMaster: 'Charlie Parker' | 'John Coltrane' | 'Dexter Gordon' | 'Duke Ellington';
  chordContext: string;
  concertNotes: string;
  tenorNotes: string;
  altoNotes: string;
  harmonicConcept: string;
  pedagogicalTip: string;
}


export type FacultyId = TenorMasterId;

export interface FacultyMember {
  id: FacultyId;
  name: string;
  moniker: string;
  era: string;
  specialty: string;
  quote: string;
  avatarSeed: string;
  tenorPraise: string;
  keyTopics: string[];
}
