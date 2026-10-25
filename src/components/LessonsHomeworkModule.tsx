import React, { useState } from 'react';
import { JAZZ_LESSONS } from '../data/conservatoryData';
import { JazzArticleLesson } from '../types/masterclass';
import { BookOpen, CheckSquare, Square, Clock, ExternalLink, Bookmark, CheckCircle2 } from 'lucide-react';
import { JAZZ_IMAGES } from '../assets/imageAssets';

export const LessonsHomeworkModule: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<JazzArticleLesson>(JAZZ_LESSONS[0]);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (stepKey: string) => {
    setCompletedSteps(prev => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#212433] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <span>Conservatory Reading & Rigor</span>
            <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
            <span>Lessons & Homework</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Historical Lessons & Practice Assignments
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Concise, factually verified articles under 500 words documenting the defining breakthroughs in jazz tenor saxophone history—grounded in Smithsonian Jazz, Gunther Schuller, and conservatory archives—paired with targeted homework assignments for Mason.
          </p>
        </div>
      </div>

      {/* Visual Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-[#272c40] bg-slate-900 text-white aspect-[21/9] sm:aspect-[24/8] max-h-64">
        <img
          src={JAZZ_IMAGES.lessonsStudyDesk}
          alt="Vintage Jazz Conservatory Study Desk with Sheet Music and Mouthpiece"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-65"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
          <div>
            <span className="text-xs uppercase font-mono text-amber-400 tracking-wider">
              Smithsonian Jazz & Academic Archives
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-0.5">
              The Architecture of the Masters
            </h3>
          </div>
          <span className="text-xs font-mono text-amber-300 bg-black/40 px-3 py-1 rounded backdrop-blur border border-white/10 hidden sm:inline-block">
            Verified Citations · &lt; 500 Words Each
          </span>
        </div>
      </div>

      {/* Main Two-Zone Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 4 Columns: Article Roster */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block px-1">
            Curated Conservatory Lessons:
          </span>

          <div className="space-y-2">
            {JAZZ_LESSONS.map((lesson, idx) => {
              const isSelected = selectedLesson.id === lesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className={`w-full p-4 rounded-xl text-left transition-all border ${
                    isSelected
                      ? 'bg-amber-500/10 dark:bg-[#181a28] border-amber-500 dark:border-amber-400 shadow-sm ring-1 ring-amber-500/30'
                      : 'bg-white dark:bg-[#11131c] border-slate-200 dark:border-[#222533] hover:border-slate-300 dark:hover:border-[#32364c]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                      Lesson 0{idx + 1}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {lesson.readingMinutes} min read ({lesson.wordCount} words)
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white font-display line-clamp-1">
                    {lesson.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {lesson.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 8 Columns: Article & Homework Assignment */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#12141f] space-y-6 shadow-xs">
            
            {/* Article Header */}
            <div className="border-b border-slate-100 dark:border-[#1f2334] pb-5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                  Verified Jazz History · {selectedLesson.wordCount} Words
                </span>
                <span>{selectedLesson.readingMinutes} Min Read</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white leading-tight">
                {selectedLesson.title}
              </h3>
              <p className="text-sm text-amber-800 dark:text-amber-300/90 font-medium">
                {selectedLesson.subtitle}
              </p>
            </div>

            {/* Historical Citation Badge */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#161825] border border-slate-200 dark:border-[#24283c] flex items-center justify-between gap-3 text-xs">
              <div className="text-slate-600 dark:text-slate-400">
                <strong className="text-slate-900 dark:text-white">Citation Source: </strong>
                {selectedLesson.historicalCitation}
              </div>
              {selectedLesson.sourceUrl && (
                <a
                  href={selectedLesson.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 shrink-0 font-medium"
                >
                  <span>Archives</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Featured Quote Callout */}
            <blockquote className="p-4 rounded-xl border-l-4 border-amber-500 bg-amber-500/5 dark:bg-amber-500/10 space-y-2">
              <p className="italic font-serif text-slate-800 dark:text-amber-100 text-sm leading-relaxed">
                &ldquo;{selectedLesson.leadQuote.quote}&rdquo;
              </p>
              <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
                — <span className="font-bold text-slate-900 dark:text-white">{selectedLesson.leadQuote.speaker}</span> ({selectedLesson.leadQuote.context})
              </div>
            </blockquote>

            {/* Factual Article Body */}
            <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {selectedLesson.articleBody.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            {/* Homework Assignment */}
            <div className="pt-6 border-t border-slate-100 dark:border-[#1e2233] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-amber-500" />
                  <h4 className="text-base font-bold font-display text-slate-900 dark:text-white">
                    Mason's Homework Assignment
                  </h4>
                </div>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-slate-100 dark:bg-[#1c2030] text-amber-700 dark:text-amber-300 border border-slate-200 dark:border-[#2b3146]">
                  Tempo Target: {selectedLesson.homeworkAssignment.tempoTarget}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#161825] border border-slate-200 dark:border-[#24283c] space-y-3">
                <div className="font-bold text-sm text-slate-900 dark:text-white">
                  {selectedLesson.homeworkAssignment.title}
                </div>
                <div className="text-xs text-amber-800 dark:text-amber-300/90 font-medium">
                  {selectedLesson.homeworkAssignment.focusNotes}
                </div>

                <div className="space-y-2 pt-1 text-xs">
                  {selectedLesson.homeworkAssignment.steps.map((step, sIdx) => {
                    const stepKey = `${selectedLesson.id}-step-${sIdx}`;
                    const isChecked = !!completedSteps[stepKey];
                    return (
                      <div
                        key={sIdx}
                        onClick={() => toggleStep(stepKey)}
                        className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-start gap-2.5 ${
                          isChecked
                            ? 'bg-emerald-50 dark:bg-[#10181b] border-emerald-300 dark:border-emerald-500/40 text-slate-500 line-through'
                            : 'bg-white dark:bg-[#1a1d2c] border-slate-200 dark:border-[#282d40] text-slate-800 dark:text-slate-200 hover:border-amber-400'
                        }`}
                      >
                        <button type="button" className="mt-0.5 text-amber-500 shrink-0">
                          {isChecked ? <CheckSquare className="w-4 h-4 text-emerald-500" /> : <Square className="w-4 h-4" />}
                        </button>
                        <span className="leading-relaxed font-sans">{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
