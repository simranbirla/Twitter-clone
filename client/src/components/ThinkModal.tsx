import React, { useState } from "react";
import Modal from "react-modal";

export default function ThinkModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      >
        <div>Hello</div>
        <input type="text" placeholder="What do you want to talk about" />
        <button>Tell</button>
      </Modal>
    </div>
  );
}
