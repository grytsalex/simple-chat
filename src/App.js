import React, { useReducer } from 'react';
import socket from './socket';

import JoinBlock from "./components/joinBlock";
import reducer from './useReducer';

function App() {

  const [state, dispatch] = useReducer(reducer, {
    joined: false
  });

  const onLogin = () => {
    dispatch({
      type: 'JOINED',
      payload: true
    });
    socket.emit('ROOM:JOIN', {
      roomId,
      userName
    })
  }

  return (
    <div className="wrapper">
      {state.joined === false ? <JoinBlock onLogin={onLogin}/> : <div onSendRoomData={onSendRoomData}>We are authorise</div>}
    </div>
  );
}

export default App;
