// --------------------------------------------
// AuthContext.jsx
// --------------------------------------------
// Summary:
// - Creates a global AuthContext
// - Tracks Firebase Auth state (login/logout)
// - Shares the logged-in user with all app components
// - Ensures app knows when auth state is ready

import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseInit'; // Firebase auth instance
import { onAuthStateChanged } from 'firebase/auth'; // Listener for auth state changes

// Creates a new context to share the auth state
// After: provide a safe default value for tests + runtime
export const AuthContext = createContext({
  user: null,
  authInitialized: false,
});

// This component wraps the app and provides the auth context
export const AuthProvider = ({ children }) => {
  // Stores the currently logged-in user
  const [user, setUser] = useState(null);

  // Tells the app when Firebase has finished checking auth state
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // Updates the user state when the auth state changes
      setUser(firebaseUser);
      // Marks auth as ready (whether user is logged in or not)
      setAuthInitialized(true);
    });

    // Cleanup function to unsubscribe from the listener on component unmount
    return () => unsubscribe();
  }, []);

  // Makes the user and authInitialized available to all child components
  return (
    <AuthContext.Provider value={{ user, authInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};
