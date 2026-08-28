import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppContent } from './AppContent';

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
