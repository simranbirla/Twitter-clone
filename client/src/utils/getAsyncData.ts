import { makeRequest } from "./makeRequest";

export const getAsyncData = async (type: string) => {
  if (type === "thoughts") {
    const { data } = await makeRequest("/tweet");
    return data;
  } else {
    const { data } = await makeRequest(`/${type}`);
    return data.tweetId;
  }
};
