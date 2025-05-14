// src/__tests__/quizLogic.test.js
// ---------------------------------------------------
// Tests: isCorrectAnswer() utility function
// ---------------------------------------------------
// These simple unit tests verify that our quiz logic correctly
// identifies matching and non-matching answers.

import { isCorrectAnswer } from '../utils/quizLogic';

describe('Quiz scoring logic', () => {
  it('should return true when the selected answer matches the correct answer', () => {
    // Arrange & Act: compare identical answers
    const result = isCorrectAnswer('A', 'A');

    // Assert: expect a true value for a correct match
    expect(result).toBe(true);
  });

  it('should return false when the selected answer does not match', () => {
    // Arrange & Act: compare different answers
    const result = isCorrectAnswer('B', 'A');

    // Assert: expect a false value for an incorrect match
    expect(result).toBe(false);
  });
});
