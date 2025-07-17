import Icon from '@/shared/Icon/Icon';
import ButtonArrow from '@/shared/components/ButtonArrow/ButtonArrow';
import LaptopWrite from '../LaptopWrite/LaptopWrite';
import IdeasCamera from '../IdeasCamera/IdeasCamera';
import { ROUTES } from '@/shared/constants';
import styles from './IdeasItem.module.scss';
import clsx from 'clsx';

const routeMap = {
  LaptopWrite: ROUTES.DEVELOPMENT,
  'icon-cinema': ROUTES.VIDEOGRAPHY,
};

export default function IdeasItem({ title, description, icon, list, cta }) {
  const ContentIcon = (() => {
    if (icon === 'LaptopWrite') return <LaptopWrite />;
    if (icon === 'icon-cinema') return <IdeasCamera />;
    return <Icon iconName={icon} className={styles.icon} />;
  })();

  const listClassName = clsx(styles.features, {
    [styles.featuresWeb]: icon === 'LaptopWrite',
    [styles.featuresVideo]: icon === 'icon-cinema',
  });

  const href = routeMap[icon] ? `/${routeMap[icon]}` : '/';

  return (
    <li className={styles.item}>
      <div className={styles.containerContent}>
        <div className={styles.header}>{ContentIcon}</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <ul className={listClassName}>
          {list.map((el, i) => {
            const itemClassName = clsx(styles.featureItem, {
              [styles.featureItemWeb]: icon === 'LaptopWrite',
              [styles.featureItemVideo]: icon === 'icon-cinema',
            });

            return (
              <li key={i} className={itemClassName}>
                <p className={styles.listItem}>{el}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.ContainerClick}>
        <p className={styles.cta}>{cta}</p>
        <ButtonArrow href={href} ariaLabel={`Перейти у розділ ${title}`} />
      </div>
    </li>
  );
}
