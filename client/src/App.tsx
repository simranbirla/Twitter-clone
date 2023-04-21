import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Bookmarks from "./pages/Bookmarks";
import Login from "./pages/Login";
import ReThoughts from "./pages/ReThoughts";
import SingleThought from "./pages/SingleThought";
import AllThoughts from "./pages/AllThoughts";
import SignUp from "./pages/SignUp";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfilePage from "./pages/UserProfilePage";
import "./styles/App.scss";

function App() {
  const protectedRoutes = [
    {
      path: "/thought/:id",
      element: <SingleThought />,
    },
    {
      path: "bookmarks",
      element: <Bookmarks />,
    },
    {
      path: "rethoughts",
      element: <ReThoughts />,
    },
    {
      path: "profile",
      element: <ProfilePage />,
    },
  ];

  return (
    <Router>
      <div className="App">
        Hello
        <Navigation />
        <Routes>
          <Route path="/" Component={AllThoughts} />
          <Route path="/profile/:id" element={<UserProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {protectedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<ProtectedRoute>{route.element}</ProtectedRoute>}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
