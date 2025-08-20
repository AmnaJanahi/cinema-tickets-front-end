import { useNavigate } from "react-router";
import "./Home.css"

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="overlay">
        <h1 className="title">Welcome to CineWorld</h1>
        <p className="subtitle">Experience movies like never before</p>
        <button onClick={() => navigate("/movie")}>Book your Ticket</button>
      </div>
    </div>
  );
};
export default Home;
