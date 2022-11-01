import React from "react";
import Avatar from "../images/defaultavatar.png";

function Search() {
  return (
    <div className="search-div">
      <div className="search-form">
        <input type="text" name="" id="" placeholder="Find a user" />
      </div>
      {/* <div className="searched-user">
        <div className="avatar">
          <img src={Avatar} alt="profile" />
        </div>
        <p>Jone Doe</p>
      </div> */}
    </div>
  );
}

export default Search;
