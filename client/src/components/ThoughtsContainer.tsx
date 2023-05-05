import React from "react";
import { getIsBookmarked, getIsLiked } from "../utils/getIsBookmarked";
import { useBookmarkContext } from "../context/Bookmark";
import { IThought } from "../interfaces/Thought";
import ThoughtContainer from "./ThoughtContainer";
import { getBase64String } from "../utils/getBase64String";
import { PageType } from "../enum/PageType";
import "../styles/thought.scss";
import { useLikeContext } from "../context/Likes";

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
  const { likes } = useLikeContext();

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="thoughts">
      {thoughts.length > 0 ? (
        thoughts.map((thought) => (
          <ThoughtContainer
            id={thought._id}
            shares={thought.retweets}
            type={PageType.THOUGHTS}
            isBookmark={getIsBookmarked(bookmarks, thought._id)}
            isLiked={getIsLiked(likes, thought._id)}
            getThought={getThoughts}
            photo={getBase64String(thought.userId.photo.data)}
            {...thought}
          />
        ))
      ) : (
        <p>No Thoughts here</p>
      )}
    </div>
  );
}
