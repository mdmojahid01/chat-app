import React from "react";
import Messages from "./Messages";
import Input from "./Input";

function Chat() {
  return (
    <div className="chat-div">
      <div className="chat-nav">
        <p className="user-name">Jone Doe</p>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
