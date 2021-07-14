import React from 'react';
import { useSelector } from 'react-redux';
import AddChannel from './AddChannel.jsx';
// import RenameChannel from './modals/RenameChannel.jsx';
// import RemoveChannel from './modals/RemoveChannel.jsx';

const modals = {
  adding: AddChannel,
  // remove: RemoveChannel,
  // rename: RenameChannel,
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
