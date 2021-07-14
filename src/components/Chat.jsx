import React, { useEffect, useState } from 'react';
import {
  Col, Container, Row,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import routes from '../routes.js';
import { fetchChannels } from '../reducers/channelsSlice.js';
import Channels from './Channels.jsx';
import ChatWindow from './ChatWindow.jsx';
import getAuthHeader from '../getAuthHeader.js';
import ModalWindow from './modals/ModalWindow.jsx';

const Chat = () => {
  const [networkError, setNetworkError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChatDatas = async () => {
      try {
        const { data } = await axios.get(routes.datasPath(), { headers: getAuthHeader() });
        dispatch(fetchChannels(data));
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
    <Container fluid className="border h-100 overflow-hidden">
      <ModalWindow />
      <Row className="h-100">
        <Col md={2} className="col-4 h-100 border-end pt-5 px-0">
          <Channels />
        </Col>
        <Col className="h-100 d-flex flex-column border">
          <ChatWindow />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
