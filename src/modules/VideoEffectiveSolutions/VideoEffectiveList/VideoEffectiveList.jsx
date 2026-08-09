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

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const cldVideo = (id) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto:video,q_auto,w_1280/${id}.mp4`;

const cldPoster = (id) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_0,f_auto,q_auto,w_960,c_fill/${id}.jpg`;

const MEDIA_MAP = {
  music: { publicId: 'music_u2wcqp', Icon: FiMusic },
  fashion: { publicId: 'fashion_mg5ai1', Icon: FiCamera },
  podcasts: { publicId: 'podcasts_rlz4m7', Icon: FiMic },
  conference: { publicId: 'conference_isl6vh', Icon: FiUsers },
  medicine: { publicId: 'medicine_dvdh6t', Icon: FiHeart },
  film: { publicId: 'film_cb6jvd', Icon: FiFilm },
  wedding: { publicId: 'wedding_e1zsay', Icon: FiGift },
};

export default function VideoEffectiveList({ items }) {
  const [active, setActive] = useState(0);
  const videoRef = useRef(null);

  const current = items?.[active];
  const media = current ? MEDIA_MAP[current.id] || {} : {};
  const videoUrl = media.publicId ? cldVideo(media.publicId) : '';
  const posterUrl = media.publicId ? cldPoster(media.publicId) : '';

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoUrl) return;

    v.pause();
    v.removeAttribute('src');
    v.load();

    v.src = videoUrl;
    v.load();

    const onCanPlay = () => v.play().catch(() => {});
    v.addEventListener('canplay', onCanPlay, { once: true });

    return () => {
      v.removeEventListener('canplay', onCanPlay);
    };
  }, [videoUrl]);

  if (!items?.length || !current) return null;

  const Icon = media.Icon || FiFilm;

  return (
    <div className={s.showcase}>
      <div className={s.stage}>
        <div className={s.videoBox}>
          <video
            ref={videoRef}
            className={s.stageVideo}
            poster={posterUrl}
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
        </div>

        <div className={s.stageContent}>
          <span className={s.stageIcon}>
            <Icon />
          </span>
          <h3 className={s.stageTitle}>{current.title}</h3>
          <p className={s.stageText}>{current.info}</p>
        </div>
      </div>

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
