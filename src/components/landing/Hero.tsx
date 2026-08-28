import React, { useState } from 'react';
import { Play, Sparkles, Flame, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { mockChannelStats } from '../../data/mockCommunity';
import { AuthMode } from '../auth/AuthModal';

interface HeroProps {
  onOpenAuth: (mode: AuthMode) => void;
  onExplorePrograms: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth, onExplorePrograms }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '60px',
        paddingBottom: '100px',
        overflow: 'hidden'
      }}
    >
      {/* Background Ambience Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(255, 71, 87, 0.05) 50%, transparent 80%)',
          filter: 'blur(70px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '48px', alignItems: 'center' }} className="hero-grid">
          
          {/* Left Column: Headlines & CTA */}
          <div>
            {/* Pill Tag */}
            <div className="section-tag" style={{ marginBottom: '20px' }}>
              <Flame size={15} style={{ color: 'var(--accent-primary)' }} />
              <span>THE OFFICIAL ROSEFIT CHANNEL PLATFORM</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 4.8vw, 4.1rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: '22px'
              }}
            >
              TRAIN WITH PURPOSE.{' '}
              <span style={{
                background: 'linear-gradient(135deg, #10b981 20%, #34d399 60%, #38bdf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                DOMINATE YOUR POTENTIAL.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '32px',
                maxWidth: '560px'
              }}
            >
              The premier fitness channel engineered for real humans. Science-backed workout routines, biomechanical movement guides, custom nutrition targets, and intuitive progress tracking.
            </p>

            {/* CTA Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '40px' }}>
              <button
                onClick={() => onOpenAuth('signup')}
                className="btn btn-primary btn-lg"
                style={{
                  fontSize: '1rem',
                  padding: '14px 28px',
                  boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)'
                }}
              >
                <Sparkles size={18} />
                <span>Start Training Free</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="btn btn-outline btn-lg"
                style={{
                  fontSize: '1rem',
                  padding: '14px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(255, 71, 87, 0.2)',
                  color: '#ff4757',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Play size={14} fill="#ff4757" />
                </div>
                <span>Watch Channel Intro</span>
              </button>
            </div>

            {/* Feature Checkmarks */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)' }} />
                <span>Zero Subscription Lock-In</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)' }} />
                <span>Beginner to Advanced Splits</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)' }} />
                <span>Interactive Workout Tracker</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Video Card Showcase */}
          <div style={{ position: 'relative' }}>
            <div
              className="glass-card"
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 20px 50px -10px rgba(0,0,0,0.8), 0 0 40px rgba(16, 185, 129, 0.15)'
              }}
            >
              {/* Card Image */}
              <div style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80"
                  alt="ROSEFIT Athlete in action"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'scale(1.02)',
                    transition: 'transform 0.4s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(9, 12, 16, 0.95) 0%, rgba(9, 12, 16, 0.3) 60%, transparent 100%)'
                }} />

                {/* Floating Play Button */}
                <button
                  onClick={() => setVideoModalOpen(true)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.9)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 35px rgba(16, 185, 129, 0.7)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                  }}
                  aria-label="Play trailer"
                >
                  <Play size={28} fill="#fff" style={{ marginLeft: '4px' }} />
                </button>

                {/* Floating Live Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    background: 'rgba(255, 71, 87, 0.9)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '0.04em'
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
                  <span>CHANNEL SPOTLIGHT</span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div style={{ padding: '24px', background: 'var(--bg-card-solid)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span className="badge badge-emerald">FLAGSHIP ROUTINE</span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>45 Min Intensity</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                  Full-Body Athletic Power Blitz
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                  Experience why over 140,000 athletes rely on this daily routine for maximal strength and fat burn.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                      alt="Coach Marcus"
                      style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Coach Marcus Vance</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CSCS Lead Trainer</div>
                    </div>
                  </div>

                  <button
                    onClick={onExplorePrograms}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '6px 14px' }}
                  >
                    View Split
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Metric Pill */}
            <div
              style={{
                position: 'absolute',
                bottom: '-24px',
                left: '-20px',
                background: 'rgba(18, 24, 34, 0.95)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                backdropFilter: 'blur(12px)',
                borderRadius: 'var(--radius-lg)',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                zIndex: 2
              }}
              className="floating-pill"
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Flame size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>Global Channel Burn</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>1.2M+ Workouts</div>
              </div>
            </div>

          </div>

        </div>

        {/* Global Statistics Bar */}
        <div
          className="glass-card"
          style={{
            marginTop: '70px',
            padding: '28px 36px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '24px',
            textAlign: 'center',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              {mockChannelStats.activeMembers}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '4px' }}>Active Daily Athletes</div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>
              {mockChannelStats.workoutsCompleted}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '4px' }}>Routines Logged</div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              {mockChannelStats.averageRating}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '4px' }}>User Satisfaction (40k+ Reviews)</div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-secondary)', fontFamily: 'var(--font-heading)' }}>
              {mockChannelStats.communityCount}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '4px' }}>Channel Community</div>
          </div>
        </div>

      </div>

      {/* Video Modal Player */}
      {videoModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(5, 7, 10, 0.92)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setVideoModalOpen(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '900px',
              background: '#000',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.9)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setVideoModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                color: '#fff',
                background: 'rgba(0,0,0,0.6)',
                padding: '8px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                src="https://www.youtube.com/embed/cbKkB3POqaY?autoplay=1"
                title="ROSEFIT Channel Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .floating-pill {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
