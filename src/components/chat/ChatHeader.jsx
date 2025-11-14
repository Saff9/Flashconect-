// FlashConnect - Chat Header Component
// src/components/chat/ChatHeader.jsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Modal } from '@/components/ui/Modal';

export default function ChatHeader({ chatId }) {
  const router = useRouter();
  const [showInfo, setShowInfo] = useState(false);

  // Sample chat data - replace with Firestore data
  const chatInfo = {
    name: 'Group Chat',
    members: 5,
    isOnline: true,
    type: 'group',
    created: new Date('2024-01-01')
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Chat Avatar */}
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              {chatInfo.name.charAt(0)}
            </div>
            {chatInfo.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>

          {/* Chat Info */}
          <div>
            <h2 className="font-semibold text-gray-800">{chatInfo.name}</h2>
            <p className="text-sm text-gray-600">
              {chatInfo.type === 'direct' 
                ? (chatInfo.isOnline ? 'Online' : 'Last seen recently')
                : `${chatInfo.members} members`
              }
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <button 
            onClick={() => setShowInfo(true)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat Info Modal */}
      <Modal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Chat Info"
        size="md"
      >
        <div className="p-6 space-y-6">
          {/* Chat Header in Modal */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-2xl mx-auto mb-4">
              {chatInfo.name.charAt(0)}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{chatInfo.name}</h3>
            <p className="text-gray-600">
              {chatInfo.type === 'direct' ? 'Direct Chat' : `${chatInfo.members} members`}
            </p>
          </div>

          {/* Chat Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <svg className="w-6 h-6 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span className="text-sm font-medium">Add Members</span>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <svg className="w-6 h-6 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium">Media</span>
            </button>
          </div>

          {/* Chat Settings */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800">Chat Settings</h4>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Disappearing Messages</span>
              <button className="text-blue-600 text-sm font-medium">Off</button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Chat Export</span>
              <button className="text-blue-600 text-sm font-medium">Export</button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border-t border-gray-200 pt-4">
            <button className="w-full text-red-600 font-medium py-2 hover:bg-red-50 rounded-lg transition-colors">
              Leave Chat
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
