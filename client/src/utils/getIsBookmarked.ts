import { ISavedThoughts } from "../interfaces/Thought";

export const getIsBookmarked = (bookmarks: ISavedThoughts[], id: string) =>
  !!bookmarks.find(({ tweetId }) => tweetId._id === id);
