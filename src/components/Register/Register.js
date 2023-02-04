import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

export default function Register() {
  return(
    <section className="register">
      <Link to="/" className="register__logo">
        <img className="logo" src={logo} alt="логотип приложения" />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <div className="register__form">
        <p className="register__label">Имя</p>
        <input className="register__input" placeholder="Введите имя" />
        <p className="register__eror"></p>
        <p className="register__label">E-mail</p>
        <input className="register__input" placeholder="Введите E-mail"/>
        <p className="register__eror"></p>
        <p className="register__label">Пароль</p>
        <input className="register__input" placeholder="Введите пароль" type="password"/>
        <p className="register__eror">Ошибка</p>
      </div>
      <button className="register__button">Зарегистрироваться</button>
      <Link to="/signin" className="register__link">Уже зарегистрированы? <span className="register__text">Войти</span></Link>
    </section>
  )
}
