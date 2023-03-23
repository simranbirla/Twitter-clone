import React from "react";
import ThoughtContainer from "../components/ThoughtContainer";
import { IThought } from "../interfaces/Thought";

interface IThoughtList {
  thought: IThought;
  parent: boolean;
  getThought: () => void;
}

export default function Thought({ thought, getThought, parent }: IThoughtList) {
  return (
    <>
      {thought ? (
        <div>
          <ThoughtContainer
            id={thought._id}
            likes={thought.likes}
            shares={thought.retweets}
            text={thought.text}
            parent={parent}
            getThought={getThought}
          />
          {thought.childIds?.map((child) => (
            <div key={child._id}>
              <ThoughtContainer
                id={child._id as string}
                likes={child.likes as number}
                shares={child.retweets as number}
                text={child.text as string}
                parent={false}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
