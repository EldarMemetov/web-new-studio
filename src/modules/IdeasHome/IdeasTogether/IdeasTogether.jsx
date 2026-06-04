'use client';

import { useEffect, useRef } from 'react';
import styles from './IdeasTogether.module.scss';

export default function IdeasTogether({ data }) {
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.in);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.together} ref={ref}>
      <div className={styles.text}>
        <p className={styles.label}>{data.label}</p>
        <h3 className={styles.title}>
          {data.title}
          <span>{data.titleHighlight}</span>
        </h3>
        <p className={styles.desc}>{data.description}</p>
      </div>
      <ul className={styles.perks}>
        {data.perks.map((perk, i) => (
          <li key={i} className={styles.perk}>
            {perk}
          </li>
        ))}
      </ul>
    </div>
  );
}
