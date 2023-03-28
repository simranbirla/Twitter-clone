import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThoughtContainer from "../components/ThoughtContainer";
import { IThought } from "../interfaces/Thought";
import { makeRequest } from "../utils/makeRequest";

export default function AllThoughts() {
  const [thoughts, setThoughts] = useState<IThought[]>([]);

  const getAllThoughts = async () => {
    const { data } = await makeRequest("/tweet");
    console.log(data);
    setThoughts(data);
  };

  useEffect(() => {
    getAllThoughts();
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
