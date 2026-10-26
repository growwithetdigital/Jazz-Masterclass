import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SavedRecordingTake, AdjudicationScorecard } from '../types/masterclass';
import { db, auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, User } from '../lib/firebase';
import { doc, setDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import { 
  Mic, Square, Upload, Award, Play, Trash2, Sparkles, Music, 
  Database, Cloud, LogIn, LogOut, CheckCircle2, Video, Volume2, 
  Gauge, AlertCircle, ShieldCheck, PlayCircle, Layers
} from 'lucide-react';

interface AudioVaultModuleProps {
  onSelectTab?: (tab: string) => void;
}

export const AudioVaultModule: React.FC<AudioVaultModuleProps> = ({ onSelectTab }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  
  // Media State (Audio or Video)
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'audio' | 'video'>('audio');
  const [mediaBase64, setMediaBase64] = useState<string | null>(null);
  const [mediaMimeType, setMediaMimeType] = useState<string>('audio/webm');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Performance Form State
  const [tuneTitle, setTuneTitle] = useState('Cottontail (Chorus 1 & 2 Solo)');
  const [key, setKey] = useState('Bb Concert / C Tenor');
  const [tempo, setTempo] = useState('Up-Tempo Swing (235 BPM)');
  const [studentNotes, setStudentNotes] = useState('Rehearsing Ben Webster opening statement into Bebop enclosures, with 2nd chorus altissimo build.');
  
  // Evaluation State
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [activeScorecard, setActiveScorecard] = useState<AdjudicationScorecard | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [vuLevel, setVuLevel] = useState(15); // Meter dB visualizer

  // Local & Firestore Takes Archive
  const [savedTakes, setSavedTakes] = useState<SavedRecordingTake[]>(() => {
    try {
      const stored = localStorage.getItem('mason_audio_takes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaChunksRef = useRef<Blob[]>([]);
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

  // Fetch from Firestore on mount or user change
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
        console.warn("Using local cache for takes:", err);
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
      console.warn("Storage quota warning for local audio takes", e);
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

  // Start Mic Recording with Waveform & VU meter
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaChunksRef.current = [];
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
          mediaChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(mediaChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setMediaUrl(url);
        setMediaType('audio');
        setMediaMimeType('audio/webm');
        setUploadedFileName('Live Horn Recording Take');

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = (reader.result as string)?.split(',')[1];
          setMediaBase64(base64String || null);
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
      alert("Microphone could not be accessed. You can still upload any audio or video file below, or evaluate with your rehearsal notes.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      setVuLevel(15);
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

      // Calculate instantaneous average for the analog VU meter needle
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const avg = sum / bufferLength;
      // map 0-255 to needle angle range (10% to 90%)
      const calculatedVu = Math.min(95, Math.max(10, (avg / 120) * 80 + 10));
      setVuLevel(calculatedVu);

      ctx.fillStyle = '#0a0b10';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        // Warm gold to amber jazz spectrum
        ctx.fillStyle = `rgb(245, ${160 + (dataArray[i] / 4)}, ${dataArray[i] > 200 ? 50 : 20})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };
    render();
  };

  // Handle File Upload (Audio or Video)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/') || file.name.match(/\.(mp4|mov|webm|m4v|avi)$/i);
    const type: 'audio' | 'video' = isVideo ? 'video' : 'audio';

    const url = URL.createObjectURL(file);
    setMediaUrl(url);
    setMediaType(type);
    setMediaMimeType(file.type || (isVideo ? 'video/mp4' : 'audio/mp3'));
    setUploadedFileName(file.name);

    // Read Base64 for multimodal adjudication (only if within manageable payload)
    if (file.size <= 28 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string)?.split(',')[1];
        setMediaBase64(base64String || null);
      };
      reader.readAsDataURL(file);
    } else {
      console.warn("File exceeds direct base64 transfer (over 28MB). Using client playback & metadata adjudication.");
      setMediaBase64(null);
    }
  };

  // Quick Preset Sample
  const handleLoadSampleTake = () => {
    setTuneTitle("Cottontail (Duke Ellington / Ben Webster Solo)");
    setKey("Bb Concert / C Tenor");
    setTempo("Up-Tempo Swing (240 BPM)");
    setStudentNotes("Agoura High Studio Jazz lead tenor run. Aiming for Ben Webster's opening punch, Parker chromatic enclosures over the bridge, and Paul Gonsalves-style stamina.");
    setUploadedFileName("Sample_Ellington_Tenor_Rehearsal.mp3");
    setMediaType('audio');
    setMediaUrl(null);
  };

  // Run Adjudication & Save (Works 100% in Guest Mode or Google Sign-In)
  const handleAdjudicate = async () => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/adjudicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioData: mediaBase64,
          mimeType: mediaMimeType,
          mediaType: mediaType,
          performanceDetails: {
            tuneTitle,
            key,
            tempo,
            performanceNotes: studentNotes,
            fileName: uploadedFileName
          }
        })
      });

      const scorecardData = await res.json();
      setActiveScorecard(scorecardData);

      const takeId = `take-${Date.now()}`;
      const newTake: SavedRecordingTake = {
        id: takeId,
        timestamp: Date.now(),
        dateFormatted: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        tuneTitle,
        key,
        tempo,
        durationSeconds: recordingDuration || 75,
        mediaType,
        mediaBlobUrl: mediaUrl || undefined,
        audioBlobUrl: mediaType === 'audio' ? (mediaUrl || undefined) : undefined,
        audioBase64: mediaBase64 || undefined,
        mimeType: mediaMimeType,
        studentNotes,
        scorecard: scorecardData,
        firebaseSaved: Boolean(currentUser)
      };

      // Always save to local storage state for Mason immediately
      setSavedTakes(prev => [newTake, ...prev]);

      // If user is authenticated with Google or Firebase is available, sync to Firestore
      try {
        await setDoc(doc(db, 'audioTakes', takeId), {
          id: takeId,
          studentUid: currentUser?.uid || 'guest-mason',
          mediaType,
          fileName: uploadedFileName || 'Direct Horn Capture',
          tuneTitle,
          key,
          tempo,
          durationSeconds: recordingDuration || 75,
          studentNotes,
          overallScore: scorecardData.overallScore || 0,
          divisionRating: scorecardData.divisionRating || '',
          critiqueSummary: scorecardData.categories?.toneAndIntonation?.critique || '',
          timestamp: Date.now(),
          createdAt: new Date().toISOString()
        });
      } catch (cloudErr) {
        console.warn("Saved to local browser vault (Firebase cloud write skipped):", cloudErr);
      }
    } catch (err) {
      console.error(err);
      alert("Evaluation could not connect to the adjudication server. Please check your connection and try again.");
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
    <div className="space-y-8">
      {/* Top Banner: No Sign-in Required Guarantee */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-100 dark:via-[#161828] to-emerald-500/10 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                Open Access Studio
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                Guest Mode Active
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
              No Sign-In Required to Upload Video, Audio, & Receive Feedback
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Upload your video or audio performance, or record live with your microphone. The Lincoln Center adjudication engine grades your take immediately and stores it in this browser session.
            </p>
          </div>
        </div>

        {/* Optional Google Cloud Sync */}
        <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
          {currentUser ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1b1e2e] border border-slate-200 dark:border-[#2d3248] text-xs shadow-xs">
              <Cloud className="w-4 h-4 text-emerald-500" />
              <div className="text-left">
                <span className="text-[10px] text-slate-400 block font-mono">Cloud Synced</span>
                <span className="font-bold text-slate-900 dark:text-white truncate max-w-[120px] block">
                  {currentUser.displayName || currentUser.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 ml-1"
                title="Sign out of Google"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#1b1e2e] hover:bg-slate-50 dark:hover:bg-[#252a3f] border border-slate-300 dark:border-[#2f354d] text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-500" />
              <span>Sign In with Google (Optional Cloud Sync)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 6 Columns: Recording Console & Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#12141f] space-y-5 shadow-xs">
            
            {/* Header with Quick Fill */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1f2233] pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  Take Deck: Audio & Video Adjudication
                </h3>
              </div>
              <button
                type="button"
                onClick={handleLoadSampleTake}
                className="text-[11px] font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <PlayCircle className="w-3.5 h-3.5" />
                <span>Load Sample Ellington Take</span>
              </button>
            </div>

            {/* Analog Studio VU Meter & Visualizer */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>STUDIO ACOUSTIC VU LEVEL</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  {isRecording ? 'LIVE INPUT PEAK' : 'ROOM SENSING ACTIVE'}
                </span>
              </div>

              {/* VU Meter Dial Graphic */}
              <div className="relative h-14 bg-gradient-to-b from-slate-900 to-black rounded-lg border border-slate-800 p-2 overflow-hidden flex flex-col justify-end">
                {/* Scale markings */}
                <div className="flex justify-between text-[9px] font-mono text-slate-500 px-3 pb-1 border-b border-slate-800">
                  <span>-20 dB</span>
                  <span>-10 dB</span>
                  <span>-7 dB</span>
                  <span>-3 dB</span>
                  <span className="text-amber-400">0 dB</span>
                  <span className="text-red-400">+3 dB (PEAK)</span>
                </div>
                {/* Meter Needle */}
                <div className="relative w-full h-4 mt-1">
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-[0_0_8px_#f59e0b] transition-all duration-100 ease-out"
                    style={{ left: `${vuLevel}%` }}
                  />
                  {/* Peak LED bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden flex">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 transition-all duration-75"
                      style={{ width: `${vuLevel}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Waveform Canvas */}
              <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-black h-20 flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={80}
                  className="w-full h-full object-cover"
                />
                {!isRecording && !mediaUrl && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 text-xs">
                    <Music className="w-5 h-5 mb-1 text-slate-600" />
                    <span>Mic Standby · Ready to Record or Upload Take</span>
                  </div>
                )}
                {isRecording && (
                  <div className="absolute top-2 right-2.5 flex items-center gap-2 px-2.5 py-1 rounded bg-red-950/90 border border-red-500 text-red-300 text-xs font-mono font-bold shadow-md">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span>REC {Math.floor(recordingDuration / 60)}:{(recordingDuration % 60).toString().padStart(2, '0')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Primary Action Buttons: Mic or File Upload */}
            <div className="flex flex-wrap items-center gap-3">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={startRecording}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  <Mic className="w-4 h-4" />
                  <span>Record Horn (Live Mic)</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 animate-pulse"
                >
                  <Square className="w-4 h-4" />
                  <span>Stop & Lock Take</span>
                </button>
              )}

              {/* Upload Video or Audio File */}
              <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#1a1d2c] hover:bg-slate-200 dark:hover:bg-[#23273b] border border-slate-300 dark:border-[#2d3248] text-slate-800 dark:text-slate-200 font-semibold text-xs cursor-pointer transition-colors shadow-xs">
                <Upload className="w-4 h-4 text-amber-500" />
                <span>Upload Video or Audio</span>
                <input
                  type="file"
                  accept="audio/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <span className="text-[11px] text-slate-500 font-mono">
                Supports .mp4, .mov, .webm, .wav, .mp3, .m4a
              </span>
            </div>

            {/* Video or Audio Preview Player */}
            {mediaUrl && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#151726] border border-slate-200 dark:border-[#262a3f] space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5">
                    {mediaType === 'video' ? <Video className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>Preview Loaded {mediaType === 'video' ? 'Video' : 'Audio'} Take:</span>
                  </span>
                  {uploadedFileName && (
                    <span className="text-[11px] font-mono text-slate-500 truncate max-w-[200px]">
                      {uploadedFileName}
                    </span>
                  )}
                </div>

                {mediaType === 'video' ? (
                  <video 
                    controls 
                    src={mediaUrl} 
                    className="w-full max-h-56 rounded-lg bg-black object-contain shadow-inner"
                  />
                ) : (
                  <audio controls src={mediaUrl} className="w-full h-8" />
                )}
              </motion.div>
            )}

            {/* Rehearsal Metadata Form */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-[#1e2233] text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono font-medium">
                    Tune / Solo Section:
                  </label>
                  <input
                    type="text"
                    value={tuneTitle}
                    onChange={(e) => setTuneTitle(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#0b0c12] border border-slate-200 dark:border-[#262a3d] rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono font-medium">
                    Concert Key & Tempo:
                  </label>
                  <input
                    type="text"
                    value={tempo}
                    onChange={(e) => setTempo(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#0b0c12] border border-slate-200 dark:border-[#262a3d] rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono font-medium">
                  Rehearsal Focus & Questions for Adjudicator:
                </label>
                <textarea
                  rows={2}
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  placeholder="e.g., Working on sub-tone in the low register, swinging triplets behind the beat, or Altissimo F# voice placement..."
                  className="w-full bg-slate-50 dark:bg-[#0b0c12] border border-slate-200 dark:border-[#262a3d] rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 leading-relaxed font-sans text-xs"
                />
              </div>

              {/* Submit for Adjudication */}
              <button
                type="button"
                onClick={handleAdjudicate}
                disabled={isEvaluating}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 disabled:opacity-50 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] cursor-pointer"
              >
                {isEvaluating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Adjudicating Take with Lincoln Center & Conservatory Jury...</span>
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4" />
                    <span>Run 100-Point Adjudication {currentUser ? '& Cloud Sync' : '(Instant Guest Evaluation)'}</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Takes Archive Strip */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#12141f] space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-500" />
                <span>Rehearsal Takes Archive</span>
              </h4>
              <span className="text-xs font-mono text-slate-400">
                {savedTakes.length} Takes {currentUser ? '(Firestore)' : '(Local Session)'}
              </span>
            </div>

            {savedTakes.length === 0 ? (
              <div className="text-xs text-slate-500 text-center py-6 border border-dashed border-slate-200 dark:border-[#24283c] rounded-xl">
                No recorded takes yet. Record your horn or upload a clip above to start your archive.
              </div>
            ) : (
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {savedTakes.map((take) => (
                  <div
                    key={take.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-[#161825] border border-slate-200 dark:border-[#232738] flex items-center justify-between gap-3 text-xs hover:border-amber-500/40 transition-colors"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                        {take.mediaType === 'video' ? (
                          <Video className="w-3.5 h-3.5 text-amber-500" />
                        ) : (
                          <Music className="w-3.5 h-3.5 text-amber-500" />
                        )}
                        <span>{take.tuneTitle}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                        {take.dateFormatted} · {take.key}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {take.scorecard && (
                        <button
                          type="button"
                          onClick={() => setActiveScorecard(take.scorecard!)}
                          className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-[11px] font-bold font-mono hover:bg-amber-500/20 transition-colors"
                        >
                          {take.scorecard.overallScore}/100
                        </button>
                      )}
                      <button
                        type="button"
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

        {/* Right 6 Columns: Official 4-Part Adjudication Scorecard */}
        <div className="lg:col-span-6 space-y-6">
          <AnimatePresence mode="wait">
            {activeScorecard ? (
              <motion.div 
                key={activeScorecard.tuneTitle}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 rounded-2xl border border-amber-500/40 bg-white dark:bg-[#131522] space-y-6 shadow-xl"
              >
                {/* Scorecard Header */}
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
                {activeScorecard.timestampCritiques && activeScorecard.timestampCritiques.length > 0 && (
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

              </motion.div>
            ) : (
              <div className="p-8 rounded-2xl border border-slate-200 dark:border-[#252a3d] bg-white dark:bg-[#12141f] text-center space-y-4 flex flex-col items-center justify-center min-h-[460px] shadow-xs">
                <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-[#181b29] border border-slate-200 dark:border-[#2a2f44] flex items-center justify-center text-amber-500">
                  <Award className="w-7 h-7" />
                </div>
                <div className="max-w-md space-y-2">
                  <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                    Adjudication Deck Ready
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Record your tenor sax or upload an audio or video clip to receive the official 100-point feedback graded on Tone, Time, Harmonic Language, and Stage Presence. No sign-in required!
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
