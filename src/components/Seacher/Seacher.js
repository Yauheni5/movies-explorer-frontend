import { useEffect, useState } from "react"

export default function Seacher() {
  const [shortFilm, setShortFilm] = useState(false);
  function handleClickCheckBox(e) {
    setShortFilm(!shortFilm);
  }
  useEffect (()=>{
    if(shortFilm) {
      console.log("включать короткометражки");
    } else if (!shortFilm) {
      console.log("не включать в поиск короткометражки");
    }
  },[shortFilm]);
  return (
    <section className="seacher section">
      <div className="seacher__form">
        <input className="seacher__input" placeholder="Фильм"/>
        <button className="seacher__button" />
          <div className="seacher__track" onClick={handleClickCheckBox}>
            <div className={shortFilm ? "seacher__thumb seacher__thumb_active" : "seacher__thumb"}></div>
            <p className="seacher__label">Короткометражки</p>
          </div>
      </div>
      <hr className="seacher__line" />
    </section>
  )
}
