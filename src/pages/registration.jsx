import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FcAddImage } from "react-icons/fc";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

function Registration() {
  const [imgPreview, setImagePreview] = useState("");
  // =========================== Handle Submit ====================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    let displayName = e.target[0].value;
    let email = e.target[1].value;
    let password = e.target[2].value;
    let file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      // ---------------------------------
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          console.error("Line:29----", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            // Add a new document in collection "users"
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // Add a new document in collection "usersChatList"
            await setDoc(doc(db, "userChats", res.user.uid), {});
          });
        }
      );
    } catch (error) {
      console.error("Line:49----", error);
    }
  };
  // =================================================================
  const previewHandle = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  // ================================== JSX =======================
  return (
    <div className="registration flex-center">
      <div className="flex-center inner-registration ">
        <h1>Simple Chat</h1>
        <p>Registration</p>
        <form onSubmit={handleSubmit} autoComplete="off">
          <FloatingLabel
            controlId="floatingInput"
            label="Display name"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Type your name" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput2"
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
            name="profile"
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
            onChange={previewHandle}
          />
          <label htmlFor="avatar" className="avatar-label">
            <div className="preview-image">
              {imgPreview.length !== 0 ? (
                <img src={imgPreview} alt="avatar" />
              ) : (
                <FcAddImage style={{ fontSize: "32px" }} />
              )}
            </div>
            Add a avtar
          </label>
          <br />
          <Button type="submit" variant="primary w-100">
            Register
          </Button>
        </form>
        <br />
        <p>
          You do have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Registration;
