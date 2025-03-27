import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import DarkModeToggle from './DarkModeToggle';
import { Mic, LogIn, UserPlus, UserCircle, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    
    return () => unsubscribe();
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        {/* Brand logo and name */}
        <Link to="/" className="logo">
          <Mic size={24} className="text-blue-500" />
          <span className="hidden sm:inline">SoundScribe</span>
          <span className="text-2xl">📝</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden z-20 p-2 rounded-lg transition-colors hover:opacity-80"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile menu overlay */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
     
        {/* Navigation links - Desktop and Mobile */}
        <div
          className={`${
            isMenuOpen
              ? 'fixed top-0 right-0 h-screen w-64 shadow-lg transform translate-x-0'
              : 'hidden md:flex'
          } md:relative md:h-auto md:w-auto md:shadow-none md:translate-x-0 transition-transform duration-300 ease-in-out nav-menu`}
          style={{ backgroundColor: 'var(--primary-bg)' }}
        >
          <div className={`${
            isMenuOpen
              ? 'flex flex-col items-start p-4 pt-16 space-y-4'
              : 'flex items-center gap-4'
          } nav-links`}>
            <Link
              to="/about"
              className="hover:opacity-80 transition-opacity w-full md:w-auto"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors w-full md:w-auto justify-center md:justify-start"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors w-full md:w-auto justify-center md:justify-start"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserPlus size={18} />
                  <span>Register</span>
                </Link>
              </>
            ) : (
              <div className={`${
                isMenuOpen
                  ? 'flex flex-col space-y-4 w-full'
                  : 'flex items-center gap-3'
              }`}>
                <Link
                  to="/profile"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors w-full md:w-auto justify-center md:justify-start"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserCircle size={18} />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors w-full md:w-auto justify-center md:justify-start"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}

            <div className={`${
              isMenuOpen ? 'w-full flex justify-center' : ''
            }`}>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;