const AnswerButtons = ({ answers, onAnswer }) => (
  <div className="answers">
    {answers.map((answer, index) => (
      <button
        key={index}
        className="answer-button"
        onClick={() => onAnswer(answer)}
      >
        {answer}
      </button>
    ))}
  </div>
);

export default AnswerButtons;
