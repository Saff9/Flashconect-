// FlashConnect - useFirebase Hook
// src/hooks/useFirebase.js

import { useState, useEffect } from 'react';
import { db, storage } from '@/utils/firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  arrayUnion,
  arrayRemove 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const useFirebase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get user document
  const getUserData = async (userId) => {
    try {
      setLoading(true);
      const userDoc = await getDoc(doc(db, 'users', userId));
      return userDoc.exists() ? userDoc.data() : null;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (userId, data) => {
    try {
      setLoading(true);
      await setDoc(doc(db, 'users', userId), data, { merge: true });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Upload file
  const uploadFile = async (file, path) => {
    try {
      setLoading(true);
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Add user to contacts
  const addToContacts = async (userId, contactId) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'users', userId), {
        contacts: arrayUnion(contactId)
      });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Remove user from contacts
  const removeFromContacts = async (userId, contactId) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'users', userId), {
        contacts: arrayRemove(contactId)
      });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getUserData,
    updateUserProfile,
    uploadFile,
    addToContacts,
    removeFromContacts
  };
};
