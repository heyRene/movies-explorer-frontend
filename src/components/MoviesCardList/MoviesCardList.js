import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import {
  MAX_MOVIES_767,
  MAX_MOVIES_1279,
  MAX_MOVIES_1280,
  STEP_767,
  STEP_1280,
  WIDTH_1279,
  WIDTH_767,
} from "../../utils/constants";
import "./MoviesCardList.css";

function MoviesCardList({ movies, onLike, onDelete, savedMovies }) {
  let location = useLocation();
  const [maxMovies, setMaxMovies] = useState(0); //
  const [step, setStep] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        setMoviesNumber();
      }, 500);
    };
  
    setMoviesNumber();
  
    window.addEventListener("resize", handleResize);
  
    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function showMoreMovies() {
    setMaxMovies(maxMovies + step);
  }

  function setMoviesNumber() {
    const width = window.innerWidth;
    if (location.pathname === "/saved-movies") {
      setMaxMovies(movies.length);
    }
    if (width <= WIDTH_767) {
      setMaxMovies(MAX_MOVIES_767);
      setStep(STEP_767);
      // } else if (width <= 1000) {
      //   setMaxMovies(8);
      //   setStep(2);
    } else if (width <= WIDTH_1279) {
      setMaxMovies(MAX_MOVIES_1279);
      setStep(STEP_767);
    } else {
      setMaxMovies(MAX_MOVIES_1280);
      setStep(STEP_1280);
    }
  }

  return (
    <section className="movies-list">
      <div className="movies-list__container">
        {movies.length > 0 &&
          movies.map((item, index) => {
            if (index < maxMovies) {
              return (
                <MoviesCard
                  key={item.id || item.movieId}
                  card={item}
                  onLike={onLike}
                  onDelete={onDelete}
                  savedMovies={savedMovies}
                />
              );
            }
            return null;
          })}
      </div>
      {movies.length > maxMovies && location.pathname !== "/saved-movies" && (
        <button className="movies-list__button" onClick={showMoreMovies}>
          Еще
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
