'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Icon from '@/shared/Icon/Icon';
import styles from './Item.module.scss';

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Item({ title, description, iconName, index }) {
  const ref = useRef(null);

  // позиция мыши внутри карточки (0..1)
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  // плавные «спринги» для тилта
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });

  // тилт по осям (макс ±6deg)
  const rotateY = useTransform(sx, [0, 1], [-6, 6]);
  const rotateX = useTransform(sy, [0, 1], [6, -6]);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px);
    my.set(py);
    // переменные CSS для spotlight
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };

  const handleMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.li
      ref={ref}
      className={styles.itemList}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      <div className={styles.spotlight} aria-hidden="true" />
      <div className={styles.border} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.head}>
          {iconName && <Icon iconName={iconName} className={styles.icon} />}
          <h3 className={styles.title}>{title}</h3>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </motion.li>
  );
}
