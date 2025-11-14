// FlashConnect - Email Authentication Component
// src/components/auth/EmailAuth.jsx

import { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader } from '@/components/ui/Loader';

export default function EmailAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { trackLogin } = useAnalytics();

  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required');
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    if (isSignUp && !displayName.trim()) {
      setError('Display name is required for sign up');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      setLoading(true);
      
      if (isSignUp) {
        // Sign up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update profile with display name
        await updateProfile(userCredential.user, {
          displayName: displayName.trim()
        });
        
        trackLogin('email_signup');
      } else {
        // Sign in
        await signInWithEmailAndPassword(auth, email, password);
        trackLogin('email_login');
      }
      
    } catch (error) {
      console.error('Email auth error:', error);
      
      // Specific error handling
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Email already exists. Try signing in instead.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Use at least 6 characters.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again later.');
          break;
        default:
          setError(`Authentication failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setDisplayName('');
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-2">
        <h2 className="text-xl font-semibold text-gray-800">
          {isSignUp ? 'Create Account' : 'Sign In with Email'}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {isSignUp ? 'Join FlashConnect today' : 'Enter your email and password'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <Input
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            disabled={loading}
          />
        )}
        
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <Loader size="sm" />
          ) : (
            isSignUp ? 'Create Account' : 'Sign In'
          )}
        </Button>
      </form>

      <div className="text-center">
        <button
          onClick={switchMode}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          disabled={loading}
        >
          {isSignUp 
            ? 'Already have an account? Sign in' 
            : "Don't have an account? Sign up"
          }
        </button>
      </div>

      {/* Security Note */}
      <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600">
        <strong>🔒 Secure Login:</strong> Your credentials are protected with Firebase Auth.
        We never store your password.
      </div>
    </div>
  );
}
