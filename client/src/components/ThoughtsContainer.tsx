import React from "react";
import { getIsBookmarked } from "../utils/getIsBookmarked";
import { useBookmarkContext } from "../context/Bookmark";
import { IThought } from "../interfaces/Thought";
import { Link } from "react-router-dom";
import ThoughtContainer from "./ThoughtContainer";
import { getBase64String } from "../utils/getBase64String";
import { PageType } from "../enum/PageType";

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
    <>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="thoughts">
            <ThoughtContainer
              id={thought._id}
              shares={thought.retweets}
              type={PageType.THOUGHTS}
              isBookmark={getIsBookmarked(bookmarks, thought._id)}
              getThought={getThoughts}
              photo={getBase64String(thought.userId.photo.data)}
              {...thought}
            />
          </div>
        ))}
    </>
  );
}
