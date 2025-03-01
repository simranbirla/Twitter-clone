import React, { useState } from "react";
import { makeRequest } from "../utils/makeRequest";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/User";
import "../styles/signup.scss";

interface FormData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  status: string;
}

const initialFormValues = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
  name: "",
  status: "",
};

export default function SignUpForm() {
  const [formData, setFormData] = useState<FormData>(initialFormValues);
  const [image, setImage] = useState<File | null>();

  const { setUser } = useUserContext();

  const navigate = useNavigate();

  const handleFormData: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setImage(e.target.files && e.target.files[0]);
  };


  console.log(image)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { username, name, email, password, passwordConfirm } = formData;
    console.log(formData, image);
    const formFieldData = new FormData();
    formFieldData.append("username", username);
    formFieldData.append("name", name);
    formFieldData.append("email", email);
    formFieldData.append("password", password);
    formFieldData.append("passwordConfirm", passwordConfirm);
    formFieldData.append("photo", image as Blob);

    try {
      const response = await makeRequest("/auth/signup", {
        method: "POST",
        data: formFieldData,
      });

      if (response.status === 200) {
        setUser(response.data);
        navigate("/");
      }
    } catch (e) {
      setFormData(initialFormValues);
      setImage(undefined);
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign In Now</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={handleFormData}
            value={formData.username}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            onChange={handleFormData}
            value={formData.name}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleFormData}
            value={formData.email}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Image</label>
          <input
            type="file"
            name="image"
            placeholder="Select an image"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleFormData}
            value={formData.password}
            required
          />
        </div>



        <div className="form-group">
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm password"
            onChange={handleFormData}
            value={formData.passwordConfirm}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}
