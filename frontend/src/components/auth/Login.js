import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from 'react-cookie';
import Loader from '../shared/Loader';

const api = process.env.REACT_APP_API;

function Login() {
  const [cookies, setCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = err =>
    toast.error(err, {
      position: "bottom-left"
    });

  const handleSuccess = msg =>
    toast.success(msg, {
      position: "bottom-left"
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${api}/auth/signin`,
        {
          ...inputValue,
        },        
        { withCredentials: true }
      );

      const { message, success, userId, token} = data;
      if (success) {        
        setCookie('token', token, {
          path: '/',
          expires: new Date(
            Date.now() + 10 * 24 * 60 * 60 * 1000),
          sameSite: 'none', 
          secure: true,
          httpOnly: false,
        });
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        handleSuccess(message);
        setTimeout(() => {      
          navigate('/dashboard');
        }, 2000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
      setInputValue({
        ...inputValue,
        email: "",
        password: "",
      }); 
    }    
  };
  
  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleSubmit}>
            <span className="login-form-title">Welcome</span>
            <div className="wrap-input">
              <input
                className={
                  email !== "" ? "has-val login-form-input" : "login-form-input"
                }
                type="email"
                name="email"
                value={email}
                required
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
                type="password"
                name="password"
                value={password}
                required
                onChange={handleOnChange}
              />
              <span className="focus-input" data-placeholder="Password" />
            </div>

            <div className="container-login-form-btn">
              {loading ? 
                <Loader /> 
              :  
                <button className="login-form-btn" type="submit">Sign In</button>
              }      
            </div>

            <div className="container-login-create-account">
              <span className="txt1">Don't have an account?</span>
              <Link className="txt2" to="/signup">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
