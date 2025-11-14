// FlashConnect - Login Page
// src/pages/auth/login.js

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Login from '@/components/auth/Login';
import { Loader } from '@/components/ui/Loader';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  // Client-side redirect
  useEffect(() => {
    if (mounted && user && !loading) {
      window.location.href = '/chat';
    }
  }, [user, loading, mounted]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  if (user) {
    return null;
  }

  return <Login />;
}
