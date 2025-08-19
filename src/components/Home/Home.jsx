import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Welcome</h2>
      <button onClick={() => navigate("/movie")}>Book your Ticket</button>
    </>
  );
};
export default Home;
