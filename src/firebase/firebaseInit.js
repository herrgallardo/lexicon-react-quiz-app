// --------------------------------------------
// firebaseInit.js
// --------------------------------------------
// Summary:
// - Sets up Firebase with the app's credentials
// - Initializes Authentication and Firestore database
// - Exports the Firebase services for use in the app

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration for this specific project
const firebaseConfig = {
  apiKey: 'AIzaSyCThCV_JT-soOiVVtcDpqwrUJVavwL8_LE',
  authDomain: 'lexicon-quiz-app.firebaseapp.com',
  projectId: 'lexicon-quiz-app',
  storageBucket: 'lexicon-quiz-app.appspot.com',
  messagingSenderId: '429183160474',
  appId: '1:429183160474:web:4250d0abf078e1f5ed4f23',
};

// Initializes the Firebase app instance using the config
const app = initializeApp(firebaseConfig);

// Sets up Firebase Authentication service
const auth = getAuth(app);

// Sets up Firestore database service
const db = getFirestore(app);

// Exports the initialized services so other files can use them
export { app, auth, db };
