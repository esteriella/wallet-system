import walletlogo from "../../Assets/wallet-icon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Navbar() {
  const [cookies, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const location = useLocation();

  
  const userId = localStorage.getItem("userId");

  const logout = () => {
    removeCookie("token");
    localStorage.removeItem("userId");
    navigate("/", { replace: true });
  };

  const isTokenPresent = cookies.token ? true : false;

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
            {!isDashboardPage ? 
              (
                <ul className="nav-links">
                  <li>
                    <Link to={`/dashboard/${userId}`} className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout} className="nav-link">
                      Sign Out
                    </button>
                  </li>
                </ul>
            ):(
                <ul>
                  <li>
                    <button onClick={logout} className="nav-link">
                      Sign Out
                    </button>
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
