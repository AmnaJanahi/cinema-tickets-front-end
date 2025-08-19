import { Link } from "react-router";
import LogoutButton from "../../LogoutButton"

const NavBar = ({ onLogout }) => {
const token = localStorage.getItem("token");

  return (
    <nav>
      <ul>
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
              <Link to="/booking">Book Tickets</Link>
            </li>
            <li>
              <LogoutButton onLogout={onLogout} />
            </li>
          </>
        )}
      </ul>
    </nav>
  );

};
export default NavBar;
