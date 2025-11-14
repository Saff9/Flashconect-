// FlashConnect - Header Component
// src/components/layout/Header.jsx

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { Modal } from '@/components/ui/Modal';

export default function Header() {
  const { user } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        {/* App Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">FC</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">FlashConnect</h1>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          {/* Notifications */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <button 
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="text-sm font-medium text-gray-700 hidden md:block">
              {user?.displayName || 'User'}
            </span>
          </button>
        </div>
      </header>

      {/* Profile Modal */}
      <Modal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        title="Your Profile"
        size="md"
      >
        <div className="p-6 space-y-6">
          {/* Profile Header */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-2xl mx-auto mb-4">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              {user?.displayName || 'User'}
            </h3>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500 mt-2">
              {user?.phoneNumber || 'No phone number linked'}
            </p>
          </div>

          {/* Profile Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Account Created</p>
                <p className="text-sm text-gray-600">
                  {user?.metadata?.creationTime 
                    ? new Date(user.metadata.creationTime).toLocaleDateString()
                    : 'Unknown'
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Last Sign In</p>
                <p className="text-sm text-gray-600">
                  {user?.metadata?.lastSignInTime
                    ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                    : 'Unknown'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Edit Profile
            </button>
            <button 
              onClick={handleLogout}
              className="w-full border border-red-600 text-red-600 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
