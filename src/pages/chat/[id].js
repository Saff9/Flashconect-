// FlashConnect - Chat Page
// src/pages/chat/[id].js

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Loader } from '@/components/ui/Loader';

// Dynamic import for ChatWindow to avoid SSR issues
const ChatWindow = dynamic(() => import('@/components/chat/ChatWindow'), {
  ssr: false,
  loading: () => <Loader size="xl" />
});

import dynamic from 'next/dynamic';

export default function ChatPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    setMounted(true);
    // Get chatId from URL on client side only
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const id = path.split('/').pop();
      setChatId(id === 'chat' ? null : id);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  // Client-side only check
  if (typeof window !== 'undefined' && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  return (
    <Layout>
      {chatId ? <ChatWindow chatId={chatId} /> : <Loader size="xl" />}
    </Layout>
  );
}
