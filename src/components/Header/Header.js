import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header(props) {
  return (
    <header
      className={`header ${props.isLoggedIn ? "header_type_loggedIn" : ""}`}
    >
      <Link className="header__link" to="/">
        <img src={logo} className="header__logo" alt="Логотип проекта" />
      </Link>
      <Navigation isLoggedIn={props.isLoggedIn} />
    </header>
  );
}
export default Header;
