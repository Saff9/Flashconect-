// FlashConnect - Firebase Configuration
// src/utils/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase config - Direct config to avoid env issues
const firebaseConfig = {
  apiKey: "AIzaSyAgjMRRlmsOlX5EsNbPLmFAYrDxKmIEmUc",
  authDomain: "genz-owaisblog.firebaseapp.com",
  projectId: "genz-owaisblog",
  storageBucket: "genz-owaisblog.firebasestorage.app",
  messagingSenderId: "104507541594",
  appId: "1:104507541594:web:b4212217a4cedc83927063"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Debug: Log current domain for troubleshooting
if (typeof window !== 'undefined') {
  console.log('🌐 Current Domain:', window.location.hostname);
  console.log('🔧 Firebase Project:', firebaseConfig.projectId);
}

export default app;
