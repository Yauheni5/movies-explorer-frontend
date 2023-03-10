import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Preloader from "../Preloader/Preloader";
import validator from "validator";

export default function Register({
  isLoading,
  registrationUser,
  togleRegisteredUser,
}) {
  const [nameUser, setNameUser] = useState("");
  const [isValidNameUserInput, setIsValidNameUserInput] = useState(true);
  const [nameUserErrorText, setNameUserErrorText] = useState("");

  const [emailUser, setEmailUser] = useState("");
  const [isValidEmailUserInput, setIsValidEmailUserInput] = useState(true);
  const [emailUserErrorText, setEmailUserErrorText] = useState("");

  const [password, setPassword] = useState("");
  const [isValidPasswordInput, setIsValidPasswordInput] = useState(true);
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

  function handleChangeNameUser(e) {
    if (e.target.value === "") {
      setIsValidNameUserInput(true);
      setNameUserErrorText("");
      setNameUser("")
    } else {
      handleChangeInputError(e, setNameUserErrorText, setIsValidNameUserInput);
      setNameUser(e.target.value);
    }
  }

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
    isValid &&
      registrationUser({
        name: nameUser,
        email: emailUser,
        password: password,
      });
      setNameUser(nameUser)
      setEmailUser(emailUser);
      setPassword(password);
      setIsValidNameUserInput(true)
      setIsValidEmailUserInput(false);
      setIsValidPasswordInput(true);
  }

  useEffect(() => {
    setIsValid(
      isValidNameUserInput && isValidEmailUserInput && isValidPasswordInput && nameUser && emailUser && password
    );
  }, [isValidNameUserInput, isValidEmailUserInput, isValidPasswordInput, nameUser, emailUser, password]);

  return isLoading ? (
    <Preloader />
  ) : (
    <section className="register">
      <Link to="/" className="register__logo">
        <img className="logo" src={logo} alt="логотип приложения" />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={(e)=>handleSubmit(e)} noValidate>
        <p className="register__label">Имя</p>
        <input
          className={
            isValidNameUserInput
              ? "register__input"
              : "register__input register__input_error"
          }
          placeholder="Введите имя"
          onChange={handleChangeNameUser}
          defaultValue={"" || nameUser}
          type="text"
          minLength={2}
          maxLength={30}
          required
        />
        <p className="register__error">{nameUserErrorText || ""}</p>
        <p className="register__label">E-mail</p>
        <input
          className={
            isValidEmailUserInput
              ? "register__input"
              : "register__input register__input_error"
          }
          placeholder="Введите E-mail"
          onChange={handleChangeEmail}
          defaultValue={"" || emailUser}
          type="email"
          required
        />
        <p className="register__error">{emailUserErrorText || ""}</p>
        <p className="register__label">Пароль</p>
        <input
          className={
            isValidPasswordInput
              ? "register__input"
              : "register__input register__input_error"
          }
          placeholder="Введите пароль"
          onChange={handleChangePassword}
          defaultValue={"" || password}
          type="password"
          minLength={6}
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
          Зарегистрироваться
        </button>
        <Link
          to="/signin"
          className="register__link"
          onClick={()=>togleRegisteredUser(true)}>
          Уже зарегистрированы?
          <span className="register__text">Войти</span>
        </Link>
      </form>
    </section>
  );
}
