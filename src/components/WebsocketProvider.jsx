import React from 'react';
import { useDispatch } from 'react-redux';
import webSocketContext from '../webSocketContext.js';
import { recieveNewMessage } from '../slices/messagesSlice.js';
import {
  addChannel, removeUsersChannel, renameUsersChannel,
} from '../slices/channelsSlice.js';
import { closeModal } from '../slices/modalSlice.js';

const WebSocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  // Подумать над диспетчеризацией
  const sendMessage = (newMessage) => {
    socket.emit('newMessage', newMessage);
  };

  socket.on('newMessage', (message) => {
    dispatch(recieveNewMessage(message));
  });

  const addNewChannel = (newChannel) => {
    socket.emit('newChannel', newChannel, ({ status }) => {
      if (status === 'ok') {
        dispatch(closeModal());
      }
    });
  };

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });

  const removeChannel = (removingChannel) => {
    socket.emit('removeChannel', removingChannel, ({ status }) => {
      if (status === 'ok') {
        dispatch(closeModal());
      }
    });
  };

  socket.on('removeChannel', (removingChannel) => {
    dispatch(removeUsersChannel(removingChannel));
  });

  const renameChannel = (renamingChannel) => {
    socket.emit('renameChannel', renamingChannel, ({ status }) => {
      if (status === 'ok') {
        dispatch(closeModal());
      }
    });
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
