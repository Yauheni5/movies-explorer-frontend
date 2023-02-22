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
import { shortMovieTime } from "../../utils/constants/constants";
import { moviesApi } from "../../utils/MoviesApi";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const token = localStorage?.getItem("token");
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isRegisteredUser, setIsRegisteredUser] = useState(false);

  const [dataMovies, setDataMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [isSavedFilms, setIsSavedFilms] = useState(false);
  const [isFilterMovie, setIsFilterMovie] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortMovie, setIsShortMovie] = useState(true);
  const [visibleMovieList, setVisibleMovieList] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      getAllDataMovies();
      getSavedMovies();
      mainApi
        .getAllPromise(token)
        .then(([userInfo]) => {
          setCurrentUser(userInfo.data);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
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
      const tokenUser = await mainApi.authorizationUser({
        email: data.email,
        password: data.password,
      });
      setIsRegisteredUser(true);
      setLoggedIn(true);
      localStorage.setItem("token", tokenUser.token);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function togleRegisteredUser(isRegistered) {
    return isRegistered ? setIsRegisteredUser(true) : setIsRegisteredUser(false)
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
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClickLoggedOut() {
    setIsRegisteredUser(false);
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("token");
  }

  async function handleEditDataProfile(dateUserEdit) {
    try {
      setIsLoading(true);
      const dataUserEdited = await mainApi.editUser(dateUserEdit, token);
      setCurrentUser(dataUserEdited.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getAllDataMovies() {
    try {
      setDataMovies(await moviesApi.getMovies());
    } catch (error) {
      console.log(error); // выведем ошибку в консоль
    }
  }

  async function getSavedMovies() {
    try {
      const savedMoviesArr = await mainApi.getSavedMovies(token);
      setSavedMovies(savedMoviesArr.data);
    } catch (error) {
      console.log(error); // выведем ошибку в консоль
    }
  }

  async function handleSaveMovie(dataMovie) {
    try {
      await mainApi.saveMovie(dataMovie, token);
      await getSavedMovies();
    } catch (error) {
      console.log(error); // выведем ошибку в консоль
    }
  }

  async function handleDeleteSavedMovie(movieDeleted) {
    if (typeof movieDeleted === 'object') {
      try {
        const removingMovies = await savedMovies.filter((movie)=> movie.nameRU === movieDeleted.nameRU);
        removingMovies.some(async item => {
          return await mainApi.deleteSavedMovie(item._id, token)
        });
        return getSavedMovies();
      } catch (error) {
        return console.log(error); // выведем ошибку в консоль
      }
    } else {
      try {
        await mainApi.deleteSavedMovie(movieDeleted, token);
        await getSavedMovies();
      } catch (error) {
        console.log(error); // выведем ошибку в консоль
      }
    }
  }

  function handleTogleShortMovies() {
    setIsShortMovie(!isShortMovie);
    setVisibleMovieList(filterShortMovies(visibleMovieList))
  }

  function filterShortMovies(movies) {
    if (isShortMovie) {
      return movies;
    } else {
      return movies.filter((movie) => movie.duration > shortMovieTime && movie);
    }
  }

  function filterMovies(inputFilter) {
    setIsFilterMovie(true);
    if (isSavedFilms) {
      const resultFilter = savedMovies.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(inputFilter.toLowerCase()) &&
          movie
      );
      setFilteredMovies(filterShortMovies(resultFilter));
      setVisibleMovieList(filteredMovies);
    } else {
      const resultFilter = dataMovies.filter(
        (movie) => movie.nameRU.toLowerCase().includes(inputFilter.toLowerCase()) && movie
      );
      setFilteredMovies(filterShortMovies(resultFilter));
      setVisibleMovieList(filteredMovies);
    }
  }

  function handleRemoveFilter(){
    setFilteredMovies([]);
    setIsFilterMovie(false);
  }

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setIsSavedFilms(true);
      setVisibleMovieList(savedMovies);
    } else if (location.pathname !== "/saved-movies") {
      setIsSavedFilms(false);
      setFilteredMovies([]);
    }
    handleRemoveFilter()
  }, [location, savedMovies]);

  useEffect(()=>{
    isFilterMovie ?
    setVisibleMovieList(filterShortMovies(filteredMovies)) :
    (isSavedFilms ?
      setVisibleMovieList(filterShortMovies(savedMovies)) :
      setVisibleMovieList(dataMovies)
    )
  }, [filteredMovies, isFilterMovie, isSavedFilms, savedMovies, isShortMovie])

  useEffect(() => {
    if (token) {
      mainApi
        .checkUserToken(token)
        .then((res) => {
          setIsRegisteredUser(true);
          setLoggedIn(true);
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }, [loggedIn, token]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route path="/signup">
            {loggedIn && isRegisteredUser ? (
              <Redirect to="/" />
            ) : isRegisteredUser ? (
              <Redirect to="/signin" />
            ) : (
              <Redirect to="/signup" />
            )}
            <Register
              registrationUser={registrationUser}
              togleRegisteredUser={togleRegisteredUser}
              isLoading={isLoading}
            />
          </Route>
          <Route path="/signin">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
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
            <Header isLogged={loggedIn} togleRegisteredUser={togleRegisteredUser} currentUser={currentUser} />
            <Main
              isLogged={loggedIn}
              children={[
                <Seacher
                  isShortMovie={isShortMovie}
                  handleTogleShortMovies={handleTogleShortMovies}
                  filterMovies={filterMovies}
                />,
                <Movies
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
            <Header isLogged={loggedIn} togleRegisteredUser={togleRegisteredUser} currentUser={currentUser} />
            <Main
              isLogged={loggedIn}
              isLoading={isLoading}
              children={[
                <Seacher
                  isShortMovie={isShortMovie}
                  handleTogleShortMovies={handleTogleShortMovies}
                  filterMovies={filterMovies}
                />,
                <Movies
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
            {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/signup" />}
            <Header isLogged={loggedIn} togleRegisteredUser={togleRegisteredUser} currentUser={currentUser} />
            <Main
              isLogged={loggedIn}
              isLoading={isLoading}
              children={[
                <Profile
                  userData={currentUser}
                  editDataUser={handleEditDataProfile}
                  handleClickLogged={handleClickLoggedOut}
                  isLoading={isLoading}
                />,
              ]}
            />
          </Route>
          <Route exact path="/">
            <Header isLogged={loggedIn} togleRegisteredUser={togleRegisteredUser} currentUser={currentUser} />
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
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
