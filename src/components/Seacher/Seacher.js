import { useEffect, useState } from "react"

export default function Seacher({getMovies}) {
  const [shortFilm, setShortFilm] = useState(false);
  const [inputFilter, setInputFilter] = useState("");
  const [isInputFilterValid, setIsInputFilterValid] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setInputFilter("");
    setIsInputFilterValid(false);
  }

  function handleChangeFilterInput (e){
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
    if(shortFilm) {
      console.log("включать короткометражки");
    } else if (!shortFilm) {
      console.log("не включать в поиск короткометражки");
    }
  },[shortFilm]);

  return (
    <section className="seacher section">
      <form className="seacher__form" onSubmit={handleSubmit}>
        <input
          className="seacher__input"
          onChange={handleChangeFilterInput}
          type="text"
          placeholder="Фильм"
          value={inputFilter || ""}
          minLength={2}
          maxLength={30}
          required
          />
        <button
          className=
            {
              isInputFilterValid ?
                "seacher__button" :
                "seacher__button seacher__button_inactive"
            }
            type="submit"
            onClick={()=>(getMovies(inputFilter))}
            disabled={ isInputFilterValid ? "" : "disabled" }
          />
          <div className="seacher__track" onClick={()=> setShortFilm(!shortFilm)}>
            <div className={shortFilm ? "seacher__thumb seacher__thumb_active" : "seacher__thumb"}></div>
            <p className="seacher__label">Короткометражки</p>
          </div>
      </form>
      <hr className="seacher__line" />
    </section>
  )
}
