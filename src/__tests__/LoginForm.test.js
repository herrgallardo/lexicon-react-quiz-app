// src/__tests__/LoginForm.test.js
// ---------------------------------------------------
// LoginForm.test.js
// ---------------------------------------------------
// Summary:
// - Mocks Firebase Auth methods to prevent real network requests
// - Mocks Firestore saveUserProfile function
// - Tests default view, registration, login, and password reset flows
// ---------------------------------------------------

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../pages/LoginForm';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { saveUserProfile } from '../services/firestoreService';

// Stub out Firebase Auth methods so tests are isolated
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  onAuthStateChanged: jest.fn((auth, cb) => {
    cb(null); // simulate no authenticated user initially
    return () => {}; // dummy unsubscribe
  }),
}));

// Stub Firestore service to avoid actual database writes
jest.mock('../services/firestoreService', () => ({
  saveUserProfile: jest.fn(),
}));

describe('LoginForm Component', () => {
  // Clear all mock call data before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form by default', () => {
    // Render the LoginForm
    render(<LoginForm />);

    // Expect the heading, email/password inputs, and login button to be in the document
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('toggles to registration view and calls createUserWithEmailAndPassword on submit', async () => {
    // Arrange: stub authentication and Firestore save calls
    createUserWithEmailAndPassword.mockResolvedValue({
      user: { uid: 'u1', email: 'a@b.com' },
    });
    saveUserProfile.mockResolvedValue();

    // Render component
    render(<LoginForm />);

    // Act: click the "Register" link to switch to sign-up mode
    fireEvent.click(screen.getByRole('link', { name: /Register/i }));

    // Assert: the form heading updates to "Sign Up"
    expect(
      screen.getByRole('heading', { name: /sign up/i })
    ).toBeInTheDocument();

    // Fill out email and password
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'a@b.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'pass123' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    // Wait for asynchronous actions to complete
    await waitFor(() => {
      // Expect Firebase auth sign-up called with correct args
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.any(Object),
        'a@b.com',
        'pass123'
      );
      // Expect profile saved with derived displayName
      expect(saveUserProfile).toHaveBeenCalledWith({
        uid: 'u1',
        displayName: 'a',
        email: 'a@b.com',
      });
    });
  });

  it('submits login flow and calls signInWithEmailAndPassword', async () => {
    // Arrange: stub login call
    signInWithEmailAndPassword.mockResolvedValue({ user: { uid: 'u2' } });

    render(<LoginForm />);

    // Act: fill and submit login form
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'x@y.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'pwd123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      // Assert that login method was called with correct args
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.any(Object),
        'x@y.com',
        'pwd123'
      );
    });
  });

  it('toggles to reset view and calls sendPasswordResetEmail', async () => {
    // Arrange: stub reset email call
    sendPasswordResetEmail.mockResolvedValue();

    render(<LoginForm />);

    // Act: switch to reset mode
    fireEvent.click(screen.getByRole('link', { name: /^Reset$/i }));

    // Assert: heading updates to "Reset Password"
    expect(
      screen.getByRole('heading', { name: /reset password/i })
    ).toBeInTheDocument();

    // Fill reset email field and submit
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'reset@me.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send reset email/i }));

    await waitFor(() => {
      // Assert that reset email function was called correctly
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(
        expect.any(Object),
        'reset@me.com'
      );
    });
  });
});
