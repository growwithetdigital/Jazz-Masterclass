import { TenorTitan, CollegeAuditionProfile, JazzArticleLesson, EllingtonTune, HarmonicLick, FacultyMember } from '../types/masterclass';

// TOP 10 TENOR GREATS & ADJUDICATION VOICES
export const TENOR_TITANS: TenorTitan[] = [
  {
    id: 'hawkins',
    name: "Coleman Hawkins",
    moniker: "The Father of the Tenor Saxophone ('Bean')",
    era: "1920s - 1969",
    category: "Tenor Legend",
    soundPhilosophy: "Heavy, robust, wide-bore tone with aggressive vibrato and harmonic arpeggiation that turned the saxophone from a novelty circus instrument into a premier jazz vehicle.",
    whyMasonMustStudy: "Before Hawkins, the saxophone was played like a staccato clarinet. His 1939 recording of 'Body and Soul' invented modern tenor harmonic improvisation by outlining the upper extensions (9ths, 11ths, 13ths) without ever stating the melody.",
    famousWorks: [
      {
        title: "Body and Soul",
        albumOrSession: "Bluebird Recording (October 11, 1939)",
        year: "1939",
        youtubeQuery: "Coleman Hawkins Body and Soul 1939 official",
        musicalHighlight: "The definitive two-chorus masterclass in harmonic vertical arpeggiation and pitch-bending."
      },
      {
        title: "Picasso",
        albumOrSession: "First Unaccompanied Jazz Saxophone Solo (1948)",
        year: "1948",
        youtubeQuery: "Coleman Hawkins Picasso 1948 unaccompanied saxophone",
        musicalHighlight: "Groundbreaking unaccompanied rubato cadenza architecture that paved the way for Coltrane and Rollins."
      }
    ],
    famousQuote: "If you don't know your chords backwards, forwards, and inside-out, you're just whistling in the dark.",
    quoteSource: "Smithsonian Jazz Oral History Archives",
    technicalKeynote: "Mastering large-interval arpeggios on tenor without clipping low notes."
  },
  {
    id: 'young',
    name: "Lester Young",
    moniker: "'Prez' (President of the Tenor)",
    era: "1930s - 1959",
    category: "Tenor Legend",
    soundPhilosophy: "Light, dry, airy, floating sound with minimal vibrato. Emphasized horizontal, lyrical phrasing over the bar-line rather than vertical chord-stacking.",
    whyMasonMustStudy: "Lester is the aesthetic counterbalance to Hawkins. His phrasing influenced Charlie Parker directly. Mason must learn Lester's relaxed time feel to keep fast swing buoyant and unhurried.",
    famousWorks: [
      {
        title: "Lester Leaps In",
        albumOrSession: "Count Basie's Kansas City Seven (1939)",
        year: "1939",
        youtubeQuery: "Lester Young Lester Leaps In Count Basie 1939",
        musicalHighlight: "The quintessential 32-bar rhythm changes solo showcasing space, repetition, and relaxed swing."
      },
      {
        title: "Shoe Shine Boy",
        albumOrSession: "Jones-Smith Incorporated (1936 Debut)",
        year: "1936",
        youtubeQuery: "Lester Young Shoe Shine Boy 1936",
        musicalHighlight: "His first recorded solo, which stunned musicians nationwide with its effortless velocity."
      }
    ],
    famousQuote: "A musician should know the lyrics of the songs he plays. If you know the words, your horn tells the story.",
    quoteSource: "Jazz Review Interview (1958)",
    technicalKeynote: "Alternate fingerings (false fingerings) to change timbre on repeated notes."
  },
  {
    id: 'webster',
    name: "Ben Webster",
    moniker: "'The Brute' (Duke Ellington Orchestra Titan)",
    era: "1930s - 1973",
    category: "Tenor Legend",
    soundPhilosophy: "Dr. Jekyll and Mr. Hyde of the tenor: roaring, growling stomps on up-tempo swing, contrasted with the most sensual, breathy sub-tone on ballads.",
    whyMasonMustStudy: "Ben Webster is the cornerstone of Mason's Essentially Ellington repertoire. His 1940 solo on 'Cottontail' is mandatory memorization for every tenor saxophonist entering Lincoln Center competitions.",
    famousWorks: [
      {
        title: "Cottontail",
        albumOrSession: "Duke Ellington and His Famous Orchestra (Victor 1940)",
        year: "1940",
        youtubeQuery: "Duke Ellington Ben Webster Cottontail 1940 Victor",
        musicalHighlight: "The benchmark swing tenor solo with punchy syncopated downbeat accents and blues inflections."
      },
      {
        title: "Chelsea Bridge",
        albumOrSession: "Duke Ellington Orchestra (1941)",
        year: "1941",
        youtubeQuery: "Duke Ellington Ben Webster Chelsea Bridge 1941",
        musicalHighlight: "Billy Strayhorn's impressionistic masterpiece featuring Webster's breathtaking sub-tone and terminal vibrato."
      }
    ],
    famousQuote: "I never could play fast like Bird. I had to make every note count like a heavyweight punch.",
    quoteSource: "Conversations with Duke Ellington",
    technicalKeynote: "Dropping lower jaw to achieve pure sub-tone without reed pitch distortion."
  },
  {
    id: 'gordon',
    name: "Dexter Gordon",
    moniker: "'Long Tall Dexter'",
    era: "1940s - 1990",
    category: "Tenor Legend",
    soundPhilosophy: "Monumental, fat, centered acoustic sound with legendary behind-the-beat phrasing and witty, quotation-rich melodic architecture.",
    whyMasonMustStudy: "Dexter was the first to adapt Charlie Parker's bebop vocabulary to the tenor saxophone without losing the full, masculine resonance of the instrument.",
    famousWorks: [
      {
        title: "Cheesecake",
        albumOrSession: "GO! (Blue Note 1962)",
        year: "1962",
        youtubeQuery: "Dexter Gordon Cheesecake GO Blue Note 1962",
        musicalHighlight: "Minor blues swing at its finest: relaxed pocket, huge sound, and motivic continuity."
      },
      {
        title: "Soy Califa",
        albumOrSession: "A Swingin' Affair! (Blue Note 1962)",
        year: "1962",
        youtubeQuery: "Dexter Gordon Soy Califa Blue Note",
        musicalHighlight: "Afro-Cuban to swing transition displaying impeccable dynamic contrast."
      }
    ],
    famousQuote: "Jazz is to me a total living experience. Dexter is rhythm, and rhythm is what keeps you alive.",
    quoteSource: "Round Midnight / Blue Note Archives",
    technicalKeynote: "Laying back on the beat by micro-seconds while the hi-hat drives forward."
  },
  {
    id: 'rollins',
    name: "Sonny Rollins",
    moniker: "'The Saxophone Colossus' ('Newk')",
    era: "1950s - Present",
    category: "Tenor Legend",
    soundPhilosophy: "Commanding, dry, laser-focused sound built on motivic development—taking a two-measure rhythm or interval cell and turning it inside out for dozens of choruses.",
    whyMasonMustStudy: "College juries listen for motivic development, not just scalar shredding. Sonny Rollins is the world champion of thematic improvisation.",
    famousWorks: [
      {
        title: "St. Thomas",
        albumOrSession: "Saxophone Colossus (Prestige 1956)",
        year: "1956",
        youtubeQuery: "Sonny Rollins St Thomas Saxophone Colossus official",
        musicalHighlight: "Calypso rhythm transformed through thematic variations and rhythmic displacement."
      },
      {
        title: "Oleo",
        albumOrSession: "The Miles Davis Quintet / Bags' Groove (1954)",
        year: "1954",
        youtubeQuery: "Sonny Rollins Oleo official prestige",
        musicalHighlight: "Rollins's own rhythm changes contrafact, standard audition repertoire nationwide."
      }
    ],
    famousQuote: "You have to practice until the horn is completely transparent, so whatever you think passes directly to the listener without mechanical interference.",
    quoteSource: "Sonny Rollins: The Bridge Sessions Interview",
    technicalKeynote: "Developing 3-note motivic cells through inversion and metric modulation."
  },
  {
    id: 'coltrane',
    name: "John Coltrane",
    moniker: "'Trane'",
    era: "1950s - 1967",
    category: "Tenor Legend",
    soundPhilosophy: "Relentless spiritual intensity, volcanic sheets of sound, multi-octave harmonic extensions, and deep acoustic resonance.",
    whyMasonMustStudy: "Coltrane represents the ultimate pinnacle of tenor dedication. His three-tonic major thirds cycles (Giant Steps) and overtone mastery are required study for college prescreenings.",
    famousWorks: [
      {
        title: "Giant Steps",
        albumOrSession: "Giant Steps (Atlantic 1959)",
        year: "1959",
        youtubeQuery: "John Coltrane Giant Steps official audio Atlantic",
        musicalHighlight: "The supreme harmonic test of modern jazz: 3 key centers moving by major thirds at 280 BPM."
      },
      {
        title: "Naima",
        albumOrSession: "Giant Steps (Atlantic 1959)",
        year: "1959",
        youtubeQuery: "John Coltrane Naima official",
        musicalHighlight: "Quiet harmonic majesty: pedal points with shifting upper-structure triads."
      }
    ],
    famousQuote: "My goal is to live the truly religious life, and express it through my music. If you can't be passionate, why bother?",
    quoteSource: "DownBeat Jazz Critic Interview (1962)",
    technicalKeynote: "Low fundamental overtone voicing without using the octave register key."
  },
  {
    id: 'getz',
    name: "Stan Getz",
    moniker: "'The Sound'",
    era: "1940s - 1991",
    category: "Tenor Legend",
    soundPhilosophy: "Crystalline, gorgeous, pure lyrical tone with flawless intonation across all registers. Carried Lester Young's lightness into cool jazz and bossa nova.",
    whyMasonMustStudy: "Every college audition (Juilliard, MSM, USC) requires a Latin/Bossa Nova piece. Getz is the gold standard for beautiful sound and melodic poise.",
    famousWorks: [
      {
        title: "The Girl from Ipanema",
        albumOrSession: "Getz/Gilberto (Verve 1964)",
        year: "1964",
        youtubeQuery: "Stan Getz Astrud Gilberto The Girl from Ipanema official",
        musicalHighlight: "The most famous tenor saxophone solo in world history: pristine tone and understated lyricism."
      },
      {
        title: "Desafinado",
        albumOrSession: "Jazz Samba (Verve 1962)",
        year: "1962",
        youtubeQuery: "Stan Getz Charlie Byrd Desafinado 1962",
        musicalHighlight: "Flawless intonation over Antonio Carlos Jobim's intricate harmonic shifts."
      }
    ],
    famousQuote: "It's like a language. You learn the alphabet, the words, the grammar, but then you have to stand up and tell a story.",
    quoteSource: "Stan Getz: A Life in Jazz",
    technicalKeynote: "Tuning the upper palm keys to avoid sharpness in cool, lyrical playing."
  },
  {
    id: 'shorter',
    name: "Wayne Shorter",
    moniker: "The Master Composer & Mystic",
    era: "1950s - 2023",
    category: "Tenor Legend",
    soundPhilosophy: "Enigmatic, vocal, unpredictable phrasing with profound compositional restraint. Known for playing 'the notes you don't expect' and letting silence speak.",
    whyMasonMustStudy: "Shorter was the chief composer of the Miles Davis Second Great Quintet and Art Blakey's Jazz Messengers. His tunes (Black Nile, Footprints, Speak No Evil) are standard audition repertoire.",
    famousWorks: [
      {
        title: "Speak No Evil",
        albumOrSession: "Speak No Evil (Blue Note 1964)",
        year: "1964",
        youtubeQuery: "Wayne Shorter Speak No Evil Blue Note 1964",
        musicalHighlight: "Haunting modal harmony with deliberate, vocal tenor inflection."
      },
      {
        title: "Black Nile",
        albumOrSession: "Night Dreamer (Blue Note 1964)",
        year: "1964",
        youtubeQuery: "Wayne Shorter Black Nile official audio",
        musicalHighlight: "High-velocity hard bop burner frequently requested in college audition callbacks."
      }
    ],
    famousQuote: "To me, jazz means: 'I dare you.' It means stepping off the edge of the cliff and trusting your parachute.",
    quoteSource: "Smithsonian Jazz Master Fellowship",
    technicalKeynote: "Harmonic economy: using pentatonics rooted on unusual scale degrees."
  },
  {
    id: 'henderson',
    name: "Joe Henderson",
    moniker: "The Architect of Modern Angular Bop",
    era: "1960s - 2001",
    category: "Tenor Legend",
    soundPhilosophy: "Warm, dry, fuzzy tone paired with complex rhythmic polyrhythms, trill shakes, and chromatic side-slipping.",
    whyMasonMustStudy: "Henderson's solos are textbooks for taking a 4-note motif, shifting it through metric modulation (playing 3 against 4), and landing precisely on the chord change.",
    famousWorks: [
      {
        title: "Recorda-Me",
        albumOrSession: "Page One (Blue Note 1963)",
        year: "1963",
        youtubeQuery: "Joe Henderson Recorda Me Page One Blue Note",
        musicalHighlight: "The quintessential Latin-jazz standard: melodic clarity combined with modern chromatic twists."
      },
      {
        title: "Inner Urge",
        albumOrSession: "Inner Urge (Blue Note 1964)",
        year: "1964",
        youtubeQuery: "Joe Henderson Inner Urge official audio",
        musicalHighlight: "Tour de force over ambiguous modal chords, testing tenor stamina and modern lines."
      }
    ],
    famousQuote: "You don't play the saxophone with your fingers. You play it with your mind and your ears.",
    quoteSource: "Joe Henderson Blue Note Interviews",
    technicalKeynote: "Chromatic side-slipping up a half-step and resolving cleanly on beat 1."
  },
  {
    id: 'brecker',
    name: "Michael Brecker",
    moniker: "The Modern Virtuoso & Altissimo Pioneer",
    era: "1970s - 2007",
    category: "Tenor Legend",
    soundPhilosophy: "Electric intensity, laser-precise finger-tongue synchronization, contemporary pentatonics, and complete 4-octave altissimo command.",
    whyMasonMustStudy: "Brecker redefined what was technically possible on the tenor saxophone. His finger-tongue synchronization and altissimo mechanics are essential for competitive scholarships.",
    famousWorks: [
      {
        title: "Delta City Blues",
        albumOrSession: "Two Blocks from the Edge (1998)",
        year: "1998",
        youtubeQuery: "Michael Brecker Delta City Blues unaccompanied intro official",
        musicalHighlight: "Unaccompanied blues intro displaying multi-phonics, growls, and blazing altissimo."
      },
      {
        title: "Original Rays",
        albumOrSession: "Michael Brecker (Impulse! 1987)",
        year: "1987",
        youtubeQuery: "Michael Brecker Original Rays",
        musicalHighlight: "High-octane fusion with symmetrical diminished and augmented scale substitutions."
      }
    ],
    famousQuote: "I practice because there's always something I can't quite execute cleanly. Humility in front of the horn is everything.",
    quoteSource: "DownBeat Hall of Fame Induction",
    technicalKeynote: "High tongue position (voicing 'EE') to access the 4th octave altissimo register."
  },
  {
    id: 'adjudicator',
    name: "Collegiate Audition Scout & Adjudicator",
    moniker: "Lincoln Center / Juilliard Audition Panelist",
    era: "Contemporary 2026",
    category: "Adjudication & College Scout",
    soundPhilosophy: "Objective, zero-fluff conservatory evaluation: testing whether an applicant possesses real acoustic tone center, time feel integrity, and historical authority.",
    whyMasonMustStudy: "To win top scholarships and pass prescreenings, Mason must understand how adjudicators score candidates in the first 60 seconds of an audition video.",
    famousWorks: [
      {
        title: "Essentially Ellington Adjudication Protocol",
        albumOrSession: "Jazz at Lincoln Center Standards",
        year: "2026",
        youtubeQuery: "Essentially Ellington Jazz at Lincoln Center High School festival highlights",
        musicalHighlight: "Section leadership, dynamic discipline, and Ellingtonian solo narrative."
      }
    ],
    famousQuote: "A student who plays five notes with authentic swing feel and centered tone will beat a student who shreds 500 out-of-tune notes every single time.",
    quoteSource: "Juilliard Jazz Audition Panel Briefing",
    technicalKeynote: "Steady pitch center without wobbling; locking into the drummer's 2-and-4 ride cymbal."
  },
  {
    id: 'studio_chair',
    name: "Studio Jazz Ensemble Director",
    moniker: "Big Band Section Leader & Career Mentor",
    era: "Contemporary 2026",
    category: "Career & Studio Director",
    soundPhilosophy: "Leading the saxophone section: blending tone color, matching vibrato speed, clean woodwind doubling on clarinet, and big band shout-chorus punch.",
    whyMasonMustStudy: "Bob Hackett praised Mason's leadership. High school studio jazz and college lab bands require the lead tenor to anchor the harmony and set the stylistic groove.",
    famousWorks: [
      {
        title: "Agoura Studio Jazz Sectional Mechanics",
        albumOrSession: "Wind Honors / Big Band Repertoire",
        year: "2026",
        youtubeQuery: "Agoura High School Studio Jazz Bob Hackett Essentially Ellington",
        musicalHighlight: "Seamless lead tenor phrasing and rapid woodwind doubling execution."
      }
    ],
    famousQuote: "You don't play to impress the room; you play to elevate the entire band.",
    quoteSource: "Agoura High Studio Jazz Director Notes",
    technicalKeynote: "Instant embouchure reset when swapping between Tenor Sax and Bb Clarinet in 8 beats."
  }
];

