import React, { useEffect, useState } from "react";
import ThoughtContainer from "../components/ThoughtContainer";
import { IThought } from "../interfaces/Thought";
import { makeRequest } from "../utils/makeRequest";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<IThought[]>([]);

  const getBookmarks = async () => {
    const { data } = await makeRequest("/bookmark");
    setBookmarks(data);

    console.log(data);
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <div>
      {bookmarks ? (
        <>
          {bookmarks.map((bookmark) => (
            <ThoughtContainer
              id={bookmark._id}
              likes={bookmark.likes}
              shares={bookmark.retweets}
              text={bookmark.text}
              parent={true}
            />
          ))}
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
