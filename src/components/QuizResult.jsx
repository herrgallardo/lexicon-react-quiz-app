// This component displays the final quiz results when a user completes all questions
// It shows the score, percentage, performance assessment, and options to play again
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faRedo, faCog } from '@fortawesome/free-solid-svg-icons';
import './QuizResult.css';

const QuizResult = ({ score, totalQuestions, onPlayAgain, onNewQuiz }) => {
  // Calculate the percentage score and round to nearest integer
  // For example, 7 correct out of 10 questions = 70%
  const percentage = Math.round((score / totalQuestions) * 100);

  // Determine performance level text and CSS class based on percentage score
  // This sets encouraging messages based on how well the user did
  let performanceText = '';
  let performanceClass = '';

  // Assign different messages and classes based on score ranges
  if (percentage >= 90) {
    // 90-100% score
    performanceText = 'Outstanding!';
    performanceClass = 'outstanding';
  } else if (percentage >= 70) {
    // 70-89% score
    performanceText = 'Great job!';
    performanceClass = 'great';
  } else if (percentage >= 50) {
    // 50-69% score
    performanceText = 'Good effort!';
    performanceClass = 'good';
  } else {
    // Below 50% score
    performanceText = 'Keep practicing!';
    performanceClass = 'practice';
  }

  return (
    <div className="quiz-result">
      {/* Trophy icon at top of results */}
      <div className="result-trophy">
        <FontAwesomeIcon icon={faTrophy} />
      </div>

      {/* Performance message with dynamic class for color styling */}
      <h2 className={`result-title ${performanceClass}`}>{performanceText}</h2>

      {/* Score summary section */}
      <div className="score-summary">
        {/* Large percentage display */}
        <div className="percentage">
          <span className="percent-value">{percentage}%</span>
          <span className="percent-label">Score</span>
        </div>

        {/* Detailed score breakdown */}
        <div className="score-detail">
          You answered <strong>{score}</strong> out of{' '}
          <strong>{totalQuestions}</strong> questions correctly
        </div>
      </div>

      {/* Action buttons for continuing */}
      <div className="action-buttons">
        {/* Play again button - uses same quiz settings */}
        <button onClick={onPlayAgain} className="play-again-btn">
          <FontAwesomeIcon icon={faRedo} /> Play Again
        </button>

        {/* New quiz button - returns to quiz setup screen */}
        <button onClick={onNewQuiz} className="new-quiz-btn">
          <FontAwesomeIcon icon={faCog} /> New Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
