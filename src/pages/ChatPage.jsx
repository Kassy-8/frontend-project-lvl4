import React, { useEffect } from 'react';
import {
  Col, Container, Row, Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import useAuth from '../useAuth.js';
import { fetchChannels } from '../slices/channelsSlice.js';
import Header from '../components/Header.jsx';
import ChannelsBox from '../components/ChannelsBox.jsx';
import ChatBox from '../components/ChatBox.jsx';
import ModalWindow from '../components/modals/ModalWindow.jsx';

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useAuth();

  const { status, error } = useSelector((state) => state.channelsInfo);

  const isLoading = (status === 'idle') || (status === 'loading');

  useEffect(() => {
    dispatch(fetchChannels(auth.getHeaderForAuth()));
  }, []);

  if (error) {
    return (
      <div className="h-100 d-flex flex-column">
        <Header />
        <Container fluid className="border h-100 my-4 overflow-auto">
          <div className="m-2">
            <span>
              {t('networkError')}
              {error}
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
          <span className="sr-only">{t('loadingSpinner')}</span>
        </Spinner>
      </Col>
    </Row>
  );

  return (
    <div className="h-100 d-flex flex-column">
      <Header />
      <Container fluid className="border h-100 my-4 overflow-auto">
        {isLoading
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

export default ChatPage;
