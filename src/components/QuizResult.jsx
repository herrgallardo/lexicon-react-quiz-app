// This component displays the final quiz results when a user completes all questions
// It shows the score, percentage, performance assessment, and options to play again
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faRedo, faCog } from '@fortawesome/free-solid-svg-icons';
import './QuizResult.css';

const QuizResult = ({ score, totalQuestions, onPlayAgain, onNewQuiz, user }) => {
  // Calculate the percentage score and round to nearest integer
  const percentage = Math.round((score / totalQuestions) * 100);

  // Determine performance level text and CSS class based on percentage score
  let performanceText = '';
  let performanceClass = '';

  if (percentage >= 90) {
    performanceText = 'Outstanding!';
    performanceClass = 'outstanding';
  } else if (percentage >= 70) {
    performanceText = 'Great job!';
    performanceClass = 'great';
  } else if (percentage >= 50) {
    performanceText = 'Good effort!';
    performanceClass = 'good';
  } else {
    performanceText = 'Keep practicing!';
    performanceClass = 'practice';
  }

  // Plocka namn från email
  const username = user && user.email ? user.email.split('@')[0] : "Guest";

  return (
    <div className="quiz-result">
      {/* Trophy icon at top of results */}
      <div className="result-trophy">
        <FontAwesomeIcon icon={faTrophy} />
      </div>

      {/* Visa användarnamn */}
      <div className="result-username">
        {username}
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
        <button onClick={onPlayAgain} className="play-again-btn">
          <FontAwesomeIcon icon={faRedo} /> Play Again
        </button>
        <button onClick={onNewQuiz} className="new-quiz-btn">
          <FontAwesomeIcon icon={faCog} /> New Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizResult;