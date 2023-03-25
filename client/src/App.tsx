import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Bookmarks from "./pages/Bookmarks";
import Login from "./pages/Login";
import SingleThought from "./pages/SingleThought";
import Thoughts from "./pages/Thoughts";

function App() {
  return (
    <Router>
      <div className="App">
        Hello
        <Navigation signIn={false} />
        <Routes>
          <Route path="/" Component={Thoughts} />
          <Route
            path="/profile/:id"
            element={<div>Profile should be here</div>}
          />
          <Route path="/thought/:id" Component={SingleThought} />
          <Route path="/login" Component={Login} />
          <Route path="/bookmarks" Component={Bookmarks} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
