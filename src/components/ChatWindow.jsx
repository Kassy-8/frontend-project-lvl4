import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Col, Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import cn from 'classnames';
import { selectAllMessages, selectMessagesIds } from '../reducers/messagesSlice.js';
import { selectChannelById } from '../reducers/channelsSlice.js';
import webSocketContext from '../webSocketContext.js';
import useAuth from '../useAuth.js';

const ChatWindow = () => {
  // console.log('in Chat');
  const webSocket = useContext(webSocketContext);
  const authInfo = useAuth();
  // console.log({ authInfo });
  const dispatch = useDispatch();

  const messages = useSelector(selectAllMessages);
  // console.log('all messages in chat window', messages);

  const messagesIds = useSelector(selectMessagesIds);

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  // console.log('currentChannelId', currentChannelId);
  const currentChannel = useSelector((state) => selectChannelById(state, currentChannelId));

  const messagesForActiveChannel = Object.values(messages)
    .filter((message) => message.channelId === currentChannelId);
  // console.log({ messagesForActiveChannel });

  const renderHeader = () => {
    if (!currentChannelId) {
      return null;
    }

    const { name } = currentChannel;
    return (
      <div className="mb-4 p-3">
        <h5>
          <b>{`# ${name}`}</b>
        </h5>
      </div>
    );
  };

  const renderMessages = () => {
    if (messages.length === 0) {
      return null;
    }

    const chatMessages = messagesForActiveChannel
      .map(({ body, username, id }) => (
        <div key={id}>
          <b>
            {`${username}: `}
          </b>
          {body}
        </div>
      ));

    return (
      <div>
        {chatMessages}
      </div>
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
    <>
      <div className="d-flex flex-column h-100">
        {renderHeader()}
        <div>
          {renderMessages()}
        </div>
        <div className="mt-auto px-5 py-3">
          {renderTextInput()}
        </div>
      </div>
    </>
  );
};

export default ChatWindow;

// const renderMessages = () => {
//   if (messages.length === 0) {
//     return null;
//   }

//   const messagesForCurrentChannel = messages
//     .filter((message) => message.channelId === currentChannelId)
//     .map(({ body, username, id }) => (
//       <div key={id}>
//         <b>
//           {`${username}: `}
//         </b>
//         {body}
//       </div>
//     ));

//   return (
//     <div>
//       {messagesForCurrentChannel}
//     </div>
//   );
// };
