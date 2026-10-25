import React, { useState } from 'react';
import { FACULTY_BOARD } from '../data/conservatoryData';
import { FacultyMember, FacultyId } from '../types/masterclass';
import { Send, Sparkles, User, RefreshCw, MessageSquare } from 'lucide-react';

export const FacultyBoardModule: React.FC = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember>(FACULTY_BOARD[0]);
  const [userQuery, setUserQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatLog, setChatLog] = useState<Array<{ sender: 'user' | 'faculty'; text: string; facultyName?: string }>>([
    {
      sender: 'faculty',
      facultyName: FACULTY_BOARD[0].name,
      text: `Mason, welcome to the studio. Director Bob Hackett has high hopes for your horn, and so do I. What harmonic wall or phrasing question are you ready to conquer today?`
    }
  ]);

  const quickPrompts = [
    "How do I voice altissimo high G on tenor without biting?",
    "Explain your 3-to-9 arpeggio resolution over Cottontail rhythm changes.",
    "Give me advice on switching embouchures between Tenor Sax and Bb Clarinet.",
    "How should I pace a multi-chorus up-tempo blues solo for Essentially Ellington?"
  ];

  const handleSelectFaculty = (member: FacultyMember) => {
    setSelectedFaculty(member);
    setChatLog([
      {
        sender: 'faculty',
        facultyName: member.name,
        text: `Mason, this is ${member.name}. Regarding ${member.specialty.toLowerCase()}, what challenge are we addressing on your tenor horn today?`
      }
    ]);
  };

  const handleSend = async (messageToSend?: string) => {
    const text = messageToSend || userQuery.trim();
    if (!text || isLoading) return;

    const newChat = [...chatLog, { sender: 'user' as const, text }];
    setChatLog(newChat);
    setUserQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/faculty-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mentorId: selectedFaculty.id,
          userMessage: text,
          conversationHistory: newChat.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          }))
        })
      });

      const data = await response.json();
      setChatLog(prev => [
        ...prev,
        {
          sender: 'faculty',
          facultyName: data.mentorName || selectedFaculty.name,
          text: data.response || "Keep practicing your long tones and enclosures, Mason."
        }
      ]);
    } catch (err) {
      console.error(err);
      setChatLog(prev => [
        ...prev,
        {
          sender: 'faculty',
          facultyName: selectedFaculty.name,
          text: `Mason, hold fast to the fundamental. Keep your air stream supported from your diaphragm and center that middle register pitch.`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#212433] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>Module 2</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>The 5 Resident Masters</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            The Conservatory Faculty Board
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Private consultation with 5 virtual masters embodying authentic bebop architecture, harmonic transcendence, big tenor projection, modern altissimo mechanics, and collegiate adjudication standards.
          </p>
        </div>
      </div>

      {/* Faculty Selection Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {FACULTY_BOARD.map((member) => {
          const isSelected = selectedFaculty.id === member.id;
          return (
            <button
              key={member.id}
              onClick={() => handleSelectFaculty(member)}
              className={`p-4 rounded-lg text-left transition-all border ${
                isSelected
                  ? 'bg-[#181b28] border-amber-400/80 shadow-md ring-1 ring-amber-400/30'
                  : 'bg-[#12141e] border-[#222533] hover:border-[#32374d] hover:bg-[#161824]'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-amber-400/90">{member.era}</span>
                {isSelected && <span className="text-[10px] uppercase font-bold text-amber-400">Active</span>}
              </div>
              <h3 className="font-bold text-white font-display text-sm tracking-wide">
                {member.name}
              </h3>
              <p className="text-xs text-amber-200/80 mt-0.5 line-clamp-1">
                {member.moniker}
              </p>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                {member.specialty}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Consultation Desk (Split Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Faculty Dossier & Photo Wall */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl overflow-hidden border border-[#252a3d] bg-[#12141f]">
            <div className="relative aspect-[4/3] bg-black">
              <img
                src="/src/assets/images/faculty_jazz_hall_1792946309269.jpg"
                alt="Archival gallery of jazz saxophone icons in conservatory hall"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12141f] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400 block">Faculty Dossier</span>
                <h4 className="text-lg font-bold text-white font-display">{selectedFaculty.name}</h4>
              </div>
            </div>

            <div className="p-5 space-y-4 text-sm">
              <blockquote className="italic font-serif text-amber-200/90 border-l-2 border-amber-500 pl-3 leading-relaxed">
                &ldquo;{selectedFaculty.quote}&rdquo;
              </blockquote>

              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Tenor Saxophone Impact on Mason
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedFaculty.tenorPraise}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Core Masterclass Pillars
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedFaculty.keyTopics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 font-mono">0{i + 1}.</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Masterclass Consultation Dialogue */}
        <div className="lg:col-span-7 flex flex-col rounded-xl border border-[#252a3d] bg-[#10121b] h-[640px]">
          
          {/* Chat Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#212433] bg-[#141624]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold text-xs">
                {selectedFaculty.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-display leading-tight">{selectedFaculty.name}</h4>
                <p className="text-xs text-slate-400">{selectedFaculty.moniker}</p>
              </div>
            </div>
            <button
              onClick={() => handleSelectFaculty(selectedFaculty)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
              title="Reset Dialogue"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Chat Transcript */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {chatLog.map((msg, index) => {
              const isFaculty = msg.sender === 'faculty';
              return (
                <div
                  key={index}
                  className={`flex flex-col ${isFaculty ? 'items-start' : 'items-end'}`}
                >
                  <span className="text-[11px] font-mono text-slate-400 mb-1 px-1">
                    {isFaculty ? (msg.facultyName || selectedFaculty.name) : 'Mason (Agoura High Tenor)'}
                  </span>
                  <div
                    className={`max-w-[88%] rounded-lg p-3.5 text-sm leading-relaxed ${
                      isFaculty
                        ? 'bg-[#181a28] border border-[#272b3f] text-slate-200'
                        : 'bg-amber-500 text-slate-950 font-medium'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-amber-300/80 italic p-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>{selectedFaculty.name} is formulating masterclass critique...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-5 py-2.5 border-t border-[#1d202d] bg-[#0e1017]">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1.5">
              Mason Quick Inquiries:
            </span>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  disabled={isLoading}
                  className="px-2.5 py-1 text-xs rounded bg-[#171924] hover:bg-[#222536] border border-[#282d40] text-slate-300 whitespace-nowrap transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-[#212433] bg-[#141624]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder={`Ask ${selectedFaculty.name.split(' ')[0]} about phrasing, tone, transposition, or Ellington changes...`}
                className="flex-1 bg-[#0b0c12] border border-[#262a3d] focus:border-amber-400 focus:outline-none rounded px-3.5 py-2 text-sm text-white placeholder-slate-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!userQuery.trim() || isLoading}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold rounded text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
              >
                <span>Consult</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
