// --------------------------------------------
// authService.js
// --------------------------------------------
// Summary:
// - Wraps Firebase Auth methods for reusability
// - Handles user signup, login, and logout
// - Used by components like login/signup forms

import { auth } from '../firebase/firebaseInit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

/**
 * Creates a new user account using email and password.
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<UserCredential>}
 */
export const signUp = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Logs in an existing user with email and password.
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<UserCredential>}
 */
export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Logs out the currently authenticated user.
 * @returns {Promise<void>}
 */
export const logout = async () => {
  return await signOut(auth);
};
