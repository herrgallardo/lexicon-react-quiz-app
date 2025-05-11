// This component displays a single quiz question with multiple answer choices
// It handles user selections, displays feedback, and communicates with parent components
import React, { useState, useRef } from 'react';
import './QuestionCard.css';

const QuestionCard = ({ question, onAnswer }) => {
  // State to track which answer the user has selected
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // State to track whether we should show answer feedback (correct/incorrect)
  const [showFeedback, setShowFeedback] = useState(false);

  // Store timeout ID in a ref so we can clear it if needed
  const timeoutRef = useRef(null);

  // Handler function that runs when a user clicks on an answer
  const handleAnswerClick = (answer) => {
    // If feedback is already showing, don't allow further selections
    if (showFeedback) return;

    // Store the user's selected answer in state
    setSelectedAnswer(answer);

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

    // Call the parent component's onAnswer function with the selected answer
    // This allows the parent to update score, move to next question, etc.
    onAnswer(selectedAnswer);

    // Reset our component state for the next question
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  // Determine if the selected answer is correct by comparing with question's correct_answer
  const isCorrect = selectedAnswer === question.correct_answer;

  // Letters for answer options
  const answerLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="question-card">
      {/* Main content including question and answers */}
      <div className="question-content">
        <h2
          className="quiz-question"
          dangerouslySetInnerHTML={{ __html: question.question }}
        />

        <div className="answers">
          {question.allAnswers.map((answer, index) => {
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
                <span
                  className="answer-text"
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
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
