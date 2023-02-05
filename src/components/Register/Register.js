import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

export default function Register() {
  const [nameUser, setNameUser] = useState("");
  const [isValidNameUserInput, setIsValidNameUserInput] = useState(false);
  const [nameUserErrorText, setNameUserErrorText] = useState("");

  const [emailUser, setEmailUser] = useState("")
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

  function handleChangeNameUser(e) {
    handleChangeInputError(
      e,
      setNameUserErrorText,
      setIsValidNameUserInput
    );
    setNameUser(e.target.value);
  }

  function handleChangeEmail(e) {
    handleChangeInputError(
      e,
      setEmailUserErrorText,
      setIsValidEmailUserInput
    );
    setEmailUser(e.target.value);
  }

  function handleChangePassword(e) {
    handleChangeInputError(
      e,
      setPasswordErrorText,
      setIsValidPasswordInput
    );
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    isValid && console.log({ name: nameUser, email: emailUser, password: password });
  }

  useEffect(() => {
    setIsValid(isValidNameUserInput && isValidEmailUserInput && isValidPasswordInput);
  }, [isValidNameUserInput, isValidEmailUserInput, isValidPasswordInput]);

  return(
    <section className="register">
      <Link to="/" className="register__logo">
        <img className="logo" src={logo} alt="логотип приложения" />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit} noValidate>
        <p className="register__label">Имя</p>
        <input className={isValidNameUserInput ? "register__input" : "register__input register__input_error"}
          placeholder="Введите имя"
          onChange={handleChangeNameUser}
          type="text"
          minLength={2}
          maxLength={30}
          required
        />
        <p className="register__eror">{nameUserErrorText || ""}</p>
        <p className="register__label">E-mail</p>
        <input className={isValidEmailUserInput ? "register__input" : "register__input register__input_error"}
          placeholder="Введите E-mail"
          onChange={handleChangeEmail}
          type="email"
          required
        />
        <p className="register__eror">{emailUserErrorText || ""}</p>
        <p className="register__label">Пароль</p>
        <input className={isValidPasswordInput ? "register__input" : "register__input register__input_error"}
          placeholder="Введите пароль"
          onChange={handleChangePassword}
          type="password"
          required
        />
        <p className="register__eror">{passwordErrorText || ""}</p>
        <button
          type="submit"
          className={isValid ? "register__button" : "register__button register__button_disabled"}
          disabled={isValid ? "" : "disabled"}
        >
          Зарегистрироваться
        </button>
        <Link to="/signin" className="register__link" >Уже зарегистрированы? <span className="register__text">Войти</span></Link>
      </form>
    </section>
  )
}
