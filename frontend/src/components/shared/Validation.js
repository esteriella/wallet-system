// import React from 'react';

const Validation = (fullName,grade,email,username,password) => {

    let errors={};

    if (!fullName) {
        errors.fullName = "Full Name Reqired."
    }
    if (!grade) {
        errors.grade = "Grade Reqired."
    }
    if (!email) {
        errors.email = "Full Name Reqired."
    }else if (!/\S+@+\S+\.\S+/.test(email)) {
        errors.email = "Email is invalid."
    }
    if (!username) {
        errors.username = "Username Reqired."
    }else if (username.length <5) {
        errors.username = "Username must be has more than five charactors. "
    }
    if (!password) {
        errors.password = "Password Reqired."
    }else if (password.length <5) {
        errors.password = "Password must be has more than five charactors. "
    }


  return errors;
}

export default Validation;
