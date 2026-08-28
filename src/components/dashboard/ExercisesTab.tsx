import React, { useState } from 'react';
import { mockExercises } from '../../data/mockExercises';
import { Exercise } from '../../types';
import { Search, Filter, Play, Check, ChevronRight, X, Sparkles, BookOpen } from 'lucide-react';

export const ExercisesTab: React.FC = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalExercise, setActiveModalExercise] = useState<Exercise | null>(null);

  const muscleGroups = ['All', 'Chest', 'Quadriceps', 'Back', 'Hamstrings', 'Core', 'Shoulders', 'Full Body', 'Mobility'];

  const filtered = mockExercises.filter(ex => {
    const matchesMuscle = selectedMuscle === 'All' || ex.targetMuscle === selectedMuscle;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ex.targetMuscle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ex.equipment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMuscle && matchesSearch;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Biomechanical Exercise Directory</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Search over 150+ movement tutorials with cues, bar paths, and optimal muscle recruitment.
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '40px', fontSize: '0.875rem' }}
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Muscle Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
        {muscleGroups.map((muscle) => (
          <button
            key={muscle}
            onClick={() => setSelectedMuscle(muscle)}
            style={{
              padding: '7px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              background: selectedMuscle === muscle ? 'var(--accent-primary)' : 'rgba(255,255,255,0.03)',
              color: selectedMuscle === muscle ? '#fff' : 'var(--text-secondary)',
              border: selectedMuscle === muscle ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {muscle}
          </button>
        ))}
      </div>

      {/* Exercise Cards */}
      <div className="grid-3">
        {filtered.map((exercise) => (
          <div
            key={exercise.id}
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
            <div>
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <img
                  src={exercise.videoThumbnail}
                  alt={exercise.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(19, 25, 36, 0.9) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                  <span className="badge badge-emerald">{exercise.targetMuscle}</span>
                </div>
                <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                  <span className="badge badge-cyan">{exercise.equipment}</span>
                </div>
              </div>

              <div style={{ padding: '18px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>{exercise.name}</h4>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  Target Volume: {exercise.defaultSets} sets × {exercise.defaultReps}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {exercise.instructions[0]}
                </div>
              </div>
            </div>

            <div style={{ padding: '0 18px 18px 18px' }}>
              <button
                onClick={() => setActiveModalExercise(exercise)}
                className="btn btn-outline"
                style={{ width: '100%', padding: '8px 14px', fontSize: '0.8125rem' }}
              >
                <span>View Full Execution Guide</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeModalExercise && (
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
            if (e.target === e.currentTarget) setActiveModalExercise(null);
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
              onClick={() => setActiveModalExercise(null)}
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
              <span className="badge badge-emerald">{activeModalExercise.targetMuscle}</span>
              <span className="badge badge-cyan">{activeModalExercise.equipment}</span>
              <span className="badge badge-amber">{activeModalExercise.difficulty}</span>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>
              {activeModalExercise.name}
            </h2>

            {activeModalExercise.videoUrl && (
              <div style={{ position: 'relative', paddingBottom: '52%', height: 0, borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '20px' }}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  src={activeModalExercise.videoUrl}
                  title={activeModalExercise.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>Form Execution Instructions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {activeModalExercise.instructions.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{idx + 1}.</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{step}</span>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>Coach Form Cues</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {activeModalExercise.formTips.map((tip, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#fbbf24' }}>
                  <Check size={16} />
                  <span>{tip}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveModalExercise(null)}
              className="btn btn-outline"
              style={{ width: '100%', padding: '12px' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
