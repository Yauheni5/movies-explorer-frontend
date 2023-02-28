import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Info from "../Info/Info";
import About from "../About/About";
import Skills from "../Skills/Skills";
import Resume from "../Resume/Resume";
import Movies from "../Movies/Movies";
import Seacher from "../Seacher/Seacher";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { mainApi } from "../../utils/MainApi";
import { SHORT_MOVIE_TIME } from "../../utils/constants/constants";
import { moviesApi } from "../../utils/MoviesApi";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [infoToolTipStatus, setInfoToolTipStatus] = useState({
    status: false,
    text: "",
  });
  const token = localStorage?.getItem("token");
  const [loggedIn, setLoggedIn] = useState(token ? true : false );
  const [currentUser, setCurrentUser] = useState({});
  const [isRegisteredUser, setIsRegisteredUser] = useState(false);

  const [dataMovies, setDataMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [isSavedFilms, setIsSavedFilms] = useState(false);
  const [isFilterMovie, setIsFilterMovie] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortMovie, setIsShortMovie] = useState(true);
  const [visibleMovieList, setVisibleMovieList] = useState([]);

  function setTooltipErrorInfo(errorResponse) {
    setIsInfoToolTipOpen(true);
    setInfoToolTipStatus({
      status: false,
      text:
        errorResponse.message ||
        errorResponse.error ||
        `Ошибка: ${errorResponse}`,
    });
  }

  useEffect(() => {
    if (loggedIn) {
      getAllDataMovies();
      getSavedMovies();
      mainApi
        .getAllPromise(token)
        .then(([userInfo]) => {
          setCurrentUser(userInfo.data);
        })
        .catch((error) => {
          error.json().then((error) => {
            setTooltipErrorInfo(error);
            console.log(error.message || error.status); // выведем ошибку в консоль
          });
        });
    }
  }, [loggedIn, token, isRegisteredUser]);

  async function registrationUser(data) {
    try {
      setIsLoading(true);
      await mainApi.registrationUser({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      setIsInfoToolTipOpen(true);
      setInfoToolTipStatus({
        status: true,
        text: "Вы успешно зарегистрировались!",
      });
      const tokenUser = await mainApi.authorizationUser({
        email: data.email,
        password: data.password,
      });
      setIsRegisteredUser(true);
      setLoggedIn(true);
      localStorage.setItem("token", tokenUser.token);
    } catch (error) {
      error.json().then((error) => {
        setTooltipErrorInfo(error);
        console.log(error.message || error.status); // выведем ошибку в консоль
      });
    } finally {
      setIsLoading(false);
    }
  }

  function togleRegisteredUser(isRegistered) {
    return isRegistered
      ? setIsRegisteredUser(true)
      : setIsRegisteredUser(false);
  }

  async function authorizationUser(data) {
    try {
      setIsLoading(true);
      const dataUser = await mainApi.authorizationUser({
        email: data.email,
        password: data.password,
      });
      setLoggedIn(true);
      setIsRegisteredUser(true);
      localStorage.setItem("token", dataUser.token);
    } catch (error) {
      error.json().then((error) => {
        setTooltipErrorInfo(error);
        console.log(error.message || error.status); // выведем ошибку в консоль
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleClickLoggedOut() {
    setIsRegisteredUser(false);
    setLoggedIn(false);
    setCurrentUser({});
    setIsFilterMovie(false);
    localStorage.clear();
  }

  async function handleEditDataProfile(dateUserEdit) {
    try {
      setIsLoading(true);
      const dataUserEdited = await mainApi.editUser(dateUserEdit, token);
      setCurrentUser(dataUserEdited.data);
      setIsInfoToolTipOpen(true);
      setInfoToolTipStatus({
        status: true,
        text: "Данные профиля успешно обновлены!",
      });
    } catch (error) {
      error.json().then((error) => {
        setTooltipErrorInfo(error);
        console.log(error.message || error.status); // выведем ошибку в консоль
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function getAllDataMovies() {
    try {
      setIsLoading(true);
      setDataMovies(await moviesApi.getMovies());
    } catch (error) {
      console.log(error); // выведем ошибку в консоль
    } finally {
      setIsLoading(false);
    }
  }

  async function getSavedMovies() {
    try {
      setIsLoading(true);
      const savedMoviesArr = await mainApi.getSavedMovies(token);
      const filterSavedMoviesUserOwner = savedMoviesArr.data.filter(movie => movie.owner._id === currentUser._id);
      setSavedMovies(await filterSavedMoviesUserOwner);
    } catch (error) {
      error.json().then((error) => {
        setTooltipErrorInfo(error);
        console.log(error.message || error.status); // выведем ошибку в консоль
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSaveMovie(dataMovie) {
    try {
      await mainApi.saveMovie(dataMovie, token);
      await getSavedMovies();
    } catch (error) {
      error.json().then((error) => {
        setTooltipErrorInfo(error);
        console.log(error.message || error.status); // выведем ошибку в консоль
      });
    }
  }

  async function handleDeleteSavedMovie(movieDeleted) {
    try {
      if (typeof movieDeleted === "object") {
        const removingMovies = savedMovies.filter(
          (movie) => movie.nameRU === movieDeleted.nameRU
        );
        removingMovies.map(async (item) => {
          await mainApi.deleteSavedMovie(item._id, token);
        });
      } else {
        await mainApi.deleteSavedMovie(movieDeleted, token);
      }
      await getSavedMovies();
    } catch (error) {
      error.json().then((error) => {
        setTooltipErrorInfo(error);
        console.log(error.message || error.status); // выведем ошибку в консоль
      });
    }
  }

  function handleTogleShortMovies() {
    setIsShortMovie(!isShortMovie);
  }

  function handleTogleFilterShortMovies() {
    localStorage.setItem(
      "dataSearcher",
      JSON.stringify({
        inputFilter: JSON.parse(localStorage?.getItem("dataSearcher"))
          ?.inputFilter,
        isShortMovie: isShortMovie,
      })
    );
  }

  function filterShortMovies(movies) {
    if (isShortMovie) {
      return movies;
    } else {
      return movies.filter((movie) => movie.duration > SHORT_MOVIE_TIME && movie);
    }
  }

  function filterMovies(inputFilter) {
    if (inputFilter) {
      if (isSavedFilms) {
        const resultFilter = savedMovies.filter(
          (movie) =>
            movie.nameRU.toLowerCase().includes(inputFilter.toLowerCase()) &&
            movie
        );
        setFilteredMovies(filterShortMovies(resultFilter));
      } else {
        const resultFilter = dataMovies.filter(
          (movie) =>
            movie.nameRU.toLowerCase().includes(inputFilter.toLowerCase()) &&
            movie
        );
        setFilteredMovies(filterShortMovies(resultFilter));
      }
    } else {
      if (isSavedFilms) {
        setFilteredMovies(filterShortMovies(savedMovies));
      } else {
        setFilteredMovies(filterShortMovies(dataMovies));
      }
    }
  }

  function checkIsFilterStorage() {
    if (
      JSON.parse(localStorage?.getItem("dataSearcher")).inputFilter !==
      undefined
    ) {
      setIsFilterMovie(true);
      filterMovies(
        JSON.parse(localStorage.getItem("dataSearcher")).inputFilter
      );
    } else if (
      JSON.parse(localStorage?.getItem("dataSearcher")).isShortMovie !==
      undefined
    ) {
      setIsFilterMovie(true);
      filterMovies("");
    } else {
      setIsFilterMovie(false);
      filterMovies("");
    }
  }

  function checkLocation() {
    if (location.pathname === "/saved-movies") {
      setIsSavedFilms(true);
    } else if (location.pathname === "/movies") {
      setIsSavedFilms(false);
    }
    setVisibleMoviesListFunc();
  }

  function setVisibleMoviesListFunc() {
    isFilterMovie
      ? setVisibleMovieList(filterShortMovies(filteredMovies))
      : isSavedFilms
      ? setVisibleMovieList(savedMovies)
      : setVisibleMovieList(dataMovies);
  }

  useEffect(() => {
    handleTogleFilterShortMovies();
    setVisibleMovieList();
    checkIsFilterStorage();
  }, [isShortMovie, isSavedFilms, savedMovies]);

  useEffect(() => {
    checkLocation();
  }, [location, isSavedFilms, savedMovies, filteredMovies]);

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        setIsInfoToolTipOpen(false);
      }
    }
    const handleClickClosePopup = (event) => {
      if (
        event.target.classList.contains("pop-up_active") ||
        event.target.classList.contains("pop-up__close-icon")
      ) {
        setIsInfoToolTipOpen(false);
      }
    };
    if (isInfoToolTipOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      document.addEventListener("mousedown", handleClickClosePopup); // добавляем
      return () => {
        document.removeEventListener("keydown", closeByEscape);
        document.removeEventListener("mousedown", handleClickClosePopup); // удаляем
      };
    }
  }, [isInfoToolTipOpen]);

  useEffect(() => {
    if (token) {
      mainApi
        .checkUserToken(token)
        .then((res) => {
          setIsRegisteredUser(true);
          setLoggedIn(true);
          setCurrentUser(res.data);
        })
        .catch((error) => {
          error.json().then((error) => {
            setTooltipErrorInfo(error);
            console.log(error.message || error.status); // выведем ошибку в консоль
          });
        });
    }
  }, [loggedIn, token]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route path="/signup">
            {loggedIn && isRegisteredUser ? (
              <Redirect to="/movies" />
            ) : isRegisteredUser ? (
              <Redirect to="/signin" />
            ) : (
              <Redirect to="/" />
            )}
            <Register
              registrationUser={registrationUser}
              togleRegisteredUser={togleRegisteredUser}
              isLoading={isLoading}
            />
          </Route>
          <Route path="/signin">
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
            {isRegisteredUser ? (
              <Redirect to="/signin" />
            ) : (
              <Redirect to="/signup" />
            )}
            <Login
              authorizationUser={authorizationUser}
              togleRegisteredUser={togleRegisteredUser}
              isLoading={isLoading}
            />
          </Route>
          <Route path="/movies">
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
            <Header
              isLogged={loggedIn}
              togleRegisteredUser={togleRegisteredUser}
              currentUser={currentUser}
            />
            <Main
              isLogged={loggedIn}
              children={[
                <Seacher
                  isShortMovie={isShortMovie}
                  handleTogleShortMovies={handleTogleShortMovies}
                  filterMovies={filterMovies}
                />,
                <Movies
                  currentUser={currentUser}
                  isLoading={isLoading}
                  isSavedFilms={isSavedFilms}
                  visibleMovieList={visibleMovieList}
                  handleSaveMovie={handleSaveMovie}
                  handleDeleteSavedMovie={handleDeleteSavedMovie}
                  savedMovies={savedMovies}
                />,
              ]}
            />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            {loggedIn ? <Redirect to="/saved-movies" /> : <Redirect to="/" />}
            <Header
              isLogged={loggedIn}
              togleRegisteredUser={togleRegisteredUser}
              currentUser={currentUser}
            />
            <Main
              isLogged={loggedIn}
              children={[
                <Seacher
                  isShortMovie={isShortMovie}
                  handleTogleShortMovies={handleTogleShortMovies}
                  filterMovies={filterMovies}
                />,
                <Movies
                  isLoading={isLoading}
                  isSavedFilms={isSavedFilms}
                  visibleMovieList={visibleMovieList}
                  handleSaveMovie={handleSaveMovie}
                  handleDeleteSavedMovie={handleDeleteSavedMovie}
                />,
              ]}
            />
            <Footer />
          </Route>
          <Route path="/profile">
            {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/" />}
            <Header
              isLogged={loggedIn}
              togleRegisteredUser={togleRegisteredUser}
              currentUser={currentUser}
            />
            <Main
              isLogged={loggedIn}
              isLoading={isLoading}
              children={[
                <Profile
                  userData={currentUser}
                  editDataUser={handleEditDataProfile}
                  handleClickLoggedOut={handleClickLoggedOut}
                  isLoading={isLoading}
                />,
              ]}
            />
          </Route>
          <Route exact path="/">
            <Header
              isLogged={loggedIn}
              togleRegisteredUser={togleRegisteredUser}
              currentUser={currentUser}
            />
            <Main
              children={[
                <Info />,
                <About />,
                <Skills />,
                <Resume />,
                <Footer />,
              ]}
            />
          </Route>
          <Route exact path="*">
            <NotFoundPage />
          </Route>
        </Switch>
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          infoToolTipStatus={infoToolTipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
