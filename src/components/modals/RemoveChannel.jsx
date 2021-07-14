import React, { useContext } from 'react';
import {
  Button, Modal,
} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import webSocketContext from '../../webSocketContext.js';
import { closeModal } from '../../reducers/modalSlice.js';

const RemoveChannel = () => {
  const modalInfo = useSelector((state) => state.modalInfo);
  const { isOpen, info } = modalInfo;

  const dispatch = useDispatch();
  const webSocket = useContext(webSocketContext);

  const confirmRemoving = () => {
    webSocket.removeChannel(info);
    dispatch(closeModal());
  };

  return (
    <Modal
      show={isOpen}
      onHide={() => dispatch(closeModal())}
    >
      <Modal.Header>
        <Modal.Title>Удалить канал</Modal.Title>
        <Button className="close" onClick={() => dispatch(closeModal())}>
          x
        </Button>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant="outline-secondary mr-2" onClick={() => dispatch(closeModal())}>
            Отменить
          </Button>
          <Button variant="outline-danger" onClick={() => confirmRemoving()}>
            Отправить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
