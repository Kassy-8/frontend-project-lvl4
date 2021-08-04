import React, { useRef, useEffect, useContext } from 'react';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import webSocketContext from '../../contexts/webSocketContext.js';
import { closeModal } from '../../slices/modalSlice.js';

const RenameChannel = ({ modalInfo, reservedChannelsNames }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const webSocket = useContext(webSocketContext);

  const { isOpen, info: channelInfo } = modalInfo;

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

  const formNode = (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          name="name"
          ref={inputRef}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          data-testid="rename-channel"
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
        <Button
          variant="outline-secondary mr-2"
          onClick={() => dispatch(closeModal())}
        >
          {t('cancelButton')}
        </Button>
        <Button
          variant="outline-primary"
          type="submit"
          disabled={!formik.dirty || formik.isSubmitting}
        >
          {t('sendingButton')}
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
        {formNode}
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
