import React from "react";
import { Link } from "react-router-dom";
import earnreward from "../../Assets/earn-reward.png";

const HomePage = () => {  
  
  const token = localStorage.getItem("token");

  const isTokenPresent = !!token;

  return (
    <div className="homepage">
      <div className="container">
        <div className="welcome">
          <div className="welcome-message">
            <h2>
              Your trusted Wallet to manage your money and make days beautiful
            </h2>
            <p>
              Join us today and embark on a journey to financial empowerment,
              where every dollar is at your fingertips.
            </p>
            <>
            {isTokenPresent ? 
              <Link to='/dashboard' className="btn">Dashboard</Link>
              : 
              <Link to="/signup" className="btn">Get Started</Link>
            }
            </>
          </div>
          <img src={earnreward} alt="Logo" className="welcome-image" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
