'use client';
import IdeasPresentsModal from '../IdeasPresentsModal/IdeasPresentsModal';

export default function ModalWrapper({ onClose, show, modalContent }) {
  return (
    <IdeasPresentsModal
      onClose={onClose}
      show={show}
      modalContent={modalContent}
    />
  );
}
