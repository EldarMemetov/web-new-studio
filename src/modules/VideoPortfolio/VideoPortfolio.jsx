'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Container from '@/shared/container/Container';
import s from './VideoPortfolio.module.scss';

const VIDEOS = [
  { src: '/video/show.mp4', label: '01', tagKey: 'tags.conference' },
  { src: '/video/show.mp4', label: '02', tagKey: 'tags.medicine' },
  { src: '/video/show.mp4', label: '03', tagKey: 'tags.advertising' },
  { src: '/video/show.mp4', label: '04', tagKey: 'tags.event' },
  { src: '/video/show.mp4', label: '05', tagKey: 'tags.brand' },
  { src: '/video/show.mp4', label: '06', tagKey: 'tags.product' },
];

export default function VideoPortfolio() {
  const { t } = useTranslation('videoPortfolio');

  const sliderRef = useRef(null);
  const slideRefs = useRef([]);
  const videoRefs = useRef([]);
  const dragRef = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const [pausedIdx, setPausedIdx] = useState(() => new Set());

  // ============== HELPERS ==============
  const getSlideStep = useCallback(() => {
    const first = slideRefs.current[0];
    if (!first) return 0;
    const styles = window.getComputedStyle(first.parentElement);
    const gap = parseFloat(styles.gap) || 12;
    return first.offsetWidth + gap;
  }, []);

  const updateState = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const step = getSlideStep();
    if (!step) return;

    const max = slider.scrollWidth - slider.clientWidth;
    const pct = max > 0 ? slider.scrollLeft / max : 0;

    setProgress(pct);
    setActiveIdx(Math.round(slider.scrollLeft / step));
    setCanPrev(slider.scrollLeft > 4);
    setCanNext(slider.scrollLeft < max - 4);
  }, [getSlideStep]);

  const scrollByStep = (dir) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const step = getSlideStep();
    slider.scrollBy({ left: step * dir, behavior: 'smooth' });
  };

  const scrollToIdx = (idx) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const step = getSlideStep();
    slider.scrollTo({ left: step * idx, behavior: 'smooth' });
  };

  // ============== AUTOPLAY ALL ON MOUNT ==============
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true;
        const p = video.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
    });
  }, []);

  // ============== SLIDER LISTENERS ==============
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    updateState();

    const onScroll = () => updateState();
    slider.addEventListener('scroll', onScroll, { passive: true });

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        if (e.deltaY !== 0) {
          e.preventDefault();
          slider.scrollLeft += e.deltaY;
        }
      }
    };
    slider.addEventListener('wheel', onWheel, { passive: false });

    const onKey = (e) => {
      const rect = slider.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!inView) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollByStep(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollByStep(-1);
      }
    };
    window.addEventListener('keydown', onKey);

    const onMouseDown = (e) => {
      if (e.button !== 0) return;
      dragRef.current = {
        isDown: true,
        startX: e.clientX,
        scrollLeft: slider.scrollLeft,
        moved: false,
      };
      slider.classList.add(s.dragging);
      slider.classList.add(s.grabbing);
    };

    const onMouseMove = (e) => {
      if (!dragRef.current.isDown) return;
      const delta = e.clientX - dragRef.current.startX;
      if (Math.abs(delta) > 4) dragRef.current.moved = true;
      slider.scrollLeft = dragRef.current.scrollLeft - delta * 1.4;
      e.preventDefault();
    };

    const onMouseUp = () => {
      if (!dragRef.current.isDown) return;
      dragRef.current.isDown = false;
      slider.classList.remove(s.grabbing);

      setTimeout(() => {
        slider.classList.remove(s.dragging);

        const step = getSlideStep();
        if (step) {
          const idx = Math.round(slider.scrollLeft / step);
          slider.scrollTo({ left: idx * step, behavior: 'smooth' });
        }
      }, 80);
    };

    slider.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      slider.removeEventListener('scroll', onScroll);
      slider.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      slider.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [updateState, getSlideStep]);

  const handleSlideClick = (index) => {
    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      return;
    }

    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
      setPausedIdx((prev) => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
    } else {
      video.pause();
      setPausedIdx((prev) => {
        const next = new Set(prev);
        next.add(index);
        return next;
      });
    }
  };

  return (
    <section className={s.section}>
      <div className={s.containerContent}>
        <Container>
          <div className={s.containerText}>
            <h2 className={s.title}>
              {t('title')}
              <span className={s.spanTitle}>{t('titleSpan')}</span>
            </h2>
            <p className={s.description}>
              {t('descriptionOne')}
              <span className={s.spanDescription}>{t('descriptionTwo')}</span>
              {t('descriptionThree')}
            </p>
          </div>
        </Container>

        <div className={s.sliderOuter}>
          <div
            className={s.slider}
            ref={sliderRef}
            role="region"
            aria-label={t('a11y.region')}
            tabIndex={0}
          >
            {VIDEOS.map((v, i) => {
              const isPaused = pausedIdx.has(i);
              return (
                <div
                  key={i}
                  className={`${s.slide} ${isPaused ? s.paused : ''}`}
                  ref={(el) => (slideRefs.current[i] = el)}
                  onClick={() => handleSlideClick(i)}
                  style={{ animationDelay: `${i * 90}ms` }}
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

                  <div className={s.overlay} />
                  <div className={s.glow} />

                  <div className={s.tag}>
                    <span className={s.tagDot} />
                    <span className={s.tagText}>{t(v.tagKey)}</span>
                  </div>

                  <span className={s.num}>{v.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <Container>
          <div className={s.controls}>
            <button
              type="button"
              className={s.navBtn}
              onClick={() => scrollByStep(-1)}
              disabled={!canPrev}
              aria-label={t('a11y.prev')}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className={s.centerGroup}>
              <div className={s.progressTrack}>
                <div
                  className={s.progressFill}
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>

              <div className={s.dots}>
                {VIDEOS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`${s.dot} ${i === activeIdx ? s.dotActive : ''}`}
                    onClick={() => scrollToIdx(i)}
                    aria-label={`${t('a11y.slide')} ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              className={s.navBtn}
              onClick={() => scrollByStep(1)}
              disabled={!canNext}
              aria-label={t('a11y.next')}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className={s.igWrap}>
            <Link
              href={t('instagramUrl')}
              target="_blank"
              rel="noopener noreferrer"
              className={s.igLink}
            >
              <span className={s.igIcon}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </span>
              {t('cta.text')}
              <span className={s.igArrow}>↗</span>
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
}
