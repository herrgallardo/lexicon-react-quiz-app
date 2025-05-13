// src/pages/LoginForm.jsx
import React, { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { saveUserProfile } from '../services/firestoreService';
import { auth } from '../firebase/firebaseInit';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [user, setUser] = useState(null);
  const [resetEmail, setResetEmail] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        navigate('/quiz');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isNewUser) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await saveUserProfile({
          uid: user.uid,
          displayName: email.split('@')[0],
          email: user.email
        });
        alert('Account created!');
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in!');
      } catch (error) {
        setError(error.message);
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
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-layout">
  <div className="login-container">
    <div className="login-box">
      <form onSubmit={showReset ? handleResetPassword : handleSubmit}>
        <h1>{showReset ? 'Reset Password' : isNewUser ? 'Sign Up' : 'Login'}</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}

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

        <button type="submit" className="login-btn">
          {showReset ? 'Send Reset Email' : isNewUser ? 'Sign Up' : 'Login'}
        </button>

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

export default LoginForm;