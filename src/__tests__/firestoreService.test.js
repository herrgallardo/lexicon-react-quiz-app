// src/__tests__/firestoreService.test.js
// ---------------------------------------------------
// Test suite for saveScore() in firestoreService.js
// ---------------------------------------------------
// Summary:
// - Mocks addDoc via setupTests.js to avoid real Firestore calls
// - Verifies that saveScore() invokes addDoc() with the correct payload

import { saveScore } from '../services/firestoreService'; // Function under test
import { addDoc } from 'firebase/firestore'; // Mocked by setupTests.js

describe('saveScore', () => {
  it('calls addDoc with userId, email, and score', async () => {
    // ── Arrange ──
    // Create dummy input data for the saveScore call
    const data = {
      userId: 'test-user',
      email: 'a@b.com',
      score: 9,
    };

    // ── Act ──
    // Call the function under test
    await saveScore(data);

    // ── Assert ──
    // Ensure addDoc() was invoked at least once
    expect(addDoc).toHaveBeenCalled();

    // Grab the payload argument passed to addDoc()
    const payload = addDoc.mock.calls[0][1];

    // Verify that the payload contains the expected core fields
    expect(payload).toEqual(
      expect.objectContaining({
        userId: 'test-user',
        email: 'a@b.com',
        score: 9,
      })
    );
  });
});
