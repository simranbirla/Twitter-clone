import React, { useState } from "react";
import Modal from "react-modal";
import { useParams } from "react-router";
import { makeRequest } from "../utils/makeRequest";
import UserCard from "./UserCard";
import { IUser } from "../interfaces/User";
import { getBase64String } from "../utils/getBase64String";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function LikeModal() {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();

  const openModal = async () => {
    setIsOpen(true);
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
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {loading ? (
          <div>Loading</div>
        ) : (
          <>
            <h2>Hello</h2>
            <button onClick={closeModal}>close</button>
            {users.length > 0 ? (
              <div>
                {users.map((user) => (
                  <UserCard
                    image={user.photo}
                    status={user.status}
                    username={user.username}
                    name={user.name}
                  />
                ))}
              </div>
            ) : (
              <p>Nobody has liked the tweet</p>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}
