// src/services/firestoreService.js
// ------------------------------------------------------------------
// Firestore Service for Lexicon Quiz App
//
// This module handles:
// ✅ Saving quiz scores to the "scores" collection
// ✅ Saving user profiles to the "users" collection
// ✅ Fetching user profiles
// ✅ Retrieving the top 10 scores for the leaderboard
//
// Firestore is initialized via: src/firebase/firebaseInit.js
//
// Example usage:
// await saveScore({ userId: user.uid, email: user.email, score: finalScore });
// await saveUserProfile({ uid: user.uid, displayName: user.email.split('@')[0], email: user.email });
// const profile = await getUserProfile(user.uid);
// const topScores = await getTopScores();
// ------------------------------------------------------------------

import { db } from '../firebase/firebaseInit';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  Timestamp,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';

/**
 * Save a user's quiz score to Firestore.
 * Stored in "scores" collection with timestamp.
 */
export const saveScore = async ({ userId, email, score }) => {
  try {
    const docRef = await addDoc(collection(db, 'scores'), {
      userId,
      email,
      score,
      createdAt: Timestamp.now(),
    });
    console.log('✅ Score saved with ID:', docRef.id);
  } catch (error) {
    console.error('❌ Error saving score:', error);
  }
};

/**
 * Save a user's profile to Firestore.
 * Stored in "users" collection using UID as doc ID.
 */
export const saveUserProfile = async ({ uid, displayName, email }) => {
  try {
    await setDoc(doc(db, 'users', uid), {
      displayName,
      email,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('❌ Error saving user profile:', error);
  }
};

/**
 * Fetch a user's profile from Firestore.
 * Returns null if not found.
 */
export const getUserProfile = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('❌ Error fetching user profile:', error);
    return null;
  }
};

/**
 * Fetch the top 10 highest scores.
 * Ordered descending by score.
 */
export const getTopScores = async () => {
  try {
    const scoresRef = collection(db, 'scores');
    const topQuery = query(scoresRef, orderBy('score', 'desc'), limit(10));
    const snapshot = await getDocs(topQuery);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('❌ Error fetching top scores:', error);
    return [];
  }
};
