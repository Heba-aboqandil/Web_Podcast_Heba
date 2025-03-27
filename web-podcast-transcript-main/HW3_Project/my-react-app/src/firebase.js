/**
 * firebase.js
 * Firebase configuration and service initialization.
 * 
 * Initializes Firebase services:
 * - Authentication for user management
 * - Firestore for data storage
 * 
 * @important This file contains sensitive configuration data
 * In production, these values should be stored in environment variables
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * Firebase configuration object
 * Contains credentials and identifiers for the Firebase project
 * 
 * @config
 * @property {string} apiKey - Firebase API key
 * @property {string} authDomain - Auth domain for the project
 * @property {string} projectId - Firebase project identifier
 * @property {string} storageBucket - Storage bucket location
 * @property {string} messagingSenderId - Firebase messaging ID
 * @property {string} appId - Firebase application ID
 * @property {string} measurementId - Analytics measurement ID
 */
const firebaseConfig = {
  apiKey: "AIzaSyDOgRezkPPUzm-DvCwcRVsyRC3sFBtdIEs",
  authDomain: "webdb-394c6.firebaseapp.com",
  projectId: "webdb-394c6",
  storageBucket: "webdb-394c6.appspot.com",
  messagingSenderId: "674684006044",
  appId: "1:674684006044:web:dd281f89b3ee2964784759",
  measurementId: "G-20MDX020G7"
};

// Initialize Firebase application
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);     // Authentication service
const db = getFirestore(app);  // Firestore database service

// Export initialized services for use in other components
export { auth, db };