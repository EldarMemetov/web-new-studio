'use client';

import { useEffect, useRef } from 'react';
import IdeasItem from '../IdeasItem/IdeasItem';
import styles from './IdeasList.module.scss';

export default function IdeasList({ items }) {
  const refs = useRef([]);

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
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <li
          key={index}
          ref={(el) => (refs.current[index] = el)}
          className={styles.item}
          style={{ transitionDelay: `${0.15 * index}s` }}
        >
          <IdeasItem
            title={item.title}
            description={item.description}
            icon={item.icon}
            list={item.list}
            cta={item.cta}
          />
        </li>
      ))}
    </ul>
  );
}
