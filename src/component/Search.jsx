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
import { ToastContainer, toast } from "react-toastify";
import { ChatContext } from "../context/ChatContext";

// ========================= Component ======================
function Search() {
  const [user, setUser] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  // ------------------------ Handle Change -------------------------
  const handleChange = (e) => {
    setInputVal(e.target.value);
  };
  // ----------- Handle Submit - searching user form submit ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const usersRef = collection(db, "users");
    // Create a query against the collection.
    const q = query(usersRef, where("email", "==", e.target[0].value));
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        toast.error("No user found.");
      } else {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // ------ Handle Selection - select user after search result ----------------
  const handleSelect = async (e) => {
    const combinedId =
      currentUser.uid[0].charCodeAt() > user.uid[0].charCodeAt()
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    // check weather the group (chats collection in firestore ) exists or not, if not then create.
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
      toast.error(error);
    }
    dispatch({ type: "CHANGE_USER", payload: user });
    setUser(null);
    setInputVal("");
  };
  // =============== JSX ================
  return (
    <div className="search-div">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Find a user using email id"
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
