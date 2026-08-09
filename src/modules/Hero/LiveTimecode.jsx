'use client';

import { useEffect, useState } from 'react';
import s from './Hero.module.scss';

function formatTimecode(totalSeconds) {
  const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const ss = String(totalSeconds % 60).padStart(2, '0');
  return `${hh}:${mm}:${ss}:00`;
}

export default function LiveTimecode({ initialSeconds = 1 }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return undefined;

    const id = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <div className={s.timecode}>{formatTimecode(seconds)}</div>;
}
