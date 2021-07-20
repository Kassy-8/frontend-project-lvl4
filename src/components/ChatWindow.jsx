import React, { useContext, useEffect, useRef } from 'react';
import {
  Button, Form, InputGroup, FormControl,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

// import { useRollbar } from '@rollbar/react';

import { selectAllMessages } from '../reducers/messagesSlice.js';
import {
  selectCurrentChannelId, selectCurrentChannel,
} from '../reducers/channelsSlice.js';
import webSocketContext from '../webSocketContext.js';
import useAuth from '../useAuth.js';

const ChatWindow = () => {
  // const rollbar = useRollbar();

  const webSocket = useContext(webSocketContext);
  const authInfo = useAuth();
  const inputRef = useRef();
  const endElement = useRef();
  const { t } = useTranslation();

  const messages = useSelector(selectAllMessages);

  const currentChannelId = useSelector(selectCurrentChannelId);
  const currentChannel = useSelector(selectCurrentChannel);

  const messagesForActiveChannel = messages
    ?.filter((message) => message.channelId === currentChannelId);

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
      <div className="mb-4 p-3 border-bottom">
        <h6 className="m-0">
          <b>{t('chatWindow.title', { channelName: name })}</b>
        </h6>
        <span className="text-muted small">
          {t('chatWindow.messageCount.counter', { count: messagesForActiveChannel.length })}
        </span>
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

        if (newMessage.body === 'ктулху фхтагн') {
          // rollbar.log("It's hello");
          // rollbar.error('unacceptable message');
          throw new Error();
        }

        webSocket.sendMessage(newMessage);
        formik.resetForm();
        inputRef.current.focus();
      },
    });

    return (
      <Form
        className="border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <InputGroup>
          <FormControl
            className="border-0 p-0 pl-2"
            name="message"
            id="message"
            placeholder={t('chatWindow.messagePlaceholder')}
            ref={inputRef}
            value={formik.values.message}
            onChange={formik.handleChange}
            aria-label="message"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button
              variant={false}
              className="py-1 px-3 text-secondary"
              type="submit"
              disabled={!formik.dirty}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
              <span className="d-none">Отправить</span>
            </Button>
          </InputGroup.Append>
        </InputGroup>
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

/* <Button
              variant="primary"
              type="submit"
              disabled={!formik.dirty}
            >
              {t('chatWindow.sendButton')}
            </Button> */
