import React, { useReducer } from 'react';
import socket from './socket';

import JoinBlock from "./components/joinBlock";
import reducer from './useReducer';

function App() {

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

  socket.on('ROOM:JOINED', users => {
    console.log("New user", users);
  });

  window.socket = socket;

  return (
    <div className="wrapper">
      {state.joined === false ? <JoinBlock onLogin={onLogin}/> : <div>We are authorise</div>}
    </div>
  );
}

export default App;
