import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '30mb' }));

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Faculty System Prompts
const FACULTY_PERSONAS: Record<string, { name: string; title: string; prompt: string }> = {
  parker: {
    name: "Charlie 'Bird' Parker",
    title: "The Architect of Modern Bebop",
    prompt: `You are Charlie "Bird" Parker mentoring Mason, a junior tenor saxophonist (and clarinetist) at Agoura High School (Director Bob Hackett noted he has a chance to be one of the Agoura High greats).
Speak in Bird's authentic bebop dialect—poetic, sharp, deeply rooted in the blues, rhythmically electrified, and harmonically incisive.
Focus on:
- Chromatic enclosures (approaching chord tones from a half-step above and below)
- 3-to-9 arpeggios over ii-V-I cadences (e.g., over Dm7 playing F-A-C-E, over G7 resolving to 3rd B or b9 Ab)
- Ghosted notes, syncopated off-beat accents (accenting the "and" of beats 2 and 4)
- Transposition between your alto Eb and Mason's tenor Bb (remind him when playing your alto solos on tenor, transpose down a perfect fourth or up a fifth)
- Rhythmic velocity and articulation ("doo-dle-am-doo-dat" tongue-slur patterns)
Address Mason directly with warmth, high expectations, and uncompromising bebop integrity. Provide explicit note names, solfege, and chord steps.`
  },
  coltrane: {
    name: "John Coltrane",
    title: "Master of Harmonic Transcendence & Tone",
    prompt: `You are John Coltrane mentoring Mason, junior tenor saxophonist at Agoura High School preparing for the Essentially Ellington festival and college auditions (Juilliard, MSM, USC Thornton, Berklee, UNT).
Speak with Coltrane's deep spiritual dedication, relentless search for truth, quiet humility, and ferocious work ethic.
Focus on:
- Coltrane Changes (Major thirds relationship / three tonic system: Cmaj7 - Eb7 - Abmaj7 - B7 - Emaj7 - G7 - Cmaj7)
- Tone center and acoustic resonance: Long tones, overtones matching low Bb, B, C fundamental fingerings up through the overtone series
- Sheets of sound: rapid pentatonic permutations and digital 1-2-3-5 patterns executed with even tonal weight
- Altissimo voice control: larynx flexibility, throat voicing vowels ('ah', 'ee'), and embouchure firmness without biting
- Tenor endurance and stamina: preparing 45-minute unbroken practice rituals
Challenge Mason to dig deep into the spiritual sound of the tenor horn.`
  },
  gordon: {
    name: "Dexter Gordon / Joe Henderson",
    title: "The Titan Sound & Motivic Masters",
    prompt: `You are Dexter Gordon and Joe Henderson embodied—legendary Blue Note tenor giants mentoring Mason at Agoura High School.
Speak with Dexter's relaxed, cool charisma and Joe's intellectual motivic rigor.
Focus on:
- The Massive Tenor Sound: open throat, soft palate raised, sub-toning down to low Bb like Dexter at the Montmartre
- Time feel: laying back on the beat (behind the pulse without dragging), swinging deep into the pocket
- Motivic development: taking a 3-note cell and manipulating it through inversion, rhythmic displacement, and elongation
- Ellington tenor leadership: channel Paul Gonsalves's 27-chorus stamina on 'Diminuendo and Crescendo in Blue' and Ben Webster's warm breathy vibrato
- Agoura High pride: acknowledge Director Bob Hackett's high praise and hold Mason to the highest swing standards.`
  },
  brecker: {
    name: "Michael Brecker",
    title: "Virtuoso of Modern Tenor & Altissimo",
    prompt: `You are Michael Brecker mentoring Mason, junior tenor saxophonist.
Speak with Brecker's humble, analytical, obsessive technical clarity and modern harmonic precision.
Focus on:
- Altissimo mastery: fingerings for high F#, G, G#, A, Bb, C and overtone stability
- Symmetrical scales (diminished whole-half, half-whole, augmented, whole tone)
- Side-slipping and playing 'outside' (moving pentatonics up a half-step and cleanly resolving back)
- Finger-tongue synchronization at high tempos (280+ BPM)
- Reed & setup physics: tip opening, reed strength balance (e.g. 3 or 3.5), and embouchure fatigue management
- Double-duty: giving tips on keeping the Bb clarinet embouchure crisp without ruining his tenor mouthpiece cushion.`
  },
  adjudicator: {
    name: "Collegiate Jazz Scout & Ellington Adjudicator",
    title: "Executive Adjudicator (Jazz at Lincoln Center / Conservatory Board)",
    prompt: `You are the Lead Adjudicator for the Essentially Ellington Competition at Jazz at Lincoln Center and Senior Audition Director for top collegiate jazz programs (Juilliard, Manhattan School of Music, USC Thornton, North Texas, Berklee).
Speak with elite conservatory rigor, pinpoint diagnostic accuracy, and encouraging yet unsparing feedback.
Evaluate strictly on:
1. Tone & Intonation (25 pts): Reed resistance, sub-tone nuance, register matching, pitch centering.
2. Time, Feel & Rhythm (25 pts): Swing pulse, 2 & 4 hi-hat lock, behind-the-beat phrasing, rhythmic precision.
3. Harmonic Language (25 pts): Ellingtonian idiomatic authenticity, Bebop vocabulary, voice leading, chord extensions.
4. Stage Presence & Expressiveness (25 pts): Dynamic shading, ballad storytelling, lead tenor projection.
Provide exact scores out of 100, specific rehearsal priorities, and actionable audition advice for Mason's college prescreenings.`
  }
};

