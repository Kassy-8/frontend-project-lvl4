import React from 'react';
import {
  Button, Dropdown, Nav, ButtonGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import {
  selectChannels,
  selectCurrentChannelId,
  setCurrentChannel,
} from '../slices/channelsSlice.js';

const modalTypes = {
  remove: 'removeChannel',
  rename: 'renameChannel',
};

const Channel = ({ id, showModalWindow }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channels = useSelector(selectChannels);
  const currentChannelId = useSelector(selectCurrentChannelId);

  const toggleChannel = () => dispatch(setCurrentChannel(id));

  const isActiveChannel = id === currentChannelId;
  const isRemovableChannel = channels[id].removable;

  const channelClasses = cn({
    'w-100 text-left': true,
    'btn-secondary': isActiveChannel,
  });

  const defaultChannel = (
    <Button
      variant={false}
      className={channelClasses}
      onClick={() => toggleChannel()}
    >
      {t('channelsMenu.channelsName', { channel: channels[id].name })}
    </Button>
  );

  // дропдаун почему то выпадает в контейнере для каналов, почему - не могу постигнуть
  const usersChannel = (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button
        variant={false}
        className={channelClasses}
        onClick={() => toggleChannel()}
      >
        {t('channelsMenu.channelsName', { channel: channels[id].name })}
      </Button>

      <Dropdown.Toggle
        className={(isActiveChannel) ? 'btn-secondary' : 'btn-light'}
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

  return (
    <Nav.Item
      id={id}
      as="li"
      className="w-100"
    >
      {(isRemovableChannel)
        ? usersChannel
        : defaultChannel}
    </Nav.Item>
  );
};

export default Channel;
