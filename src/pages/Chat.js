import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import { allUsersRoute } from '../utils/APIRoutes';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client';


function Chat() {
  const socket=useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const  [isLoaded,setIsLoaded]=useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    abc2();
    async function abc2() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    }
  }, [navigate])
  useEffect(()=>{
    if(currentUser){
      socket.current=io("https://back-d9st.onrender.com");
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser])
  useEffect(() => {
    abc();
    async function abc() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
  }, [currentUser, navigate])
  const handleChatChnage = (chat) => {
    setCurrentChat(chat);
  }
  return (
    <div className='mainchat'>
      <div className="chat">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChnage} />
      {
       isLoaded&& currentChat === undefined ?
        <Welcome currentUser={currentUser} />: <ChatContainer currrentChat={currentChat} currentUser={currentUser} socket={socket}/>
      }
      </div>
    </div>
  )
}

export default Chat
