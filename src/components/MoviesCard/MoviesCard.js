import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ card, onLike, onDelete, savedMovies }) {
  function reverseMinutes(min) {
    const hours = Math.trunc(min / 60);
    const minutes = min % 60;
    return `${hours}ч ${minutes}м`;
  }
  let location = useLocation();
  const moviesPage = location.pathname === "/movies";
  const savedMoviesPage = location.pathname === "/saved-movies";
  const savedMovie = savedMovies
    ? savedMovies.find((item) => item.movieId === card.id)
    : "";
  const isLiked = savedMovies
    ? savedMovies.some((i) => i.movieId === card.id)
    : false;
  // const [isLike, setisLike] = React.useState(false);


  function handleLikeToggle() {
    // setisLike(!isLike);
    onLike(card, isLiked, savedMovie?._id);
    console.log(card);
  }
  function handleDelete() {
    onDelete(card._id);
  }

  return (
    <section className="movie">
      <a
        className="movie__image-box"
        href={card.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie__image"
          src={
            moviesPage
              ? `https://api.nomoreparties.co/${card.image.url}`
              : card.image
          }
          alt={card.nameRU}
        ></img>
      </a>
      <div className="movie__description">
        <h2 className="movie__title">{card.nameRU}</h2>
        <p className="movie__duration">{reverseMinutes(card.duration)}</p>
        {moviesPage && (
          <button
            className={`movie__like-button ${
              isLiked ? " movie__like-button_active" : ""
            }`}
            onClick={handleLikeToggle}
          ></button>
        )}
        {savedMoviesPage && (
          <button
            className="movie__delete-button"
            onClick={handleDelete}
          ></button>
        )}
      </div>
    </section>
  );
}

export default MoviesCard;
