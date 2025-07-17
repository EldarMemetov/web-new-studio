'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Container from '@/shared/container/Container';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import s from './VideoPortfolio.module.scss';
import Image from 'next/image';
import clsx from 'clsx';

export default function VideoPortfolio() {
  const { t } = useTranslation('videoPortfolio');
  const [modalVideo, setModalVideo] = useState(null);
  const videos = t('videos', { returnObjects: true }) || [];

  useEffect(() => {
    if (modalVideo) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [modalVideo]);

  return (
    <section className={s.section}>
      <Container>
        <div className={s.containerContent}>
          <div className={s.containerText}>
            <h2 className={s.title}>
              {t('title')} <span className={s.spanTitle}>{t('titleSpan')}</span>
            </h2>
            <p className={s.description}>
              {t('descriptionOne')}
              <span className={s.spanDescription}>{t('descriptionTwo')}</span>
              {t('descriptionThree')}
            </p>
          </div>
          <div>
            <ul className={s.videoList}>
              {videos.map((video, idx) => (
                <li
                  key={idx}
                  className={clsx(s.videoItem, idx === 2 && s.videoItemThird)}
                  onClick={() => setModalVideo(video.videoUrl)}
                >
                  <Image
                    src={video.thumbnail}
                    alt={`Video thumbnail ${idx + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className={s.image}
                  />
                  <div className={s.playButton}>
                    <Image
                      src="/image/play.png"
                      alt="Play icon"
                      width={100}
                      height={100}
                      className={s.play}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.containerButton}>
            <ScrollButton variant="variant11" targetId="feedback-form">
              {t('cta.text')}
            </ScrollButton>
          </div>
        </div>
      </Container>

      {modalVideo && (
        <div className={s.modalOverlay} onClick={() => setModalVideo(null)}>
          <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <iframe
              src={modalVideo.replace('watch?v=', 'embed/')}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}
