import React, { useEffect } from 'react';
// import axios from 'axios';
import { useHistory } from 'react-router-dom';

const checkUserAuth = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  return (userId && userId.token);
};

const Chat = () => {
  console.log('in Chat');

  const history = useHistory();

  useEffect(() => {
    if (!checkUserAuth) {
      history.replace({ pathname: '/login' });
    }
  }, []);

  return (
    <span>Chat</span>
  );
};

export default Chat;
