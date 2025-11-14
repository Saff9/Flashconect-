// FlashConnect - Sidebar Component
// src/components/layout/Sidebar.jsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import ChatList from '@/components/chat/ChatList';

export default function Sidebar() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('chats');

  const tabs = [
    { id: 'chats', name: 'Chats', icon: '💬' },
    { id: 'contacts', name: 'Contacts', icon: '👥' },
    { id: 'channels', name: 'Channels', icon: '📢' },
    { id: 'ai', name: 'AI Assistant', icon: '🤖' }
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.name}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chats' && <ChatList />}
        
        {activeTab === 'contacts' && (
          <div className="p-4 text-center text-gray-500">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-600 mb-2">Contacts</h3>
            <p className="text-sm">Your contacts will appear here</p>
          </div>
        )}
        
        {activeTab === 'channels' && (
          <div className="p-4 text-center text-gray-500">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-600 mb-2">Channels</h3>
            <p className="text-sm">Public channels will appear here</p>
          </div>
        )}
        
        {activeTab === 'ai' && (
          <div className="p-4 text-center text-gray-500">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="font-medium text-gray-600 mb-2">AI Assistant</h3>
            <p className="text-sm mb-4">Chat with our AI assistant</p>
            <button 
              onClick={() => router.push('/chat/ai-assistant')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Start Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
