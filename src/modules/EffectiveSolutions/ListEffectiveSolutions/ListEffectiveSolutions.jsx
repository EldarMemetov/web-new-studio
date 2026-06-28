'use client';
import { useState } from 'react';
import s from './ListEffectiveSolutions.module.scss';
import {
  FiPenTool,
  FiLayout,
  FiTrendingUp,
  FiRefreshCw,
  FiShoppingCart,
  FiGlobe,
  FiEdit3,
  FiLifeBuoy,
  FiArrowRight,
} from 'react-icons/fi';

const iconMap = {
  uiux: FiPenTool,
  landing: FiLayout,
  seo: FiTrendingUp,
  redesign: FiRefreshCw,
  stores: FiShoppingCart,
  corporate: FiGlobe,
  blogs: FiEdit3,
  support: FiLifeBuoy,
};

export function ListEffectiveSolutions({ items }) {
  const [active, setActive] = useState(0);
  if (!items?.length) return null;

  const current = items[active];
  const Icon = iconMap[current.id] || FiLayout;

  return (
    <div className={s.showcase}>
      <ul className={s.menu}>
        {items.map((item, i) => {
          const ItemIcon = iconMap[item.id] || FiLayout;
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
    </div>
  );
}
