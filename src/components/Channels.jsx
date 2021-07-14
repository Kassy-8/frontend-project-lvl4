import React from 'react';
import {
  Button, Nav, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
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
    'btn w-100 rounded-0  text-left': true,
    'btn-secondary': isActiveChannel(id),
  });

  const renderDefaultChannel = (id) => (
    <Button variant={false} className={getChannelClasses(id)} onClick={() => toggleChannel(id)}>
      {`# ${channels[id].name}`}
    </Button>
  );

  const renderUsersChannel = (id) => (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button variant={false} className={getChannelClasses(id)} onClick={() => toggleChannel(id)}>
        {`# ${channels[id].name}`}
      </Button>

      <Dropdown.Toggle className={(isActiveChannel(id)) ? 'btn-secondary' : 'btn-light'} variant={false} split id="dropdown-split-basic" />

      <Dropdown.Menu align="end">
        <Dropdown.Item
          onClick={() => dispatch(showModalWindow(modalTypes.remove, channels[id]))}
        >
          Удалить
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => dispatch(showModalWindow(modalTypes.rename, channels[id]))}
        >
          Переименовать
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
      <div className="d-flex justify-content-between mb-2 pr-4 pl-2">
        <span>Каналы</span>
        <Button
          variant="outline-primary"
          size="sm"
          className="p-1 text-primary"
          onClick={() => showModalWindow(modalTypes.add, null)}
        >
          +
        </Button>
      </div>
      {renderChannels()}
    </>
  );
};

export default Channels;
