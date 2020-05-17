import React, { useState } from 'react';
import axios from 'axios';

const JoinBlock = ({ onLogin }) => {
  const [ roomId, setRoomID ] = useState('');
  const [ userName, setUserName ] = useState('');
  const [ isLoading, setLoading ] = useState(false);

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert('Неверные данные');
    }
    const data = { roomId, userName }
    setLoading(true);
    await axios.post('/rooms', data)
    onLogin(data)
  };

    return(
        <div className="join-block">
            <input
              type="text"
              placeholder="Room ID"
              value={roomId} // затем значение из state попадает как value в input
              onChange={(event) => setRoomID(event.target.value)} // сначала значение по onChange попадает в переменную в state
            />
            <input
              type="text"
              placeholder="Ваше имя"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <button
              disabled={isLoading}
              className="btn btn-success"
              onClick={onEnter}
              >{isLoading ? 'Вход...' : 'Войти'}</button>
        </div>
    )
}

export default JoinBlock;