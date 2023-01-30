import { Link } from "react-router-dom";

export default function Info() {
  return (
    <section className="info">
      <h1 className="info__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
      <p className="info__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      <Link to="#" className="info__button">Узнать больше</Link>
    </section>
  )
};
