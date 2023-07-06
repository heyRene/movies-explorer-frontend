import React,{useState, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import './Navigation.css';

function Navigation(props) {
  const [isClicked, setIsClicked] = useState(false);

  function handleClickMenu() {
    setIsClicked(!isClicked);
  }

  let location = useLocation();
  return (
    <nav className="navigation">
      {props.isLoggedIn ? (
        <Fragment>
          <button
            className={`navigation__button ${
              isClicked
                ? "navigation__button_type_close"
                : "navigation__button_type_burger"
            } `}
            onClick={handleClickMenu}
          ></button>
          {isClicked && 
            <div
              className="navigation__overlay"
              onClick={handleClickMenu}
            ></div>
          }
          <div className={`navigation__container ${isClicked ? 'navigation__container_visible' : ''}`}>
          <div
            className={`navigation__menu ${
              isClicked ? "navigation__menu_type_open" : ""
            }`}
          >
            <div className="navigation__movies">
              {isClicked && (
                <Link
                  to="/"
                  className={`navigation__link navigation__link-burger ${
                    location.pathname === "/" ? "navigation__link_active" : ""
                  }`}
                  type="button"
                  onClick={handleClickMenu}
                >
                  Главная
                </Link>
              )}

              <Link
                to="/movies"
                className={`navigation__link ${
                  location.pathname === "/movies"
                    ? "navigation__link_active"
                    : ""
                }`}
                type="button"
                onClick={handleClickMenu}
              >
                Фильмы
              </Link>
              <Link
                to="/saved-movies"
                className={`navigation__link ${
                  location.pathname === "/saved-movies"
                    ? "navigation__link_active"
                    : ""
                }`}
                type="button"
                onClick={handleClickMenu}
              >
                Сохранённые фильмы
              </Link>
            </div>
            <Link to="/profile" className="navigation__profile">
              <button
                to="/profile"
                className={`navigation__link ${
                  location.pathname === "/profile"
                    ? "navigation__link_active"
                    : ""
                }`}
                type="button"
                onClick={handleClickMenu}
              >
                Аккаунт
              </button>
              <div className="navigation__profile-photo" />
            </Link>
          </div>
          </div>
      </Fragment>
      ) : (
        <Fragment>
          <Link to="/signup" className="navigation__log-link ">
            Регистрация
          </Link>
          <Link
            to="/signin"
            className="navigation__log-link navigation__link_type_button"
            type="button"
          >
            Войти
          </Link>
        </Fragment>
      )}
    </nav>
  );
}
export default Navigation;
