// src/components/QuizMeta.jsx
import React from 'react';
import './QuizMeta.css';

const QuizMeta = ({ currentIndex, score }) => {
  const totalQuestions = 10; // Hardcoded value

  return (
    <div className="quiz-meta">
      <span>
        Question {currentIndex + 1}/{totalQuestions}
      </span>
      <span>Score: {score}</span>
    </div>
  );
};

export default QuizMeta;
