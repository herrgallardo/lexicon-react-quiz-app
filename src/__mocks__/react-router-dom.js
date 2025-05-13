// src/__mocks__/react-router-dom.js
// ---------------------------------------------------
// Mock module for react-router-dom to use in Jest tests
// ---------------------------------------------------
// Summary:
// - Provides dummy routing components so tests don’t break
// - Stubs out hooks for navigation and params

import React from 'react';

// No-op router components: simply render their children
export const BrowserRouter = ({ children }) => <>{children}</>;
export const Routes = ({ children }) => <>{children}</>;
export const Route = () => null; // Renders nothing
export const Link = ({ children }) => <>{children}</>; // No-op link

// Stub hooks to prevent errors when components call them
export const useNavigate = () => jest.fn(); // Returns a dummy navigate function
export const useParams = () => ({}); // Returns an empty params object
