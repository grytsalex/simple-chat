import React, { memo, useEffect, useReducer } from 'react';
import axios from 'axios';
import { If, Else, Then } from 'react-if'

import socket from './socket';
import reducer from './reducer';
import { Chat, JoinBlock } from "./components";

const App = () => {

  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const onLogin = async (obj) => {
    dispatch({  // когда произошел вход в комнату об этом оповещается front-end
      type: 'JOINED',
      payload: obj,
    });

    socket.emit('ROOM:JOIN', obj); // когда произошел вход в комнату об этом оповещается socket

    const { data } = await axios.get(`/rooms/${obj.roomId}`); // отправляется get запрос на server в котором запрашиваются актуальные данные

    dispatch({
      type: 'SET_DATA',
      payload: data
    })
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    })
};

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    })
  }

  useEffect(() => { // позволяет не создавать данный обработчик после каждого render()
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage) // когда от сокета прийдет данное сообщение отправляется екшен который сетит новое сообщение
  }, []);

  window.socket = socket;

  return (
    <div className="wrapper">
      <If condition={!state.joined}>
      <Then>
      <JoinBlock onLogin={onLogin}/>
      </Then> 
      <Else>
         <Chat {...state} onAddMessage={addMessage} />
          </Else>
      </If>
    </div>
  );
}

export default memo(App);
