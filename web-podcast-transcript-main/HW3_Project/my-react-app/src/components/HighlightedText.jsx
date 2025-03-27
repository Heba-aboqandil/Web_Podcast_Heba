/**
 * HighlightedText Component
 * 
 * A utility component that renders text with highlighted search terms.
 * Uses dangerouslySetInnerHTML to render highlighted portions of text.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.text - The original text to be displayed
 * @param {string} props.searchQuery - The search term to highlight within the text
 * 
 * @security
 * Uses dangerouslySetInnerHTML which can expose XSS vulnerabilities if not properly sanitized.
 * The highlightText utility function should ensure proper sanitization of HTML.
 */

import React from 'react';
import { highlightText } from '../utils/textUtils';

const HighlightedText = ({ text = '', searchQuery = '' }) => {
  /**
   * Creates the HTML markup for highlighted text
   * Delegates actual highlighting to the highlightText utility function
   * 
   * @returns {Object} Object with __html property containing sanitized HTML string
   */
  const createMarkup = () => {
    return { __html: highlightText(text, searchQuery) };
  };

  // Render the highlighted text using dangerouslySetInnerHTML
  return <span dangerouslySetInnerHTML={createMarkup()} />;
};

export default HighlightedText;