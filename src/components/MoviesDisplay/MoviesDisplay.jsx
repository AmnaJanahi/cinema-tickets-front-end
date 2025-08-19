import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router";

import { getAllMovie as fetchAllMovies } from "../../../lib/api";

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
    <>
      <ol>
        {movies.map((movie) => {
          return (
            <>
              <img
                src={movie.image}
                style={{
                  width: 200,
                  height: 300,
                  objectFit: "cover",
                  display: "block",
                  borderRadius: 6,
                }}
              />
              <h3>{movie.name}</h3>
              <p>⭐{movie.rating}</p>
              <p>{movie.description}</p>
              {console.log(
                `the name ${movie.name} {movie.image} the rating ${movie.rating}`
              )}
              <button
                type="button"
                onClick={() =>
                  navigate("/booking", {
                    state: {
                      movie
                    },
                  })
                }
              >
                Book
              </button>
            </>
          );
        })}
      </ol>
    </>
  );
};
export default MoviesDisplay;
