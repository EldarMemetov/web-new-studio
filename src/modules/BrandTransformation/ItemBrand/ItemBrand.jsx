import styles from './ItemBrand.module.scss';
import Icon from '@/shared/Icon/Icon';

export default function ItemBrand({ title, description, iconName }) {
  return (
    <li className={styles.ContainerItem}>
      <Icon
        iconName={iconName}
        className={styles.iconStyle}
        width={160}
        height={103}
      />
      <h3 className={styles.titleInformation}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </li>
  );
}
