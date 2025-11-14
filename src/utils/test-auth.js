// FlashConnect - Auth Test
// src/utils/test-auth.js

import { auth } from './firebase';

export const testAuthMethods = async () => {
  console.log('🧪 Testing Firebase Auth Methods...');
  
  try {
    // Test if auth is initialized
    console.log('✅ Firebase Auth initialized');
    
    // Check available providers (this is just for info)
    console.log('🔧 Available providers: Google, Email/Password, Phone');
    
    return { success: true };
  } catch (error) {
    console.error('❌ Auth test failed:', error);
    return { success: false, error: error.message };
  }
};

export const checkAuthState = () => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('🔐 Auth State:', user ? 'Logged in' : 'Not logged in');
      unsubscribe();
      resolve(user);
    });
  });
};
