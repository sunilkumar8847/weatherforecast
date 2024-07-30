import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import CSS for styling

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on component mount and when token changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('jwt');
      setIsLoggedIn(!!token); // Convert token presence to boolean
    };

    checkLoginStatus(); // Check on mount

    // Optionally, listen to storage events for other tabs/windows
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt'); // Remove JWT token from localStorage
    setIsLoggedIn(false); // Update state
    navigate('/signup'); // Redirect to home page or any other page
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/home">Weather</Link>
        </li>
        <li className="navbar-item">
          <Link to="/map">Map</Link>
        </li>
        <li className="navbar-item">
          <Link to="/about">About</Link>
        </li>
        <li className="navbar-item profile-menu">
          <div className="profile-icon">👤</div>
          <div className="profile-dropdown">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="dropdown-item">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="dropdown-item">
                  Login
                </Link>
                <Link to="/signup" className="dropdown-item">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
