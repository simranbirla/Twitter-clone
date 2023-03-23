import React, { MouseEventHandler, useState } from "react";
import { IThought } from "../interfaces/Thought";
import { makeRequest } from "../utils/makeRequest";
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
  const [thought, setThought] = useState<string>();
  const [childThoughts, setChildThoughts] = useState<IThought[]>([]);
  const [showChild, setShowChild] = useState<boolean>(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const { data } = await makeRequest("/tweet", {
      method: "POST",
      data: {
        parentId: id,
        text: thought,
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmQ5OTU5MjFlMDkyNTI2ZDYxZmNiNSIsImlhdCI6MTY3OTMxMTg4MywiZXhwIjoxNjc5OTE2NjgzfQ.HU7vr8qhOaoUVsaXHPimFNqbv6l8y6qPTDaP0xLOULs",
      },
    });
    setThought("");
    if (parent) {
      getChildThoughts();
    } else {
      getThought && getThought();
    }
    console.log(data);
  };

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
        <p>
          Likes: {likes ?? 0} Shares: {shares ?? 0}
        </p>

        <input
          placeholder="Add your thought"
          onChange={(e) => setThought(e.target.value)}
          value={thought}
        />
        <button onClick={handleClick}>Tell</button>
        {!parent && (
          <button onClick={getChildThoughts}>
            {showChild ? "Hide replies" : "Show replies"}
          </button>
        )}
        {showChild &&
          childThoughts.map((child) => (
            <ThoughtWrapper thought={child} key={child._id} />
          ))}
      </div>
    </div>
  );
}
