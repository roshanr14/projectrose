import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

interface LoginFormProps {
  onSwitchToSignUp: () => void;
  onSwitchToForgot: () => void;
  onSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToSignUp,
  onSwitchToForgot,
  onSuccess
}) => {
  const { login, loginWithGoogle, loginDemoUser, isDemoMode } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      onSuccess();
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    const res = await loginWithGoogle();
    setLoading(false);
    if (res.success) {
      onSuccess();
    } else {
      setError(res.error || 'Google login failed');
    }
  };

  const handleDemoSignIn = () => {
    loginDemoUser();
    onSuccess();
  };

  return (
    <div className="auth-form-wrapper">
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '6px' }}>Welcome Back, Athlete</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
          Access your personalized workouts, macro stats, and training streak.
        </p>
      </div>

      {error && (
        <div style={{
          background: 'rgba(255, 71, 87, 0.12)',
          border: '1px solid rgba(255, 71, 87, 0.3)',
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          color: '#ff6b81',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px'
        }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Quick 1-Click Demo Login */}
      <button
        type="button"
        onClick={handleDemoSignIn}
        style={{
          width: '100%',
          padding: '11px 16px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px dashed var(--accent-primary)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--accent-primary)',
          fontSize: '0.875rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '20px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <Sparkles size={16} />
        <span>Instant Demo Login (1-Click Athlete Access)</span>
      </button>

      {/* Google Authentication Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px 16px',
          background: '#ffffff',
          color: '#1f2937',
          border: '1px solid #e5e7eb',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.9375rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px',
          cursor: 'pointer',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
        <span>Continue with Google</span>
      </button>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        margin: '18px 0',
        color: 'var(--text-muted)',
        fontSize: '0.8125rem'
      }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
        <span>OR WITH EMAIL</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="login-email">Email Address</label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              id="login-email"
              type="email"
              className="form-input"
              style={{ paddingLeft: '42px' }}
              placeholder="athlete@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <div className="form-label">
            <span>Password</span>
            <button
              type="button"
              onClick={onSwitchToForgot}
              style={{ color: 'var(--accent-primary)', fontSize: '0.8125rem', fontWeight: 500 }}
            >
              Forgot Password?
            </button>
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              id="login-password"
              type="password"
              className="form-input"
              style={{ paddingLeft: '42px' }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '10px', height: '46px' }}
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '22px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        Don't have a ROSEFIT account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          style={{ color: 'var(--accent-primary)', fontWeight: 600, textDecoration: 'underline', marginLeft: '4px' }}
        >
          Sign Up Free
        </button>
      </div>
    </div>
  );
};
