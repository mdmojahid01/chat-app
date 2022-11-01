import "./App.css";
import "./component/Component.css";
import "./pages/page.css";
import Registration from "./pages/registration";
import Login from "./pages/login";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <Registration />
      <Login />
      <Home />
    </div>
  );
}

export default App;
