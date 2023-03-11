import { useState } from "react";
import { INIT_NUMBER_VIEW_MOVIES } from "../../utils/constants/constants";
import Card from "../Card/Card";

export default function Movies({
  currentUser,
  isSavedFilms,
  savedMovies,
  visibleMovieList,
  handleSaveMovie,
  handleDeleteSavedMovie,
  isLoading
}) {

  const [viewNumberFilm, setViewNumberFilm] = useState(INIT_NUMBER_VIEW_MOVIES);

  function handleClickMoreFilms() {
    setViewNumberFilm(viewNumberFilm + INIT_NUMBER_VIEW_MOVIES);
  }

  function handleTogleSavedMovies(movie) {
    return handleSaveMovie(movie);
  }

  return (
    <section className="movies">
      <ul className="movies__list">
        <Card
          currentUser={currentUser}
          viewNumberFilm={viewNumberFilm}
          handleTogleSavedMovies={handleTogleSavedMovies}
          isSavedFilms={isSavedFilms}
          savedMovies={savedMovies}
          visibleMovieList={visibleMovieList}
          deleteSavedMovie={handleDeleteSavedMovie}
          isLoading={isLoading}
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
