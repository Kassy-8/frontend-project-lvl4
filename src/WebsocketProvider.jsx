import React from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import webSocketContext from './webSocketContext.js';
import { recieveNewMessage } from './channelsSlice.js';

const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io();

  const sendMessage = (newMessage) => {
    console.log('in sendMessage');
    socket.emit('newMessage', newMessage);
  };

  socket.on('newMessage', (message) => {
    dispatch(recieveNewMessage(message));
  });

  socket.on('connect', () => {
    console.log('websocket connection on');
  });

  const socketContext = {
    socket,
    sendMessage,
  };

  return (
    <webSocketContext.Provider value={socketContext}>
      {children}
    </webSocketContext.Provider>
  );
};

export default WebSocketProvider;
