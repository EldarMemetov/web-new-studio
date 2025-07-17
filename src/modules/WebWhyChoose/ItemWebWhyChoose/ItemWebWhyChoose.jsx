import Icon from '@/shared/Icon/Icon';
import s from './ItemWebWhyChoose.module.scss';

export default function ItemWebWhyChoose({ icon, title, text }) {
  return (
    <li className={s.list}>
      <div className={s.iconContainer}>
        <Icon iconName={icon} className={s.icon} />
      </div>
      <div>
        <h3 className={s.info}>{title}</h3>
        <p className={s.infoTitle}>{text}</p>
      </div>
    </li>
  );
}
