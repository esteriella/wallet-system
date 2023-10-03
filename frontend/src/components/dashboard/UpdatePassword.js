import { useState, useEffect } from "react";
import {
  // useParams,
  useNavigate,
  Link
} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../auth/Login.css";
import { useCookies } from "react-cookie";

const api = process.env.REACT_APP_API;

export default function UpdatePassword() {
  // const { userId } = useParams();
  const navigate = useNavigate();
  const [removeCookie] = useCookies(["token"]);
  const userId = localStorage.getItem("userId");
  const [inputValue, setInputValue] = useState({
    oldPassword: "",
    newPassword: ""
  });
  const cookies = useCookies([]);
  
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/signin");
      }
    };
    verifyCookie();
  }, [cookies, navigate]);

  const { oldPassword, newPassword } = inputValue;

  const handleOnChange = e => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
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

  const handleInfo = msg =>
    toast.info(msg, {
      position: "top-right"
    });

    const logout = () => {
        removeCookie("token");
        localStorage.removeItem("userId");
        setTimeout(() => {
            navigate("/signin");
        }, 5000);
    };

  const handleSubmit = async e => {
    e.preventDefault();
    
    handleInfo("Please wait while we update your password!");
    try {
        const response = await axios.put(
            `${api}/user/updatepassword/${userId}`,
            {
                ...inputValue
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
            logout();
        }
    } catch (e) {
        console.log(e);
        handleError('Error updating password!')
    }
  };

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleSubmit}>
            <span className="login-form-title">Update Password</span>

            <div className="wrap-input">
              <input
                className={
                  oldPassword !== ""
                    ? "has-val login-form-input"
                    : "login-form-input"
                }
                type="password"
                name="oldPassword"
                value={oldPassword}
                required
                onChange={handleOnChange}
              />
              <span className="focus-input" data-placeholder="Old Password" />
            </div>

            <div className="wrap-input">
              <input
                className={
                  newPassword !== ""
                    ? "has-val login-form-input"
                    : "login-form-input"
                }
                type="password"
                name="newPassword"
                value={newPassword}
                required
                onChange={handleOnChange}
              />
              <span className="focus-input" data-placeholder="New Password" />
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn" type="submit">
                Update
              </button>
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
  );
}