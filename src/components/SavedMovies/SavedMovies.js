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
  // const [isSearching, setIsSearching] = useState(getFromLocalStorage('isSearching'));
  const userId = getFromLocalStorage('userId');


  // выводит на экран сохраненные фильмы
  useEffect(() => {
    // if (getFromLocalStorage("searchedSavedMovies") ) {
    //   handleSavedMovies(getFromLocalStorage("searchedSavedMovies"), userId);
    // }
    if (getFromLocalStorage("savedMovies") ) {
      handleSavedMovies(getFromLocalStorage("savedMovies"), userId);
    }
    handleSavedMovies(filterMovies(movies, getFromLocalStorage('isSearching'), getFromLocalStorage('isCheckedSavedMovies')), userId);
    console.log(filteredMovies);
  }, [userId, movies]);



// фильтрует массив всех сохраненных фильмов для каждого пользователя - выводит сохраненные фильмы для каждого
  function handleSavedMovies(movies, userId) {
    const savedMovies = filterSavedMovies(movies, userId);
    saveToLocalStorage("savedMovies", savedMovies);
    setFilteredMovies(savedMovies);
  }

// фильтрует сохраненные фильмы при поиске
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
    // saveToLocalStorage('searchedSavedMovies', filteredSavedMovies);
    setFilteredMovies(filteredSavedMovies);
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
