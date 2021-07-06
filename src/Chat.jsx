import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { selectMessages, selectCurrentChannel } from './reducers.js';
import { selectMessages, fetchMessages } from './messagesSlice.js';
import { selectChannels, fetchChannels } from './channelsSlice.js';

const Chat = () => {
  // console.log('in Chat');
  const dispatch = useDispatch();

  const messages = useSelector(selectMessages);
  const { byIds: messagesByIds, allIds: messagesAllIds } = messages;

  const channels = useSelector(selectChannels);
  const { byId: channelsById, allIds: channelsAllIds } = channels;
  const requestChannelStatus = useSelector((state) => state.channels.status);
  const requestChannelError = useSelector((state) => state.channels.error);
  const currentChannelId = useSelector((state) => state.channels.currentChannel);

  useEffect(() => {
    if (requestChannelStatus === 'idle') {
      dispatch(fetchChannels());
      dispatch(fetchMessages());
    }
  }, [requestChannelStatus, dispatch]);

  if (requestChannelStatus === 'failed') {
    return (
      <span>
        Произошла ошибка подключения:
        { requestChannelError}
      </span>
    );
  }
  // console.log('messagesByIds', messagesByIds);
  const renderMessages = () => {
    if (!messagesByIds) {
      return null;
    }

    const messagesForCurrentChannel = messagesByIds
      .filter((message) => message.channelId === currentChannelId)
      .map(({ message, author, id }) => (
        <div key={id}>
          {message}
        </div>
      ));
    return (
      <div>
        {messagesForCurrentChannel}
      </div>
    );
  };

  return (
    <div>
      <div>
        <ul>
          {channelsAllIds.map((id) => (
            <li key={id}>
              {channelsById[id].name}
            </li>
          ))}
        </ul>
      </div>
      {renderMessages()}
    </div>
  );
};

export default Chat;
