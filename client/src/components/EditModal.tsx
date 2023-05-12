import React, { MouseEventHandler, useState } from "react";
import Modal from "react-modal";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { makeRequest } from "../utils/makeRequest";
import { useUserContext } from "../context/User";
import { customStyles } from "../utils/customStyle";

export interface IEditModal {
  text: string;
  label: string;
  heading: string;
  placeholder: string;
  name: string;
}

export default function EditModal({
  text,
  placeholder,
  label,
  heading,
  name,
}: IEditModal) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(text);
  const { getUser } = useUserContext();

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    await makeRequest("/user", {
      method: "PATCH",
      data: {
        [name]: value,
      },
    });
    getUser();
  };

  return (
    <div className="edit-modal">
      <button onClick={openModal}>
        <MdOutlineModeEditOutline />
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        contentLabel={heading}
        style={customStyles}
      >
        <form className="edit-modal--form">
          <textarea
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <button onClick={handleClick} disabled={!value}>
            {label}
          </button>
        </form>
      </Modal>
    </div>
  );
}
