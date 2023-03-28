import { ISavedThoughts } from "../interfaces/Thought";
import { makeRequest } from "./makeRequest";

export const getAsyncData = async (type: string) => {
  if (type === "thoughts") {
    const { data } = await makeRequest("/tweet");
    return data;
  } else {
    const { data }: { data: ISavedThoughts[] } = await makeRequest(`/${type}`);
    const thoughts = data.map((thought) => thought.tweetId);
    return thoughts;
  }
};
