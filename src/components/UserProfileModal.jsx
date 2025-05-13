// ---------------------------------------------------
// UserProfileModal.jsx
// ---------------------------------------------------
// Summary:
// - Displays a user profile modal for the logged-in user
// - Shows avatar, user email, and a logout button
// - Triggered from the QuizUserInfo component
// - Uses Firebase AuthContext and logout service
// ---------------------------------------------------

import React, { useContext } from 'react';
import { logout } from '../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import './UserProfileModal.css';

/**
 * Modal showing current user's basic profile info.
 * @component
 * @param {Function} onClose - Callback to close the modal
 * @returns {JSX.Element|null}
 */
const UserProfileModal = ({ onClose }) => {
  const { user } = useContext(AuthContext);
  if (!user) return null;

  return (
    <div className="user-profile-modal">
      {/* Close button in top-right corner */}
      <button className="close-modal" onClick={onClose} aria-label="Stäng">
        ×
      </button>

      {/* User avatar icon */}
      <div className="user-avatar-large">
        <FontAwesomeIcon
          icon={faUserCircle}
          className="purple-avatar"
          size="4x"
        />
      </div>

      {/* Display user's email */}
      <p className="user-email">{user.email}</p>

      {/* Placeholder for upcoming profile features */}
      <p className="coming-soon">Profilfunktion kommer snart!</p>

      {/* Logout button */}
      <button className="logout-button" onClick={logout}>
        Logga ut
      </button>
    </div>
  );
};

export default UserProfileModal;
