// src/context/AuthContext.jsx
// ----------------------------------------------
// This file creates and provides a global Auth context
// It tracks the currently authenticated Firebase user
// and makes it accessible throughout the app.
// ----------------------------------------------

import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseInit'; // Firebase auth instance
import { onAuthStateChanged } from 'firebase/auth'; // Listener for auth state changes

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider wraps the entire app and provides the user to its children
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Local state to store the logged-in user

  useEffect(() => {
    // Subscribe to auth state changes (login, logout, etc.)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // Update local state when auth state changes
    });

    // Clean up the listener on unmount to prevent memory leaks
    return () => unsubscribe();
  }, []);

  // Provide the user value to all components within the context
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
