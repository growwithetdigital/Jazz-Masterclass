import React, { useState, useRef, useEffect } from 'react';
import { AdjudicationScorecard } from '../types/masterclass';
import { Mic, Square, Upload, Award, Play, AlertCircle, Sparkles, CheckCircle2, Sliders, Music } from 'lucide-react';

export const AdjudicationScorecardModule: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [audioMimeType, setAudioMimeType] = useState<string>('audio/webm');
  const [tuneTitle, setTuneTitle] = useState('Cottontail - 2 Choruses Solo');
  const [key, setKey] = useState('Bb Concert (C Tenor)');
  const [tempo, setTempo] = useState('Up-Tempo Swing (230 BPM)');
  const [performanceNotes, setPerformanceNotes] = useState('Mason running the Ben Webster opening statement into Bebop enclosures, with 2nd chorus altissimo build.');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [scorecard, setScorecard] = useState<AdjudicationScorecard | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Preset audition recordings for quick evaluation
  const auditionPresets = [
    {
      title: "Cottontail - 2 Choruses Solo",
      key: "Bb Concert (C Tenor)",
      tempo: "Up-Tempo Swing (230 BPM)",
      notes: "Focusing on Ben Webster rhythmic drive, Parker 3-to-9 arpeggio on the dominant cycle, and lead tenor projection."
    },
    {
      title: "Prelude to a Kiss - Ballad & Cadenza",
      key: "D Concert / E Tenor",
      tempo: "Ballad (64 BPM)",
      notes: "Sub-tone warmth in the lower register, Paul Gonsalves vocal terminal vibrato, and whole-tone cadenza."
    },
    {
      title: "Parker's Confirmation (Alto-to-Tenor)",
      key: "F Concert (G Tenor)",
      tempo: "Bebop (210 BPM)",
      notes: "Testing Charlie Parker's chromatic enclosures and tongue-slur articulation on Bb tenor horn."
    },
    {
      title: "Rockin' in Rhythm - Clarinet & Tenor Doubling",
      key: "Eb Concert (F Tenor / Clarinet)",
      tempo: "Stomp Swing (215 BPM)",
      notes: "Rehearsing the 8-beat horn swap from Tenor Sax to Bb Clarinet, testing embouchure firmness."
    }
  ];

  const handleApplyPreset = (preset: typeof auditionPresets[0]) => {
    setTuneTitle(preset.title);
    setKey(preset.key);
    setTempo(preset.tempo);
    setPerformanceNotes(preset.notes);
  };

  // Start Mic Recording with Live Waveform Visualizer
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setAudioMimeType('audio/webm');

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = (reader.result as string)?.split(',')[1];
          setAudioBase64(base64String || null);
        };
        reader.readAsDataURL(audioBlob);

        stream.getTracks().forEach((track) => track.stop());
        if (audioCtx.state !== 'closed') {
          audioCtx.close();
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = window.setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);

      // Start Canvas Draw Loop
      drawWaveform();
    } catch (err) {
      console.error("Microphone access error:", err);
      alert("Microphone access could not be initialized. You can still upload an audio file or evaluate via performance notes.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    }
  };

  const drawWaveform = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#0b0c12';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        ctx.fillStyle = `rgb(245, ${158 + (dataArray[i] / 4)}, 11)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };
    render();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    setAudioMimeType(file.type || 'audio/mp3');

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string)?.split(',')[1];
      setAudioBase64(base64String || null);
    };
    reader.readAsDataURL(file);
  };

  // Run Evaluation via server.ts
  const runAdjudication = async () => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/adjudicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioData: audioBase64,
          mimeType: audioMimeType,
          performanceDetails: {
            tuneTitle,
            key,
            tempo,
            performanceNotes
          }
        })
      });

      const data = await res.json();
      setScorecard(data);
    } catch (err) {
      console.error(err);
      alert("Failed to submit clip for adjudication. Please verify server connection.");
    } finally {
      setIsEvaluating(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="space-y-10">
      {/* Module Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#212433] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>Module 4</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Audio Recording Evaluation & Scorecard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            4-Part Conservatory Adjudication Report
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Submit or record a live performance excerpt for official Lincoln Center / Conservatory Board adjudication across Tone (25), Time/Feel (25), Harmonic Language (25), and Expressiveness (25).
          </p>
        </div>
      </div>

      {/* Preset Clips Strip */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
          Select Rehearsal Repertoire Excerpt:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {auditionPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(preset)}
              className={`p-3 rounded-lg text-left transition-all border text-xs ${
                tuneTitle === preset.title
                  ? 'bg-[#181a26] border-amber-400 text-white shadow-sm'
                  : 'bg-[#11131c] border-[#222533] text-slate-400 hover:text-slate-200 hover:border-[#32364c]'
              }`}
            >
              <span className="font-bold font-display text-white block text-sm">{preset.title.split('-')[0]}</span>
              <span className="text-amber-300/80 block mt-0.5">{preset.tempo}</span>
              <span className="text-slate-400 block mt-1 line-clamp-1">{preset.key}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Submission Deck (Split Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 6 Columns: Recording & Upload Console */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-xl border border-[#252a3d] bg-[#12141f] space-y-5">
            <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
              <Mic className="w-4 h-4 text-amber-400" />
              <span>Studio Recording & Submission Console</span>
            </h3>

            {/* Live Audio Visualizer Canvas */}
            <div className="relative rounded-lg overflow-hidden border border-[#262a3d] bg-[#0b0c12] h-28 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={500}
                height={112}
                className="w-full h-full object-cover"
              />
              {!isRecording && !audioUrl && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-xs">
                  <Music className="w-6 h-6 text-slate-600 mb-1" />
                  <span>Microphone ready · Tap Start Recording</span>
                </div>
              )}
              {isRecording && (
                <div className="absolute top-2.5 right-3 flex items-center gap-2 px-2.5 py-1 rounded bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>REC {Math.floor(recordingDuration / 60)}:{(recordingDuration % 60).toString().padStart(2, '0')}</span>
                </div>
              )}
            </div>

            {/* Mic Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="flex items-center gap-2 px-4 py-2.5 rounded bg-red-600 hover:bg-red-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Mic className="w-4 h-4" />
                  <span>Start Recording Horn</span>
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="flex items-center gap-2 px-4 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <Square className="w-4 h-4" />
                  <span>Stop & Capture Excerpt</span>
                </button>
              )}

              {/* File Upload Option */}
              <label className="flex items-center gap-2 px-4 py-2.5 rounded bg-[#1b1f2e] hover:bg-[#252a3f] border border-[#2d334a] text-slate-300 font-medium text-xs cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>Upload Audio (.wav, .mp3)</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Audio Playback If Ready */}
            {audioUrl && (
              <div className="p-3 rounded bg-[#171926] border border-[#25293d] space-y-2">
                <span className="text-[11px] font-mono text-amber-400 block">Captured Performance Excerpt:</span>
                <audio controls src={audioUrl} className="w-full h-8" />
              </div>
            )}

            {/* Excerpt Metadata Form */}
            <div className="space-y-3 pt-2 border-t border-[#1e2233] text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Tune / Excerpt:</label>
                  <input
                    type="text"
                    value={tuneTitle}
                    onChange={(e) => setTuneTitle(e.target.value)}
                    className="w-full bg-[#0b0c12] border border-[#262a3d] rounded px-3 py-1.5 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Key & Instrument:</label>
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="w-full bg-[#0b0c12] border border-[#262a3d] rounded px-3 py-1.5 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono">Student Rehearsal Context / Focus:</label>
                <textarea
                  rows={2}
                  value={performanceNotes}
                  onChange={(e) => setPerformanceNotes(e.target.value)}
                  className="w-full bg-[#0b0c12] border border-[#262a3d] rounded px-3 py-1.5 text-white focus:outline-none focus:border-amber-400 leading-relaxed font-sans"
                />
              </div>

              {/* Action Button */}
              <button
                onClick={runAdjudication}
                disabled={isEvaluating}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
              >
                {isEvaluating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Adjudicating Mason's Clip (Faculty Board in Session)...</span>
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4" />
                    <span>Generate Official 4-Part Adjudication Scorecard</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Right 6 Columns: The 4-Part Scorecard Display */}
        <div className="lg:col-span-6 space-y-6">
          {scorecard ? (
            <div className="p-6 rounded-xl border border-amber-500/40 bg-[#131522] space-y-6 shadow-xl">
              
              {/* Scorecard Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#23273a] pb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
                    Official Conservatory Adjudication
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-0.5">
                    {scorecard.tuneTitle}
                  </h3>
                  <p className="text-xs text-amber-200/90 font-medium mt-0.5">
                    {scorecard.divisionRating}
                  </p>
                </div>
                
                {/* Total Score Badge */}
                <div className="text-right">
                  <div className="text-4xl font-extrabold font-mono text-amber-400 tabular-nums">
                    {scorecard.overallScore}<span className="text-xl text-slate-400">/100</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-slate-400">Composite Score</span>
                </div>
              </div>

              {/* 4 Rubric Categories */}
              <div className="space-y-4">
                {/* 1. Tone & Intonation */}
                <div className="p-3.5 rounded-lg bg-[#181a28] border border-[#272b3e] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs font-display">1. Tone & Intonation</span>
                    <span className="font-mono font-bold text-amber-400 text-xs">
                      {scorecard.categories.toneAndIntonation.score} / 25
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {scorecard.categories.toneAndIntonation.critique}
                  </p>
                  <div className="p-2 rounded bg-[#0f111a] border border-[#222638] text-[11px] text-amber-200">
                    <strong className="text-amber-400">Actionable Fix: </strong>
                    {scorecard.categories.toneAndIntonation.specificFix}
                  </div>
                </div>

                {/* 2. Time, Feel & Rhythm */}
                <div className="p-3.5 rounded-lg bg-[#181a28] border border-[#272b3e] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs font-display">2. Time, Feel & Rhythm</span>
                    <span className="font-mono font-bold text-amber-400 text-xs">
                      {scorecard.categories.timeFeelAndRhythm.score} / 25
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {scorecard.categories.timeFeelAndRhythm.critique}
                  </p>
                  <div className="p-2 rounded bg-[#0f111a] border border-[#222638] text-[11px] text-amber-200">
                    <strong className="text-amber-400">Actionable Fix: </strong>
                    {scorecard.categories.timeFeelAndRhythm.specificFix}
                  </div>
                </div>

                {/* 3. Harmonic Language */}
                <div className="p-3.5 rounded-lg bg-[#181a28] border border-[#272b3e] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs font-display">3. Harmonic Language & Vocabulary</span>
                    <span className="font-mono font-bold text-amber-400 text-xs">
                      {scorecard.categories.harmonicLanguage.score} / 25
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {scorecard.categories.harmonicLanguage.critique}
                  </p>
                  <div className="p-2 rounded bg-[#0f111a] border border-[#222638] text-[11px] text-amber-200">
                    <strong className="text-amber-400">Actionable Fix: </strong>
                    {scorecard.categories.harmonicLanguage.specificFix}
                  </div>
                </div>

                {/* 4. Stage Presence */}
                <div className="p-3.5 rounded-lg bg-[#181a28] border border-[#272b3e] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs font-display">4. Stage Presence & Expressiveness</span>
                    <span className="font-mono font-bold text-amber-400 text-xs">
                      {scorecard.categories.stagePresenceAndExpressiveness.score} / 25
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {scorecard.categories.stagePresenceAndExpressiveness.critique}
                  </p>
                  <div className="p-2 rounded bg-[#0f111a] border border-[#222638] text-[11px] text-amber-200">
                    <strong className="text-amber-400">Actionable Fix: </strong>
                    {scorecard.categories.stagePresenceAndExpressiveness.specificFix}
                  </div>
                </div>
              </div>

              {/* Timestamped Critiques */}
              {scorecard.timestampCritiques && scorecard.timestampCritiques.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#23273a]">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Exact Timestamp Feedback:
                  </span>
                  <div className="space-y-1.5">
                    {scorecard.timestampCritiques.map((tc, idx) => (
                      <div key={idx} className="p-2.5 rounded bg-[#171927] border border-[#24283c] flex items-start gap-2.5 text-xs">
                        <span className="font-mono text-amber-400 font-bold whitespace-nowrap">{tc.time}</span>
                        <div className="space-y-0.5">
                          <div className="text-slate-300">{tc.observation}</div>
                          <div className="text-[11px] text-amber-200/90 italic">{tc.facultyAdvice}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prescreening Readiness */}
              {scorecard.prescreeningReadiness && (
                <div className="p-4 rounded-lg bg-[#151726] border border-[#262a3f] space-y-2 text-xs">
                  <div className="font-bold text-amber-400 font-display">Audition & Studio Jazz Standing</div>
                  <div className="text-slate-300">
                    <strong className="text-white">College Standing: </strong>{scorecard.prescreeningReadiness.juilliardMSMScore}
                  </div>
                  <div className="text-slate-300">
                    <strong className="text-white">Ellington Forecast: </strong>{scorecard.prescreeningReadiness.essentiallyEllingtonRank}
                  </div>
                  <div className="text-slate-300">
                    <strong className="text-white">Bob Hackett Rehearsal Note: </strong>{scorecard.prescreeningReadiness.topPriorityForBobHackettRehearsal}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="p-8 rounded-xl border border-[#252a3d] bg-[#12141f] text-center space-y-4 flex flex-col items-center justify-center min-h-[460px]">
              <div className="w-14 h-14 rounded-full bg-[#181b29] border border-[#2a2f44] flex items-center justify-center text-amber-400">
                <Award className="w-7 h-7" />
              </div>
              <div className="max-w-md space-y-2">
                <h4 className="text-lg font-bold font-display text-white">Scorecard Awaiting Submission</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Record an excerpt or select a preset and tap <strong className="text-amber-300">Generate Official Scorecard</strong>. The Faculty Board will evaluate tone center, swing feel, harmonic accuracy, and Ellington authenticity.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
