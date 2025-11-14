// FlashConnect - Home Page
// src/pages/index.js

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import Login from '@/components/auth/Login';
import { Loader } from '@/components/ui/Loader';

export default function Home() {
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Client-side redirect
  useEffect(() => {
    if (mounted && user && !loading) {
      window.location.href = '/chat';
    }
  }, [user, loading, mounted]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="xl" />
        <span className="ml-3">Redirecting...</span>
      </div>
    );
  }

  return <Login />;
}
