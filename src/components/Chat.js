import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
const host = "http://localhost:5000";

export default function Chat() {
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState();

  const socketRef = useRef();
  const messagesEnd = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host)

    socketRef.current.on('sendDataServer', dataGot => {
      setMess(oldMsgs => [...oldMsgs, dataGot.data])
      scrollToBottom()
    })

    return () => {
      socketRef.current.disconnect();
    };
  }, [])

  const sendMessage = () => {
    if(!!message) {
      const msg = {
        content: message, 
        userId: userId
      }
      socketRef.current.emit('sendDataClient', msg)
      setMessage('')
    }
  }

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" })
  }

  const renderMess =  mess.map((m, index) => 
    <div 
      key={index} 
      className={`${m.userId === userId ? 'your-message' : 'other-people'} chat-item`}
    >
      {m.content}
    </div>
  )

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const updateUserId = (e) => {
    if (!e.target.value || e.target.value.length > 2) return
    setUserId(e.target.value)
  }

  const onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      sendMessage()
    }
  }

  return (
    <div className="box-chat">
      <input
        type="text"
        name="name"
        onChange={updateUserId}
        value={userId}
        placeholder="Enter User Id" />

      <div className="box-chat_message">
        {renderMess}
        <div
          style={{ float:"left", clear: "both" }}
          ref={messagesEnd}>
        </div>
      </div>

      <div className="send-box">
        <textarea 
          value={message}  
          onKeyDown={onEnterPress}
          onChange={handleChange} 
          placeholder="Nhập tin nhắn ..." 
        />
        <button onClick={sendMessage}>
          Send
        </button>
      </div>

    </div>
  );
}
