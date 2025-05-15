// src/__tests__/AuthContext.test.js
// ---------------------------------------------------
// Test suite for AuthProvider and AuthContext
// ---------------------------------------------------
// Summary:
// - Mocks Firebase Auth's onAuthStateChanged to simulate auth state changes
// - Verifies that AuthContext.Provider supplies the correct `user` and `authInitialized` values

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { AuthProvider, AuthContext } from '../context/AuthContext'; // Components under test
import { onAuthStateChanged } from 'firebase/auth'; // Mocked by setupTests.js

// Mock the Firebase Auth listener
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
}));

test('AuthProvider sets user and authInitialized in context', async () => {
  // ── Arrange ──
  // Create a fake user object and stub the listener to invoke its callback
  const fakeUser = { uid: 'u123', email: 'a@b.com' };
  onAuthStateChanged.mockImplementation((auth, callback) => {
    callback(fakeUser); // simulate Firebase calling back with the user
    return () => {}; // provide a no-op unsubscribe function
  });

  let contextValue;
  // A consumer component to read and store the context value
  const TestConsumer = () => {
    contextValue = React.useContext(AuthContext);
    return null; // no UI needed
  };

  // ── Act ──
  // Render AuthProvider wrapping the TestConsumer
  render(
    <AuthProvider>
      <TestConsumer />
    </AuthProvider>
  );

  // ── Assert ──
  // Wait for the effect to run and update contextValue
  await waitFor(() => {
    expect(contextValue).toEqual(
      expect.objectContaining({
        user: fakeUser,
        authInitialized: true,
      })
    );
  });
});