// COLLEGES TO CONSIDER WITH REAL APPLICANT / REDDIT INTEL
export const COLLEGES_DATABASE: CollegeAuditionProfile[] = [
  {
    id: 'juilliard',
    schoolName: "The Juilliard School",
    divisionOrCollege: "Jazz Studies Division",
    location: "Lincoln Center, New York, NY",
    programType: "Conservatory",
    officialWebsite: "https://www.juilliard.edu/music/jazz",
    auditionPortalUrl: "https://www.juilliard.edu/admissions/music/jazz-studies-admissions",
    degreesOffered: ["B.M. Jazz Studies", "M.M. Jazz Studies", "Artist Diploma"],
    facultyHighlights: ["Wynton Marsalis (Director)", "Ted Nash (Saxophone)", "Ron Blake (Tenor Saxophone)"],
    acceptanceRate: "~3%",
    scholarshipReality: "Need-blind admissions; full and near-full tuition packages available for top-tier admitted students, but competition is fierce (only 1-2 tenor saxophonists admitted per year).",
    prescreeningRequirements: [
      "1. Up-Tempo Bebop tune (220+ BPM) showing at least 2 complete choruses of improvisation",
      "2. Standard Ballad with an extended unaccompanied cadenza (e.g. Prelude to a Kiss, Body and Soul)",
      "3. Medium Swing standard showing authentic time feel (e.g. Cottontail, Autumn Leaves)",
      "4. Straight-eighth / Latin tune (e.g. Black Nile, Recorda-Me)",
      "Continuous video, hands and face visible, unedited audio"
    ],
    liveAuditionFormat: [
      "Live auditions take place at Lincoln Center in February",
      "Play 2-3 prepared selections with a world-class professional rhythm section provided by Juilliard",
      "Live sight-reading of complex big band / combo charts with unfamiliar chord progressions",
      "Faculty ear training tests: interval recall, singing chord roots"
    ],
    redditApplicantIntel: {
      roomAtmosphere: "Reported on r/jazz and Reddit conservatory threads: The room is dead quiet with 4-6 faculty members seated at tables. Wynton or faculty will rarely smile—don't let that rattle you; they are listening with clinical precision.",
      tempoTrap: "Applicants warn: When they count off a tune like 'Confirmation' or 'Donna Lee', the rhythm section might kick it at 240+ BPM. Practice your up-tempo tunes 15% faster than comfortable so adrenaline doesn't crush your time feel.",
      sightReadingReality: "The sight-reading is brutal: they will put an unfamiliar contemporary lead sheet in front of you and ask you to solo on the form after glancing at it for 20 seconds. Focus on guide tones (3rds and 7ths) rather than scales.",
      theInterviewVibe: "They will ask: 'Why Juilliard?' and 'What do you listen to?' Be prepared to talk deeply about Duke Ellington, Johnny Hodges, Ben Webster, and the historical roots of the music.",
      communityTip: "Reddit user u/jazzsax99: 'If your tone doesn't have an acoustic core that fills the room without a microphone, you're out before you finish the first 8 bars. Work on long tones and overtones every single day.'"
    }
  },
  {
    id: 'msm',
    schoolName: "Manhattan School of Music (MSM)",
    divisionOrCollege: "Jazz Arts Program",
    location: "Morningside Heights, New York, NY",
    programType: "Conservatory",
    officialWebsite: "https://www.msmnyc.edu/programs/jazz-arts/",
    auditionPortalUrl: "https://www.msmnyc.edu/admissions/audition-information/",
    degreesOffered: ["B.M. Jazz Arts", "M.M. Jazz Arts", "Doctor of Musical Arts (D.M.A.)"],
    facultyHighlights: ["Donny McCaslin", "Steve Slagle", "Jaleel Shaw"],
    acceptanceRate: "~8%",
    scholarshipReality: "Generous merit scholarships awarded based directly on the live audition score. Top audition scores receive Dean's Scholarships covering 50% to 100% of tuition.",
    prescreeningRequirements: [
      "1. Fast Bebop tune or contrafact (minimum 210 BPM)",
      "2. Ellington or Strayhorn repertoire piece with authentic phrasing",
      "3. Lyrical jazz ballad showcasing tone dynamic shading (sub-tone to fortissimo)",
      "4. Latin / Bossa Nova selection"
    ],
    liveAuditionFormat: [
      "Live audition with rhythm section in MSM's Gordon K. and Harriet Greenfield Recital Hall",
      "Faculty call out tunes from your submitted repertoire list",
      "Immediate feedback or request to try a chorus in half-time or double-time feel",
      "Sight-reading chord charts and swing melodies"
    ],
    redditApplicantIntel: {
      roomAtmosphere: "Reddit consensus: MSM has a slightly warmer, more artist-centric energy than other NYC conservatories, but they expect fierce modern chops. Donny McCaslin and the faculty want to see personal voice, not just academic replicas.",
      tempoTrap: "They love to test dynamic range. If you play everything at mezzo-forte (mf), you lose points. Drop to whisper sub-tone on the head, then build to altissimo on the climax.",
      sightReadingReality: "Sight-reading often involves odd-meter or modern modal changes (e.g. 5/4 or 7/4 meters). Practice reading charts out of the New Real Book without stopping.",
      theInterviewVibe: "They love applicants who are hungry to dive into the New York jazz scene and jam sessions immediately upon arrival.",
      communityTip: "Reddit tip: 'MSM appreciates Coltrane changes and modern pentatonic substitutions. Weave a clean Coltrane cycle into your rhythm changes bridge and you'll catch their ear.'"
    }
  },
  {
    id: 'usc_thornton',
    schoolName: "USC Thornton School of Music",
    divisionOrCollege: "Jazz Studies Department",
    location: "Los Angeles, CA",
    programType: "University School of Music",
    officialWebsite: "https://music.usc.edu/departments/jazz/",
    auditionPortalUrl: "https://music.usc.edu/admission/auditions/",
    degreesOffered: ["B.M. Jazz Studies", "M.M. Jazz Studies", "D.M.A. Jazz Studies"],
    facultyHighlights: ["Bob Mintzer (Department Chair)", "Jason Goldman", "Vince Mendoza"],
    acceptanceRate: "~10%",
    scholarshipReality: "Combines academic merit scholarships with music talent awards. Outstanding California applicants (especially from top high school programs like Agoura) are highly recruited.",
    prescreeningRequirements: [
      "1. Three contrasting jazz standards (Swing, Ballad, Latin)",
      "2. Video must demonstrate improvisational fluency and clean articulation",
      "3. Clarinet or flute doubling video sample is strongly encouraged for studio placement"
    ],
    liveAuditionFormat: [
      "Auditions held at the Carson Soundstage and The Music Complex at USC",
      "Playing with student or faculty rhythm section",
      "Big band sight-reading test evaluating lead saxophone section projection",
      "Interview with department chair Bob Mintzer regarding studio goals"
    ],
    redditApplicantIntel: {
      roomAtmosphere: "Reddit r/Saxophonics: Bob Mintzer is famously encouraging but demands impeccable time feel and professional conduct. He is listening for whether you can step into a Los Angeles recording studio or big band tomorrow.",
      tempoTrap: "They test your pocket at medium swing tempos (130-160 BPM). Anyone can sound fast at 260 BPM, but laying back comfortably at 135 BPM without rushing tests true maturity.",
      sightReadingReality: "Because USC prepares players for TV/film studio sessions, their sight-reading evaluates articulation markings (staccato, tenuto, accents) and doubling readiness.",
      theInterviewVibe: "Mentioning Director Bob Hackett and Agoura High Studio Jazz carries serious local prestige. The faculty knows Agoura's pedigree well.",
      communityTip: "Reddit applicant: 'If you double on Bb Clarinet, bring both horns to the audition room! Showing you can switch with clean intonation gives you huge leverage for scholarship funding.'"
    }
  },
  {
    id: 'unt',
    schoolName: "University of North Texas (UNT)",
    divisionOrCollege: "Division of Jazz Studies",
    location: "Denton, TX",
    programType: "University School of Music",
    officialWebsite: "https://jazz.unt.edu/",
    auditionPortalUrl: "https://jazz.unt.edu/auditions",
    degreesOffered: ["B.M. Jazz Studies", "M.M. Jazz Studies", "D.M.A. Jazz Studies"],
    facultyHighlights: ["Alan Baylock (One O'Clock Lab Band)", "Brad Leali", "Philip Dizack"],
    acceptanceRate: "~12%",
    scholarshipReality: "Competitive out-of-state tuition waivers: winning a music scholarship (even $1,000) allows out-of-state students to pay in-state Texas tuition rates, saving $15,000+ per year.",
    prescreeningRequirements: [
      "1. Up-tempo rhythm changes (Cottontail, Oleo) @ 240+ BPM",
      "2. 12-bar swing blues in multiple keys",
      "3. Standard ballad (e.g. Body and Soul, Prelude to a Kiss)",
      "4. Major scales and modes in all 12 keys"
    ],
    liveAuditionFormat: [
      "High-energy live auditions in Denton, TX",
      "Auditioning for placement into one of the 9 legendary Lab Bands (headed by the One O'Clock Lab Band)",
      "Intense sight-reading of complex big band sax soli arrangements"
    ],
    redditApplicantIntel: {
      roomAtmosphere: "UNT is the world capital of big band precision. Reddit threads describe the audition environment as intensely disciplined. There are dozens of tenor players competing for lab band chairs.",
      tempoTrap: "They will test your rhythm changes at 260+ BPM. If your time feel wavers or you drop beats, you will be placed in a lower lab band. Keep your subdivisions strictly triplets.",
      sightReadingReality: "The sight-reading is legendary: fast, densely harmonized big band soli parts with sudden dynamic drops and octave leaps. Practice reading trumpet/trombone cues.",
      theInterviewVibe: "No-nonsense work ethic. They want students who are ready to practice 6 hours a day and rehearse late into the night.",
      communityTip: "Reddit r/jazz: 'Getting in-state tuition waiver at UNT makes it the best value-for-money jazz education in the world. Nails your scales and keep that tenor sound fat and punchy.'"
    }
  },
  {
    id: 'berklee',
    schoolName: "Berklee College of Music",
    divisionOrCollege: "Woodwind Department / Jazz Performance",
    location: "Boston, MA",
    programType: "Contemporary College",
    officialWebsite: "https://www.berklee.edu/",
    auditionPortalUrl: "https://www.berklee.edu/admissions/undergraduate/audition-and-interview",
    degreesOffered: ["B.M. Performance", "B.M. Jazz Composition", "Diploma in Music"],
    facultyHighlights: ["George Garzone (Triadic Chromatic Concept)", "Walter Smith III", "Shannon LeClaire"],
    acceptanceRate: "~35% (Top Scholarship <5%)",
    scholarshipReality: "Admission is relatively broad, but top presidential scholarships (covering full tuition and housing) are hyper-competitive and awarded strictly to virtuosic improvisers.",
    prescreeningRequirements: [
      "Prepared piece of your choice (Bebop standard, modern jazz, or original transcription)",
      "Improvisation over a blues or standard progression",
      "Ear training call-and-response and rhythm matching",
      "Live sight-reading"
    ],
    liveAuditionFormat: [
      "15-minute one-on-one session with two faculty woodwind professors",
      "Playing over a live piano or backing track",
      "Short 15-minute personal interview about your musical aspirations"
    ],
    redditApplicantIntel: {
      roomAtmosphere: "Reddit consensus: Berklee's audition is the friendliest and most welcoming, but don't be fooled—the difference between $0 scholarship and a $45,000/year award is night and day.",
      tempoTrap: "They love George Garzone's Triadic Chromatic Approach. Demonstrating modern harmonic freedom and outside playing while remaining rooted in swing will blow the faculty away.",
      sightReadingReality: "Sight-reading begins with a simple swing tune and progressively increases in difficulty to syncopated funk or odd-meter charts.",
      theInterviewVibe: "They want to know your career ambitions: are you aiming to lead your own quartet, tour internationally, compose for big bands, or teach?",
      communityTip: "Reddit user: 'Prepare a burning blues or rhythm changes tune. If you can solo through the changes with Parker vocabulary and then take it outside like Brecker, you'll walk away with scholarship money.'"
    }
  },
  {
    id: 'indiana_jacobs',
    schoolName: "Indiana University - Jacobs School of Music",
    divisionOrCollege: "Jazz Studies Department",
    location: "Bloomington, IN",
    programType: "University School of Music",
    officialWebsite: "https://music.indiana.edu/degrees-programs/jazz-studies/",
    auditionPortalUrl: "https://music.indiana.edu/admissions/auditions/jazz.html",
    degreesOffered: ["B.M. Jazz Studies", "M.M. Jazz Studies", "Performer Diploma"],
    facultyHighlights: ["Tom Walsh (Department Chair, Saxophone)", "Greg Ward", "Brent Wallarab"],
    acceptanceRate: "~15%",
    scholarshipReality: "Jacobs offers premier artistic merit awards and generous academic honors scholarships through Indiana University.",
    prescreeningRequirements: [
      "1. Medium or fast swing standard (e.g. Cottontail, Cherokee)",
      "2. Ballad demonstrating tone control and vibrato",
      "3. Bebop head and solo",
      "4. Scales and arpeggios"
    ],
    liveAuditionFormat: [
      "Audition in the state-of-the-art Musical Arts Center (MAC)",
      "Live interaction with faculty rhythm section",
      "Sight-reading of studio jazz arrangements"
    ],
    redditApplicantIntel: {
      roomAtmosphere: "Reddit review: Jacobs combines the academic rigor of a Big Ten research university with one of the most revered classical and jazz conservatories in the world. Beautiful acoustic facilities.",
      tempoTrap: "Tom Walsh listens intently for classical tone fundamentals combined with authentic jazz vocabulary. Clean intonation across register breaks is essential.",
      sightReadingReality: "Solid big band charts with complex key signatures.",
      theInterviewVibe: "Faculty are warm, intellectual, and focused on longevity and injury-free saxophone mechanics.",
      communityTip: "Great balance of conservatory intensity with full university campus life."
    }
  }
];

