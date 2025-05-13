// src/utils/quizLogic.js
// ---------------------------------------------------
// Utility: compare selectedAnswer to correctAnswer
// Returns true if they match, false otherwise
// ---------------------------------------------------
/**
 * Check if the selected answer matches the correct one.
 * @param {string} selectedAnswer
 * @param {string} correctAnswer
 * @returns {boolean}
 */
export function isCorrectAnswer(selectedAnswer, correctAnswer) {
  return selectedAnswer === correctAnswer;
}
