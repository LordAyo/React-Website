import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getActiveClass = (path: string) => {
    return window.location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        Movie Hub
      </a>

      <div className="hamburger" onClick={toggleMenu}>
        <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
        <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
        <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
      </div>

      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        <ul className="navbar-links">
          <li>
            <a href="/" className={getActiveClass("/")}>
              Home
            </a>
          </li>
          <li>
            <a href="/discover" className={getActiveClass("/discover")}>
              Discover
            </a>
          </li>
          <li>
            <a href="/MovieDetails" className={getActiveClass("/discover")}>
              Discover
            </a>
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
