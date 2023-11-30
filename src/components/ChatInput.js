import React, { useState } from 'react'
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmile } from 'react-icons/bs';
function ChatInput({ handleSendMsg }) {
    const [showEmogiPicker,setShowEmojiPicker]=useState(false);
    const [msg,setMsg]=useState("");
    const handleEmojiPicker=()=>{
        setShowEmojiPicker(!showEmogiPicker);
    }
    const handleEmojiclick=(emojiObject,event)=>{
       let message=msg;
       message+=emojiObject.emoji;
       setMsg(message);
    }
    const sendChat=(e)=>{
        e.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg("");
        }
    }
    return (
        <div className='chatInput'>
            <div className="buttion-container">
                <div className="emoji">
                    <BsEmojiSmile className='icon ' onClick={handleEmojiPicker} />
                    {
                        showEmogiPicker &&<Picker height={350} width={300} className='picker' onEmojiClick={handleEmojiclick}/>
                    }
                </div>
            </div>
            <form className='input-container' onSubmit={(e)=>sendChat(e)}>
                <input type="text" placeholder='Type your sms here'value={msg} onChange={(e)=>setMsg(e.target.value)} />
                <button className='submit'>
                    <IoMdSend />
                </button>
            </form>
        </div>
    )
}

export default ChatInput
