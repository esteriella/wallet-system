// BVNForm.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { toast } from "react-toastify";

const api = process.env.REACT_APP_API;

function BVNForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  async function onSubmit(data) {
    // const formData = new FormData();
    // formData.append('bvn', data.bvn);
    // formData.append('image', data.image);

    const response = await axios.put(`${api}/verify-bvn/${userId}`, 
    {
        bvn: data.bvn,
        image: data.image
    },
        {
            withCredentials: true,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
    );

    const { success, message, isVerified } = response.data;
    if(!success) {
      toast.error(message);
      return;
    }
    toast.success(message);
    localStorage.setItem("isVerified", isVerified);
    setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 5000);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('bvn')} type="text" placeholder="BVN" required />
      <input {...register('image')} type="file" required />
      <button type="submit">Submit</button>
      {errors.bvn && <p>Please enter a valid BVN</p>}
      {errors.image && <p>Please upload an image</p>}
    </form>
  );
}

export default BVNForm;
