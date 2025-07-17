import Icon from '@/shared/Icon/Icon';
import s from './IdeasCamera.module.scss';

export default function IdeasCamera({ className }) {
  const combinedClassName = `${s.iconWrapper} ${className ? className : ''}`;

  return (
    <div className={combinedClassName}>
      <Icon iconName="icon-cinema" className={s.icon} />
      <Icon iconName="icon-cinema-next" className={s.iconNext} />
    </div>
  );
}
