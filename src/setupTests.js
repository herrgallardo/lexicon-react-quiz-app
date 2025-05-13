// src/setupTests.js
// ---------------------------------------------------
// setupTests.js
// ---------------------------------------------------
// Summary:
// - Configures global mocks for Jest to prevent real network calls
// - Stubs Firebase init, Firestore methods, axios, React Router, Firebase Auth, and window.alert
// ---------------------------------------------------

import '@testing-library/jest-dom'; // Adds custom matchers like toBeInTheDocument()

// ——— Prevent real Firebase initialization ———
// Any import of ../firebase/firebaseInit will get these no-op exports
jest.mock('./firebase/firebaseInit', () => ({
  app: {}, // no-op Firebase app
  auth: {}, // no-op Auth instance
  db: {}, // no-op Firestore instance
}));

// ——— Stub Firestore methods ———
// Mocks Firestore functions so they never hit a real database
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(() => ({})), // returns dummy ref
  addDoc: jest.fn(() => Promise.resolve({ id: 'mock-doc-id' })), // resolves to fake doc ref
  getDocs: jest.fn(), // mock for reading docs
  query: jest.fn(), // query builder stub
  orderBy: jest.fn(), // ordering stub
  limit: jest.fn(), // limit stub
  where: jest.fn(), // where clause stub
  Timestamp: { now: jest.fn(() => 'mocked-timestamp') }, // fake timestamp
}));

// ——— Stub axios HTTP client ———
// Mocks axios.create() and common methods so no real HTTP calls occur
jest.mock('axios', () => {
  const mockAxios = jest.fn();
  mockAxios.create = jest.fn(() => ({
    interceptors: { response: { use: jest.fn() } }, // stub interceptors
    get: jest.fn(), // stub GET
    post: jest.fn(), // stub POST
  }));
  mockAxios.get = jest.fn(); // stub direct axios.get
  return mockAxios;
});

// ——— Stub React Router DOM ———
// Provides dummy components/hooks so <App /> can render under test
jest.mock('react-router-dom', () => {
  const React = require('react');
  return {
    BrowserRouter: ({ children }) => <>{children}</>, // render children directly
    Routes: ({ children }) => <>{children}</>, // same for Routes
    Route: () => null, // no-op Route
    Link: ({ children }) => <>{children}</>, // no-op Link
    useNavigate: () => jest.fn(), // stub navigation
    useParams: () => ({}), // stub URL params
  };
});

// ——— Stub Firebase Auth methods ———
// Mocks Auth listener and sign-in/up flows to avoid real auth calls
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn((auth, cb) => {
    cb(null); // simulate no user initially
    return () => {}; // dummy unsubscribe function
  }),
  createUserWithEmailAndPassword: jest.fn(), // stub sign-up
  signInWithEmailAndPassword: jest.fn(), // stub login
  sendPasswordResetEmail: jest.fn(), // stub password reset
}));

// ——— Stub window.alert globally ———
// Prevent JSDOM errors when components call alert()
window.alert = jest.fn();
