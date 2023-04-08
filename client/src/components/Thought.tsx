import React from "react";
import ThoughtContainer from "../components/ThoughtContainer";
import { useBookmarkContext } from "../context/Bookmark";
import { IThought } from "../interfaces/Thought";
import { getIsBookmarked } from "../utils/getIsBookmarked";
import LikeModal from "./LikeModal";
import RethoughtModal from "./RethoughtModal";
import { getBase64String } from "../utils/getBase64String";
import { PageType } from "../enum/PageType";

interface IThoughtList {
  thought: IThought;
  type: PageType;
  getThought: () => void;
}

export default function Thought({ thought, getThought, type }: IThoughtList) {
  const { bookmarks } = useBookmarkContext();

  return (
    <>
      {thought ? (
        <div>
          <ThoughtContainer
            id={thought._id}
            shares={thought.retweets}
            type={type}
            getThought={getThought}
            isBookmark={getIsBookmarked(bookmarks, thought._id)}
            photo={getBase64String(thought.userId.photo.data)}
            {...thought}
          >
            <LikeModal />
            <RethoughtModal />
          </ThoughtContainer>
          {thought.childIds?.map((child) => {
            return (
              <div key={child._id}>
                <ThoughtContainer
                  id={child._id as string}
                  shares={child.retweets as number}
                  type={PageType.CHILD}
                  isBookmark={getIsBookmarked(bookmarks, child._id as string)}
                  photo={getBase64String(child.userId?.photo.data as number[])}
                  {...(child as IThought)}
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
