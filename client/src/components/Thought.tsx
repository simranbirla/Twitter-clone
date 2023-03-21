import React from "react";
import ThoughtContainer from "../components/ThoughtContainer";
import { IThought } from "../interfaces/Thought";

interface IThoughtList {
  thought: IThought;
}

export default function Thought({ thought }: IThoughtList) {
  return (
    <div>
      {thought ? (
        <div>
          <ThoughtContainer
            id={thought._id}
            likes={thought.likes}
            shares={thought.retweets}
            text={thought.text}
          />
          {thought.childIds?.map((child) => (
            <div key={child._id}>
              <ThoughtContainer
                id={child._id as string}
                likes={child.likes as number}
                shares={child.retweets as number}
                text={child.text as string}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
