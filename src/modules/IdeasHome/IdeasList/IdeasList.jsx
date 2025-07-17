import IdeasItem from '../IdeasItem/IdeasItem';
import styles from './IdeasList.module.scss';

export default function IdeasList({ items }) {
  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <IdeasItem
          key={index}
          title={item.title}
          description={item.description}
          icon={item.icon}
          list={item.list}
          cta={item.cta}
        />
      ))}
    </ul>
  );
}
