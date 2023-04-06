import React from "react";
import LoginForm from "../components/LoginForm";
import { useUserContext } from "../context/User";
import { Link, Navigate } from "react-router-dom";

export default function Login() {
  const { user } = useUserContext();

  if (user.loggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <LoginForm />
      <Link to="/signup">Signup</Link>
    </div>
  );
}
