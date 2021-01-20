import React, { useState } from 'react';
import axios from 'axios';

export const JoinBlock = ({ onLogin }) => {
  const [ roomId, setRoomID ] = useState('');
  const [ userName, setUserName ] = useState('');
  const [ isLoading, setLoading ] = useState(false);

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert('Неверные данные');
    }
    const obj = { roomId, userName }
    setLoading(true);
    await axios.post('/rooms', obj)
    onLogin(obj)
  };

    return(
        <div className="join-block">
            <input
              type="text"
              placeholder="ID комнаты"
              value={roomId} // затем значение из state попадает как value в input
              onChange={(e) => setRoomID(e.target.value)} // сначала значение по onChange попадает в переменную в state
            />
            <input
              type="text"
              placeholder="Ваше имя"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button
              disabled={isLoading}
              className="btn btn-success"
              onClick={onEnter}
              >{isLoading ? 'Вход...' : 'Войти'}</button>
        </div>
    )
}
