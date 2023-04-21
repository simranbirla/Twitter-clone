import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/User";
import ThinkModal from "./ThinkModal";
import { makeRequest } from "../utils/makeRequest";
import "../styles/navigation.scss";

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
          <li>
            {user.loggedIn ? (
              <button onClick={logOut} className="navigation__logout button">
                Logout
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
        <ThinkModal className="navigation__modal" />
      </nav>
      <Link to="profile" className="navigation__user">
        <img
          src={user.photo}
          alt={user.name}
          className="navigation__user-img"
        />
        <div className="navigation__name">
          <p>{user.name}</p>
          <p className="navigation__name--username">@{user.username}</p>
        </div>
      </Link>
    </div>
  );
}
