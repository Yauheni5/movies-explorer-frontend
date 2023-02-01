import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__link"><img className="logo" src={logo} alt="логотип приложения" /></Link>
      <div className="header__cabinet">
        <Link to="/sign-up" className="header__link">Регистрация</Link>
        <Link to="/sign-up" className="header__link header__link_button">Войти</Link>
      </div>
    </header>
  );
}

export default Header;
