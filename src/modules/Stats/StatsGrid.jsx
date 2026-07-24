'use client';

import { useEffect, useRef, useState } from 'react';
import s from './Stats.module.scss';

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function StatValue({ value, active }) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const [display, setDisplay] = useState(match ? `0${match[2] || ''}` : value);

  useEffect(() => {
    if (!match || !active) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2] || '';
    const duration = 1500;
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(target * eased) + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  return (
    <span className={`${s.value} ${match ? '' : s.valueText}`}>
      {match ? display : value}
    </span>
  );
}

export default function StatsGrid({ items }) {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <ul className={s.grid} ref={ref}>
      {items.map((item, i) => (
        <li
          key={i}
          className={`${s.card} ${inView ? s.visible : ''}`}
          style={{ '--i': i }}
        >
          <div className={s.cardTop}>
            <span className={s.index}>{String(i + 1).padStart(2, '0')}</span>
            <span className={s.plus} />
          </div>

          <StatValue value={item.value} active={inView} />
          <span className={s.label}>{item.label}</span>

          <span className={s.glow} />
        </li>
      ))}
    </ul>
  );
}
