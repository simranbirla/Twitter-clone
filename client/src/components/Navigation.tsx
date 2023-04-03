import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/User";
import ThinkModal from "./ThinkModal";

export default function Navigation() {
  const { user } = useUserContext();

  return (
    <div className="navigation">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {user.id ? (
              <Link to={`/profile/`}>Profile</Link>
            ) : (
              <Link to={`/login`}>Login</Link>
            )}
          </li>
          <li>
            <Link to={`/bookmarks/`}>Bookmarks</Link>
          </li>
          <li>
            <Link to="/rethoughts">ReThoughts</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
        <ThinkModal />
      </nav>
    </div>
  );
}
