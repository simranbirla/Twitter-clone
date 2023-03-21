import React from "react";
import { IThought } from "../interfaces/Thought";
import Thought from "./Thought";

interface IThoughtWrapper {
  thought: IThought;
}

export default function ThoughtWrapper({ thought }: IThoughtWrapper) {
  return (
    <div>
      <Thought thought={thought} />
    </div>
  );
}
