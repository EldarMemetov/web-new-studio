'use client';
import { useState } from 'react';
import s from './VideoEffectiveList.module.scss';
import {
  FiFilm,
  FiBriefcase,
  FiCalendar,
  FiShare2,
  FiLayers,
  FiScissors,
  FiArrowRight,
} from 'react-icons/fi';

const iconMap = {
  advertising: FiFilm,
  corporate: FiBriefcase,
  event: FiCalendar,
  'social-media': FiShare2,
  graphics: FiLayers,
  'video-editing': FiScissors,
};

export default function VideoEffectiveList({ items }) {
  const [active, setActive] = useState(0);
  if (!items?.length) return null;

  const current = items[active];
  const Icon = iconMap[current.id] || FiFilm;

  return (
    <div className={s.showcase}>
      {/* СЦЕНА */}
      <div className={s.stage}>
        <span className={s.stageGlow} aria-hidden="true" />
        <span key={current.id + '-num'} className={s.stageGhost}>
          {String(active + 1).padStart(2, '0')}
        </span>

        <div key={current.id} className={s.stageContent}>
          <span className={s.stageIcon}>
            <Icon />
          </span>
          <h3 className={s.stageTitle}>{current.title}</h3>
          <p className={s.stageText}>{current.info}</p>
        </div>
      </div>

      {/* СПИСОК */}
      <ul className={s.menu}>
        {items.map((item, i) => {
          const ItemIcon = iconMap[item.id] || FiFilm;
          const isActive = i === active;
          return (
            <li key={item.id}>
              <button
                type="button"
                className={`${s.menuItem} ${isActive ? s.active : ''}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className={s.menuNum}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={s.menuIcon}>
                  <ItemIcon />
                </span>
                <span className={s.menuTitle}>{item.title}</span>
                <FiArrowRight className={s.menuArrow} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
