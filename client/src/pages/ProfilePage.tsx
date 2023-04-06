import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Profile from "../components/Profile";
import { IThought } from "../interfaces/Thought";
import { makeRequest } from "../utils/makeRequest";
import ThoughtsContainer from "../components/ThoughtsContainer";
import { useUserContext } from "../context/User";

export default function ProfilePage() {
  const { user } = useUserContext();
  const [thoughts, setThoughts] = useState<IThought[]>([]);

  const getUsersThoughts = async () => {
    const { data } = await makeRequest("/tweet/user");
    setThoughts(data);
  };

  useEffect(() => {
    getUsersThoughts();
  }, []);

  if (!user.id) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Profile />
      <ThoughtsContainer getThoughts={getUsersThoughts} thoughts={thoughts} />
    </>
  );
}
