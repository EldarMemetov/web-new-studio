'use client';
import React, { useState } from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import s from './ReviewsList.module.scss';
import InfiniteScroll from '../../../../shared/InfiniteScroll/InfiniteScroll';
import { useReviews } from '../ReviewsSection/ReviewsSection';
import ReviewsFormModal from '@/modules/ReviewsForm/ReviewsFormModal/ReviewsFormModal';
import Icon from '@/shared/Icon/Icon';
import Container from '@/shared/container/Container';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export default function ReviewsList() {
  const { t } = useTranslation('reviewsList');
  const { reviews } = useReviews();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <section className={s.sectionReviews}>
      <div className={s.backgroundWrapper}>
        <Image
          src="/image/grid.webp"
          alt="background grid"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      <div>
        <Container>
          <div className={s.containerTitle}>
            <h2 className={s.whiteWordLeft}>
              {t('your')}{' '}
              <span className={s.violetWordLeft}>{t('experience')}</span>
            </h2>

            <h2 className={s.whiteWordRight}>
              {t('our')} <span className={s.violetWordRight}>{t('pride')}</span>
            </h2>
          </div>
        </Container>

        <InfiniteScroll speed={40} gradient={false} direction="left">
          <ul className={s.ListReview}>
            {reviews.map((review) => (
              <ReviewItem key={review._id} review={review} />
            ))}
          </ul>
        </InfiniteScroll>

        <Container>
          <div>
            <button onClick={() => setModalOpen(true)} className={s.button}>
              {t('addReview')}
              <Icon iconName="icon-arrow" className={s.icon} />
            </button>
          </div>
        </Container>

        <ReviewsFormModal
          show={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </section>
  );
}
