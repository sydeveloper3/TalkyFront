import React from "react";
import Robot from "../assets/robot.gif";

function Welcome({ currentUser }) {
  return (
    <>
      <div className="welcome">
        <img src={Robot} alt="robot" />
        <h1>
          Welcome <span>{currentUser.username} !</span>
        </h1>
        <h3>Please Select a chat to start messeging</h3>
      </div>
    </>
  );
}

export default Welcome;
