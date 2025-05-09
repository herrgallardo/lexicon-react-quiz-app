// Custom hooks for managing trivia quiz functionality
// Provides state management and API interactions for quiz questions and categories
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
 * Handles loading questions, tracking progress, scoring, and quiz state
 */
export const useQuiz = (initialOptions = {}) => {
  // State for storing quiz questions
  const [questions, setQuestions] = useState([]);

  // State for tracking current question index
  const [currentIndex, setCurrentIndex] = useState(0);

  // State for tracking user score
  const [score, setScore] = useState(0);

  // State for tracking loading status
  const [loading, setLoading] = useState(false);

  // State for tracking errors
  const [error, setError] = useState(null);

  // State for tracking quiz completion
  const [quizCompleted, setQuizCompleted] = useState(false);

  // State for storing quiz configuration options
  const [quizOptions, setQuizOptions] = useState({
    amount: 10, // Default number of questions
    category: '', // Default category (empty means any)
    difficulty: DIFFICULTY.MEDIUM, // Default difficulty level
    type: QUESTION_TYPE.MULTIPLE, // Default question type
    ...initialOptions, // Apply any initial options
  });

  // Function to load quiz questions from the API
  const loadQuiz = useCallback(
    async (options = {}) => {
      // Set loading state to show spinner
      setLoading(true);

      // Reset any previous errors
      setError(null);

      // Reset questions array
      setQuestions([]);

      // Reset to first question
      setCurrentIndex(0);

      // Reset score to zero
      setScore(0);

      // Reset completed state
      setQuizCompleted(false);

      // Update options if provided in the function call
      if (Object.keys(options).length > 0) {
        setQuizOptions((prev) => ({ ...prev, ...options }));
      }

      try {
        // Get a valid session token to avoid duplicate questions
        const token = await getValidToken();

        // Combine current options with any newly provided options
        const fetchOptions = {
          ...quizOptions,
          ...options,
          token,
        };

        // Fetch questions from the API
        const data = await fetchQuizQuestions(fetchOptions);

        // Update questions state with fetched data
        setQuestions(data);
      } catch (err) {
        // Store error message if something goes wrong
        setError(err.message || 'Failed to load quiz questions');
      } finally {
        // Turn off loading state when done (success or error)
        setLoading(false);
      }
    },
    [quizOptions]
  );

  // Function to handle when a user answers a question
  const answerQuestion = useCallback(
    (answer) => {
      // Don't proceed if we're at the end or quiz is already completed
      if (currentIndex >= questions.length || quizCompleted) return;

      // Get the current question object
      const currentQuestion = questions[currentIndex];

      // Check if the answer is correct
      const isCorrect = answer === currentQuestion.correct_answer;

      // Update score if answer is correct
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      // Move to next question or complete quiz if at the end
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setQuizCompleted(true);
      }

      // Return whether answer was correct (for potential use by caller)
      return isCorrect;
    },
    [currentIndex, questions, quizCompleted]
  );

  // Function to reset the quiz state
  const resetQuiz = useCallback(() => {
    setCurrentIndex(0); // Back to first question
    setScore(0); // Reset score to zero
    setQuizCompleted(false); // Mark quiz as not completed
  }, []);

  // Get the current question object
  const currentQuestion = questions[currentIndex];

  // Calculate progress percentage
  const progress = questions.length
    ? (currentIndex / questions.length) * 100
    : 0;

  // Return all state and functions needed by components
  return {
    questions,
    setQuestions, // Added to allow manual setting of questions
    currentQuestion,
    currentIndex,
    setCurrentIndex, // Added to allow manual setting of current index
    score,
    setScore, // Added to allow manual setting of score
    loading,
    error,
    quizCompleted,
    setQuizCompleted, // Added to allow manual setting of completed state
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
 * Handles loading categories from the API
 */
export const useCategories = () => {
  // State for storing available categories
  const [categories, setCategories] = useState([]);

  // State for tracking loading status
  const [loading, setLoading] = useState(false);

  // State for tracking errors
  const [error, setError] = useState(null);

  // Function to load categories from the API
  const loadCategories = useCallback(async () => {
    // Set loading state to true
    setLoading(true);

    // Reset any previous errors
    setError(null);

    try {
      // Fetch categories from the API
      const data = await fetchCategories();

      // Update categories state with fetched data
      setCategories(data);
    } catch (err) {
      // Store error message if something goes wrong
      setError(err.message || 'Failed to load categories');
    } finally {
      // Turn off loading state when done (success or error)
      setLoading(false);
    }
  }, []);

  // Load categories automatically when hook is first used
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // Return state and functions needed by components
  return {
    categories,
    loading,
    error,
    loadCategories,
  };
};
