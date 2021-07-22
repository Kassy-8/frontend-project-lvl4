import React, { useEffect, useState } from 'react';
import {
  Col, Container, Row,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';
import { fetchChannels } from '../slices/channelsSlice.js';
import Channels from './Channels.jsx';
import ChatWindow from './ChatWindow.jsx';
import getAuthHeader from '../getAuthHeader.js';
import ModalWindow from './modals/ModalWindow.jsx';

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [networkError, setNetworkError] = useState(null);

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
              {t('networkError')}
              { networkError}
            </span>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="border h-100 my-4 overflow-hidden">
      <ModalWindow />
      <Row className="h-100">
        <Col md={2} className="col-4 h-100 border-end pt-5 px-0">
          <Channels />
        </Col>
        <Col className="h-100 d-flex border-left flex-column">
          <ChatWindow />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
