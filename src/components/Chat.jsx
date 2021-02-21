import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import socket from '../socket'

export const Chat = memo(({ users, messages, userName, roomId, onAddMessage }) => {

  const [messageValue, setMessageValue] = useState()

  const messagesRef = useRef(null);

  useEffect(() => {
    messagesRef.current.scrollTo(0, 999999)
  }, [messages])

  const onSendMessage = useCallback(() => {
    socket.emit('ROOM:NEW_MESSAGE', { 
      userName,
      roomId,
      text: messageValue
    })
    onAddMessage({
      userName,
      text: messageValue
    })
    setMessageValue('');
  }, [messageValue, userName, roomId, onAddMessage])

  return (
    <div className="chat">
      <div className="chat-users">
      <h4>Комната: {roomId}</h4>
      <hr/>
        <b>Онлайн ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={name + index}>{name}</li>))}
        </ul>
      </div>
      <div className="chat-messages">
        <div ref={messagesRef} className="messages">
          {messages.map((message, index) => (
            <div key={`${message.text} + ${message.user}` + index} className="message">
              <p>{message.text}</p>
            <div>
              <span>{message.username}</span>
            </div>
            </div>
            ))}
        </div>
              <form>
          <textarea
           value={messageValue}
           onChange={(e) => setMessageValue(e.target.value)}
           className="form-control"
           rows="3"/>
          <button onClick={onSendMessage} type="button" className="btn btn-primary">Send</button>
        </form>
      </div>
    </div>
    )
  }
);