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

  // Effect to validate state consistency
  useEffect(() => {
    // Ensure current index is within bounds
    if (
      questions.length > 0 &&
      currentIndex >= questions.length &&
      !quizCompleted
    ) {
      console.warn('Current index out of bounds, completing quiz');
      setQuizCompleted(true);
    }

    // Ensure current index is not negative
    if (currentIndex < 0) {
      console.warn('Current index is negative, resetting to 0');
      setCurrentIndex(0);
    }

    // Ensure score is not negative
    if (score < 0) {
      console.warn('Score is negative, resetting to 0');
      setScore(0);
    }

    // Ensure score doesn't exceed total questions
    if (score > questions.length) {
      console.warn('Score exceeds total questions, capping to total');
      setScore(questions.length);
    }
  }, [currentIndex, questions.length, quizCompleted, score]);

  // Function to safely set questions with validation
  const safeSetQuestions = useCallback((newQuestions) => {
    if (!Array.isArray(newQuestions)) {
      console.error('Attempted to set non-array as questions');
      return;
    }

    // Validate that each question has required properties
    const validQuestions = newQuestions.filter(
      (question) =>
        question &&
        question.question &&
        question.correct_answer &&
        Array.isArray(question.incorrect_answers) &&
        Array.isArray(question.allAnswers)
    );

    if (validQuestions.length !== newQuestions.length) {
      console.warn(
        `Filtered ${newQuestions.length - validQuestions.length} invalid questions`
      );
    }

    setQuestions(validQuestions);
  }, []);

  // Function to safely set current index with validation
  const safeSetCurrentIndex = useCallback((newIndex) => {
    if (typeof newIndex !== 'number' || newIndex < 0) {
      console.error('Invalid current index:', newIndex);
      return;
    }
    setCurrentIndex(newIndex);
  }, []);

  // Function to safely set score with validation
  const safeSetScore = useCallback((newScore) => {
    if (typeof newScore !== 'number' || newScore < 0) {
      console.error('Invalid score:', newScore);
      return;
    }
    console.log('Setting score to:', newScore);
    setScore(newScore);
  }, []);

  // Function to safely set quiz completed with validation
  const safeSetQuizCompleted = useCallback((completed) => {
    if (typeof completed !== 'boolean') {
      console.error('Invalid quiz completed value:', completed);
      return;
    }
    setQuizCompleted(completed);
  }, []);

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

        // Validate the received data
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No questions received from API');
        }

        // Update questions state with fetched data
        safeSetQuestions(data);
      } catch (err) {
        // Store error message if something goes wrong
        setError(err.message || 'Failed to load quiz questions');

        // Reset state on error
        setQuestions([]);
        setCurrentIndex(0);
        setScore(0);
        setQuizCompleted(false);
      } finally {
        // Turn off loading state when done (success or error)
        setLoading(false);
      }
    },
    [quizOptions, safeSetQuestions]
  );

  // Function to handle when a user answers a question
  const answerQuestion = useCallback(
    (answer) => {
      console.log('answerQuestion called with:', answer);
      console.log(
        'Current state - questions:',
        questions.length,
        'currentIndex:',
        currentIndex,
        'quizCompleted:',
        quizCompleted
      );

      // Don't proceed if we're at the end or quiz is already completed
      if (
        currentIndex >= questions.length ||
        quizCompleted ||
        questions.length === 0
      ) {
        console.warn('Answer attempt when quiz is completed or invalid');
        return;
      }

      // Get the current question object
      const currentQuestion = questions[currentIndex];

      // Validate current question exists
      if (!currentQuestion) {
        console.error('No current question found at index:', currentIndex);
        setQuizCompleted(true);
        return;
      }

      console.log('Current question:', currentQuestion);
      console.log('User answer:', answer);
      console.log('Correct answer:', currentQuestion.correct_answer);

      // Check if the answer is correct
      const isCorrect = answer === currentQuestion.correct_answer;
      console.log('Is correct?', isCorrect);

      // Update score if answer is correct
      if (isCorrect) {
        console.log(
          'Answer is correct! Updating score from',
          score,
          'to',
          score + 1
        );
        setScore((prev) => {
          console.log(
            'Score setter: previous value:',
            prev,
            'new value:',
            prev + 1
          );
          return prev + 1;
        });
      } else {
        console.log('Answer is incorrect. Score remains:', score);
      }

      // Move to next question or complete quiz if at the end
      if (currentIndex < questions.length - 1) {
        console.log('Moving to next question');
        setCurrentIndex((prev) => prev + 1);
      } else {
        console.log('Quiz completed!');
        setQuizCompleted(true);
      }

      // Return whether answer was correct (for potential use by caller)
      return isCorrect;
    },
    [currentIndex, questions, quizCompleted, score]
  );

  // Function to reset the quiz state
  const resetQuiz = useCallback(() => {
    setCurrentIndex(0); // Back to first question
    setScore(0); // Reset score to zero
    setQuizCompleted(false); // Mark quiz as not completed
    setError(null); // Clear any errors
  }, []);

  // Get the current question object safely
  const currentQuestion = questions[currentIndex] || null;

  // Calculate progress percentage
  const progress = questions.length
    ? (currentIndex / questions.length) * 100
    : 0;

  // Log current score for debugging
  useEffect(() => {
    console.log('Current score state:', score);
  }, [score]);

  // Return all state and functions needed by components
  return {
    questions,
    setQuestions: safeSetQuestions, // Use safe setter
    currentQuestion,
    currentIndex,
    setCurrentIndex: safeSetCurrentIndex, // Use safe setter
    score,
    setScore: safeSetScore, // Use safe setter
    loading,
    error,
    quizCompleted,
    setQuizCompleted: safeSetQuizCompleted, // Use safe setter
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

      // Validate the received data
      if (!Array.isArray(data)) {
        throw new Error('Invalid categories data received');
      }

      // Update categories state with fetched data
      setCategories(data);
    } catch (err) {
      // Store error message if something goes wrong
      setError(err.message || 'Failed to load categories');

      // Reset categories on error
      setCategories([]);
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
