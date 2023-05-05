import React, { useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaEllipsisV } from "react-icons/fa";
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
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { useLikeContext } from "../context/Likes";

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
  isLiked: boolean;
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
  isLiked = false,
  getThought,
  children,
  photo,
  userId,
}: IThoughtContainer) {
  const [childThoughts, setChildThoughts] = useState<IThought[]>([]);
  const [showChild, setShowChild] = useState<boolean>(false);
  const { getBookmarks } = useBookmarkContext();
  const { getLikes } = useLikeContext();
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

    if (type === "like") {
      getLikes();
    }

    if (type === "bookmark") {
      getBookmarks();
      return;
    }

    getThought && getThought();
  };

  const renderOptions = () => {
    if (userId._id === userInfoId) {
      return (
        <div className="thought__user-menu--container">
          <Menu
            menuButton={
              <MenuButton className="thought__user-menu--btn">
                <FaEllipsisV />
              </MenuButton>
            }
            transition
            menuClassName="thought__user-menu"
          >
            <MenuItem className="thought__user-menu--item">
              <DeleteButton id={id} getThought={getThought} />
            </MenuItem>
            <MenuItem className="thought__user-menu--item">
              <button>Edit</button>
            </MenuItem>
          </Menu>
        </div>
      );
    }
  };

  return (
    <div className="thought">
      <div className="thought__user-photo">
        <Link to={`/profile/${userId._id}`}>
          <img src={photo} alt={userId.name} />
        </Link>
      </div>
      <div className="thought__details">
        <Link to={`/profile/${userId._id}`} className="thought__user-details">
          <p>{userId.name}</p>
          <p className="thought__user-details--username">@{userId.username}</p>
        </Link>
        <Link to={`/thought/${id}`} className="thought__text">
          <p>{text}</p>
        </Link>
        {type === PageType.CHILD && (
          <button onClick={handleClick}>
            {showChild ? "Hide replies" : "Show replies"}
          </button>
        )}
        <div className="thought__actions">
          <button onClick={likeThought} className="thought__button like-btn">
            {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
            {likes ?? 0}
          </button>
          <button onClick={reThought} className="thought__button share-btn">
            <IoMdShareAlt /> {shares ?? 0}
          </button>
          <button
            onClick={addBookmark}
            className="thought__button bookmark-btn"
          >
            {isBookmark ? <BsBookmarkFill /> : <BsBookmark />}
          </button>
        </div>
        {children}
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
      {renderOptions()}
    </div>
  );
}
