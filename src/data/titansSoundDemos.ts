import { FacultySoundDemo } from '../types/masterclass';
import { NOTE_FREQUENCIES } from '../utils/audioEngine';

export const TITAN_SOUND_DEMOS: Record<string, FacultySoundDemo> = {
  hawkins: {
    title: "Body and Soul 9th-to-11th Arpeggio Ascent",
    concept: "Outlining vertical chord extensions (9th, #11, 13th) over dominant harmony without stating the root",
    notes: [
      { noteName: 'Eb4', durationMs: 400, freq: NOTE_FREQUENCIES['Eb4'] },
      { noteName: 'G4', durationMs: 400, freq: NOTE_FREQUENCIES['G4'] },
      { noteName: 'Bb4', durationMs: 400, freq: NOTE_FREQUENCIES['Bb4'] },
      { noteName: 'Db5', durationMs: 450, freq: NOTE_FREQUENCIES['Db5'] },
      { noteName: 'F5', durationMs: 500, freq: NOTE_FREQUENCIES['F5'] },
      { noteName: 'A5', durationMs: 700, freq: NOTE_FREQUENCIES['A5'] }
    ],
    pedagogyAdvice: "Notice how Bean skips the root on the attack and lands on the high 9th (F) and #11 (A) to achieve that signature weightless harmonic levitation."
  },
  young: {
    title: "Lester Leaps In False-Fingering Swing Cell",
    concept: "Horizontal floating swing feel using side-C and regular C alternating timbres",
    notes: [
      { noteName: 'C4', durationMs: 250, freq: NOTE_FREQUENCIES['C4'] },
      { noteName: 'D4', durationMs: 250, freq: NOTE_FREQUENCIES['D4'] },
      { noteName: 'F4', durationMs: 250, freq: NOTE_FREQUENCIES['F4'] },
      { noteName: 'D4', durationMs: 250, freq: NOTE_FREQUENCIES['D4'] },
      { noteName: 'C4', durationMs: 300, freq: NOTE_FREQUENCIES['C4'] },
      { noteName: 'Bb3', durationMs: 600, freq: NOTE_FREQUENCIES['Bb3'] }
    ],
    pedagogyAdvice: "Prez's secret: Keep your tongue feather-light. Swing by alternating timbres on repeated notes rather than punching the reed."
  },
  webster: {
    title: "Cottontail Downbeat Punch & Sub-tone Drop",
    concept: "Punchy downbeat swing attack dropping down into deep acoustic sub-tone resonance",
    notes: [
      { noteName: 'F4', durationMs: 350, freq: NOTE_FREQUENCIES['F4'] },
      { noteName: 'D4', durationMs: 300, freq: NOTE_FREQUENCIES['D4'] },
      { noteName: 'Bb3', durationMs: 350, freq: NOTE_FREQUENCIES['Bb3'] },
      { noteName: 'F3', durationMs: 400, freq: NOTE_FREQUENCIES['F3'] },
      { noteName: 'D3', durationMs: 450, freq: NOTE_FREQUENCIES['D3'] },
      { noteName: 'Bb2', durationMs: 900, freq: NOTE_FREQUENCIES['Bb2'] }
    ],
    pedagogyAdvice: "Drop the lower jaw back slightly as you descend past low D down to low Bb. Let the warm air envelope the reed to get Ben Webster's velvet buzz."
  },
  gordon: {
    title: "Cheesecake Minor Blues Chromatic Enclosure",
    concept: "Targeting the minor 3rd from a half-step above and chromatic half-step below, laid back in the pocket",
    notes: [
      { noteName: 'D4', durationMs: 280, freq: NOTE_FREQUENCIES['D4'] },
      { noteName: 'C#4', durationMs: 280, freq: NOTE_FREQUENCIES['C#4'] },
      { noteName: 'D4', durationMs: 280, freq: NOTE_FREQUENCIES['D4'] },
      { noteName: 'Eb4', durationMs: 320, freq: NOTE_FREQUENCIES['Eb4'] },
      { noteName: 'F#4', durationMs: 300, freq: NOTE_FREQUENCIES['F#4'] },
      { noteName: 'G4', durationMs: 700, freq: NOTE_FREQUENCIES['G4'] }
    ],
    pedagogyAdvice: "Laying back: play this cell as if it sits 20 milliseconds behind the drummer's pulse. Never rush into the resolution G."
  },
  rollins: {
    title: "St. Thomas Motivic Inversion & Rhythmic Cell",
    concept: "Calypso 3-note diatonic cell inverted across the barline with staccato precision",
    notes: [
      { noteName: 'G4', durationMs: 220, freq: NOTE_FREQUENCIES['G4'] },
      { noteName: 'E4', durationMs: 220, freq: NOTE_FREQUENCIES['E4'] },
      { noteName: 'C4', durationMs: 300, freq: NOTE_FREQUENCIES['C4'] },
      { noteName: 'E4', durationMs: 220, freq: NOTE_FREQUENCIES['E4'] },
      { noteName: 'G4', durationMs: 300, freq: NOTE_FREQUENCIES['G4'] },
      { noteName: 'C5', durationMs: 500, freq: NOTE_FREQUENCIES['C5'] }
    ],
    pedagogyAdvice: "Rollins treats the tenor like a steel drum. Crisp tip-of-the-tongue articulation and pure motivic symmetry."
  },
  coltrane: {
    title: "Giant Steps Coltrane 3-Key Major Thirds Permutation",
    concept: "Digital 1-2-3-5 patterns cycling down major thirds: B -> G -> Eb",
    notes: [
      { noteName: 'B3', durationMs: 200, freq: NOTE_FREQUENCIES['B3'] },
      { noteName: 'D#4', durationMs: 200, freq: NOTE_FREQUENCIES['D#4'] },
      { noteName: 'F#4', durationMs: 200, freq: NOTE_FREQUENCIES['F#4'] },
      { noteName: 'G3', durationMs: 200, freq: NOTE_FREQUENCIES['G3'] },
      { noteName: 'B3', durationMs: 200, freq: NOTE_FREQUENCIES['B3'] },
      { noteName: 'D4', durationMs: 200, freq: NOTE_FREQUENCIES['D4'] },
      { noteName: 'Eb3', durationMs: 200, freq: NOTE_FREQUENCIES['Eb3'] },
      { noteName: 'G3', durationMs: 200, freq: NOTE_FREQUENCIES['G3'] },
      { noteName: 'Bb3', durationMs: 500, freq: NOTE_FREQUENCIES['Bb3'] }
    ],
    pedagogyAdvice: "Trane's 'sheets of sound': maintain equal acoustic density on every single note. Do not let lower roots get swallowed."
  },
  getz: {
    title: "Girl from Ipanema Lyrical Breath Sub-Tone",
    concept: "Cool West Coast dry tone with delayed terminal vibrato",
    notes: [
      { noteName: 'F4', durationMs: 400, freq: NOTE_FREQUENCIES['F4'] },
      { noteName: 'G4', durationMs: 350, freq: NOTE_FREQUENCIES['G4'] },
      { noteName: 'A4', durationMs: 400, freq: NOTE_FREQUENCIES['A4'] },
      { noteName: 'C5', durationMs: 450, freq: NOTE_FREQUENCIES['C5'] },
      { noteName: 'D5', durationMs: 500, freq: NOTE_FREQUENCIES['D5'] },
      { noteName: 'C5', durationMs: 800, freq: NOTE_FREQUENCIES['C5'] }
    ],
    pedagogyAdvice: "Voice the throat vowel 'OH' like singing softly. Start with zero vibrato, allowing it to bloom only in the final third of the note."
  },
  shorter: {
    title: "Infant Eyes Quartal Mystery Interval Leap",
    concept: "Ascending stacked fourths creating floating modern modal space",
    notes: [
      { noteName: 'E4', durationMs: 350, freq: NOTE_FREQUENCIES['E4'] },
      { noteName: 'A4', durationMs: 350, freq: NOTE_FREQUENCIES['A4'] },
      { noteName: 'D5', durationMs: 400, freq: NOTE_FREQUENCIES['D5'] },
      { noteName: 'G5', durationMs: 450, freq: NOTE_FREQUENCIES['G5'] },
      { noteName: 'F#5', durationMs: 700, freq: NOTE_FREQUENCIES['F#5'] }
    ],
    pedagogyAdvice: "Wayne creates cinematic mystery. Don't rush to resolve; let the suspended fourth interval hang in the acoustic space."
  },
  henderson: {
    title: "Inner Urge Chromatic Side-Slip Phrase",
    concept: "Pentatonic cell shifted up a half-step for outside tension, cleanly snapping back inside",
    notes: [
      { noteName: 'F4', durationMs: 200, freq: NOTE_FREQUENCIES['F4'] },
      { noteName: 'Ab4', durationMs: 200, freq: NOTE_FREQUENCIES['Ab4'] },
      { noteName: 'Bb4', durationMs: 200, freq: NOTE_FREQUENCIES['Bb4'] },
      { noteName: 'F#4', durationMs: 220, freq: NOTE_FREQUENCIES['F#4'] },
      { noteName: 'A4', durationMs: 220, freq: NOTE_FREQUENCIES['A4'] },
      { noteName: 'B4', durationMs: 220, freq: NOTE_FREQUENCIES['B4'] },
      { noteName: 'F4', durationMs: 300, freq: NOTE_FREQUENCIES['F4'] },
      { noteName: 'C5', durationMs: 600, freq: NOTE_FREQUENCIES['C5'] }
    ],
    pedagogyAdvice: "When side-slipping up a half-step, play with fierce rhythmic conviction. Indecision sounds like a mistake; total confidence sounds like genius."
  },
  brecker: {
    title: "Altissimo F# to 4th Octave Overtone Surge",
    concept: "High tongue larynx voicing ('EE') into front-F altissimo harmonics (F#5, G5, A5, C6)",
    notes: [
      { noteName: 'F5', durationMs: 250, freq: NOTE_FREQUENCIES['F5'] },
      { noteName: 'F#5', durationMs: 250, freq: NOTE_FREQUENCIES['F#5'] },
      { noteName: 'G5', durationMs: 250, freq: NOTE_FREQUENCIES['G5'] },
      { noteName: 'A5', durationMs: 300, freq: NOTE_FREQUENCIES['A5'] },
      { noteName: 'C6', durationMs: 700, freq: NOTE_FREQUENCIES['C6'] }
    ],
    pedagogyAdvice: "Brecker's physics rule: Never bite down with the lower jaw to reach altissimo. Raise the back of your tongue toward the upper molars and push air from the diaphragm."
  },
  adjudicator: {
    title: "Lincoln Center Guide-Tone Resolution Benchmark",
    concept: "Essential 3rd-to-7th resolution across ii-V-I: F (Dm7 3rd) -> E (Cmaj7 3rd)",
    notes: [
      { noteName: 'D4', durationMs: 250, freq: NOTE_FREQUENCIES['D4'] },
      { noteName: 'F4', durationMs: 300, freq: NOTE_FREQUENCIES['F4'] },
      { noteName: 'A4', durationMs: 250, freq: NOTE_FREQUENCIES['A4'] },
      { noteName: 'B4', durationMs: 300, freq: NOTE_FREQUENCIES['B4'] },
      { noteName: 'D5', durationMs: 250, freq: NOTE_FREQUENCIES['D5'] },
      { noteName: 'F4', durationMs: 300, freq: NOTE_FREQUENCIES['F4'] },
      { noteName: 'E4', durationMs: 750, freq: NOTE_FREQUENCIES['E4'] }
    ],
    pedagogyAdvice: "In an audition, hitting the 3rd of the tonic right on beat 1 with centered pitch is what separates scholarship recipients from rejected applicants."
  },
  studio_chair: {
    title: "Tenor-to-Clarinet 10-Second Embouchure Calibrator",
    concept: "Tuning acoustic fifths across register breaks to stabilize firm lower lip cushion",
    notes: [
      { noteName: 'G3', durationMs: 400, freq: NOTE_FREQUENCIES['G3'] },
      { noteName: 'D4', durationMs: 400, freq: NOTE_FREQUENCIES['D4'] },
      { noteName: 'G4', durationMs: 450, freq: NOTE_FREQUENCIES['G4'] },
      { noteName: 'D5', durationMs: 450, freq: NOTE_FREQUENCIES['D5'] },
      { noteName: 'G5', durationMs: 800, freq: NOTE_FREQUENCIES['G5'] }
    ],
    pedagogyAdvice: "Director Bob Hackett's doubling rule: Pull the chin flat and point it downward. Keep corners firm so the clarinet throat tones don't sag."
  }
};
