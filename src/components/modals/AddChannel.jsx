import React, { useRef, useEffect, useContext } from 'react';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import webSocketContext from '../../webSocketContext.js';
import { closeModal } from '../../slices/modalSlice.js';
import {
  selectAllChannels,
} from '../../slices/channelsSlice.js';

const AddChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const webSocket = useContext(webSocketContext);

  const channels = useSelector(selectAllChannels);
  const reservedChannelsNames = channels.map(({ name }) => name);

  const modalInfo = useSelector((state) => state.modalInfo);
  const { isOpen } = modalInfo;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onSubmit = async (values) => {
    const newChannel = {
      name: values.name,
    };
    await webSocket.addNewChannel(newChannel);
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.mixed().notOneOf(reservedChannelsNames, t('modalAddChannel.validation.noMatchName')),
    }),
    onSubmit,
  });

  const renderForm = () => (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          name="name"
          ref={inputRef}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          data-testid="add-channel"
          isInvalid={
            (formik.touched.name && formik.errors.name)
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
          {t('modalAddChannel.cancelButton')}
        </Button>
        <Button variant="outline-primary" type="submit" disabled={!formik.dirty || formik.isSubmitting}>
          {t('modalAddChannel.sendButton')}
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
        <Modal.Title>{t('modalAddChannel.title')}</Modal.Title>
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

export default AddChannel;
