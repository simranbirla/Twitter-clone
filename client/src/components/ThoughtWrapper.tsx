import React from "react";
import { useBookmarkContext } from "../context/Bookmark";
import { IThought } from "../interfaces/Thought";
import { getIsBookmarked } from "../utils/getIsBookmarked";
import ThoughtContainer from "./ThoughtContainer";
import { getBase64String } from "../utils/getBase64String";
import { PageType } from "../enum/PageType";

interface IThoughtWrapper {
  thought: IThought;
  getThought: () => void;
}

export default function ThoughtWrapper({
  thought,
  getThought,
}: IThoughtWrapper) {
  const { bookmarks } = useBookmarkContext();

  return (
    <div>
      <ThoughtContainer
        id={thought._id}
        shares={thought.retweets}
        type={PageType.CHILD}
        isBookmark={getIsBookmarked(bookmarks, thought._id)}
        photo={getBase64String(thought.userId.photo.data)}
        getThought={getThought}
        {...thought}
      />
    </div>
  );
}
