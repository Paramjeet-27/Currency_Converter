// require("dotenv").config();
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import CurrentUserProvider from "./contexts/CurrentUserContext";

function App() {
  return (
    <>
      <CurrentUserProvider>
        <HomePage />
      </CurrentUserProvider>
    </>
  );
}

export default App;
