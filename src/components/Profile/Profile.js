import { useEffect, useState } from "react";

export default function Profile({userData, editDataUser, handleClickLogged}) {
  console.log(userData)
  const [nameUser, setNameUser] = useState(userData.name);
  const [isValidNameUserInput, setIsValidNameUserInput] = useState(true);
  const [nameUserErrorText, setNameUserErrorText] = useState("");

  const [emailUser, setEmailUser] = useState(userData.email)
  const [isValidEmailUserInput, setIsValidEmailUserInput] = useState(true);
  const [emailUserErrorText, setEmailUserErrorText] = useState("");

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

  function handleSubmit(e) {
    e.preventDefault();
    editDataUser({ name: nameUser || userData.name, email: emailUser || userData.email});
    console.log(nameUser, emailUser, isValid);
  }

  useEffect(() => {
    setIsValid(isValidNameUserInput && isValidEmailUserInput && (nameUser || emailUser));
  }, [isValidNameUserInput, isValidEmailUserInput, nameUser, emailUser]);

  return(
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit} noValidate>
        <h2 className="profile__title">Привет, {nameUser || userData.name}!</h2>
        <div className="profile__field profile__field_name">
          <p className="profile__field-title profile__field-title_name">Имя</p>
          <input
            className="profile__input profile__input_name"
            placeholder={nameUser || userData.name}
            value={nameUser || ""}
            onChange={handleChangeNameUser}
            minLength={2}
          />
          <p className="profile__error">{nameUserErrorText || ""}</p>
        </div>
        <div className="profile__field profile__field_email">
          <p className="profile__field-title profile__field-title_email">E&#8209;mail</p>
          <input
          className="profile__input profile__input_email"
          type="email"
          placeholder={emailUser || userData.email}
          value={emailUser || ""}
          onChange={handleChangeEmail}
          />
          <p className="profile__error">{emailUserErrorText || ""}</p>
        </div>
        <button
          type="submit"
          className=
            {
              isValid &&
              ((isValidEmailUserInput && !nameUser) || (isValidNameUserInput && !emailUser))
              ?
              "profile__button profile__button_edit"
              :
              "profile__button profile__button_edit profile__button_inactive"
            }
          disabled={isValid ? "" : "disabled"}
          >
          Редактировать
        </button>
        <button
          type="button"
          className="profile__button profile__button_exit"
          onClick={handleClickLogged}
          >
          Выйти из аккаунта
        </button>
      </form>
    </section>
  )
}
