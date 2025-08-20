import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { getAllMovie as fetchAllMovies } from "../../../lib/api";
import "./MoviesDisplay.css";

const MoviesDisplay = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const getAllMovie = async () => {
    try {
      const response = await fetchAllMovies();
      console.log("movies payload:", response.data);


      if (Array.isArray(response.data)) {
        setMovies(response.data);
      } else if (response.data && Array.isArray(response.data.movies)) {
        setMovies(response.data.movies);
      } else {
        setMovies([]); 
      }
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setMovies([]);
    }
  };

  useEffect(() => {
    getAllMovie();
  }, []);

  return (
    <div className="movies">
      <ol className="movies__grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li className="movie-card" key={movie._id}>
              <img className="movie-card__poster" src={movie.image} alt={movie.name} />
              <div className="movie-card__body">
                <h3>{movie.name}</h3>
                <p>⭐{movie.rating}</p>
                <p>{movie.description}</p>
                <button
                  className="movie-card__cta"
                  type="button"
                  onClick={() => navigate(`/booking/${movie._id}`)}
                >
                  Book
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No movies available.</p>
        )}
      </ol>
    </div>
  );
};

export default MoviesDisplay;