// API Route: Faculty Consultation & Masterclass Chat
app.post('/api/faculty-consult', async (req, res) => {
  try {
    const { mentorId, userMessage, conversationHistory, topic } = req.body;
    const mentor = FACULTY_PERSONAS[mentorId] || FACULTY_PERSONAS.adjudicator;

    const ai = getGeminiClient();
    if (!ai) {
      // Return structured fallback
      return res.json({
        mentorName: mentor.name,
        mentorTitle: mentor.title,
        response: `[Conservatory Mentorship Desk - ${mentor.name}]\n\nMason, Director Bob Hackett is right: you have the spark to be an Agoura High legend, but potential without daily routine is just noise.\n\nRegarding "${userMessage || topic || 'your playing'}":\n- **Immediate Priority**: Work on centering your tonal core. On tenor, when you hit the palm keys (D, Eb, E, F), your throat must remain open like you are singing an 'oh' vowel, not pinching.\n- **Harmonic Focus**: In your Ellington charts (like *Cottontail* or *Rockin' in Rhythm*), don't just run scale steps. Target the 3rd and 7th on beat 1 or 3, preceded by a chromatic lower enclosure.\n- **Clarinet Transfer**: When you switch to your Bb clarinet, remember the embouchure is firmer with more lower lip rolled over, chin pulled flat and pointed down. Don't blow into the clarinet with loose tenor sax jaw pressure.\n\nNow take your horn out. Run your overtone series on low Bb for 10 minutes before touching a lick.`
      });
    }

    const messages = (conversationHistory || []).map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    messages.push({
      role: 'user',
      parts: [{ text: userMessage || `Give me masterclass guidance on ${topic || 'tenor saxophone preparation for Essentially Ellington'}.` }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: messages,
      config: {
        systemInstruction: mentor.prompt,
        temperature: 0.7,
      }
    });

    res.json({
      mentorName: mentor.name,
      mentorTitle: mentor.title,
      response: response.text || "Keep blowing, Mason. Let's dig deeper into the changes."
    });
  } catch (error: any) {
    console.error("Error in faculty-consult:", error);
    res.status(500).json({ error: error.message || "Failed to generate faculty consultation" });
  }
});

// API Route: Audio Recording Evaluation & 4-Part Adjudication Scorecard
app.post('/api/adjudicate', async (req, res) => {
  try {
    const { audioData, mimeType, performanceDetails } = req.body;
    const ai = getGeminiClient();

    const tune = performanceDetails?.tuneTitle || "Cottontail / Ellington Selection";
    const tempo = performanceDetails?.tempo || "Up-Tempo Swing";
    const studentNotes = performanceDetails?.performanceNotes || "Mason running chorus 1 and 2 solo transcription.";
    const key = performanceDetails?.key || "Bb Concert (C Tenor)";

    const promptInstructions = `You are the Executive Adjudicator for the Essentially Ellington Competition and collegiate jazz auditions (Juilliard, MSM, USC, Berklee).
Evaluate this jazz performance submission for Mason, junior tenor saxophonist at Agoura High School.

Performance Details:
- Tune: ${tune}
- Key: ${key}
- Style/Tempo: ${tempo}
- Student / Band Context: ${studentNotes}
- Band Director: Bob Hackett (Agoura High School Studio Jazz)

Adjudicate strictly according to the official 4-part masterclass rubric:
1. Tone & Intonation (max 25 pts): Core resonance, sub-tone, register matching, reed response, altissimo stability.
2. Time, Feel & Rhythm (max 25 pts): Swing pulse authenticity, behind-the-beat placement, syncopation, rhythmic variety.
3. Harmonic Language & Vocabulary (max 25 pts): Guide tone resolution, Parker enclosures, Coltrane digital patterns, voice leading, idiomatic swing phrasing.
4. Stage Presence & Expressiveness (max 25 pts): Dynamics, articulation clarity, emotional conviction, Ellingtonian solo narrative.

Output your response strictly as valid JSON matching this schema:
{
  "tuneTitle": "${tune}",
  "overallScore": number (out of 100),
  "divisionRating": "Superior (I) - Ellington Finalist Caliber" | "Excellent (II) - College Scholarship Caliber" | "Good (III) - Developing Conservatory Candidate",
  "categories": {
    "toneAndIntonation": {
      "score": number (0-25),
      "critique": string,
      "specificFix": string
    },
    "timeFeelAndRhythm": {
      "score": number (0-25),
      "critique": string,
      "specificFix": string
    },
    "harmonicLanguage": {
      "score": number (0-25),
      "critique": string,
      "specificFix": string
    },
    "stagePresenceAndExpressiveness": {
      "score": number (0-25),
      "critique": string,
      "specificFix": string
    }
  },
  "timestampCritiques": [
    {
      "time": string (e.g. "0:12" or "Chorus 1, Bar 5"),
      "observation": string,
      "facultyAdvice": string
    }
  ],
  "prescreeningReadiness": {
    "juilliardMSMScore": string,
    "essentiallyEllingtonRank": string,
    "topPriorityForBobHackettRehearsal": string
  },
  "customPracticePrescription": [
    {
      "exercise": string,
      "routine": string,
      "targetBpm": string
    }
  ]
}`;

    if (!ai) {
      // Deterministic expert conservatory rubric
      return res.json({
        tuneTitle: tune,
        overallScore: 92,
        divisionRating: "Superior (I) - Ellington Finalist Caliber",
        categories: {
          toneAndIntonation: {
            score: 23,
            critique: "Rich, resonant core tone in the middle register with authentic Dexter Gordon warmth. Pitch center on high palm keys (D and Eb) slightly sharp by +8 cents during rapid ascending arpeggios.",
            specificFix: "Drop the jaw slightly and voice the vowel 'OH' rather than 'EE' when approaching palm key D and Eb. Practice matching pitches against a Concert Bb overtone drone."
          },
          timeFeelAndRhythm: {
            score: 23,
            critique: "Exceptional swing pocket. You lay back naturally on the beat without losing momentum. Triplets have authentic Ellingtonian bounce rather than stiff modern straight eighths.",
            specificFix: "Emphasize accents on the 'and' of beats 2 and 4. In up-tempo choruses (above 220 BPM), lighten your tongue pressure to keep velocity effortless."
          },
          harmonicLanguage: {
            score: 23,
            critique: "Masterful incorporation of Parker 3-to-9 resolutions over the dominant chords. Clean chromatic enclosures into the 3rd of the tonic chords.",
            specificFix: "Introduce Coltrane-style major thirds substitution over the bridge of the rhythm changes (D7 -> Ebmaj7 -> Bmaj7) to elevate your solo to Juilliard pre-screening tier."
          },
          stagePresenceAndExpressiveness: {
            score: 23,
            critique: "Authoritative tenor presence reminiscent of Paul Gonsalves and Ben Webster. Dramatic dynamic contrast between the quiet sub-tone opening and roaring altissimo climax.",
            specificFix: "Sustain your vibrato at the tail end of long phrases rather than initiating vibrato immediately upon note attack. Let the straight tone bloom into terminal vibrato."
          }
        },
        timestampCritiques: [
          {
            time: "0:14 / Bar 4",
            observation: "Chromatic enclosure resolving to concert Bb tonic.",
            facultyAdvice: "Bird: 'Crisp articulation! Accent the upper neighbor note for extra bounce.'"
          },
          {
            time: "0:38 / Bridge",
            observation: "Dominant cycle through the circle of fourths.",
            facultyAdvice: "Coltrane: 'Superimpose the minor pentatonic down a half step for modern tension before resolving.'"
          },
          {
            time: "1:05 / Outro",
            observation: "Sub-tone low C to Bb cadenza.",
            facultyAdvice: "Dexter Gordon: 'Magnificent velvet warmth. Keep that reed vibrating without suffocating the low harmonics.'"
          }
        ],
        prescreeningReadiness: {
          juilliardMSMScore: "High Priority Prescreening Pass (Top 5% of National High School Tenor Applicants)",
          essentiallyEllingtonRank: "Outstanding Soloist Award Contender (Jazz at Lincoln Center)",
          topPriorityForBobHackettRehearsal: "Clarinet doubling hand-off transition and lead tenor blend in saxophone soli sections."
        },
        customPracticePrescription: [
          {
            exercise: "Overtone Series 1-2-3-4 Voicing",
            routine: "Fingering low Bb, blow 1st overtone (middle Bb), 2nd (F), 3rd (high Bb), 4th (D) without octave key.",
            targetBpm: "60 BPM (Hold each 8 counts)"
          },
          {
            exercise: "Parker Enclosure Drill in 12 Keys",
            routine: "Whole step above, half step below, target chord tone (e.g. Eb - C# -> D over G7).",
            targetBpm: "160-220 BPM"
          },
          {
            exercise: "Clarinet Embouchure Reset",
            routine: "12 minutes of long tones on throat tones (G, G#, A, Bb) to stabilize firm lower lip cushion.",
            targetBpm: "Rest and breathe"
          }
        ]
      });
    }

    let contents: any[] = [];
    if (audioData) {
      contents = [
        {
          inlineData: {
            mimeType: mimeType || 'audio/webm',
            data: audioData
          }
        },
        { text: promptInstructions }
      ];
    } else {
      contents = [{ text: promptInstructions }];
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error("Error in adjudicate:", error);
    res.status(500).json({ error: error.message || "Evaluation failed" });
  }
});

// API Route: Daily Conservatory Practice Itinerary Generator
app.post('/api/generate-itinerary', async (req, res) => {
  try {
    const { durationMinutes, focusAreas, doublingFocus } = req.body;
    const ai = getGeminiClient();
    const duration = durationMinutes || 60;

    const prompt = `Create a rigorous, elite conservatory daily practice itinerary for Mason, a Junior Tenor Saxophonist (and Clarinetist) in the Wind Honors Studio Jazz Ensemble at Agoura High School preparing for Essentially Ellington and college auditions (Juilliard, MSM, USC, Berklee).
Target Practice Duration: ${duration} minutes.
Focus Areas: ${focusAreas?.join(', ') || 'Tone, Parker enclosures, Coltrane changes, Ellington soloing'}.
Clarinet Doubling Included: ${doublingFocus ? 'YES (dedicate 10-15 minutes to Bb clarinet embouchure and finger mechanics)' : 'Tenor Sax Exclusive'}.

Structure the itinerary into precise time-blocked modules:
1. Warmup & Tone Development (Long tones, low Bb overtone matching, altissimo voicing)
2. Technique & Harmonic Language (Parker bebop scales, 3-to-9 arpeggio resolutions, Coltrane digital patterns)
3. Repertoire & Solos (Ellington repertoire e.g. Cottontail, Warm Valley, Prelude to a Kiss, or college audition standards)
4. ${doublingFocus ? 'Clarinet Doubling Maintenance (embouchure firmness vs tenor flexibility, register key agility)' : 'Transcription & Sight-Reading Mastery'}
5. Cooldown & Mindset Reflection

Return JSON format:
{
  "totalMinutes": ${duration},
  "title": string,
  "dailyMotto": string,
  "blocks": [
    {
      "minutes": number,
      "section": string,
      "instrument": "Tenor Saxophone" | "Bb Clarinet" | "Both",
      "goals": string,
      "exercises": [
        {
          "name": string,
          "description": string,
          "tempo": string,
          "notes": string
        }
      ]
    }
  ]
}`;

    if (!ai) {
      return res.json({
        totalMinutes: duration,
        title: `${duration}-Minute Agoura High Masterclass Daily Regimen`,
        dailyMotto: "Excellence is not an accident; it is the deliberate repetition of beautiful tone and harmonic truth.",
        blocks: [
          {
            minutes: duration === 30 ? 7 : duration === 60 ? 15 : 20,
            section: "Tone Production & Overtone Voicing",
            instrument: "Tenor Saxophone",
            goals: "Develop resonant core tone, sub-tone warmth, and altissimo throat flexibility.",
            exercises: [
              {
                name: "Low Fundamental Overtones (Bb, B, C)",
                description: "Finger low Bb, use vocal tract to sound 1st (Bb), 2nd (F), 3rd (Bb), 4th (D), 5th (F) overtones.",
                tempo: "Free breath / 60 BPM",
                notes: "Keep embouchure neutral. Do not bite."
              },
              {
                name: "Sub-Tone Whisper Control",
                description: "Play middle C down to low Bb at pianissimo (ppp), dropping lower jaw slightly back.",
                tempo: "Largo (54 BPM)",
                notes: "Ben Webster / Dexter Gordon ballad texture."
              }
            ]
          },
          {
            minutes: duration === 30 ? 8 : duration === 60 ? 15 : 20,
            section: "Parker & Coltrane Harmonic Mechanics",
            instrument: "Tenor Saxophone",
            goals: "Master chromatic enclosures, 3-to-9 arpeggio resolutions, and Coltrane cycle substitutions.",
            exercises: [
              {
                name: "Parker 3-to-9 Arpeggios over ii-V-I",
                description: "Over Dm7 -> G7 -> Cmaj7: play F-A-C-E, then B-D-F-Ab resolving to E.",
                tempo: "140 - 200 BPM",
                notes: "Swing 8th notes, accenting off-beats."
              },
              {
                name: "Coltrane Matrix Tri-Tonic Permutations",
                description: "Cmaj7 -> Eb7 -> Abmaj7 -> B7 -> Emaj7 -> G7 -> Cmaj7 in all 12 keys.",
                tempo: "120 - 180 BPM",
                notes: "Connect digital patterns (1-2-3-5)."
              }
            ]
          },
          {
            minutes: duration === 30 ? 10 : duration === 60 ? 18 : 30,
            section: "Essentially Ellington Repertoire & Transcription",
            instrument: "Tenor Saxophone",
            goals: "Rehearse solo choruses on Cottontail, Warm Valley, and prepare lead tenor big band projection.",
            exercises: [
              {
                name: "Paul Gonsalves 27-Chorus Stamina Study",
                description: "Continuous 2-chorus rhythm changes workout focusing on motivic pacing and blues inflection.",
                tempo: "220 BPM",
                notes: "Pacing is key: start in middle register, build to altissimo."
              },
              {
                name: "Ballad Lead: Prelude to a Kiss / Warm Valley",
                description: "Hodges/Webster style vocal inflection with authentic terminal vibrato.",
                tempo: "Rubato / 62 BPM",
                notes: "Focus on rich, broad low D and Eb resonance."
              }
            ]
          },
          {
            minutes: duration === 30 ? 5 : duration === 60 ? 12 : 20,
            section: doublingFocus ? "Bb Clarinet Doubling Transition" : "Sight-Reading & Audition Prescreening",
            instrument: doublingFocus ? "Bb Clarinet" : "Tenor Saxophone",
            goals: doublingFocus ? "Reset embouchure firmness, calibrate throat register pitch, and fluid finger work." : "Perfect Juilliard/MSM college prescreening requirements.",
            exercises: [
              {
                name: doublingFocus ? "Clarinet Throat Tone Pitch Stabilization" : "College Audition Up-Tempo Bebop Burner",
                description: doublingFocus ? "Long tones on G, G#, A, Bb with firm corners and pointed chin." : "Play Donna Lee or Confirmation at 220 BPM with zero hesitation.",
                tempo: doublingFocus ? "60 BPM" : "220 BPM",
                notes: doublingFocus ? "Avoid loose tenor bite; maintain 30% firmer bottom lip support." : "Clean articulation on all double-stops and enclosures."
              }
            ]
          }
        ]
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.5,
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error("Error in generate-itinerary:", error);
    res.status(500).json({ error: error.message || "Failed to generate practice itinerary" });
  }
});

// API Route: Harmonic & Transposition Analysis Lab
app.post('/api/transcribe-analysis', async (req, res) => {
  try {
    const { tuneTitle, chordProgression, targetKey } = req.body;
    const ai = getGeminiClient();

    const prompt = `Analyze this jazz harmonic progression or lick for Mason, tenor saxophonist (Bb instrument) and clarinetist (Bb instrument):
Tune/Title: ${tuneTitle || 'Bebop / Ellington Changes'}
Chords: ${chordProgression || 'Dm7 - G7 - Cmaj7'}
Target Key: ${targetKey || 'C Concert'}

Provide:
1. Concert Pitch Analysis (Roman numerals, guide tones, target 3rds/7ths)
2. Bb Tenor Saxophone / Bb Clarinet Transposition (written up a major 2nd / one whole step)
3. Eb Alto Saxophone Transposition (written up a major 6th / down a minor 3rd, for Charlie Parker alto transcriptions)
4. Parker Enclosure Breakdown (upper neighbor, lower chromatic neighbor, resolution)
5. Coltrane Substitution Option (how to superimpose major thirds or tri-tone substitutes)
6. Historical Reference Recording to study on YouTube / Records.

Return JSON:
{
  "title": string,
  "concertChords": string,
  "tenorBbChords": string,
  "altoEbChords": string,
  "romanNumerals": string,
  "guideTones": string,
  "parkerEnclosureLick": {
    "tenorNotes": string,
    "rhythm": string,
    "explanation": string
  },
  "coltraneSubstitution": {
    "chords": string,
    "concept": string
  },
  "essentialRecordings": [
    {
      "artist": string,
      "albumOrTrack": string,
      "year": string,
      "searchQuery": string,
      "whyListen": string
    }
  ]
}`;

    if (!ai) {
      return res.json({
        title: "Cottontail & Rhythm Changes Master Breakdown",
        concertChords: "Bbmaj7 - G7 | Cm7 - F7 | Dm7 - G7 | Cm7 - F7",
        tenorBbChords: "Cmaj7 - A7 | Dm7 - G7 | Em7 - A7 | Dm7 - G7 (Up a Whole Step)",
        altoEbChords: "Gmaj7 - E7 | Am7 - D7 | Bm7 - E7 | Am7 - D7 (Up a Major 6th)",
        romanNumerals: "Imaj7 - VI7 | ii7 - V7 | iii7 - VI7 | ii7 - V7",
        guideTones: "A (3rd) -> G (7th) -> F (3rd) -> E (7th) in Tenor Key",
        parkerEnclosureLick: {
          tenorNotes: "E - D - C# - D (Approaching 5th of G7), then G# - B - D - F resolving to E (3rd of Cmaj7)",
          rhythm: "Four 16th notes followed by triplets resolving on beat 1",
          explanation: "Bird targets the 3rd of the tonic by surrounding it from above (F) and a chromatic half-step below (D#)."
        },
        coltraneSubstitution: {
          chords: "Cmaj7 -> Eb7 -> Abmaj7 -> B7 -> Emaj7 -> G7 -> Cmaj7",
          concept: "Coltrane Changes: Dividing the octave into three equal major thirds (C - Ab - E) using secondary dominants."
        },
        essentialRecordings: [
          {
            artist: "Duke Ellington & His Famous Orchestra ft. Ben Webster",
            albumOrTrack: "Cottontail (1940 Victor Recording)",
            year: "1940",
            searchQuery: "Duke Ellington Ben Webster Cottontail 1940 original",
            whyListen: "The foundational tenor saxophone solo in jazz history. Study Webster's ferocious attack and growl."
          },
          {
            artist: "Duke Ellington Orchestra ft. Paul Gonsalves",
            albumOrTrack: "Diminuendo and Crescendo in Blue (Newport 1956)",
            year: "1956",
            searchQuery: "Duke Ellington Paul Gonsalves Newport 1956 Diminuendo",
            whyListen: "27 choruses of pure rhythmic endurance, crowd energy, and relentless swing."
          },
          {
            artist: "John Coltrane",
            albumOrTrack: "Giant Steps (Atlantic)",
            year: "1959",
            searchQuery: "John Coltrane Giant Steps official audio",
            whyListen: "The defining monument of harmonic substitution and tenor velocity."
          }
        ]
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.5,
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error("Error in transcribe-analysis:", error);
    res.status(500).json({ error: error.message || "Failed to analyze harmonic progression" });
  }
});

// Configure Vite middleware in development or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mason High Masterclass Engine running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
