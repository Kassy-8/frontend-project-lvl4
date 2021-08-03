import React, { useEffect, useState } from 'react';
import {
  Col, Container, Row, Spinner,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';
import { fetchChannels } from '../slices/channelsSlice.js';
import Header from '../components/Header.jsx';
import ChannelsBox from '../components/ChannelsBox.jsx';
import ChatBox from '../components/ChatBox.jsx';
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

  const [isLoading, setIsLoading] = useState(true);
  const [networkError, setNetworkError] = useState(null);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const { data } = await axios.get(routes.datasPath(), { headers: getHeaderForAuth() });
        dispatch(fetchChannels(data));
        setIsLoading(false);
      } catch (error) {
        console.log('error in fetchChatData', error);
        if (error.isAxiosError) {
          setIsLoading(false);
          setNetworkError(error);
        }
      }
    };
    fetchChatData();
  }, []);

  if (networkError) {
    return (
      <div className="h-100 d-flex flex-column">
        <Header />
        <Container fluid className="border h-100 my-4 overflow-auto">
          <div className="m-2">
            <span>
              {t('networkError')}
              { networkError}
            </span>
          </div>
        </Container>
      </div>
    );
  }

  const spinner = (
    <Row className="h-100 align-items-center justify-content-center">
      <Col md={{ span: 4, offset: 4 }}>
        <Spinner animation="grow" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Col>
    </Row>
  );

  return (
    <div className="h-100 d-flex flex-column">
      <Header />
      <Container fluid className="border h-100 my-4 overflow-auto">
        {(isLoading)
          ? spinner
          : (
            <>
              <ModalWindow />
              <Row className="h-100">
                <Col md={2} className="col-4 h-100 border-end pt-5 px-0">
                  <ChannelsBox />
                </Col>
                <Col className="h-100 d-flex border-left flex-column">
                  <ChatBox />
                </Col>
              </Row>
            </>
          )}
      </Container>
    </div>
  );
};

export default Chat;
