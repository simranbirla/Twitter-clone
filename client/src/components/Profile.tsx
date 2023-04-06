import React from "react";
import { useUserContext } from "../context/User";
import UserProfile from "../components/UserProfile";

export default function Profile() {
  const { user } = useUserContext();

  return (
    <div>
      Profile
      {user.loggedIn ? <UserProfile {...user} /> : <div>Loading</div>}
    </div>
  );
}
