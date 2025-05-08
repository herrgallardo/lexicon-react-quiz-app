// src/services/authService.js
// -------------------------------------------------------------------
// This file provides utility functions for user authentication.
// It wraps Firebase Authentication methods for sign-up, login, and logout.
// These functions are reused across components (e.g. Auth.jsx).
// -------------------------------------------------------------------

import { auth } from '../firebase/firebaseInit'; // Firebase Auth instance
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'; // Firebase Auth methods

/**
 * Registers a new user using email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<UserCredential>} A Firebase user credential object on success.
 */
export const signUp = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Logs in an existing user using email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<UserCredential>} A Firebase user credential object on success.
 */
export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Logs out the currently authenticated user.
 *
 * @returns {Promise<void>} A promise that resolves once sign-out is complete.
 */
export const logout = async () => {
  return await signOut(auth);
};
