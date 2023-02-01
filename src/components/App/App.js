import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <div className="app">
      <Header />
      <Main isLogged={loggedIn} />
      <Footer />
    </div>
  );
}

export default App;
