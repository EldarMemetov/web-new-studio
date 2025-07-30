'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import s from './VideoImgSection.module.scss';

export default function VideoImgSection() {
  const [modalVideo, setModalVideo] = useState(null);

  const videoUrl = 'https://www.youtube.com/watch?v=s46RHRKR39A';

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
    <div className={s.section}>
      <div className={s.containerContent}>
        <div className={s.videoWrapper} onClick={() => setModalVideo(videoUrl)}>
          <Image
            src="/image/video/showreel.jpg"
            alt="QVRIX showreel"
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            style={{ objectFit: 'cover' }}
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
        </div>
      </div>

      {modalVideo && (
        <div className={s.modalOverlay} onClick={() => setModalVideo(null)}>
          <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <iframe
              src={modalVideo.replace('watch?v=', 'embed/')}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
