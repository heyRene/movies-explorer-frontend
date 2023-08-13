import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import "./App.css";
import MainApi from "../../utils/MainApi";
import * as auth from "../../utils/Auth";
import Preloader from "../Preloader/Preloader";
import { saveToLocalStorage } from "../../utils/movies";
import { moviesApi } from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    login: {},
    register: {},
    profile: {},
    movies: {},
  });

  const [savedMovies, setSavedMovies] = React.useState([]);
  let location = useLocation();
  const navigate = useNavigate();
  const endpointsFooter = ["/movies", "/saved-movies", "/"];
  const endpointsHeader = ["/", "/movies", "/saved-movies", "/profile"];

  const mainApi = new MainApi({
    url: "https://api.movie-heyrene.nomoredomains.rocks",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  // очистка полей с ошибками
  useEffect(() => {
    setErrorMessage({
      login: {},
      register: {},
      profile: {},
    });
  }, [location]);
  //получение массива сохраненный карточек и сохранение их в ls
  useEffect(() => {
    isLoggedIn &&
      mainApi
        .getSavedMovies()
        .then((data) => {
          setSavedMovies(data);
          saveToLocalStorage("savedMovies", data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [isLoggedIn]);

  //получение информации о пользователе
  useEffect(() => {
    isLoggedIn && getUserInfo();
  }, [isLoggedIn]);

  function getUserInfo() {
    mainApi
      .getUserInfo()
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
        // setErrorMessage({ ...errorMessage, movies: {} });
      });
  }

  // обновление массива сохраненных фильмов в ls
  useEffect(() => {
    isLoggedIn && saveToLocalStorage("savedMovies", savedMovies);
  }, [savedMovies, isLoggedIn]);

  // получение всех карточек c фильмами и сохранение их в ls
  useEffect(() => {
    isLoggedIn && getCards();
  }, [isLoggedIn]);

  //функция запроса для получения карточек и сохранение их в ls
  function getCards() {
    moviesApi
      .getMovies()
      .then((data) => {
        saveToLocalStorage("movies", data);
        setErrorMessage({ ...errorMessage, movies: {} });
      })
      .catch(() => {
        setErrorMessage({ ...errorMessage, movies: {} });
      });
  }

  // проверка токена
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((user) => {
          setIsLoggedIn(true);
          saveToLocalStorage("userId", user._id);
          navigate(location.pathname);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.status === 401) {
            localStorage.removeItem("jwt");
            setIsLoading(false);
            navigate("/", { replace: true });
            console.log(err);
          } else {
            setIsLoading(false);
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  //если пользователь залогинен - перенаправить на страницу где он находится
  // useEffect(() => {
  //   if (isLoggedIn === true) {
  //     navigate(location.pathname);
  //   }
  // }, [isLoggedIn, navigate, location.pathname]);

  // логин и сохранение токена в local storage
  function onLogin(values) {
    auth
      .authorize(values.email, values.password)
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          navigate("/movies", { replace: true });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsUpdate(false);
        console.log(err);
        setIsLoading(false);
        setErrorMessage({ ...errorMessage, login: err });
      })
      .finally(() => setIsLoading(false));
  }

  //регистрация и автоматическй вход
  function onRegister(values) {
    auth
      .register(values.name, values.email, values.password)
      .then((res) => {
        onLogin(values);
        // console.log(res);
      })
      .catch((err) => {
        setIsUpdate(false);
        console.log(err);
        setErrorMessage({ ...errorMessage, register: err });
      });
  }

  // выход из аккаунта
  const onSignOut = () => {
    localStorage.clear();
    // setCurrentUser({});
    navigate("/");
    setIsLoggedIn(false);
  };

  // изменения данных пользователя
  function onUpdateUser(data) {
    mainApi
      .updateProfile(data)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          name: data.name,
          email: data.email,
        });
        setErrorMessage({ ...errorMessage, profile: {} });
        setIsUpdate(true);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage({ ...errorMessage, profile: err });
        setIsUpdate(false);
      });
  }
  // постановка лайка и изменение массива сохраненный фильмов
  function handleLikeMovie(movie, isLiked, id) {
    if (isLiked) {
      handleDeleteMovie(id);
    } else {
      mainApi
        .saveMovie(movie)
        .then((newCard) => {
          setSavedMovies([newCard, ...savedMovies]);
          console.log(savedMovies);
        })
        .catch((err) => console.log(err));
    }
  }
  // удаление карточки и создание массива сохраненных фильмов из оставшихся
  function handleDeleteMovie(id) {
    // debugger
    mainApi
      .deleteMovie(id)
      .then((res) => {
        const newMoviesList = savedMovies.filter((m) => m._id !== id);
        setSavedMovies(newMoviesList);
        // saveToLocalStorage('searchedSavedMovies', newMoviesList);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="app">
      {isLoading ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={{ currentUser }}>
          {endpointsHeader.includes(location.pathname) ? (
            <Header isLoggedIn={isLoggedIn} />
          ) : (
            ""
          )}
          <main>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route
                path="/movies"
                element={
                  // <Movies
                  <ProtectedRoute
                    element={Movies}
                    getCards={getCards}
                    isLoggedIn={isLoggedIn}
                    onLike={handleLikeMovie}
                    savedMovies={savedMovies}
                    errorMessage={errorMessage}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  // <SavedMovies
                  <ProtectedRoute
                    element={SavedMovies}
                    movies={savedMovies}
                    onDelete={handleDeleteMovie}
                    isLoggedIn={isLoggedIn}
                    errorMessage={errorMessage}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    element={Profile}
                    isLoggedIn={isLoggedIn}
                    onSignOut={onSignOut}
                    onUpdate={onUpdateUser}
                    isUpdate={isUpdate}
                    errorMessage={errorMessage}
                  />
                }
              />
              <Route
                path="/signin"
                element={
                  <Login
                    isLoggedIn={isLoggedIn}
                    onLogin={onLogin}
                    errorMessage={errorMessage}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <Register
                    isLoggedIn={isLoggedIn}
                    onRegister={onRegister}
                    errorMessage={errorMessage}
                  />
                }
              />
              <Route path="*" element={<NotFound isLoggedIn={isLoggedIn} />} />
            </Routes>
          </main>
          {endpointsFooter.includes(location.pathname) ? <Footer /> : ""}
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;
