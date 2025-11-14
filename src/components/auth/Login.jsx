// FlashConnect - Login with Email, Google, Phone
import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import EmailAuth from './EmailAuth';
import PhoneAuth from './PhoneAuth';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';

export default function Login() {
  const [activeTab, setActiveTab] = useState('email');
  const [loading, setLoading] = useState(false);

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
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">FlashConnect</h1>
          <p className="text-blue-100">Fast, Secure Messaging</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {['email', 'google', 'phone'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 font-medium text-sm ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
              }`}
            >
              {tab === 'email' && '📧 Email'}
              {tab === 'google' && '🔍 Google'} 
              {tab === 'phone' && '📱 Phone'}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'email' && <EmailAuth />}
          
          {activeTab === 'google' && (
            <div className="text-center">
              <Button
                onClick={googleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3"
              >
                {loading ? <Loader size="sm" /> : 'Continue with Google'}
              </Button>
            </div>
          )}
          
          {activeTab === 'phone' && <PhoneAuth />}
        </div>
      </div>
    </div>
  );
}
