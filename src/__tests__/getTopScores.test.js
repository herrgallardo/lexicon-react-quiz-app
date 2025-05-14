// src/__tests__/getTopScores.test.js
// ---------------------------------------------------
// Test suite for getTopScores() Firestore service method
// Summary:
// - Uses the mocked getDocs() from setupTests.js to avoid real Firestore calls
// - Verifies that getTopScores() maps a Firestore snapshot into the correct array of objects
// ---------------------------------------------------

import { getTopScores } from '../services/firestoreService'; // Function under test
import { getDocs } from 'firebase/firestore'; // Mocked by setupTests.js

describe('getTopScores', () => {
  it('returns a mapped array of id + data from Firestore', async () => {
    // ── Arrange ──
    // Stub getDocs() to resolve a fake Firestore snapshot object
    getDocs.mockResolvedValue({
      docs: [
        {
          id: 'abc123',
          data: () => ({ score: 42, userId: 'u1' }),
        },
        {
          id: 'def456',
          data: () => ({ score: 17, userId: 'u2' }),
        },
      ],
    });

    // ── Act ──
    // Invoke the service function that should use getDocs()
    const topScores = await getTopScores();

    // ── Assert ──
    // Expect the function to return an array of objects matching the mocked data
    expect(topScores).toEqual([
      { id: 'abc123', score: 42, userId: 'u1' },
      { id: 'def456', score: 17, userId: 'u2' },
    ]);
  });
});
