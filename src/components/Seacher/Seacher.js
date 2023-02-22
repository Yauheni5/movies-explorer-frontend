import { useEffect, useState } from "react"

export default function Seacher({
  handleTogleShortMovies,
  isShortMovie,
  filterMovies
}) {

  const [inputFilter, setInputFilter] = useState("");
  const [isInputFilterValid, setIsInputFilterValid] = useState(true);

  function handleSubmitFilter(e) {
    e.preventDefault();
    filterMovies(inputFilter);
    setInputFilter("");
    setIsInputFilterValid(false);
  }

  function handleChangeFilterInput (e) {
    setInputFilter(e.target.value)
    if (e.target.validity.valid) {
      setIsInputFilterValid(true);
    } else {
      setIsInputFilterValid(false);
    }
  }
 useEffect(() => {
    setIsInputFilterValid(isInputFilterValid);
  }, [isInputFilterValid]);

  useEffect (()=>{
    /* getShortFilm(isShortFilm); */
  }, [isShortMovie]);

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
