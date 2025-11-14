// FlashConnect - Chats List Page
// src/pages/chat/index.js

import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'; // ✅ Added useState

export default function ChatsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false); // ✅ Client-side check

  // ✅ Only use router on client side
  useEffect(() => {
    setIsClient(true);
    
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  // ✅ Show loading on server side
  if (!isClient || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome to FlashConnect</h2>
          <p className="text-gray-600 mb-6">Select a chat from the sidebar to start messaging</p>
          <button 
            onClick={() => router.push('/chat/new')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start New Chat
          </button>
        </div>
      </div>
    </Layout>
  );
}
