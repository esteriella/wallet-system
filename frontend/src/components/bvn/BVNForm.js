// BVNForm.js
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "./BVN.css";

const api = process.env.REACT_APP_API;

function BVNForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [image, setImage] = useState("")

  // async function onSubmit(data) {

  //   const formData = new FormData();
  //   formData.append('bvn', data.bvn);
  //   formData.append('image', data.image);

  //   const response = await axios.put(
  //     `${api}/user/verify-bvn/${userId}`,
  //     {
  //       bvn: data.bvn,
  //       image: data.image
  //     },
  //     {
  //       withCredentials: true,
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("token")
  //       }
  //     }
  //   );

  //   const { success, message, isVerified } = response.data;
  //   if (!success) {
  //     toast.error(message);
  //     return;
  //   }
  //   toast.success(message);
  //   localStorage.setItem("isVerified", isVerified);
  //   setTimeout(() => {
  //     navigate("/dashboard", { replace: true });
  //   }, 5000);
  // }

  async function onSubmit(data) {
    const formData = new FormData();
    formData.append('bvn', data.bvn);
    formData.append('image', data.image);
  
    try {
      const response = await axios.put(
        `${api}/user/verify-bvn/${userId}`,
        {
          bvn:data.bvn,
          image: data.image
        },
        {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      );
  
      const { success, message, isVerified } = response.data;
      if (!success) {
        toast.error(message);
        return;
      }
      toast.success(message);
      localStorage.setItem('isVerified', isVerified);
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 5000);
    } catch (error) {
      // Handle axios errors here
      console.error('Axios error:', error);
      // You might want to add additional error handling logic here
    }
  }
  

  // function convertToBase64(e) {
  //   console.log(e);
  //   var reader = new FileReader();
  //   reader.readAsDataURL(e.target.files[0]);
  //   reader.onload = () => {
  //     console.log(reader.result);
  //     setImage(reader.result)
  //   };
  //   reader.onerror = error => {
  //     console.log("error: ", error);
  //   };
  // }

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0])
  }

  return (
    <section className="bvnform">
      <form className="bvn-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Enter your BVN</h2>
        <input {...register("bvn")} type="text" placeholder="Enter your BVN" required />
        <input
          {...register("image")}
          type="file"
          accept="image/*"
          // onChange={convertToBase64}
          onChange={onInputChange}
          required
        />
        {image === "" || image === null? "" : <img className="image" width={100} height={100} src={image} alt="" /> }
        
        <button type="submit">Submit</button>
        {errors.bvn && <p className="">Please enter a valid BVN</p>}
        {errors.image && <p className="">Please upload an image</p>}
      </form>
    </section>
  );
}

export default BVNForm;
