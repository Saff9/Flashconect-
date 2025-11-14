// FlashConnect - Chat Page
// src/pages/chat/[id].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'; // ✅ Added useState
import { useAuth } from '@/contexts/AuthContext';
import { useChat } from '@/contexts/ChatContext';
import Layout from '@/components/layout/Layout';
import ChatWindow from '@/components/chat/ChatWindow';
import { Loader } from '@/components/ui/Loader';

export default function ChatPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user, loading: authLoading } = useAuth();
  const { setActiveChat } = useChat();
  const [isClient, setIsClient] = useState(false); // ✅ Client-side check

  // ✅ Only use router on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Set active chat when component mounts or id changes
  useEffect(() => {
    if (id && isClient) { // ✅ Only on client
      setActiveChat(id);
    }
  }, [id, setActiveChat, isClient]);

  // ✅ Client-side redirect
  useEffect(() => {
    if (isClient && !user && !authLoading) {
      router.push('/');
    }
  }, [user, authLoading, router, isClient]);

  if (authLoading || !isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <Layout>
      <ChatWindow chatId={id} />
    </Layout>
  );
}