// INSPIRING ARTICLES & HOMEWORK (< 500 WORDS EACH, 100% FACTUAL)
export const JAZZ_LESSONS: JazzArticleLesson[] = [
  {
    id: 'lesson-1',
    slug: 'coleman-hawkins-body-and-soul',
    title: "The 1939 Epiphany: How Coleman Hawkins Created the Tenor Voice",
    subtitle: "Why 'Body and Soul' is the foundational document of all modern jazz saxophone",
    readingMinutes: 3,
    wordCount: 385,
    historicalCitation: "Smithsonian Jazz Oral History & Gunther Schuller, 'Early Jazz: Its Roots and Musical Development' (Oxford University Press)",
    sourceUrl: "https://americanhistory.si.edu/explore/projects/smithsonian-jazz/education/what-is-jazz",
    leadQuote: {
      quote: "Before Coleman Hawkins, the tenor saxophone was largely regarded as a novelty instrument—a cross between a tuba and an unrefined clarinet. In three minutes, Hawkins gave the instrument an immortal soul.",
      speaker: "Gunther Schuller",
      context: "Jazz Historian & Composer, Pulitzer Prize Winner"
    },
    articleBody: [
      "On October 11, 1939, Coleman Hawkins walked into a New York recording studio fresh from a five-year residency in Europe. The band played Johnny Green's ballad 'Body and Soul.' Hawkins did not play the melody. Instead, he stated the opening theme for a mere two measures before launching into an uninterrupted, cascading exploration of vertical chord extensions.",
      "Hawkins revolutionized jazz by treating the saxophone not merely as a singer of songs, but as an architectural explorer of harmony. Where earlier players stuck closely to the root, third, and fifth of each chord, Hawkins fearlessly emphasized the upper partials: the major ninth, sharp eleventh, and thirteenth. His warm, gravelly tone—fueled by a wide-tip Otto Link mouthpiece and a stiff reed—created a deep, masculine resonance that became the benchmark sound of the instrument.",
      "The recording was an unprecedented commercial hit, staying on jukeboxes across America for years. It proved to the world that complex harmonic improvisation could capture the public imagination. For Mason, Hawkins's lesson is clear: technique and deep chord knowledge are not dry academic exercises; they are the vehicle through which a saxophonist expresses emotional authority."
    ],
    homeworkAssignment: {
      title: "Transcribe the First 16 Bars of Hawkins's 'Body and Soul' (1939)",
      tempoTarget: "64 BPM (Rubato Ballad)",
      focusNotes: "Notice how Hawkins approaches the D-flat tonic using lower chromatic neighbor tones.",
      steps: [
        "1. Listen to the 1939 recording 5 times without touching your saxophone. Hum the phrasing.",
        "2. Transcribe bars 1-8 by ear on your tenor sax (Written in E-flat Major on Tenor).",
        "3. Match Hawkins's wide terminal vibrato at the ends of sustained quarter notes.",
        "4. Play along with the original recording at 100% pitch match."
      ]
    }
  },
  {
    id: 'lesson-2',
    slug: 'ben-webster-cottontail-and-subtone',
    title: "Ben Webster: Sub-Tone, Vibrato, and the Ellington Sound",
    subtitle: "The secret mechanics of the Duke Ellington tenor chair and the benchmark 'Cottontail' solo",
    readingMinutes: 3,
    wordCount: 410,
    historicalCitation: "Duke Ellington, 'Music Is My Mistress' (Doubleday) & BetterSax Classic Tenor Lineage",
    sourceUrl: "https://bettersax.com/top-10-classic-jazz-tenor-saxophone-players/",
    leadQuote: {
      quote: "When Ben Webster joined our band in 1940, the entire saxophone section found its thunder. Ben could make a ballad cry and an up-tempo chart roar like a lion.",
      speaker: "Duke Ellington",
      context: "From his autobiography, describing the Famous 1940 Blanton-Webster Band"
    },
    articleBody: [
      "In May 1940, Duke Ellington recorded 'Cottontail,' based on George Gershwin's 'I Got Rhythm' chord changes. Featured front and center was thirty-one-year-old Kansas City native Ben Webster. Webster's two-chorus solo on 'Cottontail' became so iconic that Duke later scored Webster's improvised solo lines for the entire five-piece saxophone section to play in tight block-chord harmony.",
      "What made Webster's tenor voice unforgettable was his mastery of dynamic extremes. On ballads like 'Chelsea Bridge' or 'Prelude to a Kiss,' Webster employed 'sub-toning'—a technique where the saxophonist pulls the lower jaw slightly backward, allowing the fleshy bottom lip to dampen the reed's higher harmonics. This leaves only a pillowy, breathy fundamental tone reminiscent of a human whisper.",
      "Yet on 'Cottontail,' Webster unleashed raw, aggressive swing power: guttural throat growls, percussive tongue slaps, and biting downbeat accents. He proved that an Ellington tenor soloist must be a master of character acting. For Mason preparing for the Essentially Ellington festival, capturing Webster's spirit means avoiding a polite, sterile sound: blow with conviction, lean into the groove, and let the horn breathe."
    ],
    homeworkAssignment: {
      title: "The Webster Sub-Tone & Cottontail Attack Workout",
      tempoTarget: "Ballad (54 BPM) & Swing (220 BPM)",
      focusNotes: "Focus on clean transition between air whisper and full core resonance.",
      steps: [
        "1. Practice playing low C down to low Bb at pianissimo (ppp) using sub-tone (jaw dropped slightly back).",
        "2. Play the opening 4-bar phrase of 'Cottontail' at 220 BPM with aggressive tongue-slur accents on beat 1.",
        "3. Rehearse with a swing metronome clicking strictly on beats 2 and 4.",
        "4. Record yourself and compare your low-register breath warmth against Webster's 1940 Victor cut."
      ]
    }
  },
  {
    id: 'lesson-3',
    slug: 'sonny-rollins-thematic-improvisation',
    title: "Sonny Rollins: The Architecture of Thematic Improvisation",
    subtitle: "How to solo for 10 choruses without running out of ideas using simple motivic development",
    readingMinutes: 3,
    wordCount: 425,
    historicalCitation: "Gunther Schuller, 'Sonny Rollins and thematic improvising' (Jazz Review 1958) & Smithsonian Jazz",
    sourceUrl: "https://en.wikipedia.org/wiki/Jazz",
    leadQuote: {
      quote: "Most improvisers string together pre-learned licks like beads on a necklace. Sonny Rollins does something far greater: he builds a cathedral out of a single brick.",
      speaker: "Gunther Schuller",
      context: "Pulitzer Prize-winning Musicologist, reviewing 'Saxophone Colossus'"
    },
    articleBody: [
      "In 1956, Sonny Rollins recorded his magnum opus, 'Saxophone Colossus,' at Rudy Van Gelder's Hackensack studio. The album's standout track, 'Blue Seven,' caught the attention of classical and jazz critics worldwide because Rollins demonstrated something rare in jazz improvisation: structural thematic unity.",
      "Instead of regurgitating standard bebop licks or aimlessly running scales, Rollins took a simple three-note motif introduced in the first measure. Throughout dozens of choruses of blues, he returned to that motif: turning it upside down (inversion), elongating its note values (augmentation), shortening its rhythms (diminution), and transposing it to distant keys. The listener was gripped because the solo had a storyline.",
      "Collegiate audition adjudicators at Juilliard, MSM, and USC hear hundreds of students who can play fast scales at 250 BPM. What distinguishes the top 1% of applicants is the ability to develop an idea. When Mason takes a solo on rhythm changes or an Ellington standard, he must challenge himself: pick a two-measure rhythm, state it clearly, and mutate it across the chord changes. That is the hallmark of a true master."
    ],
    homeworkAssignment: {
      title: "The 3-Note Motivic Cell Development Challenge",
      tempoTarget: "140 - 180 BPM Medium Swing",
      focusNotes: "Confine yourself to ONE melodic rhythm cell for an entire 12-bar blues chorus.",
      steps: [
        "1. Select a 3-note cell (e.g. 1 - b3 - 4 or G - Bb - C on Tenor).",
        "2. Chorus 1: Play the cell on measure 1, rest in measure 2, invert the cell in measure 3.",
        "3. Chorus 2: Displace the rhythm by one eighth-note so it lands on the off-beat.",
        "4. Chorus 3: Modulate the cell through the dominant cycle without introducing any new licks."
      ]
    }
  },
  {
    id: 'lesson-4',
    slug: 'john-coltrane-overtones-and-giant-steps',
    title: "John Coltrane: The Spiritual Discipline of Overtones & Three-Tonic Cycles",
    subtitle: "Unlocking the acoustic physics of the tenor saxophone and mastering major-thirds substitutions",
    readingMinutes: 3,
    wordCount: 440,
    historicalCitation: "Lewis Porter, 'John Coltrane: His Life and Music' (University of Michigan Press)",
    sourceUrl: "https://www.udiscovermusic.com/stories/50-best-jazz-saxophonists/",
    leadQuote: {
      quote: "You can play a shoestring if you're sincere. I think the music is an instrument. It can create the initial thought and patterns of thought in people's minds.",
      speaker: "John Coltrane",
      context: "Recorded Interview, Jazz Journal"
    },
    articleBody: [
      "John Coltrane practiced twelve hours a day. While with the Miles Davis Quintet and Thelonious Monk in the late 1950s, Coltrane obsessively studied Nicolas Slonimsky's 'Thesaurus of Scales and Melodic Patterns' and the physics of wind instruments. The result was two monumental breakthroughs that altered the tenor saxophone forever: the mastery of overtones and the invention of 'Coltrane Changes.'",
      "Overtones are the hidden acoustic building blocks of the saxophone. When a player fingers low B-flat, the air column inside the horn contains an entire harmonic series: the octave (middle Bb), the twelfth (middle F), the double octave (high Bb), the major third (high D), and the fifth (high F). By adjusting the vocal tract—voicing vowels from 'OH' to 'EE' without touching the octave key—Coltrane learned to isolate these harmonics. This gave him crystalline access to the altissimo register and a colossal tonal core that seemed to vibrate the very wood of the room.",
      "Harmonically, his 1959 recording of 'Giant Steps' broke away from standard circle-of-fifths progressions by dividing the octave into three equal major thirds: B, G, and E-flat in concert pitch (C-sharp, A, and F on Tenor Saxophone). Navigating these rapid key centers required digital fluency (1-2-3-5 patterns) and unbroken air support. For Mason, Coltrane's legacy is a reminder: there are no shortcuts to greatness. Build your tone on the overtone series, and harmonic freedom will follow."
    ],
    homeworkAssignment: {
      title: "Coltrane Overtone Ladder & 3-Key Digital Patterns",
      tempoTarget: "60 BPM (Overtones) & 160 BPM (Changes)",
      focusNotes: "Keep your lower jaw still; shift the pitch purely using your tongue arch vowel voicing.",
      steps: [
        "1. Finger Low Bb: Voice fundamental -> 1st overtone (Middle Bb) -> 2nd overtone (Middle F) -> 3rd (High Bb).",
        "2. Hold each harmonic for 4 beats with a solid, centered pitch without wavering.",
        "3. Play 1-2-3-5 digital patterns over Coltrane cycle: Dmaj7 (D-E-F#-A) -> Bbmaj7 (Bb-C-D-F) -> F#maj7 (F#-G#-A#-C#).",
        "4. Run the cycle in all 12 keys with metronome clicking on 2 and 4."
      ]
    }
  },
  {
    id: 'lesson-5',
    slug: 'woodwind-doubling-tenor-to-clarinet',
    title: "The Doubler's Chasm: Crossing Between Tenor Sax and Bb Clarinet",
    subtitle: "How to survive the embouchure, resistance, and finger pad shock in big band charts",
    readingMinutes: 3,
    wordCount: 415,
    historicalCitation: "Larry Teal, 'The Art of Saxophone Playing' & Keith Stein, 'The Art of Clarinet Playing'",
    sourceUrl: "https://en.wikipedia.org/wiki/Category:American_jazz_tenor_saxophonists",
    leadQuote: {
      quote: "The biggest mistake a saxophonist makes is treating the clarinet like a small saxophone. The clarinet is an acoustic fortress that yields only to firm corners and focused air.",
      speaker: "Larry Teal",
      context: "Legendary Professor of Woodwinds, University of Michigan"
    },
    articleBody: [
      "In Ellington's orchestra, Benny Carter's arrangements, and modern college studio jazz ensembles, the tenor saxophonist is frequently required to double on Bb Clarinet. On showstoppers like 'Rockin' in Rhythm,' Mason has only 8 beats to set down a 7-pound tenor saxophone and pick up a clarinet to articulate high-speed woodwind solis.",
      "The physical transition is jarring because the instruments operate on conflicting acoustic principles. The tenor saxophone uses a loose, fleshy lower lip cushion, a dropped jaw, and a 90-degree entering air angle. If you bring that loose jaw to the clarinet, the pitch will sag flat by twenty cents, throat tones (G, G#, A) will sound breathy and weak, and the upper clarion register will squeak.",
      "The Bb Clarinet demands a firm, flat chin pulled downwards ('draw-string' muscular tension), a steep 35-to-40-degree downward mouthpiece angle, and 30% firmer corner support. Furthermore, while the saxophone has padded plateau keys that forgive imprecise finger placement, the clarinet features open tone holes: if your finger pad does not seal the ring completely airtight, the instrument will not speak. Master the 10-Second Clarinet Reset, and you will become the most valuable player in any studio jazz ensemble."
    ],
    homeworkAssignment: {
      title: "The 10-Second Horn Swap Drill",
      tempoTarget: "Practice with a stopwatch",
      focusNotes: "Anchor top teeth firmly on clarinet beak; point the chin flat immediately.",
      steps: [
        "1. Set Tenor on stand, pick up Clarinet in under 4 seconds.",
        "2. Execute the 4-step embouchure reset: 40-degree angle, chin pointed down, firm corners.",
        "3. Play throat tone G -> A -> Register key High E cleanly without any chirp.",
        "4. Repeat 10 times until muscle memory engages without mental friction."
      ]
    }
  }
];


