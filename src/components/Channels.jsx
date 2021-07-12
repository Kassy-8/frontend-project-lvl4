import React from 'react';
import {
  Button, Form, Nav,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import cn from 'classnames';
import { selectAllChannels, selectChannelsIds, selectChannelsAll } from '../reducers/channelsSlice.js';

const Channels = () => {
  // console.log('in Channels');
  // console.log({ authInfo });
  const dispatch = useDispatch();

  const channels = useSelector(selectAllChannels);
  // const channelsAll = useSelector(selectChannelsAll);
  // console.log('channelsAll', channelsAll);

  const channelsIds = useSelector(selectChannelsIds);

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  // console.log('currentChannel', currentChannelId);

  const renderChannels = () => {
    if (channelsIds.length === 0) {
      return null;
    }

    const channelsList = channelsIds.map((id) => (
      <Nav.Item id={id} key={id} as="li">
        <Nav.Link>
          {channels[id].name}
        </Nav.Link>
      </Nav.Item>
    ));

    return (
      <Nav className="flex-column" variant="pills" as="ul">
        {channelsList}
      </Nav>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between m-2 p-2">
        <span>Каналы</span>
        <Button variant="outline-primary" size="sm">
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
