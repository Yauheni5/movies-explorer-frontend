export default function Seacher({
  isSavedFilms,
  inputFilter,
  isInputFilterValid,
  handleTogleShortMovies,
  handleChangeFilterInput,
  isShortMovie,
  filterMovies
}) {

  function handleSubmitFilter(e) {
    e.preventDefault();
    filterMovies(inputFilter);
    !isSavedFilms && localStorage.setItem('dataSearcher',
      JSON.stringify({inputFilter: inputFilter, isShortMovie:isShortMovie
    }));
  }

  return (
    <section className="seacher section">
      <form className="seacher__form" onSubmit={handleSubmitFilter}>
        <input
          className="seacher__input"
          type="text"
          onChange={handleChangeFilterInput}
          placeholder="Поиск по строке из названия"
          value={inputFilter || ""}
          />
        <button
          className=
            {
              isInputFilterValid ?
                "seacher__button" :
                "seacher__button seacher__button_inactive"
            }
            type="submit"
          />
          <button type="button" onClick={handleTogleShortMovies} className="seacher__track">
            <div className={isShortMovie ? "seacher__thumb seacher__thumb_active" : "seacher__thumb"}></div>
            <p className={isShortMovie ? "seacher__label" : "seacher__label seacher__label_inactive"}>Короткометражки</p>
          </button>
      </form>
      <hr className="seacher__line" />
    </section>
  )
}
