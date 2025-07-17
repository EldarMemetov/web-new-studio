import ItemWebWhyChoose from '../ItemWebWhyChoose/ItemWebWhyChoose';
import s from './ListWebWhyChoose.module.scss';
export default function ListWebWhyChoose({ items }) {
  return (
    <ul className={s.listContainer}>
      {items.map((item, index) => (
        <ItemWebWhyChoose
          key={index}
          icon={item.icon}
          title={item.title}
          text={item.text}
        />
      ))}
    </ul>
  );
}
