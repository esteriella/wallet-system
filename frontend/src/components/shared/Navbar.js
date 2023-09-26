import React from "react";
import walletlogo from "../../Assets/wallet-icon.png";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <section className="logo-container">
        <img src={walletlogo} alt="Logo" className="logo" />
        <h5 className="title">Estie Wallet</h5>
      </section>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li>
            <Link to="/login" className="nav-link">Sign in</Link>
        </li>
        <li>
            <Link to="/registration" className="nav-link">Sign Up</Link>
        </li>
        <li>
            <Link to="/logout" className="nav-link">Sign Out</Link>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
