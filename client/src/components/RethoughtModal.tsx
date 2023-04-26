import React, { useState } from "react";
import { useParams } from "react-router";
import { makeRequest } from "../utils/makeRequest";
import { IUser } from "../interfaces/User";
import { getBase64String } from "../utils/getBase64String";
import ModalCard from "./Modal";

export default function RethoughtModal() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();

  const openModal = async () => {
    const { data } = await makeRequest(`/tweet/${id}/retweets`);
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
    <ModalCard
      onOpenModal={openModal}
      onCloseModal={closeModal}
      heading="Shared By"
      label="Reshared"
      loading={loading}
      users={users}
    />
  );
}
