import React, { useState } from 'react';
import { mockVideoShowcases } from '../../data/mockCommunity';
import { Play, Eye, Calendar, X, Sparkles, Tv, Video } from 'lucide-react';
import { AuthMode } from '../auth/AuthModal';

interface VideoShowcaseProps {
  onOpenAuth: (mode: AuthMode) => void;
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({ onOpenAuth }) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section id="videos" className="section-padding" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag tag-coral">
            <Tv size={14} />
            <span>CHANNEL EPISODES</span>
          </div>
          <h2 className="section-title">FOLLOW-ALONG CHANNEL WORKOUTS</h2>
          <p className="section-subtitle">
            Stream high-production follow-along training sessions with real-time timers, form cues, and heart rate pacing.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid-3" style={{ marginBottom: '50px' }}>
          {mockVideoShowcases.map((vid) => (
            <div
              key={vid.id}
              className="glass-card card-hover-effect"
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                background: 'var(--bg-card-solid)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Thumbnail with Play Overlay */}
              <div
                onClick={() => setActiveVideo(vid.videoUrl)}
                style={{
                  position: 'relative',
                  height: '210px',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(19, 25, 36, 0.8) 0%, transparent 60%)'
                }} />

                {/* Play Button */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'rgba(255, 71, 87, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  boxShadow: '0 0 25px rgba(255, 71, 87, 0.6)'
                }}>
                  <Play size={22} fill="#fff" style={{ marginLeft: '3px' }} />
                </div>

                {/* Duration Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(0,0,0,0.85)',
                  color: '#fff',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  {vid.duration}
                </div>
              </div>

              {/* Video Info */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Eye size={14} />
                      <span>{vid.views}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} />
                      <span>{vid.date}</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '14px' }}>
                    {vid.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveVideo(vid.videoUrl)}
                  className="btn btn-outline"
                  style={{ width: '100%', padding: '9px', fontSize: '0.875rem' }}
                >
                  <Play size={14} />
                  <span>Play Episode</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 71, 87, 0.15) 0%, rgba(19, 25, 36, 0.9) 100%)',
          border: '1px solid rgba(255, 71, 87, 0.3)',
          borderRadius: 'var(--radius-xl)',
          padding: '32px 40px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px' }}>
              Subscribe to the ROSEFIT YouTube Channel
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
              New follow-along workouts and science breakdowns drop every Tuesday & Thursday.
            </p>
          </div>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="btn btn-coral"
            style={{ padding: '12px 24px', fontSize: '0.9375rem' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>Subscribe (280K Athletes)</span>
          </a>
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideo && (
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
            if (e.target === e.currentTarget) setActiveVideo(null);
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
              onClick={() => setActiveVideo(null)}
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
                src={`${activeVideo}?autoplay=1`}
                title="ROSEFIT Video Episode"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
