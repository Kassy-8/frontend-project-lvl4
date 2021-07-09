import React, { useEffect, useContext } from 'react';
import {
  Button, Col, Container, Form, Nav, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
// import { io } from 'socket.io-client';
import { selectChannels, fetchChannels, selectMessages } from './channelsSlice.js';
import webSocketContext from './webSocketContext.js';
import useAuth from './useAuth.js';

const Chat = () => {
  // console.log('in Chat');
  const webSocket = useContext(webSocketContext);
  const authInfo = useAuth();
  console.log({ authInfo });
  const dispatch = useDispatch();

  const messages = useSelector(selectMessages);

  const channels = useSelector(selectChannels);
  const { byId: channelsById, allIds: channelsAllIds } = channels;
  const requestChannelStatus = useSelector((state) => state.channels.status);
  const requestChannelError = useSelector((state) => state.channels.error);
  const currentChannelId = useSelector((state) => state.channels.currentChannel);
  // console.log('currentChannel', currentChannelId);

  useEffect(() => {
    if (requestChannelStatus === 'idle') {
      dispatch(fetchChannels());
    }
  }, [requestChannelStatus, dispatch]);

  // const socket = io();
  // socket.on('connect', () => {
  //   console.log('socket connect in chat');
  // });

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
    if (messages.length === 0) {
      return null;
    }

    const messagesForCurrentChannel = messages
      .filter((message) => message.channelId === currentChannelId)
      .map(({ body, username, id }) => (
        <div key={id}>
          {`${username}: ${body}`}
        </div>
      ));

    return (
      <div>
        {messagesForCurrentChannel}
      </div>
    );
  };

  const renderChannels = () => {
    const channelsList = channelsAllIds.map((id) => (
      <Nav.Item id={id} key={id} as="li">
        <Nav.Link>
          {channelsById[id].name}
        </Nav.Link>
      </Nav.Item>
    ));

    return (
      <Nav className="flex-column" variant="pills" as="ul">
        {channelsList}
      </Nav>
    );
  };

  const renderTextInput = () => {
    const sendMessage = (values) => {
      const newMessage = {
        username: authInfo.username,
        body: values.message,
        channelId: currentChannelId,
      };
      console.log({ newMessage });
      webSocket.sendMessage(newMessage);
    };

    const formik = useFormik({
      initialValues: {
        message: '',
      },
      onSubmit: sendMessage,
    });

    return (
      <Form onSubmit={formik.handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label htmlFor="message">
                <Form.Control
                  className="mb-2"
                  name="message"
                  id="message"
                  placeholder="Введите сообщение"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                />
              </Form.Label>
            </Form.Group>
          </Col>
          <Col>
            <Button type="submit" className="mb-2">
              Отправить
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
  };

  return (
    <Container fluid className=" border h-100">
      <Row className="h-100">
        <Col lg={3} xs={2} className="border">
          <div className="d-flex justify-content-between m-2 p-2">
            <span>Каналы</span>
            <Button variant="outline-primary" size="sm">
              +
            </Button>
          </div>
          <div className="d-flex">
            {renderChannels()}
          </div>
        </Col>
        <Col className="border">
          <div className="d-flex flex-column h-100">
            <div className="mb-4 p-3">
              <h3>Channel</h3>
            </div>
            <div>
              {renderMessages()}
            </div>
            <div className="mt-auto px-5 py-3">
              {renderTextInput()}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
