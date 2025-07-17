import Link from 'next/link';
import Icon from '@/shared/Icon/Icon';
import styles from './ButtonArrow.module.scss';

const ButtonArrow = ({
  href,
  onClick,
  className = '',
  ariaLabel = 'Перейти',
}) => {
  const classes = `${styles.button} ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        <Icon iconName="icon-arrow" className={styles.arrow} />
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} aria-label={ariaLabel}>
      <Icon iconName="icon-arrow" className={styles.arrow} />
    </button>
  );
};

export default ButtonArrow;
