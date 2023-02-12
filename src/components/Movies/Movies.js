import { useState } from "react";
import { moviesData } from "../../utils/constants/constants";
import Card from "../Card/Card";

export default function Movies({isSavedFilms}) {
  const initNubmerViewFilms = 7;
  const [viewNumberFilm, setViewNumberFilm] = useState(initNubmerViewFilms);
  const [savedMovies, setSavedMovies] = useState([]);

  function handleClickMoreFilms() {
    setViewNumberFilm(viewNumberFilm + initNubmerViewFilms)
  }

  function handleToogleSavedMovies (movie) {
    return setSavedMovies([...savedMovies, movie]);
  }

  return (
    <section className="movies">
      <ul className="movies__list">
        <Card
            viewNumberFilm={viewNumberFilm}
            handleToogleSavedMovies={handleToogleSavedMovies}
            savedMovies={isSavedFilms ? savedMovies : ""}
            isSavedFilms={isSavedFilms}
            />
          {viewNumberFilm < moviesData.length ? <button onClick={handleClickMoreFilms} className="movies__button-more">Ещё</button> : ""}
      </ul>
    </section>
  );
}
