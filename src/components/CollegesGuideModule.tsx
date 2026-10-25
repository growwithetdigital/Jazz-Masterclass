import React, { useState } from 'react';
import { COLLEGES_DATABASE } from '../data/conservatoryData';
import { CollegeAuditionProfile } from '../types/masterclass';
import { GraduationCap, ExternalLink, MessageCircle, AlertCircle, CheckCircle2, Search, Building2, MapPin } from 'lucide-react';

export const CollegesGuideModule: React.FC = () => {
  const [selectedSchool, setSelectedSchool] = useState<CollegeAuditionProfile>(COLLEGES_DATABASE[0]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchools = COLLEGES_DATABASE.filter(school => {
    const matchesType = filterType === 'all' || school.programType.toLowerCase().includes(filterType.toLowerCase());
    const matchesSearch = school.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          school.location.toLowerCase().includes(searchQuery.toLowerCase());
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
            <span>Colleges to Consider</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Elite Music Conservatories & University Programs
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Curated audition guides, degree tracks, and unvarnished applicant intelligence compiled from audition rooms, faculty briefs, and student field reports on Reddit (r/jazz, r/Saxophonics).
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#141624] rounded-lg border border-slate-200 dark:border-[#25293d] self-start md:self-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              filterType === 'all'
                ? 'bg-white dark:bg-amber-500 text-slate-900 dark:text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Programs
          </button>
          <button
            onClick={() => setFilterType('conservatory')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              filterType === 'conservatory'
                ? 'bg-white dark:bg-amber-500 text-slate-900 dark:text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Conservatories
          </button>
          <button
            onClick={() => setFilterType('university')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              filterType === 'university'
                ? 'bg-white dark:bg-amber-500 text-slate-900 dark:text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            University Schools
          </button>
        </div>
      </div>

      {/* Hero Banner for Audition Room */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-[#272c40] bg-slate-900 text-white aspect-[21/9] sm:aspect-[24/8] max-h-72">
        <img
          src="/src/assets/images/audition_hall_1792948139496.jpg"
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
            <span className="text-xs uppercase font-mono text-amber-400 tracking-wider">
              Audition Readiness Doctrine
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-0.5">
              The Reality of the Audition Room
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1 leading-relaxed">
              Juries hear 40 tenor saxophonists a day. They don't look for flawless robotic scales—they look for acoustic core resonance, steady time feel, and deep respect for the jazz lineage.
            </p>
          </div>
          <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-xs font-mono text-amber-300 whitespace-nowrap self-start sm:self-auto">
            Class of 2027 Recruitment
          </span>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 4 Columns: School Roster */}
        <div className="lg:col-span-4 space-y-3">
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search schools or locations..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-[#272c40] bg-white dark:bg-[#12141f] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-2">
            {filteredSchools.map((school) => {
              const isSelected = selectedSchool.id === school.id;
              return (
                <button
                  key={school.id}
                  onClick={() => setSelectedSchool(school)}
                  className={`w-full p-4 rounded-xl text-left transition-all border ${
                    isSelected
                      ? 'bg-amber-500/10 dark:bg-[#181a28] border-amber-500 dark:border-amber-400 shadow-sm ring-1 ring-amber-500/30'
                      : 'bg-white dark:bg-[#11131c] border-slate-200 dark:border-[#222533] hover:border-slate-300 dark:hover:border-[#32364c]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <span className="flex items-center gap-1 font-mono text-[11px]">
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
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {school.divisionOrCollege}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 8 Columns: Selected School Deep-Dive Dossier */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#12141f] space-y-6 shadow-xs">
            
            {/* School Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 dark:border-[#1f2334] pb-5">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-amber-600 dark:text-amber-400">
                  {selectedSchool.programType} · {selectedSchool.location}
                </span>
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
                  {selectedSchool.schoolName}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                  {selectedSchool.divisionOrCollege}
                </p>
              </div>

              {/* Direct Links */}
              <div className="flex items-center gap-2.5">
                <a
                  href={selectedSchool.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-[#2a2f44] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-white transition-colors"
                >
                  <span>Program Site</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-[#24283c]">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px] uppercase tracking-wider mb-0.5">Faculty Notables</span>
                <span className="text-slate-900 dark:text-white font-medium block">
                  {selectedSchool.facultyHighlights.join(', ')}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-[#24283c]">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px] uppercase tracking-wider mb-0.5">Degree Offerings</span>
                <span className="text-slate-900 dark:text-white font-medium block">
                  {selectedSchool.degreesOffered.join(' · ')}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#161826] border border-slate-200 dark:border-[#24283c]">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px] uppercase tracking-wider mb-0.5">Admissions Acceptance</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold font-mono text-sm block">
                  {selectedSchool.acceptanceRate}
                </span>
              </div>
            </div>

            {/* Scholarship Reality */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1">
              <span className="font-bold text-amber-800 dark:text-amber-300 block uppercase tracking-wider text-[11px]">
                Financial Aid & Scholarship Reality:
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {selectedSchool.scholarshipReality}
              </p>
            </div>

            {/* Prescreening vs Live Audition Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
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
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
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

          </div>
        </div>

      </div>
    </div>
  );
};
