import React from "react";

export interface IUserProfile {
  name: string;
  photo: string;
  username: string;
  email: string;
  status: string;
}

export default function UserProfile({
  name,
  photo,
  username,
  email,
  status,
}: IUserProfile) {
  return (
    <div>
      <div>
        <h3>{name}</h3>
        <img
          src={photo}
          alt={username}
          style={{ width: "250px", height: "300px", objectFit: "cover" }}
        />
      </div>
      <div>
        <p>{email}</p>
        {status && <p>Status: status</p>}
      </div>
    </div>
  );
}
