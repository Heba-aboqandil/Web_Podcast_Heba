/**
 * DarkModeToggle Component
 * 
 * Manages theme switching between light and dark modes.
 * Features:
 * - Persists theme preference in localStorage
 * - Detects system color scheme preference
 * - Provides visual feedback for current theme
 * - Updates HTML data-theme attribute for global styling
 */

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {
  /**
   * Initialize dark mode state from:
   * 1. Previously saved preference in localStorage
   * 2. System color scheme preference if no saved preference
   */
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Fall back to system preference if no saved theme
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  /**
   * Effect hook to update document theme and persist preference
   * Runs whenever darkMode state changes
   */
  useEffect(() => {
    // Update HTML data-theme attribute for global styling
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    // Persist theme preference to localStorage
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle theme" // Accessibility label for screen readers
    >
      {/* Render Sun icon for dark mode (to switch to light) 
          or Moon icon for light mode (to switch to dark) */}
      {darkMode ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-gray-600" />
      )}
    </button>
  );
};

export default DarkModeToggle;