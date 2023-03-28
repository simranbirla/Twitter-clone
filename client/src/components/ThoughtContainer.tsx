import React, { useEffect, useState } from "react";
import { ISavedThoughts, IThought } from "../interfaces/Thought";
import { makeRequest } from "../utils/makeRequest";
import ThoughtForm from "./ThoughtForm";
import ThoughtWrapper from "./ThoughtWrapper";

export interface IThoughtContainer {
  id: string;
  text: string;
  likes: number;
  shares: number;
  parent: boolean;
  getThought?: () => void;
}

export default function ThoughtContainer({
  id,
  text,
  likes,
  shares,
  parent,
  getThought,
}: IThoughtContainer) {
  const [childThoughts, setChildThoughts] = useState<IThought[]>([]);
  const [showChild, setShowChild] = useState<boolean>(false);
  const [bookmark, setBookmark] = useState<boolean>(false);

  const getChildThoughts = async () => {
    if (showChild) {
      setShowChild(false);
    } else {
      const { data } = await makeRequest(`/tweet/${id}`);
      setChildThoughts(data.childIds);
      setShowChild(true);
    }
  };

  const likeThought = async () => {
    const { data } = await makeRequest(`/like/${id}`, {
      method: "POST",
    });
    getThought && getThought();
    console.log(data);
  };

  const reThought = async () => {
    const { data } = await makeRequest(`/retweet/${id}`, {
      method: "POST",
    });
    getThought && getThought();

    console.log(data);
  };

  const addBookmark = async () => {
    const { data } = await makeRequest(`/bookmark/${id}`, {
      method: "POST",
    });
    console.log(data);
  };

  const getBookmarks = async () => {
    console.log("heyyyyyy");
    const { data }: { data: ISavedThoughts[] } = await makeRequest("/bookmark");
    const bookmarkTweet = data.find((thought) => thought.tweetId._id === id);
    setBookmark(bookmarkTweet ? true : false);
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <div>
      <div className="thought">
        {text}
        <ThoughtForm
          parent={parent}
          id={id}
          getThought={getThought}
          getChildThoughts={getChildThoughts}
        />
        {!parent && (
          <button onClick={getChildThoughts}>
            {showChild ? "Hide replies" : "Show replies"}
          </button>
        )}
        <p>
          Likes: {likes ?? 0} reThought: {shares ?? 0}
        </p>
        <button onClick={likeThought}>❤️</button>
        <button onClick={reThought}>📤</button>
        <button onClick={addBookmark}>{bookmark ? "📑" : "📖"}</button>
        {showChild &&
          childThoughts.map((child) => (
            <ThoughtWrapper thought={child} key={child._id} />
          ))}
      </div>
    </div>
  );
}
