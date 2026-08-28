import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TrendingUp, Trophy, Calendar, Flame, Scale, Plus, Check } from 'lucide-react';

export const ProgressTab: React.FC = () => {
  const { user } = useAuth();
  const [newPrWeight, setNewPrWeight] = useState('');
  const [selectedLift, setSelectedLift] = useState('High-Bar Back Squat');
  const [prs, setPrs] = useState([
    { lift: 'High-Bar Back Squat', weight: '140 kg (308 lbs)', date: 'Aug 20, 2026' },
    { lift: 'Incline Dumbbell Press', weight: '36 kg (80 lbs) each', date: 'Aug 14, 2026' },
    { lift: 'Pull-Ups', weight: 'BW + 20 kg (44 lbs)', date: 'Aug 22, 2026' },
    { lift: 'Romanian Deadlift', weight: '120 kg (264 lbs)', date: 'Aug 10, 2026' }
  ]);

  // Weight Trend Data (Last 6 weeks)
  const weightData = [
    { week: 'Week 1', weight: 81.2 },
    { week: 'Week 2', weight: 80.5 },
    { week: 'Week 3', weight: 79.8 },
    { week: 'Week 4', weight: 79.2 },
    { week: 'Week 5', weight: 78.6 },
    { week: 'Current', weight: user?.currentWeightKg || 78.0 }
  ];

  // Weekly Training Volume (Minutes)
  const weeklyMinutes = [
    { day: 'Mon', mins: 45, target: 45 },
    { day: 'Tue', mins: 50, target: 45 },
    { day: 'Wed', mins: 30, target: 30 },
    { day: 'Thu', mins: 45, target: 45 },
    { day: 'Fri', mins: 0, target: 45 },
    { day: 'Sat', mins: 60, target: 45 },
    { day: 'Sun', mins: 25, target: 30 }
  ];

  const handleAddPr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrWeight) return;
    setPrs(prev => [
      { lift: selectedLift, weight: newPrWeight, date: 'Today' },
      ...prev.filter(p => p.lift !== selectedLift)
    ]);
    setNewPrWeight('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Athlete Progression & PR Analytics</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Visualize body composition changes, weekly training density, and personal record milestones.
        </p>
      </div>

      {/* Trajectory & Volume Charts */}
      <div className="grid-2">
        
        {/* Weight Trajectory Chart */}
        <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-card-solid)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={18} style={{ color: 'var(--accent-primary)' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Weight Trend Progression</h3>
            </div>
            <span className="badge badge-emerald">Target: {user?.targetWeightKg} kg</span>
          </div>

          {/* Visual SVG Chart */}
          <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '16px', padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            {weightData.map((pt, i) => {
              const maxH = 140;
              // Scale between 75kg and 82kg
              const ratio = (pt.weight - 74) / 8;
              const barH = Math.max(20, Math.round(ratio * maxH));

              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: i === weightData.length - 1 ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>
                    {pt.weight}kg
                  </span>
                  <div style={{
                    width: '100%',
                    height: `${barH}px`,
                    background: i === weightData.length - 1 ? 'linear-gradient(to top, #10b981, #34d399)' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.4s ease'
                  }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pt.week}</span>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '16px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            Total delta: <strong>-3.2 kg</strong> since starting ROSE 30 protocol.
          </div>
        </div>

        {/* Weekly Workout Volume Bar Chart */}
        <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-card-solid)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} style={{ color: 'var(--accent-secondary)' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Weekly Training Volume (Mins)</h3>
            </div>
            <span className="badge badge-coral">255 Mins This Week</span>
          </div>

          <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '12px', padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            {weeklyMinutes.map((w, i) => {
              const maxH = 140;
              const barH = Math.max(6, Math.round((w.mins / 60) * maxH));

              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.7rem', color: w.mins > 0 ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                    {w.mins > 0 ? `${w.mins}m` : '-'}
                  </span>
                  <div style={{
                    width: '100%',
                    height: `${barH}px`,
                    background: w.mins > 0 ? 'linear-gradient(to top, #ff4757, #ff6b81)' : 'rgba(255, 255, 255, 0.04)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.3s ease'
                  }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{w.day}</span>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '16px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            Status: On track for <strong>4 weekly workouts</strong>.
          </div>
        </div>

      </div>

      {/* Personal Records (PR) Vault */}
      <div className="glass-card" style={{ padding: '28px', background: 'var(--bg-card-solid)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trophy size={18} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Personal Records (PR) Vault</h3>
          </div>
        </div>

        {/* PR List */}
        <div className="grid-2" style={{ marginBottom: '24px' }}>
          {prs.map((pr, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>{pr.lift}</h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Set on {pr.date}</div>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                {pr.weight}
              </div>
            </div>
          ))}
        </div>

        {/* Log New PR Form */}
        <form onSubmit={handleAddPr} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <select
              className="form-input"
              value={selectedLift}
              onChange={(e) => setSelectedLift(e.target.value)}
              style={{ background: 'var(--bg-input)' }}
            >
              <option value="High-Bar Back Squat">High-Bar Back Squat</option>
              <option value="Incline Dumbbell Press">Incline Dumbbell Press</option>
              <option value="Pull-Ups">Pull-Ups</option>
              <option value="Romanian Deadlift">Romanian Deadlift</option>
              <option value="Overhead Press">Overhead Press</option>
            </select>
          </div>

          <div style={{ flex: 1, minWidth: '180px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. 150 kg (330 lbs)"
              value={newPrWeight}
              onChange={(e) => setNewPrWeight(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px' }}>
            <Plus size={16} />
            <span>Update PR</span>
          </button>
        </form>
      </div>

    </div>
  );
};
