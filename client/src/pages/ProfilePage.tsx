import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../components/Profile";
import ThoughtContainer from "../components/ThoughtContainer";
import { useBookmarkContext } from "../context/Bookmark";
import { IThought } from "../interfaces/Thought";
import { getIsBookmarked } from "../utils/getIsBookmarked";
import { makeRequest } from "../utils/makeRequest";

export default function ProfilePage() {
  const [thoughts, setThoughts] = useState<IThought[]>([]);
  const { bookmarks } = useBookmarkContext();

  const getUsersThoughts = async () => {
    const { data } = await makeRequest("/tweet/user");
    setThoughts(data);
  };

  useEffect(() => {
    getUsersThoughts();
  }, []);

  return (
    <>
      <Profile />
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
              getThought={getUsersThoughts}
            />
          </div>
        ))
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
