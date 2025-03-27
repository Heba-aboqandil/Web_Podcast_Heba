/**
 * Login.jsx
 * Authentication page for user login functionality.
 * Provides email/password authentication using Firebase.
 * 
 * Features:
 * - Email and password form validation
 * - Password visibility toggle
 * - Error handling and display
 * - Firebase Authentication integration
 */

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Eye, EyeOff } from 'lucide-react'; // Using the same icon library as Home.jsx
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // Form state management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  

  /**
   * Handles form submission and user authentication
   * Attempts to sign in user with provided credentials
   * 
   * @param {Event} e - Form submission event
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Attempt Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
      navigate('/');
    } catch (err) {
      // Handle authentication errors
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <h1 className="main-title">Welcome Back</h1>
      <p className="main-subtitle">Sign in to your account to continue</p>

      <div className="max-w-md mx-auto">
        <div className="section-card">
          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
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
                  placeholder="Enter your password"
                />
                {/* Password Visibility Toggle Button */}
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

            {/* Error Display */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* Submit Button */}
            <button type="submit" className="generate-button w-full">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;