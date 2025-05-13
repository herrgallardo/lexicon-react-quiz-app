// src/__tests__/authService.test.js
// ---------------------------------------------------
// Test suite for authService.js
// ---------------------------------------------------
// Summary:
// - Mocks Firebase Auth functions to avoid real network calls
// - Verifies that signUp, login, and logout wrapper functions
//   call the correct Firebase methods with the expected arguments

import { signUp, login, logout } from '../services/authService'; // Functions under test
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'; // Mocked by setupTests.js

// Mock Firebase Auth functions
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(), // stub for sign-up
  signInWithEmailAndPassword: jest.fn(), // stub for login
  signOut: jest.fn(), // stub for logout
}));

describe('authService', () => {
  beforeEach(() => {
    // Clear all mock history between tests
    jest.clearAllMocks();
  });

  it('signUp calls createUserWithEmailAndPassword with correct args', async () => {
    // ── Arrange ──
    const fakeCreds = { user: { uid: 'u1' } };
    createUserWithEmailAndPassword.mockResolvedValue(fakeCreds);

    // ── Act ──
    const result = await signUp('a@b.com', 'pass123');

    // ── Assert ──
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.any(Object), // the Firebase Auth instance
      'a@b.com',
      'pass123'
    );
    expect(result).toBe(fakeCreds);
  });

  it('login calls signInWithEmailAndPassword with correct args', async () => {
    // ── Arrange ──
    const fakeCreds = { user: { uid: 'u2' } };
    signInWithEmailAndPassword.mockResolvedValue(fakeCreds);

    // ── Act ──
    const result = await login('x@y.com', 'secret');

    // ── Assert ──
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.any(Object), // the Firebase Auth instance
      'x@y.com',
      'secret'
    );
    expect(result).toBe(fakeCreds);
  });

  it('logout calls signOut with the Auth instance', async () => {
    // ── Arrange ──
    signOut.mockResolvedValue();

    // ── Act ──
    await logout();

    // ── Assert ──
    expect(signOut).toHaveBeenCalledWith(expect.any(Object));
  });
});
