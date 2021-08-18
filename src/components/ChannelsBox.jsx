import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectChannelIds } from '../selectors.js';
import { showModal } from '../slices/modalSlice.js';
import Channel from './Channel.jsx';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channelIds = useSelector(selectChannelIds);

  const showModalWindow = (type, channel) => dispatch(showModal({
    modalType: type, extra: channel,
  }));

  const renderChannels = () => channelIds
    .sort((id1, id2) => id1 - id2)
    .map((id) => (
      <Channel key={id} id={id} showModalWindow={showModalWindow} />
    ));

  return (
    <>
      <div className="d-flex justify-content-between mb-2 pr-2 pl-4">
        <span>{t('channelsMenu.title')}</span>
        <Button
          variant="outline-primary"
          className="py-0 px-1"
          onClick={() => showModalWindow('addChannel', null)}
        >
          {t('channelsMenu.addButton')}
        </Button>
      </div>
      <Nav className="flex-column px-2" fill variant="pills" as="ul">
        {renderChannels()}
      </Nav>
    </>
  );
};

export default Channels;
