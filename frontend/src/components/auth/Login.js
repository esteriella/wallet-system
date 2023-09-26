import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import './Login.css';
// import { useForm } from 'react-hook-form';

// import axios from 'axios';

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const { register, handleSubmit } = useForm();

  // const onSubmit = data => {
  //   axios.post('/login', data)
  //     .then(response => console.log(response))
  //     .catch(error => console.error(error));
  // };

  return (

    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">

            <span className="login-form-tittle">Welcome</span>

            <div className="wrap-input">
              <input className={email !== "" ? 'has-val login-form-input' : 'login-form-input'} type="email" value={email} onChange = {e => setEmail(e.target.value)}></input>
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input className={password !== "" ? 'has-val login-form-input' : 'login-form-input'} type="password" value={password} onChange = {e => setPassword(e.target.value)}></input>
              <span className="focus-input" data-placeholder="Password"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn">Login</button>
            </div>

            <div className="container-login-create-account">
              <span className="txt1">Don't have an account yet?</span>
              <Link className="txt2" to="/registration">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <label>
    //     Username:
    //     <input {...register('username', { required: true })} />
    //   </label>
    //   <label>
    //     Password:
    //     <input type="password" {...register('password', { required: true })} />
    //   </label>
    //   <button type="submit">Log in</button>
    // </form>
  );
}

export default Login;
