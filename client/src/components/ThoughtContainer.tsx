import React, { useState } from "react";
import { useBookmarkContext } from "../context/Bookmark";
import { IThought } from "../interfaces/Thought";
import { makeRequest } from "../utils/makeRequest";
import ThoughtForm from "./ThoughtForm";
import ThoughtWrapper from "./ThoughtWrapper";
import { useUserContext } from "../context/User";
import { Link, useNavigate } from "react-router-dom";
import { PageType } from "../enum/PageType";
import DeleteButton from "./DeleteButton";
import "../styles/thought.scss";

export interface IThoughtContainer {
  id: string;
  text: string;
  likes: number;
  shares: number;
  type: PageType;
  photo: string;
  userId: {
    name: string;
    _id: string;
    username: string;
  };
  isBookmark: boolean;
  getThought: () => void;
  children?: React.ReactElement[] | React.ReactElement;
}

export default function ThoughtContainer({
  id,
  text,
  likes,
  shares,
  type,
  isBookmark = false,
  getThought,
  children,
  photo,
  userId,
}: IThoughtContainer) {
  const [childThoughts, setChildThoughts] = useState<IThought[]>([]);
  const [showChild, setShowChild] = useState<boolean>(false);
  const { getBookmarks } = useBookmarkContext();
  const {
    user: { loggedIn, id: userInfoId },
  } = useUserContext();
  const navigate = useNavigate();

  const getChildThoughts = async () => {
    const { data } = await makeRequest(`/tweet/${id}`);
    setChildThoughts(data.childIds);
    setShowChild(true);
  };

  const handleClick = async () => {
    if (showChild) {
      setShowChild(false);
    } else {
      await getChildThoughts();
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

  const renderOptions = () => {
    if (userId._id === userInfoId) {
      return (
        <div>
          <DeleteButton id={id} getThought={getThought} />
          <button>Edit</button>
        </div>
      );
    }
  };

  return (
    <div className="thought">
      <div className="thought__user-photo">
        <Link to={`/profile/${userId._id}`}>
          <img
            src={photo}
            alt={userId.name}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </Link>
      </div>
      <div className="thought__details">
        <Link to={`/thought/${id}`}>{text}</Link>
        <div>
          <Link to={`/profile/${userId._id}`}>
            <p>{userId.name}</p>
            <p>@{userId.username}</p>
          </Link>
        </div>
        {type === PageType.CHILD && (
          <button onClick={handleClick}>
            {showChild ? "Hide replies" : "Show replies"}
          </button>
        )}
        <p>Likes: {likes ?? 0}</p>
        <p>reThought: {shares ?? 0}</p>
        <button onClick={likeThought}>❤️</button>
        <button onClick={reThought}>📤</button>
        <button onClick={addBookmark}>{isBookmark ? "📑" : "📖"}</button>
        {children}
        {renderOptions()}
        <ThoughtForm
          type={type}
          id={id}
          getThought={getThought}
          getChildThoughts={getChildThoughts}
        />
        {showChild &&
          childThoughts.map((child) => (
            <ThoughtWrapper
              thought={child}
              key={child._id}
              getThought={getChildThoughts}
            />
          ))}
      </div>
    </div>
  );
}
