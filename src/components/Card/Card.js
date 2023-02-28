export default function Card({
  currentUser,
  viewNumberFilm,
  handleTogleSavedMovies,
  isSavedFilms,
  savedMovies,
  visibleMovieList,
  deleteSavedMovie,
}) {
  function handleClickLike(e, item) {
    if (e.target.className === "card__button-like card__button-like_active") {
      e.target.className = "card__button-like";
      handleDeleteMovie(item);
    } else {
      e.target.className = "card__button-like card__button-like_active";
      handleTogleSavedMovies(item);
    }
  }

  function handleDeleteMovie(e, item) {
    deleteSavedMovie(item?._id || item || e);
  }

  function handleTimeDuration(duration) {
    if (duration > 60) {
      let hours, minutes;
      hours = Math.trunc(duration / 60);
      minutes = duration - hours * 60;
      return `${hours}ч ${minutes}м`;
    }
    return `${duration}м`;
  }

  function checkSavedMovie(item) {
    if (savedMovies) {
      return savedMovies.some((movie) => {
        return (movie.nameRU === item.nameRU) ;
      });
    }
    return false;
  }

  const movies = visibleMovieList?.map((item, index) => {
    if (index < viewNumberFilm) {
      return (
        <li className="card" key={item?.id || item?._id}>
          <h2 className="card__title">{item.nameRU}</h2>
          <p className="card__subtitle">{handleTimeDuration(item.duration)}</p>

          <button
            type="button"
            className={
              isSavedFilms
                ? "card__button-delete"
                : checkSavedMovie(item)
                ? "card__button-like card__button-like_active"
                : "card__button-like"
            }
            onClick={
              isSavedFilms
                ? (e) => handleDeleteMovie(e, item)
                : (e) => handleClickLike(e, item)
            }
          />
          <a
            href={item.trailerLink}
            target="_blank"
            rel="noreferrer"
            className="card__link card__image">
            <img
              className="card__image"
              src={
                isSavedFilms
                  ? item.image.url
                    ? "https://api.nomoreparties.co/" + item.image.url
                    : item.image
                  : item.image.url
                  ? "https://api.nomoreparties.co/" + item.image.url
                  : item.image
              }
              alt={"миниатюрное изображение постера к фильму" + item.nameRU}
            />
          </a>
        </li>
      );
    }
  });

  return movies;
}
