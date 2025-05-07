import React, { useEffect } from 'react';
import QuizLayout from '../components/QuizLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useQuiz } from '../hooks/useTriviaHooks'; // Adjust if renamed

const mockUser = {
  name: 'Guest',
  avatar: '👤', // Replace with real user data later
};

const Quiz = () => {
  const {
    currentQuestion,
    currentIndex,
    questions,
    score,
    loading,
    error,
    quizCompleted,
    loadQuiz,
    answerQuestion,
  } = useQuiz();

  useEffect(() => {
    loadQuiz(); // Fetch questions when component mounts
  }, [loadQuiz]);

  return (
    <QuizLayout>
      <div className="quiz-container">
        {/* 👤 Always visible user info */}
        <div className="quiz-user">
          <div
            className="user-avatar"
            onClick={() => alert('User profile coming soon!')}
          >
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
          <span className="user-name">{mockUser.name}</span>
        </div>

        {/* 🔄 Loading and error */}
        {loading && <p>Loading questions...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {/* 🧠 Active quiz */}
        {!loading && !error && currentQuestion && !quizCompleted && (
          <>
            <div className="quiz-meta">
              <span>
                Question {currentIndex + 1}/{questions.length}
              </span>
              <span>Score: {score}</span>
            </div>

            <h2 className="quiz-question">{currentQuestion.question}</h2>

            <div className="answers">
              {currentQuestion.allAnswers.map((answer, index) => (
                <button
                  key={index}
                  className="answer-button"
                  onClick={() => answerQuestion(answer)}
                >
                  {answer}
                </button>
              ))}
            </div>
          </>
        )}

        {/* 🎉 Quiz completed */}
        {quizCompleted && (
          <div className="quiz-complete">
            <h2>🎉 Great job!</h2>
            <p>
              You scored {score} out of {questions.length}.
            </p>
            <button className="answer-button" onClick={() => loadQuiz()}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </QuizLayout>
  );
};

export default Quiz;
