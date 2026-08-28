import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockPrograms, mockRoutines } from '../../data/mockWorkouts';
import { WorkoutRoutine, WorkoutSessionExercise } from '../../types';
import { 
  Play, 
  CheckCircle, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Dumbbell, 
  Calendar, 
  Pause, 
  RotateCcw, 
  X, 
  Trophy, 
  Volume2, 
  VolumeX,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WorkoutsTabProps {
  initialRoutineId?: string | null;
}

export const WorkoutsTab: React.FC<WorkoutsTabProps> = ({ initialRoutineId }) => {
  const { user, logWorkoutComplete, activeProgramId, setActiveProgramId } = useAuth();
  
  const [selectedRoutine, setSelectedRoutine] = useState<WorkoutRoutine | null>(() => {
    if (initialRoutineId) {
      return mockRoutines.find(r => r.id === initialRoutineId) || null;
    }
    return null;
  });

  // Workout Player State
  const [activePlayerRoutine, setActivePlayerRoutine] = useState<WorkoutRoutine | null>(() => {
    if (initialRoutineId) {
      return mockRoutines.find(r => r.id === initialRoutineId) || null;
    }
    return null;
  });
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [completedSets, setCompletedSets] = useState<Record<string, number>>({}); // exerciseId -> number of completed sets
  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [workoutFinished, setWorkoutFinished] = useState<boolean>(false);

  const activeProgram = mockPrograms.find(p => p.id === activeProgramId) || mockPrograms[0];

  // Rest Timer Countdown Effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Play audio notification beep if enabled
      if (soundEnabled && typeof window !== 'undefined' && window.AudioContext) {
        try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = 880;
          gain.gain.value = 0.1;
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        } catch (e) {
          // ignore
        }
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, soundEnabled]);

  const startPlayer = (routine: WorkoutRoutine) => {
    setActivePlayerRoutine(routine);
    setCurrentExerciseIndex(0);
    setCompletedSets({});
    setTimerSeconds(60);
    setIsTimerRunning(false);
    setWorkoutFinished(false);
  };

  const handleCompleteSet = (exerciseId: string, totalSets: number, restSec: number) => {
    const current = completedSets[exerciseId] || 0;
    const next = Math.min(totalSets, current + 1);
    setCompletedSets(prev => ({ ...prev, [exerciseId]: next }));
    
    // Auto-trigger rest timer
    setTimerSeconds(restSec || 60);
    setIsTimerRunning(true);
  };

  const handleFinishWorkout = () => {
    if (!activePlayerRoutine) return;
    setWorkoutFinished(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });
    logWorkoutComplete(
      activePlayerRoutine.id,
      activePlayerRoutine.durationMin,
      activePlayerRoutine.caloriesBurnEstimate
    );
  };

  // Schedule Days Mock (Week 1 to Week 4)
  const scheduleDays = [
    { day: 'Day 1', label: 'Athletic Blitz', routineId: 'rt-1', done: true },
    { day: 'Day 2', label: 'Metabolic HIIT', routineId: 'rt-3', done: true },
    { day: 'Day 3', label: 'Active Mobility', routineId: 'rt-4', done: false, active: true },
    { day: 'Day 4', label: 'Upper Sculpt', routineId: 'rt-2', done: false },
    { day: 'Day 5', label: 'Recovery Walk', routineId: 'rt-4', done: false },
    { day: 'Day 6', label: 'Full Blitz #2', routineId: 'rt-1', done: false },
    { day: 'Day 7', label: 'Total Rest', routineId: null, done: false }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Active Program Header */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(18, 24, 34, 0.95) 0%, rgba(12, 16, 23, 0.95) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px',
          border: '1px solid var(--border-medium)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-emerald">ACTIVE PROGRAM ROADMAP</span>
              <span className="badge badge-amber">{activeProgram.difficulty}</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{activeProgram.title}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '4px' }}>
              {activeProgram.tagline}
            </p>
          </div>

          <select
            className="form-input"
            value={activeProgramId}
            onChange={(e) => setActiveProgramId(e.target.value)}
            style={{ width: 'auto', background: 'var(--bg-input)' }}
          >
            {mockPrograms.map(p => (
              <option key={p.id} value={p.id}>Program: {p.title}</option>
            ))}
          </select>
        </div>

        {/* 7-Day Interactive Program Calendar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
          {scheduleDays.map((item, idx) => {
            const routine = item.routineId ? mockRoutines.find(r => r.id === item.routineId) : null;
            return (
              <div
                key={idx}
                onClick={() => {
                  if (routine) startPlayer(routine);
                }}
                style={{
                  background: item.active ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                  border: item.active ? '1px solid var(--accent-primary)' : item.done ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  cursor: routine ? 'pointer' : 'default',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: item.active ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
                    {item.day}
                  </span>
                  {item.done && <CheckCircle2 size={14} style={{ color: 'var(--accent-primary)' }} />}
                  {item.active && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }} />}
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {routine ? `${routine.durationMin} mins` : 'Rest & Recover'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Routine Cards Collection */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Available Workout Routines</h3>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Click any routine to launch interactive player</span>
        </div>

        <div className="grid-2">
          {mockRoutines.map((routine) => (
            <div
              key={routine.id}
              className="glass-card card-hover-effect"
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                background: 'var(--bg-card-solid)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', gap: '16px', padding: '20px' }}>
                <img
                  src={routine.thumbnail}
                  alt={routine.title}
                  style={{ width: '110px', height: '110px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
                    <span className="badge badge-emerald">{routine.category}</span>
                    <span className="badge badge-amber">{routine.difficulty}</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>{routine.title}</h4>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '8px' }}>
                    {routine.subtitle}
                  </p>
                  <div style={{ display: 'flex', gap: '14px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>⏱ {routine.durationMin} mins</span>
                    <span>🔥 ~{routine.caloriesBurnEstimate} kcal</span>
                    <span>🏋️ {routine.exercises.length} exercises</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 20px 20px 20px', display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => startPlayer(routine)}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '10px' }}
                >
                  <Play size={16} fill="#fff" />
                  <span>Start Live Workout</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIVE WORKOUT PLAYER MODAL */}
      {activePlayerRoutine && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(5, 7, 10, 0.95)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            className="glass-card animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '850px',
              background: 'var(--bg-card-solid)',
              borderRadius: 'var(--radius-xl)',
              maxHeight: '92vh',
              overflowY: 'auto',
              padding: '32px',
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePlayerRoutine(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                color: 'var(--text-muted)',
                padding: '6px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>

            {!workoutFinished ? (
              <>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingRight: '40px' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                      <span className="badge badge-emerald">LIVE SESSION IN PROGRESS</span>
                      <span className="badge badge-coral">{activePlayerRoutine.category}</span>
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{activePlayerRoutine.title}</h2>
                  </div>

                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    style={{ color: soundEnabled ? 'var(--accent-primary)' : 'var(--text-muted)', padding: '6px' }}
                    title="Toggle timer beep sound"
                  >
                    {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                  </button>
                </div>

                {/* Rest Timer Panel */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(19, 25, 36, 0.9) 100%)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      fontSize: '2rem',
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      color: isTimerRunning ? 'var(--accent-primary)' : 'var(--text-primary)'
                    }}>
                      {Math.floor(timerSeconds / 60)}:{String(timerSeconds % 60).padStart(2, '0')}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      {isTimerRunning ? 'Rest Timer Active (Rest & hydrate)' : 'Rest Timer Ready'}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="btn btn-outline btn-sm"
                      style={{ padding: '6px 14px' }}
                    >
                      {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
                      <span>{isTimerRunning ? 'Pause' : 'Start Rest'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setTimerSeconds(60);
                        setIsTimerRunning(false);
                      }}
                      className="btn btn-ghost btn-sm"
                    >
                      <RotateCcw size={14} />
                      <span>60s</span>
                    </button>
                    <button
                      onClick={() => {
                        setTimerSeconds(90);
                        setIsTimerRunning(false);
                      }}
                      className="btn btn-ghost btn-sm"
                    >
                      <span>90s</span>
                    </button>
                  </div>
                </div>

                {/* Exercise List & Set Logger */}
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px' }}>
                  Exercise Progression ({activePlayerRoutine.exercises.length} Total)
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                  {activePlayerRoutine.exercises.map((item, idx) => {
                    const doneCount = completedSets[item.exerciseId] || 0;
                    const isAllDone = doneCount >= item.sets;

                    return (
                      <div
                        key={idx}
                        style={{
                          background: isAllDone ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                          border: isAllDone ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-lg)',
                          padding: '18px 22px',
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 700 }}>#{idx + 1}</span>
                            <h5 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{item.exerciseName}</h5>
                            {isAllDone && <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)' }} />}
                          </div>
                          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                            Target: <strong>{item.sets} Sets</strong> × <strong>{item.reps}</strong> • Rest: {item.restSec}s
                          </div>
                          {item.notes && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', marginTop: '4px' }}>
                              💡 {item.notes}
                            </div>
                          )}
                        </div>

                        {/* Set Checkmark Buttons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {[...Array(item.sets)].map((_, setIdx) => {
                            const isDone = setIdx < doneCount;
                            return (
                              <button
                                key={setIdx}
                                onClick={() => handleCompleteSet(item.exerciseId, item.sets, item.restSec)}
                                style={{
                                  padding: '6px 12px',
                                  borderRadius: 'var(--radius-sm)',
                                  background: isDone ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.06)',
                                  color: isDone ? '#fff' : 'var(--text-muted)',
                                  fontSize: '0.8125rem',
                                  fontWeight: 700,
                                  border: isDone ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                Set {setIdx + 1} {isDone && '✓'}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Finish Workout Action */}
                <button
                  onClick={handleFinishWorkout}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '16px', fontSize: '1.05rem' }}
                >
                  <Trophy size={20} />
                  <span>Complete & Log Workout to Athlete Profile</span>
                </button>
              </>
            ) : (
              /* Celebration Completion Screen */
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto'
                }}>
                  <Trophy size={42} />
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '10px' }}>
                  WORKOUT CRUSHED! 🔥
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '450px', margin: '0 auto 24px auto' }}>
                  You just logged <strong>{activePlayerRoutine.durationMin} active minutes</strong> and burned approximately <strong>~{activePlayerRoutine.caloriesBurnEstimate} kcal</strong>!
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '32px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '14px 22px', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Streak</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{user?.streakDays} Days</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '14px 22px', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Sessions</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>{user?.totalWorkoutsCompleted}</div>
                  </div>
                </div>

                <button
                  onClick={() => setActivePlayerRoutine(null)}
                  className="btn btn-primary"
                  style={{ padding: '12px 32px' }}
                >
                  Back to Dashboard
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
