import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/User";

export interface IPrivateRoute {
  children: React.ReactElement;
  redirectLink?: string;
}

export default function PrivateRoute({
  children,
  redirectLink = "/login",
}: IPrivateRoute) {
  const {
    user: { loggedIn },
    loading,
  } = useUserContext();

  if (loading) return <h2>Loading</h2>;

  if (!loggedIn) return <Navigate to={redirectLink} />;

  return children;
}
