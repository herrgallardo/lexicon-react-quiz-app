// src/pages/LoginForm.jsx
import React, { useState, useEffect } from 'react'; // React and hooks for state management
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth'; // Firebase authentication methods
import { saveUserProfile } from '../services/firestoreService'; // Function to save user profile to Firestore
import { auth } from '../firebase/firebaseInit'; // Firebase authentication instance
import { useNavigate } from 'react-router-dom'; // React Router for navigation
import './LoginForm.css'; // Custom UI styles for the LoginForm component

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
  const [error, setError] = useState('');

  // Router for navigation
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        navigate('/quiz');
      }
    });

    // only call if unsubscribe is a function
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isNewUser) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Save user profile to Firestore and alert that they have created an account
        await saveUserProfile({
          uid: user.uid,
          displayName: email.split('@')[0], // Default name from email
          email: user.email,
        });
        alert('Account created!');
      } catch (err) {
        setError(err.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in!');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    alert('Logged out');
    setUser(null);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert('Reset email sent!');
      setShowReset(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-layout">
      <div className="login-container">
        <div className="login-box">
          {/* Form for login or registration */}
          <form onSubmit={showReset ? handleResetPassword : handleSubmit}>
            <h1>
              {showReset ? 'Reset Password' : isNewUser ? 'Sign Up' : 'Login'}
            </h1>

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
                  {isNewUser
                    ? 'Already have an account?'
                    : "Don't have an account?"}{' '}
                  <a href="#" onClick={() => setIsNewUser(!isNewUser)}>
                    {isNewUser ? 'Login' : 'Register'}
                  </a>
                </p>
              </div>
            )}

            {/* Password reset link */}
            <div className="reset-password">
              <p>
                {showReset
                  ? 'Enter your email to reset password'
                  : 'Forgot password?'}{' '}
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
