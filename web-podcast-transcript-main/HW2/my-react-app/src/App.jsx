/**
 * App.jsx
 * Root component of the SoundScribe application.
 * Handles routing configuration and global context providers.
 * 
 * Features:
 * - Route configuration
 * - Language context provider
 * - Global navigation layout
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from "./pages/Login";
import Profile from "./pages/Profile"
import Register from "./pages/Register";
import CrewDetail from './pages/CrewDetail';
import { LanguageProvider } from './utils/LanguageContext';
import './index.css'

/**
 * Main application component
 * Sets up routing and global providers
 * 
 * Route Structure:
 * - / → Home page (Transcription interface)
 * - /about → About page (Team information)
 * - /crew/:id → Individual team member details
 * - /login → User login
 * - /register → New user registration
 */
function App() {
  return (
    <LanguageProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/crew/:id" element={<CrewDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;