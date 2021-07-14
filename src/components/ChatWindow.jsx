import React, { useContext, useEffect, useRef } from 'react';
import {
  Button, Col, Form,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import cn from 'classnames';
import { selectAllMessages } from '../reducers/messagesSlice.js';
import { selectChannelById } from '../reducers/channelsSlice.js';
import webSocketContext from '../webSocketContext.js';
import useAuth from '../useAuth.js';

const ChatWindow = () => {
  // console.log('in Chat');
  const webSocket = useContext(webSocketContext);
  const authInfo = useAuth();
  // console.log({ authInfo });
  const inputRef = useRef();
  const endElement = useRef();

  const messages = useSelector(selectAllMessages);
  // console.log('all messages in chat window', messages);

  // Есть селекторы для этих случаев
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  // console.log('currentChannelId', currentChannelId);
  const currentChannel = useSelector((state) => selectChannelById(state, currentChannelId));

  const messagesForActiveChannel = messages
    ?.filter((message) => message.channelId === currentChannelId);
  // console.log({ messagesForActiveChannel });

  useEffect(() => {
    inputRef.current.focus();
    endElement.current?.scrollIntoView({ behavior: 'smooth' });
  });

  const renderHeader = () => {
    if (!currentChannelId) {
      return null;
    }

    const { name } = currentChannel;
    return (
      <div className="mb-3 p-2">
        <h6>
          <b>{`# ${name}`}</b>
          <p>{`${messagesForActiveChannel.length} сообщений`}</p>
        </h6>
      </div>
    );
  };

  const renderMessages = () => {
    if (!messagesForActiveChannel) {
      return null;
    }

    const chatMessages = messagesForActiveChannel
      .map(({ body, username, id }) => (
        <div key={id} className="mb-2">
          <b>
            {`${username}: `}
          </b>
          {body}
        </div>
      ));

    return (
      <div className="overflow-auto">
        {chatMessages}
        <div ref={endElement} />
      </div>
    );
  };

  const renderTextInput = () => {
    const formik = useFormik({
      initialValues: {
        message: '',
      },
      onSubmit: (values) => {
        const newMessage = {
          username: authInfo.username,
          body: values.message,
          channelId: currentChannelId,
        };

        webSocket.sendMessage(newMessage);
        formik.resetForm();
        inputRef.current.focus();
      },
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
                  ref={inputRef}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                />
              </Form.Label>
            </Form.Group>
          </Col>
          <Col>
            <Button type="submit" className="mb-2" disabled={!formik.dirty}>
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
        {renderMessages()}
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
