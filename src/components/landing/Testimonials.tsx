import React from 'react';
import { mockTransformations } from '../../data/mockCommunity';
import { Trophy, Star, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { AuthMode } from '../auth/AuthModal';

interface TestimonialsProps {
  onOpenAuth: (mode: AuthMode) => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onOpenAuth }) => {
  return (
    <section id="community" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Trophy size={14} />
            <span>COMMUNITY PROOF</span>
          </div>
          <h2 className="section-title">REAL ATHLETES. REAL TRANSFORMATIONS.</h2>
          <p className="section-subtitle">
            Over 140,000 members have reclaimed their physical potential with ROSEFIT training routines and nutrition protocols.
          </p>
        </div>

        {/* Transformations Grid */}
        <div className="grid-3" style={{ marginBottom: '80px' }}>
          {mockTransformations.map((t) => (
            <div
              key={t.id}
              className="glass-card card-hover-effect"
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                background: 'var(--bg-card-solid)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '28px'
              }}
            >
              <div>
                {/* User Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                  <img
                    src={t.image}
                    alt={t.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--accent-primary)'
                    }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{t.name}</h4>
                      <CheckCircle size={14} style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{t.duration} Transformation</div>
                  </div>
                </div>

                {/* Stars */}
                <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '14px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#fbbf24" />
                  ))}
                </div>

                {/* Metric Badge */}
                <div style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--accent-primary)',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  marginBottom: '16px'
                }}>
                  {t.achievement} ({t.weightChange})
                </div>

                {/* Quote */}
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>
                  "{t.quote}"
                </p>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                ✓ Verified Channel Member
              </div>
            </div>
          ))}
        </div>

        {/* Final High-Energy CTA Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(19, 25, 36, 0.95) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            borderRadius: 'var(--radius-xl)',
            padding: '56px 40px',
            textAlign: 'center',
            boxShadow: '0 20px 50px -10px rgba(0,0,0,0.8), 0 0 40px rgba(16, 185, 129, 0.15)',
            maxWidth: '850px',
            margin: '0 auto'
          }}
        >
          <div className="section-tag" style={{ marginBottom: '14px' }}>
            <Sparkles size={14} />
            <span>JOIN THE CHANNEL TODAY</span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, marginBottom: '14px' }}>
            READY TO REINVENT YOUR TRAINING?
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto 28px auto', lineHeight: 1.6 }}>
            Create your athlete profile now. Access the full 30-day program, exercise biomechanics vault, and intelligent progress tracking instantly.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onOpenAuth('signup')}
              className="btn btn-primary btn-lg"
              style={{ padding: '14px 32px' }}
            >
              <span>Create Free Account</span>
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => onOpenAuth('login')}
              className="btn btn-outline btn-lg"
              style={{ padding: '14px 28px' }}
            >
              <span>Existing Member Sign In</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
