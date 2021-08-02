import React from 'react';
import { useDispatch } from 'react-redux';
import webSocketContext from '../contexts/webSocketContext.js';
import { recieveNewMessage } from '../slices/messagesSlice.js';
import {
  addChannel, removeUsersChannel, renameUsersChannel,
} from '../slices/channelsSlice.js';
import { closeModal } from '../slices/modalSlice.js';

const socketIdentifiers = {
  newMessage: 'newMessage',
  newChannel: 'newChannel',
  removeChannel: 'removeChannel',
  renameChannel: 'renameChannel',
};

const WebSocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const manageChannel = (action) => (data) => {
    socket.emit(action, data, ({ status }) => {
      if (status === 'ok') {
        dispatch(closeModal());
      }
    });
  };

  const addNewChannel = manageChannel(socketIdentifiers.newChannel);
  const removeChannel = manageChannel(socketIdentifiers.removeChannel);
  const renameChannel = manageChannel(socketIdentifiers.renameChannel);

  const sendMessage = (newMessage) => {
    socket.emit(socketIdentifiers.newMessage, newMessage);
  };

  socket.on(socketIdentifiers.newChannel, (channel) => {
    dispatch(addChannel(channel));
  });

  socket.on(socketIdentifiers.removeChannel, (removingChannel) => {
    dispatch(removeUsersChannel(removingChannel));
  });

  socket.on(socketIdentifiers.renameChannel, (renamingChannel) => {
    dispatch(renameUsersChannel(renamingChannel));
  });

  socket.on(socketIdentifiers.newMessage, (message) => {
    dispatch(recieveNewMessage(message));
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
