// FlashConnect - Main App Component with Domain Check
// src/pages/_app.js

import { AuthProvider } from '@/contexts/AuthContext';
import { ChatProvider } from '@/contexts/ChatContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { usePageView } from '@/hooks/useAnalytics';
import DomainCheck from '@/components/debug/DomainCheck';
import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

function AppContent({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track page views
  usePageView(typeof window !== 'undefined' ? document.title : 'FlashConnect');

  // Prevent SSR for context providers
  if (!mounted) {
    return <div />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <Component {...pageProps} />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          {/* Domain debug info - remove in production */}
          <DomainCheck />
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default function App(props) {
  return <AppContent {...props} />;
}
