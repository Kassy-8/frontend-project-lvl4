import React from 'react';
import {
  Button, Nav, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import {
  selectAllChannelsAsObject,
  selectChannelsIds,
  setCurrentChannel,
  selectCurrentChannelId,
} from '../reducers/channelsSlice.js';
import { showModal } from '../reducers/modalSlice.js';

const modalTypes = {
  add: 'addChannel',
  remove: 'removeChannel',
  rename: 'renameChannel',
};

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channels = useSelector(selectAllChannelsAsObject);
  const channelsIds = useSelector(selectChannelsIds);
  const currentChannelId = useSelector(selectCurrentChannelId);

  const toggleChannel = (id) => dispatch(setCurrentChannel(id));

  const showModalWindow = (type, channel) => dispatch(showModal({
    modalType: type, channelInfo: channel,
  }));

  const isActiveChannel = (id) => id === currentChannelId;

  const getChannelClasses = (id) => cn({
    'w-100 rounded text-left': true,
    'btn-secondary': isActiveChannel(id),
  });

  const renderDefaultChannel = (id) => (
    <Button
      variant={false}
      className={getChannelClasses(id)}
      onClick={() => toggleChannel(id)}
    >
      {t('channelsMenu.channelsName', { channel: channels[id].name })}
    </Button>
  );

  const renderUsersChannel = (id) => (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button variant={false} className={getChannelClasses(id)} onClick={() => toggleChannel(id)}>
        {t('channelsMenu.channelsName', { channel: channels[id].name })}
      </Button>

      <Dropdown.Toggle
        className={(isActiveChannel(id)) ? 'btn-secondary' : 'btn-light'}
        variant={false}
        split
        drop="down"
        id="dropdown-split-basic"
      />

      <Dropdown.Menu align="end">
        <Dropdown.Item
          onClick={() => showModalWindow(modalTypes.remove, channels[id])}
        >
          {t('channelsMenu.deleteButton')}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => showModalWindow(modalTypes.rename, channels[id])}
        >
          {t('channelsMenu.renameButton')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const renderChannels = () => {
    if (channelsIds.length === 0) {
      return null;
    }

    const channelsList = channelsIds.map((id) => (
      <Nav.Item
        id={id}
        key={id}
        as="li"
        className="w-100"
      >
        {(channels[id].removable)
          ? renderUsersChannel(id)
          : renderDefaultChannel(id)}
      </Nav.Item>
    ));

    return (
      <Nav className="flex-column overflow-auto px-2" fill variant="pills" as="ul">
        {channelsList}
      </Nav>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2 pr-2 pl-4">
        <span>{t('channelsMenu.title')}</span>
        <Button
          variant={false}
          className="p-0 text-primary"
          onClick={() => showModalWindow(modalTypes.add, null)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </Button>
      </div>
      {renderChannels()}
    </>
  );
};

export default Channels;

/*
<Dropdown as={ButtonGroup} className="d-flex">
      <Button variant={false} className={getChannelClasses(id)} onClick={() => toggleChannel(id)}>
        {t('channelsMenu.channelsName', { channel: channels[id].name })}
      </Button>

      <Dropdown.Toggle
        className={(isActiveChannel(id)) ? 'btn-secondary' : 'btn-light'}
        variant={false}
        split
        id="dropdown-split-basic"
      />

      <Dropdown.Menu align="end">
        <Dropdown.Item
          onClick={() => showModalWindow(modalTypes.remove, channels[id])}
        >
          {t('channelsMenu.deleteButton')}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => showModalWindow(modalTypes.rename, channels[id])}
        >
          {t('channelsMenu.renameButton')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> */

/*
    <SplitButton
      variant={false}
      className={getChannelClasses(id)}
      onClick={() => toggleChannel(id)}
      title={t('channelsMenu.channelsName', { channel: channels[id].name })}
    >
      <Dropdown.Item
        onClick={() => showModalWindow(modalTypes.remove, channels[id])}
      >
        {t('channelsMenu.deleteButton')}
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => showModalWindow(modalTypes.rename, channels[id])}
      >
        {t('channelsMenu.renameButton')}
      </Dropdown.Item>
    </SplitButton>
    */
