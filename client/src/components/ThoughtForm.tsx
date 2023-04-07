import React, { MouseEventHandler, useState } from "react";
import { makeRequest } from "../utils/makeRequest";
import { useNavigate } from "react-router";
import { useUserContext } from "../context/User";

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
  const {
    user: { loggedIn },
  } = useUserContext();
  const navigate = useNavigate();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (!loggedIn) {
      navigate("/login");
      return;
    }

    await makeRequest("/tweet", {
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
  };

  return (
    <form>
      <input
        placeholder="Add your thought"
        onChange={(e) => setThought(e.target.value)}
        value={thought}
      />
      <button onClick={handleClick} disabled={!thought}>
        Tell
      </button>
    </form>
  );
}
