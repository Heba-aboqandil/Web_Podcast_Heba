/**
 * Register.jsx
 * User registration page that handles new account creation.
 * Manages both Firebase Authentication and Firestore user document creation.
 * 
 * Features:
 * - Email/password account creation
 * - Password visibility toggle
 * - Firestore user profile initialization
 * - Form validation and error handling
 * - Automatic navigation after successful registration
 */

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // Form state management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Navigation hook for redirect after registration
  const navigate = useNavigate();

  /**
   * Handles user registration process
   * 1. Creates authentication account
   * 2. Creates Firestore user document
   * 3. Navigates to home page on success
   * 
   * @param {Event} e - Form submission event
   */
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Create authentication account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Initialize user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
        transcriptions: []  // Array to store user's transcriptions
      });

      alert("Registration successful");
      // Redirect to home page
      navigate('/');
    } catch (err) {
      // Handle registration errors
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <h1 className="main-title">Create Account</h1>
      <p className="main-subtitle">Join us to get started</p>

      <div className="max-w-md mx-auto">
        <div className="section-card">
          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Email Input Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="search-input"
                placeholder="Enter your email"
              />
            </div>
            
            {/* Password Input with Visibility Toggle */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="search-input pr-10"
                  placeholder="Choose a password"
                />
                {/* Password Visibility Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message Display */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* Submit Button */}
            <button type="submit" className="generate-button w-full">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;