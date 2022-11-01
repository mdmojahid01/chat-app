import React from "react";
import { FcAddImage } from "react-icons/fc";
import { GrAttachment } from "react-icons/gr";
import { AiOutlineSend } from "react-icons/ai";

function Input() {
  return (
    <div className="input-div">
      <input type="text" placeholder="Type something..." />
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
        />
        <label title="send image" htmlFor="send-file">
          <FcAddImage />
        </label>

        <div title="send">
          <AiOutlineSend />
        </div>
      </div>
    </div>
  );
}

export default Input;