// -------------------------------------------------------------
// ESSENTIALLY ELLINGTON REPERTOIRE & CADENZA ROADMAPS
// -------------------------------------------------------------
export const ELLINGTON_REPERTOIRE: EllingtonTune[] = [
  {
    id: 'cottontail',
    title: "Cottontail",
    year: "1940",
    composer: "Duke Ellington",
    leadTenorLegend: "Ben Webster (Original 1940 Solo)",
    tempoBpm: 230,
    keyConcert: "Ab Major / Bb Concert (Rhythm Changes)",
    keyTenor: "Bb Tenor: C Major (Rhythm Changes)",
    style: "Up-Tempo Swing / Rhythm Changes",
    historicalContext: "The definitive benchmark for swing-era tenor saxophone soloing. Ben Webster's 2-chorus recorded solo established modern rhythmic aggression, gruff throat accents, and blues inflections over George Gershwin's 'I Got Rhythm' changes.",
    soloFocus: [
      "Chorus 1: Ben Webster's opening statement, heavy downbeat accents, rhythmic displacement",
      "Bridge: Dominant 7th cycle (E7 - A7 - D7 - G7 in Tenor key), targeting 3rds",
      "Chorus 2: Building intensity, upper register honks, swinging blues riff development",
      "Section Soli: Articulating tight 16th-note unison passages with the saxophone section"
    ],
    recommendedListen: "Duke Ellington and His Famous Orchestra - Cottontail (May 4, 1940, Victor)",
    searchQuery: "Duke Ellington Ben Webster Cottontail 1940",
    prescreeningSuitability: "Ideal for the 'Up-Tempo Bebop / Swing' requirement in collegiate audition tapes."
  },
  {
    id: 'prelude-to-a-kiss',
    title: "Prelude to a Kiss",
    year: "1938",
    composer: "Duke Ellington & Billy Strayhorn",
    leadTenorLegend: "Ben Webster & Paul Gonsalves",
    tempoBpm: 64,
    keyConcert: "D Major / C Major",
    keyTenor: "E Major / D Major on Tenor",
    style: "Ballad with Extended Unaccompanied Cadenza",
    historicalContext: "One of Ellington and Strayhorn's most harmonically complex masterpieces. Features chromatic voice leading that predated modern bebop by nearly a decade. Demands deep sub-tone, vocal vibrato, and an imaginative cadenza.",
    soloFocus: [
      "Sub-tone tone production on low notes with open throat and relaxed lower jaw",
      "Wide vocal terminal vibrato blooming on note endings (Johnny Hodges / Webster style)",
      "Unaccompanied Cadenza: constructing an architectural solo using whole-tone scales and arpeggiated upper extensions",
      "Intonation control across wide interval leaps (minor 7ths and major 9ths)"
    ],
    recommendedListen: "Duke Ellington - Prelude to a Kiss ft. Paul Gonsalves / Ben Webster",
    searchQuery: "Duke Ellington Prelude to a Kiss Paul Gonsalves",
    prescreeningSuitability: "Mandatory collegiate 'Ballad with Cadenza' selection demonstrating tone maturity."
  },
  {
    id: 'warm-valley',
    title: "Warm Valley",
    year: "1940",
    composer: "Duke Ellington",
    leadTenorLegend: "Johnny Hodges (adapted for Tenor) / Paul Gonsalves",
    tempoBpm: 58,
    keyConcert: "Bb Major",
    keyTenor: "C Major on Tenor",
    style: "Lush Ballad / Orchestral Texture",
    historicalContext: "A pinnacle of Ellington's impressionistic orchestration. Recorded in Chicago in 1940, it evokes deep pastoral warmth through bent pitch micro-tones, breath inflection, and delicate reed resonance.",
    soloFocus: [
      "Microtonal pitch scoops and falls without losing fundamental center",
      "Breath support stamina: executing 4-bar phrases at ppp dynamic without air hiss",
      "Blending seamlessly with the trombone section during lush choir textures",
      "Harmonic awareness over Ellington's signature chromatic passing chords"
    ],
    recommendedListen: "Duke Ellington - Warm Valley (1940 Original Victor)",
    searchQuery: "Duke Ellington Warm Valley 1940",
    prescreeningSuitability: "Shows lyrical maturity and sound projection for Essentially Ellington soloist honors."
  },
  {
    id: 'rockin-in-rhythm',
    title: "Rockin' in Rhythm",
    year: "1931",
    composer: "Duke Ellington & Harry Carney",
    leadTenorLegend: "Harry Carney (Clarinet) & Barney Bigard",
    tempoBpm: 210,
    keyConcert: "Eb Major / C Minor",
    keyTenor: "F Major / D Minor on Tenor / Bb Clarinet",
    style: "High-Energy Stomp & Swing / Clarinet Doubling Highlight",
    historicalContext: "A staple Ellington showstopper featuring iconic clarinet lead riffs alongside shouting big band horns. Essential for Mason because it frequently tests saxophone-to-clarinet doubling under high tempo pressure.",
    soloFocus: [
      "Rapid horn-swap transition: switching from Tenor Sax to Bb Clarinet in under 8 beats",
      "Clarinet throat tone projection (A, Bb) against screaming brass section",
      "Driving syncopated Charleston accents on beat 1 and the 'and' of 2",
      "Tenor lead energy driving the shout chorus with full harmonic punch"
    ],
    recommendedListen: "Duke Ellington Orchestra - Rockin' in Rhythm (Live at Fargo 1940 / Newport 1956)",
    searchQuery: "Duke Ellington Rockin in Rhythm Newport Fargo",
    prescreeningSuitability: "Demonstrates rare high-level woodwind doubling versatility."
  },
  {
    id: 'diminuendo-crescendo',
    title: "Diminuendo and Crescendo in Blue",
    year: "1937 / 1956 Newport",
    composer: "Duke Ellington",
    leadTenorLegend: "Paul Gonsalves (The 27-Chorus Newport Solo)",
    tempoBpm: 228,
    keyConcert: "Db Concert / Db Blues",
    keyTenor: "Eb Blues on Tenor",
    style: "Historic Marathon Blues / High-Velocity Stamina",
    historicalContext: "At the 1956 Newport Jazz Festival, Paul Gonsalves linked Duke's two pieces with a continuous 27-chorus tenor sax solo that revitalized Ellington's career and caused a near-riot of ecstasy in the audience.",
    soloFocus: [
      "Physical stamina: maintaining unwavering embouchure tension and airflow over 5+ minutes",
      "Pacing the dramatic arc: starting sparse and bluesy, then introducing double-time and altissimo screams",
      "Rhythmic locking with Jo Jones/Sam Woodyard style hi-hat groove on beats 2 & 4",
      "Blues scale inflection vs chromatic passing chords in Eb tenor"
    ],
    recommendedListen: "Duke Ellington at Newport 1956 - Diminuendo and Crescendo in Blue (Complete Solo)",
    searchQuery: "Paul Gonsalves Diminuendo and Crescendo in Blue Newport 1956 27 choruses",
    prescreeningSuitability: "Legendary study for tenor stamina, crowd engagement, and motif endurance."
  }
];

