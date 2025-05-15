// QuizTimer.jsx
import { useEffect, useState } from 'react';
import './QuizTimer.css';

const QuizTimer = ({ duration, onTimeUp, keyTrigger }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [keyTrigger, duration, onTimeUp]);

  const progressPercent = (timeLeft / duration) * 100;
  const isWarning = timeLeft <= duration * 0.5;
  const isCritical = timeLeft <= duration * 0.2;
  const isFinalCountdown = timeLeft <= 3;

  return (
    <div 
      className={`quiz-timer ${isWarning ? 'warning' : ''}`}
      data-critical={isCritical ? 'true' : 'false'}
      data-final={isFinalCountdown ? 'true' : 'false'}
    >
      <div className="timer-text">{timeLeft} seconds remaining</div>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuizTimer;