import React, { useEffect } from "react";
import { useUserContext } from "../context/User";

export default function Profile() {
  const { getUser, user } = useUserContext();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      Profile
      {user.loggedIn ? (
        <div>
          <div>
            <h3>{user.name}</h3>
            <img
              src={user.photo}
              alt={user.username}
              style={{ width: "250px", height: "300px", objectFit: "cover" }}
            />
          </div>
          <div>
            <p>{user.email}</p>
            {user.status && <p>Status: user.status</p>}
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
