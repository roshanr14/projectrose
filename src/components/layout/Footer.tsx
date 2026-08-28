import React from 'react';
import { Dumbbell, MessageSquare, Music2, ArrowUpRight, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', paddingTop: '72px', paddingBottom: '40px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '48px', marginBottom: '60px' }}>
          
          {/* Brand Col */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <Dumbbell size={20} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                ROSE<span style={{ color: 'var(--accent-primary)' }}>FIT</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
              A dedicated digital fitness channel providing evidence-based training programs, biomechanical exercise guides, and performance nutrition.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ff4757',
                  border: '1px solid var(--border-subtle)'
                }}
                aria-label="YouTube Channel"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#e1306c',
                  border: '1px solid var(--border-subtle)'
                }}
                aria-label="Instagram Page"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#5865F2',
                  border: '1px solid var(--border-subtle)'
                }}
                aria-label="Discord Community"
              >
                <MessageSquare size={18} />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1DB954',
                  border: '1px solid var(--border-subtle)'
                }}
                aria-label="Workout Spotify Playlist"
              >
                <Music2 size={18} />
              </a>
            </div>
          </div>

          {/* Programs Col */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '18px', color: 'var(--text-primary)' }}>
              Workout Programs
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <a href="#programs" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  PULSE 30 Rapid Shred
                </a>
              </li>
              <li>
                <a href="#programs" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Apex Hypertrophy Lab
                </a>
              </li>
              <li>
                <a href="#programs" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Zero Boundaries Calisthenics
                </a>
              </li>
              <li>
                <a href="#programs" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Joint Longevity & Mobility Flow
                </a>
              </li>
            </ul>
          </div>

          {/* Channel Content Col */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '18px', color: 'var(--text-primary)' }}>
              Channel Resources
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <a href="#exercises" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Exercise Biomechanics Vault
                </a>
              </li>
              <li>
                <a href="#nutrition" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Macro & Calorie Target Guide
                </a>
              </li>
              <li>
                <a href="#videos" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Follow-Along Workout Videos
                </a>
              </li>
              <li>
                <a href="#community" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Athlete Transformations
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Channel Updates */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '18px', color: 'var(--text-primary)' }}>
              Weekly Channel Intel
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.5 }}>
              Get our weekly workout drops, high-protein recipe cards, and science breakdowns.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to ROSEFIT channel weekly drops!'); }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  placeholder="athlete@email.com"
                  required
                  className="form-input"
                  style={{ padding: '10px 14px', fontSize: '0.875rem' }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '10px 16px', fontSize: '0.875rem' }}>
                  Join
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '32px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.8125rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} ROSEFIT Channel. Built for modern athletes.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
