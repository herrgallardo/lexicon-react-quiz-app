// src/pages/LoginForm.jsx
import React, { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { saveUserProfile } from '../services/firestoreService';
import { auth } from '../firebase/firebaseInit';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import LoginMsgModal from '../components/LoginMsgModal';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [user, setUser] = useState(null);
  const [resetEmail, setResetEmail] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [error, setError] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('info');

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) navigate('/quiz');
    });
    return () => unsubscribe && unsubscribe();
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
          email: user.email,
        });
        setModalMessage('Account created successfully!');
        setModalType('success');
      } catch (err) {
        setError(err.message);
        setModalMessage('Failed to create account.');
        setModalType('error');
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        setError(err.message);
        setModalMessage('Login failed. Please check your credentials.');
        setModalType('error');
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setModalMessage('Password reset email sent!');
      setModalType('info');
      setShowReset(false);
    } catch (err) {
      setError(err.message);
      setModalMessage('Failed to send reset email.');
      setModalType('error');
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

      {modalMessage && (
        <LoginMsgModal
          message={modalMessage}
          type={modalType}
          duration={3500}
          onClose={() => setModalMessage('')}
        />
      )}
    </div>
  );
}

export default LoginForm;
