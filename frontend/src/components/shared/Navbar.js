import walletlogo from "../../Assets/wallet-icon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const token = localStorage.getItem("token");


  const isTokenPresent = !!token;

  const isDashboardPage = location.pathname.startsWith("/dashboard");

  return (
    <header className="navbar">
      <section className="logo-container">
        <Link to="/">
          <img src={walletlogo} alt="Logo" className="logo" />
        </Link>
        <Link to="/" className="nav-link">
          <h5 className="title" title="Home">
            Estie Wallet
          </h5>
        </Link>
      </section>
      <section>
        {isTokenPresent ? (
          <>
            {!isDashboardPage ? (
              <ul className="nav-links">
                <li>
                  <Link to='/dashboard' className="nav-link">
                    Dashboard
                  </Link>
                </li>
                <li onClick={logout} className="nav-link">
                  Sign Out
                </li>
              </ul>
            ) : (
              <ul>
                <li onClick={logout} className="nav-link">
                  Sign Out
                </li>
              </ul>
            )}
          </>
        ) : (
          <ul className="nav-links">
            <li>
              <Link to="/signin" className="nav-link">
                Sign in
              </Link>
            </li>
            <li>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </section>
    </header>
  );
}

export default Navbar;
