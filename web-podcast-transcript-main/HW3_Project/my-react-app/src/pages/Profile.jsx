/**
 * Profile Component
 * 
 * This component displays a user's transcription history and allows interaction with saved transcriptions.
 * 
 * Key Features:
 * - Fetches and displays user's saved transcriptions
 * - Provides a sidebar with saved transcription list
 * - Allows selecting and viewing transcription details
 * - Supports searching within transcriptions
 * - Handles language-specific text direction
 * 
 * Dependencies:
 * - React Hooks (useState, useEffect)
 * - Firebase Authentication and Firestore
 * - React Router for navigation
 * - Custom components for text display and searching
 * - Language context for internationalization
 */
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FileText, BookOpen, Search } from 'lucide-react';

import HighlightedText from '../components/HighlightedText';
import TimestampDisplay from '../components/TimestampDisplay';
import SearchResults from '../components/SearchResults';
import { useLanguage } from '../utils/LanguageContext';

const Profile = () => {
  // Language and navigation hooks
  const { language } = useLanguage();
  const navigate = useNavigate();

  // State management for user, transcriptions, and selected transcription
  const [user, setUser] = useState(null);
  const [transcriptions, setTranscriptions] = useState([]);
  const [selectedTranscription, setSelectedTranscription] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Authentication and Transcription Fetching
   * - Checks user authentication status
   * - Redirects to login if not authenticated
   * - Fetches user's transcriptions from Firestore
   */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchUserTranscriptions(currentUser.uid);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  /**
   * Fetch user transcriptions from Firestore
   * @param {string} userId - Firebase user ID
   */
  const fetchUserTranscriptions = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setTranscriptions(userData.transcriptions || []);
        
        // Automatically select the most recent transcription
        if (userData.transcriptions && userData.transcriptions.length > 0) {
          setSelectedTranscription(userData.transcriptions[userData.transcriptions.length - 1]);
        }
      }
    } catch (error) {
      console.error("Error fetching transcriptions:", error);
    }
  };

  // Helper function to format timestamp
  const formatTimestamp = (timestamp) => {
    // Check if timestamp is a Firestore Timestamp or a string/number
    if (timestamp) {
      // If it's a Firestore Timestamp, convert to Date
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      
      // Check if date is valid
      if (!isNaN(date)) {
        return date.toLocaleString('default', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    }
    
    return 'Unknown Date';
  };

  /**
   * Determine text direction based on selected language
   * @returns {string} 'rtl' or 'ltr'
   */
  const getTextDirection = () => {
    return language === 'ar' || language === 'he' ? 'rtl' : 'ltr';
  };

  // Prevent rendering if no user is authenticated
  if (!user) return null;

  return (
    <div className="min-h-screen pt-20 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="main-title">Your Transcription History</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Transcription Titles Sidebar */}
        <div 
          className="md:col-span-1 rounded-xl shadow-sm p-4 max-h-[70vh] overflow-y-auto section-card"
        >
          <h2 className="section-title">Saved Transcriptions</h2>
          {transcriptions.length === 0 ? (
            <p className="text-gray-500">No transcriptions saved</p>
          ) : (
            transcriptions
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map((transcription, index) => (
                <div 
                  key={transcription.id}
                  onClick={() => setSelectedTranscription(transcription)}
                  className={`p-3 mb-2 rounded-lg cursor-pointer transition 
                    ${selectedTranscription?.id === transcription.id 
                      ? 'bg-blue-500 text-white' 
                      : 'hover:bg-gray-200 border border-transparent hover:border-gray-300'}`}
                >
                  <div className="font-medium truncate">
                    {transcription.title || `Transcription ${index + 1}`}
                  </div>
                  <div className="text-xs opacity-75">
                    {formatTimestamp(transcription.timestamp)}
                  </div>
                </div>
              ))
          )}
        </div>

        
        <div className="md:col-span-3 space-y-6">
          {selectedTranscription ? (
            <>
              <section className="section-card transcribed-text">
                <h2 className="section-title">
                  <FileText size={24} className="text-blue-500" />
                  Transcribed Text
                  {selectedTranscription.title && (
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      - {selectedTranscription.title}
                    </span>
                  )}
                </h2>
                <div className={`section-content`} dir={getTextDirection()}>
                  <HighlightedText 
                    text={selectedTranscription.text} 
                    searchQuery={searchQuery}
                  />
                </div>
              </section>

              {language === 'en_us' && (
                <section className="section-card summary-section">
                  <h2 className="section-title">
                    <BookOpen size={24} className="text-blue-500" />
                    Summary
                  </h2>
                  <div className="section-content mb-4">
                    <HighlightedText 
                      text={selectedTranscription.summary || 'No summary available'} 
                      searchQuery={searchQuery}
                    />
                  </div>
                </section>
              )}

              <div className="timestamp-section">
                <TimestampDisplay 
                  words={selectedTranscription.words} 
                  searchQuery={searchQuery}
                />
              </div>

              <section className="section-card search-section">
                <h2 className="section-title">
                  <Search size={24} className="text-blue-500" />
                  Search Text
                </h2>
                <input
                  type="text"
                  placeholder="Search for specific words or phrases..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  dir={getTextDirection()}
                />
                <SearchResults 
                  words={selectedTranscription.words} 
                  searchQuery={searchQuery}
                />
              </section>
            </>
          ) : (
            <div className="text-center text-gray-500">
              Select a transcription to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;