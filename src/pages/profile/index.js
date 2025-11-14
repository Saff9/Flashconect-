// FlashConnect - Profile Page
// src/pages/profile/index.js

import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';

export default function ProfilePage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  // Client-side only check
  if (typeof window !== 'undefined' && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Profile</h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-3xl mx-auto mb-4">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {user?.displayName || 'User'}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
            {user?.phoneNumber && (
              <p className="text-gray-500 text-sm mt-1">{user.phoneNumber}</p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Account Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Account Created</p>
                <p className="font-medium text-gray-800">
                  {user?.metadata?.creationTime 
                    ? new Date(user.metadata.creationTime).toLocaleDateString()
                    : 'Unknown'
                  }
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Last Sign In</p>
                <p className="font-medium text-gray-800">
                  {user?.metadata?.lastSignInTime
                    ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                    : 'Unknown'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-200">
            <Button className="w-full" variant="primary">
              Edit Profile
            </Button>
            <Button className="w-full" variant="secondary">
              Change Password
            </Button>
            <Button className="w-full" variant="ghost">
              Privacy Settings
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
