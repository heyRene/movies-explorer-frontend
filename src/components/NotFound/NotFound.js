import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = ({isLoggedIn}) => {
  const navigate = useNavigate();

  function goBack() {
    isLoggedIn ? navigate(-2) : navigate(-1);
  };
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__caption">Страница не найдена</p>
      <button to="/" className="not-found__link" onClick={goBack}>
        Назад
      </button>
    </div>
  );
};

export default NotFound;
