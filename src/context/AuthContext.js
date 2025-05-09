// This file creates and provides a global Auth context
// It tracks the currently authenticated Firebase user
// and makes it accessible throughout the app
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseInit'; // Firebase auth instance
import { onAuthStateChanged } from 'firebase/auth'; // Listener for auth state changes

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider wraps the entire app and provides the user to its children
export const AuthProvider = ({ children }) => {
  // Local state to store the logged-in user
  const [user, setUser] = useState(null);

  // Flag to track if Firebase auth has initialized
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    // Subscribe to auth state changes (login, logout, etc.)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // Update local state when auth state changes
      setUser(firebaseUser);

      // Mark authentication as initialized once we get the first response
      // (whether the user is logged in or not)
      setAuthInitialized(true);
    });

    // Clean up the listener on unmount to prevent memory leaks
    return () => unsubscribe();
  }, []);

  // Provide both user and authInitialized values to all components within the context
  return (
    <AuthContext.Provider value={{ user, authInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};
