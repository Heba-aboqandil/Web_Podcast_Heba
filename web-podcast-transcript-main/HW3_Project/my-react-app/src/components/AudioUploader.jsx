/**
 * AudioUploader Component
 * 
 * Handles audio file uploads and transcription using the AssemblyAI API.
 * Provides a user interface for file selection, language selection, and transcription progress.
 * 
 * @component
 * @param {Object} props
 * @param {Function} props.onTranscriptionComplete - Callback function called with transcription results
 */

import { useState } from 'react';
import { FileAudio } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { extractTitle } from '../utils/utils';

// API configuration
const API_KEY = "361415b9f3e244d5abc4def7278d3005";
const API_ENDPOINTS = {
  UPLOAD: 'https://api.assemblyai.com/v2/upload',
  TRANSCRIPT: 'https://api.assemblyai.com/v2/transcript'
};

const AudioUploader = ({ onTranscriptionComplete }) => {
  // State management for file upload and transcription process
  const { language } = useLanguage();
  const [file, setFile] = useState(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  /**
   * Handles file selection and validation
   * Only accepts audio files
   * @param {Event} e - File input change event
   */
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes('audio')) {
      setFile(selectedFile);
      setError(null);
    }
  };

  /**
   * Constructs the transcription request body based on selected language
   * Different configurations for different languages (Hebrew, Arabic, English)
   * @param {string} language - Selected language code
   * @param {Object} uploadResult - File upload response from API
   * @returns {Object} Transcription request configuration
   */
  const getTranscriptionBody = (language, uploadResult) => {
    switch (language) {
      case 'he':
      case 'ar':
        return {
          audio_url: uploadResult.upload_url,
          language_code: language,
          speech_model: "nano",
          punctuate: true,
          format_text: true
        };
      case 'en_us':
        return {
          audio_url: uploadResult.upload_url,
          language_code: language,
          punctuate: true,
          format_text: true,
          summarization: true,
          summary_model: "informative",
          summary_type: "bullets"
        };
      default:
        throw new Error('Unsupported language');
    }
  };

  /**
   * Main transcription handler
   * Manages the complete process of:
   * 1. File upload to AssemblyAI
   * 2. Initiating transcription
   * 3. Polling for completion
   * 4. Error handling
   */
  const handleTranscribe = async () => {
    if (!file) {
      setError('No file selected');
      return;
    }

    try {
      setError(null);
      setIsTranscribing(true);

      // Step 1: Upload file to AssemblyAI
      const uploadResponse = await fetch(API_ENDPOINTS.UPLOAD, {
        method: 'POST',
        headers: { 'Authorization': API_KEY },
        body: file
      });

      if (!uploadResponse.ok) {
        throw new Error('Upload failed: ' + await uploadResponse.text());
      }

      const uploadResult = await uploadResponse.json();

      // Step 2: Request transcription
      const transcriptResponse = await fetch(API_ENDPOINTS.TRANSCRIPT, {
        method: 'POST',
        headers: {
          'Authorization': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getTranscriptionBody(language, uploadResult))
      });

      if (!transcriptResponse.ok) {
        const errorText = await transcriptResponse.text();
        console.log('Error details:', errorText);
        throw new Error('Transcription request failed: ' + errorText);
      }

      const transcriptResult = await transcriptResponse.json();

      /**
       * Polls the API for transcription completion
       * @param {string} transcriptId - ID of the transcription job
       */
      const checkCompletion = async (transcriptId) => {
        const pollingEndpoint = `${API_ENDPOINTS.TRANSCRIPT}/${transcriptId}`;
        let attempts = 0;
        const maxAttempts = 40;

        const pollInterval = setInterval(async () => {
          if (attempts >= maxAttempts) {
            clearInterval(pollInterval);
            setError('Transcription timed out');
            setIsTranscribing(false);
            return;
          }

          try {
            const pollResponse = await fetch(pollingEndpoint, {
              headers: { 'Authorization': API_KEY }
            });

            if (!pollResponse.ok) {
              throw new Error('Polling failed');
            }

            const result = await pollResponse.json();

            // Handle completion or continue polling
            if (result.status === 'completed') {
              clearInterval(pollInterval);
              onTranscriptionComplete({
                text: result.text || '',
                summary: language === 'en_us' ? (result.summary || '') : '',
                words: result.words || [],
                audio_url: uploadResult.upload_url,
                title: extractTitle(file.name)
              });
              setIsTranscribing(false);
            } else if (result.status === 'error') {
              clearInterval(pollInterval);
              throw new Error(result.error);
            }

            attempts++;
          } catch (error) {
            clearInterval(pollInterval);
            setError(error.message);
            setIsTranscribing(false);
          }
        }, 3000);
      };

      await checkCompletion(transcriptResult.id);

    } catch (error) {
      setError(error.message);
      setIsTranscribing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Language selection component */}
      <LanguageSelector />
      
      {/* File upload area with dynamic styling */}
      <label 
        htmlFor="audio-upload" 
        className={`relative block p-8 border-2 border-dashed rounded-xl cursor-pointer 
        transition-all duration-200 ease-in-out
        ${file ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-full bg-blue-50">
            <FileAudio size={40} className="text-blue-500" />
          </div>
          <div className="text-center">
            <span className="font-medium text-gray-700">
              {file ? file.name : 'Upload your audio file'}
            </span>
            <p className="mt-1 text-sm text-gray-500">
              Click or drag and drop
            </p>
          </div>
        </div>
      </label>

      {/* Hidden file input */}
      <input
        id="audio-upload"
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Error display */}
      {error && (
        <div className="mt-4 p-3 text-sm text-red-500 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      {/* Transcription controls and progress */}
      {file && (
        <div className="mt-4">
          <button
            onClick={handleTranscribe}
            disabled={isTranscribing}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium
              ${isTranscribing 
                ? 'bg-gray-400' 
                : 'bg-blue-500 hover:bg-blue-600'} 
              transition-colors`}
          >
            {isTranscribing ? 'Transcribing...' : 'Start Transcription'}
          </button>

          {/* Upload progress indicator */}
          {isTranscribing && (
            <div className="mt-2">
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 text-center mt-1">
                {uploadProgress}% uploaded
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AudioUploader;