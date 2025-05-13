// src/pages/LoginForm.jsx
import React, { useState, useEffect } from 'react';  // React and hooks for state management
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth'; // Firebase authentication methods
import { saveUserProfile } from '../services/firestoreService'; // Function to save user profile to Firestore
import { auth } from '../firebase/firebaseInit'; // Firebase authentication instance
import { useNavigate } from 'react-router-dom'; // React Router for navigation
import './LoginForm.css'; // Custom UI styles for the LoginForm component

// LoginForm component
// This component handles user authentication, including login, registration, and password reset.
function LoginForm() {

  // These states variables manage the email, password, and user authentication input fields.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);


  // This state keeps track of the currently authenticated user.
  const [user, setUser] = useState(null);


  // This state manages the password reset, email input field and visibility of the password reset form..
  const [resetEmail, setResetEmail] = useState('');
  const [showReset, setShowReset] = useState(false);

  // This manage  error messages that may occur during authentication.
  const [error, setError] = useState('');
  
  // Router for navigation
  const navigate = useNavigate();

  // Effect to handle authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      // Redirect to quiz page if user is authenticated
      if (user) {
        navigate('/quiz');
      }
    });

    // Unsubscribe from the auth state listener on component unmount
    return () => unsubscribe();
  }, [navigate]);

  // Handle form submission for login or registration
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError('');

    // Check if the user is new or existing
    if (isNewUser) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user profile to Firestore and alert that they have created an account
        await saveUserProfile({
          uid: user.uid,
          displayName: email.split('@')[0], // Default name from email
          email: user.email
        });
        alert('Account created!');
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        // Sign in the user and alert that they have logged in
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in!');
      } catch (error) {
        setError(error.message);
      }
    }
  };

  // Handle manual logout
  // This function is called when the user clicks the "Logout" button and signs out the user.
  // It also resets the user state and alerts that they have logged out.
  const handleLogout = async () => {
    await auth.signOut();
    alert('Logged out');
    setUser(null);
  };

  // Handle password reset
  // This function is called when the user clicks the "Reset" link and sends a password reset email to the user.
  // It also resets the error state and alerts that the reset email has been sent.
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert('Reset email sent!');
      setShowReset(false);
    } catch (error) {
      setError(error.message);
    }
  };

  // Render the login form
  // The form includes input fields for email and password, a button to submit the form,
  // and links to switch between login and registration, as well as a link to reset the password.
  // It also displays error messages if any occur during authentication.
  return (
    <div className="login-layout">
  <div className="login-container">
    <div className="login-box">
      
      {/* Form for login or registration */}
      <form onSubmit={showReset ? handleResetPassword : handleSubmit}>
        <h1>{showReset ? 'Reset Password' : isNewUser ? 'Sign Up' : 'Login'}</h1>

        {/* Display error message if any */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Input fields for email and password */}
        {!showReset && (
          <>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {/* Input field for password reset email */}
        {showReset && (
          <div className="input-box">
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
          </div>
        )}

        {/* Submit button */}
        <button type="submit" className="login-btn">
          {showReset ? 'Send Reset Email' : isNewUser ? 'Sign Up' : 'Login'}
        </button>

        {/* Toggle link to switch between login and registration */}
        {!showReset && (
          <div className="register-link">
            <p>
              {isNewUser ? 'Already have an account?' : "Don't have an account?"}{' '}
              <a href="#" onClick={() => setIsNewUser(!isNewUser)}>
                {isNewUser ? 'Login' : 'Register'}
              </a>
            </p>
          </div>
        )}

        {/* Password reset link */}
        <div className="reset-password">
          <p>
            {showReset ? 'Enter your email to reset password' : 'Forgot password?'}{' '}
            <a href="#" onClick={() => setShowReset(!showReset)}>
              {showReset ? 'Cancel' : 'Reset'}
            </a>
          </p>
        </div>
      </form>
    </div>
  </div>
</div>
  );
}

// Export the LoginForm component as the default export
// This allows other components or files to import and use the LoginForm component.
export default LoginForm;