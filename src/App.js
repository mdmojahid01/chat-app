import "./App.css";
import "./component/Component.css";
import "./pages/page.css";
import Registration from "./pages/registration";
import Login from "./pages/login";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes path="/">
          <Route path="register" element={<Registration />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route index element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
