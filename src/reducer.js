export default (state, action) => {
  switch (action.type) {
    case 'JOINED':
      return {
        ...state,
        joined: true,
        userName: action.payload.userName,
        roomId: action.payload.roomId,
      };

    case 'SET_DATA':
      return {
        ...state,
        users: action.payload.users,
        messages: action.payload.messages,
      };

    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };

    case 'NEW_MESSAGE':
      console.log('action.payload', action.payload)
      console.log('state.messages', state.messages)
      return {
        ...state,
        messages: [...state.messages, action.payload] // создается новый массив в котором все старые сообщения плюс новое которое прилетит в пейлоаде
      }

    default: return state;
  }
}
