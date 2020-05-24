import React, { memo, useEffect, useReducer } from 'react';
import socket from './socket';
import axios from 'axios';

import JoinBlock from "./components/joinBlock";
import reducer from './reducer';
import Chat from "./components/Chat";

const App = () => {

  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const onLogin = async (obj) => {
    dispatch({  // когда произошел вход в комнату оповещаем об этом front-end
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj); // когда произошел вход в комнату оповещаем об этом socket
    const { data } = await axios.get(`/rooms/${obj.roomId}`); // отправляем get запрос на server в котором просим актуальные данные
    setUsers(data.users); // данные летят в state
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    })
};

  useEffect(() => { // позволяет не создавать данный обработчик после каждого render()
    socket.on('ROOM:SET_USERS', setUsers);
  }, []);

  window.socket = socket;

  return (
    <div className="wrapper">
      {state.joined === false ? <JoinBlock onLogin={onLogin}/> : <Chat {...state}/>}
    </div>
  );
}

export default memo(App);
