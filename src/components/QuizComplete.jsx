const QuizComplete = ({ score, total, user, onPlayAgain }) => (
  <div className="quiz-complete">
    <h2>Great job!</h2>
    <p>
      You scored {score} out of {total}.
    </p>
    {user && (
      <button className="answer-button" onClick={onPlayAgain}>
        Play Again
      </button>
    )}
  </div>
);

export default QuizComplete;
