import React from "react";
import { useUserContext } from "../context/User";
import UserProfile from "../components/UserProfile";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const { user, loading } = useUserContext();

  if (loading) {
    return <h2>Loading</h2>;
  }

  if (!user.loggedIn) {
    return <Navigate to="/login" />;
  }

  return <UserProfile {...user} edit={true} />;
}
