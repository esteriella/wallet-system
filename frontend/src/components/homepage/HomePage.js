import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import earnreward from "../../Assets/earn-reward.png";

const HomePage = () => {
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
            <Link to="/login" className="btn">Get Started</Link>
            {/* <button className="btn">Get Started</button> */}
          </div>
          <img src={earnreward} alt="Logo" className="wecome-image" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
