// FlashConnect - Login Page
// src/pages/auth/login.js

import { useEffect, useState } from 'react'; // ✅ Added useState
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Login from '@/components/auth/Login';
import { Loader } from '@/components/ui/Loader';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false); // ✅ Client-side check

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && user && !loading) {
      router.push('/chat');
    }
  }, [user, loading, router, isClient]);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  if (user) {
    return null; // Will redirect
  }

  return <Login />;
}
