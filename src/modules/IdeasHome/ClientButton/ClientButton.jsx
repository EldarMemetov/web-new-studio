'use client';

import { useState } from 'react';
import Button from '@/shared/components/button/Button';
import Icon from '@/shared/Icon/Icon';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import s from './ClientButton.module.scss';

export default function ClientButton({ buttonText, modalContent }) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Button
        variant="variant2"
        className={s.buttonPresents}
        spanClassName={s.buttonSpan}
        onClick={handleOpenModal}
      >
        <Icon iconName="icon-present" className={s.iconPresents} />
        {buttonText}
      </Button>

      {showModal && (
        <ModalWrapper
          onClose={handleCloseModal}
          show={showModal}
          modalContent={modalContent}
        />
      )}
    </>
  );
}