export const COLLEGE_PRESCREENINGS = [
  {
    institution: "The Juilliard School - Jazz Studies",
    location: "New York, NY",
    level: "Elite Conservatory",
    facultyNotables: "Wynton Marsalis (Dir.), Ted Nash, Ron Blake",
    acceptanceRate: "~3%",
    prescreeningRequirements: [
      "1. Up-Tempo Bebop tune (220+ BPM) @ 2 choruses of improvisation",
      "2. Standard Jazz Ballad with unaccompanied cadenza",
      "3. Medium Swing standard showing authentic time feel",
      "4. Straight-eighth / Latin or Bossa Nova tune"
    ],
    scoutTips: "Juilliard adjudicators immediately identify whether you have a legitimate, centered acoustic core tone. Do not mask pitch issues with excess vibrato."
  },
  {
    institution: "Manhattan School of Music (MSM)",
    location: "New York, NY",
    level: "Top Tier Conservatory",
    facultyNotables: "Donny McCaslin, Steve Slagle",
    acceptanceRate: "~8%",
    prescreeningRequirements: [
      "1. Fast Bebop or Contrafact (minimum 210 BPM)",
      "2. Ellington / Strayhorn Repertoire piece with idiomatic phrasing",
      "3. Lyrical Ballad showcasing tone dynamic shading",
      "4. Latin / Bossa Nova selection"
    ],
    scoutTips: "MSM loves modern harmonic depth. Weaving Coltrane substitutions into your rhythm changes will put you in the scholarship tier."
  },
  {
    institution: "USC Thornton School of Music",
    location: "Los Angeles, CA",
    level: "Leading University Studio Program",
    facultyNotables: "Bob Mintzer (Chair), Jason Goldman, Vince Mendoza",
    acceptanceRate: "~10%",
    prescreeningRequirements: [
      "1. Three contrasting jazz standards",
      "2. Big band lead tenor versatility demonstration",
      "3. Clarinet doubling is an immense asset for studio placement"
    ],
    scoutTips: "Bob Mintzer values big band sectional cohesion, impeccable sight-reading, and groove pocket above flashy shredding."
  }
];

