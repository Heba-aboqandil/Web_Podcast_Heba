/**
 * LanguageContext.jsx
 * React Context for managing application-wide language state.
 * Provides language selection and management across components.
 */

import { createContext, useContext, useState } from 'react';

/**
 * Context for language state
 * Stores current language and setter function
 * 
 * @type {React.Context<{
 *   language: string,
 *   setLanguage: function
 * }>}
 */
const LanguageContext = createContext();

/**
 * Provider component for language context
 * Wraps application to provide language state management
 * 
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * 
 * @example
 * <LanguageProvider>
 *   <App />
 * </LanguageProvider>
 */
export function LanguageProvider({ children }) {
  // Initialize with English as default language
  const [language, setLanguage] = useState('en_us');
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Custom hook for accessing language context
 * Provides access to current language and language setter
 * 
 * @returns {{
 *   language: string,
 *   setLanguage: function
 * }} Language context value
 * 
 * @example
 * const { language, setLanguage } = useLanguage();
 * console.log(language); // 'en_us'
 */
export function useLanguage() {
  return useContext(LanguageContext);
}