// FlashConnect - Chat Page
// src/pages/chat/[id].js

import { useRouter } from 'next/router';
import { useEffect } from 'react'; // ✅ ADDED MISSING IMPORT
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

  // Set active chat when component mounts or id changes
  useEffect(() => { // ✅ NOW useEffect IS DEFINED
    if (id) {
      setActiveChat(id);
    }
  }, [id, setActiveChat]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <Layout>
      <ChatWindow chatId={id} />
    </Layout>
  );
}
