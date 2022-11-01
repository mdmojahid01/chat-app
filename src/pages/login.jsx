import React from "react";
// import "./page.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login() {
  const handleSubmit = (e) => {
    e.preventDefalt();
  };
  // =================== JSX ======================
  return (
    <div className="registration flex-center">
      <div className="flex-center inner-registration ">
        <h1>Simple Chat</h1>
        <p>Login</p>
        <form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <br />
          <Button type="submit" variant="primary w-100">
            Sign Up
          </Button>
        </form>
        <br />
        <p>You don't have an account? Register</p>
      </div>
    </div>
  );
}

export default Login;
