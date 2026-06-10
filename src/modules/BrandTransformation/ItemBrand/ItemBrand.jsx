'use client';

import { useRef } from 'react';
import styles from './ItemBrand.module.scss';
import Icon from '@/shared/Icon/Icon';

export default function ItemBrand({
  title,
  description,
  iconName,
  index = 0,
  total = 0,
}) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
    el.style.setProperty('--my', `${(y / rect.height) * 100}%`);
  };

  return (
    <article
      ref={ref}
      className={styles.ContainerItem}
      onMouseMove={handleMove}
    >
      <span className={styles.spotlight} aria-hidden="true" />
      <span className={styles.corner} aria-hidden="true" />
      <span className={styles.cornerBR} aria-hidden="true" />

      <div className={styles.head}>
        <span className={styles.index}>
          {String(index + 1).padStart(2, '0')}
          <span className={styles.indexSep}>/</span>
          {String(total).padStart(2, '0')}
        </span>
        <span className={styles.dotRow} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </div>

      <div className={styles.iconWrap}>
        <span className={styles.iconHalo} aria-hidden="true" />
        <span className={styles.iconRing} aria-hidden="true" />
        <Icon
          iconName={iconName}
          className={styles.iconStyle}
          width={132}
          height={132}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.titleInformation}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      <span className={styles.bottomLine} aria-hidden="true" />
    </article>
  );
}
