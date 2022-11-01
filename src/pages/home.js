import React from "react";
import Sidebar from "../component/Sidebar";
import Chat from "../component/Chat";

function Home() {
  return (
    <div className="home flex-center">
      <div className="inner-home">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Home;
