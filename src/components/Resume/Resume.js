import { Link } from "react-router-dom";

export default function Resume() {
  return (
    <section className="section resume">
      <h2 className="section__title">Студент</h2>
      <hr className="section__line"/>
      <h2 className="resume__title">Евгений</h2>
      <p className="resume__info">Фронтенд-разработчик, 34 года</p>
      <p className="resume__about">Я из Беларуси, город Гродно. До разработки 6 лет работал специалистом по продажам средств защиты растений, затем 10 лет занимался небольшим магазином для дачи. В апреле 2022 начал изучать фронтенд. С первых строчек кода втянулся в это интересное занятие. Люблю решать задачи, которые на первый взгляд кажутся сложными, а затем шаг за шагом клубок-сложности распутывается. В свободное время увлекаюсь квестами, спортивным ориентированием.</p>
      <Link to="https://github.com/Yauheni5" className="resume__link">Github</Link>
      <h3 className="resume__portfolio">Портфолио</h3>
      <Link to="https://github.com/Yauheni5" className="resume__link">Статичный сайт</Link>
      <Link to="https://github.com/Yauheni5" className="resume__link">Адаптивный сайт</Link>
      <Link to="https://github.com/Yauheni5" className="resume__link">Одностраничное приложение</Link>
    </section>
  )
}
