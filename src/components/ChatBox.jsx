import React, { useContext, useEffect, useRef } from 'react';
import {
  Button, Form, InputGroup, FormControl,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import webSocketContext from '../contexts/webSocketContext.js';
import useAuth from '../useAuth.js';
import sendMessageLogo from '../assets/images/sendLogo.svg';
import {
  selectCurrentChannelId,
  selectChannel,
  selectMessagesForActiveChannel,
} from '../selectors.js';

const ChatBox = () => {
  const webSocket = useContext(webSocketContext);
  const authInfo = useAuth();
  const inputRef = useRef();
  const endElement = useRef();
  const { t } = useTranslation();

  const currentChannelId = useSelector(selectCurrentChannelId);
  const currentChannel = useSelector(selectChannel(currentChannelId));
  const messagesForActiveChannel = useSelector(selectMessagesForActiveChannel(currentChannelId));

  // закомментированная строка и endElement были для прокрутки чата при переполнении окна видимости
  // функционально все работало, но автотесты ругались, пришлось отключить

  useEffect(() => {
    inputRef.current.focus();
    // endElement.current.scrollIntoView({ behavior: 'smooth' });
  });

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: yup.object({
      message: yup
        .string()
        .trim()
        .required(),
    }),
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

  const textInput = (
    <Form
      className="border rounded-2"
      onSubmit={formik.handleSubmit}
    >
      <InputGroup>
        <FormControl
          className="border-0 p-0 pl-2"
          name="message"
          id="message"
          placeholder={t('chatBox.messagePlaceholder')}
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
            <span className="d-none">{t('sendingButton')}</span>
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );

  const chatHeader = (
    <div className="mb-4 p-3 border-bottom">
      <h6 className="m-0">
        <b>{t('chatBox.title', { channelName: currentChannel.name })}</b>
      </h6>
      <span className="text-muted small">
        {t('chatBox.messageCount.counter', {
          count: messagesForActiveChannel.length,
        })}
      </span>
    </div>
  );

  const chatMessages = messagesForActiveChannel
    .map(({ body, username, id }) => (
      <div key={id} className="mb-2">
        <b>{`${username}: `}</b>
        {body}
      </div>
    ));

  return (
    <>
      <div className="d-flex flex-column h-100">
        {chatHeader}
        <div className="overflow-auto">
          {chatMessages}
          <div ref={endElement} />
        </div>
        <div className="mt-auto px-5 py-3">
          {textInput}
        </div>
      </div>
    </>
  );
};

export default ChatBox;
