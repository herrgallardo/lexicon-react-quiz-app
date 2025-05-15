// This component displays quiz progress information to the user
// It shows the current question number, total questions, score, and a visual progress bar
// Now also includes the circular timer between question count and score
import React from 'react';
import QuizTimer from './QuizTimer';
import './QuizProgress.css';

const QuizProgress = ({
  currentIndex,
  totalQuestions,
  score,
  timerDuration,
  onTimeUp,
  timerResetTrigger,
}) => {
  // Validate props to prevent edge cases
  const validCurrentIndex = Math.max(
    0,
    Math.min(currentIndex, totalQuestions - 1)
  );
  const validScore = Math.max(0, Math.min(score, totalQuestions));
  const validTotalQuestions = Math.max(1, totalQuestions);

  // Calculate the percentage of questions completed for the progress bar
  // This turns the question index (which starts at 0) into a percentage value
  // For example, if we're on question 5 out of 10, this will be 50%
  const progressPercentage = (validCurrentIndex / validTotalQuestions) * 100;

  // Ensure progress percentage is within valid range
  const clampedProgressPercentage = Math.max(
    0,
    Math.min(100, progressPercentage)
  );

  return (
    <div className="quiz-progress">
      {/* Top section with question count, timer, and score information */}
      <div className="quiz-stats">
        {/* Left side - shows current question number and total questions */}
        <div className="question-count">
          <span>Question</span>
          {/* Add 1 to currentIndex because array indexes start at 0 but question numbers start at 1 */}
          <strong>
            {validCurrentIndex + 1} / {validTotalQuestions}
          </strong>
        </div>

        {/* Center - Circular Timer */}
        {timerDuration && onTimeUp && (
          <QuizTimer
            duration={timerDuration}
            onTimeUp={onTimeUp}
            resetTrigger={timerResetTrigger}
          />
        )}

        {/* Right side - shows current score and total possible score */}
        <div className="score-display">
          <span>Score</span>
          <strong>
            {validScore} / {validTotalQuestions}
          </strong>
        </div>
      </div>

      {/* Progress bar visualizing quiz completion percentage */}
      <div className="progress-bar-container">
        {/* The filled portion of the progress bar
            Uses dynamic inline style to set width based on calculated percentage */}
        <div
          className="progress-bar-fill"
          style={{ width: `${clampedProgressPercentage}%` }}
        ></div>
        {/* The progress-bar-fill::after pseudo-element (defined in CSS) 
            creates the animated shine effect across the bar */}
      </div>
    </div>
  );
};

export default QuizProgress;