import React, { MouseEventHandler, useState } from "react";
import { makeRequest } from "../utils/makeRequest";
import { useNavigate } from "react-router";
import { useUserContext } from "../context/User";
import { PageType } from "../enum/PageType";

export interface IThoughtForm {
  id?: string;
  type: PageType;
  getThought?: () => void;
  getChildThoughts?: () => void;
  className?: string;
}

export default function ThoughtForm({
  id,
  type,
  getThought,
  getChildThoughts,
  className,
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

    if (type === PageType.SINGLE_THOUGHT || type === PageType.MODAL) {
      getThought && getThought();
    }

    if (type === PageType.THOUGHTS || type === PageType.CHILD) {
      getChildThoughts && getChildThoughts();
    }
  };

  return (
    <form className={`thought-form ${className}`}>
      <textarea
        placeholder="Add your thought"
        onChange={(e) => setThought(e.target.value)}
        value={thought}
      />
      <button onClick={handleClick} disabled={!thought}>
        Reply
      </button>
    </form>
  );
}
