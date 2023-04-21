import React from "react";
import { getIsBookmarked } from "../utils/getIsBookmarked";
import { useBookmarkContext } from "../context/Bookmark";
import { IThought } from "../interfaces/Thought";
import ThoughtContainer from "./ThoughtContainer";
import { getBase64String } from "../utils/getBase64String";
import { PageType } from "../enum/PageType";
import "../styles/thought.scss";

export interface IThoughtsContainer {
  thoughts: IThought[];
  getThoughts: () => Promise<void>;
  loading: boolean;
}

export default function ThoughtsContainer({
  thoughts,
  getThoughts,
  loading,
}: IThoughtsContainer) {
  const { bookmarks } = useBookmarkContext();

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="thoughts">
      {thoughts &&
        thoughts.map((thought) => (
          <ThoughtContainer
            id={thought._id}
            shares={thought.retweets}
            type={PageType.THOUGHTS}
            isBookmark={getIsBookmarked(bookmarks, thought._id)}
            getThought={getThoughts}
            photo={getBase64String(thought.userId.photo.data)}
            {...thought}
          />
        ))}
    </div>
  );
}
