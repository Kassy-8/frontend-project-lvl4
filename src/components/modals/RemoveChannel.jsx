import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import webSocketContext from '../../webSocketContext.js';
import { closeModal } from '../../reducers/modalSlice.js';

const RemoveChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const webSocket = useContext(webSocketContext);

  const modalInfo = useSelector((state) => state.modalInfo);
  const { isOpen, info } = modalInfo;

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
        <Modal.Title>{t('modalRemoveChannel.title')}</Modal.Title>
        <Button className="close" onClick={() => dispatch(closeModal())}>
          x
        </Button>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modalRemoveChannel.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="outline-secondary mr-2" onClick={() => dispatch(closeModal())}>
            {t('modalRemoveChannel.cancelButton')}
          </Button>
          <Button variant="outline-danger" onClick={() => confirmRemoving()}>
            {t('modalRemoveChannel.sendButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
