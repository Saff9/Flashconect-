// FlashConnect - Message Component
// src/components/chat/Message.jsx

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Message({ message }) {
  const { user } = useAuth();
  const [showOptions, setShowOptions] = useState(false);
  const isSent = message.senderId === user.uid;

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReaction = (emoji) => {
    // Implement reaction logic
    console.log('React with:', emoji);
    setShowOptions(false);
  };

  const handleDelete = () => {
    // Implement delete logic
    console.log('Delete message');
    setShowOptions(false);
  };

  const handleReply = () => {
    // Implement reply logic
    console.log('Reply to message');
    setShowOptions(false);
  };

  const handleForward = () => {
    // Implement forward logic
    console.log('Forward message');
    setShowOptions(false);
  };

  return (
    <div
      className={`flex ${isSent ? 'justify-end' : 'justify-start'} group relative`}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl relative ${
        isSent 
          ? 'bg-blue-500 text-white rounded-br-none' 
          : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
      }`}>
        
        {/* Message Text */}
        <p className="break-words">{message.text}</p>
        
        {/* Message Meta */}
        <div className={`flex items-center justify-end gap-2 mt-1 text-xs ${
          isSent ? 'text-blue-100' : 'text-gray-500'
        }`}>
          <span>{formatTime(message.timestamp)}</span>
          {isSent && (
            <span>✓✓</span> // Read receipts
          )}
        </div>

        {/* Reactions */}
        {message.reactions && Object.keys(message.reactions).length > 0 && (
          <div className="flex gap-1 mt-2">
            {Object.entries(message.reactions).map(([emoji, users]) => (
              <span
                key={emoji}
                className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs"
              >
                {emoji} {users.length}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Message Options */}
      {showOptions && (
        <div className={`absolute top-0 ${isSent ? 'right-full' : 'left-full'} flex items-center gap-1 mx-2 opacity-0 group-hover:opacity-100 transition-opacity`}>
          <button
            onClick={() => handleReaction('👍')}
            className="p-1 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            title="React"
          >
            😊
          </button>
          <button
            onClick={handleReply}
            className="p-1 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            title="Reply"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
          {isSent && (
            <button
              onClick={handleDelete}
              className="p-1 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
              title="Delete"
            >
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
