import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TOP_25_COLLEGES_DATABASE, AGOURA_ALUMNI_SPOTLIGHT } from '../data/conservatoryData';
import { CollegeAuditionProfile } from '../types/masterclass';
import { 
  GraduationCap, ExternalLink, MessageCircle, CheckCircle2, 
  Search, MapPin, DollarSign, Briefcase, Award, Sparkles, 
  UserCheck, Compass
} from 'lucide-react';
import { JAZZ_IMAGES } from '../assets/imageAssets';

export const CollegesGuideModule: React.FC = () => {
  const [selectedSchool, setSelectedSchool] = useState<CollegeAuditionProfile>(TOP_25_COLLEGES_DATABASE[0]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'colleges' | 'alumni'>('colleges');

  const filteredSchools = TOP_25_COLLEGES_DATABASE.filter(school => {
    const matchesType = filterType === 'all' || school.programType.toLowerCase().includes(filterType.toLowerCase());
    const matchesSearch = school.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          school.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          school.degreesOffered.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#212433] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <span>Recruitment & Career Roadmap</span>
            <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
            <span>Top 25 Conservatory & University Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Top 25 Jazz Programs & Agoura High Alumni Spotlight
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Curated audition guides, direct official .edu & music department links, graduate career pathways, estimated salary outcomes, and authentic Reddit applicant intelligence.
          </p>
        </div>

        {/* Section View Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#141624] rounded-xl border border-slate-200 dark:border-[#25293d] self-start md:self-auto">
          <button
            onClick={() => setActiveTab('colleges')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'colleges'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Top 25 Colleges ({TOP_25_COLLEGES_DATABASE.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('alumni')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'alumni'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Agoura High Alumni ({AGOURA_ALUMNI_SPOTLIGHT.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'colleges' ? (
        <div className="space-y-8">
          {/* Hero Banner for Audition Room */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-[#272c40] bg-slate-900 text-white aspect-[21/9] sm:aspect-[24/8] max-h-72 shadow-sm">
            <img
              src={JAZZ_IMAGES.auditionHall}
              alt="Conservatory Audition Hall with Steinway Grand Piano"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-60"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-5 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-mono text-amber-400 tracking-wider font-semibold">
                  Audition Readiness & Industry Economics
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-0.5">
                  The Top 25 Collegiate Jazz Programs in North America
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
                  Compare official program requirements, audition room traps reported by applicants on Reddit, and real-world salary trajectories for performance graduates.
                </p>
              </div>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-xs font-mono text-amber-300 whitespace-nowrap self-start sm:self-auto font-bold">
                Agoura Studio Jazz Pipeline
              </span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-[#12141f] p-3 rounded-xl border border-slate-200 dark:border-[#222533]">
            <div className="flex flex-wrap items-center gap-1.5">
              {(['all', 'conservatory', 'university', 'contemporary'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                    filterType === type
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {type === 'all' ? 'All 25 Schools' : type === 'university' ? 'University Schools' : `${type}s`}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by school or city..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-[#272c40] bg-white dark:bg-[#0d0e17] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>
          </div>

          {/* Main Split Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 4 Columns: School Roster */}
            <div className="lg:col-span-4 space-y-2.5 max-h-[850px] overflow-y-auto pr-1">
              {filteredSchools.map((school, idx) => {
                const isSelected = selectedSchool.id === school.id;
                return (
                  <button
                    key={school.id}
                    onClick={() => setSelectedSchool(school)}
                    className={`w-full p-3.5 rounded-xl text-left transition-all border ${
                      isSelected
                        ? 'bg-amber-500/10 dark:bg-[#181a28] border-amber-500 dark:border-amber-400 shadow-sm ring-1 ring-amber-500/30'
                        : 'bg-white dark:bg-[#11131c] border-slate-200 dark:border-[#222533] hover:border-slate-300 dark:hover:border-[#32364c]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <span className="font-bold text-amber-600 dark:text-amber-400">#{idx + 1}</span>
                        <span>·</span>
                        <MapPin className="w-3 h-3 text-amber-500" />
                        {school.location.split(',')[0]}
                      </span>
                      <span className="font-mono text-amber-600 dark:text-amber-400 text-[11px] font-bold">
                        {school.acceptanceRate}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white font-display">
                      {school.schoolName}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-1 font-sans">
                      {school.divisionOrCollege}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right 8 Columns: Selected School Deep-Dive Dossier */}
            <div className="lg:col-span-8 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedSchool.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#12141f] space-y-6 shadow-xs overflow-hidden"
                >
                  
                  {/* School Campus Banner */}
                  {selectedSchool.imageBanner && (
                    <div className="relative rounded-xl overflow-hidden aspect-[21/7] max-h-48 border border-slate-200 dark:border-[#222533] bg-slate-950">
                      <img
                        src={selectedSchool.imageBanner}
                        alt={`${selectedSchool.schoolName} Facilities`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                        <span className="font-mono text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                          {selectedSchool.schoolName}
                        </span>
                        <span className="text-[10px] bg-black/60 px-2.5 py-0.5 rounded backdrop-blur border border-white/10 font-mono">
                          {selectedSchool.location}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* School Header & Dual Direct Links */}
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 dark:border-[#1f2334] pb-5">
                    <div>
                      <span className="text-xs uppercase font-mono tracking-wider text-amber-600 dark:text-amber-400 font-bold">
                        {selectedSchool.programType} · {selectedSchool.location}
                      </span>
                      <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
                        {selectedSchool.schoolName}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium font-sans">
                        {selectedSchool.divisionOrCollege}
                      </p>
                    </div>

                    {/* Verified Official Links */}
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={selectedSchool.eduUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-[#2a2f44] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-white hover:border-amber-500 transition-colors"
                      >
                        <span>Official .edu Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={selectedSchool.musicDeptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-[#2a2f44] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-white hover:border-amber-500 transition-colors"
                      >
                        <span>Music Dept Page</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={selectedSchool.auditionPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-xs"
                      >
                        <span>Audition Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Quick Metrics Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-[#24283c]">
                      <span className="text-slate-500 dark:text-slate-400 block text-[11px] uppercase tracking-wider mb-0.5 font-mono">Faculty Highlights</span>
                      <span className="text-slate-900 dark:text-white font-medium block">
                        {selectedSchool.facultyHighlights.join(', ')}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-[#24283c]">
                      <span className="text-slate-500 dark:text-slate-400 block text-[11px] uppercase tracking-wider mb-0.5 font-mono">Degree Offerings</span>
                      <span className="text-slate-900 dark:text-white font-medium block">
                        {selectedSchool.degreesOffered.join(' · ')}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-[#24283c]">
                      <span className="text-slate-500 dark:text-slate-400 block text-[11px] uppercase tracking-wider mb-0.5 font-mono">Audition Selectivity</span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold font-mono text-sm block">
                        {selectedSchool.acceptanceRate}
                      </span>
                    </div>
                  </div>

                  {/* CAREER OUTCOMES & ESTIMATED SALARIES (USER REQUESTED FEATURE) */}
                  <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-[#0f191a] space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-emerald-500" />
                        <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white">
                          Graduate Career Outcomes & Estimated Industry Earnings
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                        AFM Union & Industry Data
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      {selectedSchool.careerOutcomes.industryDescription}
                    </p>

                    {/* Salary Metrics Comparison */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-white dark:bg-[#141d22] border border-emerald-500/20">
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold mb-1 font-mono text-[11px]">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>EARLY-CAREER COMPENSATION</span>
                        </div>
                        <div className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">
                          {selectedSchool.careerOutcomes.estimatedSalaryRange}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Freelance recording sessions, touring sideman gigs, and private studio instruction
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white dark:bg-[#141d22] border border-emerald-500/20">
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold mb-1 font-mono text-[11px]">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>MID-CAREER EARNING POTENTIAL</span>
                        </div>
                        <div className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">
                          {selectedSchool.careerOutcomes.midCareerPotential}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Tenured university faculty chairs, Broadway woodwind contracts, or established bandleaders
                        </div>
                      </div>
                    </div>

                    {/* Roles & Top Employers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block mb-1 text-[11px] uppercase tracking-wider font-mono">
                          Primary Career Roles:
                        </span>
                        <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                          {selectedSchool.careerOutcomes.primaryRoles.map((role, rIdx) => (
                            <li key={rIdx} className="flex items-center gap-1.5 text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                              <span>{role}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block mb-1 text-[11px] uppercase tracking-wider font-mono">
                          Typical Employers & Venues:
                        </span>
                        <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                          {selectedSchool.careerOutcomes.typicalEmployersOrGigs.map((emp, eIdx) => (
                            <li key={eIdx} className="flex items-center gap-1.5 text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                              <span>{emp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Scholarship Reality */}
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1">
                    <span className="font-bold text-amber-800 dark:text-amber-300 block uppercase tracking-wider text-[11px] font-mono">
                      Financial Aid & Scholarship Reality:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      {selectedSchool.scholarshipReality}
                    </p>
                  </div>

                  {/* Prescreening vs Live Audition Requirements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                        <span>Prescreening Submission Tape</span>
                      </h4>
                      <div className="space-y-1.5 text-xs">
                        {selectedSchool.prescreeningRequirements.map((req, rIdx) => (
                          <div key={rIdx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#151724] border border-slate-200 dark:border-[#232738] text-slate-700 dark:text-slate-300 leading-relaxed">
                            {req}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-mono">
                        <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                        <span>Live Callback / Audition Format</span>
                      </h4>
                      <div className="space-y-1.5 text-xs">
                        {selectedSchool.liveAuditionFormat.map((fmt, fIdx) => (
                          <div key={fIdx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#151724] border border-slate-200 dark:border-[#232738] text-slate-700 dark:text-slate-300 leading-relaxed">
                            {fmt}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reddit Applicant Intel Dossier */}
                  <div className="p-5 rounded-xl border border-slate-300 dark:border-[#2c3248] bg-slate-100/80 dark:bg-[#10121b] space-y-4">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-amber-500" />
                      <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white">
                        Audition Room Intelligence (Reddit r/jazz & r/Saxophonics Applicant Field Reports)
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                      <div className="p-3 rounded-lg bg-white dark:bg-[#161826] border border-slate-200 dark:border-[#25293d]">
                        <span className="font-bold text-slate-900 dark:text-amber-400 block mb-1">
                          Room Atmosphere & Energy:
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {selectedSchool.redditApplicantIntel.roomAtmosphere}
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-white dark:bg-[#161826] border border-slate-200 dark:border-[#25293d]">
                        <span className="font-bold text-red-600 dark:text-red-400 block mb-1">
                          The Tempo Trap to Avoid:
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {selectedSchool.redditApplicantIntel.tempoTrap}
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-white dark:bg-[#161826] border border-slate-200 dark:border-[#25293d]">
                        <span className="font-bold text-slate-900 dark:text-amber-400 block mb-1">
                          Live Sight-Reading Reality:
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {selectedSchool.redditApplicantIntel.sightReadingReality}
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-white dark:bg-[#161826] border border-slate-200 dark:border-[#25293d]">
                        <span className="font-bold text-slate-900 dark:text-amber-400 block mb-1">
                          The Faculty Interview Vibe:
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {selectedSchool.redditApplicantIntel.theInterviewVibe}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-slate-700 dark:text-amber-200">
                      <strong className="text-amber-700 dark:text-amber-400">Community Verdict: </strong>
                      {selectedSchool.redditApplicantIntel.communityTip}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      ) : (
        /* AGOURA HIGH SCHOOL NOTABLE ALUMNI SPOTLIGHT SECTION */
        <div className="space-y-8">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-100 dark:via-[#161828] to-amber-500/5 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 font-mono">
                  Agoura High School Studio Jazz I Heritage
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
                  Director Bob Hackett Legacy
                </span>
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                Agoura High Alumni Out in the Professional Music World
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                As Band Director Bob Hackett noted, Mason has a chance to be one of the Agoura High greats. Study how these distinguished alumni and community mentors built legendary careers in Hollywood film scoring, Grammy-winning big bands, Rock & Roll Hall of Fame tours, and international jazz festivals.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-[#1a1d2d] border border-amber-500/30 text-center shrink-0">
              <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">700+</div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-0.5">
                Feature Films Scored by Agoura Mentors
              </div>
            </div>
          </div>

          {/* Alumni Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AGOURA_ALUMNI_SPOTLIGHT.map((alum) => (
              <div
                key={alum.id}
                className="p-6 rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#12141f] space-y-4 hover:border-amber-500/50 transition-all shadow-xs"
              >
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-[#1f2334] pb-4">
                  <div>
                    <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                      {alum.gradYear} · {alum.agouraLegacyRole}
                    </span>
                    <h4 className="text-xl font-bold font-display text-slate-900 dark:text-white mt-0.5">
                      {alum.name}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      {alum.instrumentOrSpecialty}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {alum.careerSummary}
                </p>

                {/* Notable Credits */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">
                    Distinguished Milestones & Credits:
                  </span>
                  <div className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                    {alum.notableCredits.map((cred, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Personal Advice for Mason */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1">
                  <span className="font-bold text-amber-800 dark:text-amber-300 block uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-500" />
                    <span>Personal Advice for Mason:</span>
                  </span>
                  <p className="text-slate-800 dark:text-amber-100 italic leading-relaxed font-serif text-[12px]">
                    &ldquo;{alum.directAdviceForMason}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
