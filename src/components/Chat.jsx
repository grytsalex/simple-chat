import React, { memo, useState } from 'react';

export default memo(({users, messages}) => {
  const [messageValue, setMessageValue] = useState()

  return (
    <div className="chat">
      <div className="chat-users">
        <b>Онлайн ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={name + index}>{name}</li>))}
        </ul>
      </div>

      <div className="chat-messages">
        <div className="messages">
          {messages.map((message) => (
            <div className="message">
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
           onChange={(event) => setMessageValue(event.target.value)}
           className="form-control"
           rows="3"/>
          <button type="button" className="btn btn-primary">Отправить</button>
        </form>
      </div>
    </div>
    )
  }
);