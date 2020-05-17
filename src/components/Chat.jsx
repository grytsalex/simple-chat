import React, { memo, useState } from 'react';

export default memo(() => {
  const [messageValue, setMessageValue] = useState()

  return (
    <div className="chat">
      <div className="chat-users">
        <b>Users (1):</b>
        <ul>
          <li>Test User</li>
        </ul>
      </div>
      <div className="chat-messages">
        <div className="messages">
          <div className="message">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div>
              <span>Test User</span>
            </div>
          </div>
          <div className="message">
            <p>Integer id orci tempor, pellentesque sapien vitae, malesuada nisl. </p>
            <div>
              <span>Test User</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
);