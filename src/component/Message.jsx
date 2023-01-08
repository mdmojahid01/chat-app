import React, { useRef, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import Avatar from "../images/defaultavatar.png";

function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const refs = useRef();
  useEffect(() => {
    refs.current.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // ==================== JSX =================
  return (
    // owner-message
    <div
      ref={refs}
      className={`mesaage-container ${
        currentUser.uid === message.senderId ? "owner-message" : ""
      }`}
    >
      <div className="message">
        <div className="message-avatar">
          <img
            src={
              currentUser.uid === message.senderId
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt="_img"
          />
        </div>
        <div className="message-card">
          <span>
            {new Date(message.date.seconds * 1000).toLocaleTimeString("en-US")}
          </span>
          <p>{message.text}</p>
          <div>{message.img && <img src={message.img} alt="" />} </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
