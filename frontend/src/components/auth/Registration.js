import React, { useState } from 'react';
import Validation from '../shared/Validation';
import './Registration.css';

function Signup() {
  const [fullName, setFullName] = useState("");
  const [grade, setGrade] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleFormSubmit = (e) => {
    console.log("Full name : " + fullName + " , " + "Email : " + email + " ,  " + "Grade : " + grade + " , " + "Username : " + username + " , " + "Password : " + password);
    setErrors(Validation(fullName, grade, email, username, password))
    e.preventDefault();
  };

  return (
    <div className='registration-page'>
    <div className='app-wrapper1'>
      <div className='app-wrapper2'>

        <div>
          <h2 className='signup'>Sign Up to ESTIE WALLET</h2>
        </div>

        <form className='form-wrapper'>
          <div className='fullName'>
            <label className='lable'>Full Name</label>
            <input className='input'
              id='s_fullName'
              type='text'
              name='fullname'
              onChange={(e) => { setFullName(e.target.value) }} />
            {errors.fullName && <p className='error'>{errors.fullName}</p>}
          </div>

          <div className='email'>
            <label className='lable'>Email</label>
            <input className='input'
              id='s_email'
              type='email' name='email'
              onChange={(e) => { setEmail(e.target.value) }} />
            {errors.email && <p className='error'>{errors.email}</p>}
          </div>

          <div className='grade'>
            <label className='lable'>Phone Number</label>
            <input className='input'
              id='s_grade'
              type='grade'
              name='grade'
              onChange={(e) => { setGrade(e.target.value) }} />
            {errors.number && <p className='error'>{errors.number}</p>}
          </div>

          <div className='username'>
            <label className='lable'>Username</label>
            <input className='input'
              id='s_username'
              type='username'
              name='username'
              onChange={(e) => { setUsername(e.target.value) }} />
            {errors.username && <p className='error'>{errors.username}</p>}
          </div>

          <div className='password'>
            <label className='lable'>Password</label>
            <input className='input'
              id='s_password'
              type='password'
              name='password'
              onChange={(e) => { setPassword(e.target.value) }} />
            {errors.password && <p className='error'>{errors.password}</p>}
          </div>

          <div>
            <button className='submit' onClick={handleFormSubmit}>Sign Up</button>
          </div>
        </form>
      </div>
      {/* <div className='app-wrapper3'></div>
      <div className='app-wrapper4'></div> */}
    </div>
  </div>
  );
}

export default Signup;
