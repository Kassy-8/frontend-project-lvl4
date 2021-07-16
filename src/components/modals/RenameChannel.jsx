import React, { useRef, useEffect, useContext } from 'react';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import webSocketContext from '../../webSocketContext.js';
import { closeModal } from '../../reducers/modalSlice.js';
import {
  selectAllChannels,
} from '../../reducers/channelsSlice.js';

const RenameChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const webSocket = useContext(webSocketContext);

  const channels = useSelector(selectAllChannels);
  const reservedChannelsNames = channels.map(({ name }) => name);

  const modalInfo = useSelector((state) => state.modalInfo);
  const { isOpen, info: channelInfo } = modalInfo;

  // не поняла, почему чтобы выделить текст, useEffect д/н запуститься дважды:(
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, [inputRef.current]);

  const onSubmit = (values) => {
    const updatedChannel = {
      id: channelInfo.id,
      name: values.name,
    };
    webSocket.renameChannel(updatedChannel);
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: {
      name: channelInfo.name,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: yup.object({
      name: yup.mixed().notOneOf(reservedChannelsNames, t('modalRenameChannel.validation.noMatchName')),
    }),
    onSubmit,
  });

  const renderForm = () => (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          data-testid="input-body"
          name="name"
          ref={inputRef}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          isInvalid={
            (formik.errors.name)
          }
        />
        <Form.Control.Feedback
          type="invalid"
        >
          {formik.errors.name}
        </Form.Control.Feedback>
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button variant="outline-secondary mr-2" onClick={() => dispatch(closeModal())}>
          {t('modalRenameChannel.cancelButton')}
        </Button>
        <Button variant="outline-primary" type="submit" disabled={!formik.dirty}>
          {t('modalRenameChannel.sendButton')}
        </Button>
      </div>
    </Form>
  );
  return (
    <Modal
      show={isOpen}
      onHide={() => dispatch(closeModal())}
      centered
    >
      <Modal.Header>
        <Modal.Title>{t('modalRenameChannel.title')}</Modal.Title>
        <Button className="close" onClick={() => dispatch(closeModal())}>
          x
        </Button>
      </Modal.Header>
      <Modal.Body>
        {renderForm()}
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
