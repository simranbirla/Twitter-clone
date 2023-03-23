import React, { FormEventHandler, useState } from "react";
import { makeRequest } from "../utils/makeRequest";

export default function LoginForm() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const data = await makeRequest("/auth/login", {
      method: "POST",
      data: {
        email,
        password,
      },
    });
    console.log(data);
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
