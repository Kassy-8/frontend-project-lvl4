import React, { useEffect, useState } from 'react';
import {
  Col, Container, Row,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import routes from '../routes.js';
import { fetchChannels, setCurrentChannel } from '../reducers/channelsSlice.js';
import { fetchMessages } from '../reducers/messagesSlice.js';
import Channels from './Channels.jsx';
import ChatWindow from './ChatWindow.jsx';
import getAuthHeader from '../getAuthHeader.js';

const Chat = () => {
  // console.log('in Chat');
  const [networkError, setNetworkError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChatDatas = async () => {
      try {
        const { data } = await axios.get(routes.datasPath(), { headers: getAuthHeader() });
        const { channels, messages, currentChannelId } = data;
        // console.log({ data });
        dispatch(fetchChannels(channels));
        dispatch(setCurrentChannel(currentChannelId));

        if (messages.length !== 0) {
          dispatch(fetchMessages(messages));
        }
      } catch (error) {
        console.log('error in fetchChatDatas', error);
        if (error.isAxiosError) {
          setNetworkError(error);
        }
      }
    };
    fetchChatDatas();
  }, []);

  if (networkError) {
    return (
      <Container>
        <Row>
          <Col>
            <span>
              Произошла ошибка подключения:
              { networkError}
            </span>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className=" border h-100">
      <Row className="h-100">
        <Col lg={3} xs={2} className="border">
          <Channels />
        </Col>
        <Col className="border">
          <ChatWindow />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
