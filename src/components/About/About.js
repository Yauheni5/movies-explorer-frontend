export default function About() {
  return (
    <section className="section about">
      <h2 className="section__title">О проекте</h2>
      <hr className="section__line"/>
      <div className="about__info">
        <div className="about__column">
          <p className="about__text">Дипломный проект включал 5 этапов</p>
          <p className="about__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about__column">
          <p className="about__text">На выполнение диплома ушло 5 недель</p>
          <p className="about__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about__graph">
        <div className="about__field about__field_backend">
          <p className="about__paragraph about__paragraph_backend">1 неделя</p>
          <p className="about__subtitle">Back-end</p>
        </div>
        <div className="about__field about__field_frontend">
          <p className="about__paragraph about__paragraph_frontend">4 недели</p>
          <p className="about__subtitle">Front-end</p>
        </div>
      </div>
    </section>
  )
}
