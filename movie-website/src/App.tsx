import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Navbar from "./components/Navbar";
import Discover from "./pages/Discover";

const App: React.FC = () => (
  <Router>
    {/* Navbar is always displayed */}
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/discover" element={<Discover />} />
    </Routes>
  </Router>
);

export default App;
