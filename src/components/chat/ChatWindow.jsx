// FlashConnect - Chat Window Component
// src/components/chat/ChatWindow.jsx

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Message from './Message';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import { MessageSkeleton } from '@/components/ui/Skeleton';

export default function ChatWindow({ chatId }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate loading messages
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // In real app, this would be Firestore data
      setMessages([]);
    }, 1000);

    return () => clearTimeout(timer);
  }, [chatId]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col">
        <ChatHeader chatId={chatId} />
        <div className="flex-1 overflow-y-auto">
          {[...Array(5)].map((_, i) => (
            <MessageSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader chatId={chatId} />
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No messages yet</h3>
            <p className="text-center text-gray-500">
              Send a message to start the conversation
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput chatId={chatId} />
    </div>
  );
}
