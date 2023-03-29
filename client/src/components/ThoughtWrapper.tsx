import React from "react";
import { useBookmarkContext } from "../context/Bookmark";
import { IThought } from "../interfaces/Thought";
import { getIsBookmarked } from "../utils/getIsBookmarked";
import ThoughtContainer from "./ThoughtContainer";

interface IThoughtWrapper {
  thought: IThought;
}

export default function ThoughtWrapper({ thought }: IThoughtWrapper) {
  const { _id, likes, retweets, text } = thought;
  const { bookmarks } = useBookmarkContext();

  return (
    <div>
      <ThoughtContainer
        id={_id}
        likes={likes}
        shares={retweets}
        text={text}
        parent={true}
        isBookmark={getIsBookmarked(bookmarks, _id)}
      />
    </div>
  );
}
