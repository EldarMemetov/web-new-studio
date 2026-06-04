'use client';

import { motion } from 'framer-motion';
import Item from '../Item/Item';
import styles from './List.module.scss';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function List({ items }) {
  return (
    <motion.ul
      className={styles.containerList}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {items.map((item, index) => (
        <Item
          key={index}
          index={index}
          title={item.title}
          description={item.description}
          iconName={item.icon}
        />
      ))}
    </motion.ul>
  );
}
