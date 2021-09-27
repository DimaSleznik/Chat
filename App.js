import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./Components";
import { Router } from "./routing/Router";
import { Context } from ".";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MainLoader } from "./Components";
function App() {
  const { auth } = useContext(Context);
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <MainLoader></MainLoader>;
  }
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <div className="App">
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
