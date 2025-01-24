import React, { useState } from "react";
import Modal from "react-modal";
import ThoughtForm from "./ThoughtForm";
import { useThoughtsContext } from "../context/Thoughts";
import { PageType } from "../enum/PageType";
import "../styles/modal.scss";
import { customStyles } from "../utils/customStyle";
import { useUserContext } from "../context/User";
import { useNavigate } from "react-router";


export default function ThinkModal(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useUserContext()
  const { getThoughts } = useThoughtsContext();
  const navigate = useNavigate();

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    if (!user.loggedIn) {
      return navigate("/login");
    }


    setIsOpen(true);
  };

  const getThought = async () => {
    await getThoughts();
    onCloseModal();
    navigate("/");
  };

  return (
    <div className="modal" {...props}>
      <button onClick={openModal} className="modal__button">
        Post
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        contentLabel={"Post"}
        style={customStyles}
      >
        <ThoughtForm
          type={PageType.MODAL}
          getThought={getThought}
          className="think-modal"
        />
      </Modal>
    </div>
  );
}
