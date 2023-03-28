import React, { useState } from "react";
import { IThought } from "../interfaces/Thought";
import { makeRequest } from "../utils/makeRequest";
import ThoughtForm from "./ThoughtForm";
import ThoughtWrapper from "./ThoughtWrapper";

export interface IThoughtContainer {
  id: string;
  text: string;
  likes: number;
  shares: number;
  parent: boolean;
  getThought?: () => void;
}

export default function ThoughtContainer({
  id,
  text,
  likes,
  shares,
  parent,
  getThought,
}: IThoughtContainer) {
  const [childThoughts, setChildThoughts] = useState<IThought[]>([]);
  const [showChild, setShowChild] = useState<boolean>(false);

  const getChildThoughts = async () => {
    if (showChild) {
      setShowChild(false);
    } else {
      const { data } = await makeRequest(`/tweet/${id}`);
      setChildThoughts(data.childIds);
      setShowChild(true);
    }
  };

  return (
    <div>
      <div className="thought">
        {text}
        <ThoughtForm
          parent={parent}
          id={id}
          getThought={getThought}
          getChildThoughts={getChildThoughts}
        />
        {!parent && (
          <button onClick={getChildThoughts}>
            {showChild ? "Hide replies" : "Show replies"}
          </button>
        )}
        <p>
          Likes: {likes ?? 0} reThought: {shares ?? 0}
        </p>
        {showChild &&
          childThoughts.map((child) => (
            <ThoughtWrapper thought={child} key={child._id} />
          ))}
      </div>
    </div>
  );
}
