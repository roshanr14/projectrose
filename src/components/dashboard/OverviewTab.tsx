import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockPrograms, mockRoutines } from '../../data/mockWorkouts';
import { 
  Flame, 
  Droplets, 
  Footprints, 
  Timer, 
  Play, 
  CheckCircle2, 
  Plus, 
  Sparkles, 
  ArrowRight, 
  TrendingUp,
  Dumbbell
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OverviewTabProps {
  onStartWorkout: (routineId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onStartWorkout, onNavigateTab }) => {
  const { user, dailyActivity, logWater } = useAuth();
  const [waterLoggedSuccess, setWaterLoggedSuccess] = useState(false);

  const activeRoutine = mockRoutines[0]; // Full-Body Athletic Power Blitz

  const handleAddWater = (amount: number) => {
    logWater(amount);
    setWaterLoggedSuccess(true);
    setTimeout(() => setWaterLoggedSuccess(false), 1500);
  };

  const handleCelebrate = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const caloriePercentage = Math.min(100, Math.round((dailyActivity.caloriesBurned / 600) * 100));
  const waterPercentage = Math.min(100, Math.round((dailyActivity.waterMl / (user?.dailyWaterTargetMl || 3000)) * 100));
  const activeMinPercentage = Math.min(100, Math.round((dailyActivity.minutesActive / 45) * 100));

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Motivational Athlete Welcome Banner */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(19, 25, 36, 0.95) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 'var(--radius-xl)',
          padding: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-emerald">ATHLETE ACTIVE</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '6px' }}>
            Let's get to work, {user?.fullName.split(' ')[0]}! 💪
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', maxWidth: '500px' }}>
            "Discipline is choosing between what you want now and what you want most." You're on a <strong>{user?.streakDays}-day streak</strong>.
          </p>
        </div>

        {/* Streak Flame Card */}
        <div
          onClick={handleCelebrate}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 71, 87, 0.35)',
            padding: '16px 24px',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(255, 71, 87, 0.15)'
          }}
          title="Click to celebrate streak!"
        >
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'rgba(255, 71, 87, 0.2)',
            color: 'var(--accent-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Flame size={26} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Current Streak</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {user?.streakDays} Days 🔥
            </div>
          </div>
        </div>
      </div>

      {/* Daily Activity Rings / Stat Cards */}
      <div className="grid-4">
        
        {/* Calories Burned */}
        <div className="glass-card" style={{ padding: '22px', background: 'var(--bg-card-solid)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(255, 71, 87, 0.12)',
              color: 'var(--accent-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Flame size={20} />
            </div>
            <span className="badge badge-coral">{caloriePercentage}% Target</span>
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Calories Burned</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0 10px 0' }}>
            {dailyActivity.caloriesBurned} <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>/ 600 kcal</span>
          </div>
          {/* Progress Bar */}
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${caloriePercentage}%`, height: '100%', background: 'var(--accent-secondary)', transition: 'width 0.4s ease' }} />
          </div>
        </div>

        {/* Workout Minutes */}
        <div className="glass-card" style={{ padding: '22px', background: 'var(--bg-card-solid)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.12)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Timer size={20} />
            </div>
            <span className="badge badge-emerald">{activeMinPercentage}% Target</span>
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Active Training</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0 10px 0' }}>
            {dailyActivity.minutesActive} <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>/ 45 mins</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${activeMinPercentage}%`, height: '100%', background: 'var(--accent-primary)', transition: 'width 0.4s ease' }} />
          </div>
        </div>

        {/* Daily Hydration */}
        <div className="glass-card" style={{ padding: '22px', background: 'var(--bg-card-solid)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(6, 182, 212, 0.12)',
              color: '#22d3ee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Droplets size={20} />
            </div>
            <span className="badge badge-cyan">{waterPercentage}%</span>
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Hydration Intake</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0 10px 0' }}>
            {(dailyActivity.waterMl / 1000).toFixed(2)} <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>/ 3.0 L</span>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => handleAddWater(250)}
              style={{
                flex: 1,
                padding: '4px 8px',
                background: 'rgba(6, 182, 212, 0.15)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: 'var(--radius-sm)',
                color: '#22d3ee',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              +250ml
            </button>
            <button
              onClick={() => handleAddWater(500)}
              style={{
                flex: 1,
                padding: '4px 8px',
                background: 'rgba(6, 182, 212, 0.15)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: 'var(--radius-sm)',
                color: '#22d3ee',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              +500ml
            </button>
          </div>
        </div>

        {/* Daily Steps */}
        <div className="glass-card" style={{ padding: '22px', background: 'var(--bg-card-solid)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(245, 158, 11, 0.12)',
              color: '#fbbf24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Footprints size={20} />
            </div>
            <span className="badge badge-amber">84%</span>
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Daily Steps</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0 10px 0' }}>
            {dailyActivity.steps.toLocaleString()} <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>/ 10,000</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: '84%', height: '100%', background: '#fbbf24' }} />
          </div>
        </div>

      </div>

      {/* Scheduled Workout For Today Banner */}
      <div
        className="glass-card"
        style={{
          background: 'var(--bg-card-solid)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '28px',
          alignItems: 'center'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span className="badge badge-emerald">TODAY'S SCHEDULED WORKOUT</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Session 1 of 4 This Week</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>
            {activeRoutine.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '20px' }}>
            {activeRoutine.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', marginBottom: '24px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            <div>⏱ <strong>{activeRoutine.durationMin} Mins</strong> Duration</div>
            <div>🔥 <strong>~{activeRoutine.caloriesBurnEstimate} kcal</strong> Estimated Burn</div>
            <div>🏋️ <strong>{activeRoutine.exercises.length} Movements</strong> Included</div>
          </div>

          <button
            onClick={() => onStartWorkout(activeRoutine.id)}
            className="btn btn-primary"
            style={{ padding: '12px 28px', fontSize: '0.9375rem' }}
          >
            <Play size={16} fill="#fff" />
            <span>Launch Live Workout Player</span>
          </button>
        </div>

        {/* Preview Routine Exercise List */}
        <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '18px' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Exercise Progression</span>
            <span style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }}>{activeRoutine.exercises.length} Exercises</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeRoutine.exercises.slice(0, 4).map((ex, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8125rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{i + 1}.</span>
                  <span style={{ fontWeight: 600 }}>{ex.exerciseName}</span>
                </div>
                <span style={{ color: 'var(--text-muted)' }}>{ex.sets} × {ex.reps}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Dashboard Shortcuts */}
      <div className="grid-3">
        <div
          onClick={() => onNavigateTab('workouts')}
          className="glass-card card-hover-effect"
          style={{ padding: '20px', cursor: 'pointer', background: 'var(--bg-card-solid)', display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Dumbbell size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Active Program Roadmaps</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>View 4-week training calendar</div>
          </div>
          <ArrowRight size={16} style={{ color: 'var(--text-muted)' }} />
        </div>

        <div
          onClick={() => onNavigateTab('nutrition')}
          className="glass-card card-hover-effect"
          style={{ padding: '20px', cursor: 'pointer', background: 'var(--bg-card-solid)', display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255, 71, 87, 0.12)', color: 'var(--accent-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flame size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Daily Macro Tracker</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Log meals & track protein</div>
          </div>
          <ArrowRight size={16} style={{ color: 'var(--text-muted)' }} />
        </div>

        <div
          onClick={() => onNavigateTab('progress')}
          className="glass-card card-hover-effect"
          style={{ padding: '20px', cursor: 'pointer', background: 'var(--bg-card-solid)', display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.12)', color: '#22d3ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Weight & PR Milestones</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Track lifting volume & scale weight</div>
          </div>
          <ArrowRight size={16} style={{ color: 'var(--text-muted)' }} />
        </div>
      </div>

    </div>
  );
};
