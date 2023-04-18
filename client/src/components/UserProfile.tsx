import React from "react";
import EditModal from "./EditModal";

export interface IUserProfile {
  name: string;
  photo: string;
  username: string;
  email: string;
  status: string;
  edit?: boolean;
}

export default function UserProfile({
  name,
  photo,
  username,
  email,
  status,
  edit = false,
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
        {status && <p>Status: {status}</p>}
        {edit && (
          <EditModal
            text={status}
            heading="Edit Status"
            label="Edit"
            placeholder="Edit User status"
            name="status"
          />
        )}
      </div>
    </div>
  );
}
