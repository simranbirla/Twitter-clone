import React from "react";

export interface IUserCard {
  status: string;
  image: string;
  name: string;
  username: string;
}

export default function UserCard({ username, name, image, status }: IUserCard) {
  return (
    <div>
      <img
        src={image}
        alt={name}
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
      <p>{name}</p>
      <p>@{username}</p>
      <p>{status}</p>
    </div>
  );
}
