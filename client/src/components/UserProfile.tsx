import React from "react";
import EditModal from "./EditModal";
import "../styles/profile.scss";

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
    <div className="profile">
      <div className="profile__img">
        <img src={photo} alt={username} />
      </div>
      <div className="profile__user">
        <h3 className="profile__user--name">{name}</h3>
        <p>{email}</p>
        <div className="profile__user--status">
          {status && <p>{status}</p>}
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
    </div>
  );
}
