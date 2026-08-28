import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Dumbbell, Menu, X, LayoutDashboard, User, LogOut, Sparkles } from 'lucide-react';
import { AuthMode } from '../auth/AuthModal';

interface NavbarProps {
  onOpenAuth: (mode: AuthMode) => void;
  onNavigateToDashboard: () => void;
  isDashboardView?: boolean;
  onNavigateHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onNavigateToDashboard,
  isDashboardView = false,
  onNavigateHome
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Programs', href: '#programs' },
    { label: 'Exercise Vault', href: '#exercises' },
    { label: 'Nutrition', href: '#nutrition' },
    { label: 'Channel Videos', href: '#videos' },
    { label: 'Community', href: '#community' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (isDashboardView && onNavigateHome) {
      onNavigateHome();
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        transition: 'all 0.3s ease',
        background: isScrolled || isDashboardView ? 'rgba(9, 12, 16, 0.92)' : 'rgba(9, 12, 16, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${isScrolled || isDashboardView ? 'rgba(255, 255, 255, 0.08)' : 'transparent'}`
      }}
    >
      <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '74px' }}>
        {/* Brand Logo */}
        <div
          onClick={() => {
            if (onNavigateHome) onNavigateHome();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)'
          }}>
            <Dumbbell size={22} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.4rem',
              letterSpacing: '-0.03em',
              lineHeight: 1.1
            }}>
              ROSE<span style={{ color: 'var(--accent-primary)' }}>FIT</span>
            </span>
            <span style={{
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              fontWeight: 600
            }}>
              ATHLETIC TRAINING CHANNEL
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        {!isDashboardView && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  transition: 'color 0.2s ease',
                  padding: '6px 2px'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* Desktop CTA / Auth Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="desktop-nav">
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {!isDashboardView ? (
                <button
                  onClick={onNavigateToDashboard}
                  className="btn btn-primary"
                  style={{ padding: '8px 18px', fontSize: '0.875rem' }}
                >
                  <LayoutDashboard size={16} />
                  <span>My Dashboard</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (onNavigateHome) onNavigateHome();
                  }}
                  className="btn btn-outline"
                  style={{ padding: '8px 18px', fontSize: '0.875rem' }}
                >
                  <span>Main Channel</span>
                </button>
              )}

              {/* User Avatar Chip */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 10px 4px 6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                <img
                  src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt={user?.fullName}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{user?.fullName.split(' ')[0]}</span>
                <button
                  onClick={logout}
                  style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', marginLeft: '4px' }}
                  title="Log out"
                >
                  <LogOut size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => onOpenAuth('login')}
                className="btn btn-ghost"
                style={{ padding: '8px 16px', fontSize: '0.875rem' }}
              >
                Login
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="btn btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.875rem' }}
              >
                <Sparkles size={15} />
                <span>Join Channel Free</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-nav-toggle"
          style={{
            display: 'none',
            color: 'var(--text-primary)',
            padding: '8px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.05)'
          }}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '74px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(9, 12, 16, 0.98)',
            backdropFilter: 'blur(20px)',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            zIndex: 899,
            overflowY: 'auto'
          }}
        >
          {!isDashboardView && navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              {link.label}
            </a>
          ))}

          <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '8px 0' }} />

          {isAuthenticated ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToDashboard();
                }}
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px' }}
              >
                <LayoutDashboard size={18} />
                <span>Go to Dashboard</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="btn btn-outline"
                style={{ width: '100%', padding: '12px' }}
              >
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="btn btn-outline"
                style={{ width: '100%', padding: '12px' }}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signup');
                }}
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px' }}
              >
                <Sparkles size={16} />
                <span>Join Channel Free</span>
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
