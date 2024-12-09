import React from "react";

const About: React.FC = () => {
  return (
    <div className="about">
      <h1>About Movie Showcase</h1>
      <p>
        Welcome to <strong>Movie Showcase</strong>, your go-to platform for discovering and exploring movies from all around the world! Whether you're a cinephile or just looking for your next movie to watch, we've got you covered.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Browse a vast collection of movies.</li>
        <li>Filter movies by genres to find what you like.</li>
        <li>Search for specific movies using our search bar.</li>
        <li>Get detailed information about your favorite movies.</li>
      </ul>
      <h2>Powered By</h2>
      <p>
        This website uses the <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDb API</a> to provide accurate and up-to-date information about movies.
      </p>
      <h2>Contact Us</h2>
      <p>If you have any feedback or suggestions, feel free to reach out to us at <a href="mailto:support@movieshowcase.com">support@movieshowcase.com</a>.</p>
    </div>
  );
};

export default About;
