import React from "react";
import Thoughts from "../components/Thoughts";
import { IThought } from "../interfaces/Thought";

export interface IReThought {
  tweetId: IThought;
  userId: string;
}

export default function ReThoughts() {
  return <Thoughts type="retweet" />;
}
