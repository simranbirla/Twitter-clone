import { ISavedThoughts } from "../interfaces/Thought";

export const getIsBookmarked = (bookmarks: ISavedThoughts[], id: string) =>
  !!bookmarks.find(({ tweetId }) => tweetId._id === id);

export const getIsLiked = (thoughts: ISavedThoughts[], id: string) => {
  console.log(thoughts, id);
  return !!thoughts.find(({ tweetId }) => tweetId._id === id);
};
