import React, { useEffect, useContext, useState } from 'react';
import QuizLayout from '../components/QuizLayout';
import QuizUserInfo from '../components/QuizUserInfo';
import QuizMeta from '../components/QuizMeta';
import AnswerButtons from '../components/AnswerButtons';
import QuizComplete from '../components/QuizComplete';
import Leaderboard from '../components/Leaderboard';
import { useQuiz } from '../hooks/useTriviaHooks';
import { AuthContext } from '../context/AuthContext';
import { saveScore, getTopScores } from '../services/firestoreService';

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

  const { user } = useContext(AuthContext);
  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    loadQuiz();
    (async () => {
      const scores = await getTopScores();
      setTopScores(scores);
    })();
  }, [loadQuiz]);

  useEffect(() => {
    if (quizCompleted && user) {
      saveScore({ userId: user.uid, email: user.email, score });
    }
  }, [quizCompleted, user, score]);

  const handlePlayAgain = async () => {
    await saveScore({ userId: user.uid, email: user.email, score });
    const latestTopScores = await getTopScores();
    setTopScores(latestTopScores);
    loadQuiz();
  };

  return (
    <QuizLayout>
      <div className="quiz-container">
        <QuizUserInfo user={user} />

        {loading && <p>Loading questions...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading &&
          !error &&
          currentQuestion &&
          !quizCompleted &&
          questions.length > 0 && (
            <>
              <QuizMeta
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                score={score}
              />
              <h2 className="quiz-question">{currentQuestion.question}</h2>
              <AnswerButtons
                answers={currentQuestion.allAnswers}
                onAnswer={answerQuestion}
              />
            </>
          )}

        {quizCompleted && (
          <QuizComplete
            score={score}
            total={questions.length}
            user={user}
            onPlayAgain={handlePlayAgain}
          />
        )}

        <div className="leaderboard-container">
          <Leaderboard scores={topScores} />
        </div>
      </div>
    </QuizLayout>
  );
};

export default Quiz;
