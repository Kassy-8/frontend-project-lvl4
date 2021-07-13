import React from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import webSocketContext from '../webSocketContext.js';
import { recieveNewMessage } from '../reducers/messagesSlice.js';
import { addChannel } from '../reducers/channelsSlice.js';

const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io();

  const sendMessage = (newMessage) => {
    socket.emit('newMessage', newMessage);
  };

  socket.on('newMessage', (message) => {
    dispatch(recieveNewMessage(message));
  });

  const addNewChannel = (newChannel) => {
    socket.emit('newChannel', newChannel);
  };

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });

  // check connection, development purpose
  socket.on('connect', () => {
    console.log('websocket connection on');
  });

  const socketContext = {
    socket,
    sendMessage,
    addNewChannel,
  };

  return (
    <webSocketContext.Provider value={socketContext}>
      {children}
    </webSocketContext.Provider>
  );
};

export default WebSocketProvider;
