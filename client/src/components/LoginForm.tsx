import React, { FormEventHandler, useState } from "react";
import { makeRequest } from "../utils/makeRequest";
import { useUserContext } from "../context/User";
import "../styles/login.scss";
import { Link } from "react-router-dom";

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
    <div className="login-form">
      <h2>Login to your account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" type="submit">
          Log in
        </button>
      </form>
      <p className="signup-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
