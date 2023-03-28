import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IThought } from "../interfaces/Thought";
import { getAsyncData } from "../utils/getAsyncData";
import ThoughtContainer from "./ThoughtContainer";

export default function Thoughts({ type }: { type: string }) {
  const [thoughts, setThoughts] = useState<IThought[]>([]);

  const getThoughts = async () => {
    const data = await getAsyncData(type);
    setThoughts(data);
  };

  useEffect(() => {
    getThoughts();
  }, []);

  return (
    <div>
      Thoughts
      {thoughts ? (
        thoughts.map((thought) => (
          <div key={thought._id} className="thought">
            <Link to={`/thought/${thought._id}`}>Click</Link>
            <ThoughtContainer
              id={thought._id}
              likes={thought.likes}
              shares={thought.retweets}
              text={thought.text}
              parent={true}
            />
          </div>
        ))
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
