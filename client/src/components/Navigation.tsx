import React from "react";
import { Link } from "react-router-dom";

interface INavigation {
  signIn: boolean;
}

export default function Navigation({ signIn }: INavigation) {
  return (
    <div className="navigation">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {signIn ? (
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
        <button>Think</button>
      </nav>
    </div>
  );
}
