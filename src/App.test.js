// src/App.test.js
// ---------------------------------------------------
// Smoke test for App component
// Verifies main navigation renders correctly
// ---------------------------------------------------
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders Home link in the header', () => {
  render(<App />);
  const homeLink = screen.getByText(/Home/i);
  expect(homeLink).toBeInTheDocument();
});

// Stub firebase/auth so onAuthStateChanged won’t throw
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(() => {
    // Return a no-op unsubscribe function
    return () => {};
  }),
}));
