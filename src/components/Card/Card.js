import { moviesData } from "../../utils/constants/constants";

export default function Card({handleToogleSavedMovies, viewNumberFilm, savedMovies, isSavedFilms, moviesFilter}) {

  function handleClickLike(e, item) {
    if (e.target.className === "card__button-like card__button-like_active") {
      e.target.className = "card__button-like"
      handleToogleSavedMovies(item);
    } else {
      e.target.className = "card__button-like card__button-like_active";
      handleToogleSavedMovies(item);
      console.log(item)
    }
  }

  function handleDeleteMovie(e, item) {
    console.log("удалить сохранённую карточку")
  }

function handleTimeDuration(duration) {
  if (duration > 60) {
    let hours, minutes;
    hours = Math.trunc(duration / 60);
    minutes = duration - (hours * 60);
    return `${hours}ч ${minutes}м`
  }
  return `${duration}м`
}

const movies = moviesFilter.map((item, index) => {
    if (index < viewNumberFilm) {
      return (
        <li className="card" key={item.id}>
          <h2 className="card__title">{item.nameRU}</h2>
          <p className="card__subtitle">
            {handleTimeDuration(item.duration)}
          </p>
          <button className="card__button-like" onClick={(e)=>handleClickLike(e, item)}></button>
          <img
            className="card__image"
            src={"https://api.nomoreparties.co" + item.image.url}
            alt={"миниатюрное изображение постера к фильму" + item.nameEN}
          />
        </li>
      );
    }
  });

  function savedMoviesRender () {
    /* заменить на массив сохранённых фильмов */
    return moviesFilter.map((item, index) => {
      if (index < viewNumberFilm) {
        return (
          <div className="card" key={item?.id}>
            <h2 className="card__title">{item.nameRU}</h2>
            <p className="card__subtitle">
              {item.duration + "ч" + item.duration + "м"}
            </p>
            <button className="card__button-delete" onClick={(e)=>handleDeleteMovie(e, item)}></button>
            <img
              className="card__image"
              src={"https://api.nomoreparties.co" + item.image.url}
              alt={"миниатюрное изображение постера к фильму" + item.nameEN}
            />
          </div>
        );
      }
    });
  }
  return (
  <>
    {isSavedFilms ? savedMoviesRender() : movies}
  </>
  )
}
