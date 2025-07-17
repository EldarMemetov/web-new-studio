import s from './ItemOrDevelopment.module.scss';
export default function ItemOrDevelopment({ text, className = '' }) {
  return (
    <li className={className}>
      <p className={s.text}>{text}</p>
    </li>
  );
}
