'use client';

import Modal from '@/shared/Modal/Modal';
import s from './IdeasPresentsModal.module.scss';
import LaptopWrite from '../LaptopWrite/LaptopWrite';
import IdeasCamera from '../IdeasCamera/IdeasCamera';
import Icon from '@/shared/Icon/Icon';
import ButtonArrow from '@/shared/components/ButtonArrow/ButtonArrow';
import { ScrollToId } from '@/shared/scrollToId/scrollToId';

export default function IdeasPresentsModal({ onClose, show, modalContent }) {
  const {
    title,
    subtitle,
    subtitleHighlight,
    list,
    ctaTitle,
    ctaSubtitle,
    ctaButton,
  } = modalContent;
  const handleCtaClick = () => {
    onClose?.();
    ScrollToId('feedback-form');
  };
  return (
    <Modal contentClassName={s.myCustomModal} onClose={onClose} show={show}>
      <div className={s.containerContent}>
        <div className={s.containerIcon}>
          <LaptopWrite className={s.laptop} />
          <Icon iconName="icon-plus" className={s.iconPlus} />
          <IdeasCamera className={s.camera} />
        </div>
        <Icon iconName="icon-box" className={s.iconBox} />
        <h2 className={s.modalTitle}>{title}</h2>
        <h3 className={s.modalSubtitle}>
          {subtitle}{' '}
          <span className={s.highlightText}>{subtitleHighlight}</span>
        </h3>
        <ul className={s.modalList}>
          {list.map((text, index) => (
            <li key={index} className={s.modalListItem}>
              <p className={s.text}>{text}</p>
            </li>
          ))}
        </ul>
        <div className={s.buttonAndText}>
          <h4 className={s.ctaText}>
            <span className={s.ctaTextSpan}>{ctaTitle}</span> {ctaSubtitle}
          </h4>
          <h4 className={s.nextTextAnd}>{ctaButton}</h4>
          <ButtonArrow onClick={handleCtaClick} />
        </div>
      </div>
    </Modal>
  );
}
