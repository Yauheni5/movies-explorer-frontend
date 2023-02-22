import { useState } from "react";
import Card from "../Card/Card";

export default function Movies({
  isSavedFilms,
  savedMovies,
  visibleMovieList,
  handleSaveMovie,
  handleDeleteSavedMovie,
}) {
  const initNubmerViewFilms = 7;
  const [viewNumberFilm, setViewNumberFilm] = useState(initNubmerViewFilms);

  function handleClickMoreFilms() {
    setViewNumberFilm(viewNumberFilm + initNubmerViewFilms);
  }

  function handleTogleSavedMovies(movie) {
    return handleSaveMovie(movie);
  }

  return (
    <section className="movies">
      <ul className="movies__list">
        <Card
          viewNumberFilm={viewNumberFilm}
          handleTogleSavedMovies={handleTogleSavedMovies}
          isSavedFilms={isSavedFilms}
          savedMovies={savedMovies}
          visibleMovieList={visibleMovieList}
          deleteSavedMovie={handleDeleteSavedMovie}
        />
        {viewNumberFilm < visibleMovieList?.length ? (
          <button
            onClick={handleClickMoreFilms}
            className="movies__button-more">
            Ещё
          </button>
        ) : (
          ""
        )}
      </ul>
    </section>
  );
}