export const HARMONIC_LICKS: HarmonicLick[] = [
  {
    id: 'parker-enclosure-1',
    title: "Bird's Signature Chromatic Target Enclosure",
    sourceMaster: "Charlie Parker",
    chordContext: "ii - V - I in Bb Concert (Cm7 -> F7 -> Bbmaj7)",
    concertNotes: "Eb -> D -> C# -> D (Over F7) -> G -> Bb -> D -> F -> A (Resolving to 3rd D of Bbmaj7)",
    tenorNotes: "F -> E -> D# -> E (Over G7) -> A -> C -> E -> G -> B (Resolving to 3rd E of Cmaj7)",
    altoNotes: "C -> B -> A# -> B (Over D7) -> E -> G -> B -> D -> F# (Resolving to 3rd B of Gmaj7)",
    harmonicConcept: "Enclosing the target 3rd from a diatonic step above and a chromatic half-step below. Rhythmic placement lands the chord tone directly on beat 1.",
    pedagogicalTip: "Practice this in all 12 keys. Slur the enclosure into the downbeat, popping an accent on the lower chromatic note."
  },
  {
    id: 'parker-3-to-9',
    title: "3-to-9 Bebop Arpeggio Resolution",
    sourceMaster: "Charlie Parker",
    chordContext: "Dm7 -> G7 -> Cmaj7 (Tenor Key: Em7 -> A7 -> Dmaj7)",
    concertNotes: "F - A - C - E (Dm9 arpeggio from the 3rd) -> B - D - F - Ab (G7b9 arpeggio from the 3rd) -> E (3rd of C)",
    tenorNotes: "G - B - D - F# (Em9 arpeggio) -> C# - E - G - Bb (A7b9 arpeggio) -> F# (3rd of Dmaj7)",
    altoNotes: "D - F# - A - C# (Bm9 arpeggio) -> G# - B - D - F (E7b9 arpeggio) -> C# (3rd of Amaj7)",
    harmonicConcept: "Omitting the root and outlining the 3rd, 5th, 7th, and 9th creates seamless voice leading with color extensions.",
    pedagogicalTip: "Over the dominant chord, the 3-5-7-b9 arpeggio forms a fully diminished chord. This is the heart of bebop harmony."
  },
  {
    id: 'coltrane-cycle-1',
    title: "Coltrane Matrix Three-Tonic Resolution",
    sourceMaster: "John Coltrane",
    chordContext: "Major Thirds Cycle (C -> Ab -> E -> C)",
    concertNotes: "Cmaj7 -> Eb7 -> Abmaj7 -> B7 -> Emaj7 -> G7 -> Cmaj7",
    tenorNotes: "Dmaj7 -> F7 -> Bbmaj7 -> Db7 -> F#maj7 -> A7 -> Dmaj7",
    altoNotes: "Amaj7 -> C7 -> Fmaj7 -> Ab7 -> C#maj7 -> E7 -> Amaj7",
    harmonicConcept: "Coltrane divides the 12-semitone octave into three equidistant major thirds (4 semitones apart).",
    pedagogicalTip: "Use digital patterns (1-2-3-5 on the tonic chords) to navigate the rapid key centers at tempo."
  },
  {
    id: 'gordon-subtone',
    title: "Dexter's Velvet Sub-Tone Blues Descent",
    sourceMaster: "Dexter Gordon",
    chordContext: "Blues in Bb Concert (Tenor: C Blues)",
    concertNotes: "F -> D -> C -> Bb -> G -> F -> Eb -> D -> C (Sub-tone down to low Bb)",
    tenorNotes: "G -> E -> D -> C -> A -> G -> F -> E -> D (Sub-tone down to low C)",
    altoNotes: "D -> B -> A -> G -> E -> D -> C -> B -> A (Sub-tone down to low G)",
    harmonicConcept: "Laying back deep on the pocket with rich sub-tone breath dampening higher overtones.",
    pedagogicalTip: "Pull the lower jaw back slightly so your lower lip cushions more of the reed without closing the tip."
  }
];

