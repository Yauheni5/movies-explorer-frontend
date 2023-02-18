import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
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
import { moviesApi } from "../../utils/MoviesApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { mainApi } from "../../utils/MainApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [moviesFilter, setMoviesFilter] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isRegisteredUser, setIsRegisteredUser] = useState(false);
  const [userData, setUserData] = useState({});
  const token = localStorage?.getItem("token");

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getAllPromise(token)
        .then(([userInfo]) => {
          setCurrentUser(userInfo.data);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }, [loggedIn, token]);

  function registrationUser(data) {
    mainApi
      .registrationUser({
        email: data.email,
        password: data.password,
        name: data.name,
      })
      .then((res) => {
        setIsRegisteredUser(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function authorizationUser(data) {
    mainApi
      .authorizationUser({
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        setLoggedIn(true);
        console.log(res)
        localStorage.setItem("token", res.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleClickLogged() {
    setIsRegisteredUser(false);
    setLoggedIn(false);
    setUserData({});
    localStorage.removeItem("token");
  }

  function handleChangeRegisteredUser () {
    setIsRegisteredUser(true);
  }

  function handleEditDataProfile(dateUserEdit){
    mainApi
    .editUser(dateUserEdit, token)
    .then((dataUser) => {
      setCurrentUser(dataUser.data)
      setUserData(dataUser.data)
      console.log(dataUser)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  async function handleSavedMovies(dataMovie) {
    try {
      await mainApi.saveMovie(dataMovie, token);
    }
    catch (error) {
      console.log(error); // выведем ошибку в консоль
    }
  }

  async function getMovies(inputFilter) {
    try {
      const movies = await moviesApi.getMovies();
      setMoviesFilter(
        movies.filter((movie) => movie.nameRU.toLowerCase().includes(inputFilter.toLowerCase()) && movie)
      );
      console.log(moviesFilter);
      /* console.log(movies) */
    } catch (error) {
      console.log(error); // выведем ошибку в консоль
    }
  }

  useEffect(() => {
    if (token) {
      mainApi
        .checkUserToken(token)
        .then((res) => {
          setIsRegisteredUser(true);
          setLoggedIn(true);
          setUserData(res.data);
          setCurrentUser(res.data);
          console.log(res)
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
            <Register registrationUser={registrationUser} handleChangeRegisteredUser={handleChangeRegisteredUser} />
          </Route>
          <Route path="/signin">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            {isRegisteredUser ? (
              <Redirect to="/signin" />
            ) : (
              <Redirect to="/signup" />
            )}
            <Login authorizationUser={authorizationUser} />
          </Route>
          <Route path="/movies">
            <Header isLogged={loggedIn} handleClickLogged={handleClickLogged} currentUser={currentUser}/>
            <Main
              isLogged={loggedIn}
              children={[
                <Seacher getMovies={getMovies} />,
                <Movies moviesFilter={moviesFilter} handleSavedMovies={handleSavedMovies} />,
              ]}
            />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            {loggedIn ? <Redirect to="/saved-movies" /> : <Redirect to="/" />}
            <Header isLogged={loggedIn} handleClickLogged={handleClickLogged} currentUser={currentUser} />
            <Main
              isLogged={loggedIn}
              children={[
                <Seacher />,
                <Movies isSavedFilms={true} moviesFilter={moviesFilter} />,
              ]}
            />
            <Footer />
          </Route>
          <Route path="/profile">
            {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/signup" />}
            <Header isLogged={loggedIn} handleClickLogged={handleClickLogged} currentUser={currentUser}/>
            <Main
              isLogged={loggedIn}
              children={[
                <Profile
                  userData = {userData}
                  editDataUser = {handleEditDataProfile}
                  handleClickLogged={handleClickLogged}
                />,
              ]}
            />
          </Route>
          <Route exact path="/">
            <Header isLogged={loggedIn} handleClickLogged={handleClickLogged} currentUser={currentUser}/>
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
