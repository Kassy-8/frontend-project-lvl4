import React from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import webSocketContext from '../webSocketContext.js';
import { recieveNewMessage } from '../slices/messagesSlice.js';
import {
  addChannel, removeUsersChannel, renameUsersChannel,
} from '../slices/channelsSlice.js';

const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();

  const socket = io();

  // Подумать над диспетчеризацией
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

  const removeChannel = (removingChannel) => {
    socket.emit('removeChannel', removingChannel);
  };

  socket.on('removeChannel', (removingChannel) => {
    dispatch(removeUsersChannel(removingChannel));
  });

  const renameChannel = (renamingChannel) => {
    socket.emit('renameChannel', renamingChannel);
  };

  socket.on('renameChannel', (renamingChannel) => {
    dispatch(renameUsersChannel(renamingChannel));
  });

  const socketContext = {
    socket,
    sendMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  };

  return (
    <webSocketContext.Provider value={socketContext}>
      {children}
    </webSocketContext.Provider>
  );
};

export default WebSocketProvider;
