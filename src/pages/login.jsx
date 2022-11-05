import React from "react";
import { NavLink } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // =================== JSX ======================
  return (
    <div className="registration flex-center">
      <div className="flex-center inner-registration ">
        <h1>Simple Chat</h1>
        <p>Login</p>
        <form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput1"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword1" label="Password">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <br />
          <Button type="submit" variant="primary w-100">
            Sign Up
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
