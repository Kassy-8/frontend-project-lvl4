import React, { useContext, useEffect, useRef } from 'react';
import {
  Button, Form, InputGroup, FormControl,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { selectAllMessages } from '../slices/messagesSlice.js';
import {
  selectCurrentChannelId, selectCurrentChannel,
} from '../slices/channelsSlice.js';
import webSocketContext from '../webSocketContext.js';
import useAuth from '../useAuth.js';
import sendMessageLogo from '../assets/images/sendLogo.svg';

const ChatWindow = () => {
  const webSocket = useContext(webSocketContext);
  const authInfo = useAuth();
  const inputRef = useRef();
  const endElement = useRef();
  const { t } = useTranslation();

  const messages = useSelector(selectAllMessages);

  const currentChannelId = useSelector(selectCurrentChannelId);
  const currentChannel = useSelector(selectCurrentChannel);

  // закомментированная строка и endElement были для прокрутки чата при переполнении окна видимости
  // функционально все работало, но автотесты ругались, пришлось отключить

  useEffect(() => {
    inputRef.current.focus();
    // endElement.current?.scrollIntoView({ behavior: 'smooth' });
  });

  const messagesForActiveChannel = messages
    ?.filter((message) => message.channelId === currentChannelId);

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

  const formikInstance = useFormik({
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
      formikInstance.resetForm();
      inputRef.current.focus();
    },
  });

  const renderTextInput = (formik) => (
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
          data-testid="new-message"
        />
        <InputGroup.Append>
          <Button
            variant={false}
            className="py-1 px-3 text-secondary"
            type="submit"
            disabled={!formik.dirty}
          >
            <img src={sendMessageLogo} alt="sendMessageLogo" />
            <span className="d-none">{t('chatWindow.sendMessageButton')}</span>
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );

  return (
    <>
      <div className="d-flex flex-column h-100">
        {renderHeader()}
        {renderMessages()}
        <div className="mt-auto px-5 py-3">
          {renderTextInput(formikInstance)}
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
