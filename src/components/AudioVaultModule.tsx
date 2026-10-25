import React, { useState, useRef, useEffect } from 'react';
import { SavedRecordingTake, AdjudicationScorecard } from '../types/masterclass';
import { db, auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, User } from '../lib/firebase';
import { doc, setDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import { Mic, Square, Upload, Award, Play, Trash2, Sparkles, Music, Database, Cloud, LogIn, LogOut, CheckCircle2 } from 'lucide-react';

export const AudioVaultModule: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [audioMimeType, setAudioMimeType] = useState<string>('audio/webm');
  const [tuneTitle, setTuneTitle] = useState('Cottontail (Chorus 1 & 2)');
  const [key, setKey] = useState('Bb Concert / C Tenor');
  const [tempo, setTempo] = useState('Up-Tempo Swing (230 BPM)');
  const [studentNotes, setStudentNotes] = useState('Rehearsing Ben Webster opening statement into Bebop enclosures, with 2nd chorus altissimo build.');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [activeScorecard, setActiveScorecard] = useState<AdjudicationScorecard | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const [savedTakes, setSavedTakes] = useState<SavedRecordingTake[]>(() => {
    try {
      const stored = localStorage.getItem('mason_audio_takes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Listen to Auth State
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  // Fetch from Firestore on mount
  useEffect(() => {
    const fetchFirestoreTakes = async () => {
      setIsSyncing(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'audioTakes'));
        const cloudTakes: SavedRecordingTake[] = [];
        querySnapshot.forEach((docSnap) => {
          cloudTakes.push(docSnap.data() as SavedRecordingTake);
        });

        if (cloudTakes.length > 0) {
          // Merge with local takes by id
          setSavedTakes((prev) => {
            const map = new Map<string, SavedRecordingTake>();
            prev.forEach(t => map.set(t.id, t));
            cloudTakes.forEach(t => map.set(t.id, t));
            const merged = Array.from(map.values()).sort((a, b) => b.timestamp - a.timestamp);
            try {
              localStorage.setItem('mason_audio_takes', JSON.stringify(merged));
            } catch {}
            return merged;
          });
        }
      } catch (err) {
        console.warn("Could not sync with Firestore (using local storage cache):", err);
      } finally {
        setIsSyncing(false);
      }
    };

    fetchFirestoreTakes();
  }, [currentUser]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('mason_audio_takes', JSON.stringify(savedTakes));
    } catch (e) {
      console.warn("Storage quota limit reached for local audio takes", e);
    }
  }, [savedTakes]);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Sign-in error:", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign-out error:", err);
    }
  };

  // Start Mic Recording with Waveform
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

      drawWaveform();
    } catch (err) {
      console.error("Microphone error:", err);
      alert("Microphone could not be accessed. You may still upload an audio file or evaluate with notes.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
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

      ctx.fillStyle = '#0f111a';
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

  // Run Adjudication & Save to Firestore
  const handleAdjudicate = async () => {
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
            performanceNotes: studentNotes
          }
        })
      });

      const scorecardData = await res.json();
      setActiveScorecard(scorecardData);

      const takeId = `take-${Date.now()}`;
      const newTake: SavedRecordingTake = {
        id: takeId,
        timestamp: Date.now(),
        dateFormatted: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        tuneTitle,
        key,
        tempo,
        durationSeconds: recordingDuration || 60,
        audioBlobUrl: audioUrl || undefined,
        audioBase64: audioBase64 || undefined,
        mimeType: audioMimeType,
        studentNotes,
        scorecard: scorecardData,
        firebaseSaved: true
      };

      setSavedTakes(prev => [newTake, ...prev]);

      // Save to Firebase Firestore
      try {
        await setDoc(doc(db, 'audioTakes', takeId), {
          id: takeId,
          studentUid: currentUser?.uid || 'guest-mason',
          tuneTitle,
          key,
          tempo,
          durationSeconds: recordingDuration || 60,
          studentNotes,
          overallScore: scorecardData.overallScore || 0,
          divisionRating: scorecardData.divisionRating || '',
          critiqueSummary: scorecardData.categories?.toneAndIntonation?.critique || '',
          timestamp: Date.now(),
          createdAt: new Date().toISOString()
        });
      } catch (cloudErr) {
        console.warn("Could not write take to Firestore (saved locally):", cloudErr);
      }
    } catch (err) {
      console.error(err);
      alert("Evaluation failed. Please verify server connection.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const deleteTake = async (id: string) => {
    setSavedTakes(prev => prev.filter(t => t.id !== id));
    try {
      await deleteDoc(doc(db, 'audioTakes', id));
    } catch (err) {
      console.warn("Could not delete from Firestore:", err);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#212433] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <span>Audio Studio & Adjudication</span>
            <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
            <span>Firebase Connected Vault</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Performance Vault & 4-Part Adjudication
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Record, upload, and archive rehearsal takes with instant Lincoln Center & Conservatory 100-point adjudication. Synced to your Firebase Firestore cloud database.
          </p>
        </div>

        {/* Cloud Sync & Auth Strip */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-[#121c17] border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
            <Cloud className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Firestore Synced ({savedTakes.length} Takes)</span>
          </div>

          {currentUser ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#161826] border border-slate-200 dark:border-[#24283c] text-xs">
              <span className="font-bold text-slate-900 dark:text-white truncate max-w-[120px]">
                {currentUser.displayName || currentUser.email || 'Musician'}
              </span>
              <button
                onClick={handleSignOut}
                className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-0.5"
                title="Sign Out"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
            >
              <LogIn className="w-3 h-3" />
              <span>Sign In with Google</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 6 Columns: Recording Deck & Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#12141f] space-y-5 shadow-xs">
            <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <Mic className="w-4 h-4 text-amber-500" />
              <span>Capture Performance Take</span>
            </h3>

            {/* Visualizer */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-[#262a3d] bg-slate-900 h-28 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={500}
                height={112}
                className="w-full h-full object-cover"
              />
              {!isRecording && !audioUrl && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-xs">
                  <Music className="w-6 h-6 text-slate-500 mb-1" />
                  <span>Microphone Ready · Tap 'Record Horn'</span>
                </div>
              )}
              {isRecording && (
                <div className="absolute top-2.5 right-3 flex items-center gap-2 px-2.5 py-1 rounded bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>REC {Math.floor(recordingDuration / 60)}:{(recordingDuration % 60).toString().padStart(2, '0')}</span>
                </div>
              )}
            </div>

            {/* Recording Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Mic className="w-4 h-4" />
                  <span>Record Horn</span>
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <Square className="w-4 h-4" />
                  <span>Stop & Save Take</span>
                </button>
              )}

              <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-[#1b1f2e] hover:bg-slate-200 dark:hover:bg-[#252a3f] border border-slate-300 dark:border-[#2d334a] text-slate-700 dark:text-slate-300 font-medium text-xs cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5 text-amber-500" />
                <span>Upload Audio File</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {audioUrl && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#171926] border border-slate-200 dark:border-[#25293d] space-y-2">
                <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 block font-semibold">
                  Preview Captured Take:
                </span>
                <audio controls src={audioUrl} className="w-full h-8" />
              </div>
            )}

            {/* Take Metadata */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-[#1e2233] text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono">Tune / Excerpt:</label>
                  <input
                    type="text"
                    value={tuneTitle}
                    onChange={(e) => setTuneTitle(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#0b0c12] border border-slate-200 dark:border-[#262a3d] rounded-lg px-3 py-1.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono">Key & Tempo:</label>
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#0b0c12] border border-slate-200 dark:border-[#262a3d] rounded-lg px-3 py-1.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono">Rehearsal Focus / Notes for Juries:</label>
                <textarea
                  rows={2}
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0b0c12] border border-slate-200 dark:border-[#262a3d] rounded-lg px-3 py-1.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
                />
              </div>

              <button
                onClick={handleAdjudicate}
                disabled={isEvaluating}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
              >
                {isEvaluating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Adjudicating Take with Faculty Board & Saving to Firestore...</span>
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4" />
                    <span>Save to Firebase & Generate Adjudication Scorecard</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Saved Takes Library Strip */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#12141f] space-y-4 shadow-xs">
            <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white flex items-center justify-between">
              <span>Cloud & Studio Takes Archive</span>
              <span className="text-xs font-mono text-slate-400">{savedTakes.length} Saved</span>
            </h4>

            {savedTakes.length === 0 ? (
              <div className="text-xs text-slate-500 text-center py-6">
                No recorded takes yet. Record your horn above to start your archive.
              </div>
            ) : (
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {savedTakes.map((take) => (
                  <div
                    key={take.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-[#161825] border border-slate-200 dark:border-[#232738] flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        {take.tuneTitle}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                        {take.dateFormatted} · {take.key}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {take.scorecard && (
                        <button
                          onClick={() => setActiveScorecard(take.scorecard!)}
                          className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-[11px] font-bold font-mono"
                        >
                          {take.scorecard.overallScore}/100
                        </button>
                      )}
                      <button
                        onClick={() => deleteTake(take.id)}
                        className="text-slate-400 hover:text-red-500 p-1"
                        title="Delete Take"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 6 Columns: Active Scorecard Display */}
        <div className="lg:col-span-6 space-y-6">
          {activeScorecard ? (
            <div className="p-6 rounded-2xl border border-amber-500/40 bg-white dark:bg-[#131522] space-y-6 shadow-xl">
              
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-[#23273a] pb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
                    Official Conservatory Adjudication
                  </span>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mt-0.5">
                    {activeScorecard.tuneTitle}
                  </h3>
                  <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold mt-0.5">
                    {activeScorecard.divisionRating}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="text-4xl font-extrabold font-mono text-amber-600 dark:text-amber-400 tabular-nums">
                    {activeScorecard.overallScore}<span className="text-xl text-slate-400">/100</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-slate-400">Composite Score</span>
                </div>
              </div>

              {/* 4 Rubric Categories */}
              <div className="space-y-3.5">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181a28] border border-slate-200 dark:border-[#272b3e] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-xs font-display">1. Tone & Intonation</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-xs">
                      {activeScorecard.categories.toneAndIntonation.score} / 25
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeScorecard.categories.toneAndIntonation.critique}
                  </p>
                  <div className="p-2 rounded bg-amber-500/10 text-[11px] text-amber-900 dark:text-amber-200">
                    <strong>Actionable Fix: </strong>{activeScorecard.categories.toneAndIntonation.specificFix}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181a28] border border-slate-200 dark:border-[#272b3e] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-xs font-display">2. Time, Feel & Rhythm</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-xs">
                      {activeScorecard.categories.timeFeelAndRhythm.score} / 25
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeScorecard.categories.timeFeelAndRhythm.critique}
                  </p>
                  <div className="p-2 rounded bg-amber-500/10 text-[11px] text-amber-900 dark:text-amber-200">
                    <strong>Actionable Fix: </strong>{activeScorecard.categories.timeFeelAndRhythm.specificFix}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181a28] border border-slate-200 dark:border-[#272b3e] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-xs font-display">3. Harmonic Language & Vocabulary</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-xs">
                      {activeScorecard.categories.harmonicLanguage.score} / 25
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeScorecard.categories.harmonicLanguage.critique}
                  </p>
                  <div className="p-2 rounded bg-amber-500/10 text-[11px] text-amber-900 dark:text-amber-200">
                    <strong>Actionable Fix: </strong>{activeScorecard.categories.harmonicLanguage.specificFix}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181a28] border border-slate-200 dark:border-[#272b3e] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-xs font-display">4. Stage Presence & Expressiveness</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-xs">
                      {activeScorecard.categories.stagePresenceAndExpressiveness.score} / 25
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeScorecard.categories.stagePresenceAndExpressiveness.critique}
                  </p>
                  <div className="p-2 rounded bg-amber-500/10 text-[11px] text-amber-900 dark:text-amber-200">
                    <strong>Actionable Fix: </strong>{activeScorecard.categories.stagePresenceAndExpressiveness.specificFix}
                  </div>
                </div>
              </div>

              {/* Exact Timestamp Feedback */}
              {activeScorecard.timestampCritiques && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#23273a]">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Exact Timestamp Feedback:
                  </span>
                  <div className="space-y-1.5 text-xs">
                    {activeScorecard.timestampCritiques.map((tc, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#171927] border border-slate-200 dark:border-[#24283c] flex items-start gap-2.5">
                        <span className="font-mono text-amber-600 dark:text-amber-400 font-bold whitespace-nowrap">{tc.time}</span>
                        <div>
                          <div className="text-slate-800 dark:text-slate-200 font-medium">{tc.observation}</div>
                          <div className="text-[11px] text-amber-800 dark:text-amber-200/90 italic mt-0.5">{tc.facultyAdvice}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* College Readiness & Bob Hackett Priority */}
              {activeScorecard.prescreeningReadiness && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#151726] border border-slate-200 dark:border-[#262a3f] space-y-1.5 text-xs">
                  <div className="font-bold text-amber-700 dark:text-amber-400 font-display">Conservatory Standing & Director Priority</div>
                  <div className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Audition Standing: </strong>{activeScorecard.prescreeningReadiness.juilliardMSMScore}
                  </div>
                  <div className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Ellington Forecast: </strong>{activeScorecard.prescreeningReadiness.essentiallyEllingtonRank}
                  </div>
                  <div className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Rehearsal Note for Bob Hackett: </strong>{activeScorecard.prescreeningReadiness.topPriorityForBobHackettRehearsal}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="p-8 rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#12141f] text-center space-y-4 flex flex-col items-center justify-center min-h-[460px] shadow-xs">
              <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-[#181b29] border border-slate-200 dark:border-[#2a2f44] flex items-center justify-center text-amber-500">
                <Award className="w-7 h-7" />
              </div>
              <div className="max-w-md space-y-2">
                <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white">Adjudication Deck Ready</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Record your tenor sax or upload an audio take to receive official 100-point feedback graded on Tone, Time, Harmonic Language, and Stage Presence, saved directly to Firebase.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
