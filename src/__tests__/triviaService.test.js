// src/__tests__/triviaService.test.js
// ---------------------------------------------------
// Test suite for TriviaService API functions
// Summary:
// - Uses mocked axios instance from setupTests.js
// - Verifies fetchCategories, fetchGlobalStats,
//   fetchCategoryStats, requestToken, resetToken, and fetchQuizQuestions
// - Ensures correct endpoint calls, response handling, and data processing
// ---------------------------------------------------

import axios from 'axios';
import {
  fetchCategories,
  fetchGlobalStats,
  fetchCategoryStats,
  requestToken,
  resetToken,
  fetchQuizQuestions,
} from '../services/triviaService';

// Retrieve the shared axios mock instance (stubbed in setupTests.js)
const mockClient = axios.create();

describe('TriviaService API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchCategories returns list on success', async () => {
    // Arrange: mock API response with trivia_categories
    const fakeCats = [{ id: 1, name: 'General' }];
    mockClient.get.mockResolvedValueOnce({
      data: { trivia_categories: fakeCats },
    });

    // Act: call fetchCategories()
    const cats = await fetchCategories();

    // Assert: data returned and correct endpoint used
    expect(cats).toEqual(fakeCats);
    expect(mockClient.get).toHaveBeenCalledWith('/api_category.php');
  });

  it('fetchGlobalStats returns global counts', async () => {
    // Arrange: mock global count API response
    const fakeStats = { total_num_of_questions: 1000 };
    mockClient.get.mockResolvedValueOnce({ data: fakeStats });

    // Act & Assert
    const stats = await fetchGlobalStats();
    expect(stats).toEqual(fakeStats);
    expect(mockClient.get).toHaveBeenCalledWith('/api_count_global.php');
  });

  it('fetchCategoryStats returns count for a given category', async () => {
    // Arrange: mock category count API response
    const fakeCatStats = {
      category_id: 9,
      question_count: { total_question_count: 200 },
    };
    mockClient.get.mockResolvedValueOnce({ data: fakeCatStats });

    // Act
    const result = await fetchCategoryStats(9);

    // Assert
    expect(result).toEqual(fakeCatStats);
    expect(mockClient.get).toHaveBeenCalledWith('/api_count.php', {
      params: { category: 9 },
    });
  });

  it('requestToken returns token and stores it in localStorage', async () => {
    // Arrange: mock token API response
    const fake = { response_code: 0, token: 'XYZ' };
    mockClient.get.mockResolvedValueOnce({ data: fake });

    // Act
    const token = await requestToken();

    // Assert: returned value and localStorage
    expect(token).toBe('XYZ');
    expect(localStorage.getItem('triviaToken')).toBe('XYZ');
  });

  it('resetToken returns true when API responds with success code', async () => {
    // Arrange: mock reset token API response
    const fake = { response_code: 0 };
    mockClient.get.mockResolvedValueOnce({ data: fake });

    // Act
    const ok = await resetToken('XYZ');

    // Assert
    expect(ok).toBe(true);
  });

  it('fetchQuizQuestions returns decoded and shuffled question data', async () => {
    // Arrange: raw API results containing HTML entities
    const rawData = [
      {
        question: '1 &amp; 2',
        correct_answer: 'A&amp;B',
        incorrect_answers: ['X&amp;Y', 'Z&amp;W'],
      },
    ];
    mockClient.get.mockResolvedValueOnce({
      data: { response_code: 0, results: rawData },
    });

    // Act
    const questions = await fetchQuizQuestions({ amount: 1 });

    // Assert: HTML entities decoded and answer array assembled
    expect(questions[0].question).toBe('1 & 2');
    expect(questions[0].correct_answer).toBe('A&B');
    expect(questions[0].allAnswers).toHaveLength(3);
  });
});
