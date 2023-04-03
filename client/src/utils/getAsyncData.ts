import { ISavedThoughts } from "../interfaces/Thought";
import { makeRequest } from "./makeRequest";

export const getAsyncData = async (type: string) => {
  const { data }: { data: ISavedThoughts[] } = await makeRequest(`/${type}`);
  const thoughts = data.map((thought) => thought.tweetId);
  return thoughts;
};
