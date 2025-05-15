// src/hooks/useMediaQuery.js
import { useState, useEffect } from 'react';

/**
 * Custom hook to track a CSS media query.
 * Returns `true` if the query matches, `false` otherwise.
 * Safely does nothing in SSR or test environments where `matchMedia` is unavailable.
 *
 * @param {string} query — a CSS media query, e.g. '(min-width: 769px)'
 * @returns {boolean}
 */
export default function useMediaQuery(query) {
  // Initialize state: if we can't call matchMedia, default to false
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    // Guard: skip setup in SSR or test env (no matchMedia)
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mql = window.matchMedia(query);
    const handleChange = (e) => setMatches(e.matches);

    // Listen for changes
    mql.addEventListener('change', handleChange);

    // In case the initial state was stale, sync again
    setMatches(mql.matches);

    return () => {
      mql.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
