export default (state, action) => {
  switch (action.type) {
    case 'JOINED':
      return {
        ...state,
        joined: action.payload
      }

    default: return state;
  }
}
