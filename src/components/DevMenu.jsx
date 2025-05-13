// src/components/DevMenu.jsx
import React, { useState } from 'react';
import { deleteAllScores } from '../services/firestoreService';
import { auth } from '../firebase/firebaseInit'; // ✅ Firebase Auth instance
import './DevMenu.css';

const DevMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Log current user info
  const handleLogAuth = () => {
    console.log('🔐 Current Auth User:', auth.currentUser);
  };

  // ✅ Sign out the current user
  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert('✅ Logged out from Firebase Auth');
      console.log('User signed out');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <div className="dev-menu">
      <button className="dev-toggle" onClick={() => setIsOpen(!isOpen)}>
        DEV
      </button>
      {isOpen && (
        <div className="dev-panel">
          <h4>Dev Menu</h4>
          <button onClick={deleteAllScores}>Reset All Scores</button>
          <button onClick={handleLogAuth}>Log Auth Info</button>
          <button onClick={handleLogout}>Log Out</button>{' '}
          {/* ✅ New logout button */}
        </div>
      )}
    </div>
  );
};

export default DevMenu;
