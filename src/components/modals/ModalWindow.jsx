import React from 'react';
import { useSelector } from 'react-redux';
import AddChannel from './AddChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import { selectChannels, selectModalInfo } from '../../selectors.js';

const modalsMapping = {
  addChannel: AddChannel,
  removeChannel: RemoveChannel,
  renameChannel: RenameChannel,
};

const ModalWindow = () => {
  const modalInfo = useSelector(selectModalInfo);
  const channels = useSelector(selectChannels);

  if (!modalInfo.type) {
    return null;
  }

  const reservedChannelsNames = Object.values(channels).map(({ name }) => name);

  const Component = modalsMapping[modalInfo.type];

  return (
    <Component
      modalInfo={modalInfo}
      reservedChannelsNames={(modalInfo.type !== 'removeChannel') ? reservedChannelsNames : null}
    />
  );
};

export default ModalWindow;
