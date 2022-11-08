import "./App.css";
import "./component/Component.css";
import "./pages/page.css";
import "react-toastify/dist/ReactToastify.css";
import Registration from "./pages/registration";
import Login from "./pages/login";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtechtedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  // ===================== JSX =======================
  return (
    <div className="App">
      <BrowserRouter>
        <Routes path="/">
          <Route path="register" element={<Registration />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route
            index
            element={
              <ProtechtedRoute>
                <Home />
              </ProtechtedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
