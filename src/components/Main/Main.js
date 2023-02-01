import Info from "../Info/Info";
import About from "../About/About";
import Skills from "../Skills/Skills";
import Resume from "../Resume/Resume";
import Seacher from "../Seacher/Seacher";

export default function Main({ isLogged }) {
  return (
    isLogged ?
    <main className="main">
      <Info />
      <About />
      <Skills />
      <Resume />
    </main> :
    <main className="main">
      <Seacher />
    </main>
  )
}
