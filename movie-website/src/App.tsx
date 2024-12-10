import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import WatchList from "./pages/WatchList";

const App: React.FC = () => (
  <Router>
    {/* Navbar is always displayed */}
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/watchlist" element={<WatchList />} />
    </Routes>
  </Router>
);

export default App;
