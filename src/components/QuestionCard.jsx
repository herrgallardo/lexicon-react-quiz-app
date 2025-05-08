// This component displays a single quiz question with multiple answer choices
// It handles user selections, displays feedback, and communicates with parent components
import React, { useState } from 'react';
import './QuestionCard.css';

const QuestionCard = ({ question, onAnswer }) => {
  // State to track which answer the user has selected
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // State to track whether we should show answer feedback (correct/incorrect)
  const [showFeedback, setShowFeedback] = useState(false);

  // Handler function that runs when a user clicks on an answer
  const handleAnswerClick = (answer) => {
    // If feedback is already showing, don't allow further selections
    if (showFeedback) return;

    // Store the user's selected answer in state
    setSelectedAnswer(answer);

    // Show feedback about whether the answer was correct
    setShowFeedback(true);

    // Wait 3 seconds before moving to the next question to give time to see feedback
    // This uses setTimeout to create a delay
    setTimeout(() => {
      // Call the parent component's onAnswer function with the selected answer
      // This allows the parent to update score, move to next question, etc.
      onAnswer(answer);

      // Reset our component state for the next question
      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  // Determine if the selected answer is correct by comparing with question's correct_answer
  const isCorrect = selectedAnswer === question.correct_answer;

  return (
    <div className="question-card">
      {/* Display the question text - using dangerouslySetInnerHTML because the API 
          sometimes returns HTML entities that need to be rendered properly */}
      <h2
        className="quiz-question"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />

      {/* Container for all answer buttons */}
      <div className="answers">
        {/* Map over each possible answer to create a button */}
        {question.allAnswers.map((answer, index) => {
          // Define the CSS class for the button based on state
          let buttonClass = 'answer-button';

          // If showing feedback, add appropriate classes based on correctness
          if (showFeedback) {
            if (answer === question.correct_answer) {
              // Always highlight the correct answer in green
              buttonClass += ' correct';
            } else if (selectedAnswer === answer) {
              // If this is the user's selection and it's wrong, highlight in red
              buttonClass += ' incorrect';
            } else {
              // Fade out other answer options
              buttonClass += ' faded';
            }
          }

          return (
            <button
              key={index} // React needs unique keys when mapping over items
              className={buttonClass}
              onClick={() => handleAnswerClick(answer)} // Call handler with this answer
              disabled={showFeedback} // Disable button while showing feedback
              dangerouslySetInnerHTML={{ __html: answer }} // Render HTML entities in answer
            />
          );
        })}
      </div>

      {/* Show text feedback when an answer is selected */}
      {showFeedback && (
        <div className="feedback-text">
          {isCorrect ? (
            // If correct, show green checkmark and "Correct!" message
            <span className="correct-feedback">✓ Correct!</span>
          ) : (
            // If incorrect, show red X and "Incorrect" message
            <span className="incorrect-feedback">✗ Incorrect</span>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
