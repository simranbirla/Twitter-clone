import React from "react";
import SignUpForm from "../components/SignUpForm";
import { Navigate } from "react-router";
import { useUserContext } from "../context/User";

export default function SignUp() {
  const {
    user: { loggedIn },
  } = useUserContext();

  if (loggedIn) return <Navigate to="/profile" />;

  return <SignUpForm />;
}
