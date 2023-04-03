import React, { useState } from "react";
import Modal from "react-modal";
import ThoughtForm from "./ThoughtForm";
import { useThoughtsContext } from "../context/Thoughts";

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

export default function ThinkModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getThoughts } = useThoughtsContext();

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <button onClick={openModal}>Thinkkk</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        contentLabel={"Thinkkk"}
        style={customStyles}
      >
        <div>Hello</div>
        <ThoughtForm parent={true} getThought={getThoughts} />
      </Modal>
    </div>
  );
}
