import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);
  // console.log(messages);
  // ===================== Component JSX =====================
  return (
    <div className="messages-div">
      {messages.map((m, i) => {
        return <Message message={m} key={m.id} />;
      })}
    </div>
  );
}

export default Messages;
