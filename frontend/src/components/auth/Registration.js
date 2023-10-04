import { useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Loader from '../shared/Loader';

const api = process.env.REACT_APP_API;

function Signup() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const { firstName, lastName, email, password } = inputValue;

  const handleOnChange = e => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
  };
  const passwordLengthRequirement = 8;

  const handleError = err =>
    toast.error(err, {
      position: "bottom-left"
    });
  const handleSuccess = msg =>
    toast.success(msg, {
      position: "bottom-right"
    });

  const signup = async e => {
    e.preventDefault();
    setLoading(true);
    if (password.length < passwordLengthRequirement) {
      setErrors(
        `Password must be at least ${passwordLengthRequirement} characters long.`
      );
      setLoading(false);
      return;
    }

    setErrors("");
    try {
      const { data } = await axios.post(`${api}/auth/signup`, {
        ...inputValue
      });
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={signup}>
            <span className="login-form-title">Signup</span>
            <div className="wrap-input">
              <input
                className={
                  firstName !== ""
                    ? "has-val login-form-input"
                    : "login-form-input"
                }
                id="s_firstName"
                type="text"
                name="firstName"
                required
                value={firstName}
                onChange={handleOnChange}
              />
              <span className="focus-input" data-placeholder="First Name" />
            </div>

            <div className="wrap-input">
              <input
                className={
                  lastName !== ""
                    ? "has-val login-form-input"
                    : "login-form-input"
                }
                id="s_lastName"
                type="text"
                name="lastName"
                required
                value={lastName}
                onChange={handleOnChange}
              />
              <span className="focus-input" data-placeholder="Last Name" />
            </div>

            <div className="wrap-input">
              <input
                className={
                  email !== "" ? "has-val login-form-input" : "login-form-input"
                }
                id="s_email"
                required
                type="email"
                name="email"
                value={email}
                onChange={handleOnChange}
              />
              <span className="focus-input" data-placeholder="Email" />
            </div>

            <div className="wrap-input">
              <input
                className={
                  password !== ""
                    ? "has-val login-form-input"
                    : "login-form-input"
                }
                id="s_password"
                type="password"
                name="password"
                value={password}
                required
                onChange={handleOnChange}
              />
              <span className="focus-input" data-placeholder="Password" />
            </div>
            {errors &&
              <p className="error">
                {errors}
              </p>
            }
            <div className="container-login-form-btn">
              {loading ? 
                <Loader /> 
              :  
                <button className="login-form-btn" type="submit">Sign Up</button>
              }     
            </div>
            <div className="container-login-create-account">
              <span className="txt1">Have an account?</span>
              <Link className="txt2" to="/signin">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
