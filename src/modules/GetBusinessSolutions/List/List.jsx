import Item from '../Item/Item';
import styles from './List.module.scss';

export default function List({ items }) {
  return (
    <ul className={styles.containerList}>
      {items.map((item, index) => (
        <Item
          key={index}
          title={item.title}
          description={item.description}
          iconName={item.icon}
        />
      ))}
    </ul>
  );
}
