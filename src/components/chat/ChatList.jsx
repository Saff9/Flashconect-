// FlashConnect - Chat List Component
// src/components/chat/ChatList.jsx

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ChatList() {
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample chat data - replace with Firestore data
  const sampleChats = [
    {
      id: '1',
      name: 'John Doe',
      lastMessage: 'Hey, how are you doing?',
      timestamp: new Date(Date.now() - 300000),
      unread: 2,
      isOnline: true,
      type: 'direct'
    },
    {
      id: '2',
      name: 'Work Group',
      lastMessage: 'Alice: Meeting at 3 PM tomorrow',
      timestamp: new Date(Date.now() - 3600000),
      unread: 0,
      isOnline: false,
      type: 'group',
      members: 5
    },
    {
      id: '3', 
      name: 'Tech News',
      lastMessage: 'New React version released!',
      timestamp: new Date(Date.now() - 86400000),
      unread: 0,
      isOnline: false,
      type: 'channel'
    }
  ];

  const filteredChats = sampleChats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    
    if (diff < 3600000) { // Less than 1 hour
      return Math.floor(diff / 60000) + 'm';
    } else if (diff < 86400000) { // Less than 1 day
      return Math.floor(diff / 3600000) + 'h';
    } else {
      return timestamp.toLocaleDateString('en-US', { month: 'short', 'day': 'numeric' });
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Search Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => router.push(`/chat/${chat.id}`)}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
              router.query.id === chat.id ? 'bg-blue-50 border-blue-200' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {chat.name.charAt(0)}
                </div>
                {chat.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatTime(chat.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 truncate">
                  {chat.lastMessage}
                </p>

                {/* Chat Metadata */}
                <div className="flex items-center gap-2 mt-1">
                  {chat.type === 'group' && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {chat.members} members
                    </span>
                  )}
                  {chat.type === 'channel' && (
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      Channel
                    </span>
                  )}
                  {chat.unread > 0 && (
                    <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Chat Button */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Chat
        </button>
      </div>
    </div>
  );
}
