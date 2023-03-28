import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThoughtContainer from "../components/ThoughtContainer";
import { IBookmark } from "../interfaces/Bookmark";
import { makeRequest } from "../utils/makeRequest";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<IBookmark[]>([]);

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
          {bookmarks.map(({ tweetId: thought }) => (
            <div key={thought._id} className="thought">
              <Link to={`/thought/${thought._id}`}>Click</Link>
              <ThoughtContainer
                id={thought._id}
                likes={thought.likes}
                shares={thought.retweets}
                text={thought.text}
                parent={true}
              />
            </div>
          ))}
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
