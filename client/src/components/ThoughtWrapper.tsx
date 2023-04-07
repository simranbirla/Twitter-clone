import React from "react";
import { useBookmarkContext } from "../context/Bookmark";
import { IThought } from "../interfaces/Thought";
import { getIsBookmarked } from "../utils/getIsBookmarked";
import ThoughtContainer from "./ThoughtContainer";
import { getBase64String } from "../utils/getBase64String";

interface IThoughtWrapper {
  thought: IThought;
}

export default function ThoughtWrapper({ thought }: IThoughtWrapper) {
  const { bookmarks } = useBookmarkContext();

  return (
    <div>
      <ThoughtContainer
        id={thought._id}
        shares={thought.retweets}
        parent={true}
        isBookmark={getIsBookmarked(bookmarks, thought._id)}
        photo={getBase64String(thought.userId.photo.data)}
        {...thought}
      />
    </div>
  );
}
