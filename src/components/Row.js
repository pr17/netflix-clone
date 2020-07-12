import React, { useState, useEffect } from "react";
import axiosInstance, { movie_base_url } from "../utils/baseURL";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

import "../css/row.css";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setmovies] = useState([]);
  const [trailerUrl, settrailerUrl] = useState();

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    axiosInstance
      .get(fetchUrl)
      .then((res) => setmovies(res.data.results))
      .catch((err) => console.log("Error Sir", err));
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      settrailerUrl();
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          settrailerUrl(urlParams.get("v"));
        })
        .catch();
    }
  };

  return (
    <div className="row">
      <h1>{title}</h1>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${movie_base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
