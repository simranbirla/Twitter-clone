import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Bookmarks from "./pages/Bookmarks";
import Login from "./pages/Login";
import ReThoughts from "./pages/ReThoughts";
import SingleThought from "./pages/SingleThought";
import AllThoughts from "./pages/AllThoughts";
import SignUp from "./pages/SignUp";
import { BookmarkProvider } from "./context/Bookmark";
import ProfilePage from "./pages/ProfilePage";
import { UserStoreProvider } from "./context/User";

function App() {
  return (
    <Router>
      <UserStoreProvider>
        <BookmarkProvider>
          <div className="App">
            Hello
            <Navigation />
            <Routes>
              <Route path="/" Component={AllThoughts} />
              <Route
                path="/profile/:id"
                element={<div>Profile should be here</div>}
              />
              <Route path="/thought/:id" Component={SingleThought} />
              <Route path="/login" Component={Login} />
              <Route path="/signup" Component={SignUp} />
              <Route path="/bookmarks" Component={Bookmarks} />
              <Route path="/rethoughts" Component={ReThoughts} />
              <Route path="/profile" Component={ProfilePage} />
            </Routes>
          </div>
        </BookmarkProvider>
      </UserStoreProvider>
    </Router>
  );
}

export default App;
