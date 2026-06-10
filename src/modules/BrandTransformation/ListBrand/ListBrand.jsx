'use client';

import { useEffect, useRef } from 'react';
import ItemBrand from '../ItemBrand/ItemBrand';
import styles from './ListBrand.module.scss';

export default function ListBrand({ items }) {
  const refs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    );

    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <ul className={styles.ContainerList}>
      {items.map((item, index) => (
        <li
          key={index}
          ref={(el) => (refs.current[index] = el)}
          className={styles.cell}
          style={{ '--delay': `${index * 120}ms` }}
        >
          <ItemBrand
            index={index}
            total={items.length}
            title={item.title}
            description={item.description}
            iconName={item.iconName}
          />
        </li>
      ))}
    </ul>
  );
}
