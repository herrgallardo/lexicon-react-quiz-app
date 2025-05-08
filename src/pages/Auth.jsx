// src/pages/Auth.jsx
// --------------------------------------------------
// Handles user authentication: login, sign-up, and logout
// This page uses Firebase Auth to create or log in users.
// If a user is authenticated, they are redirected to /quiz.
// --------------------------------------------------

import React, { useState, useEffect } from 'react';
import { login, signUp, logout } from '../services/authService';
import { saveUserProfile } from '../services/firestoreService';
import { auth } from '../firebase/firebaseInit';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Custom UI styles for the Auth page

const Auth = () => {
  // State for form input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false); // Toggles between login and sign-up mode

  // Firebase-authenticated user state
  const [currentUser, setCurrentUser] = useState(null);

  // Router navigation
  const navigate = useNavigate();

  // Subscribe to authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      // Redirect to quiz page if authenticated
      if (user) {
        navigate('/quiz');
      }
    });

    // Unsubscribe on component unmount
    return () => unsubscribe();
  }, [navigate]);

  // Submit handler for login/sign-up form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNewUser) {
        const userCredential = await signUp(email, password);
        const user = userCredential.user;

        // Save user profile to Firestore
        await saveUserProfile({
          uid: user.uid,
          displayName: user.email.split('@')[0], // Default name from email
          email: user.email,
        });

        alert('User created and profile saved!');
      } else {
        await login(email, password);
      }
      // Navigation is handled automatically after auth state change
    } catch (err) {
      alert(err.message); // Show error message if login/signup fails
    }
  };

  // Manual logout handler
  const handleLogout = async () => {
    await logout();
    alert('Logged out!');
    setCurrentUser(null);
  };

  return (
    <div className="auth-layout">
      {currentUser ? (
        // If logged in: show welcome message and logout button
        <>
          <p className="auth-welcome">Welcome, {currentUser.email}</p>
          <button className="auth-button" onClick={handleLogout}>
            Log out
          </button>
        </>
      ) : (
        // Login or sign-up form
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>{isNewUser ? 'Sign Up' : 'Log In'}</h2>

          {/* Email field */}
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password field */}
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button type="submit">
            {isNewUser ? 'Create Account' : 'Log In'}
          </button>

          {/* Toggle link to switch between login/signup */}
          <div className="auth-toggle" onClick={() => setIsNewUser(!isNewUser)}>
            {isNewUser ? 'Have an account? Log in' : 'Need an account? Sign up'}
          </div>
        </form>
      )}
    </div>
  );
};

export default Auth;
