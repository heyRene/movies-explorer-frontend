import React from 'react';
import { Link } from 'react-router-dom';
import { useFormValidation } from "../../utils/validation";
import logo from "../../images/logo.svg";
import "./Register.css";

function Register({ onRegister, errorMessage }) {
  
  // const navigate = useNavigate();
  const { values, handleChange, errors, isValid } = useFormValidation();
  
  function onSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }
  
  return (
    <section className="register">
      <Link className="register__logo" to="/">
        <img src={logo} alt="Логотип проекта" />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={onSubmit}>
        <label className="register__label">Имя</label>
        <input
          className="register__input"
          name="name"
          type="text"
          placeholder="Введите имя"
          value={values.name || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
        ></input>
        <span id="name-error" className="register__error">
          {errors.name}
        </span>
        <label className="register__label">E-mail</label>
        <input
          className="register__input"
          name="email"
          type="email"
          placeholder="Введите почту"
          value={values.email || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="40"
          required
        ></input>
        <span id="email-error" className="register__error">
          {errors.email}
        </span>
        <label className="register__label">Пароль</label>
        <input
          className="register__input"
          name="password"
          type="password"
          placeholder="Придумайте пароль"
          value={values.password || ""}
          onChange={handleChange}
          minLength="4"
          maxLength="20"
          required
        ></input>
        <span id="password-error" className="register__error">
          {errors.password}
        </span>
        <span className="register__api-error">
            {errorMessage.register.message === 'Failed to fetch'
              ? 'При регистрации пользователя произошла ошибка.'
              : errorMessage.register.errorText}
          </span>
        <button className="register__button" type="submit" disabled={!isValid}>
        Зарегистрироваться
      </button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?
        <Link to="/signin" className="register__link">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
