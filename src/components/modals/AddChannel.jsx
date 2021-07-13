import React, { useRef, useEffect, useContext } from 'react';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import webSocketContext from '../../webSocketContext.js';
import { closeModal } from '../../reducers/modalSlice.js';

const AddChannel = () => {
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
    onSubmit,
  });

  const renderForm = () => (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          data-testid="input-body"
          name="name"
          ref={inputRef}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
      </Form.Group>
      <Button variant="outline-secondary" onClick={() => dispatch(closeModal())}>
        Отменить
      </Button>
      <Button variant="outline-primary" type="submit" disabled={!formik.dirty}>
        Отправить
      </Button>
    </Form>
  );

  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderForm()}
      </Modal.Body>
    </Modal.Dialog>
  );
};

export default AddChannel;
