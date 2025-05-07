// src/components/QuizLayout.jsx

import React from 'react';
import './QuizLayout.css'; // Layout-specific styling for quiz pages
import Footer from './Footer';

/**
 * QuizLayout Component
 * ---------------------
 * A reusable wrapper that centers quiz content on the screen
 * and applies consistent layout styles via `quiz-layout` and `quiz-container` classes.
 *
 * Usage:
 * Wrap page content like <Quiz />, <Result /> inside this layout
 * to ensure consistent structure and design.
 */
const QuizLayout = ({ children }) => {
  return (
    <div className="quiz-layout">
      <div className="quiz-container">{children}</div>
    </div>
  );
};

export default QuizLayout;
