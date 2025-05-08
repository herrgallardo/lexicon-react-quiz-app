// src/firebase/firebaseInit.js
// --------------------------------------------------
// Firebase initialization with hardcoded config.
// This version does not rely on .env or Vite vars.
// --------------------------------------------------

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Direct Firebase config (replace with your real config if needed)
const firebaseConfig = {
  apiKey: 'AIzaSyCThCV_JT-soOiVVtcDpqwrUJVavwL8_LE',
  authDomain: 'lexicon-quiz-app.firebaseapp.com',
  projectId: 'lexicon-quiz-app',
  storageBucket: 'lexicon-quiz-app.appspot.com',
  messagingSenderId: '429183160474',
  appId: '1:429183160474:web:4250d0abf078e1f5ed4f23',
};

// Initialize Firebase app instance
const app = initializeApp(firebaseConfig);

// Set up Firebase Authentication and Firestore database
const auth = getAuth(app);
const db = getFirestore(app);

// Export initialized services for use throughout the app
export { app, auth, db };
