/**
 * textUtils.js
 * Utility functions for text processing and search highlighting.
 * Provides safe text manipulation for search functionality.
 */

/**
 * Escapes special characters in a string for use in RegExp
 * Prevents regex injection attacks by escaping special characters
 * 
 * @param {string} string - Input string to escape
 * @returns {string} Escaped string safe for regex usage
 * @private
 */
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Highlights search query matches within text using HTML mark tags
 * Safe for use with dangerouslySetInnerHTML as it only injects mark tags
 * 
 * @param {string} text - Text to search within
 * @param {string} searchQuery - Query to highlight
 * @returns {string} HTML string with highlighted matches
 * 
 * @example
 * highlightText("Hello world", "world")
 * // Returns: "Hello <mark class="highlight">world</mark>"
 */
export const highlightText = (text = '', searchQuery = '') => {
  // Return original text if no search query or text
  if (!searchQuery?.trim() || !text) return text || '';
  
  // Escape special characters in search query
  const escapedSearchQuery = escapeRegExp(searchQuery.trim());
  
  // Split text on matches and wrap matches in mark tags
  const parts = text.split(new RegExp(`(${escapedSearchQuery})`, 'gi'));
  
  return parts.map((part) => {
    if (part.toLowerCase() === searchQuery.toLowerCase()) {
      return `<mark class="highlight">${part}</mark>`;
    }
    return part;
  }).join('');
};