import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IThought } from "../interfaces/Thought";
import { makeRequest } from "../utils/makeRequest";

export default function Thoughts() {
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
          <div key={thought._id}>
            <Link to={`/thought/${thought._id}`}>Click</Link>
            <div>{thought.text}</div>
          </div>
        ))
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
