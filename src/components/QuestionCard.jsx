// This component displays a single quiz question with multiple answer choices
// It handles user selections, displays feedback, and communicates with parent components
import React, { useState, useRef, useEffect } from 'react';
import './QuestionCard.css';

const QuestionCard = ({ question, onAnswer }) => {
  // State to track which answer the user has selected
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // State to track whether we should show answer feedback (correct/incorrect)
  const [showFeedback, setShowFeedback] = useState(false);

  // Store timeout ID in a ref so we can clear it if needed
  const timeoutRef = useRef(null);

  // Store the current answer in a ref so it's always available when needed
  const currentAnswerRef = useRef(null);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    currentAnswerRef.current = null;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [question]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []); // Empty dependency array is correct here for cleanup on unmount

  // Validate question prop AFTER all hooks are called
  if (
    !question ||
    !question.allAnswers ||
    !Array.isArray(question.allAnswers)
  ) {
    console.error('Invalid question prop:', question);
    return (
      <div className="question-card">
        <div className="question-content">
          <p>Error: Invalid question data</p>
        </div>
      </div>
    );
  }

  // Handler function that runs when a user clicks on an answer
  const handleAnswerClick = (answer) => {
    // If feedback is already showing, don't allow further selections
    if (showFeedback) return;

    // Store the user's selected answer in state AND ref
    setSelectedAnswer(answer);
    currentAnswerRef.current = answer; // This ensures we always have the answer available

    // Show feedback about whether the answer was correct
    setShowFeedback(true);

    // Set a timeout to automatically move to the next question after 3 seconds
    timeoutRef.current = setTimeout(() => {
      handleNextQuestion();
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  // Handler for the next question button
  const handleNextQuestion = () => {
    // Clear any existing timeout to prevent double-moves
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Use the ref value instead of state to ensure we have the correct answer
    const answerToSend = currentAnswerRef.current;

    // Call the parent component's onAnswer function with the selected answer
    // This allows the parent to update score, move to next question, etc.
    if (typeof onAnswer === 'function' && answerToSend !== null) {
      console.log('Sending answer to parent:', answerToSend);
      onAnswer(answerToSend);
    }

    // Reset our component state for the next question
    setSelectedAnswer(null);
    setShowFeedback(false);
    currentAnswerRef.current = null;
  };

  // Determine if the selected answer is correct by comparing with question's correct_answer
  const isCorrect = selectedAnswer === question.correct_answer;

  // Letters for answer options
  const answerLetters = ['A', 'B', 'C', 'D'];

  // Ensure we don't have more answers than letters
  const maxAnswers = Math.min(question.allAnswers.length, answerLetters.length);

  return (
    <div className="question-card">
      {/* Main content including question and answers */}
      <div className="question-content">
        <h2 className="quiz-question">
          {question.question || 'Question not available'}
        </h2>

        <div className="answers">
          {question.allAnswers.slice(0, maxAnswers).map((answer, index) => {
            let buttonClass = 'answer-button';
            if (showFeedback) {
              if (answer === question.correct_answer) {
                buttonClass += ' correct';
              } else if (selectedAnswer === answer) {
                buttonClass += ' incorrect';
              } else {
                buttonClass += ' faded';
              }
            }

            return (
              <button
                key={index}
                className={buttonClass}
                onClick={() => handleAnswerClick(answer)}
                disabled={showFeedback}
              >
                <span className="answer-letter">{answerLetters[index]}</span>
                <span className="answer-text">
                  {answer || 'Answer not available'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fixed spacing area that always exists */}
      <div className="feedback-spacing"></div>

      {/* Feedback container only appears after answering */}
      {showFeedback && (
        <div className="feedback-container">
          <div
            className={`feedback-text ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}
          >
            {isCorrect ? <span>✓ Correct!</span> : <span>✗ Incorrect</span>}
          </div>

          <button
            className="next-question-btn"
            onClick={handleNextQuestion}
            aria-label="Next Question"
          >
            <span className="next-text">Next</span>
            <span className="arrow-icon">→</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
