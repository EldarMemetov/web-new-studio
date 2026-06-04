import ButtonArrow from '@/shared/components/ButtonArrow/ButtonArrow';
import { ROUTES } from '@/shared/constants';
import styles from './IdeasItem.module.scss';

const routeMap = {
  LaptopWrite: ROUTES.DEVELOPMENT,
  'icon-cinema': ROUTES.VIDEOGRAPHY,
};

const iconMap = {
  LaptopWrite: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(150,36,226,.9)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  'icon-cinema': (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(150,36,226,.9)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  ),
};

export default function IdeasItem({ title, description, icon, list, cta }) {
  const href = routeMap[icon] ? `/${routeMap[icon]}` : '/';

  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <div className={styles.iconWrap}>{iconMap[icon]}</div>
        <div>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardSubdesc}>{description}</p>
        </div>
      </div>

      <div className={styles.tags}>
        {list.map((tag, i) => (
          <span key={i} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.cardFooter}>
        <p className={styles.cta}>{cta}</p>
        <ButtonArrow href={href} ariaLabel={`Перейти у розділ ${title}`} />
      </div>
    </div>
  );
}