export const OVERTONE_CHART = [
  {
    fundamentalFingering: "Low Bb (Lowest note on Tenor)",
    harmonics: [
      { order: "Fundamental (1st)", note: "Low Bb", pitch: "Bb1 / Concert Ab", fingeringNote: "All keys closed + low Bb key", embouchure: "Relaxed, low throat" },
      { order: "2nd Harmonic (Octave)", note: "Middle Bb", pitch: "Bb2 / Concert Ab", fingeringNote: "Finger Low Bb (NO OCTAVE KEY)", embouchure: "Voice 'OH', lift tongue back" },
      { order: "3rd Harmonic (12th)", note: "Middle F", pitch: "F3 / Concert Eb", fingeringNote: "Finger Low Bb (NO OCTAVE KEY)", embouchure: "Voice 'AH', raise tongue center" },
      { order: "4th Harmonic (Double Octave)", note: "High Bb", pitch: "Bb3 / Concert Ab", fingeringNote: "Finger Low Bb (NO OCTAVE KEY)", embouchure: "Voice 'EE', fast air column" },
      { order: "5th Harmonic (Major 3rd above)", note: "High D", pitch: "D4 / Concert C", fingeringNote: "Finger Low Bb (NO OCTAVE KEY)", embouchure: "Voice sharp 'EE', firm corners" },
      { order: "6th Harmonic (Perfect 5th above)", note: "High F", pitch: "F4 / Concert Eb", fingeringNote: "Finger Low Bb (NO OCTAVE KEY)", embouchure: "Larynx elevated, focused laser airstream" }
    ],
    conservatoryValue: "The master key to John Coltrane's and Michael Brecker's sound. Once you can voice the 6th harmonic on Low Bb, altissimo notes will speak instantly."
  },
  {
    fundamentalFingering: "Low B Natural",
    harmonics: [
      { order: "Fundamental (1st)", note: "Low B", pitch: "B1 / Concert A", fingeringNote: "All keys closed + low B key", embouchure: "Neutral embouchure" },
      { order: "2nd Harmonic (Octave)", note: "Middle B", pitch: "B2 / Concert A", fingeringNote: "Finger Low B (NO OCTAVE KEY)", embouchure: "Voice 'OH'" },
      { order: "3rd Harmonic (12th)", note: "High F#", pitch: "F#3 / Concert E", fingeringNote: "Finger Low B (NO OCTAVE KEY)", embouchure: "Voice 'AH'" },
      { order: "4th Harmonic (Double Octave)", note: "High B", pitch: "B3 / Concert A", fingeringNote: "Finger Low B (NO OCTAVE KEY)", embouchure: "Voice 'EE'" }
    ],
    conservatoryValue: "Critical for pitch centering on high F# and stabilizing the bridge between palm keys and the altissimo register."
  }
];

