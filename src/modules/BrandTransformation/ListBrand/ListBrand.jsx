import ItemBrand from '../ItemBrand/ItemBrand';
import styles from './ListBrand.module.scss';
export default function ListBrand({ items }) {
  return (
    <ul className={styles.ContainerList}>
      {items.map((item, index) => (
        <ItemBrand
          key={index}
          title={item.title}
          description={item.description}
          iconName={item.iconName}
        />
      ))}
    </ul>
  );
}
