// This is the main Quiz page component that coordinates the entire quiz experience
// It manages the quiz state, renders different components based on the quiz stage,
// and handles interaction with Firebase for user authentication and score saving
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizLayout from '../components/QuizLayout';
import QuizSetup from '../components/QuizSetup';
import QuestionCard from '../components/QuestionCard';
import QuizProgress from '../components/QuizProgress';
import QuizResult from '../components/QuizResult';
import Leaderboard from '../components/Leaderboard';
import ConfirmationModal from '../components/ConfirmationModal';
import { useQuiz } from '../hooks/useTriviaHooks';
import { AuthContext } from '../context/AuthContext';
import { saveScore, getTopScores } from '../services/firestoreService';
import './Quiz.css';
import QuizTimer from '../components/QuizTimer';

// Storage key for saving quiz state to localStorage
const QUIZ_STATE_KEY = 'lexicon_quiz_state';

const Quiz = () => {
  // The useQuiz hook provides all the quiz functionality
  // It manages questions, tracking score, loading questions, etc.
  const {
    questions, // Array of quiz questions
    currentQuestion, // Current question object being displayed
    currentIndex, // Index of the current question (0-based)
    score, // Current user score (number of correct answers)
    loading, // Boolean indicating if questions are being loaded
    error, // Error message if something goes wrong
    quizCompleted, // Boolean indicating if all questions have been answered
    quizOptions, // Object containing the current quiz settings
    loadQuiz, // Function to load new questions with given options
    answerQuestion, // Function to handle when user answers a question
    resetQuiz, // Function to reset the quiz state
    setQuestions, // Function to manually set questions array
    setCurrentIndex, // Function to manually set current question index
    setScore, // Function to manually set current score
    setQuizCompleted, // Function to manually set quiz completed state
  } = useQuiz();

  // Get the currently authenticated user from the AuthContext
  const { user, authInitialized } = useContext(AuthContext);

  // State for storing top scores from the leaderboard
  const [topScores, setTopScores] = useState([]);

  // State to track whether quiz has been started (vs setup screen)
  const [quizStarted, setQuizStarted] = useState(false);

  // State to toggle leaderboard visibility
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // State to track initial load status to prevent restoration during active quiz
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // State to control confirmation modal visibility
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Hook for programmatic navigation between routes
  const navigate = useNavigate();

  // Helper function to get a stable user identifier
  const getUserKey = useCallback((user) => {
    return user?.email || user?.uid || 'anonymous';
  }, []);

  // Effect to check if user is logged in and redirect if not
  // This runs when the component mounts and whenever user or authInitialized changes
  useEffect(() => {
    // Only redirect if Firebase auth has finished initializing
    if (authInitialized && !user) {
      // If no user is authenticated, redirect to auth page
      navigate('/login');
    }
  }, [user, authInitialized, navigate]);

  // Effect to load quiz state from localStorage when component mounts
  useEffect(() => {
    const restoreQuizState = () => {
      // Prevent restoration if quiz is already active with questions
      if (quizStarted && questions.length > 0) {
        console.log('Quiz already active, skipping restoration');
        setInitialLoadComplete(true);
        return;
      }

      try {
        // Try to get saved quiz state from localStorage
        const savedState = localStorage.getItem(QUIZ_STATE_KEY);

        if (savedState) {
          const parsedState = JSON.parse(savedState);

          // Validate the saved state more thoroughly
          if (
            parsedState.questions &&
            parsedState.questions.length > 0 &&
            parsedState.userId === getUserKey(user) &&
            typeof parsedState.currentIndex === 'number' &&
            parsedState.currentIndex >= 0 &&
            parsedState.currentIndex < parsedState.questions.length
          ) {
            // Restore all quiz state from localStorage
            setQuestions(parsedState.questions);
            setCurrentIndex(parsedState.currentIndex);
            setScore(parsedState.score);
            setQuizCompleted(parsedState.quizCompleted);
            setQuizStarted(parsedState.quizStarted);

            console.log('Restored quiz state from localStorage');
          } else {
            console.log('Invalid saved state found, clearing localStorage');
            localStorage.removeItem(QUIZ_STATE_KEY);
          }
        }
      } catch (error) {
        console.error('Error restoring quiz state:', error);
        // If there's an error, clear localStorage to prevent future issues
        localStorage.removeItem(QUIZ_STATE_KEY);
      } finally {
        setInitialLoadComplete(true);
      }
    };

    // Only restore state if user is logged in and initial load isn't complete
    if (user && !initialLoadComplete) {
      restoreQuizState();
    }
  }, [
    user,
    quizStarted,
    questions.length,
    initialLoadComplete,
    setQuestions,
    setCurrentIndex,
    setScore,
    setQuizCompleted,
    setQuizStarted,
    getUserKey,
  ]);

  // Effect to save quiz state to localStorage whenever relevant state changes
  useEffect(() => {
    // Only save state if quiz has started and user is logged in
    if (quizStarted && user && questions.length > 0) {
      const stateToSave = {
        questions,
        currentIndex,
        score,
        quizCompleted,
        quizStarted,
        quizOptions,
        userId: getUserKey(user), // Save user identifier to verify ownership on reload
        timestamp: Date.now(), // For potential expiration checks
      };

      localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(stateToSave));
      console.log('Saved quiz state to localStorage');
    }
  }, [
    quizStarted,
    questions,
    currentIndex,
    score,
    quizCompleted,
    quizOptions,
    user,
    getUserKey,
  ]);

  // Effect to load top scores from Firebase when component mounts
  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        // Get top scores from Firestore database
        const scores = await getTopScores();
        // Update component state with the scores
        setTopScores(scores);
      } catch (error) {
        console.error('Error fetching top scores:', error);
      }
    };
    fetchTopScores();
  }, []);

  // Effect to save the user's score when quiz is completed
  // This runs whenever quizCompleted, user, score, or questions.length changes
  useEffect(() => {
    // Only save score if quiz is completed, user is logged in, and there were questions
    if (quizCompleted && user && questions.length > 0) {
      // Save to Firestore database
      saveScore({
        userId: user.uid,
        email: user.email,
        displayName: user.displayName || user.email,
        score,
      }).catch((error) => {
        console.error('Error saving score:', error);
      });

      // Clear localStorage when quiz is completed
      localStorage.removeItem(QUIZ_STATE_KEY);
    }
  }, [quizCompleted, user, score, questions.length]);

  // Effect to reset question answered state when question changes
  useEffect(() => {
    // This could be used for per-question timers if implemented
  }, [currentIndex]);

  // Validate current state to prevent edge cases
  useEffect(() => {
    // If we have questions but current index is out of bounds, complete the quiz
    if (
      questions.length > 0 &&
      currentIndex >= questions.length &&
      !quizCompleted
    ) {
      console.warn('Current index out of bounds, completing quiz');
      setQuizCompleted(true);
    }

    // If quiz is started but no questions, reset to setup
    if (quizStarted && questions.length === 0 && !loading && !error) {
      console.warn('Quiz started but no questions available, resetting');
      setQuizStarted(false);
      resetQuiz();
    }
  }, [
    questions.length,
    currentIndex,
    quizCompleted,
    quizStarted,
    loading,
    error,
    resetQuiz,
    setQuizCompleted,
    setQuizStarted,
  ]);

  // Handler for when user starts the quiz with selected options
  const handleStartQuiz = (options) => {
    // Clear any existing quiz state in localStorage
    localStorage.removeItem(QUIZ_STATE_KEY);

    // Load new questions with the selected options
    loadQuiz(options);
    // Update state to show questions instead of setup screen
    setQuizStarted(true);
    // Hide leaderboard when starting quiz
    setShowLeaderboard(false);
  };

  // Handler for when user answers a question
  const handleAnswer = (answer) => {
    // Pass the answer to the useQuiz hook's answerQuestion function
    // This handles updating score, moving to next question, etc.
    answerQuestion(answer);
  };

  // Handler for when user wants to play again with same settings
  const handlePlayAgain = () => {
    // Clear existing quiz state in localStorage
    localStorage.removeItem(QUIZ_STATE_KEY);

    // Reset the quiz state (score, current question, etc.)
    resetQuiz();
    // Load new questions with the same options as before
    loadQuiz(quizOptions);
  };

  // Handler for when user wants to create a new quiz with different settings
  const handleNewQuiz = () => {
    // Clear existing quiz state in localStorage
    localStorage.removeItem(QUIZ_STATE_KEY);

    // Go back to the setup screen
    setQuizStarted(false);
    // Reset the quiz state
    resetQuiz();
  };

  // Handler to toggle the leaderboard visibility
  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  // Show the confirmation modal when user clicks Cancel Quiz
  const handleCancelQuizClick = () => {
    setIsConfirmModalOpen(true);
  };

  // Handler for when user confirms they want to cancel the quiz
  const handleConfirmCancelQuiz = () => {
    // Clear existing quiz state in localStorage
    localStorage.removeItem(QUIZ_STATE_KEY);

    // Go back to the setup screen
    setQuizStarted(false);
    // Reset the quiz state
    resetQuiz();
  };

  // Show loading spinner while Firebase authentication is initializing
  if (!authInitialized) {
    return (
      <QuizLayout>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your session...</p>
        </div>
      </QuizLayout>
    );
  }

  // Check if we have a valid current question
  const hasValidQuestion =
    currentQuestion &&
    questions.length > 0 &&
    currentIndex >= 0 &&
    currentIndex < questions.length;

  return (
    <QuizLayout>
      <div className="quiz-page">
        {/* Main quiz content area - changes based on quiz state */}
        <div className="quiz-content">
          {!quizStarted ? (
            // QUIZ SETUP SCREEN
            // Shown before quiz starts to configure options
            <>
              <QuizSetup
                onStartQuiz={handleStartQuiz}
                initialOptions={quizOptions}
              />
              <button
                className="leaderboard-toggle-btn"
                onClick={toggleLeaderboard}
              >
                {showLeaderboard ? 'Hide Leaderboard' : 'View Leaderboard'}
              </button>
              {showLeaderboard && <Leaderboard scores={topScores} />}
            </>
          ) : loading ? (
            // LOADING SCREEN
            // Shown while questions are being fetched
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading questions...</p>
            </div>
          ) : error ? (
            // ERROR SCREEN
            // Shown if there was a problem loading questions
            <div className="error-container">
              <p>Error: {error}</p>
              <button onClick={() => handleNewQuiz()} className="retry-btn">
                Try Again
              </button>
            </div>
          ) : quizCompleted ? (
            // RESULTS SCREEN
            // Shown after all questions have been answered
            <>
              <QuizResult
                score={score}
                totalQuestions={questions.length}
                onPlayAgain={handlePlayAgain}
                onNewQuiz={handleNewQuiz}
              />
              <button
                className="leaderboard-toggle-btn"
                onClick={toggleLeaderboard}
              >
                {showLeaderboard ? 'Hide Leaderboard' : 'View Leaderboard'}
              </button>
              {showLeaderboard && <Leaderboard scores={topScores} />}
            </>
          ) : hasValidQuestion ? (
            // ACTIVE QUIZ SCREEN
            // Shown during the quiz when questions are available

            <>
              <QuizTimer
                duration={30}
                onTimeUp={() => handleAnswer(null)}
                keyTrigger={currentIndex}
              />
              <QuizProgress
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                score={score}
              />
              <QuestionCard
                question={currentQuestion}
                onAnswer={handleAnswer}
              />

              {/* Cancel quiz button - now placed within the quiz flow */}
              <button
                className="cancel-quiz-btn"
                onClick={handleCancelQuizClick}
              >
                Cancel Quiz
              </button>
            </>
          ) : (
            // FALLBACK - NO QUESTIONS
            // Shown if API returned zero questions or invalid state
            <div className="no-questions">
              <p>No questions available. Please try different options.</p>
              <button onClick={handleNewQuiz} className="retry-btn">
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal for canceling quiz */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmCancelQuiz}
        title="Cancel Quiz"
        message="Are you sure you want to cancel this quiz? Your progress will be lost."
        confirmText="Yes, Cancel Quiz"
        cancelText="No, Continue Quiz"
      />
    </QuizLayout>
  );
};

export default Quiz;
