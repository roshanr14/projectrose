import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Dumbbell, 
  BookOpen, 
  Utensils, 
  TrendingUp, 
  User, 
  LogOut, 
  Flame, 
  ChevronRight,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { OverviewTab } from './OverviewTab';
import { WorkoutsTab } from './WorkoutsTab';
import { ExercisesTab } from './ExercisesTab';
import { NutritionTab } from './NutritionTab';
import { ProgressTab } from './ProgressTab';
import { ProfileTab } from './ProfileTab';

interface DashboardLayoutProps {
  onNavigateHome: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onNavigateHome }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [targetRoutineId, setTargetRoutineId] = useState<string | null>(null);

  const navItems = [
    { id: 'overview', label: 'Activity Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'workouts', label: 'Workout Plans & Player', icon: <Dumbbell size={18} /> },
    { id: 'exercises', label: 'Exercise Vault', icon: <BookOpen size={18} /> },
    { id: 'nutrition', label: 'Macros & Meals', icon: <Utensils size={18} /> },
    { id: 'progress', label: 'Progress & PRs', icon: <TrendingUp size={18} /> },
    { id: 'profile', label: 'Athlete Profile', icon: <User size={18} /> }
  ];

  const handleStartWorkoutFromOverview = (routineId: string) => {
    setTargetRoutineId(routineId);
    setActiveTab('workouts');
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 74px)', display: 'flex', flexDirection: 'column' }}>
      <div className="container-wide dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px', padding: '32px 20px', flex: 1 }}>
        
        {/* Left Sidebar Navigation */}
        <aside
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
          className="dashboard-sidebar"
        >
          {/* Back to Channel Home */}
          <button
            onClick={onNavigateHome}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              marginBottom: '12px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} />
            <span>Channel Landing Page</span>
          </button>

          {/* Navigation Links */}
          <div style={{
            background: 'var(--bg-card-solid)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (item.id !== 'workouts') setTargetRoutineId(null);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: isActive ? 'var(--accent-primary)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.9rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Quick Info Box */}
          <div
            style={{
              marginTop: 'auto',
              background: 'var(--bg-card-solid)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt={user?.fullName}
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)' }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.fullName}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Flame size={12} />
                <span>{user?.streakDays} Day Streak</span>
              </div>
            </div>
            <button
              onClick={logout}
              style={{ color: 'var(--text-muted)', padding: '6px', cursor: 'pointer' }}
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </aside>

        {/* Main Tab Content */}
        <main style={{ minWidth: 0 }}>
          
          {/* Mobile Horizontal Scrollable Tab Bar */}
          <div
            className="mobile-dashboard-tabs"
            style={{
              display: 'none',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '12px',
              marginBottom: '20px'
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: activeTab === item.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                  color: activeTab === item.id ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: activeTab === item.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)'
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <OverviewTab
              onStartWorkout={handleStartWorkoutFromOverview}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'workouts' && (
            <WorkoutsTab initialRoutineId={targetRoutineId} />
          )}

          {activeTab === 'exercises' && (
            <ExercisesTab />
          )}

          {activeTab === 'nutrition' && (
            <NutritionTab />
          )}

          {activeTab === 'progress' && (
            <ProgressTab />
          )}

          {activeTab === 'profile' && (
            <ProfileTab />
          )}
        </main>

      </div>

      <style>{`
        @media (max-width: 960px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
            padding: 16px 14px !important;
          }
          .dashboard-sidebar {
            display: none !important;
          }
          .mobile-dashboard-tabs {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};
