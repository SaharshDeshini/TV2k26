import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
