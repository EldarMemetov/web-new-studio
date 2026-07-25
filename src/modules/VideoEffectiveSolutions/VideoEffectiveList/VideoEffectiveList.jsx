'use client';

import { useState, useRef, useEffect } from 'react';
import s from './VideoEffectiveList.module.scss';
import {
  FiMusic,
  FiCamera,
  FiMic,
  FiUsers,
  FiHeart,
  FiFilm,
  FiGift,
  FiArrowRight,
} from 'react-icons/fi';

const MEDIA_MAP = {
  music: { video: '/video/music.mp4', Icon: FiMusic },
  fashion: { video: '/video/fashion.mp4', Icon: FiCamera },
  podcasts: { video: '/video/podcasts.mp4', Icon: FiMic },
  conference: { video: '/video/conference.mp4', Icon: FiUsers },
  medicine: { video: '/video/medicine.mp4', Icon: FiHeart },
  film: { video: '/video/film.mp4', Icon: FiFilm },
  wedding: { video: '/video/wedding.mp4', Icon: FiGift },
};

export default function VideoEffectiveList({ items }) {
  const [active, setActive] = useState(0);
  const videoRef = useRef(null);

  const current = items?.[active];
  const media = current ? MEDIA_MAP[current.id] || {} : {};

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !media.video) return;

    // Останавливаем предыдущее видео и сбрасываем
    v.pause();
    v.removeAttribute('src');
    v.load();

    // Ставим новый источник
    v.src = media.video;
    v.load();

    const onCanPlay = () => v.play().catch(() => {});
    v.addEventListener('canplay', onCanPlay, { once: true });

    return () => {
      v.removeEventListener('canplay', onCanPlay);
    };
  }, [media.video]);

  if (!items?.length || !current) return null;

  const Icon = media.Icon || FiFilm;

  return (
    <div className={s.showcase}>
      {/* СЦЕНА С ВИДЕО */}
      <div className={s.stage}>
        <video
          ref={videoRef}
          className={s.stageVideo}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />

        <span className={s.stageGlow} aria-hidden="true" />

        <span className={s.stageGhost}>
          {String(active + 1).padStart(2, '0')}
        </span>

        <div className={s.stageContent}>
          <span className={s.stageIcon}>
            <Icon />
          </span>
          <h3 className={s.stageTitle}>{current.title}</h3>
          <p className={s.stageText}>{current.info}</p>
        </div>
      </div>

      {/* СПИСОК — только клик */}
      <ul className={s.menu}>
        {items.map((item, i) => {
          const ItemMedia = MEDIA_MAP[item.id] || {};
          const ItemIcon = ItemMedia.Icon || FiFilm;
          const isActive = i === active;
          return (
            <li key={item.id}>
              <button
                type="button"
                className={`${s.menuItem} ${isActive ? s.active : ''}`}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
              >
                <span className={s.menuNum}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={s.menuIcon}>
                  <ItemIcon />
                </span>
                <span className={s.menuTitle}>{item.title}</span>
                <FiArrowRight className={s.menuArrow} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
