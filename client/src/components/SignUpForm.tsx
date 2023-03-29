import React, { useState } from "react";

type FormData = {
  username: "";
  email: "";
  password: "";
  confirmPassword: "";
  name: "";
  status: "";
};

export default function SignUpForm() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    status: "",
  });

  const [image, setImage] = useState();

  const handleFormData: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.files);
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(formData, image);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          onChange={handleFormData}
        />
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleFormData}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleFormData}
        />
        <input
          type="file"
          name="image"
          placeholder="Select an image"
          onChange={handleFileChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleFormData}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          onChange={handleFormData}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
