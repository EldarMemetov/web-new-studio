'use client';
import s from './ReviewsFormModal.module.scss';
import Modal from '@/shared/Modal/Modal';
import ReviewsFormContent from '../ReviewsForm';
import { useState } from 'react';
import SuccessContent from '../SuccessContent/SuccessContent';

export default function ReviewsFormModal({ show, onClose }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

  const handleClose = () => {
    setShouldReset(true);
    onClose();
  };

  const handleAfterClose = () => {
    if (shouldReset) {
      setIsSubmitted(false);
      setShouldReset(false);
    }
  };

  return (
    <Modal
      show={show}
      onClose={handleClose}
      onAfterClose={handleAfterClose}
      contentClassName={s.myCustomModal}
    >
      {isSubmitted ? (
        <SuccessContent onClose={handleClose} />
      ) : (
        <ReviewsFormContent onSuccess={() => setIsSubmitted(true)} />
      )}
    </Modal>
  );
}