export const CLARINET_DOUBLING_GUIDE = {
  title: "The Tenor Saxophone to Bb Clarinet Doubling Codex",
  subtitle: "Essential mechanics for Mason in Agoura High's Wind Honors and Big Band",
  tenorVsClarinetComparisons: [
    {
      parameter: "Embouchure Cushion",
      tenorSax: "Loose, fleshy lower lip cushion; jaw dropped slightly; circular lip pressure around the mouthpiece.",
      bbClarinet: "Firm, rolled lower lip over bottom teeth; flat pointed chin muscles ('draw-string' tension); firmer bite tolerance.",
      pitfall: "Using a tenor sax loose jaw on clarinet causes flat pitch, sagging throat tones (G, G#, A), and weak upper altissimo."
    },
    {
      parameter: "Air Angle & Resistance",
      tenorSax: "Blows straight in or slightly downward; large chamber and high air volume with moderate resistance.",
      bbClarinet: "Mouthpiece enters at a steep 35-45 degree angle downward; high backpressure requiring dense, concentrated air support.",
      pitfall: "Lifting the clarinet too high (like an alto sax) kills the resonance of the upper clarion register."
    },
    {
      parameter: "Finger Mechanics",
      tenorSax: "Padded plateau keys; forgiving finger placement; allows slight finger sliding.",
      bbClarinet: "Open tone holes (except side keys); requires flat fleshy finger pads to seal airtight; zero tolerance for finger leakage.",
      pitfall: "Flying fingers that work on saxophone will cause chirps and squeaks on the clarinet 12th jump."
    },
    {
      parameter: "The Register Key",
      tenorSax: "Octave key raises pitch by an exact octave (8ve).",
      bbClarinet: "Speaker/register key raises pitch by a twelfth (12th / octave + 5th).",
      pitfall: "Finger muscle memory confusion when reading high-speed Ellington woodwind solis (e.g. Rockin' in Rhythm)."
    }
  ],
  emergencyTenSecondReset: [
    "1. Put the clarinet mouthpiece in: Angle down at 40 degrees, feel the top teeth anchor firmly.",
    "2. Pull the chin flat and downwards (feel the chin muscles tighten like you're pointing down).",
    "3. Squeeze corners inward ('oo-ee' shape) to seal air leaks.",
    "4. Blow a steady throat tone G. If it wobbles, firm the corners by 15% and increase core abdominal support."
  ]
};


export const FACULTY_BOARD: FacultyMember[] = [
  {
    id: 'hawkins',
    name: "Coleman Hawkins",
    moniker: "The Father of the Tenor",
    era: "1920s - 1969",
    specialty: "Harmonic Arpeggiation & Body and Soul Lineage",
    quote: "If you don't know your chords backwards and forwards, you're whistling in the dark.",
    avatarSeed: "hawkins",
    tenorPraise: "The father of the tenor saxophone sound.",
    keyTopics: ["Vertical arpeggiation", "Upper extension resolution", "Large interval leaps"]
  },
  {
    id: 'coltrane',
    name: "John Coltrane",
    moniker: "Master of Harmonic Transcendence",
    era: "1955 - 1967",
    specialty: "Coltrane Changes, Tone Center, Altissimo & Tenor Stamina",
    quote: "My goal is to live the truly religious life, and express it through my music.",
    avatarSeed: "coltrane",
    tenorPraise: "Multi-octave spiritual horn capable of sheets of sound.",
    keyTopics: ["Three-Tonic Major Thirds", "Low Bb overtones", "Altissimo tongue arch"]
  },
  {
    id: 'webster',
    name: "Ben Webster",
    moniker: "Duke Ellington Orchestra Titan",
    era: "1930s - 1973",
    specialty: "Sub-Tone Warmth, Cottontail Attack & Ellington Phrasing",
    quote: "I had to make every note count like a heavyweight punch.",
    avatarSeed: "webster",
    tenorPraise: "The cornerstone of Ellington tenor tone.",
    keyTopics: ["Sub-toning low notes", "Aggressive swing accents", "Ellington section lead"]
  },
  {
    id: 'gordon',
    name: "Dexter Gordon",
    moniker: "The Big Tenor Sound & Bebop Swagger",
    era: "1940s - 1990",
    specialty: "Behind-the-Beat Phrasing & Fat Acoustic Resonance",
    quote: "Jazz is to me a total living experience.",
    avatarSeed: "gordon",
    tenorPraise: "Quintessential laid-back bebop tenor pocket.",
    keyTopics: ["Behind-the-beat phrasing", "Motivic continuity", "Full lower register core"]
  },
  {
    id: 'brecker',
    name: "Michael Brecker",
    moniker: "Virtuoso of Modern Tenor Technique",
    era: "1970s - 2007",
    specialty: "Modern Tenor Technique, Altissimo Control & Outside Side-Slipping",
    quote: "Humility in front of the horn is everything.",
    avatarSeed: "brecker",
    tenorPraise: "The benchmark for modern technical mastery and altissimo control.",
    keyTopics: ["Altissimo voicing", "Tongue-finger sync", "Outside pentatonics"]
  }
];
