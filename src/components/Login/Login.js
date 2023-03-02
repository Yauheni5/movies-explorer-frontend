import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Preloader from "../Preloader/Preloader";
import validator from "validator";

export default function Login({
  isLoading,
  authorizationUser,
  togleRegisteredUser,
}) {
  const [emailUser, setEmailUser] = useState("");
  const [isValidEmailUserInput, setIsValidEmailUserInput] = useState(false);
  const [emailUserErrorText, setEmailUserErrorText] = useState("");

  const [password, setPassword] = useState("");
  const [isValidPasswordInput, setIsValidPasswordInput] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState("");

  const [isValid, setIsValid] = useState(false);

  const handleChangeInputError = (e, setInputError, setInputValid) => {
    if (e.target.validity.valid) {
      setInputError("");
      setInputValid(true);
    } else {
      setInputError(e.target.validationMessage);
      setInputValid(false);
    }
  };

  function handleChangeEmail(e) {
    if (e.target.validity.valid && validator.isEmail(e.target.value)) {
      setEmailUserErrorText("");
      setIsValidEmailUserInput(true);
      setEmailUser(e.target.value);
    } else {
      setEmailUserErrorText(e.target.validationMessage || "Неверная почта");
      setIsValidEmailUserInput(false);
    }
  }

  function handleChangePassword(e) {
    handleChangeInputError(e, setPasswordErrorText, setIsValidPasswordInput);
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    isValid && authorizationUser({ email: emailUser, password: password });
    setIsValidEmailUserInput(false);
    setIsValidPasswordInput(false);
  }

  useEffect(() => {
    setIsValid(isValidEmailUserInput && isValidPasswordInput);
  }, [isValidEmailUserInput, isValidPasswordInput]);

  return isLoading ? (
    <Preloader />
  ) : (
    <section className="register">
      <Link to="/" className="register__logo">
        <img className="logo" src={logo} alt="логотип приложения" />
      </Link>
      <h2 className="register__title">Рады видеть!</h2>
      <form className="register__form" onSubmit={(e)=>handleSubmit(e)} noValidate>
        <p className="register__label">E-mail</p>
        <input
          className={
            isValidEmailUserInput
              ? "register__input"
              : "register__input register__input_error"
          }
          placeholder="Введите E-mail"
          onChange={handleChangeEmail}
          type="email"
          required
        />
        <p className="register__error">{emailUserErrorText || ""}</p>
        <p className="register__label">Пароль</p>
        <input
          className="register__input"
          placeholder="Введите пароль"
          onChange={handleChangePassword}
          type="password"
          required
        />
        <p className="register__error">{passwordErrorText || ""}</p>
        <button
          type="submit"
          className={
            isValid
              ? "register__button"
              : "register__button register__button_disabled"
          }
          disabled={isValid ? "" : "disabled"}>
          Войти
        </button>
        <Link
          to="/signup"
          className="register__link"
          onClick={()=>togleRegisteredUser(false)}>
          Ещё не зарегистрированы?
          <span className="register__text">Регистрация</span>
        </Link>
      </form>
    </section>
  );
}
