import React, { useEffect, useRef, useState } from "react";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { sendMessageRoute, getAllMessageRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

function ChatContainer({ currrentChat, currentUser, socket }) {
  const [messeges, setMessegse] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  useEffect(() => {
    abc();
    async function abc() {
      if (currrentChat) {
        const data = await JSON.parse(localStorage.getItem("chat-app-user"));
        const response = await axios.post(getAllMessageRoute, {
          from: data._id,
          to: currrentChat._id,
        });
        setMessegse(response.data);
      }
    }
  }, [currrentChat]);
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currrentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currrentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messeges];
    msgs.push({ fromSelf: true, message: msg });
    setMessegse(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);
  useEffect(() => {
    arrivalMessage && setMessegse((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messeges]);
  return (
    <>
      {currrentChat && (
        <div className="ChatContainer">
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currrentChat.avatarImage}`}
                  alt="avatar2"
                />
              </div>
              <div className="username">
                <h3>{currrentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messeges.map((msg) => {
              return (
                <div ref={scrollRef} key={uuidv4}>
                  <div
                    className={`message${msg.fromSelf ? "sended" : "received"}`}
                  >
                    <div className="content">
                      <p>{msg.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </>
  );
}

export default ChatContainer;
