import React from "react";
import { makeRequest } from "../utils/makeRequest";

export interface IDeleteButton {
  id: string;
  getThought: () => void;
}

export default function DeleteButton({ id, getThought }: IDeleteButton) {
  const handleDelete = async () => {
    await makeRequest(`/tweet/${id}`, {
      method: "DELETE",
    });

    getThought();
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
