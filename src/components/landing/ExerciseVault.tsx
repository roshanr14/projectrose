import React, { useState } from 'react';
import { mockExercises } from '../../data/mockExercises';
import { Exercise } from '../../types';
import { BookOpen, Search, Play, Check, AlertCircle, X, ChevronRight } from 'lucide-react';
import { AuthMode } from '../auth/AuthModal';

interface ExerciseVaultProps {
  onOpenAuth: (mode: AuthMode) => void;
}

export const ExerciseVault: React.FC<ExerciseVaultProps> = ({ onOpenAuth }) => {
  const [selectedMuscle, setSelectedMuscle] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeExerciseModal, setActiveExerciseModal] = useState<Exercise | null>(null);

  const muscleGroups = ['All', 'Chest', 'Quadriceps', 'Back', 'Hamstrings', 'Core', 'Shoulders', 'Full Body', 'Mobility'];

  const filteredExercises = mockExercises.filter(ex => {
    const matchesMuscle = selectedMuscle === 'All' || ex.targetMuscle === selectedMuscle;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ex.targetMuscle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMuscle && matchesSearch;
  });

  return (
    <section id="exercises" className="section-padding" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <BookOpen size={14} />
            <span>MOVEMENT BIOMECHANICS</span>
          </div>
          <h2 className="section-title">THE ROSEFIT EXERCISE VAULT</h2>
          <p className="section-subtitle">
            Master every movement pattern with step-by-step cues, common mistake corrections, and professional video execution guides.
          </p>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
          
          {/* Search Input */}
          <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '46px', borderRadius: 'var(--radius-full)' }}
              placeholder="Search exercise by name or muscle (e.g. Squat, Chest, Back)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Muscle Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {muscleGroups.map((muscle) => (
              <button
                key={muscle}
                onClick={() => setSelectedMuscle(muscle)}
                style={{
                  padding: '7px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  background: selectedMuscle === muscle ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedMuscle === muscle ? '#fff' : 'var(--text-secondary)',
                  border: selectedMuscle === muscle ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {muscle}
              </button>
            ))}
          </div>

        </div>

        {/* Exercises Cards Grid */}
        <div className="grid-4" style={{ marginBottom: '48px' }}>
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="glass-card card-hover-effect"
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                background: 'var(--bg-card-solid)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Image */}
                <div style={{ position: 'relative', height: '170px', overflow: 'hidden' }}>
                  <img
                    src={exercise.videoThumbnail}
                    alt={exercise.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(19, 25, 36, 0.95) 0%, transparent 60%)'
                  }} />
                  <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    <span className="badge badge-emerald">{exercise.targetMuscle}</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                    <span className="badge badge-cyan">{exercise.equipment}</span>
                  </div>
                </div>

                {/* Details */}
                <div style={{ padding: '18px 18px 10px 18px' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', lineHeight: 1.3 }}>
                    {exercise.name}
                  </h4>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    Standard: {exercise.defaultSets} Sets × {exercise.defaultReps}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ padding: '0 18px 18px 18px' }}>
                <button
                  onClick={() => setActiveExerciseModal(exercise)}
                  className="btn btn-outline"
                  style={{ width: '100%', padding: '8px 12px', fontSize: '0.8125rem' }}
                >
                  <span>Form Cues & Video</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Want customized set/rep volume tracking & 100+ additional movements?
          </p>
          <button
            onClick={() => onOpenAuth('signup')}
            className="btn btn-primary"
            style={{ padding: '10px 24px' }}
          >
            Unlock Full Exercise Library (Free)
          </button>
        </div>

      </div>

      {/* Exercise Detail Modal */}
      {activeExerciseModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(5, 7, 10, 0.9)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveExerciseModal(null);
          }}
        >
          <div
            className="glass-card animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '700px',
              background: 'var(--bg-card-solid)',
              borderRadius: 'var(--radius-xl)',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setActiveExerciseModal(null)}
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
              <span className="badge badge-emerald">{activeExerciseModal.targetMuscle}</span>
              <span className="badge badge-cyan">{activeExerciseModal.equipment}</span>
              <span className="badge badge-amber">{activeExerciseModal.difficulty}</span>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>
              {activeExerciseModal.name}
            </h2>

            {/* Video preview iframe */}
            {activeExerciseModal.videoUrl && (
              <div style={{ position: 'relative', paddingBottom: '52%', height: 0, borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '20px' }}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  src={activeExerciseModal.videoUrl}
                  title={activeExerciseModal.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Execution Instructions */}
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>Step-by-Step Biomechanics</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {activeExerciseModal.instructions.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{idx + 1}.</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{step}</span>
                </div>
              ))}
            </div>

            {/* Form Cues */}
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>Critical Coaching Cues</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {activeExerciseModal.formTips.map((tip, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#fbbf24' }}>
                  <Check size={16} />
                  <span>{tip}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveExerciseModal(null)}
              className="btn btn-outline"
              style={{ width: '100%', padding: '12px' }}
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
