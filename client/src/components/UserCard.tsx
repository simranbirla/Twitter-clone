import React from "react";
import { Link } from "react-router-dom";

export interface IUserCard {
  status: string;
  image: string;
  name: string;
  username: string;
  id: string;
}

export default function UserCard({
  username,
  name,
  image,
  status,
  id,
}: IUserCard) {
  return (
    <div>
      <img
        src={image}
        alt={name}
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
      <Link to={`/profile/${id}`}>
        <p>{name}</p>
      </Link>
      <p>@{username}</p>
      <p>{status}</p>
    </div>
  );
}
