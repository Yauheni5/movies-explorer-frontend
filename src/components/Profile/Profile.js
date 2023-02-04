export default function Profile({userData, handleClickLogged}) {
  return(
    <section className="profile">
      <h2 className="profile__title">Привет, {userData.name}!</h2>
      <div className="profile__field profile__field_name">
        <p className="profile__field-title profile__field-title_name">Имя</p>
        <input className="profile__input profile__input_name" placeholder={userData.name} />
      </div>
      <div className="profile__field profile__field_email">
        <p className="profile__field-title profile__field-title_email">E&#8209;mail</p>
        <input className="profile__input profile__input_name" placeholder={userData.email} />
      </div>
      <button className="profile__button profile__button_edit">Редактировать</button>
      <button className="profile__button profile__button_exit" onClick={handleClickLogged}>Выйти из аккаунта</button>
    </section>
  )
}
