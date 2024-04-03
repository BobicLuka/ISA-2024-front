import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";

const Registration = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    city: "",
    country: "",
    phoneNumber: "",
    profession: "",
    companyInfo: "",
  });

  const [repeatPassword, setRepeatPassword] = useState("");

  const onRegistrateClickHandler = async (event) => {
    event.preventDefault();

    if (user.password !== repeatPassword) {
      return window.alert("Passwords must match!");
    }

    fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.status === 400) {
          return window.alert("Registration failed!");
        }

        window.alert("Registration succesfull.");
        return navigate("/");
      })
      .catch((error) => {
        console.error(error);
        window.alert("An error occurred during registration.");
      });
  };

  const onCancelClickHandler = () => {
    return navigate("/");
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
  };
  return (
    <div class="registration-form-container">
      <div class="registration-form-wrapper">
        <form className="registration-form" onSubmit={onRegistrateClickHandler}>
          <div class="input-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={handleChange}
              name="username"
              type="text"
              required
            />
          </div>
          <div class="input-group">
            <label htmlFor="password" className="item">
              Password
            </label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              required
            />
          </div>
          <div class="input-group">
            <label htmlFor="repeatPassword" className="item">
              Repeat password
            </label>
            <input
              onChange={handleRepeatPasswordChange}
              name="repeatPassword"
              type="password"
              required
            />
          </div>
          <div class="input-group">
            <label htmlFor="firstname" className="item">
              First Name
            </label>
            <input
              onChange={handleChange}
              name="firstname"
              type="text"
              required
            />
          </div>
          <div class="input-group">
            <label htmlFor="lastname" className="item">
              Last Name
            </label>
            <input
              onChange={handleChange}
              name="lastname"
              type="text"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email" className="item">
              Email
            </label>
            <input
              onChange={handleChange}
              name="email"
              type="text"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
          </div>
          <div className="input-group">
            <label htmlFor="city" className="item">
              City
            </label>
            <input
              onChange={handleChange}
              name="city"
              type="text"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="country" className="item">
              Country
            </label>
            <input
              onChange={handleChange}
              name="country"
              type="text"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="phoneNumber" className="item">
              Phone Number
            </label>
            <input
              onChange={handleChange}
              name="phoneNumber"
              type="text"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="profession" className="item">
              Profession
            </label>
            <input
              onChange={handleChange}
              name="profession"
              type="text"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="companyInfo" className="item">
              Company Info
            </label>
            <input
              onChange={handleChange}
              name="companyInfo"
              type="text"
              required
            />
          </div>
          
          <div class="button-group">
            <button className="item" type="submit">
              Register
            </button>
            <button type="button" onClick={onCancelClickHandler}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
