import React from "react";
import ThoughtContainer from "../components/ThoughtContainer";
import { useBookmarkContext } from "../context/Bookmark";
import { IThought } from "../interfaces/Thought";
import { getIsBookmarked } from "../utils/getIsBookmarked";
import LikeModal from "./LikeModal";
import RethoughtModal from "./RethoughtModal";

interface IThoughtList {
  thought: IThought;
  parent: boolean;
  getThought: () => void;
}

export default function Thought({ thought, getThought, parent }: IThoughtList) {
  const { bookmarks } = useBookmarkContext();

  return (
    <>
      {thought ? (
        <div>
          <ThoughtContainer
            id={thought._id}
            likes={thought.likes}
            shares={thought.retweets}
            text={thought.text}
            parent={parent}
            getThought={getThought}
            isBookmark={getIsBookmarked(bookmarks, thought._id)}
          >
            <LikeModal />
            <RethoughtModal />
          </ThoughtContainer>
          {thought.childIds?.map((child) => {
            return (
              <div key={child._id}>
                <ThoughtContainer
                  id={child._id as string}
                  likes={child.likes as number}
                  shares={child.retweets as number}
                  text={child.text as string}
                  parent={false}
                  isBookmark={getIsBookmarked(bookmarks, child._id as string)}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
