/**
 * SearchResults Component
 * 
 * Displays search results from transcribed audio with timestamps and context.
 * Highlights matching text segments and provides surrounding context for each match.
 * 
 * @component
 * @param {Object} props
 * @param {Array} props.words - Array of word objects containing timing and text information
 * @param {string} props.searchQuery - The current search term to find in the transcript
 * 
 * Features:
 * - Context-aware search highlighting
 * - Timestamp display for each match
 * - Surrounding text context for better understanding
 * - Empty state handling
 */

import React from 'react';
import { Clock } from 'lucide-react';
import { formatTime } from '../utils/utils';
import HighlightedText from './HighlightedText';

const SearchResults = ({ words, searchQuery }) => {
  // Early return if no search query or words
  if (!searchQuery.trim() || !words?.length) return null;

  /**
   * Finds matching segments in the transcribed text
   * 
   * Algorithm:
   * 1. Split search query into words
   * 2. Look for consecutive matches in transcript
   * 3. Include surrounding context words
   * 4. Track start times for timestamps
   * 
   * @returns {Array} Array of objects containing matched segments with timestamps
   */
  const findMatchingSegments = () => {
    const segments = [];
    // Split search query into individual words for matching
    const searchWords = searchQuery.toLowerCase().trim().split(/\s+/);
    let wordIndex = 0;

    while (wordIndex < words.length) {
      // Get potential matching words from current position
      const potentialMatch = words.slice(wordIndex, wordIndex + searchWords.length)
        .map(w => w.text.toLowerCase());
      
      // Check if current segment contains the search phrase
      if (potentialMatch.join(' ').includes(searchWords.join(' '))) {
        // Add context words before and after the match
        const contextStart = Math.max(0, wordIndex - 3);
        const contextEnd = Math.min(words.length, wordIndex + searchWords.length + 3);
        
        // Create segment with timing and context
        segments.push({
          startTime: words[wordIndex].start,
          text: words.slice(contextStart, contextEnd)
            .map(w => w.text)
            .join(' ')
        });
        
        // Move index past current match
        wordIndex += searchWords.length;
      } else {
        // Move to next word if no match found
        wordIndex++;
      }
    }
    
    return segments;
  };

  // Get all matching segments
  const matchingSegments = findMatchingSegments();

  // Return null if no matches found
  if (matchingSegments.length === 0) return null;

  return (
    <div className="search-results">
      {/* Results count header */}
      <h3 className="search-result-count text-sm font-medium">
        Found {matchingSegments.length} matches:
      </h3>

      {/* Results list */}
      <div className="space-y-2">
        {matchingSegments.map((segment, index) => (
          <div key={index} className="search-result-item">
            {/* Timestamp icon and time */}
            <Clock size={16} className="text-blue-500 mt-1 flex-shrink-0" />
            <span className="search-result-timestamp">
              {formatTime(Math.floor(segment.startTime / 1000))}
            </span>

            {/* Result text with highlighted matches */}
            <span className="search-result-text text-sm">
              <HighlightedText 
                text={segment.text} 
                searchQuery={searchQuery}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;