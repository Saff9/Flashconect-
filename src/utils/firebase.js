// FlashConnect - Firebase Configuration
// src/utils/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase config from the blog
const firebaseConfig = {
  apiKey: "AIzaSyAgjMRRlmsOlX5EsNbPLmFAYrDxKmIEmUc",
  authDomain: "genz-owaisblog.firebaseapp.com",
  databaseURL: "https://genz-owaisblog-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "genz-owaisblog",
  storageBucket: "genz-owaisblog.firebasestorage.app",
  messagingSenderId: "104507541594",
  appId: "1:104507541594:web:b4212217a4cedc83927063",
  measurementId: "G-EW066JCY32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Initialize Analytics (optional)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
