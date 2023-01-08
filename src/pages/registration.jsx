import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FcAddImage } from "react-icons/fc";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

function Registration() {
  const navigate = useNavigate();
  const [imgPreview, setImagePreview] = useState("");

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  const nameRegex = /^[A-Za-z. ]{3,30}$/;
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
  // =================================================================
  const previewHandle = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleValidation = (e) => {
    e.preventDefault();
    let displayName = e.target[0].value;
    let email = e.target[1].value;
    let password = e.target[2].value;
    let file = e.target[3].files[0];
    if (displayName.length === 0) {
      toast.error("Please enter your Name.", defaultToastParameter);
    } else if (!nameRegex.test(displayName)) {
      toast.error("Please enter correct name", defaultToastParameter);
    } else if (email.length === 0) {
      toast.error("Please enter email.", defaultToastParameter);
    } else if (!emailRegex.test(email)) {
      toast.error("Please enter correct email.", defaultToastParameter);
    } else if (password.length === 0) {
      toast.error("Please enter password.", defaultToastParameter);
    } else if (password.length < 8 || password.length > 15) {
      toast.error(
        "Password must be 8 to 15 characters.",
        defaultToastParameter
      );
    } else if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain: A-Z, a-z, 0-9, and Symbol....",
        defaultToastParameter
      );
    } else if (!file) {
      toast.error("Please select profile pic.", defaultToastParameter);
    }
    // After Validation goto submission --
    else {
      handleSubmit(displayName, email, password, file);
    }
  };
  // =========================== Handle Submit ====================================
  const handleSubmit = async (displayName, email, password, file) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // ---------------------------------
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              // console.log("Upload is paused");
              break;
            case "running":
              // console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          toast.error(error.message, defaultToastParameter);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL
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

            //  after registration navigate to home page.
            navigate("/");
          });
        }
      );
      toast.promise(uploadTask, {
        pending: "Image uploading...",
        success: "SignUp completed",
        error: "SignUp failed.",
      });
    } catch (error) {
      toast.error(error.message, defaultToastParameter);
    }
  };

  // ================================== JSX =======================
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
        <p>Registration</p>
        <form onSubmit={handleValidation} autoComplete="off">
          <FloatingLabel
            controlId="floatingInput"
            label="Enter your name"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Enter your name" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput2"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="name@example.com" />
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
            Add a profile pic
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
