import React from 'react';
import { Dumbbell, ShieldCheck, HeartPulse, Apple, Trophy, Sparkles } from 'lucide-react';
import { mockCoaches } from '../../data/mockCommunity';

export const ChannelIntro: React.FC = () => {
  const pillars = [
    {
      icon: <Dumbbell size={24} style={{ color: 'var(--accent-primary)' }} />,
      title: 'Biomechanical Precision',
      description: 'Zero guesswork. Every exercise is broken down with joint safety cues, bar paths, and optimal muscle recruitment.'
    },
    {
      icon: <Apple size={24} style={{ color: '#f59e0b' }} />,
      title: 'Sustainable Nutrition',
      description: 'No fad detoxes or extreme deficits. Science-backed macro formulas that support training volume while shedding body fat.'
    },
    {
      icon: <HeartPulse size={24} style={{ color: '#06b6d4' }} />,
      title: 'Joint Longevity & Recovery',
      description: 'Bulletproof your shoulders, knees, and lumbar spine with dedicated active recovery routines and mobility flows.'
    },
    {
      icon: <Trophy size={24} style={{ color: 'var(--accent-secondary)' }} />,
      title: 'Progressive Overload Tracking',
      description: 'Built-in tracking algorithms monitor your training volume, streak records, and personal records automatically.'
    }
  ];

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>CHANNEL PHILOSOPHY</span>
          </div>
          <h2 className="section-title">BUILT BY ATHLETES. BACKED BY SCIENCE.</h2>
          <p className="section-subtitle">
            Most fitness advice online is overcomplicated or designed for algorithms. ROSEFIT delivers honest, high-caliber coaching designed for real life.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid-4" style={{ marginBottom: '80px' }}>
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="glass-card card-hover-effect"
              style={{
                padding: '30px 24px',
                background: 'var(--bg-card-solid)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {pillar.icon}
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{pillar.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Coaches Showcase */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(19, 25, 36, 0.9) 0%, rgba(13, 17, 24, 0.9) 100%)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '48px 40px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px' }}>Meet Your Channel Head Coaches</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
              Elite strength professionals dedicated to guiding your daily training sessions.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {mockCoaches.map((coach, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '20px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  alignItems: 'center'
                }}
              >
                <img
                  src={coach.avatar}
                  alt={coach.name}
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '18px',
                    objectFit: 'cover',
                    border: '2px solid rgba(16, 185, 129, 0.3)'
                  }}
                />
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '4px' }}>{coach.name}</h4>
                  <div style={{ color: 'var(--accent-primary)', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>
                    {coach.role}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', fontStyle: 'italic' }}>
                    {coach.credentials}
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {coach.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
