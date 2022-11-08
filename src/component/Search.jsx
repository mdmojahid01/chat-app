import React, { useState, useContext } from "react";
import Avatar from "../images/defaultavatar.png";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

// ========================= Component ======================
function Search() {
  const [user, setUser] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const { currentUser } = useContext(AuthContext);
  // ------------------------ Handle Change -------------------------
  const handleChange = (e) => {
    setInputVal(e.target.value);
  };
  // -----------------Handle Submit------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const usersRef = collection(db, "users");
    // Create a query against the collection.
    const q = query(usersRef, where("email", "==", e.target[0].value));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  };
  // --------------------
  const handleSelect = async (e) => {
    // console.log(user, currentUser);
    // check weather the group (chats collection in firestore ) exists or not, if not then create.
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : currentUser.uid + user.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        // create chats in collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        // ---
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error(error);
    }

    setUser(null);
    setInputVal("");
  };
  // =============== JSX ================
  return (
    <div className="search-div">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Find a user by email id"
          value={inputVal}
          onChange={handleChange}
        />
      </form>
      {user && (
        <div className="searched-user" onClick={handleSelect}>
          <div className="avatar">
            <img src={user.photoURL ? user.photoURL : Avatar} alt="profile" />
          </div>
          <p>{user.displayName}</p>
        </div>
      )}
    </div>
  );
}

export default Search;
