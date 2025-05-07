import { useState, useEffect, useCallback } from 'react';
import {
  fetchQuizQuestions,
  fetchCategories,
  getValidToken,
  DIFFICULTY,
  QUESTION_TYPE,
} from '../services/triviaService';

/**
 * Custom hook to fetch and manage quiz questions
 */
export const useQuiz = (initialOptions = {}) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizOptions, setQuizOptions] = useState({
    amount: 10,
    category: '',
    difficulty: DIFFICULTY.MEDIUM,
    type: QUESTION_TYPE.MULTIPLE,
    ...initialOptions,
  });

  // Load quiz questions
  const loadQuiz = useCallback(
    async (options = {}) => {
      setLoading(true);
      setError(null);
      setQuestions([]);
      setCurrentIndex(0);
      setScore(0);
      setQuizCompleted(false);

      // Update options if provided
      if (Object.keys(options).length > 0) {
        setQuizOptions((prev) => ({ ...prev, ...options }));
      }

      try {
        // Get a valid token to avoid duplicate questions
        const token = await getValidToken();

        // Fetch questions with current options
        const fetchOptions = {
          ...quizOptions,
          ...options,
          token,
        };

        const data = await fetchQuizQuestions(fetchOptions);
        setQuestions(data);
      } catch (err) {
        setError(err.message || 'Failed to load quiz questions');
      } finally {
        setLoading(false);
      }
    },
    [quizOptions]
  );

  // Handle answering a question
  const answerQuestion = useCallback(
    (answer) => {
      if (currentIndex >= questions.length || quizCompleted) return;

      const currentQuestion = questions[currentIndex];
      const isCorrect = answer === currentQuestion.correct_answer;

      // Update score
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      // Move to next question or complete quiz
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setQuizCompleted(true);
      }

      return isCorrect;
    },
    [currentIndex, questions, quizCompleted]
  );

  // Reset the quiz
  const resetQuiz = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setQuizCompleted(false);
  }, []);

  // Get current question
  const currentQuestion = questions[currentIndex];

  // Calculate progress
  const progress = questions.length
    ? (currentIndex / questions.length) * 100
    : 0;

  return {
    questions,
    currentQuestion,
    currentIndex,
    score,
    loading,
    error,
    quizCompleted,
    quizOptions,
    progress,
    loadQuiz,
    answerQuestion,
    resetQuiz,
    setQuizOptions,
  };
};

/**
 * Custom hook to fetch and manage quiz categories
 */
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load categories
  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    error,
    loadCategories,
  };
};
