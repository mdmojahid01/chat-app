import React, { useState, useEffect, useContext } from "react";
import Avatar from "../images/defaultavatar.png";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

function Chats() {
  const [chats, setChats] = useState({});
  // const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   const getChats = () => {
  //     const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
  //       setChats(doc.data());
  //     });
  //     return () => {
  //       unsub();
  //     };
  //   };
  //   currentUser.uid && getChats();
  // }, [currentUser.uid]);

  // ============ JSX ==================
  return (
    <div className="Chats-div">
      {Object.entries(chats).map((e) => {
        return (
          <div className="searched-user" key={e[0]}>
            <div className="avatar">
              <img
                src={e[1].userInfo.photoURL ? e[1].userInfo.photoURL : Avatar}
                alt="profile"
              />
            </div>
            <div className="userInfo">
              <p>{e[1].userInfo.displayName}</p>
              <span>Latest message</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Chats;
