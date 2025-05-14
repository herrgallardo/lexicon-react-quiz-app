// ---------------------------------------------------
// firestoreService.js
// ---------------------------------------------------
// Summary:
// - Manages all Firestore reads/writes for the app
// - Handles user profile saving/loading
// - Handles quiz score saving
// - Fetches leaderboard (top 10 scores)
// - Dev tool: allows deleting all scores (admin-only)

import { db, auth } from '../firebase/firebaseInit';
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
  deleteDoc,
} from 'firebase/firestore';

/**
 * Saves a quiz score to the "scores" collection.
 * Includes user ID, email, score, and timestamp.
 */
export const saveScore = async ({ userId, email, score, settings = {} }) => {
  try {
    const docRef = await addDoc(collection(db, 'scores'), {
      userId,
      email,
      score,
      createdAt: Timestamp.now(),
      ...settings, // Optional quiz settings (e.g., category, difficulty)
    });
    console.log('✅ Score saved with ID:', docRef?.id);
  } catch (error) {
    console.error('❌ Error saving score:', error);
  }
};

/**
 * Saves a user profile to the "users" collection using their UID.
 * This helps link auth users to display names or additional info.
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
 * Loads a user profile from Firestore by UID.
 * Returns null if the profile doesn't exist.
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
 * Gets the top 10 scores from the "scores" collection.
 * Useful for showing a leaderboard.
 */
export const getTopScores = async () => {
  try {
    const scoresRef = collection(db, 'scores');
    const topQuery = query(scoresRef, orderBy('score', 'desc'), limit(10));
    const snapshot = await getDocs(topQuery);

    // Map Firestore docs to plain JS objects
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('❌ Error fetching top scores:', error);
    return [];
  }
};

/**
 * Deletes all score entries from the "scores" collection.
 * Only works if the current user is the admin.
 * Useful for dev testing or resetting leaderboard state.
 */
export const deleteAllScores = async () => {
  const currentUser = auth.currentUser;
  const ADMIN_UID = process.env.REACT_APP_ADMIN_UID; // 🔐 Loaded from .env.local

  // Check if the current user is authorized
  if (!currentUser || currentUser.uid !== ADMIN_UID) {
    alert('❌ You are not authorized to reset scores.');
    return;
  }

  try {
    const scoresRef = collection(db, 'scores');
    const snapshot = await getDocs(scoresRef);

    const deletePromises = snapshot.docs.map((docSnap) =>
      deleteDoc(doc(db, 'scores', docSnap.id))
    );

    await Promise.all(deletePromises);
    alert('✅ All scores have been reset.');
  } catch (error) {
    console.error('❌ Error deleting scores:', error);
    alert('❌ Failed to reset scores. See console for details.');
  }
};
