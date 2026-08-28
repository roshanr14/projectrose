import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FitnessGoal, FitnessLevel } from '../../types';
import { User, Mail, Target, Award, Scale, LogOut, Check, Sparkles, Shield } from 'lucide-react';

export const ProfileTab: React.FC = () => {
  const { user, updateProfile, logout, isDemoMode } = useAuth();
  
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [goal, setGoal] = useState<FitnessGoal>(user?.goal || 'fat_loss');
  const [level, setLevel] = useState<FitnessLevel>(user?.level || 'intermediate');
  const [currentWeight, setCurrentWeight] = useState(user?.currentWeightKg || 80);
  const [targetWeight, setTargetWeight] = useState(user?.targetWeightKg || 75);
  const [heightCm, setHeightCm] = useState(user?.heightCm || 178);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      goal,
      level,
      currentWeightKg: Number(currentWeight),
      targetWeightKg: Number(targetWeight),
      heightCm: Number(heightCm)
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Athlete Header Card */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(18, 24, 34, 0.95) 0%, rgba(12, 16, 23, 0.95) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '32px',
          border: '1px solid var(--border-medium)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
            alt={user?.fullName}
            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-primary)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{user?.fullName}</h2>
              {isDemoMode ? (
                <span className="badge badge-amber">Demo Athlete</span>
              ) : (
                <span className="badge badge-emerald">Supabase Auth Verified</span>
              )}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{user?.email}</div>
          </div>
        </div>

        <button
          onClick={logout}
          className="btn btn-outline"
          style={{ padding: '10px 20px', color: '#ff6b81', borderColor: 'rgba(255, 71, 87, 0.3)' }}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Edit Profile Form */}
      <div className="glass-card" style={{ padding: '32px', background: 'var(--bg-card-solid)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>Personal Fitness Metrics & Goals</h3>

        {savedSuccess && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            color: '#34d399',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px'
          }}>
            <Check size={18} />
            <span>Profile and training preferences updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="grid-2" style={{ marginBottom: '20px' }}>
            <div className="form-group">
              <label className="form-label">Athlete Full Name</label>
              <input
                type="text"
                className="form-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Account Email (Immutable)</label>
              <input
                type="email"
                className="form-input"
                value={user?.email}
                disabled
                style={{ opacity: 0.6 }}
              />
            </div>
          </div>

          <div className="grid-3" style={{ marginBottom: '20px' }}>
            <div className="form-group">
              <label className="form-label">Current Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                className="form-input"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(Number(e.target.value))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Goal Target Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                className="form-input"
                value={targetWeight}
                onChange={(e) => setTargetWeight(Number(e.target.value))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Height (cm)</label>
              <input
                type="number"
                className="form-input"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="grid-2" style={{ marginBottom: '28px' }}>
            <div className="form-group">
              <label className="form-label">Primary Fitness Goal</label>
              <select
                className="form-input"
                value={goal}
                onChange={(e) => setGoal(e.target.value as FitnessGoal)}
                style={{ background: 'var(--bg-input)' }}
              >
                <option value="fat_loss">Fat Loss & Conditioning</option>
                <option value="muscle_building">Muscle Hypertrophy</option>
                <option value="endurance">Athletic Endurance</option>
                <option value="mobility_flexibility">Mobility & Longevity</option>
                <option value="general_health">General Functional Health</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Experience Level</label>
              <select
                className="form-input"
                value={level}
                onChange={(e) => setLevel(e.target.value as FitnessLevel)}
                style={{ background: 'var(--bg-input)' }}
              >
                <option value="beginner">Beginner (0-1 Years)</option>
                <option value="intermediate">Intermediate (1-3 Years)</option>
                <option value="advanced">Advanced (3-5+ Years)</option>
                <option value="athlete">Competitive Athlete</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px' }}>
            <span>Save Athlete Settings</span>
          </button>
        </form>
      </div>

    </div>
  );
};
