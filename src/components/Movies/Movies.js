import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { moviesApi } from "../../utils/MoviesApi";
// import mainApi from "../../utils/MainApi";
// import { searchFilter } from '../../utils/movies'
import {
  saveToLocalStorage,
  getFromLocalStorage,
  filterMovies,
  filterSavedMovies
} from "../../utils/movies";
import "./Movies.css";
import Preloader from "../Preloader/Preloader";
// import { getFromLocalStorage, saveToLocalStorage } from "../../utils/movies";

const Movies = ({
  onLike,
  isLoggedIn,
  getCards,
  savedMovies,
  errorMessage,
}) => {
  const [movies, setMovies] = useState([]);
  const [savedFilteredMovies, setSavedFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = getFromLocalStorage('userId');

  // проверяем, есть ли в ls фильмы которые искал пользователь
  useEffect(() => {
    if (getFromLocalStorage("searchedMovies")) {
      setMovies(getFromLocalStorage("searchedMovies"));
    }
  }, []);

useEffect(() => {
  const filteredSavedMovies = filterSavedMovies(savedMovies, userId);
  saveToLocalStorage("savedMovies", filteredSavedMovies);
  setSavedFilteredMovies(filteredSavedMovies);
}, [savedMovies, userId])

  //функция обработчик - для массива фильтрованных карточек
  function filter(query, short) {
    const storedMovies = getFromLocalStorage("movies");
    const filtered = filterMovies(storedMovies, query, short);
    if (filtered.length === 0) {
      console.log('meow nothung')
    }
    setMovies(filtered);
    setIsLoading(false);
    saveToLocalStorage("searchedMovies", filtered);
  }

// функция для реализации поиска по запросу
  function handleSearch(query, shorts) {
    setIsLoading(true);
    setTimeout(
      () => {
    const storedMovies = getFromLocalStorage("movies");
    if (!storedMovies) {
      moviesApi
        .getAllMovies()
        .then((films) => {
          saveToLocalStorage("movies", films);
          filter(query, shorts);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      filter(query, shorts);
    }
    setIsLoading(false);
  },
  300
    );
  }

  return (
    <section className="movies">
      <SearchForm handleSearch={handleSearch} errorMessage={errorMessage} />

      {errorMessage?.movies &&
      Object.keys(errorMessage?.movies).length !== 0 ? (
        <p className="movies__error-message">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
      ) : (
        ""
      )}
      {isLoading ? (
        <Preloader />
      ) : movies.length ? (
        <MoviesCardList
          movies={movies}
          savedMovies={savedFilteredMovies}
          onLike={onLike}
        />
      ) : (
        getFromLocalStorage("searchedMovies") && (
          <p className="movies__not-found-error">ничего не найдено :(</p>
        )
      )}
    </section>
  );
};
export default Movies;
