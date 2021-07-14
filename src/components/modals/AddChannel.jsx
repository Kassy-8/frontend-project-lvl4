import React, { useRef, useEffect, useContext } from 'react';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import webSocketContext from '../../webSocketContext.js';
import { closeModal } from '../../reducers/modalSlice.js';
import {
  selectAllChannels,
} from '../../reducers/channelsSlice.js';

const AddChannel = () => {
  const channels = useSelector(selectAllChannels);
  const channelsNames = channels.map(({ name }) => name);

  const modalInfo = useSelector((state) => state.modalInfo);
  const { isOpen } = modalInfo;

  const dispatch = useDispatch();
  const inputRef = useRef();
  const webSocket = useContext(webSocketContext);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onSubmit = (values) => {
    const newChannel = {
      name: values.name,
    };
    webSocket.addNewChannel(newChannel);
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.mixed().notOneOf(channelsNames, 'Такой канал уже существует'),
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
          Отменить
        </Button>
        <Button variant="outline-primary" type="submit" disabled={!formik.dirty}>
          Отправить
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
        <Modal.Title>Добавить канал</Modal.Title>
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
