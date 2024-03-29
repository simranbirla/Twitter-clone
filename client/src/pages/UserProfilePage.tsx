import React, { useEffect, useState } from "react";
import ThoughtsContainer from "../components/ThoughtsContainer";
import UserProfile from "../components/UserProfile";
import { IUser } from "../interfaces/User";
import { IThought } from "../interfaces/Thought";
import { makeRequest } from "../utils/makeRequest";
import { useParams } from "react-router";
import NotFound from "./404";
import { getBase64String } from "../utils/getBase64String";

export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<IUser>();
  const [thoughts, setThoughts] = useState<IThought[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getUsersThoughts = async () => {
    setLoading(true);
    const { data } = await makeRequest(`/tweet/user/${id}`);
    setThoughts(data);
    setLoading(false);
  };

  const getUserInfo = async () => {
    const { data } = await makeRequest(`/user/${id}`);
    const dataUrl = getBase64String(data.photo.data);
    setUser({ ...data, photo: dataUrl, id: data._id });
  };

  useEffect(() => {
    getUserInfo();
    getUsersThoughts();
  }, []);

  console.log(user);

  if (user) {
    return (
      <React.Fragment>
        <UserProfile {...user} />
        <ThoughtsContainer
          getThoughts={getUsersThoughts}
          thoughts={thoughts}
          loading={loading}
        />
      </React.Fragment>
    );
  }

  return <NotFound />;
}
