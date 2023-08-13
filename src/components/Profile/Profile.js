import React from "react";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormValidation } from "../../utils/validation";
import "./Profile.css";

function Profile({ onSignOut, onUpdate, isUpdate, errorMessage }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues, setIsValid } =
    useFormValidation();
  const [isInputActive, setIsInputActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if(currentUser){
      setValues(currentUser);
      setIsValid(true);
      console.log(currentUser);
  }
  }, [setValues, currentUser, setIsValid]);

  useEffect(() => {
    if (isUpdate) {
      setIsInputActive(false);
      setSuccessMessage(true);
    }
  }, [isUpdate, errorMessage]);

  useEffect(() => {
    if (
      currentUser.name === values.name &&
      currentUser.email === values.email
    ) {
      setIsValid(false);
    }
  }, [setIsValid, values, currentUser]);

  function onSubmit(e) {
    // debugger
    e.preventDefault();
    onUpdate(values);
  }
  function handleUpdateClick() {
    setIsInputActive(true);
    setSuccessMessage(false);
  }

  return (
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
      <form className="profile__form" onSubmit={onSubmit}>
        <div className="profile__field">
          <label className="profile__label">Имя</label>
          <input
            type="text"
            className="profile__input"
            onChange={handleChange}
            value={values.name || ""}
            name="name"
            minLength="2"
            maxLength="30"
            required
            id="name"
            disabled={!isInputActive}
          />
        </div>
        <span id="name-error" className="profile__error">
          {errors.name}
        </span>
        <div className="profile__field">
          <label className="profile__label">Email</label>
          <input
            type="email"
            className="profile__input"
            onChange={handleChange}
            value={values.email || ""}
            name="email"
            minLength="2"
            maxLength="30"
            required
            id="email"
            disabled={!isInputActive}
          />
        </div>
        <span id="email-error" className="profile__error">
          {errors.email}
        </span>
        <div className="profile__button-container">
          {errorMessage.profile && (
            <span id="email-error" className="profile__error-message">
              {errorMessage.profile.error}
            </span>
          )}

          {successMessage && (
            <span className="profile-form__success-message">
              Данные профиля изменены
            </span>
          )}
          {isInputActive ? (
            <button
              className="profile__save-button"
              type="submit"
              disabled={!isValid}
            >
              Сохранить
            </button>
          ) : (
            <button
              className="profile__edit-button"
              type="button"
              onClick={handleUpdateClick}
            >
              Редактировать
            </button>
          )}
          <button className="profile__logout-button" onClick={onSignOut}>
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
