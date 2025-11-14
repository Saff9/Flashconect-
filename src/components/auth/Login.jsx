// FlashConnect - Login Component with Google + Email + Phone
// src/components/auth/Login.jsx

import { useState } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { useAnalytics } from '@/hooks/useAnalytics';
import PhoneAuth from './PhoneAuth';
import EmailAuth from './EmailAuth';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Input } from '@/components/ui/Input';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('google');
  const [error, setError] = useState('');
  const { trackLogin } = useAnalytics();

  const googleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🔧 Attempting Google login...');
      
      const provider = new GoogleAuthProvider();
      // Add scopes if needed
      provider.addScope('email');
      provider.addScope('profile');
      
      await signInWithPopup(auth, provider);
      trackLogin('google');
    } catch (error) {
      console.error('❌ Google login error:', error);
      
      // Specific error handling
      if (error.code === 'auth/operation-not-allowed') {
        setError('Google login is not enabled. Please contact administrator.');
      } else if (error.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized for login.');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Popup was blocked. Please allow popups for this site.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        setError('Login cancelled.');
      } else {
        setError(`Login failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'google', name: 'Google', icon: '🔍' },
    { id: 'email', name: 'Email', icon: '📧' },
    { id: 'phone', name: 'Phone', icon: '📱' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">FlashConnect</h1>
          <p className="text-blue-100">Fast, Secure Messaging</p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 m-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <strong>Login Error:</strong> {error}
                {error.includes('not enabled') && (
                  <div className="text-sm mt-2 p-2 bg-red-100 rounded">
                    <strong>Fix this in Firebase Console:</strong>
                    <br />1. Go to <strong>Authentication → Sign-in method</strong>
                    <br />2. Enable <strong>Google</strong> and <strong>Email/Password</strong>
                  </div>
                )}
              </div>
              <button 
                onClick={() => setError('')}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setError('');
              }}
              className={`flex-1 py-4 font-medium text-sm ${
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

        {/* Content */}
        <div className="p-6">
          {activeTab === 'google' && (
            <div className="text-center">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Welcome to FlashConnect
                </h2>
                <p className="text-gray-600">
                  Sign in with Google to continue
                </p>
              </div>
              
              <Button
                onClick={googleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {loading ? (
                  <Loader size="sm" />
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>

              {/* Debug Info */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
                <div><strong>Current Domain:</strong> {typeof window !== 'undefined' ? window.location.hostname : 'Loading...'}</div>
                <div><strong>Firebase Project:</strong> genz-owaisblog</div>
                <div className="mt-1 text-blue-600">
                  If Google login fails, check Firebase Console → Authentication → Sign-in method
                </div>
              </div>
            </div>
          )}

          {activeTab === 'email' && <EmailAuth />}
          {activeTab === 'phone' && <PhoneAuth />}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center">
          <p className="text-sm text-gray-600">
            By continuing, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
