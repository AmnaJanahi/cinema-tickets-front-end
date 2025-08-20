import { Link } from "react-router";
import LogoutButton from "../../LogoutButton";
import "./NavBar.css";

const NavBar = ({ onLogout }) => {
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <div className="logo">
          <img
            src="../../../images/Logo.png"
            alt="Cinema Logo"
          />
        </div>
        <ul className="menu">
          {!token ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">SignUp</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/movie">Movies</Link>
              </li>
              <li>
                <Link to="/booking">Book Tickets</Link>
              </li>
              <li>
                <Link to="/booking-list">Tickets</Link>
              </li>
              <li className="logout">
                <LogoutButton onLogout={onLogout} />
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;