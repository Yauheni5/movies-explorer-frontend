export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer section">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <hr className="footer__line"/>
      <div className="footer__raw">
        <p className="footer__date">© {currentYear}</p>
        <div className="footer__links">
          <a href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer" className="footer__link">Яндекс.Практикум</a>
          <a href="https://github.com/Yauheni5" target="_blank" rel="noopener noreferrer" className="footer__link">Github</a>
        </div>
      </div>
    </footer>
  )
}
