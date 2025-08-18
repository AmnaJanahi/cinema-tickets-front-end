import { Link } from "react-router"

const NavBar = () => {
    return(
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/signup">SignUp</Link>
                </li>
                <li>
                    <Link to="/booking">Book Tickets</Link>
                </li>
            </ul>
        </nav>
    )
}
export default NavBar