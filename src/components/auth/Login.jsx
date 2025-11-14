// FlashConnect - Login Component
// src/components/auth/Login.jsx

import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import PhoneAuth from './PhoneAuth';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('google');

  const googleLogin = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">FlashConnect</h1>
          <p className="text-blue-100">Fast, Secure Messaging</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 font-medium ${
              activeTab === 'google'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('google')}
          >
            Google
          </button>
          <button
            className={`flex-1 py-4 font-medium ${
              activeTab === 'phone'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('phone')}
          >
            Phone
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'google' ? (
            <div className="text-center">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600">
                  Sign in with Google to continue
                </p>
              </div>
              
              <Button
                onClick={googleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white
