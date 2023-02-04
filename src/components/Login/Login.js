import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

export default function Login() {
  return (
<section className="register">
      <Link to="/" className="register__logo">
        <img className="logo" src={logo} alt="логотип приложения" />
      </Link>
      <h2 className="register__title">Рады видеть!</h2>
      <div className="register__form">
        <p className="register__label">E-mail</p>
        <input className="register__input" placeholder="Введите E-mail"/>
        <p className="register__eror"></p>
        <p className="register__label">Пароль</p>
        <input className="register__input" placeholder="Введите пароль" type="password"/>
        <p className="register__eror">Ошибка</p>
      </div>
      <button className="register__button">Войти</button>
      <Link to="/movies" className="register__link">Ещё не зарегистрированы? <span className="register__text">Регистрация</span>
      </Link>
    </section>
  )
}
