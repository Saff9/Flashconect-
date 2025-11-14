// FlashConnect - Phone Authentication Component
// src/components/auth/PhoneAuth.jsx

import { useState } from 'react';
import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier,
  ConfirmationResult 
} from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader } from '@/components/ui/Loader';

export default function PhoneAuth() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'code'
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      });
    }
  };

  const sendCode = async () => {
    if (!phone) return;
    
    try {
      setLoading(true);
      setupRecaptcha();
      
      const appVerifier = window.recaptchaVerifier;
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
      
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(result);
      setStep('code');
    } catch (error) {
      console.error('Error sending code:', error);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!code || !confirmationResult) return;
    
    try {
      setLoading(true);
      await confirmationResult.confirm(code);
    } catch (error) {
      console.error('Error verifying code:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Phone Verification
        </h2>
        <p className="text-gray-600">
          {step === 'phone' 
            ? 'Enter your phone number to receive a verification code'
            : 'Enter the 6-digit code sent to your phone'
          }
        </p>
      </div>

      {step === 'phone' ? (
        <>
          <Input
            type="tel"
            placeholder="+1 234 567 8900"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full"
          />
          <div id="recaptcha-container" className="flex justify-center my-4"></div>
          <Button
            onClick={sendCode}
            disabled={loading || !phone}
            className="w-full"
          >
            {loading ? <Loader size="sm" /> : 'Send Verification Code'}
          </Button>
        </>
      ) : (
        <>
          <Input
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            className="w-full text-center text-lg"
          />
          <Button
            onClick={verifyCode}
            disabled={loading || code.length !== 6}
            className="w-full"
          >
            {loading ? <Loader size="sm" /> : 'Verify Code'}
          </Button>
          <button
            onClick={() => setStep('phone')}
            className="text-blue-600 text-sm hover:underline w-full text-center"
          >
            Change phone number
          </button>
        </>
      )}
    </div>
  );
}
