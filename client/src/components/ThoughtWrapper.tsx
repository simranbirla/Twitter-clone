import React from "react";
import { IThought } from "../interfaces/Thought";
import ThoughtContainer from "./ThoughtContainer";

interface IThoughtWrapper {
  thought: IThought;
}

export default function ThoughtWrapper({ thought }: IThoughtWrapper) {
  const { _id, likes, retweets, text } = thought;
  return (
    <div>
      <ThoughtContainer
        id={_id}
        likes={likes}
        shares={retweets}
        text={text}
        parent={true}
      />
    </div>
  );
}
