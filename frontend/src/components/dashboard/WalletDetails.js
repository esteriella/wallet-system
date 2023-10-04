import { useEffect, useState } from "react";
import { 
  Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../shared/Loader";

const api = process.env.REACT_APP_API;

function WalletDetails() {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  const handleError = err =>
    toast.error(err, {
      position: "bottom-left"
    });

  useEffect(
    () => {
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
              handleError('User not found!');
              return;
            }

            if (userResponse.status === 500) {
              handleError('Internal server error!');
              return;
            }
            const user = userResponse.data;

            const name = user.firstName + " " + user.lastName;

            const walletResponse = await axios.get(
              `${api}/wallet/balance/${userId}`,        
              { 
                withCredentials: true, 
                headers:{
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + localStorage.getItem('token')
                }
              }
            );
            if (walletResponse.status === 404) {
              handleError('Wallet not found!');
              return;
            } 
            if (walletResponse.status === 500) {
              handleError('Internal server error!');
              return;
            } 
            const walletBalance = walletResponse.data;
            
            const userData = {
              owner: name,
              email: user.email,
              accountNo: user._id,
              balance: walletBalance.balance
            };
            setUserData(userData);
            setLoadingState(true);
          }
        } catch (e) {
          handleError("Error loading wallet!");
          console.log(e);
        }
      })();
    },
    [userId]
  );

  return (
    <div>
      {loadingState
        ? <div className="wallet-owner">
            <h2>
              Welcome <span>{userData.owner}!</span>
            </h2>
            <p>
              Email: {userData.email}
            </p>
            <p>
              Account Number: {userData.accountNo}
            </p>
            <p>
              Balance: {userData.balance}
            </p>
            {/* <p>Update <Link to={`/updateprofile/${userId}`} title="Update Profile">your profile</Link> or change <Link to={`/updatepassword/${userId}`} title="Update Password">your password</Link></p> */}
            <p>Update <Link to='/updateprofile' title="Update Profile">your profile</Link> or change <Link to='/updatepassword' title="Update Password">your password</Link></p>
          </div>
        : 
          <div className="wallet-owner">
            <Loader/>
          </div>
        }
    </div>
  );
}

export default WalletDetails;
