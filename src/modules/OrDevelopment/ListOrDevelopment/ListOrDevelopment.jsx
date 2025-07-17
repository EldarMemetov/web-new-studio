import React from 'react';
import ItemOrDevelopment from '../ItemOrDevelopment/ItemOrDevelopment';
import s from './ListOrDevelopment.module.scss';
import clsx from 'clsx';
export default function ListOrDevelopment({
  title,
  list,
  subList,
  titleClassName = '',
  subListClassName = '',
  listClassName = '',
}) {
  return (
    <div className={s.wrapper}>
      <h3 className={clsx(s.title, titleClassName)}>{title}</h3>

      <ul className={clsx(s.list, listClassName)}>
        {list.map((item, index) => (
          <ItemOrDevelopment key={index} text={item} className={s.listItem} />
        ))}
      </ul>

      {subList && subList.length > 0 && (
        <ul className={clsx(s.subList, subListClassName)}>
          {subList.map((subItem, subIndex) => (
            <ItemOrDevelopment
              key={subIndex}
              text={subItem}
              className={s.subListItem}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
