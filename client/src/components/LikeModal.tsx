import React, { useState } from "react";
import { useParams } from "react-router";
import { makeRequest } from "../utils/makeRequest";
import { IUser } from "../interfaces/User";
import { getBase64String } from "../utils/getBase64String";
import ModalCard from "./Modal";

export default function LikeModal() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();

  const openModal = async () => {
    const { data } = await makeRequest(`/tweet/${id}/likes`);
    const usersData = data.map((user: any) => {
      return { ...user, id: user._id, photo: getBase64String(user.photo.data) };
    });
    setUsers(usersData);
    setLoading(false);
  };

  const closeModal = () => {
    setLoading(true);
  };

  return (
    <ModalCard
      onOpenModal={openModal}
      onCloseModal={closeModal}
      label="Liked"
      heading="Liked By"
      loading={loading}
      users={users}
    />
  );
}
