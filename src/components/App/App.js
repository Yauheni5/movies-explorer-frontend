import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Info from "../Info/Info";
import About from "../About/About";
import Skills from "../Skills/Skills";
import Resume from "../Resume/Resume";
import Movies from "../Movies/Movies";
import Seacher from "../Seacher/Seacher";
import Profile from "../Profile/Profile";
import { userData } from "../../utils/constants/constants";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  function handleClickLogged () {
    setLoggedIn(!loggedIn);
  }
  return (
    <div className="app">
      <Switch>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>

        <Route path="/movies">

            <Header isLogged={loggedIn} handleClickLogged={handleClickLogged}/>
            <Main isLogged={loggedIn} children={[<Seacher />,<Movies />]}/>
            <Footer />

        </Route>
        <Route path="/saved-movies">
          {
            loggedIn ?
            (<Redirect to="/saved-movies"/>) :
            (<Redirect to="/"/>)
          }
          <Header isLogged={loggedIn} handleClickLogged={handleClickLogged}/>
          <Main isLogged={loggedIn} children={[<Seacher />,<Movies isSavedFilms={true}/>]} />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header isLogged={loggedIn} handleClickLogged={handleClickLogged}/>
          <Main isLogged={loggedIn} children={[<Profile userData={userData} handleClickLogged={handleClickLogged}/>]}/>
        </Route>
        <Route exact path="/">
          <Header isLogged={loggedIn} handleClickLogged={handleClickLogged}/>
          <Main children={[
            <Info />,
            <About />,
            <Skills />,
            <Resume />,
            <Footer />]
            }
          />
        </Route>
        <Route exact path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
