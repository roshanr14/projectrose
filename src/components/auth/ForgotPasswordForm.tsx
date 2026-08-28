import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBackToLogin }) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setError(null);
    setMessage(null);
    setLoading(true);

    const res = await resetPassword(email);
    setLoading(false);
    if (res.success) {
      setMessage(res.message || 'Password reset link sent! Check your inbox.');
    } else {
      setError(res.error || 'Unable to send reset email');
    }
  };

  return (
    <div className="auth-form-wrapper">
      <button
        type="button"
        onClick={onBackToLogin}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-secondary)',
          fontSize: '0.875rem',
          marginBottom: '20px',
          cursor: 'pointer'
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to Login</span>
      </button>

      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '6px' }}>Reset Your Password</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
          Enter your registered email address and we will send you instructions to reset your password.
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

      {message && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          color: '#34d399',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px'
        }}>
          <CheckCircle2 size={18} />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="forgot-email">Email Address</label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              id="forgot-email"
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
              <span>Send Recovery Link</span>
              <Send size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
