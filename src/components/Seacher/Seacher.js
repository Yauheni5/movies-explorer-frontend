import { useEffect, useState } from "react"

export default function Seacher() {
  const [shortFilm, setShortFilm] = useState(false);
  function checkbox(e) {
    if (e.target.value === '1') {
      setShortFilm(true);
    } else {
      setShortFilm(false);
    }
  }
  useEffect (()=>{
    if(shortFilm) {
      console.log("включать короткометражки");
    } else if (!shortFilm) {
      console.log("не включать в поиск короткометражки");
    }
  },[shortFilm]);
  return (
    <section className="seacher">
      <div className="seacher__form">
        <input className="seacher__input" placeholder="Фильм"/>
        <button className="seacher__button" />
        <input className="seacher__checkbox" type="range" max={1} id="seacher-checkbox" onChange={checkbox}/>
        <label className="seacher__checkbox-label" htmlFor="seacher-checkbox">Короткометражки</label>
      </div>
    </section>
  )
}
