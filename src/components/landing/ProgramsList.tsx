import React, { useState } from 'react';
import { mockPrograms, mockRoutines } from '../../data/mockWorkouts';
import { WorkoutProgram, WorkoutRoutine } from '../../types';
import { Dumbbell, Calendar, Clock, Flame, Shield, ArrowRight, X, Play, CheckCircle } from 'lucide-react';
import { AuthMode } from '../auth/AuthModal';

interface ProgramsListProps {
  onOpenAuth: (mode: AuthMode) => void;
  onSelectProgramForDashboard?: (programId: string) => void;
}

export const ProgramsList: React.FC<ProgramsListProps> = ({ onOpenAuth, onSelectProgramForDashboard }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProgramModal, setActiveProgramModal] = useState<WorkoutProgram | null>(null);

  const categories = ['All', 'Fat Loss', 'Muscle Gain', 'Home Workout'];

  const filteredPrograms = selectedCategory === 'All'
    ? mockPrograms
    : mockPrograms.filter(p => p.category === selectedCategory);

  return (
    <section id="programs" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Dumbbell size={14} />
            <span>TRAINING BLUEPRINTS</span>
          </div>
          <h2 className="section-title">SIGNATURE CHANNEL WORKOUT PROGRAMS</h2>
          <p className="section-subtitle">
            Structured periodization cycles engineered for fat loss, hypertrophy, and calisthenics mastery. Choose your program and start your first session today.
          </p>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '9px 20px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: 600,
                background: selectedCategory === cat ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                border: selectedCategory === cat ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid-3" style={{ marginBottom: '60px' }}>
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="glass-card card-hover-effect"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                background: 'var(--bg-card-solid)'
              }}
            >
              {/* Thumbnail */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src={program.thumbnail}
                  alt={program.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(19, 25, 36, 0.95) 0%, transparent 60%)'
                }} />
                
                <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '8px' }}>
                  <span className="badge badge-emerald">{program.category}</span>
                  <span className="badge badge-amber">{program.difficulty}</span>
                </div>
              </div>

              {/* Content Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>
                    {program.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '18px' }}>
                    {program.tagline}
                  </p>

                  {/* Highlights */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <Calendar size={15} style={{ color: 'var(--accent-primary)' }} />
                      <span><strong>{program.weeks} Weeks</strong> Duration • {program.workoutsPerWeek} Days/Week</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <Clock size={15} style={{ color: 'var(--accent-cyan)' }} />
                      <span>35-50 Min Session Length</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <Flame size={15} style={{ color: 'var(--accent-secondary)' }} />
                      <span>{program.routines.length} Specific Routine Splits</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button
                    onClick={() => setActiveProgramModal(program)}
                    className="btn btn-outline"
                    style={{ flex: 1, padding: '10px 14px', fontSize: '0.875rem' }}
                  >
                    View Curriculum
                  </button>
                  <button
                    onClick={() => onOpenAuth('signup')}
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '10px 14px', fontSize: '0.875rem' }}
                  >
                    <span>Start Free</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Program Curriculum Detail Modal */}
      {activeProgramModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(5, 7, 10, 0.88)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveProgramModal(null);
          }}
        >
          <div
            className="glass-card animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '750px',
              background: 'var(--bg-card-solid)',
              borderRadius: 'var(--radius-xl)',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setActiveProgramModal(null)}
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

            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <span className="badge badge-emerald">{activeProgramModal.category}</span>
              <span className="badge badge-amber">{activeProgramModal.difficulty}</span>
              <span className="badge badge-cyan">{activeProgramModal.weeks} Weeks Total</span>
            </div>

            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '12px' }}>
              {activeProgramModal.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '24px' }}>
              {activeProgramModal.description}
            </p>

            {/* Highlights */}
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>Key Program Modules</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginBottom: '24px' }}>
              {activeProgramModal.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem' }}>
                  <CheckCircle size={16} style={{ color: 'var(--accent-primary)' }} />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Included Routines */}
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>Included Routine Schedule</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {activeProgramModal.routines.map((routine, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{routine.title}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      {routine.durationMin} mins • ~{routine.caloriesBurnEstimate} kcal • {routine.exercises.length} Exercises
                    </div>
                  </div>
                  <span className="badge badge-emerald">{routine.category}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setActiveProgramModal(null);
                onOpenAuth('signup');
              }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
            >
              <span>Enroll & Track in Dashboard</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
