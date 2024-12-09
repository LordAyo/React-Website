import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import About from "./pages/About";
import Navbar from "./components/Navbar"; // Import the Navbar component

const App: React.FC = () => (
  <Router>
    {/* Navbar is always displayed */}
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
);

export default App;
