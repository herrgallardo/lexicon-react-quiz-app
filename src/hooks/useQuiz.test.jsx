import React, { useEffect } from 'react';
import { useQuiz } from './useTriviaHooks';

const TestUseQuiz = () => {
  const { questions, currentQuestion, loading, error, loadQuiz } = useQuiz();

  useEffect(() => {
    loadQuiz(); // Trigger the quiz fetch on mount
  }, [loadQuiz]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Testing useQuiz Hook</h2>
      {currentQuestion && <pre>{JSON.stringify(currentQuestion, null, 2)}</pre>}
    </div>
  );
};

export default TestUseQuiz;
