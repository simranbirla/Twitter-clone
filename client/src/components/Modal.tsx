import React, { useState } from "react";
import Modal from "react-modal";
import UserCard from "./UserCard";
import { IUser } from "../interfaces/User";

const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export interface IModal {
  onOpenModal: () => void;
  onCloseModal: () => void;
  heading: string;
  label: string;
  users: IUser[];
  loading: boolean;
}

export default function ModalCard({
  onOpenModal,
  onCloseModal,
  label,
  heading,
  users,
  loading,
}: IModal) {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const openModal = async () => {
    setIsOpen(true);
    onOpenModal();
  };

  const closeModal = () => {
    setIsOpen(false);
    onCloseModal();
  };

  return (
    <div>
      <button onClick={openModal}>{label}</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={heading}
      >
        {loading ? (
          <div>Loading</div>
        ) : (
          <>
            <h2>{heading}</h2>
            <button onClick={closeModal}>close</button>
            {users.length > 0 ? (
              <div>
                {users.map((user) => (
                  <UserCard
                    key={user.id}
                    image={user.photo}
                    status={user.status}
                    username={user.username}
                    name={user.name}
                    id={user.id}
                  />
                ))}
              </div>
            ) : (
              <p>Nobody has {label} the tweet</p>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}
