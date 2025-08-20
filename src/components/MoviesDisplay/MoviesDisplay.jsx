import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { getAllMovie as fetchAllMovies } from "../../../lib/api";
import "./MoviesDisplay.css";

const MoviesDisplay = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const getAllMovie = async () => {
    const response = await fetchAllMovies();
    console.log("movies payload:", response.data);

    setMovies(response.data);
  };

  useEffect(() => {
    getAllMovie();
  }, []);

  return (
    <div className="movies">
      <ol className="movies__grid">
        {movies.map((movie) => {
          return (
            <li className="movie-card" key={movie._id}>
              <img className="movie-card__poster" src={movie.image} />
              <div className="movie-card__body">
                <h3>{movie.name}</h3>
                <p>⭐{movie.rating}</p>
                <p>{movie.description}</p>
                {console.log(
                  `the name ${movie.name} {movie.image} the rating ${movie.rating}`
                )}
                <button
                  className="movie-card__cta"
                  type="button"
                  onClick={() => navigate(`/booking/${movie._id}`)}
                >
                  Book
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
export default MoviesDisplay;