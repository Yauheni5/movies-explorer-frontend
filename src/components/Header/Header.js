import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Header({ isLogged, handleClickLogged, currentUser }) {
  console.log(currentUser)
  function handleClickBurgerMenu() {
    if (document.querySelector('.burger__button-close')) {
      document.querySelector('.burger__button-close').className = "burger__button-close_active";
      document.querySelector('.burger__cabinet').className = "burger__cabinet_active";
      document.querySelector('.header__burger').className = "header__burger_inactive";
    } else {
      document.querySelector('.burger__button-close_active').className = "burger__button-close";
      document.querySelector('.burger__cabinet_active').className = "burger__cabinet";
      document.querySelector('.header__burger_inactive').className = "header__burger";
    }

  }
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img className="logo" src={logo} alt="логотип приложения" />
      </Link>
      {isLogged ? (
        <div className="header__block">
          <Link to="/movies" className="header__link">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="header__link">
            Сохранённые фильмы
          </Link>
        </div>
      ) : (
        ""
      )}

      {isLogged ? (
        <div className="header__cabinet">
          <Link
            to="/profile"
            className="header__link header__button-account"
          >
            Аккаунт
          </Link>
        </div>
      ) : (
        <div className="header__cabinet">
          <Link to="/signup" className="header__link">
            Регистрация
          </Link>
          <Link
            to="/signin"
            className="header__link header__link_button"
            onClick={handleClickLogged}>
            Войти
          </Link>
        </div>
      )}
      <div className="burger header__burger" onClick={handleClickBurgerMenu}>
        <div className="burger__button-close"></div>
        {isLogged ? (
          <div className="burger__cabinet">
            <Link to="/" className="burger__link">
              Главная
            </Link>
            <Link to="/movies" className="burger__link">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="burger__link">
              Сохранённые фильмы
            </Link>
            <Link
              to="/profile"
              className="header__link header__button-account burger__button-account"
            >
              {currentUser.name}
            </Link>
          </div>
        ) : (
          <div className="burger__cabinet">
            <Link to="/signup" className="burger__link">
              Регистрация
            </Link>
            <Link
              to="/signin"
              className="burger__link burger__link_button"
              onClick={handleClickLogged}>
              Войти
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
