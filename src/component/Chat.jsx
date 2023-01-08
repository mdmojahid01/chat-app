import React from "react";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

function Chat() {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat-div">
      <div className={`${data.chatId ? "chat-nav" : ""}`}>
        {data.user.displayName ? (
          <>
            <div
              className="avatar-icon"
              style={{ background: "transparent", marginRight: "10px" }}
            >
              <img src={data.user.photoURL} alt="" />
            </div>
            <p className="user-name"> {data.user.displayName}</p>
          </>
        ) : (
          ""
        )}
      </div>
      {data.chatId ? (
        <>
          <Messages />
          <Input />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Chat;
