// BVNForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from '../shared/Loader';
import "./BVN.css";

const api = process.env.REACT_APP_API;

function BVNForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    setLoading(true);
    try {
      const response = await axios.put(
        `${api}/user/verify-bvn/${userId}`,
        {
          bvn: data.bvn
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      const { success, message, isVerified } = response.data;
      if (!success) {
        toast.error(message);
        setLoading(false);
        return;
      }
      toast.success(message);
      localStorage.setItem("isVerified", isVerified);
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Handle axios errors here
      console.error("Axios error:", error);
      // You might want to add additional error handling logic here
    }
  }

  return (
    <section className="bvnform">
      <form className="bvn-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Enter your BVN</h2>
        <input
          {...register("bvn")}
          type="text"
          placeholder="Enter your BVN"
          required
        />
        {loading ? <Loader /> : <button type="submit">Submit</button>}
        {errors.bvn && <p className="">Please enter a valid BVN</p>}
        {errors.image && <p className="">Please upload an image</p>}
      </form>
    </section>
  );
}

export default BVNForm;
