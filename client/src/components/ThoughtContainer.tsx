import React, { MouseEventHandler, useState } from "react";
import { IThought } from "../interfaces/Thought";
import { makeRequest } from "../utils/makeRequest";
import ThoughtWrapper from "./ThoughtWrapper";

export interface IThoughtContainer {
  id: string;
  text: string;
  likes: number;
  shares: number;
}

export default function ThoughtContainer({
  id,
  text,
  likes,
  shares,
}: IThoughtContainer) {
  const [thought, setThought] = useState<string>();
  const [childThoughts, setChildThoughts] = useState<IThought[]>([]);
  const [showChild, setShowChild] = useState<boolean>(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    console.log(e, thought);
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

    console.log(data);
  };

  const getThought = async () => {
    const { data } = await makeRequest(`/tweet/${id}`);
    setChildThoughts(data.childIds);
    setShowChild(true);
  };

  return (
    <div>
      <div>
        {text}
        <p>{likes}</p>
        <p>{shares}</p>
        <input
          placeholder="Add your thought"
          onChange={(e) => setThought(e.target.value)}
        />
        <button onClick={handleClick}>Tell</button>
        <button onClick={getThought}>Show replies</button>
        {showChild &&
          childThoughts.map((child) => (
            <ThoughtWrapper thought={child} key={child._id} />
          ))}
      </div>
    </div>
  );
}
