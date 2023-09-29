import React, { useState } from "react";
import Validation from "../shared/Validation";
import "./Registration.css";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleFormSubmit = e => {
    console.log(
      "Full name : " +
        fullName +
        " , " +
        "Email : " +
        email +
        " ,  " +
        "Phone Number : " +
        phoneNumber +
        " , " +
        "Password : " +
        password
    );
    setErrors(Validation(fullName, phoneNumber, email, password));
    e.preventDefault();
  };

  return (
    <div className="registration-page">
      <div className="app-wrapper1">
        <div className="app-wrapper2">
          <form className="form-wrapper">
            <h2 className="signup">Sign Up</h2>
            <div className="wrapper-input">
              <label className="lable">Full Name</label>
              <input
                className="input"
                id="s_fullName"
                type="text"
                name="fullname"
                onChange={e => {
                  setFullName(e.target.value);
                }}
              />
              {errors.fullName &&
                <p className="error">
                  {errors.fullName}
                </p>}
            </div>

            <div className="wrapper-input">
              <label className="lable">Email</label>
              <input
                className="input"
                id="s_email"
                type="email"
                name="email"
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
              {errors.email &&
                <p className="error">
                  {errors.email}
                </p>}
            </div>

            <div className="wrapper-input">
              <label className="lable">Phone Number</label>
              <input
                className="input"
                id="p_number"
                type="phone-number"
                name="phone-number"
                onChange={e => {
                  setPhoneNumber(e.target.value);
                }}
              />
              {errors.number &&
                <p className="error">
                  {errors.number}
                </p>}
            </div>

            <div className="wrapper-input">
              <label className="lable">Password</label>
              <input
                className="input"
                id="s_password"
                type="password"
                name="password"
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
              {errors.password &&
                <p className="error">
                  {errors.password}
                </p>}
            </div>

            <div className="signup-btn">
              <button className="submit" onClick={handleFormSubmit}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
