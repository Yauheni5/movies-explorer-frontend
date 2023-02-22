import Preloader from "../Preloader/Preloader";

export default function Main({isLoading, children}) {
  return isLoading ? (
    <Preloader />
  ) :(
      <main className="main">
        {children}
      </main>
  )
}
