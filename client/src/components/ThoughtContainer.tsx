import React, { useState } from "react";
import { useBookmarkContext } from "../context/Bookmark";
import { IThought } from "../interfaces/Thought";
import { makeRequest } from "../utils/makeRequest";
import ThoughtForm from "./ThoughtForm";
import ThoughtWrapper from "./ThoughtWrapper";
import { useUserContext } from "../context/User";
import { useNavigate } from "react-router-dom";

export interface IThoughtContainer {
  id: string;
  text: string;
  likes: number;
  shares: number;
  parent: boolean;
  isBookmark: boolean;
  getThought?: () => void;
  children?: React.ReactElement[] | React.ReactElement;
}

export default function ThoughtContainer({
  id,
  text,
  likes,
  shares,
  parent,
  isBookmark = false,
  getThought,
  children,
}: IThoughtContainer) {
  const [childThoughts, setChildThoughts] = useState<IThought[]>([]);
  const [showChild, setShowChild] = useState<boolean>(false);
  const { getBookmarks } = useBookmarkContext();
  const {
    user: { loggedIn },
  } = useUserContext();
  const navigate = useNavigate();

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
    await handleActions("like");
  };

  const reThought = async () => {
    await handleActions("retweet");
  };

  const addBookmark = async () => {
    await handleActions("bookmark");
  };

  const handleActions = async (type: string) => {
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    await makeRequest(`/${type}/${id}`, {
      method: "POST",
    });

    if (type === "bookmark") {
      getBookmarks();
      return;
    }

    getThought && getThought();
  };

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
        <p>Likes: {likes ?? 0}</p>
        <p>reThought: {shares ?? 0}</p>
        <button onClick={likeThought}>❤️</button>
        <button onClick={reThought}>📤</button>
        <button onClick={addBookmark}>{isBookmark ? "📑" : "📖"}</button>
        {children}
        {showChild &&
          childThoughts.map((child) => (
            <ThoughtWrapper thought={child} key={child._id} />
          ))}
      </div>
    </div>
  );
}
