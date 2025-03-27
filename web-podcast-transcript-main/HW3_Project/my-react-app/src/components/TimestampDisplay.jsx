/**
 * TimestampDisplay Component
 * 
 * Displays transcribed text organized by sentences with corresponding timestamps.
 * Supports text highlighting for search queries and handles loading states.
 * 
 * @component
 * @param {Object} props
 * @param {Array} props.words - Array of word objects with timing and text information
 * @param {string} props.searchQuery - Optional search term for highlighting in the text
 * 
 * Features:
 * - Sentence-level timestamp organization
 * - Search term highlighting within sentences
 * - Loading state handling
 * - Time formatting in MM:SS format
 */

import { Clock } from 'lucide-react';
import { formatTime, groupWordsIntoSentences } from '../utils/utils';
import HighlightedText from './HighlightedText';

const TimestampDisplay = ({ words, searchQuery }) => {
  // Group individual words into sentence objects with timestamps
  const sentences = groupWordsIntoSentences(words);

  return (
    <section className="section-card">
      {/* Section header with icon */}
      <h2 className="section-title">
        <Clock size={24} className="text-blue-500" />
        Sentence Timestamps
      </h2>

      <div className="section-content">
        {sentences.length > 0 ? (
          // Map through sentences when transcription is available
          sentences.map((sentence, index) => {
            // Convert timestamp to seconds and format
            const timeInSeconds = Math.floor(sentence.start / 1000);
            const formattedTime = formatTime(timeInSeconds);

            return (
              <div key={index} className="timestamp-item">
                {/* Timestamp display with icon */}
                <Clock size={16} className="text-blue-500" />
                <span>{formattedTime}</span>
                <span className="ml-2">-</span>

                {/* Sentence text with optional search highlighting */}
                <span className="ml-2">
                  <HighlightedText 
                    text={sentence.text} 
                    searchQuery={searchQuery} 
                  />
                </span>
              </div>
            );
          })
        ) : (
          // Loading state when no transcription is available
          <div className="timestamp-item">
            <Clock size={16} className="text-blue-500" />
            <span>00:00 - Waiting for transcription...</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default TimestampDisplay;