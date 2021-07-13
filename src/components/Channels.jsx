import React from 'react';
import {
  Button, Form, Nav,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import cn from 'classnames';
import {
  selectAllChannels,
  selectChannelsIds,
  setCurrentChannel,
  selectCurrentChannelId,
  selectCurrentChannel,
} from '../reducers/channelsSlice.js';
import { showModal } from '../reducers/modalSlice.js';

const modalTypes = {
  adding: 'adding',
  remove: 'remove',
  rename: 'rename',
};

const Channels = () => {
  const dispatch = useDispatch();

  const channels = useSelector(selectAllChannels);
  const channelsIds = useSelector(selectChannelsIds);
  // const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannelId = useSelector(selectCurrentChannelId);
  const currentChannel = useSelector(selectCurrentChannel);

  const toggleChannel = (id) => dispatch(setCurrentChannel(id));
  const showModalWindow = (type, channel) => dispatch(showModal({
    modalType: type, channelInfo: channel,
  }));

  const renderChannels = () => {
    if (channelsIds.length === 0) {
      return null;
    }

    const isActiveChannel = (id) => id === currentChannelId;

    const channelsList = channelsIds.map((id) => {
      const classes = cn({
        'w-100 rounded-0 btn': true,
        'btn-secondary text-light': isActiveChannel(id),
      });
      return (
        <Nav.Item
          id={id}
          key={id}
          as="li"
          className="px-100"
          onClick={() => toggleChannel(id)}
        >
          <Nav.Link className={classes}>
            {`# ${channels[id].name}`}
          </Nav.Link>
        </Nav.Item>
      );
    });

    return (
      <Nav className="flex-column overflow-auto" fill variant="pills" as="ul">
        {channelsList}
      </Nav>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between m-2 p-2">
        <span>Каналы</span>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => showModalWindow(modalTypes.adding, null)}
        >
          +
        </Button>
      </div>
      <div className="d-flex">
        {renderChannels()}
      </div>
    </>
  );
};

export default Channels;
