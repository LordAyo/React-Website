import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode); // Apply dark mode class to the body
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">MOVIE HUB</div>

      {/* Navigation Links */}
      <ul className="navbar-links">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      {/* Dark Mode Toggle */}
      <button className="navbar-toggle" onClick={toggleDarkMode}>
        {darkMode ? "🌙 Dark" : "☀️ Light"}
      </button>
    </nav>
  );
};

export default Navbar;
