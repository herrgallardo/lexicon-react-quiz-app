// QuizTimer.jsx
import { useEffect, useState } from 'react';
import './QuizTimer.css';

const QuizTimer = ({ duration, onTimeUp, resetTrigger }) => {
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
  }, [resetTrigger, duration, onTimeUp]);

  const progressPercent = (timeLeft / duration) * 100;
  const isWarning = timeLeft <= duration * 0.5;
  const isCritical = timeLeft <= duration * 0.2;
  const isFinalCountdown = timeLeft <= 10; // Last 10 seconds for total quiz

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`quiz-timer ${isWarning ? 'warning' : ''}`}
      data-critical={isCritical ? 'true' : 'false'}
      data-final={isFinalCountdown ? 'true' : 'false'}
    >
      <div className="circular-timer">
        <svg className="circular-progress" viewBox="0 0 120 120">
          <defs>
            <linearGradient
              id="normalGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#4ce1b6" />
              <stop offset="100%" stopColor="#4a90e2" />
            </linearGradient>
            <linearGradient
              id="warningGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#ffcc00" />
              <stop offset="100%" stopColor="#ff9500" />
            </linearGradient>
            <linearGradient
              id="criticalGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#ff9500" />
              <stop offset="100%" stopColor="#ff3b30" />
            </linearGradient>
          </defs>
          <circle
            className="circular-progress-background"
            cx="60"
            cy="60"
            r="54"
          />
          <circle
            className="circular-progress-bar"
            cx="60"
            cy="60"
            r="54"
            style={{
              strokeDasharray: `${2 * Math.PI * 54}`,
              strokeDashoffset: `${2 * Math.PI * 54 * (1 - progressPercent / 100)}`,
            }}
          />
        </svg>
        <div className="timer-text">{formatTime(timeLeft)}</div>
      </div>
    </div>
  );
};

export default QuizTimer;