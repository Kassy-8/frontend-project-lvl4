import React from 'react';
import { useSelector } from 'react-redux';
import AddChannel from './AddChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';

const modals = {
  addChannel: AddChannel,
  removeChannel: RemoveChannel,
  renameChannel: RenameChannel,
};

const ModalWindow = () => {
  const modalInfo = useSelector((state) => state.modalInfo);

  if (!modalInfo.type) {
    return null;
  }
  const Component = modals[modalInfo.type];

  return (
    <Component />
  );
};

export default ModalWindow;
