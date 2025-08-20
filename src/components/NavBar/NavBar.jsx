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
            src="../../../images/K_N41_Indoor_Décor_Cinema_Ticket_Wall_Sign_Theater_Media_Plaque_Room_Movie_Night_Wall_Art_Home_Decor-removebg-preview"
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
