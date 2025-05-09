// This component allows users to configure quiz settings before starting
// It presents form controls for selecting number of questions, category, difficulty and question type
import React, { useState } from 'react';
import { useCategories } from '../hooks/useTriviaHooks';
import { DIFFICULTY, QUESTION_TYPE } from '../services/triviaService';
import './QuizSetup.css';

const QuizSetup = ({ onStartQuiz, initialOptions }) => {
  // useCategories is a custom hook that fetches available quiz categories from the API
  // It returns an object with: categories (array), loading (boolean), and error (string if any)
  const { categories, loading: categoriesLoading } = useCategories();

  // State to track all the quiz options selected by the user
  // We initialize it with default values and any passed initialOptions
  const [options, setOptions] = useState({
    amount: 10, // Default number of questions
    category: '', // Default category (empty means "any category")
    difficulty: DIFFICULTY.MEDIUM, // Default difficulty level
    type: QUESTION_TYPE.MULTIPLE, // Default question type (multiple choice)
    ...initialOptions, // Spread any initial options passed as props
  });

  // Event handler for all form input changes
  // Updates the options state when any form field changes
  const handleChange = (e) => {
    const { name, value } = e.target; // Extract the input name and value from the event

    setOptions((prev) => ({
      ...prev, // Keep all existing options
      // For the 'amount' field, convert string value to integer
      // For other fields, use the value as is
      [name]: name === 'amount' ? parseInt(value, 10) : value,
    }));
  };

  // Form submission handler - prevents default form behavior and
  // calls the onStartQuiz prop function with the selected options
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from submitting and refreshing the page
    onStartQuiz(options); // Call the parent component's function with our options
  };

  return (
    <div className="quiz-setup">
      <h2>Quiz Setup</h2>
      <form onSubmit={handleSubmit}>
        {/* Number of questions dropdown */}
        <div className="form-group">
          <label htmlFor="amount">Number of Questions:</label>
          <select
            id="amount"
            name="amount"
            value={options.amount}
            onChange={handleChange}
          >
            {/* Map over an array of numbers to create option elements */}
            {[5, 10, 15, 20, 25, 30].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Category selection dropdown */}
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={options.category}
            onChange={handleChange}
            disabled={categoriesLoading} // Disable while categories are loading
          >
            <option value="">Any Category</option>
            {/* Map over the categories array to create option elements */}
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty selection dropdown */}
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            name="difficulty"
            value={options.difficulty}
            onChange={handleChange}
          >
            <option value="">Any Difficulty</option>
            <option value={DIFFICULTY.EASY}>Easy</option>
            <option value={DIFFICULTY.MEDIUM}>Medium</option>
            <option value={DIFFICULTY.HARD}>Hard</option>
          </select>
        </div>

        {/* Question type selection dropdown */}
        <div className="form-group">
          <label htmlFor="type">Question Type:</label>
          <select
            id="type"
            name="type"
            value={options.type}
            onChange={handleChange}
          >
            <option value="">Any Type</option>
            <option value={QUESTION_TYPE.MULTIPLE}>Multiple Choice</option>
            <option value={QUESTION_TYPE.BOOLEAN}>True / False</option>
          </select>
        </div>

        {/* Submit button to start the quiz */}
        <button type="submit" className="start-quiz-btn">
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizSetup;
