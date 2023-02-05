export default function Portfolio() {
  return (
    <div className="portfolio">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__element">
            <a href="https://yauheni5.github.io/how-to-learn/index.html" target="_blank" rel="noopener noreferrer" className="portfolio__link">Статичный сайт</a>
          </li>
          <li className="portfolio__element">
            <a href="https://yauheni5.github.io/russian-travel/index.html" target="_blank" rel="noopener noreferrer" className="portfolio__link">Адаптивный сайт</a>
          </li>
          <li className="portfolio__element">
            <a href="https://yauheni5.github.io/react-mesto-auth/#" target="_blank" rel="noopener noreferrer" className="portfolio__link">Одностраничное приложение</a>
          </li>
        </ul>

      </div>
  )
}
