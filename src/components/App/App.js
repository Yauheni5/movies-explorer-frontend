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

function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  function handleClickLogged () {
    setLoggedIn(!loggedIn);
  }
  return (
    <div className="app">
    <Header isLogged={loggedIn} handleClickLogged={handleClickLogged}/>
      <Switch>
        <Route path="/signup">

        </Route>
        <Route path="/signin">
          {loggedIn ? <Redirect to="movies" /> : ""}
        </Route>
        <Route path="/movies">
          <Main isLogged={loggedIn} children={[<Seacher />,<Movies />]}
          />
        </Route>
        <Route path="/saved-movies">
          {
            loggedIn ?
            (<Redirect to="/saved-movies"/>) :
            (<Redirect to="/"/>)
          }

          <Main isLogged={loggedIn} children={[<Seacher />,<Movies isSavedFilms={true}/>]} />
        </Route>
        <Route path="/profile">
          {loggedIn ?
            <Main isLogged={loggedIn} /> :
            <Redirect to="/"/>
          }
        </Route>
        <Route path="/">
          <Main children={[
            <Info />,
            <About />,
            <Skills />,
            <Resume />]
            }
          />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
