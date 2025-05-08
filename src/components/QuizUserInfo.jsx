import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './QuizUserInfo.css';

const QuizUserInfo = ({ user }) => (
  <div className="quiz-user">
    <div
      className="user-avatar"
      onClick={() => alert('User profile coming soon!')}
    >
      <FontAwesomeIcon icon={faUserCircle} />
    </div>
    <span className="user-name">
      {user ? user.displayName || user.email : 'Guest'}
    </span>
  </div>
);

export default QuizUserInfo;
