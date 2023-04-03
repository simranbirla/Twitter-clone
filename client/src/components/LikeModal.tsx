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
      return { ...user, photo: getBase64String(user.photo.data) };
    });
    console.log(usersData);
    setUsers(data);
    setLoading(false);
  };

  const closeModal = () => {
    setLoading(true);
  };

  return (
    <div>
      <ModalCard
        onOpenModal={openModal}
        onCloseModal={closeModal}
        label="Liked"
        heading="Liked BY"
        loading={loading}
        users={users}
      />
    </div>
  );
}
