/**
 * utils.js
 * General utility functions for the application.
 * Handles time formatting, text processing, and word grouping.
 */

/**
 * Extracts a clean title from a filename
 * Removes file extensions and common video/audio suffixes
 * 
 * @param {string} filename - Original filename
 * @returns {string} Cleaned title
 * 
 * @example
 * extractTitle("song-name (Official Video).mp3")
 * // Returns: "song-name"
 */
export const extractTitle = (filename) => {
  // Remove file extension
  let title = filename.replace(/\.[^/.]+$/, '');
  
  // Remove common suffixes like "(Official Video)", "(Audio)", etc.
  title = title.replace(/\((Official|HD|Audio|Video|Music|Lyric).*?\)/gi, '');
  
  // Clean up any double spaces and trim
  title = title.replace(/\s+/g, ' ').trim();
  
  return title;
};

/**
 * Formats time in seconds to MM:SS format
 * 
 * @param {number} timeInSeconds - Time in seconds
 * @returns {string} Formatted time string (MM:SS)
 * 
 * @example
 * formatTime(125)
 * // Returns: "02:05"
 */
export const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

/**
 * Groups words into sentences based on punctuation and timing
 * Used for displaying transcription results with timestamps
 * 
 * @param {Array<Object>} words - Array of word objects with timing information
 * @param {number} words[].start - Start time of word in milliseconds
 * @param {number} words[].end - End time of word in milliseconds
 * @param {string} words[].text - Word text
 * @returns {Array<Object>} Array of sentence objects with text and start time
 * 
 * Rules for sentence breaks:
 * - Maximum of MAX_WORDS_PER_SENTENCE words
 * - Breaks on punctuation (.!?)
 * - Breaks on pauses longer than PAUSE_THRESHOLD
 */
export const groupWordsIntoSentences = (words) => {
  if (!words || words.length === 0) return [];
  
  const sentences = [];
  let currentSentence = {
    text: '',
    start: words[0]?.start || 0,
    wordCount: 0
  };

  // Configuration constants
  const MAX_WORDS_PER_SENTENCE = 12;  // Maximum words before forcing a break
  const PAUSE_THRESHOLD = 1000;        // Milliseconds of silence to trigger break

  words.forEach((word, index) => {
    const nextWord = words[index + 1];
    const timeDiff = nextWord ? nextWord.start - (word.start + word.end) : 0;
    
    // Determine if we should break the sentence
    const shouldBreak = 
      currentSentence.wordCount >= MAX_WORDS_PER_SENTENCE ||
      word.text.match(/[.!?]$/) ||
      timeDiff > PAUSE_THRESHOLD;

    // Add word to current sentence
    currentSentence.text += word.text + ' ';
    currentSentence.wordCount++;

    // Create new sentence if breaking conditions are met
    if (shouldBreak || index === words.length - 1) {
      sentences.push({
        text: currentSentence.text.trim(),
        start: currentSentence.start
      });
      
      // Start new sentence if not at end
      if (index < words.length - 1) {
        currentSentence = {
          text: '',
          start: words[index + 1].start,
          wordCount: 0
        };
      }
    }
  });

  return sentences;
};