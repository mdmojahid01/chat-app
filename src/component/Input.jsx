import React, { useState, useContext } from "react";
import { FcAddImage } from "react-icons/fc";
import { GrAttachment } from "react-icons/gr";
import { AiOutlineSend } from "react-icons/ai";

import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useEffect } from "react";

function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          //  toast.error(error.message, defaultToastParameter);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastmessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastmessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setImg(null);
    setText("");
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };
  // ================== JSX ==================
  return (
    <div className="input-div">
      <input
        type="text"
        id="text-field"
        placeholder="Type something..."
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeydown}
      />
      <div className="send-div">
        <div title="attach file" className="file-icon">
          <GrAttachment />
        </div>

        <input
          accept="image/png, image/jpeg"
          type="file"
          name=""
          id="send-file"
          style={{ display: "none" }}
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label title="send image" htmlFor="send-file">
          <FcAddImage />
        </label>

        <div title="send" onClick={handleSend}>
          <AiOutlineSend />
        </div>
      </div>
    </div>
  );
}

export default Input;
