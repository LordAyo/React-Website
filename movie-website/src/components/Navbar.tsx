import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Add useLocation

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation(); // Get current location

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const getActiveClass = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Movie Hub
      </Link>
      
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
        <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
        <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
      </div>

      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        <ul className="navbar-links">
          <li>
            <Link to="/" className={getActiveClass("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/watchlist" className={getActiveClass("/watchlist")}>
              Watchlist
            </Link>
          </li>
        </ul>
        <button className="navbar-toggle" onClick={toggleDarkMode}>
          {darkMode ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;