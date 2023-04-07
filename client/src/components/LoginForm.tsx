import React, { FormEventHandler, useState } from "react";
import { makeRequest } from "../utils/makeRequest";
import { useUserContext } from "../context/User";

export default function LoginForm() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { getUser } = useUserContext();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    await makeRequest("/auth/login", {
      method: "POST",
      data: {
        email,
        password,
      },
    });
    await getUser();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        aria-label="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        aria-label="username"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
