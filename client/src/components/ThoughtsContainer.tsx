import React from "react";
import { getIsBookmarked } from "../utils/getIsBookmarked";
import { useBookmarkContext } from "../context/Bookmark";
import { IThought } from "../interfaces/Thought";
import { Link } from "react-router-dom";
import ThoughtContainer from "./ThoughtContainer";

export interface IThoughtsContainer {
  thoughts: IThought[];
  getThoughts: () => Promise<void>;
}

export default function ThoughtsContainer({
  thoughts,
  getThoughts,
}: IThoughtsContainer) {
  const { bookmarks } = useBookmarkContext();

  return (
    <div>
      Thoughts
      {thoughts ? (
        thoughts.map((thought) => (
          <div key={thought._id} className="thought">
            <Link to={`/thought/${thought._id}`}>Click</Link>
            <ThoughtContainer
              id={thought._id}
              likes={thought.likes}
              shares={thought.retweets}
              text={thought.text}
              parent={true}
              isBookmark={getIsBookmarked(bookmarks, thought._id)}
              getThought={getThoughts}
            />
          </div>
        ))
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
