'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import s from './VideoShowcase.module.scss';

const VIDEOS = [
  { src: '/video/show.mp4', label: '01', tagKey: 'tags.conference' },
  { src: '/video/show.mp4', label: '02', tagKey: 'tags.medicine' },
  { src: '/video/show.mp4', label: '03', tagKey: 'tags.advertising' },
  { src: '/video/show.mp4', label: '04', tagKey: 'tags.event' },
  { src: '/video/show.mp4', label: '05', tagKey: 'tags.brand' },
  { src: '/video/show.mp4', label: '06', tagKey: 'tags.product' },
];

const INTERVAL = 3000;

export default function VideoShowcase() {
  const { t } = useTranslation('videoPortfolio');
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRefs = useRef([]);
  const total = VIDEOS.length;

  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (!v) return;
      v.muted = true;
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % total);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [paused, total]);

  useEffect(() => {
    const v = videoRefs.current[active];
    if (!v) return;
    try {
      v.currentTime = 0;
    } catch (_) {}
    const p = v.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }, [active]);

  const tagText = t(VIDEOS[active].tagKey);

  return (
    <div
      className={s.frame}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      data-paused={paused ? 'true' : 'false'}
    >
      <div className={s.stage}>
        {VIDEOS.map((v, i) => (
          <div
            key={i}
            className={`${s.slide} ${i === active ? s.active : ''}`}
            aria-hidden={i !== active}
          >
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              src={v.src}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
            />
            <span className={s.gradient} aria-hidden="true" />
          </div>
        ))}

        <div className={s.tagWrap} key={`tag-${active}`}>
          <span className={s.tagDot} aria-hidden="true" />
          <span className={s.tagText}>{tagText}</span>
        </div>

        <div className={s.counter}>
          <span className={s.counterCurrent} key={`num-${active}`}>
            {VIDEOS[active].label}
          </span>
          <span className={s.counterDivider}>/</span>
          <span className={s.counterTotal}>
            {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className={s.progress} aria-hidden="true">
        <div className={s.progressBar} key={`bar-${active}-${paused}`} />
      </div>

      <div className={s.dots} role="tablist" aria-label="Video slides">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`${s.dot} ${i === active ? s.dotActive : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
