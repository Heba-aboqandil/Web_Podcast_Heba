/**
 * LanguageSelector Component
 * 
 * Provides a language selection interface with visual feedback and flag icons.
 * Uses LanguageContext to manage application-wide language state.
 * 
 * Features:
 * - Multiple language support (English, Hebrew, Arabic)
 * - Visual language selection feedback
 * - Flag icons for language identification
 * - Integration with LanguageContext for state management
 */

import { useLanguage } from '../utils/LanguageContext';

// Define supported languages with their metadata
const languages = [
  { 
    code: 'en_us',   // Language code used by the transcription API
    label: 'English', // Display name
    flag: '🇺🇸'      // Flag emoji for visual identification
  },
  { 
    code: 'he',
    label: 'עברית',
    flag: '🇮🇱'
  },
  { 
    code: 'ar',
    label: 'العربية',
    flag: '🇸🇦'
  }
];

const LanguageSelector = () => {
  // Access language context for state management
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="flex gap-2 mb-4">
      {/* Map through supported languages to create selection buttons */}
      {languages.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
            ${language === code 
              ? 'bg-blue-500 text-white' // Active language styling
              : 'hover:bg-gray-200 border hover:border-gray-300'}`} // Inactive language styling
        >
          {/* Flag emoji and language name */}
          <span>{flag}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;