import { useHistory } from "react-router-dom";

export default function NotFoundPage() {
  return(
    <section className="not-found-page">
      <h2 className="not-found-page__title">404</h2>
      <p className="not-found-page__text">Страница не найдена</p>
      <button type="button" onClick={useHistory().goBack} className="not-found-page__link">Назад</button>
    </section>
  )
}
