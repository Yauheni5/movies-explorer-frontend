import { useState } from "react";
import { moviesData } from "../../utils/constants/constants";
import Card from "../Card/Card";

export default function Movies({isSavedFilms, moviesFilter, handleSavedMovies}) {
  const initNubmerViewFilms = 7;
  const [viewNumberFilm, setViewNumberFilm] = useState(initNubmerViewFilms);
  const [savedMovies, setSavedMovies] = useState([]);

  function handleClickMoreFilms() {
    setViewNumberFilm(viewNumberFilm + initNubmerViewFilms)
  }

  function handleToogleSavedMovies (movie) {
    return handleSavedMovies(movie);
  }

  return (
    <section className="movies">
      <ul className="movies__list">
        <Card
            viewNumberFilm={viewNumberFilm}
            handleToogleSavedMovies={handleToogleSavedMovies}
            savedMovies={isSavedFilms ? savedMovies : ""}
            isSavedFilms={isSavedFilms}
            moviesFilter={moviesFilter}
            />
          {viewNumberFilm < moviesFilter?.length ? <button onClick={handleClickMoreFilms} className="movies__button-more">Ещё</button> : ""}
      </ul>
    </section>
  );
}
