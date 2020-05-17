import React, { memo, useEffect, useReducer } from 'react';
import socket from './socket';

import JoinBlock from "./components/joinBlock";
import reducer from './reducer';
import Chat from "./components/Chat";

const App = () => {

  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
  });

  const onLogin = (data) => {
    dispatch({
      type: 'JOINED',
      payload: data,
    });
    socket.emit('ROOM:JOIN', data);
  };

  useEffect(() => { // позволяет не создавать данный обработчик после каждого render()
    socket.on('ROOM:JOINED', users => {
      console.log("New user", users);
    });
  })

  window.socket = socket;

  return (
    <div className="wrapper">
      {state.joined === false ? <JoinBlock onLogin={onLogin}/> : <Chat/>}
    </div>
  );
}

export default memo(App);
