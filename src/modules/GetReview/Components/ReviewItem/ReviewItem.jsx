import IconGradient from '@/shared/IconGradient/IconGradient';
import s from './ReviewItem.module.scss';

export default function ReviewItem({ review }) {
  const { name, text, email, rating = 0 } = review;

  return (
    <li className={s.listItem}>
      <p className={s.review}>{text}</p>
      <div className={s.containerTextAndIcon}>
        <div className={s.emailAndText}>
          <h2 className={s.name}>{name}</h2>
          <p className={s.email}>{email}</p>
        </div>
        <div className={s.stars}>
          {Array.from({ length: 5 }, (_, i) => {
            const filled = i < rating;
            return (
              <IconGradient
                key={i}
                iconName={filled ? 'icon-star-filled' : 'icon-star-outline'}
                className={filled ? s.filled : s.outline}
              />
            );
          })}
        </div>
      </div>
    </li>
  );
}
