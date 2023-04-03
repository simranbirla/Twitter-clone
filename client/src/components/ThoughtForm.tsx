import React, { MouseEventHandler, useState } from "react";
import { makeRequest } from "../utils/makeRequest";

export interface IThoughtForm {
  id?: string;
  parent: boolean;
  getThought?: () => void;
  getChildThoughts?: () => void;
}

export default function ThoughtForm({
  id,
  parent,
  getThought,
  getChildThoughts,
}: IThoughtForm) {
  const [thought, setThought] = useState<string>();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const { data } = await makeRequest("/tweet", {
      method: "POST",
      data: {
        parentId: id,
        text: thought,
      },
    });
    setThought("");
    if (parent) {
      getThought && getThought();
    } else {
      getChildThoughts && getChildThoughts();
    }
    console.log(data);
  };

  return (
    <form>
      <input
        placeholder="Add your thought"
        onChange={(e) => setThought(e.target.value)}
        value={thought}
      />
      <button onClick={handleClick}>Tell</button>
    </form>
  );
}
