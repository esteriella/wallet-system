import { useState, useEffect } from "react";
import {
  useNavigate,
  Link
} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../auth/Login.css";
import Loader from "../shared/Loader";

const api = process.env.REACT_APP_API;

export default function UpdateProfile() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [loadingState, setLoadingState] = useState(false);
  const [btnLoad, setBtnLoad] = useState(false);
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  
  useEffect(() => {
    const verifyToken = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/signin");
      }
    };
    verifyToken();
  }, [navigate]);

  const { firstName, lastName, email } = inputValue;

  const handleError = err =>
    toast.error(err, {
      position: "bottom-left"
    });

  const handleSuccess = msg =>
    toast.success(msg, {
      position: "bottom-left"
    });

    useEffect(() => {
        (async () => {
          try {
            if (userId !== null) {
              const userResponse = await axios.get(
                `${api}/user/details/${userId}`,        
                { 
                  withCredentials: true,
                  headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                  } 
                }
              );
      
              if (userResponse.status === 404) {
                handleError("User not found!");
                setTimeout(() => {
                  navigate("/");
                }, 5000);
              }
      
              if (userResponse.status === 500) {
                handleError("Internal server error!");
                setTimeout(() => {
                  navigate("/");
                }, 5000);
              }
              const user = userResponse.data;
      
              setInputValue((prevInputValue) => ({
                ...prevInputValue,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              }));
      
              setLoadingState(true);
            }
          } catch (e) {
            handleError("Error loading profile!");
            console.log(e);
            setTimeout(() => {
              navigate("/");
            }, 5000);
          }
        })();
      }, [userId, navigate]);
      
  const handleOnChange = e => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoad(true);
    try {
      const response = await axios.put(
        `${api}/user/update/${userId}`,
        {
            ...inputValue,
        },        
        { 
          withCredentials: true,
          headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          } 
        }
      );
        
        if (response.status === 404) {
            handleError("User not found!");
            return;
        }

        if (response.status === 500) {
            handleError("Internal server error!");
            return;
        }

        const data = response.data;

        if(data.success){
            handleSuccess(data.message);
            setTimeout(() => {
                navigate("/dashboard");
            }, 5000);
        }

    } catch (error) {
        console.log(error);
    }
    finally{
      setBtnLoad(false);
    }
  };

  return(
    <>
        {loadingState ? 
            <div className="container">
            <div className="container-login">
              <div className="wrap-login">
                <form className="login-form" onSubmit={handleSubmit}>
                  <span className="login-form-title">Update Personal Info</span>
                  <div className="wrap-input">
                    <input
                      className={
                        firstName !== "" ? "has-val login-form-input" : "login-form-input"
                      }
                      type="text"
                      name="firstName"
                      value={firstName}
                      required
                      onChange={handleOnChange}
                    />
                    <span className="focus-input" data-placeholder="First Name" />
                  </div>
                  <div className="wrap-input">
                    <input
                      className={
                        lastName !== "" ? "has-val login-form-input" : "login-form-input"
                      }
                      type="text"
                      name="lastName"
                      value={lastName}
                      required
                      onChange={handleOnChange}
                    />
                    <span className="focus-input" data-placeholder="Last Name" />
                  </div>
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
      
                  <div className="container-login-form-btn">
                    {btnLoad ? 
                      <Loader/>
                    :
                      
                      <button className="login-form-btn" type="submit">Update</button>
                    }
                  </div>
      
                  <div className="container-login-create-account">
                    <span className="txt1">Go back to</span>
                    <Link className="txt2" to="/dashboard">
                      Dashboard
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        :
            <div className="container">
                <div className="container-login">
                    <Loader/>
                </div>
            </div>
        }
    </>
  );
}
