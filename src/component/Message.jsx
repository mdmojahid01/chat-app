import React from "react";
import Avatar from "../images/defaultavatar.png";

function Message() {
  return (
    // owner-message
    <div className="mesaage-container owner-message">
      <div className="message">
        <div className="message-avatar">
          <img src={Avatar} alt="_img" />
        </div>
        <div className="message-card">
          <span>05:30 AM</span>
          <p>Good Morning to you jdhsdjhgdfjhfdjgdfhgjfdGood Morning to</p>
          {/* <div><img src={Avatar} alt="" /></div> */}
        </div>
      </div>
    </div>
  );
}

export default Message;
