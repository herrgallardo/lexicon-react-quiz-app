// This component displays quiz progress information to the user
// It shows the current question number, total questions, score, and a visual progress bar
import React from 'react';
import './QuizProgress.css';

const QuizProgress = ({ currentIndex, totalQuestions, score }) => {
  // Calculate the percentage of questions completed for the progress bar
  // This turns the question index (which starts at 0) into a percentage value
  // For example, if we're on question 5 out of 10, this will be 50%
  const progressPercentage = (currentIndex / totalQuestions) * 100;

  return (
    <div className="quiz-progress">
      {/* Top section with question count and score information */}
      <div className="quiz-stats">
        {/* Left side - shows current question number and total questions */}
        <div className="question-count">
          <span>Question</span>
          {/* Add 1 to currentIndex because array indexes start at 0 but question numbers start at 1 */}
          <strong>
            {currentIndex + 1} / {totalQuestions}
          </strong>
        </div>

        {/* Right side - shows current score and total possible score */}
        <div className="score-display">
          <span>Score</span>
          <strong>
            {score} / {totalQuestions}
          </strong>
        </div>
      </div>

      {/* Progress bar visualizing quiz completion percentage */}
      <div className="progress-bar-container">
        {/* The filled portion of the progress bar
            Uses dynamic inline style to set width based on calculated percentage */}
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        {/* The progress-bar-fill::after pseudo-element (defined in CSS) 
            creates the animated shine effect across the bar */}
      </div>
    </div>
  );
};

export default QuizProgress;
