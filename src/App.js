import React, { useReducer } from 'react';
import JoinBlock from "./components/joinBlock";
import reducer from './useReducer';

function App() {

  const [state, dispatch] = useReducer(reducer, {
    isAuth: false
  });

  const onLogin = () => {
    dispatch({
      type: 'IS_AUTH',
      payload: true
    });
  }

  console.log(state);

  return (
    <div className="wrapper">
      {state.isAuth === false ? <JoinBlock onLogin={onLogin}/> : <div>We are authorise</div>}
    </div>
  );
}

export default App;
