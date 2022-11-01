import React from "react";
import Avatar from "../images/defaultavatar.png";

function Navbar() {
  return (
    <div className="navbar-custom">
      <div className="logo">Simple Chat</div>
      <div className="right">
        <div className="avatar-icon">
          <img src={Avatar} alt="avatar" />
        </div>
        <div className="name">Jone Doe</div>
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
