import React from "react";
// import "./page.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FcAddImage } from "react-icons/fc";

function Registration() {
  const handleSubmit = (e) => {
    e.preventDefalt();
  };
  // ================================== JSX =======================
  return (
    <div className="registration flex-center">
      <div className="flex-center inner-registration ">
        <h1>Simple Chat</h1>
        <p>Registration</p>
        <form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Display name"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Type your name" />
          </FloatingLabel>
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
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            required
          />
          <label htmlFor="avatar" className="avatar-label">
            <FcAddImage style={{ fontSize: "32px" }} />
            Add a avtar
          </label>
          <br />
          <Button type="submit" variant="primary w-100">
            Sign Up
          </Button>
        </form>
        <br />
        <p>You do have an account? Login</p>
      </div>
    </div>
  );
}

export default Registration;
