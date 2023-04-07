import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/User";
import ThinkModal from "./ThinkModal";
import { makeRequest } from "../utils/makeRequest";

export default function Navigation() {
  const { user, getUser } = useUserContext();

  const logOut = async () => {
    await makeRequest("/auth/logout", { method: "POST" });
    await getUser();
  };

  return (
    <div className="navigation">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {user.loggedIn ? (
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
        </ul>
        <ThinkModal />
        <button onClick={logOut}>Logout</button>
      </nav>
    </div>
  );
}
