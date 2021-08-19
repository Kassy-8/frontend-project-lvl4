import { receiveNewMessage } from './slices/messagesSlice.js';
import {
  addChannel, removeUserChannel, renameUserChannel,
} from './slices/channelsSlice.js';
import { closeModal } from './slices/modalSlice.js';

const socketIdentifiers = {
  newMessage: 'newMessage',
  newChannel: 'newChannel',
  removeChannel: 'removeChannel',
  renameChannel: 'renameChannel',
};

const initSocketAPI = (socket, store) => {
  socket.on(socketIdentifiers.newChannel, (channel) => {
    store.dispatch(addChannel(channel));
  });

  socket.on(socketIdentifiers.removeChannel, (removingChannel) => {
    store.dispatch(removeUserChannel(removingChannel));
  });

  socket.on(socketIdentifiers.renameChannel, (renamingChannel) => {
    store.dispatch(renameUserChannel(renamingChannel));
  });

  socket.on(socketIdentifiers.newMessage, (message) => {
    store.dispatch(receiveNewMessage(message));
  });

  const manageChannel = (action) => (data) => {
    socket.emit(action, data, ({ status }) => {
      if (status === 'ok') {
        store.dispatch(closeModal());
      }
    });
  };

  const addNewChannel = manageChannel(socketIdentifiers.newChannel);
  const removeChannel = manageChannel(socketIdentifiers.removeChannel);
  const renameChannel = manageChannel(socketIdentifiers.renameChannel);

  const sendMessage = (newMessage) => {
    socket.emit(socketIdentifiers.newMessage, newMessage);
  };

  const socketAPI = {
    sendMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  };

  return socketAPI;
};

export default initSocketAPI;
