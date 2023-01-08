import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const defaultToastParameter = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  // ===========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;
    if (email.length === 0 && password.length === 0) {
      toast.error("Please enter email & password", defaultToastParameter);
    } else if (email.length === 0) {
      toast.error("Please enter email", defaultToastParameter);
    } else if (password.length === 0) {
      toast.error("Please enter password", defaultToastParameter);
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage, defaultToastParameter);
      }
    }
  };
  // =================== JSX ======================
  return (
    <div className="registration flex-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex-center inner-registration ">
        <h1>Simple Chat</h1>
        <p>Login</p>
        <form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput1"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword1" label="Password">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <br />
          <Button type="submit" variant="primary w-100">
            Login
          </Button>
        </form>
        <br />
        <p>
          You don't have an account? <NavLink to="/register">Register</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
