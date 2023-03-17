import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";

function App() {
  return (
    <Router>
      <div className="App">
        Hello
        <Navigation signIn={false} />
        <Routes>
          <Route path="/" element={<div>Heyyy</div>} />
          <Route
            path="/profile/:id"
            element={<div>Profile should be here</div>}
          />
          <Route path="/tweet/:id" element={<div>Single tweet display</div>} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/bookmarks" element={<div>Bookmark</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
