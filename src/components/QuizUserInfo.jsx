// ---------------------------------------------------
// QuizUserInfo.jsx
// ---------------------------------------------------
// Summary:
// - Displays the logged-in user's avatar and name/email
// - Toggles the UserProfileModal on avatar click
// - Used in quiz header or dashboard area
// ---------------------------------------------------

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import UserProfileModal from './UserProfileModal';
import './QuizUserInfo.css';

/**
 * Displays a clickable user avatar with name/email.
 * Opens the user profile modal when clicked.
 * @component
 * @param {object} user - The logged-in user object
 * @returns {JSX.Element}
 */
const QuizUserInfo = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((prev) => !prev);

  return (
    <>
      <div className="quiz-user">
        <div className="user-avatar" onClick={toggleModal}>
          <FontAwesomeIcon icon={faUserCircle} />
        </div>

        <span className="user-name">
          {user ? user.displayName || user.email : 'Guest'}
        </span>
      </div>

      {showModal && <UserProfileModal onClose={toggleModal} />}
    </>
  );
};

export default QuizUserInfo;
