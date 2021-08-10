import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import webSocketContext from '../../contexts/webSocketContext.js';
import { closeModal } from '../../slices/modalSlice.js';

const RemoveChannel = ({ modalInfo }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const webSocket = useContext(webSocketContext);

  const { isOpen, extra } = modalInfo;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const confirmRemoving = () => {
    setIsSubmitting(true);
    webSocket.removeChannel(extra);
    setIsSubmitting(false);
  };

  return (
    <Modal show={isOpen} onHide={() => dispatch(closeModal())}>
      <Modal.Header>
        <Modal.Title>{t('modalRemoveChannel.title')}</Modal.Title>
        <Button className="close" onClick={() => dispatch(closeModal())}>
          x
        </Button>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modalRemoveChannel.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button
            variant="outline-secondary mr-2"
            onClick={() => dispatch(closeModal())}
          >
            {t('cancelButton')}
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => confirmRemoving()}
            disabled={isSubmitting}
          >
            {t('sendingButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
