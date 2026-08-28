import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, FitnessGoal, DailyActivityLog } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoMode: boolean;
  dailyActivity: DailyActivityLog;
  activeProgramId: string;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (fullName: string, email: string, password: string, goal: FitnessGoal) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  loginDemoUser: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => void;
  logWater: (amountMl: number) => void;
  logWorkoutComplete: (routineId: string, durationMin: number, caloriesBurned: number) => void;
  setActiveProgramId: (progId: string) => void;
}

const defaultDemoUser: UserProfile = {
  id: 'demo-user-1',
  email: 'athlete@pulsefit.club',
  fullName: 'Jordan Steele',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  goal: 'fat_loss',
  level: 'intermediate',
  targetWeightKg: 74,
  currentWeightKg: 81,
  heightCm: 178,
  dailyCalorieTarget: 2250,
  dailyWaterTargetMl: 3000,
  streakDays: 7,
  totalWorkoutsCompleted: 24,
  totalMinutesTrained: 960,
  createdAt: '2026-01-15T10:00:00Z'
};

const getTodayDateStr = () => new Date().toISOString().split('T')[0];

const defaultDailyActivity: DailyActivityLog = {
  date: getTodayDateStr(),
  caloriesBurned: 520,
  minutesActive: 45,
  waterMl: 2250,
  steps: 8430,
  workoutsLogged: ['rt-1'],
  caloriesConsumed: 1850,
  proteinConsumedG: 145
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('pulsefit_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(!isSupabaseConfigured);
  const [activeProgramId, setActiveProgramId] = useState<string>('prog-1');
  
  const [dailyActivity, setDailyActivity] = useState<DailyActivityLog>(() => {
    const saved = localStorage.getItem('pulsefit_daily_activity');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === getTodayDateStr()) return parsed;
    }
    return defaultDailyActivity;
  });

  useEffect(() => {
    if (isSupabaseConfigured) {
      // Listen to Supabase Auth state changes
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          setIsDemoMode(false);
          const meta = session.user.user_metadata || {};
          const profile: UserProfile = {
            id: session.user.id,
            email: session.user.email || '',
            fullName: meta.full_name || meta.name || session.user.email?.split('@')[0] || 'Athlete',
            avatarUrl: meta.avatar_url || meta.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
            goal: meta.goal || 'fat_loss',
            level: 'intermediate',
            targetWeightKg: meta.targetWeightKg || 75,
            currentWeightKg: meta.currentWeightKg || 80,
            heightCm: 175,
            dailyCalorieTarget: 2200,
            dailyWaterTargetMl: 3000,
            streakDays: 4,
            totalWorkoutsCompleted: 12,
            totalMinutesTrained: 480,
            createdAt: session.user.created_at
          };
          setUser(profile);
          localStorage.setItem('pulsefit_user', JSON.stringify(profile));
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          localStorage.removeItem('pulsefit_user');
        }
        setIsLoading(false);
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    } else {
      // In demo mode, if we don't have a user, we can default to loaded state
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!isSupabaseConfigured) {
      // Demo authentication simulation
      const loggedUser: UserProfile = {
        ...defaultDemoUser,
        email,
        fullName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
      };
      setUser(loggedUser);
      setIsDemoMode(true);
      localStorage.setItem('pulsefit_user', JSON.stringify(loggedUser));
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const signUp = async (
    fullName: string, 
    email: string, 
    password: string, 
    goal: FitnessGoal
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isSupabaseConfigured) {
      const newUser: UserProfile = {
        ...defaultDemoUser,
        id: 'user-' + Date.now(),
        email,
        fullName,
        goal,
        streakDays: 1,
        totalWorkoutsCompleted: 0,
        totalMinutesTrained: 0
      };
      setUser(newUser);
      setIsDemoMode(true);
      localStorage.setItem('pulsefit_user', JSON.stringify(newUser));
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            goal: goal
          }
        }
      });
      if (error) return { success: false, error: error.message };
      
      // If user was created but email confirmation is pending
      if (data.user && !data.session) {
        return { 
          success: true, 
          error: 'CONFIRMATION_REQUIRED' 
        };
      }
      
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    if (!isSupabaseConfigured) {
      // Mock Google Login
      const googleUser: UserProfile = {
        ...defaultDemoUser,
        email: 'alex.google@gmail.com',
        fullName: 'Alex Vance (Google)',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
      };
      setUser(googleUser);
      setIsDemoMode(true);
      localStorage.setItem('pulsefit_user', JSON.stringify(googleUser));
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) {
        if (error.message.includes('not enabled') || error.message.includes('provider')) {
          return {
            success: false,
            error: 'Google Sign-In is not enabled yet in your Supabase project. Please sign up using the Email & Password form below, or enable Google in Supabase > Authentication > Providers.'
          };
        }
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { 
        success: false, 
        error: err.message?.includes('provider') 
          ? 'Google Sign-In is not enabled yet in Supabase. Please use Email & Password below.'
          : (err.message || 'Google Auth failed') 
      };
    }
  };

  const loginDemoUser = () => {
    setUser(defaultDemoUser);
    setIsDemoMode(true);
    localStorage.setItem('pulsefit_user', JSON.stringify(defaultDemoUser));
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    if (!isSupabaseConfigured) {
      return { success: true, message: `Password reset link sent to ${email} (Demo Mode simulation)` };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      if (error) return { success: false, error: error.message };
      return { success: true, message: `Check ${email} for password reset instructions` };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to send reset email' };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('pulsefit_user');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('pulsefit_user', JSON.stringify(updated));
  };

  const logWater = (amountMl: number) => {
    setDailyActivity(prev => {
      const updated = { ...prev, waterMl: Math.max(0, prev.waterMl + amountMl) };
      localStorage.setItem('pulsefit_daily_activity', JSON.stringify(updated));
      return updated;
    });
  };

  const logWorkoutComplete = (routineId: string, durationMin: number, caloriesBurned: number) => {
    setDailyActivity(prev => {
      const updated: DailyActivityLog = {
        ...prev,
        caloriesBurned: prev.caloriesBurned + caloriesBurned,
        minutesActive: prev.minutesActive + durationMin,
        workoutsLogged: [...prev.workoutsLogged, routineId]
      };
      localStorage.setItem('pulsefit_daily_activity', JSON.stringify(updated));
      return updated;
    });

    if (user) {
      updateProfile({
        totalWorkoutsCompleted: user.totalWorkoutsCompleted + 1,
        totalMinutesTrained: user.totalMinutesTrained + durationMin,
        streakDays: user.streakDays + 1
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isDemoMode,
        dailyActivity,
        activeProgramId,
        login,
        signUp,
        loginWithGoogle,
        loginDemoUser,
        resetPassword,
        logout,
        updateProfile,
        logWater,
        logWorkoutComplete,
        setActiveProgramId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
