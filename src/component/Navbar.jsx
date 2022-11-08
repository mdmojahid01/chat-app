import React, { useContext } from "react";
import Avatar from "../images/defaultavatar.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  // ================== JSX ======================
  return (
    <div className="navbar-custom">
      <div className="logo">Simple Chat</div>
      <div className="right">
        <div className="avatar-icon">
          <img
            src={currentUser.photoURL ? currentUser.photoURL : Avatar}
            alt="avatar"
          />
        </div>
        <div className="name">{currentUser.displayName}</div>
        <button
          onClick={() => {
            signOut(auth);
          }}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
