import React, { useState, useEffect, useContext } from "react";
import Avatar from "../images/defaultavatar.png";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

// =========== This component contains UserList related to chats ==============
function Chats() {
  const [chats, setChats] = useState({});
  const { currentUser } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  // ============ JSX ==================
  return (
    <div className="Chats-div">
      {Object.entries(chats)
        .sort((a, b) => b[1].date - a[1].date)
        .map((e) => {
          return (
            <div
              className={`searched-user ${
                data.user.uid === e[1].userInfo.uid ? "selected-user" : ""
              }`}
              key={e[0]}
              onClick={() => handleSelect(e[1].userInfo)}
            >
              <div className="avatar">
                <img
                  src={e[1].userInfo.photoURL ? e[1].userInfo.photoURL : Avatar}
                  alt="profile"
                />
              </div>
              <div className="userInfo">
                <p>{e[1].userInfo.displayName}</p>
                <span>
                  {e[1].lastmessage !== undefined ? e[1].lastmessage.text : ""}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Chats;
