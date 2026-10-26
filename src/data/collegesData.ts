import { CollegeAuditionProfile } from '../types/masterclass';
import { JAZZ_IMAGES } from '../assets/imageAssets';

export const TOP_25_COLLEGES_DATABASE: CollegeAuditionProfile[] = [
  {
    id: 'juilliard',
    schoolName: "The Juilliard School",
    divisionOrCollege: "Jazz Studies Division",
    location: "Lincoln Center, New York, NY",
    programType: "Conservatory",
    officialWebsite: "https://www.juilliard.edu",
    auditionPortalUrl: "https://www.juilliard.edu/admissions/music/jazz-studies-admissions",
    eduUrl: "https://www.juilliard.edu",
    musicDeptUrl: "https://www.juilliard.edu/music/jazz",
    imageBanner: JAZZ_IMAGES.lincolnCenterHall,
    degreesOffered: ["B.M. Jazz Studies", "M.M. Jazz Studies", "Artist Diploma"],
    facultyHighlights: ["Wynton Marsalis (Director)", "Ted Nash (Saxophone)", "Ron Blake (Tenor Saxophone)"],
    acceptanceRate: "~3%",
    scholarshipReality: "Need-blind admissions; full and near-full tuition packages available for top-tier admitted students, but only 1-2 tenor saxophonists admitted per year nationally.",
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
    careerOutcomes: {
      primaryRoles: ["Jazz at Lincoln Center Orchestra Member", "International Touring Bandleader", "Broadway Lead Woodwind", "Conservatory Professor"],
      typicalEmployersOrGigs: ["Lincoln Center Jazz Orchestra", "Blue Note / Verve Records", "The Village Vanguard", "Juilliard / MSM Faculty Chairs"],
      estimatedSalaryRange: "$55,000 - $140,000/yr (early-career performance & touring)",
      midCareerPotential: "$110,000 - $260,000+ (established soloist, recording artist, or university faculty)",
      industryDescription: "Juilliard jazz graduates enter the highest echelon of the international jazz industry. The Lincoln Center network directly feeds alumni into major touring bands, global festival circuits, and top university faculty chairs."
    },
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
    officialWebsite: "https://www.msmnyc.edu",
    auditionPortalUrl: "https://www.msmnyc.edu/admissions/audition-information/",
    eduUrl: "https://www.msmnyc.edu",
    musicDeptUrl: "https://www.msmnyc.edu/programs/jazz-arts/",
    imageBanner: JAZZ_IMAGES.auditionHall,
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
    careerOutcomes: {
      primaryRoles: ["NYC Freelance Tenor Specialist", "Contemporary Jazz Bandleader", "Broadway Woodwind Sub", "Recording Studio Sideman"],
      typicalEmployersOrGigs: ["Smalls Jazz Club", "Smoke Jazz Club", "David Bowie's Blackstar alumni circles", "European Jazz Festival Circuit"],
      estimatedSalaryRange: "$50,000 - $125,000/yr (gigging, private studio, commercial sessions)",
      midCareerPotential: "$90,000 - $210,000+ (album tours, commercial production, teaching)",
      industryDescription: "MSM is woven directly into the fabric of the uptown and downtown New York jazz club scenes. Graduates frequently form modern touring ensembles and record for Blue Note, ECM, and Criss Cross."
    },
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
    officialWebsite: "https://www.usc.edu",
    auditionPortalUrl: "https://music.usc.edu/admission/auditions/",
    eduUrl: "https://www.usc.edu",
    musicDeptUrl: "https://music.usc.edu/departments/jazz/",
    imageBanner: JAZZ_IMAGES.recordingStudioBooth,
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
    careerOutcomes: {
      primaryRoles: ["Hollywood Film & TV Scoring Saxophonist", "Touring Commercial Woodwind", "Big Band Arranger", "Universal / Warner Studio Musician"],
      typicalEmployersOrGigs: ["Warner Bros., Sony, 20th Century Fox scoring stages", "The Voice / American Idol live bands", "Gordon Goodwin's Big Phat Band roster"],
      estimatedSalaryRange: "$65,000 - $160,000/yr (film sessions, AFM union scale, national tours)",
      midCareerPotential: "$130,000 - $320,000+ (top-tier Hollywood studio roster chair)",
      industryDescription: "Thornton is the undisputed pipeline into the Los Angeles studio recording and film scoring ecosystem. Woodwind doublers (tenor + clarinet + flute) trained here dominate major Hollywood motion picture soundtracks."
    },
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
    officialWebsite: "https://www.unt.edu",
    auditionPortalUrl: "https://jazz.unt.edu/auditions",
    eduUrl: "https://www.unt.edu",
    musicDeptUrl: "https://jazz.unt.edu",
    imageBanner: JAZZ_IMAGES.studioMixingConsole,
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
    careerOutcomes: {
      primaryRoles: ["Military Premier Band Saxophonist (Army Blues, Airmen of Note)", "University Jazz Director", "Cruise Line Musical Director", "Touring Big Band Soloist"],
      typicalEmployersOrGigs: ["US Military Premier Bands (E-6 rank starting ~$75k+ benefits)", "Stan Kenton / Woody Herman ghost bands", "Higher education jazz faculties"],
      estimatedSalaryRange: "$52,000 - $115,000/yr (academic appointments, military jazz ensembles, touring)",
      midCareerPotential: "$95,000 - $190,000+ (tenured professor, military master chief, or national clinician)",
      industryDescription: "UNT's One O'Clock Lab Band has earned dozens of Grammy nominations. North Texas alumni hold more college jazz professorships and premier military jazz chairs than nearly any other program."
    },
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
    officialWebsite: "https://www.berklee.edu",
    auditionPortalUrl: "https://www.berklee.edu/admissions/undergraduate/audition-and-interview",
    eduUrl: "https://www.berklee.edu",
    musicDeptUrl: "https://www.berklee.edu/woodwinds",
    imageBanner: JAZZ_IMAGES.collegeQuad,
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
    careerOutcomes: {
      primaryRoles: ["International Touring Soloist", "Film & Game Audio Producer", "Global Festival Headliner", "Music Industry Entrepreneur"],
      typicalEmployersOrGigs: ["Snarky Puppy, Esperanza Spalding alumni networks", "Blue Note / Mack Avenue Records", "Independent global touring agencies"],
      estimatedSalaryRange: "$45,000 - $130,000/yr (touring, digital streaming, royalties, session work)",
      midCareerPotential: "$90,000 - $250,000+ (producer/artist with global tour revenue)",
      industryDescription: "Berklee boasts the largest contemporary music alumni network in the world. Graduating saxophonists frequently lead genre-bending bands blending jazz, neo-soul, Afrobeat, and electronic music."
    },
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
    officialWebsite: "https://www.indiana.edu",
    auditionPortalUrl: "https://music.indiana.edu/admissions/auditions/jazz.html",
    eduUrl: "https://www.indiana.edu",
    musicDeptUrl: "https://music.indiana.edu/degrees-programs/jazz-studies/",
    imageBanner: JAZZ_IMAGES.facultyJazzHall,
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
    careerOutcomes: {
      primaryRoles: ["University Jazz Director", "Chicago / Midwest Jazz Scene Soloist", "Major Symphony Woodwind Sub", "Arts Administrator"],
      typicalEmployersOrGigs: ["Chicago Jazz Festival ensembles", "Green Mill Jazz Club", "Regional Midwest universities and arts foundations"],
      estimatedSalaryRange: "$48,000 - $110,000/yr (university teaching, orchestral subs, jazz gigs)",
      midCareerPotential: "$90,000 - $185,000+ (tenured associate professor or regional arts director)",
      industryDescription: "Jacobs pairs elite conservatory musical rigor with the full academic weight of a Big Ten university. Graduates are renowned for impeccable classical tone discipline and deep harmonic scholarship."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Reddit review: Jacobs combines the academic rigor of a Big Ten research university with one of the most revered classical and jazz conservatories in the world. Beautiful acoustic facilities.",
      tempoTrap: "Tom Walsh listens intently for classical tone fundamentals combined with authentic jazz vocabulary. Clean intonation across register breaks is essential.",
      sightReadingReality: "Solid big band charts with complex key signatures.",
      theInterviewVibe: "Faculty are warm, intellectual, and focused on longevity and injury-free saxophone mechanics.",
      communityTip: "Great balance of conservatory intensity with full university campus life."
    }
  },
  {
    id: 'eastman',
    schoolName: "Eastman School of Music",
    divisionOrCollege: "Jazz Studies & Contemporary Media",
    location: "Rochester, NY",
    programType: "Conservatory",
    officialWebsite: "https://www.rochester.edu",
    auditionPortalUrl: "https://www.esm.rochester.edu/admissions/ugrad/auditions/jazz/",
    eduUrl: "https://www.rochester.edu",
    musicDeptUrl: "https://www.esm.rochester.edu/jazz/",
    imageBanner: JAZZ_IMAGES.auditionHall,
    degreesOffered: ["B.M. Jazz Studies & Contemporary Media", "M.M. Jazz Studies", "D.M.A."],
    facultyHighlights: ["Charles Pillow (Woodwind Doubler Icon)", "Bill Dobbins", "Jeff Campbell"],
    acceptanceRate: "~9%",
    scholarshipReality: "Substantial merit scholarships based on audition excellence; almost all admitted jazz majors receive financial aid packages.",
    prescreeningRequirements: [
      "1. Bebop standard @ 200+ BPM with clean articulation",
      "2. Ellington/Strayhorn ballad",
      "3. Demonstration of woodwind doubling (clarinet or flute) strongly favorable",
      "4. Major/minor scales and harmonic minor modes"
    ],
    liveAuditionFormat: [
      "Auditions in Miller Theater or Hatch Recital Hall",
      "Faculty rhythm section collaboration",
      "Rigorous ear training and harmonic sight-reading test"
    ],
    careerOutcomes: {
      primaryRoles: ["NYC Broadway Pit Woodwind Doubler", "Studio Arranger & Composer", "Higher Education Jazz Chair", "Orchestral Jazz Soloist"],
      typicalEmployersOrGigs: ["Broadway League Theater Orchestras", "Lincoln Center American Songbook series", "Premier conservatories worldwide"],
      estimatedSalaryRange: "$54,000 - $130,000/yr (Broadway union scale $1,900+/wk, university adjunct, session work)",
      midCareerPotential: "$105,000 - $220,000+ (tenured faculty chair or permanent Broadway woodwind chair)",
      industryDescription: "Eastman is famous for producing the highest caliber woodwind doublers in the nation. Professor Charles Pillow is himself a premier NYC doubler, making Eastman the top choice for players who want to master both tenor and clarinet."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Clinical, refined, highly intellectual. Charles Pillow and Bill Dobbins want to see that you comprehend voice leading and acoustic resonance.",
      tempoTrap: "They listen for tone purity and intonation in the upper register. Never squeeze the reed.",
      sightReadingReality: "Densely harmonized lead sheets with altered dominants and modal interchanges.",
      theInterviewVibe: "Focus on musical literacy, work ethic, and desire to master multiple instruments.",
      communityTip: "If you want a Broadway pit career or NYC studio career doubling on clarinet, Eastman is unmatched."
    }
  },
  {
    id: 'nec',
    schoolName: "New England Conservatory (NEC)",
    divisionOrCollege: "Jazz Studies & Contemporary Musical Arts",
    location: "Boston, MA",
    programType: "Conservatory",
    officialWebsite: "https://www.necmusic.edu",
    auditionPortalUrl: "https://necmusic.edu/admissions/jazz-audition-requirements",
    eduUrl: "https://necmusic.edu",
    musicDeptUrl: "https://necmusic.edu/jazz-studies",
    imageBanner: JAZZ_IMAGES.collegeQuad,
    degreesOffered: ["B.M. Jazz Performance", "M.M. Jazz Performance", "Artist Diploma"],
    facultyHighlights: ["Jerry Bergonzi (Saxophone Legend)", "Donny McCaslin", "Ken Schaphorst"],
    acceptanceRate: "~11%",
    scholarshipReality: "Merit scholarships awarded directly from audition rankings; Bergonzi's studio is one of the most revered in jazz history.",
    prescreeningRequirements: [
      "1. Bebop standard highlighting chromatic voice leading",
      "2. Modal or contemporary jazz piece",
      "3. Free improvisation or open ballad",
      "4. Demonstration of unique sonic identity"
    ],
    liveAuditionFormat: [
      "Performance in historic Jordan Hall or Pierce Hall",
      "Playing with rhythm section; faculty often request to hear Bergonzi hexatonics or inside/outside playing",
      "Ear training call-and-response"
    ],
    careerOutcomes: {
      primaryRoles: ["Avant-Garde & Contemporary Jazz Leader", "International Festival Headliner", "Author of Pedagogical Texts", "European Label Recording Artist"],
      typicalEmployersOrGigs: ["ECM Records, Clean Feed, Pi Recordings", "European jazz festival circuits (North Sea, Montreux, Umbria)"],
      estimatedSalaryRange: "$46,000 - $120,000/yr (touring, grants, masterclasses, residencies)",
      midCareerPotential: "$90,000 - $200,000+ (global recording artist, Guggenheim fellow, or faculty)",
      industryDescription: "NEC is the intellectual epicenter of modern and boundary-pushing jazz. With faculty like Jerry Bergonzi (author of 'Inside Improvisation'), students master deep harmonic systems and develop fierce artistic originality."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Intense focus on artistic individuality. Jerry Bergonzi wants to hear you take risks, not play safe licks out of a book.",
      tempoTrap: "Don't just play standard bebop licks; show harmonic awareness using triads, pentatonics, and clean resolutions.",
      sightReadingReality: "Contemporary scores, graphic notation, and odd meters.",
      theInterviewVibe: "They want to know what books you read and what artistic questions keep you up at night.",
      communityTip: "Studying under Jerry Bergonzi is considered a life-changing rite of passage for tenor saxophonists."
    }
  },
  {
    id: 'frost_miami',
    schoolName: "University of Miami - Frost School of Music",
    divisionOrCollege: "Studio Jazz Writing & Instrumental Performance",
    location: "Coral Gables, FL",
    programType: "University School of Music",
    officialWebsite: "https://www.miami.edu",
    auditionPortalUrl: "https://www.frost.miami.edu/admissions/undergraduate/auditions/index.html",
    eduUrl: "https://www.miami.edu",
    musicDeptUrl: "https://www.frost.miami.edu/academics/departments/studio-music-and-jazz/",
    imageBanner: JAZZ_IMAGES.recordingStudioBooth,
    degreesOffered: ["B.M. Studio Music & Jazz", "M.M. Jazz Pedagogy", "D.M.A."],
    facultyHighlights: ["Marcus Strickland (Tenor Titan)", "John Daversa", "Dafnis Prieto"],
    acceptanceRate: "~14%",
    scholarshipReality: "The Frost Method combines robust university merit aid with Frost Dean's Music Scholarships.",
    prescreeningRequirements: [
      "1. Up-tempo swing tune (Cherokee, Cottontail)",
      "2. Afro-Cuban or Latin jazz piece",
      "3. Jazz ballad with cadenza",
      "4. Major scales and dorian/mixolydian modes"
    ],
    liveAuditionFormat: [
      "Auditions in the Weeks Center for Recording & Performance",
      "Ensemble interaction testing Latin clave feel and straight swing",
      "Sight-reading commercial studio charts"
    ],
    careerOutcomes: {
      primaryRoles: ["Miami / Latin Grammy Studio Soloist", "Touring Pop & R&B Horn Arranger", "Commercial Recording Musician", "Contemporary Music Producer"],
      typicalEmployersOrGigs: ["Sony Music Latin, Universal Music Latin Entertainment", "Major Latin & Pop arena tours", "Miami & LA commercial studios"],
      estimatedSalaryRange: "$52,000 - $135,000/yr (commercial tours, session tracking, Latin music awards)",
      midCareerPotential: "$100,000 - $240,000+ (Grammy-winning producer, arranger, or lead touring horn)",
      industryDescription: "Frost pioneered the experiential Frost Method, training musicians who are equally lethal in traditional bebop, modern fusion, and Latin/Afro-Cuban rhythms. Miami's booming commercial music scene provides abundant early gigs."
    },
    redditApplicantIntel: {
      roomAtmosphere: "High-energy, modern, production-focused. Faculty are active Grammy winners.",
      tempoTrap: "They test your clave alignment and rhythm pocket. If your Latin 8th notes sound like stiff high school band rhythms, practice with authentic salsa/guaguanco records.",
      sightReadingReality: "High-tempo charts with tight syncopation.",
      theInterviewVibe: "Warm, professional, industry-oriented.",
      communityTip: "Marcus Strickland joining the faculty makes Frost one of the hottest tenor destinations in the South."
    }
  },
  {
    id: 'umich',
    schoolName: "University of Michigan - SMTD",
    divisionOrCollege: "Department of Jazz & Contemporary Improvisation",
    location: "Ann Arbor, MI",
    programType: "University School of Music",
    officialWebsite: "https://www.umich.edu",
    auditionPortalUrl: "https://smtd.umich.edu/admissions/undergraduate-admissions/auditions-interviews/",
    eduUrl: "https://www.umich.edu",
    musicDeptUrl: "https://smtd.umich.edu/departments/jazz-contemporary-improvisation/",
    imageBanner: JAZZ_IMAGES.facultyJazzHall,
    degreesOffered: ["B.M. Jazz Studies", "B.F.A. Jazz & Contemporary Improvisation"],
    facultyHighlights: ["Andrew Bishop (Saxophone & Chair)", "Ellen Rowe", "Robert Hurst (Bassist for Wynton Marsalis)"],
    acceptanceRate: "~12%",
    scholarshipReality: "SMTD Artistic Merit awards combined with University of Michigan's extensive alumni endowments.",
    prescreeningRequirements: [
      "1. Fast Bebop tune (Confirmation, Donna Lee)",
      "2. Ballad with warm tone center",
      "3. Original composition or modern modal tune",
      "4. Sight-singing and scale facility"
    ],
    liveAuditionFormat: [
      "Audition in the Moore Building in Ann Arbor",
      "Live combo interaction with Robert Hurst on bass",
      "Sight-reading and motivic improvisation exercise"
    ],
    careerOutcomes: {
      primaryRoles: ["Detroit & Chicago Jazz Circuit Leader", "University Professor", "Chamber Jazz Composer", "Nonprofit Arts Executive"],
      typicalEmployersOrGigs: ["Detroit Jazz Festival (world's largest free festival)", "Midwest Big Ten music departments", "Blue Note / Mack Avenue artists"],
      estimatedSalaryRange: "$48,000 - $115,000/yr (teaching, regional touring, jazz residencies)",
      midCareerPotential: "$92,000 - $195,000+ (tenured professor or prominent Midwest bandleader)",
      industryDescription: "UMich pairs the global prestige of a world-class research university with a deeply creative jazz program rooted in Detroit's legendary jazz history (Barry Harris, Joe Henderson, Kenny Burrell)."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Supportive yet intensely rigorous. Robert Hurst's presence on bass means your time feel must be rock solid.",
      tempoTrap: "Don't drag! Michigan faculty prize forward swing momentum and deep blues inflections.",
      sightReadingReality: "Contemporary lead sheets with odd phrase lengths.",
      theInterviewVibe: "Intellectual, community-minded, exploring how jazz connects with society.",
      communityTip: "Proximity to the Detroit jazz scene gives students access to authentic mentorship from legendary elders."
    }
  },
  {
    id: 'oberlin',
    schoolName: "Oberlin Conservatory of Music",
    divisionOrCollege: "Jazz Studies Division",
    location: "Oberlin, OH",
    programType: "Conservatory",
    officialWebsite: "https://www.oberlin.edu",
    auditionPortalUrl: "https://www.oberlin.edu/conservatory/admissions/auditions/jazz-studies",
    eduUrl: "https://www.oberlin.edu",
    musicDeptUrl: "https://www.oberlin.edu/conservatory/jazz",
    imageBanner: JAZZ_IMAGES.collegeQuad,
    degreesOffered: ["B.M. Jazz Studies", "Double Degree B.M./B.A. (5-Year)"],
    facultyHighlights: ["Chris Anderson (Saxophone)", "Eddie Henderson (Trumpet Icon)", "Gary Bartz"],
    acceptanceRate: "~15%",
    scholarshipReality: "Oberlin meets 100% of demonstrated financial need and awards generous Conservatory Dean's Scholarships.",
    prescreeningRequirements: [
      "1. Bebop standard @ 200+ BPM",
      "2. Ellington standard or ballad",
      "3. Blues in two contrasting keys",
      "4. Major and minor scales"
    ],
    liveAuditionFormat: [
      "Live audition in the Bertram and Judith Kohl Building (state-of-the-art jazz facility)",
      "Playing with Oberlin faculty rhythm section",
      "Improvisation on unfamiliar chord progression"
    ],
    careerOutcomes: {
      primaryRoles: ["NYC Jazz Leader & Composer", "Double Degree Industry Leader (Law/Music)", "Ethnomusicologist", "Touring Sideman"],
      typicalEmployersOrGigs: ["New York jazz clubs (Village Vanguard, Jazz Gallery)", "Major international NGOs and music copyright law firms"],
      estimatedSalaryRange: "$50,000 - $120,000/yr (music performance & interdisciplinary careers)",
      midCareerPotential: "$95,000 - $210,000+ (dual career in law/arts management or touring artist)",
      industryDescription: "Oberlin's famous 5-year Double Degree program allows Mason to earn both a Bachelor of Music in Jazz and a Bachelor of Arts in Economics, Physics, or Computer Science, creating unparalleled career flexibility."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Warm, artistic, highly collaborative. The Kohl Building has world-class acoustic recording studios.",
      tempoTrap: "Eddie Henderson and faculty look for historical vocabulary and soulful blues inflection.",
      sightReadingReality: "Classic Wayne Shorter and Thelonious Monk tunes.",
      theInterviewVibe: "Passionate about intellectual breadth, social justice, and artistic authenticity.",
      communityTip: "The Oberlin-to-NYC pipeline is legendary; graduates move into Brooklyn apartments and form active gigging bands."
    }
  },
  {
    id: 'unf',
    schoolName: "University of North Florida (UNF)",
    divisionOrCollege: "Jazz Studies Program (Great American Jazz Series)",
    location: "Jacksonville, FL",
    programType: "University School of Music",
    officialWebsite: "https://www.unf.edu",
    auditionPortalUrl: "https://www.unf.edu/coas/music/auditions.html",
    eduUrl: "https://www.unf.edu",
    musicDeptUrl: "https://www.unf.edu/coas/music/jazz.html",
    imageBanner: JAZZ_IMAGES.auditionHall,
    degreesOffered: ["B.M. Jazz Studies", "M.M. Jazz Studies"],
    facultyHighlights: ["J.B. Scott (Program Director)", "Todd DelGiudice (Saxophone/Clarinet Double Specialist)"],
    acceptanceRate: "~22%",
    scholarshipReality: "Outstanding talent scholarships, and Florida Bright Futures makes UNF one of the most affordable elite programs.",
    prescreeningRequirements: [
      "1. Up-tempo swing tune (Oleo, Cottontail)",
      "2. Standard ballad with vibrato control",
      "3. 12-bar blues in F and Bb"
    ],
    liveAuditionFormat: [
      "Audition in the Robinson Theater",
      "Big band lead saxophone sight-reading test",
      "Clarinet doubling assessment if applicable"
    ],
    careerOutcomes: {
      primaryRoles: ["Walt Disney World / Universal Premier Musician", "Lead Big Band Tenor", "Cruise Line Entertainment Director", "High School Jazz Director"],
      typicalEmployersOrGigs: ["Disney World Theme Park Bands ($60k-$90k starting union)", "Royal Caribbean / Norwegian Cruise Lines", "Florida top high school programs"],
      estimatedSalaryRange: "$48,000 - $98,000/yr (steady Orlando/Jacksonville entertainment contracts)",
      midCareerPotential: "$85,000 - $160,000+ (show director, entertainment manager, or department head)",
      industryDescription: "UNF Jazz is a national powerhouse for big band precision. Founded by Rich Matteson, its alumni dominate high-paying live entertainment contracts in Orlando, cruise lines, and top studio orchestras."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Down-to-earth, high-swinging, intensely focused on big band section cohesion.",
      tempoTrap: "Clean swing articulation! They want to hear that crisp 'doo-dle-am-doo-dat' tongue-slur phrasing.",
      sightReadingReality: "Heavy big band lead sheets with tight dynamic marks.",
      theInterviewVibe: "Professional, humble, team player attitude.",
      communityTip: "UNF's guest artist series brings Wynton Marsalis, Chris Potter, and Maria Schneider to play with students every semester."
    }
  },
  {
    id: 'wmu',
    schoolName: "Western Michigan University (WMU)",
    divisionOrCollege: "Jazz Studies Department",
    location: "Kalamazoo, MI",
    programType: "University School of Music",
    officialWebsite: "https://www.wmich.edu",
    auditionPortalUrl: "https://wmich.edu/music/admissions/undergraduate/auditions",
    eduUrl: "https://www.wmich.edu",
    musicDeptUrl: "https://wmich.edu/jazz",
    imageBanner: JAZZ_IMAGES.facultyJazzHall,
    degreesOffered: ["B.M. Jazz Studies", "M.M. Jazz Performance"],
    facultyHighlights: ["Andrew Rathbun (Saxophone)", "Scott Cowan", "Keith Hall"],
    acceptanceRate: "~20%",
    scholarshipReality: "WMU offers generous out-of-state tuition matches and competitive jazz scholarship packages.",
    prescreeningRequirements: [
      "1. Fast Bebop tune or Charlie Parker head",
      "2. Ellington / Strayhorn ballad",
      "3. Medium tempo blues with chromatic enclosures"
    ],
    liveAuditionFormat: [
      "Dalton Center Recital Hall auditions",
      "Interactive improvisation with faculty combo",
      "Sight-reading from the standard jazz repertoire"
    ],
    careerOutcomes: {
      primaryRoles: ["National DownBeat Award-Winning Performer", "Chicago Jazz Club Leader", "Studio Arranger", "Secondary Education Music Director"],
      typicalEmployersOrGigs: ["DownBeat Student Music Awards (WMU has won over 180 awards)", "Chicago jazz scene", "National jazz festivals"],
      estimatedSalaryRange: "$46,000 - $105,000/yr (touring, private teaching, gigging)",
      midCareerPotential: "$85,000 - $175,000+ (established bandleader or educator)",
      industryDescription: "WMU is a perennial giant in the DownBeat Student Music Awards, having won more awards than nearly any other university. Agoura High alum Christian Euman studied here before launching his global touring career."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Collegial, focused on harmonic mastery, tight-knit student community.",
      tempoTrap: "Keep your eighth notes even and buoyant at high tempos.",
      sightReadingReality: "Complex modern jazz contrafacts.",
      theInterviewVibe: "Passionate about composition and ensemble leadership.",
      communityTip: "The direct Agoura-to-WMU connection (Christian Euman) gives Mason strong familiarity with the faculty."
    }
  },
  {
    id: 'temple',
    schoolName: "Temple University - Boyer College of Music",
    divisionOrCollege: "Jazz Studies Program",
    location: "Philadelphia, PA",
    programType: "University School of Music",
    officialWebsite: "https://www.temple.edu",
    auditionPortalUrl: "https://boyer.temple.edu/admissions/auditions",
    eduUrl: "https://www.temple.edu",
    musicDeptUrl: "https://boyer.temple.edu/departments/jazz-studies",
    imageBanner: JAZZ_IMAGES.auditionHall,
    degreesOffered: ["B.M. Jazz Performance", "M.M. Jazz Studies"],
    facultyHighlights: ["Terell Stafford (Director, Trumpet Titan)", "Dick Oatts (Saxophone Master)", "Tim Warfield (Tenor Giant)"],
    acceptanceRate: "~18%",
    scholarshipReality: "Substantial Boyer College merit scholarships; proximity to both Philadelphia and New York jazz scenes.",
    prescreeningRequirements: [
      "1. Up-tempo rhythm changes (Cottontail, Oleo) @ 220+ BPM",
      "2. Ballad demonstrating tone center and sub-tone",
      "3. Minor blues with Parker vocabulary"
    ],
    liveAuditionFormat: [
      "Audition in Presser Hall with faculty rhythm section",
      "Dick Oatts often conducts personal saxophone feedback during the session",
      "Sight-reading big band charts"
    ],
    careerOutcomes: {
      primaryRoles: ["Vanguard Jazz Orchestra Sub / Member", "Philadelphia & NYC Jazz Leader", "University Professor", "Lead Big Band Tenor"],
      typicalEmployersOrGigs: ["Village Vanguard Jazz Orchestra", "Dizzy's Club Coca-Cola", "Philadelphia Clef Club of Jazz"],
      estimatedSalaryRange: "$50,000 - $125,000/yr (Philly/NYC gigs, touring, private studio)",
      midCareerPotential: "$95,000 - $210,000+ (top NYC big band chair or tenured faculty)",
      industryDescription: "Led by Terell Stafford and featuring Dick Oatts (lead alto of the Vanguard Jazz Orchestra), Temple offers an authentic hard-bop and big-band education just 90 minutes from Manhattan."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Soulful, heavy swing focus. Dick Oatts is looking for genuine bebop architecture.",
      tempoTrap: "Time feel must be deep in the pocket. Don't rush into your solos.",
      sightReadingReality: "Thad Jones / Mel Lewis arrangements with complex rhythms.",
      theInterviewVibe: "Warm, family-oriented, unpretentious.",
      communityTip: "Studying with Dick Oatts and Tim Warfield gives you a direct link to the Vanguard and Blue Note lineage."
    }
  },
  {
    id: 'sfcm',
    schoolName: "San Francisco Conservatory of Music (SFCM)",
    divisionOrCollege: "Roots, Jazz, and American Music (RJAM)",
    location: "Civic Center, San Francisco, CA",
    programType: "Conservatory",
    officialWebsite: "https://www.sfcm.edu",
    auditionPortalUrl: "https://sfcm.edu/admissions/collegiate-admissions/auditions",
    eduUrl: "https://www.sfcm.edu",
    musicDeptUrl: "https://sfcm.edu/study/roots-jazz-and-american-music",
    imageBanner: JAZZ_IMAGES.collegeQuad,
    degreesOffered: ["B.M. RJAM Performance", "M.M. RJAM Performance"],
    facultyHighlights: ["Chad Lefkowitz-Brown (Chad LB, Tenor Virtuoso)", "Joshua Redman (Artistic Advisor)", "Matt Wilson"],
    acceptanceRate: "~16%",
    scholarshipReality: "Significant endowed scholarships; partnership with SFJAZZ Collective provides premier masterclass access.",
    prescreeningRequirements: [
      "1. Bebop standard showing harmonic enclosures",
      "2. Wayne Shorter or Thelonious Monk tune",
      "3. Ballad with unaccompanied intro or cadenza",
      "4. Up-tempo rhythm changes"
    ],
    liveAuditionFormat: [
      "Auditions in the Bowes Center overlooking SF Civic Center",
      "Interaction with RJAM resident faculty",
      "Sight-reading modern modal lead sheets"
    ],
    careerOutcomes: {
      primaryRoles: ["Modern Social Media & Touring Saxophonist", "SFJAZZ Center Performer", "Digital Music Content Creator", "Bay Area Studio Musician"],
      typicalEmployersOrGigs: ["SFJAZZ Collective, SFJAZZ Center", "Chad LB Global Sax Clinics / Soundslice", "Silicon Valley corporate & private events"],
      estimatedSalaryRange: "$52,000 - $140,000/yr (gigs, masterclasses, online educational subscriptions)",
      midCareerPotential: "$100,000 - $250,000+ (digital entrepreneur and global touring artist)",
      industryDescription: "SFCM's RJAM program is uniquely partnered with SFJAZZ. With Chad Lefkowitz-Brown on faculty, students learn not only virtuosic bebop fluency but also how to build a lucrative modern digital brand as an independent saxophonist."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Modern, sleek, entrepreneurial. Faculty want to see both acoustic depth and modern technical velocity.",
      tempoTrap: "High velocity bebop! Chad LB values clean finger-tongue synchronization at 260+ BPM.",
      sightReadingReality: "Modern SFJAZZ arrangements.",
      theInterviewVibe: "Forward-thinking, curious about music technology and contemporary marketing.",
      communityTip: "The Bowes Center dorms and studios are brand new and among the finest student residences in the world."
    }
  },
  {
    id: 'calarts',
    schoolName: "California Institute of the Arts (CalArts)",
    divisionOrCollege: "The Herb Alpert School of Music",
    location: "Valencia, CA (Adjacent to Santa Clarita)",
    programType: "Contemporary College",
    officialWebsite: "https://www.calarts.edu",
    auditionPortalUrl: "https://music.calarts.edu/admissions/auditions-portfolio",
    eduUrl: "https://www.calarts.edu",
    musicDeptUrl: "https://music.calarts.edu",
    imageBanner: JAZZ_IMAGES.recordingStudioBooth,
    degreesOffered: ["B.F.A. Jazz Performance", "M.F.A. Performer-Composer"],
    facultyHighlights: ["Vinny Golia (Woodwind Master)", "Paul Novros", "Larry Koonse"],
    acceptanceRate: "~25%",
    scholarshipReality: "The Herb Alpert Foundation provides substantial scholarships for promising California jazz musicians.",
    prescreeningRequirements: [
      "1. Two contrasting jazz standards (one swing, one ballad)",
      "2. One original composition or free improvisation",
      "3. Demonstration of woodwind doubling or extended techniques"
    ],
    liveAuditionFormat: [
      "Intimate audition in The Roy O. Disney Concert Hall",
      "Open improvisation testing reactive listening",
      "Portfolio interview discussing original creative voice"
    ],
    careerOutcomes: {
      primaryRoles: ["Experimental Film Composer", "Avant-Garde Saxophonist", "Disney / Pixar Animation Musician", "Multi-Instrumental Sound Designer"],
      typicalEmployersOrGigs: ["Walt Disney Imagineering & Animation Studios", "LA contemporary art museums (LACMA, The Broad)", "Indie film productions"],
      estimatedSalaryRange: "$48,000 - $120,000/yr (film scoring, theater productions, gallery installations)",
      midCareerPotential: "$90,000 - $220,000+ (established media composer or sound artist)",
      industryDescription: "Located just over the hill from Agoura in Valencia, CalArts was founded by Walt Disney. It fosters extreme creative freedom, making it ideal for saxophonists who want to compose for animation and cross-disciplinary media."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Bohemian, avant-garde, deeply welcoming of eccentric musical experimentation.",
      tempoTrap: "They care more about original timbre, multiphonics, and emotional expression than textbook Parker licks.",
      sightReadingReality: "Non-standard notation, odd meters, and graphic scores.",
      theInterviewVibe: "Deeply exploratory: 'What does your music sound like when no one is watching?'",
      communityTip: "Great proximity to home (Conejo Valley) with a completely different artistic vibe than traditional conservatories."
    }
  },
  {
    id: 'ucla',
    schoolName: "UCLA Herb Alpert School of Music",
    divisionOrCollege: "Global Jazz Studies Department",
    location: "Westwood, Los Angeles, CA",
    programType: "University School of Music",
    officialWebsite: "https://www.ucla.edu",
    auditionPortalUrl: "https://schoolofmusic.ucla.edu/admissions/undergraduate/auditions/",
    eduUrl: "https://www.ucla.edu",
    musicDeptUrl: "https://schoolofmusic.ucla.edu/academics/departments/global-jazz-studies/",
    imageBanner: JAZZ_IMAGES.auditionHall,
    degreesOffered: ["B.A. Global Jazz Studies", "M.M. Jazz Performance"],
    facultyHighlights: ["Hitomi Oba (Saxophone)", "Arturo O'Farrill", "Kenny Burrell (Emeritus)"],
    acceptanceRate: "~11%",
    scholarshipReality: "UC in-state tuition for California residents makes UCLA an exceptional value; merit awards from the Herb Alpert Foundation.",
    prescreeningRequirements: [
      "1. Swing standard with 2 choruses of soloing",
      "2. Jazz ballad showcasing tone depth",
      "3. Latin / Afro-Cuban or straight-8th tune",
      "4. Brief video statement on your artistic vision"
    ],
    liveAuditionFormat: [
      "Auditions in Schoenberg Music Hall at UCLA",
      "Playing with student/faculty rhythm section",
      "Ear training and sight-reading evaluation"
    ],
    careerOutcomes: {
      primaryRoles: ["Los Angeles Commercial Musician", "Global Jazz Festival Artist", "Music Industry Executive", "Secondary & College Educator"],
      typicalEmployersOrGigs: ["LA recording studios", "The Blue Whale / Sam First Jazz Club", "Major streaming and entertainment companies (Universal Music Group, Spotify)"],
      estimatedSalaryRange: "$52,000 - $130,000/yr (gigging, licensing, studio work, education)",
      midCareerPotential: "$100,000 - $230,000+ (top commercial horn or music tech executive)",
      industryDescription: "UCLA Global Jazz Studies approaches jazz as an evolving global language. In-state California tuition and a prestigious Westwood campus offer Mason a premier education close to home."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Academically rigorous, culturally conscious, and grounded in the West Coast jazz tradition.",
      tempoTrap: "Solid time feel and melodic inventiveness over formulaic speed.",
      sightReadingReality: "Standard jazz tunes and odd-meter compositions.",
      theInterviewVibe: "They love students who can articulate the cultural significance of the music.",
      communityTip: "UCLA's high academic profile provides enormous versatility if Mason wants to double-major."
    }
  },
  {
    id: 'csun',
    schoolName: "California State University, Northridge (CSUN)",
    divisionOrCollege: "Jazz Studies Department",
    location: "Northridge, Los Angeles, CA",
    programType: "University School of Music",
    officialWebsite: "https://www.csun.edu",
    auditionPortalUrl: "https://www.csun.edu/mike-curb-arts-media-communication/music/audition-information",
    eduUrl: "https://www.csun.edu",
    musicDeptUrl: "https://www.csun.edu/mike-curb-arts-media-communication/music/jazz-studies",
    imageBanner: JAZZ_IMAGES.recordingStudioBooth,
    degreesOffered: ["B.M. Jazz Studies", "M.M. Jazz Performance"],
    facultyHighlights: ["Tina Raymond (Department Chair)", "Gary Pratt", "Rob Lockart (Saxophone Doubler)"],
    acceptanceRate: "~35% (Jazz 'A' Band <10%)",
    scholarshipReality: "Extremely affordable in-state CSU tuition (~$7,000/year); great merit scholarships for lead saxophone chairs.",
    prescreeningRequirements: [
      "1. Two contrasting jazz standards (Swing, Ballad, or Bossa)",
      "2. 12-bar blues in concert F and Bb",
      "3. All 12 major scales and chromatic scale full range"
    ],
    liveAuditionFormat: [
      "Cypress Hall auditions in the San Fernando Valley",
      "Live big band sight-reading test",
      "Clarinet doubling demonstration strongly rewarded"
    ],
    careerOutcomes: {
      primaryRoles: ["Hollywood Studio Woodwind Doubler", "Southern California Band Director", "LA Big Band Lead Tenor", "Touring Commercial Horn"],
      typicalEmployersOrGigs: ["LA session stages", "Southern California school districts (Agoura, Oak Park, Calabasas)", "Local professional big bands"],
      estimatedSalaryRange: "$55,000 - $115,000/yr (teaching credential starting ~$65k + weekend studio gigs)",
      midCareerPotential: "$95,000 - $180,000+ (veteran music educator with pension + studio residuals)",
      industryDescription: "CSUN Jazz 'A' Band has won the Monterey Next Generation Jazz Festival multiple times. Located just 25 minutes from Agoura High, CSUN has educated many of the top band directors and studio players in Southern California."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Hard-working, blue-collar, monster big band chops. Director Bob Hackett has deep respect for CSUN's program.",
      tempoTrap: "Big band sight-reading is the ultimate test. Nail your rhythms and dynamic cut-offs.",
      sightReadingReality: "Fast Sammy Nestico and Gordon Goodwin charts.",
      theInterviewVibe: "Friendly, direct, assessing your dedication to ensemble excellence.",
      communityTip: "A tremendous high-value financial choice: graduate debt-free while gigging across Los Angeles."
    }
  },
  {
    id: 'william_paterson',
    schoolName: "William Paterson University (WPUNJ)",
    divisionOrCollege: "Jazz Studies Department",
    location: "Wayne, NJ (20 Miles from NYC)",
    programType: "University School of Music",
    officialWebsite: "https://www.wpunj.edu",
    auditionPortalUrl: "https://www.wpunj.edu/coac/departments/music/jazz-studies/auditions.html",
    eduUrl: "https://www.wpunj.edu",
    musicDeptUrl: "https://www.wpunj.edu/coac/departments/music/jazz-studies/",
    imageBanner: JAZZ_IMAGES.facultyJazzHall,
    degreesOffered: ["B.M. Jazz Performance", "M.M. Jazz Studies"],
    facultyHighlights: ["Bill Charlap (Director, Grammy Winner)", "Vincent Herring (Saxophone Titan)", "Marcus Printup"],
    acceptanceRate: "~20%",
    scholarshipReality: "Out-of-state talent scholarships; 20 minutes from Midtown Manhattan with lower living costs than NYC.",
    prescreeningRequirements: [
      "1. Up-tempo Bebop tune @ 220+ BPM",
      "2. Standard ballad demonstrating vibrato and sub-tone",
      "3. 12-bar blues in two keys"
    ],
    liveAuditionFormat: [
      "Shea Center for Performing Arts auditions",
      "Playing with WPUNJ rhythm section",
      "Ear training call-and-response and chord identification"
    ],
    careerOutcomes: {
      primaryRoles: ["NYC Club Resident Musician", "Vanguard & Birdland Big Band Soloist", "Private Conservatory Instructor", "Touring Hard-Bop Bandleader"],
      typicalEmployersOrGigs: ["Birdland, Dizzy's Club, Blue Note NYC", "Smoke Sessions Records", "International European tours"],
      estimatedSalaryRange: "$48,000 - $120,000/yr (NYC gigging circuit, international clinics)",
      midCareerPotential: "$90,000 - $200,000+ (seasoned NYC artist, record label artist)",
      industryDescription: "Founded by Thad Jones and Rufus Reid, and now directed by piano legend Bill Charlap, William Paterson is legendary for authentic hard-bop training and daily access to NYC jam sessions."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Old-school, swing-drenched, deeply demanding of pure bebop vocabulary. Vincent Herring wants to hear clean Parker enclosures.",
      tempoTrap: "Don't rush the beat! Lay back and let the drummer push the time.",
      sightReadingReality: "Classic Blue Note arrangements from Art Blakey and Horace Silver.",
      theInterviewVibe: "Warm, respectful, testing your knowledge of jazz lineage.",
      communityTip: "Many WPUNJ students gig in Manhattan 4 nights a week while paying affordable New Jersey housing costs."
    }
  },
  {
    id: 'new_school',
    schoolName: "The New School - Mannes / Jazz",
    divisionOrCollege: "School of Jazz and Contemporary Music",
    location: "Greenwich Village, New York, NY",
    programType: "Contemporary College",
    officialWebsite: "https://www.newschool.edu",
    auditionPortalUrl: "https://www.newschool.edu/jazz/admissions-auditions/",
    eduUrl: "https://www.newschool.edu",
    musicDeptUrl: "https://www.newschool.edu/jazz/",
    imageBanner: JAZZ_IMAGES.auditionHall,
    degreesOffered: ["B.F.A. Jazz & Contemporary Music", "B.A./B.F.A. Dual Degree"],
    facultyHighlights: ["Jane Ira Bloom", "Reggie Workman (Bassist for John Coltrane)", "Buster Williams"],
    acceptanceRate: "~30% (High Merit <8%)",
    scholarshipReality: "Need-based and merit-based institutional aid; prime location in Greenwich Village surrounded by historic jazz clubs.",
    prescreeningRequirements: [
      "1. Two contrasting jazz standards (Swing, Ballad, Latin)",
      "2. One original composition or reharmonized standard",
      "3. Demonstration of improvisational range"
    ],
    liveAuditionFormat: [
      "Auditions in Arnhold Hall in Greenwich Village",
      "Interactive improvisation with student/faculty combo",
      "Personal interview on artistic voice and New York goals"
    ],
    careerOutcomes: {
      primaryRoles: ["Greenwich Village Jazz Club Resident", "Modern Cross-Genre Collaborator", "Film & Media Musician", "Independent Label Founder"],
      typicalEmployersOrGigs: ["The Jazz Gallery, 55 Bar alumni circles, Blue Note", "Robert Glasper / Brad Mehldau alumni lineage"],
      estimatedSalaryRange: "$46,000 - $125,000/yr (performance, production, teaching)",
      midCareerPotential: "$90,000 - $220,000+ (Grammy-nominated bandleader or producer)",
      industryDescription: "Located right in Greenwich Village, The New School was attended by Brad Mehldau, Robert Glasper, and Roy Hargrove. Mentorship under Coltrane's legendary bassist Reggie Workman gives students direct contact with jazz history."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Artistic, progressive, deeply rooted in the Village vibe. Mentorship model allows you to pick your private teacher directly.",
      tempoTrap: "Showcase personal tone nuance rather than generic machine-gun speed.",
      sightReadingReality: "Lead sheets with contemporary chord symbols.",
      theInterviewVibe: "Intrigued by how you plan to use NYC as your primary campus.",
      communityTip: "You can walk from your dorm to the Village Vanguard in five minutes."
    }
  },
  {
    id: 'unc_colorado',
    schoolName: "University of Northern Colorado (UNC)",
    divisionOrCollege: "Jazz Studies Department",
    location: "Greeley, CO",
    programType: "University School of Music",
    officialWebsite: "https://www.unco.edu",
    auditionPortalUrl: "https://arts.unco.edu/music/admissions/auditions/",
    eduUrl: "https://www.unco.edu",
    musicDeptUrl: "https://arts.unco.edu/music/jazz-studies/",
    imageBanner: JAZZ_IMAGES.collegeQuad,
    degreesOffered: ["B.M. Jazz Studies", "M.M. Jazz Studies", "D.A. Music Performance"],
    facultyHighlights: ["Dana Landry (Director)", "Jim White (Drums)", "Kenyon Brenner (Saxophone)"],
    acceptanceRate: "~28%",
    scholarshipReality: "Hosts the historic UNC Greeley Jazz Festival (largest non-competitive jazz festival in the country); generous music scholarships.",
    prescreeningRequirements: [
      "1. Up-tempo swing tune with bebop phrasing",
      "2. Ballad with warm acoustic tone",
      "3. Sight-reading and scale fundamentals"
    ],
    liveAuditionFormat: [
      "Frasier Hall auditions in Greeley, CO",
      "Playing with rhythm section",
      "Big band sight-reading test"
    ],
    careerOutcomes: {
      primaryRoles: ["Premier Military Jazz Band Musician", "College Jazz Director", "Denver / Colorado Scene Soloist", "Secondary Music Educator"],
      typicalEmployersOrGigs: ["Air Force Falconaires, US Army Field Band", "Colorado universities and school districts"],
      estimatedSalaryRange: "$48,000 - $105,000/yr (military, education, touring)",
      midCareerPotential: "$88,000 - $170,000+ (military master sergeant or tenured professor)",
      industryDescription: "UNC Jazz Lab Band I has won more DownBeat awards than almost any other ensemble. The program is renowned for big band swing discipline and producing premier military band musicians."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Tight-knit, supportive, highly disciplined big band culture.",
      tempoTrap: "Clean timekeeping and dynamic nuance.",
      sightReadingReality: "Challenging big band arrangements.",
      theInterviewVibe: "Focused on character, humility, and dedication to ensemble sound.",
      communityTip: "The annual Greeley Jazz Festival brings legends to campus every April."
    }
  },
  {
    id: 'ut_austin',
    schoolName: "University of Texas at Austin - Butler",
    divisionOrCollege: "Butler School of Music - Jazz Studies",
    location: "Austin, TX",
    programType: "University School of Music",
    officialWebsite: "https://www.utexas.edu",
    auditionPortalUrl: "https://music.utexas.edu/admissions/undergraduate/auditions",
    eduUrl: "https://www.utexas.edu",
    musicDeptUrl: "https://music.utexas.edu/academics/areas-study/jazz-studies",
    imageBanner: JAZZ_IMAGES.facultyJazzHall,
    degreesOffered: ["B.M. Jazz Performance", "B.M. Jazz Composition", "D.M.A."],
    facultyHighlights: ["Diego Rivera (Director, Tenor Titan)", "John Mills", "Andre Hayward"],
    acceptanceRate: "~14%",
    scholarshipReality: "Out-of-state tuition waivers for scholarship recipients make UT Austin exceptionally affordable.",
    prescreeningRequirements: [
      "1. Up-tempo Bebop standard @ 220+ BPM",
      "2. Ballad with rich sub-tone",
      "3. 12-bar blues in two keys",
      "4. Latin / Straight-8th selection"
    ],
    liveAuditionFormat: [
      "Bates Recital Hall auditions in Austin, TX",
      "Live interaction with Diego Rivera and rhythm section",
      "Sight-reading big band charts"
    ],
    careerOutcomes: {
      primaryRoles: ["Austin Live Music Capital Soloist", "Texas High School Jazz Director (Highest paying US salaries: $70k-$105k)", "National Touring Tenorist", "Festival Headliner"],
      typicalEmployersOrGigs: ["Austin live venues (Elephant Room, Continental Club)", "Texas 6A high school band programs", "SXSW / Austin City Limits"],
      estimatedSalaryRange: "$54,000 - $125,000/yr (Texas music educator salary + Austin gigging)",
      midCareerPotential: "$98,000 - $190,000+ (head band director in Texas 6A district with stipends)",
      industryDescription: "Directed by tenor saxophonist Diego Rivera (veteran of the Christian McBride Big Band), Butler Jazz is situated in the 'Live Music Capital of the World' with access to Texas's extraordinarily lucrative music education market."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Warm, powerful, full of Texas tenor authority. Diego Rivera wants to hear big sound and deep pocket.",
      tempoTrap: "Don't back away from the mic; project a full, masculine acoustic core.",
      sightReadingReality: "Tight modern arrangements.",
      theInterviewVibe: "Energetic, authentic, assessing community fit.",
      communityTip: "Austin's live music scene lets students gig every weekend while earning a top-tier degree."
    }
  },
  {
    id: 'mcgill',
    schoolName: "McGill University - Schulich School of Music",
    divisionOrCollege: "Jazz Area",
    location: "Montreal, Quebec, Canada",
    programType: "University School of Music",
    officialWebsite: "https://www.mcgill.ca",
    auditionPortalUrl: "https://www.mcgill.ca/music/admissions/undergraduate/auditions",
    eduUrl: "https://www.mcgill.ca",
    musicDeptUrl: "https://www.mcgill.ca/music/areas-study/jazz",
    imageBanner: JAZZ_IMAGES.auditionHall,
    degreesOffered: ["B.Mus. Jazz Performance", "M.Mus. Jazz Performance", "D.Mus."],
    facultyHighlights: ["Chet Doxas (Saxophone)", "Remi Bolduc", "Jean-Nicolas Trottier"],
    acceptanceRate: "~15%",
    scholarshipReality: "Outstanding international value: tuition in Canada is significantly lower than private US conservatories even for US citizens.",
    prescreeningRequirements: [
      "1. Bebop standard with 2 choruses of improvisation",
      "2. Ballad demonstrating tone color",
      "3. Medium swing standard",
      "4. Major/minor scales and harmonic exercises"
    ],
    liveAuditionFormat: [
      "Pollack Hall / Redpath Hall auditions in Montreal",
      "Playing with Schulich rhythm section",
      "Sight-reading and ear training"
    ],
    careerOutcomes: {
      primaryRoles: ["Montreal International Jazz Festival Performer", "Canadian / European Touring Artist", "University Professor", "Film Composer"],
      typicalEmployersOrGigs: ["Montreal Jazz Festival (world's largest)", "CBC Music, Canada Council for the Arts grants", "European festivals"],
      estimatedSalaryRange: "$45,000 - $110,000 CAD (performance, arts council grants, private studio)",
      midCareerPotential: "$85,000 - $180,000+ CAD (established artist with grant funding and festival tours)",
      industryDescription: "McGill is the premier music conservatory of Canada. Montreal hosts the world's largest jazz festival and boasts a vibrant, bilingual, European-styled cultural life with rich government arts funding."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Cultured, international, deeply artistic. Faculty appreciate lyrical, European-influenced jazz phrasing.",
      tempoTrap: "Time feel should be relaxed and spacious.",
      sightReadingReality: "Modern French-Canadian and American contemporary charts.",
      theInterviewVibe: "Warm, worldly, appreciative of multi-cultural artistic curiosity.",
      communityTip: "Montreal's cost of living is a fraction of New York or Boston, giving young musicians immense breathing room."
    }
  },
  {
    id: 'purchase_suny',
    schoolName: "Purchase College, SUNY - Conservatory",
    divisionOrCollege: "Jazz Studies Department",
    location: "Purchase, NY (Westchester, 30 min from NYC)",
    programType: "Conservatory",
    officialWebsite: "https://www.purchase.edu",
    auditionPortalUrl: "https://www.purchase.edu/academics/music/audition-portfolio-requirements/jazz-studies/",
    eduUrl: "https://www.purchase.edu",
    musicDeptUrl: "https://www.purchase.edu/academics/music/programs/jazz-studies/",
    imageBanner: JAZZ_IMAGES.collegeQuad,
    degreesOffered: ["Mus.B. Jazz Studies", "M.M. Jazz Studies", "Performer Certificate"],
    facultyHighlights: ["Gary Smulyan (Baritone Titan)", "Ralph Lalama (Tenor Master, Vanguard Band)", "Jon Faddis"],
    acceptanceRate: "~22%",
    scholarshipReality: "SUNY state tuition structure makes it one of the most cost-effective conservatories within 30 miles of NYC.",
    prescreeningRequirements: [
      "1. Fast Bebop tune or rhythm changes",
      "2. Ellington / Strayhorn ballad",
      "3. 12-bar blues in two keys"
    ],
    liveAuditionFormat: [
      "Auditions in the Purchase Performing Arts Center",
      "Ralph Lalama personally evaluates tenor applicants",
      "Sight-reading Vanguard big band arrangements"
    ],
    careerOutcomes: {
      primaryRoles: ["NYC Freelance Jazz Tenorist", "Vanguard / Lincoln Center Big Band Regular", "Private Woodwind Instructor", "Commercial Studio Musician"],
      typicalEmployersOrGigs: ["Village Vanguard Jazz Orchestra", "Birdland Big Band", "NYC jazz venues and Broadway subbing"],
      estimatedSalaryRange: "$48,000 - $120,000/yr (gigging, private studio, NYC sessions)",
      midCareerPotential: "$90,000 - $195,000+ (established NYC sideman and touring soloist)",
      industryDescription: "Founded with legendary trumpeter Jon Faddis and featuring Ralph Lalama (longtime tenor pillar of the Vanguard Jazz Orchestra), Purchase is renowned as the hardest-swinging conservatory in the New York metropolitan area."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Unfiltered, no-bull, hard-bop powerhouse. Ralph Lalama wants to hear authentic swing, punch, and horn projection.",
      tempoTrap: "Don't play timidly; step up to the mic and blow with real tenor authority.",
      sightReadingReality: "Thad Jones charts with dense chord voicings.",
      theInterviewVibe: "Down-to-earth, testing your willingness to grind and commute into NYC jam sessions.",
      communityTip: "A hidden gem: half the cost of Manhattan conservatories with many of the exact same faculty."
    }
  },
  {
    id: 'depaul',
    schoolName: "DePaul University - School of Music",
    divisionOrCollege: "Jazz Studies Department",
    location: "Lincoln Park, Chicago, IL",
    programType: "University School of Music",
    officialWebsite: "https://www.depaul.edu",
    auditionPortalUrl: "https://music.depaul.edu/admission/Pages/auditions.aspx",
    eduUrl: "https://www.depaul.edu",
    musicDeptUrl: "https://music.depaul.edu/academics/performance/Pages/jazz-studies.aspx",
    imageBanner: JAZZ_IMAGES.recordingStudioBooth,
    degreesOffered: ["B.M. Jazz Studies", "M.M. Jazz Studies", "Post-Master's Certificate"],
    facultyHighlights: ["Scott Burns (Tenor Saxophone)", "Dana Hall (Drums & Director)", "Bob Lark"],
    acceptanceRate: "~24%",
    scholarshipReality: "Generous School of Music talent awards; located in the historic Lincoln Park neighborhood of Chicago.",
    prescreeningRequirements: [
      "1. Bebop standard @ 200+ BPM",
      "2. Standard ballad demonstrating sub-tone",
      "3. Medium swing standard or blues"
    ],
    liveAuditionFormat: [
      "Holtschneider Performance Center auditions (world-class acoustic venue)",
      "Interactive improvisation with Dana Hall on drums",
      "Sight-reading Chicago big band charts"
    ],
    careerOutcomes: {
      primaryRoles: ["Chicago Jazz Scene Soloist", "Midwest Theater & Commercial Musician", "University & Private Educator", "Touring Bandleader"],
      typicalEmployersOrGigs: ["Green Mill Cocktail Lounge, Jazz Showcase, Constellation", "Chicago Broadway in Chicago pit orchestras", "Midwest festival circuits"],
      estimatedSalaryRange: "$50,000 - $125,000/yr (Chicago theater contracts, club residencies, teaching)",
      midCareerPotential: "$92,000 - $195,000+ (veteran Chicago artist or university chair)",
      industryDescription: "Chicago has the third-largest music market in the country. DePaul's Holtschneider Performance Center is among the finest musical facilities in the Midwest, and the program connects students directly with the Green Mill and Jazz Showcase lineages."
    },
    redditApplicantIntel: {
      roomAtmosphere: "Supportive, deep swing pocket. Dana Hall on drums tests whether your eighth notes lock with the ride cymbal.",
      tempoTrap: "Maintain steady tempo without rushing during complex runs.",
      sightReadingReality: "Chicago big band charts with sudden tempo changes.",
      theInterviewVibe: "Friendly, testing your dedication to the rich Chicago jazz legacy.",
      communityTip: "DePaul students can gig at the historic Jazz Showcase and Green Mill while still in school."
    }
  }
];
