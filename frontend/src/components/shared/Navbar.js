import walletlogo from "../../Assets/wallet-icon.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <section className="logo-container">
        <Link to="/">
          <img src={walletlogo} alt="Logo" className="logo" />
        </Link>
        <Link to="/" className="nav-link">
          <h5 className="title" title="Home">Estie Wallet</h5>
        </Link>
      </section>
      <section>
        <ul className="nav-links">
          <li>
            <Link to="/login" className="nav-link">
              Sign in
            </Link>
          </li>
          <li>
            <Link to="/registration" className="nav-link">
              Sign Up
            </Link>
          </li>
        </ul>
        <ul className="nav-links">
          {/* <li>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/logout" className="nav-link">
              Sign Out
            </Link>
          </li> */}
        </ul>
      </section>
    </header>
  );
}

export default Navbar;
