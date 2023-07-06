import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormValidation } from "../../utils/validation";
import "./Login.css";

function Login({ onLogin, errorMessage }) {
  
  const { values, handleChange, errors, isValid } = useFormValidation();

  function onSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }
  return (
    <section className="login">
      <Link className="login__logo" to="/">
        <img src={logo} alt="Логотип проекта" />
      </Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form
        className="login__form" onSubmit={onSubmit}
      >
        <label className="login__label">E-mail</label>
        <input
          className="login__input"
          name="email"
          type="email"
          placeholder="Введите почту"
          value={values.email || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="40"
          required
        ></input>
        <span id="name-error" className="login__error">
          {errors.email}
        </span>
        <label className="login__label">Пароль</label>
        <input
          className="login__input"
          name="password"
          type="password"
          placeholder="Введите пароль"
          value={values.password || ""}
          onChange={handleChange}
          minLength="4"
          maxLength="20"
          required
        ></input>
        <span id="password-error" className="login__error">
          {errors.password}
        </span>
        <span className="login__api-error">
            {errorMessage.login.message === 'Failed to fetch'
              ? 'При авторизации произошла ошибка.'
              : errorMessage.login.errorText}
          </span>
        <button className="login__button" type="submit" disabled={!isValid}>
        Войти
      </button>
      </form>

      <p className="login__text">
        Ещё не зарегистрированы?
        <Link to="/signup" className="login__link">
          Регистрация
        </Link>
      </p>
    </section>
  );
}

export default Login;
