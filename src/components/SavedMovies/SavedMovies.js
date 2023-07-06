import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  filterMovies,
  filterSavedMovies,
} from "../../utils/movies";
import Preloader from "../Preloader/Preloader";


function SavedMovies({ onDelete, movies }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = getFromLocalStorage('userId');

  // useEffect(() => {
  //   if (getFromLocalStorage("savedMovies")) {
  //     setFilteredMovies(getFromLocalStorage("savedMovies"));
  //     console.log(savedMovies);
  //   }
  //   setFilteredMovies(movies)
  // }, [movies, savedMovies]);

  useEffect(() => {
    if (getFromLocalStorage("savedMovies") ) {
      handleSavedMovies(getFromLocalStorage("savedMovies"), userId);
    }
    handleSavedMovies(movies, userId);
  }, [userId, movies]);

  function handleSavedMovies(movies, userId) {
    const savedMovies = filterSavedMovies(movies, userId);
    saveToLocalStorage("savedMovies", savedMovies);
    return setFilteredMovies(savedMovies);
  }

  function handleSearch(query, isChecked) {
    setIsLoading(true);
    setTimeout(
      () => {
    const storedMovies = getFromLocalStorage('savedMovies')
    setIsLoading(true);
    const filtered = filterMovies(storedMovies, query, isChecked);
    if (filtered.length === 0) {
    }
    const filteredSavedMovies = filterSavedMovies(filtered, userId);
    setIsLoading(false);
    return setFilteredMovies(filteredSavedMovies);
  }, 300);
  }

  return (
    <section className="saved-movies">
      <SearchForm handleSearch={handleSearch} />
      {isLoading ? (
        <Preloader />
      ) : filteredMovies.length ? (
        <MoviesCardList movies={filteredMovies} onDelete={onDelete} />
      ) : (
        getFromLocalStorage("savedMovies") && (
          <p className="movies__not-found-error">
            ничего нет :(
          </p>
        )
      )}
    </section>
  );
}

export default SavedMovies;
