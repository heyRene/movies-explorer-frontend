import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ movies, onLike, onDelete, savedMovies }) {
  let location = useLocation();
  const [maxMovies, setMaxMovies] = useState(0); //
  const [step, setStep] = useState(0);

  useEffect(() => {
    setMoviesNumber();
    window.addEventListener("resize", () => {
      setTimeout(() => {
        setMoviesNumber();
      }, 500);
    });
  }, []);

  function showMoreMovies() {
    setMaxMovies(maxMovies + step);
  }

  function setMoviesNumber() {
    const width = window.innerWidth;
    if (location.pathname === "/saved-movies") {
      setMaxMovies(movies.length);
    }
    if (width <= 720) {
      setMaxMovies(5);
      setStep(2);
    } else if (width <= 1000) {
      setMaxMovies(8);
      setStep(2);
    } else if (width <= 1279) {
      setMaxMovies(9);
      setStep(3);
    } else {
      setMaxMovies(12);
      setStep(4);
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
      {movies.length > maxMovies && location.pathname !== '/saved-movies' && (
        <button className="movies-list__button" onClick={showMoreMovies}>
          Еще
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
