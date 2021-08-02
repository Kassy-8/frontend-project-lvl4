import React, { useEffect, useState } from 'react';
import {
  Col, Container, Row,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';
import { fetchChannels } from '../slices/channelsSlice.js';
import Channels from '../components/Channels.jsx';
import ChatWindow from '../components/ChatWindow.jsx';
import ModalWindow from '../components/modals/ModalWindow.jsx';

const getHeaderForAuth = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [networkError, setNetworkError] = useState(null);

  useEffect(() => {
    const fetchChatDatas = async () => {
      try {
        const { data } = await axios.get(routes.datasPath(), { headers: getHeaderForAuth() });
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
      <div className="m-2">
        <span>
          {t('networkError')}
          { networkError}
        </span>
      </div>
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
