'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Modal from '@/shared/Modal/Modal';
import s from './ModalFeedback.module.scss';
import { useTranslation } from 'react-i18next';
import Button from '@/shared/components/button/Button';

export default function ModalFeedback({ show, onClose }) {
  const { t } = useTranslation('modalFeedback');

  return (
    <Modal show={show} onClose={onClose} contentClassName={s.myCustomModal}>
      <div className={s.containerContent}>
        <Image
          src="/image/rocket-man.png"
          alt="rocket-man"
          width={563}
          height={586}
          className={s.rocketMan}
        />
        <h2 className={s.title}>{t('title')}</h2>
        <h3 className={s.titleNext}>{t('subtitle')}</h3>
        <Link href="/" className={s.button} onClick={onClose}>
          <Button as="div" variant="variant5">
            {t('button')}
          </Button>
        </Link>
      </div>
    </Modal>
  );
}
