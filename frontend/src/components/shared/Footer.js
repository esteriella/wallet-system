import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="nav-link">
        <span className="estie-wallet" title="Home">
          Copyright © 2023 &nbsp;Estie Wallet
        </span>
      </Link>
      <Link to="/about" className="nav-link">
        <span className="about">
          About
        </span>
      </Link>
    </footer>
  );
}
