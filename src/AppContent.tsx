import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/landing/Hero';
import { ChannelIntro } from './components/landing/ChannelIntro';
import { ProgramsList } from './components/landing/ProgramsList';
import { ExerciseVault } from './components/landing/ExerciseVault';
import { NutritionSection } from './components/landing/NutritionSection';
import { VideoShowcase } from './components/landing/VideoShowcase';
import { Testimonials } from './components/landing/Testimonials';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { AuthModal, AuthMode } from './components/auth/AuthModal';

export const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  // If user becomes authenticated, smoothly transition to dashboard
  useEffect(() => {
    if (isAuthenticated && currentView === 'landing') {
      // Optional auto-redirect or allow user to click dashboard
      setCurrentView('dashboard');
    } else if (!isAuthenticated && currentView === 'dashboard') {
      setCurrentView('landing');
    }
  }, [isAuthenticated]);

  const handleOpenAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navigation Header */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onNavigateToDashboard={() => {
          setCurrentView('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDashboardView={currentView === 'dashboard'}
        onNavigateHome={() => {
          setCurrentView('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main View Area */}
      {currentView === 'landing' ? (
        <main>
          <Hero
            onOpenAuth={handleOpenAuth}
            onExplorePrograms={() => {
              const el = document.getElementById('programs');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <ChannelIntro />
          <ProgramsList
            onOpenAuth={handleOpenAuth}
          />
          <ExerciseVault
            onOpenAuth={handleOpenAuth}
          />
          <NutritionSection
            onOpenAuth={handleOpenAuth}
          />
          <VideoShowcase
            onOpenAuth={handleOpenAuth}
          />
          <Testimonials
            onOpenAuth={handleOpenAuth}
          />
          <Footer />
        </main>
      ) : (
        <DashboardLayout
          onNavigateHome={() => {
            setCurrentView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

    </div>
  );
};
