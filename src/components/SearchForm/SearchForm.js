import React, { useState, useEffect } from "react";
import searchButton from "../../images/search-button.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { saveToLocalStorage, getFromLocalStorage } from "../../utils/movies";
import "./SearchForm.css";
import { useLocation } from "react-router-dom";

function SearchForm({ handleSearch }) {
  let location = useLocation();

  const [isChecked, setIsChecked] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState('');

  function handleChangeCheckbox(e) {
    setIsChecked(e.target.checked);
    handleSearch(query, e.target.checked);
    if (location.pathname === "/movies") {
      saveToLocalStorage("isChecked", e.target.checked);
    }
    if (location.pathname === "/saved-movies") {
      saveToLocalStorage("isCheckedSavedMovies", e.target.checked);
    }
  }

  function handeleInput(event) {
    setQuery(event.target.value);
    if (location.pathname === "/movies") {
      saveToLocalStorage("query", event.target.value);
    }
    if (location.pathname === "/saved-movies") {
      saveToLocalStorage("isSearching", event.target.value);
    }
  }
  function getSearchedQueries() {
    const searchedQueries = getFromLocalStorage("query");
    return searchedQueries;
  }
  function getCheckboxStatus() {
    const checkboxStatus = getFromLocalStorage("isChecked");;
    return checkboxStatus;
  }
  function getSearchedQueriesSavedMovies() {
    const isSearching = getFromLocalStorage('isSearching');
    return isSearching;
  }
  function getCheckboxStatusSavedMovies() {
    const checkboxStatusSavedMovies = getFromLocalStorage('isCheckedSavedMovies');
    return checkboxStatusSavedMovies;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) {
      setError('введите слово');
      console.log(error);
      return;
    } else {
      handleSearch(query, isChecked);
    }
  }

  useEffect(() => {
    if (location.pathname === "/movies") {
      setQuery(getSearchedQueries());
      setIsChecked(getCheckboxStatus());
    }
    if(location.pathname === "/saved-movies") {
      setQuery(getSearchedQueriesSavedMovies());
      setIsChecked(getCheckboxStatusSavedMovies());
    }
  }, [location]);

  return (
    <section className="search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-form__container">
          <input
            className="search-form__input"
            id="search"
            type="search"
            placeholder="Фильм"
            onChange={handeleInput}
            value={query || ""}
          ></input>
          <span className="search-form__input-error">{!query && error}</span>
        </div>
        <button className="search-form__button" type="sumbit">
          <img src={searchButton} alt="иконка поиска - лупа" />
        </button>
        <FilterCheckbox
          handleCheckbox={handleChangeCheckbox}
          checked={isChecked}
        />
      </form>
    </section>
  );
}

export default SearchForm;
